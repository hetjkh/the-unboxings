/**
 * Copy every Vercel Blob file into public/blob/ and point MongoDB at the local copies.
 * Never deletes anything from Blob or MongoDB.
 *
 *   npx tsx --env-file=.env.local scripts/mirror-blob-to-public.ts                 download only
 *   npx tsx --env-file=.env.local scripts/mirror-blob-to-public.ts --db-dry-run    + preview DB changes
 *   npx tsx --env-file=.env.local scripts/mirror-blob-to-public.ts --rewrite-db    + backup and update DB
 */
import fs from "fs";
import path from "path";
import { list } from "@vercel/blob";
import { MongoClient } from "mongodb";

const REWRITE_DB = process.argv.includes("--rewrite-db");
const DB_DRY_RUN = process.argv.includes("--db-dry-run");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const LOCAL_ROOT = path.join(PUBLIC_DIR, "blob");
const MAP_PATH = path.join(process.cwd(), "scripts", ".blob-local-map.json");
const BACKUP_DIR = path.join(process.cwd(), "backups");

type BlobItem = { url: string; pathname: string; size: number };

function getBlobToken(): string {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) throw new Error("BLOB_READ_WRITE_TOKEN is missing in .env.local");
  return raw.replace(/^["']|["']$/g, "");
}

async function listAllBlobs(token: string): Promise<BlobItem[]> {
  const blobs: BlobItem[] = [];
  let cursor: string | undefined;
  let hasMore = true;
  while (hasMore) {
    const res = await list({ token, cursor, limit: 1000 });
    for (const b of res.blobs) blobs.push({ url: b.url, pathname: b.pathname, size: b.size });
    hasMore = res.hasMore;
    cursor = res.cursor;
  }
  return blobs;
}

function localPathFor(pathname: string): { file: string; publicUrl: string } {
  const file = path.resolve(LOCAL_ROOT, ...pathname.split("/"));
  if (!file.startsWith(LOCAL_ROOT + path.sep)) throw new Error(`Unsafe blob pathname: ${pathname}`);
  const publicUrl = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).map(encodeURIComponent).join("/");
  return { file, publicUrl };
}

async function download(blob: BlobItem, file: string, attempts = 3): Promise<"skipped" | "downloaded"> {
  if (fs.existsSync(file) && fs.statSync(file).size === blob.size) return "skipped";
  fs.mkdirSync(path.dirname(file), { recursive: true });
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(blob.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length !== blob.size) throw new Error(`size mismatch ${buf.length} != ${blob.size}`);
      const tmp = `${file}.part`;
      fs.writeFileSync(tmp, buf);
      fs.renameSync(tmp, file);
      return "downloaded";
    } catch (error) {
      if (attempt >= attempts) throw error;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}

async function mapPool<T>(items: T[], concurrency: number, worker: (item: T, i: number) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        await worker(items[i], i);
      }
    }),
  );
}

function rewriteDeep(value: unknown, map: Map<string, string>): { value: unknown; count: number } {
  if (typeof value === "string") {
    const next = map.get(value) ?? map.get(value.split(/[?#]/)[0]);
    return next ? { value: next, count: 1 } : { value, count: 0 };
  }
  if (Array.isArray(value)) {
    let count = 0;
    const next = value.map((item) => {
      const r = rewriteDeep(item, map);
      count += r.count;
      return r.value;
    });
    return { value: next, count };
  }
  if (value && typeof value === "object" && !(value instanceof Date) && value.constructor === Object) {
    let count = 0;
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      const r = rewriteDeep(item, map);
      next[key] = r.value;
      count += r.count;
    }
    return { value: next, count };
  }
  return { value, count: 0 };
}

async function updateMongo(map: Map<string, string>) {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) throw new Error("MONGODB_URI is missing");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "theunboxing");
  const collections = (await db.listCollections().toArray()).map((c) => c.name);

  if (REWRITE_DB) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const backup: Record<string, unknown[]> = {};
    for (const name of collections) backup[name] = await db.collection(name).find({}).toArray();
    const backupFile = path.join(BACKUP_DIR, `mongo-before-blob-mirror-${Date.now()}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    console.log(`Mongo backup → ${backupFile}`);
  }

  let totalDocs = 0;
  let totalFields = 0;
  for (const name of collections) {
    const col = db.collection(name);
    const docs = await col.find({}).toArray();
    let changedDocs = 0;
    for (const doc of docs) {
      const { _id, ...rest } = doc;
      const result = rewriteDeep(rest, map);
      if (!result.count) continue;
      changedDocs += 1;
      totalFields += result.count;
      if (REWRITE_DB) await col.updateOne({ _id }, { $set: result.value as Record<string, unknown> });
    }
    if (changedDocs) console.log(`Mongo ${name}: ${changedDocs}/${docs.length} docs ${REWRITE_DB ? "updated" : "would change"}`);
    totalDocs += changedDocs;
  }
  console.log(`Mongo total: ${totalDocs} docs, ${totalFields} URLs ${REWRITE_DB ? "rewritten" : "would be rewritten"}`);
  await client.close();
}

async function main() {
  const token = getBlobToken();
  const blobs = await listAllBlobs(token);
  console.log(`Blob files: ${blobs.length} (${(blobs.reduce((s, b) => s + b.size, 0) / 1024 / 1024).toFixed(1)} MB)`);

  const map = new Map<string, string>();
  let downloaded = 0;
  let skipped = 0;
  const failed: string[] = [];

  await mapPool(blobs, 8, async (blob) => {
    const { file, publicUrl } = localPathFor(blob.pathname);
    try {
      const status = await download(blob, file);
      if (status === "downloaded") downloaded += 1;
      else skipped += 1;
      map.set(blob.url, publicUrl);
    } catch (error) {
      failed.push(`${blob.pathname}: ${error instanceof Error ? error.message : error}`);
    }
  });

  fs.writeFileSync(MAP_PATH, JSON.stringify(Object.fromEntries(map), null, 2));
  console.log(`Downloaded: ${downloaded}, already present: ${skipped}, failed: ${failed.length}`);
  failed.forEach((f) => console.log(`  FAIL ${f}`));
  console.log(`URL map → ${MAP_PATH}`);

  if (failed.length && (REWRITE_DB || DB_DRY_RUN)) {
    console.log("Some downloads failed — skipping DB step. Re-run to retry.");
    return;
  }
  if (REWRITE_DB || DB_DRY_RUN) await updateMongo(map);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

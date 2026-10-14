/**
 * Delete PNG originals from Vercel Blob once they have a WebP replacement
 * and nothing in MongoDB or the codebase still references them.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/delete-blob-pngs.ts           (dry run)
 *   npx tsx --env-file=.env.local scripts/delete-blob-pngs.ts --delete
 */
import fs from "fs";
import path from "path";
import { del, list } from "@vercel/blob";
import { MongoClient } from "mongodb";

const DELETE = process.argv.includes("--delete");
const MAP_PATH = path.join(process.cwd(), "scripts", ".blob-webp-replacements.json");
const SCAN_DIRS = ["app", "lib", "components", "public"].map((dir) => path.join(process.cwd(), dir));
const SCAN_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".md", ".html"]);

type Replacement = { from: string; to: string; pathnameFrom: string; pathnameTo: string };

function getBlobToken(): string {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) throw new Error("BLOB_READ_WRITE_TOKEN is missing in .env.local");
  return raw.replace(/^["']|["']$/g, "");
}

async function listAllBlobs(token: string) {
  const blobs: Array<{ url: string; pathname: string; size: number }> = [];
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

function collectStrings(value: unknown, out: Set<string>) {
  if (typeof value === "string") out.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => collectStrings(item, out));
  }
}

async function mongoStrings(): Promise<string> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) throw new Error("MONGODB_URI is missing — refusing to delete without checking references");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "theunboxing");
  const strings = new Set<string>();
  for (const { name } of await db.listCollections().toArray()) {
    const docs = await db.collection(name).find({}).toArray();
    docs.forEach((doc) => collectStrings(doc, strings));
  }
  await client.close();
  return [...strings].join("\n");
}

function codeText(): string {
  const chunks: string[] = [];
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && !entry.name.startsWith(".")) walk(full);
      } else if (SCAN_EXTS.has(path.extname(entry.name).toLowerCase())) {
        chunks.push(fs.readFileSync(full, "utf8"));
      }
    }
  };
  SCAN_DIRS.forEach(walk);
  return chunks.join("\n");
}

async function main() {
  console.log(DELETE ? "=== DELETE PNG blobs ===" : "=== DRY RUN (nothing deleted) ===");

  const token = getBlobToken();
  const blobs = await listAllBlobs(token);
  const existing = new Set(blobs.map((b) => b.pathname));
  const pngs = blobs.filter((b) => /\.png$/i.test(b.pathname));

  const replacements: Replacement[] = fs.existsSync(MAP_PATH)
    ? JSON.parse(fs.readFileSync(MAP_PATH, "utf8"))
    : [];
  const webpFor = new Map(replacements.map((r) => [r.pathnameFrom, r.pathnameTo]));

  const [mongo, code] = await Promise.all([mongoStrings(), Promise.resolve(codeText())]);

  const safe: typeof pngs = [];
  const keep: Array<{ pathname: string; reason: string }> = [];

  for (const png of pngs) {
    const webp = webpFor.get(png.pathname);
    if (!webp || !existing.has(webp)) {
      keep.push({ pathname: png.pathname, reason: "no WebP copy in Blob" });
    } else if (mongo.includes(png.url) || mongo.includes(png.pathname)) {
      keep.push({ pathname: png.pathname, reason: "still referenced in MongoDB" });
    } else if (code.includes(png.url)) {
      keep.push({ pathname: png.pathname, reason: "still referenced in code" });
    } else {
      safe.push(png);
    }
  }

  const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);
  console.log(`Blob total: ${blobs.length}`);
  console.log(`PNG blobs: ${pngs.length}`);
  console.log(`Safe to delete: ${safe.length} (${mb(safe.reduce((sum, b) => sum + b.size, 0))} MB)`);
  console.log(`Keeping: ${keep.length}`);
  keep.forEach((k) => console.log(`  KEEP ${k.pathname} — ${k.reason}`));

  if (!DELETE) {
    console.log("\nDry run only. Re-run with --delete to remove the safe PNGs.");
    return;
  }

  const BATCH = 100;
  for (let i = 0; i < safe.length; i += BATCH) {
    const batch = safe.slice(i, i + BATCH);
    await del(batch.map((b) => b.url), { token });
    console.log(`Deleted ${Math.min(i + BATCH, safe.length)}/${safe.length}`);
  }
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

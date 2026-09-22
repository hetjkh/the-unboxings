/**
 * Safe Blob → WebP conversion.
 * - Downloads non-WebP images from Vercel Blob
 * - Uploads NEW .webp copies (never deletes originals)
 * - Writes scripts/.blob-webp-replacements.json
 * - Rewrites MongoDB image URL fields to the new WebP URLs
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/convert-blob-to-webp.ts
 *   npx tsx --env-file=.env.local scripts/convert-blob-to-webp.ts --dry-run
 */
import fs from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import { MongoClient } from "mongodb";
import sharp from "sharp";

const MAX_IMAGE_EDGE = 1600;
const WEBP_QUALITY = 78;
const CONVERT_EXTS = new Set(["png", "jpg", "jpeg", "gif", "bmp", "tiff", "tif", "heic", "avif"]);
const DRY_RUN = process.argv.includes("--dry-run");
const MAP_PATH = path.join(process.cwd(), "scripts", ".blob-webp-replacements.json");

const MONGO_COLLECTIONS = [
  "products",
  "categories",
  "solutions",
  "brandStories",
  "resources",
  "behindTheDesign",
  "pageHeroes",
  "siteSettings",
] as const;

type Replacement = { from: string; to: string; pathnameFrom: string; pathnameTo: string };

function getBlobToken(): string {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) throw new Error("BLOB_READ_WRITE_TOKEN is missing in .env.local");
  return raw.replace(/^["']|["']$/g, "");
}

function extOf(pathnameOrUrl: string): string {
  try {
    const pathname = pathnameOrUrl.includes("://")
      ? new URL(pathnameOrUrl).pathname
      : pathnameOrUrl;
    const m = pathname.match(/\.([a-z0-9]+)$/i);
    return (m?.[1] || "").toLowerCase();
  } catch {
    const m = pathnameOrUrl.match(/\.([a-z0-9]+)(?:\?|$)/i);
    return (m?.[1] || "").toLowerCase();
  }
}

function toWebpPathname(pathname: string): string {
  return pathname.replace(/\.[a-z0-9]+$/i, ".webp");
}

function rewriteDeep(
  value: unknown,
  map: Map<string, string>,
): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    const next = map.get(value);
    if (next && next !== value) return { value: next, changed: true };
    return { value, changed: false };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const result = rewriteDeep(item, map);
      if (result.changed) changed = true;
      return result.value;
    });
    return { value: next, changed };
  }
  if (value && typeof value === "object") {
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      const result = rewriteDeep(item, map);
      next[key] = result.value;
      if (result.changed) changed = true;
    }
    return { value: next, changed };
  }
  return { value, changed: false };
}

async function listAllBlobs(token: string) {
  const blobs: Array<{ url: string; pathname: string }> = [];
  let cursor: string | undefined;
  let hasMore = true;
  while (hasMore) {
    const res = await list({ token, cursor, limit: 1000 });
    for (const b of res.blobs) {
      blobs.push({ url: b.url, pathname: b.pathname });
    }
    hasMore = res.hasMore;
    cursor = res.cursor;
  }
  return blobs;
}

async function convertOne(
  token: string,
  blob: { url: string; pathname: string },
  pathnameTo: string,
): Promise<Replacement | null> {
  if (DRY_RUN) {
    return {
      from: blob.url,
      to: `(dry-run) ${pathnameTo}`,
      pathnameFrom: blob.pathname,
      pathnameTo,
    };
  }

  const response = await fetch(blob.url);
  if (!response.ok) {
    throw new Error(`Download failed ${response.status}: ${blob.pathname}`);
  }
  const input = Buffer.from(await response.arrayBuffer());

  const optimized = await sharp(input, { failOn: "none", animated: false })
    .rotate()
    .resize({
      width: MAX_IMAGE_EDGE,
      height: MAX_IMAGE_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer();

  const uploaded = await put(pathnameTo, optimized, {
    access: "public",
    contentType: "image/webp",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 31,
    token,
  });

  return {
    from: blob.url,
    to: uploaded.url,
    pathnameFrom: blob.pathname,
    pathnameTo,
  };
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => run()));
  return results;
}

async function updateMongo(replacements: Replacement[]) {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.log("MONGODB_URI missing — skipped DB updates");
    return;
  }

  const map = new Map<string, string>();
  for (const item of replacements) {
    map.set(item.from, item.to);
    // Also map URL without query/hash variants if any
    try {
      const fromUrl = new URL(item.from);
      const toUrl = new URL(item.to);
      map.set(fromUrl.origin + fromUrl.pathname, toUrl.origin + toUrl.pathname);
    } catch {
      /* ignore */
    }
  }

  const dbName = process.env.MONGODB_DB || "theunboxing";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  let totalUpdated = 0;
  for (const name of MONGO_COLLECTIONS) {
    const col = db.collection(name);
    const docs = await col.find({}).toArray();
    let updated = 0;

    for (const doc of docs) {
      const { _id, ...rest } = doc;
      const result = rewriteDeep(rest, map);
      if (!result.changed) continue;
      if (DRY_RUN) {
        updated += 1;
        continue;
      }
      await col.updateOne(
        { _id },
        { $set: { ...(result.value as object), updatedAt: new Date().toISOString() } },
      );
      updated += 1;
    }

    console.log(`Mongo ${name}: updated ${updated}/${docs.length} docs`);
    totalUpdated += updated;
  }

  await client.close();
  console.log(`Mongo total docs updated: ${totalUpdated}`);
}

async function main() {
  console.log(DRY_RUN ? "=== DRY RUN (no uploads, no DB writes) ===" : "=== CONVERT Blob → WebP (keep originals) ===");

  const token = getBlobToken();
  const blobs = await listAllBlobs(token);
  const existingPathnames = new Set(blobs.map((b) => b.pathname));

  const targets = blobs.filter((b) => CONVERT_EXTS.has(extOf(b.pathname)));
  console.log(`Blob total: ${blobs.length}`);
  console.log(`To convert: ${targets.length}`);
  console.log(`Already WebP / other: ${blobs.length - targets.length}`);

  // Pre-assign unique destination pathnames (avoids parallel collisions)
  const planned = targets.map((blob) => {
    let pathnameTo = toWebpPathname(blob.pathname);
    if (pathnameTo === blob.pathname || existingPathnames.has(pathnameTo)) {
      const base = blob.pathname.replace(/\.[a-z0-9]+$/i, "");
      pathnameTo = `${base}-webp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
    }
    existingPathnames.add(pathnameTo);
    return { blob, pathnameTo };
  });

  let failed = 0;
  const results = await mapPool(planned, 6, async ({ blob, pathnameTo }, i) => {
    const label = `[${i + 1}/${planned.length}] ${blob.pathname}`;
    try {
      const result = await convertOne(token, blob, pathnameTo);
      if (result) console.log(`OK ${label} → ${result.pathnameTo}`);
      return result;
    } catch (error) {
      failed += 1;
      console.error(`FAIL ${label}:`, error instanceof Error ? error.message : error);
      return null;
    }
  });
  const replacements = results.filter((r): r is Replacement => r !== null);

  fs.writeFileSync(MAP_PATH, JSON.stringify(replacements, null, 2));
  console.log(`Wrote ${replacements.length} replacements → ${MAP_PATH}`);
  console.log(`Failed: ${failed}`);

  if (replacements.length > 0) {
    await updateMongo(replacements);
  }

  console.log("Done. Originals were NOT deleted.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

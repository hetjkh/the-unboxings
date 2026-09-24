import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

export function plain(value = '') {
  const entities = { amp: '&', quot: '"', apos: "'", nbsp: ' ', lt: '<', gt: '>' };
  return value.replace(/<[^>]*>/g, ' ').replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, entity) => {
    if (entity[0] === '#') return String.fromCodePoint(parseInt(entity.slice(entity[1] === 'x' ? 2 : 1), entity[1] === 'x' ? 16 : 10));
    return entities[entity] ?? match;
  }).replace(/\s+/g, ' ').trim();
}
export const nameOf = (product) => plain(product.name.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? product.name);
export const cacheDir = path.resolve('artifacts/catalogue/blob-cache');
export async function blobImage(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.public.blob.vercel-storage.com')) throw new Error('Catalogue images must come from public Vercel Blob storage.');
  const file = path.join(cacheDir, createHash('sha256').update(url).digest('hex') + '.webp');
  await fs.mkdir(cacheDir, { recursive: true });
  try { return await fs.readFile(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await sharp(bytes).metadata();
  await fs.writeFile(file, bytes);
  return bytes;
}

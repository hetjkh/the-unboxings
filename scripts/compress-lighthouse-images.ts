/**
 * Compress the public images Lighthouse flagged as oversized.
 * Stop `npm run dev` first if files are locked on Windows.
 *
 *   npx tsx scripts/compress-lighthouse-images.ts
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public");
const files = [
  "brand-stories/a-majlis-reimagined/hero.webp",
  "brand-stories/dubai-skyline-chess-set/hero.webp",
  "brand-stories/the-private-reveal/hero.webp",
  "brand-stories/dubai-developer-homeowners/hero.webp",
  "products/21.jpg",
  "products/07.jpg",
  "products/15.jpg",
];

const MAX_EDGE = 900;
const QUALITY = 70;

async function main() {
  let saved = 0;

  for (const rel of files) {
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) {
      console.log("MISSING", rel);
      continue;
    }

    const before = fs.statSync(file).size;
    const isJpeg = /\.jpe?g$/i.test(file);
    const outPath = `${file}.new`;
    const pipeline = sharp(file, { failOn: "none" })
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      });

    if (isJpeg) {
      await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(outPath);
    } else {
      await pipeline.webp({ quality: QUALITY, effort: 4 }).toFile(outPath);
    }

    const after = fs.statSync(outPath).size;
    if (after < before) {
      fs.rmSync(file, { force: true });
      fs.renameSync(outPath, file);
      saved += before - after;
      console.log("OK", rel, `${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
    } else {
      fs.rmSync(outPath, { force: true });
      console.log("SKIP", rel);
    }
  }

  console.log("Saved KB:", Math.round(saved / 1024));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

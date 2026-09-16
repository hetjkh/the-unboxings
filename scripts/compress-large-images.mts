import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public");
const MIN_BYTES = 400 * 1024; // compress anything over ~400KB
const MAX_EDGE = 1600;
const WEBP_QUALITY = 78;

const skipDirNames = new Set([".git", "node_modules"]);
const targets: string[] = [];

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirNames.has(entry.name)) continue;
      walk(full);
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const size = fs.statSync(full).size;
    if (size < MIN_BYTES) continue;
    // Skip if a sibling .webp already exists and is newer/smaller — still reconvert for consistency
    targets.push(full);
  }
}

walk(root);
targets.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

type Replacement = { from: string; to: string; beforeMB: number; afterMB: number };
const replacements: Replacement[] = [];

console.log(`Found ${targets.length} images over ${(MIN_BYTES / 1024).toFixed(0)}KB\n`);

for (const file of targets) {
  const before = fs.statSync(file).size;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

  try {
    await sharp(file)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(out);

    const after = fs.statSync(out).size;
    // Only delete original if webp is meaningfully smaller
    if (after < before * 0.95) {
      fs.unlinkSync(file);
    } else {
      // Keep original if webp barely helped; remove the larger webp attempt
      if (after >= before) {
        fs.unlinkSync(out);
        console.log(`SKIP (webp larger): /${path.relative(root, file).split(path.sep).join("/")}`);
        continue;
      }
      fs.unlinkSync(file);
    }

    const fromPublic = "/" + path.relative(root, file).split(path.sep).join("/");
    const toPublic = "/" + path.relative(root, out).split(path.sep).join("/");
    replacements.push({
      from: fromPublic,
      to: toPublic,
      beforeMB: Number((before / 1e6).toFixed(2)),
      afterMB: Number((after / 1e6).toFixed(2)),
    });
    console.log(
      `${fromPublic}  ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`,
    );
  } catch (error) {
    console.error(`FAIL ${file}:`, error instanceof Error ? error.message : error);
  }
}

fs.writeFileSync(
  path.join(process.cwd(), "scripts", ".image-replacements.json"),
  JSON.stringify(replacements, null, 2),
);
console.log(`\nWrote ${replacements.length} replacements to scripts/.image-replacements.json`);

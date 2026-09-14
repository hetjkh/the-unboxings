import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public");
const targets: string[] = [];

function walk(dir: string) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (/\.(png|jpe?g)$/i.test(entry.name) && fs.statSync(full).size > 1.5 * 1024 * 1024) {
      targets.push(full);
    }
  }
}

walk(path.join(root, "apprales & uniforms"));
walk(path.join(root, "materials", "tiles"));

for (const name of ["idea.png", "sketch.png", "prototype.png", "3d-design.png"]) {
  const file = path.join(root, "behind-the-design", name);
  if (fs.existsSync(file) && fs.statSync(file).size > 1.5 * 1024 * 1024) {
    targets.push(file);
  }
}

type Replacement = { from: string; to: string; beforeMB: number; afterMB: number };
const replacements: Replacement[] = [];

for (const file of targets) {
  const before = fs.statSync(file).size;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(file)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(out);

  const after = fs.statSync(out).size;
  fs.unlinkSync(file);

  const fromPublic = "/" + path.relative(root, file).split(path.sep).join("/");
  const toPublic = "/" + path.relative(root, out).split(path.sep).join("/");
  replacements.push({
    from: fromPublic,
    to: toPublic,
    beforeMB: Number((before / 1e6).toFixed(2)),
    afterMB: Number((after / 1e6).toFixed(2)),
  });
  console.log(`${fromPublic}  ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`);
}

fs.mkdirSync(path.join(process.cwd(), "scripts"), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), "scripts", ".image-replacements.json"),
  JSON.stringify(replacements, null, 2),
);
console.log(`Wrote ${replacements.length} replacements`);

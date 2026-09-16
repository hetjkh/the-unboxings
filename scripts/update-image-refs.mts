import fs from "fs";
import path from "path";

type Replacement = { from: string; to: string };

const replacementsPath = path.join(process.cwd(), "scripts", ".image-replacements.json");
if (!fs.existsSync(replacementsPath)) {
  console.error("Missing scripts/.image-replacements.json — run compress-large-images first.");
  process.exit(1);
}

const replacements = JSON.parse(fs.readFileSync(replacementsPath, "utf8")) as Replacement[];

const scanRoots = ["app", "lib", "scripts"];
const fileExt = /\.(ts|tsx|js|jsx|mjs|mts|json|md|css)$/i;
const skipNames = new Set([".image-replacements.json", "package-lock.json"]);

function collectFiles(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".env.example") continue;
    if (skipNames.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "whatsapp-service") {
        continue;
      }
      collectFiles(full, out);
      continue;
    }
    if (fileExt.test(entry.name)) out.push(full);
  }
  return out;
}

function variants(input: string): string[] {
  const withEncodedSeparators = "/" + input.slice(1).split("/").map(encodeURIComponent).join("/");
  const spacesAndAmp = input.replace(/ /g, "%20").replace(/&/g, "%26");
  // Also match without leading slash in some data files
  const bare = input.replace(/^\//, "");
  return [...new Set([input, withEncodedSeparators, spacesAndAmp, bare])];
}

function toVariant(fromVariant: string, from: string, to: string): string {
  if (fromVariant === from) return to;
  if (fromVariant === from.replace(/^\//, "")) return to.replace(/^\//, "");
  if (fromVariant.includes("%")) {
    return (
      "/" +
      to
        .slice(1)
        .split("/")
        .map(encodeURIComponent)
        .join("/")
    );
  }
  return to.replace(/ /g, "%20").replace(/&/g, "%26");
}

const files = scanRoots.flatMap((dir) => collectFiles(path.join(process.cwd(), dir)));
let totalHits = 0;

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  let count = 0;
  const original = text;

  // Longest paths first so nested names don't partially collide
  const sorted = [...replacements].sort((a, b) => b.from.length - a.from.length);

  for (const { from, to } of sorted) {
    for (const source of variants(from)) {
      if (!text.includes(source)) continue;
      const target = toVariant(source, from, to);
      const next = text.split(source).join(target);
      if (next !== text) {
        text = next;
        count += 1;
      }
    }
  }

  if (text !== original) {
    fs.writeFileSync(file, text);
    totalHits += count;
    console.log(`${path.relative(process.cwd(), file)}: ${count} path replacements`);
  }
}

console.log(`\nDone. Updated ${totalHits} path occurrences across scanned files.`);

import fs from "fs";
import path from "path";

type Replacement = { from: string; to: string };

const replacements = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts", ".image-replacements.json"), "utf8"),
) as Replacement[];

const files = [
  "app/data/products.ts",
  "app/materials/page.tsx",
  "app/components/GucciServicesSection.tsx",
  "lib/cms/behind-the-design-defaults.ts",
];

function variants(input: string): string[] {
  const withEncodedSeparators = "/" + input.slice(1).split("/").map(encodeURIComponent).join("/");
  const spacesAndAmp = input.replace(/ /g, "%20").replace(/&/g, "%26");
  return [...new Set([input, withEncodedSeparators, spacesAndAmp])];
}

for (const file of files) {
  const full = path.join(process.cwd(), file);
  let text = fs.readFileSync(full, "utf8");
  let count = 0;

  for (const { from, to } of replacements) {
    const fromVariants = variants(from);
    const toVariants = variants(to);
    for (let i = 0; i < fromVariants.length; i += 1) {
      const source = fromVariants[i];
      const target = toVariants[i] ?? to;
      if (!text.includes(source)) continue;
      text = text.split(source).join(target);
      count += 1;
    }
  }

  fs.writeFileSync(full, text);
  console.log(`${file}: ${count} path replacements`);
}

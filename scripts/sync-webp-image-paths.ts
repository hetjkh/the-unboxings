import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { DEFAULT_BEHIND_THE_DESIGN } from "../lib/cms/behind-the-design-defaults";

type Replacement = { from: string; to: string };

function rewritePath(value: unknown, map: Map<string, string>): string | null {
  if (typeof value !== "string" || !value) return null;
  const next = map.get(value);
  return next && next !== value ? next : null;
}

function rewriteDeep(value: unknown, map: Map<string, string>): { value: unknown; changed: boolean } {
  if (typeof value === "string") {
    const next = rewritePath(value, map);
    return next ? { value: next, changed: true } : { value, changed: false };
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

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "theunboxing";
  if (!uri) throw new Error("No MONGODB_URI");

  const replacementsPath = path.join(process.cwd(), "scripts", ".image-replacements.json");
  const replacements = (
    fs.existsSync(replacementsPath)
      ? (JSON.parse(fs.readFileSync(replacementsPath, "utf8")) as Replacement[])
      : []
  ).concat(
    // Always force behind-the-design defaults
    DEFAULT_BEHIND_THE_DESIGN.steps.map((step) => ({
      from: step.image.replace(/\.webp$/, ".png"),
      to: step.image,
    })),
    [{ from: "/sketch.png", to: DEFAULT_BEHIND_THE_DESIGN.hero.image }],
    [{ from: "/behind-the-design/sketch.png", to: DEFAULT_BEHIND_THE_DESIGN.hero.image }],
  );

  const map = new Map<string, string>();
  for (const item of replacements) map.set(item.from, item.to);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const collections = [
    "behindTheDesign",
    "products",
    "categories",
    "solutions",
    "brandStories",
    "resources",
    "pageHeroes",
  ];

  for (const name of collections) {
    const col = db.collection(name);
    const docs = await col.find({}).toArray();
    let updated = 0;

    for (const doc of docs) {
      const { _id, ...rest } = doc;
      const result = rewriteDeep(rest, map);

      if (name === "behindTheDesign") {
        const behind = result.value as {
          hero?: { image?: string };
          steps?: Array<{ slug: string; image?: string }>;
        };
        behind.hero = {
          ...(behind.hero || {}),
          image: DEFAULT_BEHIND_THE_DESIGN.hero.image,
        };
        const stepImages = Object.fromEntries(
          DEFAULT_BEHIND_THE_DESIGN.steps.map((step) => [step.slug, step.image]),
        );
        behind.steps = (behind.steps || []).map((step) => ({
          ...step,
          image: stepImages[step.slug] || step.image,
        }));
        await col.updateOne(
          { _id },
          { $set: { ...behind, updatedAt: new Date().toISOString() } },
        );
        updated += 1;
        continue;
      }

      if (!result.changed) continue;
      await col.updateOne(
        { _id },
        { $set: { ...(result.value as object), updatedAt: new Date().toISOString() } },
      );
      updated += 1;
    }

    console.log(`${name}: updated ${updated}/${docs.length}`);
  }

  await client.close();
  console.log("Mongo image paths synced to WebP where applicable.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

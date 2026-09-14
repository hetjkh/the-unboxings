import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

type Replacement = { from: string; to: string };

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  console.log("MONGODB_URI not set — skipping DB path updates");
  process.exit(0);
}

const replacements = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts", ".image-replacements.json"), "utf8"),
) as Replacement[];

function rewrite(value: string): string {
  let next = value;
  for (const { from, to } of replacements) {
    const encodedFrom = "/" + from.slice(1).split("/").map(encodeURIComponent).join("/");
    const encodedTo = "/" + to.slice(1).split("/").map(encodeURIComponent).join("/");
    if (next === from || next === encodedFrom) next = next === encodedFrom ? encodedTo : to;
    if (next.includes(from)) next = next.split(from).join(to);
    if (next.includes(encodedFrom)) next = next.split(encodedFrom).join(encodedTo);
  }
  return next;
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db();

const collections = ["products", "categories", "solutions", "pageHeroes", "behindTheDesign"] as const;
let updated = 0;

for (const name of collections) {
  const docs = await db.collection(name).find({}).toArray();
  for (const doc of docs) {
    const patch: Record<string, unknown> = {};

    if (typeof doc.image === "string") {
      const next = rewrite(doc.image);
      if (next !== doc.image) patch.image = next;
    }

    if (doc.hero && typeof doc.hero === "object" && typeof (doc.hero as { image?: string }).image === "string") {
      const hero = doc.hero as { image: string };
      const next = rewrite(hero.image);
      if (next !== hero.image) patch.hero = { ...hero, image: next };
    }

    if (Array.isArray(doc.steps)) {
      let changed = false;
      const steps = doc.steps.map((step: { image?: string }) => {
        if (typeof step.image !== "string") return step;
        const next = rewrite(step.image);
        if (next !== step.image) {
          changed = true;
          return { ...step, image: next };
        }
        return step;
      });
      if (changed) patch.steps = steps;
    }

    if (Object.keys(patch).length === 0) continue;
    await db.collection(name).updateOne({ _id: doc._id }, { $set: { ...patch, updatedAt: new Date().toISOString() } });
    updated += 1;
  }
}

console.log(`Updated ${updated} MongoDB documents`);
await client.close();

import { MongoClient } from "mongodb";
import { brandStories as staticBrandStories } from "../app/data/brandStories";
import fs from "fs";
import path from "path";

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "theunboxing";
  if (!uri) throw new Error("No MONGODB_URI");

  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db(dbName).collection("brandStories");
  const docs = await col.find({}).project({ slug: 1, image: 1, gallery: 1, title: 1 }).toArray();

  console.log("=== Mongo brand stories ===");
  for (const doc of docs) {
    const image = String(doc.image || "");
    const localPath = path.join(process.cwd(), "public", image.replace(/^\//, "").replace(/\//g, path.sep));
    const exists = image.startsWith("/") ? fs.existsSync(localPath) : "remote";
    console.log(`${doc.slug}: ${image} exists=${exists}`);
    if (Array.isArray(doc.gallery)) {
      for (const g of doc.gallery) {
        const gPath = path.join(process.cwd(), "public", String(g).replace(/^\//, "").replace(/\//g, path.sep));
        console.log(`  gallery: ${g} exists=${String(g).startsWith("/") ? fs.existsSync(gPath) : "remote"}`);
      }
    }
  }

  // Force sync image/gallery from static source by slug
  let updated = 0;
  for (const story of staticBrandStories) {
    const result = await col.updateOne(
      { slug: story.slug },
      {
        $set: {
          image: story.image,
          gallery: [...story.gallery],
          alt: story.alt,
          updatedAt: new Date().toISOString(),
        },
      },
    );
    if (result.modifiedCount) updated += 1;
  }

  console.log(`\nSynced ${updated} stories from static brandStories.ts`);
  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

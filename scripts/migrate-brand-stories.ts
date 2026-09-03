import { brandStories as staticBrandStories } from "../app/data/brandStories";
import { getDb, isMongoConfigured } from "../lib/mongodb";

async function main() {
  if (!isMongoConfigured()) {
    console.error("MongoDB is not configured");
    process.exit(1);
  }

  const db = await getDb();
  const timestamp = new Date().toISOString();
  let updated = 0;

  for (const [index, story] of staticBrandStories.entries()) {
    const result = await db.collection("brandStories").updateOne(
      { slug: story.slug },
      {
        $set: {
          title: story.title,
          tagline: story.tagline,
          challenge: story.challenge,
          materials: story.materials,
          materialsDetail: story.materialsDetail ?? "",
          image: story.image,
          alt: story.alt,
          gallery: [...story.gallery],
          sections: story.sections.map((section) => ({ ...section })),
          closing: story.closing,
          sortOrder: index,
          updatedAt: timestamp,
        },
        $setOnInsert: {
          slug: story.slug,
          createdAt: timestamp,
        },
      },
      { upsert: true },
    );

    if (result.modifiedCount > 0 || result.upsertedCount > 0) {
      updated += 1;
    }
  }

  const count = await db.collection("brandStories").countDocuments();
  console.log(`Brand stories migration complete: ${count} stories in database, ${updated} updated or inserted.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

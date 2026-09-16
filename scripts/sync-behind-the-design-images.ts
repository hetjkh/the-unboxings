import { MongoClient } from "mongodb";
import { DEFAULT_BEHIND_THE_DESIGN } from "../lib/cms/behind-the-design-defaults";

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "theunboxing";
  if (!uri) throw new Error("No MONGODB_URI");

  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db(dbName).collection("behindTheDesign");

  const stepImages = Object.fromEntries(
    DEFAULT_BEHIND_THE_DESIGN.steps.map((step) => [step.slug, step.image]),
  );

  const doc = await col.findOne({ pageKey: "behind-the-design" });
  if (!doc) {
    console.log("No CMS doc — defaults will be used");
    await client.close();
    return;
  }

  const steps = ((doc.steps as Array<{ slug: string; image?: string }>) || []).map((step) => ({
    ...step,
    image: stepImages[step.slug] || step.image,
  }));

  await col.updateOne(
    { pageKey: "behind-the-design" },
    {
      $set: {
        "hero.image": DEFAULT_BEHIND_THE_DESIGN.hero.image,
        steps,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  console.log("Updated CMS images to public/behind-the-design paths");
  console.log("Hero:", DEFAULT_BEHIND_THE_DESIGN.hero.image);
  for (const step of steps) {
    console.log(step.slug, step.image);
  }

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

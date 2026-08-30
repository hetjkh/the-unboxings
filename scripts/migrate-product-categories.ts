import { productCategories, products as staticProducts } from "../app/data/products";
import { getDb, isMongoConfigured } from "../lib/mongodb";

function resolveCategorySlug(image: string): string | null {
  if (image.includes("/staff-id-")) return "staff-id";
  if (image.includes("/keychain") || image.includes("/keychains/")) return "keychains";
  if (image.includes("/kitchen-apron")) return "aprons";
  if (image.includes("/luxury-gifts/") || ["/products/37.jpg", "/products/38.jpg", "/products/39.jpg", "/products/40.jpg"].includes(image)) {
    return "luxury-writing";
  }
  return null;
}

async function main() {
  if (!isMongoConfigured()) {
    console.error("MongoDB is not configured");
    process.exit(1);
  }

  const db = await getDb();
  const timestamp = new Date().toISOString();
  const containSlugs = new Set(["health-wellness", "apparel-uniforms", "aprons", "luxury-writing", "keychains", "staff-id"]);

  for (const [index, category] of productCategories.entries()) {
    await db.collection("categories").updateOne(
      { slug: category.slug },
      {
        $set: {
          name: category.name,
          image: category.image,
          description: category.description,
          headerImageFit: containSlugs.has(category.slug) ? "contain" : "cover",
          sortOrder: index,
          updatedAt: timestamp,
        },
        $setOnInsert: {
          slug: category.slug,
          featuredInNav: ["executive-gifts", "eco-collection", "tech-electronics"].includes(category.slug),
          createdAt: timestamp,
        },
      },
      { upsert: true },
    );
  }

  let moved = 0;
  for (const product of staticProducts) {
    const nextSlug = product.category;
    const result = await db.collection("products").updateMany(
      { image: product.image },
      { $set: { categorySlug: nextSlug, updatedAt: timestamp } },
    );
    if (result.modifiedCount > 0) moved += result.modifiedCount;
  }

  for (const product of await db.collection("products").find().toArray()) {
    const image = String(product.image ?? "");
    const inferred = resolveCategorySlug(image);
    if (!inferred || product.categorySlug === inferred) continue;
    await db.collection("products").updateOne(
      { _id: product._id },
      { $set: { categorySlug: inferred, updatedAt: timestamp } },
    );
    moved += 1;
  }

  await db.collection("solutions").updateOne(
    { slug: "event-merchandise" },
    { $set: { href: "/products/aprons", updatedAt: timestamp } },
  );
  await db.collection("solutions").updateOne(
    { slug: "staff-id-badges" },
    { $set: { href: "/products/staff-id", updatedAt: timestamp } },
  );
  await db.collection("solutions").updateOne(
    { slug: "luxury-gifts-solution" },
    {
      $set: {
        title: "Luxury Writing",
        slug: "luxury-writing-solution",
        href: "/products/luxury-writing",
        description:
          "Refined fountain pens, ballpoints and executive writing sets for client appreciation, milestones and senior relationships.",
        updatedAt: timestamp,
      },
    },
  );
  await db.collection("solutions").updateOne(
    { slug: "executive-gifts-solution" },
    { $set: { href: "/products/luxury-writing", updatedAt: timestamp } },
  );

  const categories = await db.collection("categories").countDocuments();
  const products = await db.collection("products").countDocuments();
  console.log(`Migration complete: ${categories} categories, ${products} products, ${moved} product updates applied.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { seedBrandStoriesIfMissing, seedResourcesIfMissing } from "@/lib/cms/content";

async function main() {
  const { seedDatabase } = await import("../lib/cms/queries");
  const result = await seedDatabase();
  console.log(result.message);

  await seedResourcesIfMissing();
  await seedBrandStoriesIfMissing();

  const { getCatalog } = await import("../lib/cms/queries");
  const { getResources, getBrandStories } = await import("../lib/cms/content");
  const catalog = await getCatalog();
  const resources = await getResources();
  const stories = await getBrandStories();
  console.log(
    `Catalog ready: ${catalog.categories.length} categories, ${catalog.products.length} products, ${catalog.solutions.length} solutions, ${resources.length} resources, ${stories.length} brand stories`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

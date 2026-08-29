import { getDb, isMongoConfigured } from "../mongodb";
import { DEFAULT_BEHIND_THE_DESIGN } from "./behind-the-design-defaults";
import { brandStories as staticBrandStories } from "../../app/data/brandStories";
import { resourceArticles as staticResources } from "../../app/data/resources";
import { productCategories, products as staticProducts } from "../../app/data/products";
import { serializeDoc } from "./serialize";
import type { CatalogData, Category, PageHero, Product, Solution } from "./types";

const STATIC_SOLUTIONS: Omit<Solution, "_id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Employee Welcome Kits",
    slug: "employee-welcome-kits",
    description:
      "Onboarding sets built from tech, office essentials and drinkware — a complete first-day experience in one branded box.",
    image: "/bo.png",
    href: "/products/office-essentials",
    tags: ["Onboarding", "HR"],
    sortOrder: 0,
    featuredInNav: true,
  },
  {
    title: "Event Merchandise",
    slug: "event-merchandise",
    description:
      "Coordinated apparel, kitchen aprons and uniforms for conferences, activations and teams that need to look like one brand on the floor.",
    image: "/products/slides/kitchen-apron-black.png",
    href: "/products/apparel-uniforms",
    tags: ["Events", "Kitchen"],
    sortOrder: 1,
    featuredInNav: true,
  },
  {
    title: "Executive Gifts",
    slug: "executive-gifts-solution",
    description:
      "Premium presentation sets for leadership, clients and milestones — considered pieces, not catalogue giveaways.",
    image: "/products/slides/luxury-gifts/executive-pen-set.png",
    href: "/products/executive-gifts",
    tags: ["Leadership", "VIP"],
    sortOrder: 2,
    featuredInNav: false,
  },
  {
    title: "Staff ID & Badges",
    slug: "staff-id-badges",
    description:
      "Branded lanyards, staff cards and illuminated badges for events, retail, hospitality and corporate teams.",
    image: "/products/slides/staff-id-premium-portrait-badge.png",
    href: "/products/office-essentials",
    tags: ["Events", "Staff"],
    sortOrder: 3,
    featuredInNav: true,
  },
  {
    title: "Packaging Solutions",
    slug: "packaging-solutions-solution",
    description:
      "Presentation packaging engineered around the product and the opening moment — for launches, handovers and gifting.",
    image: "/products/slides/packaging/red-exploding-gift-box.png",
    href: "/products/packaging-solutions",
    tags: ["Launch", "Unboxing"],
    sortOrder: 4,
    featuredInNav: false,
  },
  {
    title: "Luxury Gifts",
    slug: "luxury-gifts-solution",
    description:
      "Refined writing, fragrance and collectible gifts for client appreciation, seasonal giving and senior relationships.",
    image: "/products/slides/luxury-gifts/fountain-pen-leather.png",
    href: "/products/luxury-gifts",
    tags: ["Clients", "Seasonal"],
    sortOrder: 5,
    featuredInNav: true,
  },
];

const STATIC_PAGE_HEROES: Omit<PageHero, "_id" | "createdAt" | "updatedAt">[] = [
  {
    pageKey: "behind-the-design",
    label: "Behind the Design",
    image: "/sketch.png",
    alt: "Hand sketching trophy designs on tracing paper beside acrylic prototypes and material samples",
    title: "Behind the Design",
    subtitle: "Our process",
    description:
      "From an idea on paper to an experience in someone's hands. Every decision, detail and material turns a brand brief into something worth keeping.",
  },
];

function nowIso(): string {
  return new Date().toISOString();
}

function staticCatalog(): CatalogData {
  const timestamp = nowIso();
  const containSlugs = new Set(["health-wellness", "apparel-uniforms"]);

  const categories: Category[] = productCategories.map((category, index) => ({
    _id: `static-${category.slug}`,
    name: category.name,
    slug: category.slug,
    image: category.image,
    description: category.description,
    headerImageFit: containSlugs.has(category.slug) ? "contain" : "cover",
    sortOrder: index,
    featuredInNav: ["executive-gifts", "eco-collection", "tech-electronics"].includes(category.slug),
    createdAt: timestamp,
    updatedAt: timestamp,
  }));

  const products: Product[] = staticProducts.map((product, index) => ({
    _id: `static-${product.image}`,
    name: product.name,
    categorySlug: product.category,
    image: product.image,
    description: product.description,
    sortOrder: index,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));

  const solutions: Solution[] = STATIC_SOLUTIONS.map((solution, index) => ({
    ...solution,
    _id: `static-${solution.slug}`,
    sortOrder: index,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));

  const pageHeroes: PageHero[] = STATIC_PAGE_HEROES.map((hero) => ({
    ...hero,
    _id: `static-${hero.pageKey}`,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));

  return { categories, products, solutions, pageHeroes };
}

async function getCollectionCount(name: string): Promise<number> {
  const db = await getDb();
  return db.collection(name).countDocuments();
}

export async function getCatalog(): Promise<CatalogData> {
  if (!isMongoConfigured()) {
    return staticCatalog();
  }

  try {
    const db = await getDb();
    const [categoryCount, productCount] = await Promise.all([
      getCollectionCount("categories"),
      getCollectionCount("products"),
    ]);

    if (categoryCount === 0 || productCount === 0) {
      return staticCatalog();
    }

    const [categories, products, solutions, pageHeroes] = await Promise.all([
      db.collection("categories").find().sort({ sortOrder: 1, name: 1 }).toArray(),
      db.collection("products").find().sort({ sortOrder: 1, name: 1 }).toArray(),
      db.collection("solutions").find().sort({ sortOrder: 1, title: 1 }).toArray(),
      db.collection("pageHeroes").find().sort({ pageKey: 1 }).toArray(),
    ]);

    return {
      categories: categories.map((doc) => serializeDoc(doc) as unknown as Category),
      products: products.map((doc) => serializeDoc(doc) as unknown as Product),
      solutions: solutions.map((doc) => serializeDoc(doc) as unknown as Solution),
      pageHeroes: pageHeroes.map((doc) => serializeDoc(doc) as unknown as PageHero),
    };
  } catch {
    return staticCatalog();
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const catalog = await getCatalog();
  return catalog.categories.find((category) => category.slug === slug);
}

export async function getPageHero(pageKey: string): Promise<PageHero | undefined> {
  const catalog = await getCatalog();
  return catalog.pageHeroes.find((hero) => hero.pageKey === pageKey);
}

export async function seedDatabase(): Promise<{ seeded: boolean; message: string }> {
  if (!isMongoConfigured()) {
    return { seeded: false, message: "MongoDB is not configured" };
  }

  const db = await getDb();
  const categoryCount = await db.collection("categories").countDocuments();
  if (categoryCount > 0) {
    return { seeded: false, message: "Database already seeded" };
  }

  const catalog = staticCatalog();
  const timestamp = nowIso();

  await db.collection("categories").insertMany(
    catalog.categories.map(({ _id, ...category }) => ({
      ...category,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  await db.collection("products").insertMany(
    catalog.products.map(({ _id, ...product }) => ({
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  await db.collection("solutions").insertMany(
    catalog.solutions.map(({ _id, ...solution }) => ({
      ...solution,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  await db.collection("pageHeroes").insertMany(
    catalog.pageHeroes.map(({ _id, ...hero }) => ({
      ...hero,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  await db.collection("behindTheDesign").insertOne({
    ...DEFAULT_BEHIND_THE_DESIGN,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await db.collection("resources").insertMany(
    staticResources.map((article, index) => ({
      ...article,
      sortOrder: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  await db.collection("brandStories").insertMany(
    staticBrandStories.map((story, index) => ({
      ...story,
      gallery: [...story.gallery],
      sections: story.sections.map((section) => ({ ...section })),
      sortOrder: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );

  return { seeded: true, message: "Database seeded successfully" };
}

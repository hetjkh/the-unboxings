import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/cms/queries";
import { getBrandStories, getResources } from "@/lib/cms/content";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "daily", priority: 0.95 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/materials", changeFrequency: "monthly", priority: 0.75 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.75 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/occasions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/behind-the-design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/inspiration-gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.7 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.75 },
  { path: "/request-a-quote", changeFrequency: "monthly", priority: 0.85 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const [catalog, brandStories, resources] = await Promise.all([
      getCatalog(),
      getBrandStories(),
      getResources(),
    ]);

    const categoryEntries: MetadataRoute.Sitemap = catalog.categories.map((category) => ({
      url: absoluteUrl(`/products/${category.slug}`),
      lastModified: category.updatedAt ? new Date(category.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    const productEntries: MetadataRoute.Sitemap = catalog.products.map((product) => ({
      url: absoluteUrl(`/products/${product.categorySlug}/${product._id}`),
      lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const storyEntries: MetadataRoute.Sitemap = brandStories.map((story) => ({
      url: absoluteUrl(`/brand-stories/${story.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
      url: absoluteUrl(`/resources/${resource.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

    dynamicEntries = [...categoryEntries, ...productEntries, ...storyEntries, ...resourceEntries];
  } catch {
    // Sitemap still returns static routes if CMS is unavailable.
  }

  return [...staticEntries, ...dynamicEntries];
}

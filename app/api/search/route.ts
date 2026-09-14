import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/cms/queries";
import { getBrandStories, getResources } from "@/lib/cms/content";
import { plainTextFromRich } from "@/lib/cms/rich-text";

export const revalidate = 60;

export type SearchHit = {
  type: "product" | "category" | "solution" | "story" | "resource";
  title: string;
  description: string;
  href: string;
  image?: string;
  categorySlug?: string;
};

function matches(query: string, ...parts: string[]) {
  const haystack = parts.join(" ").toLowerCase();
  return query.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const categorySlug = (searchParams.get("category") ?? "").trim();

  const [catalog, stories, resources] = await Promise.all([
    getCatalog(),
    getBrandStories(),
    getResources(),
  ]);

  // Browse products inside a collection without leaving search.
  if (categorySlug) {
    const category = catalog.categories.find((item) => item.slug === categorySlug);
    const products = catalog.products
      .filter((product) => product.categorySlug === categorySlug)
      .map((product) => {
        const title = plainTextFromRich(product.name);
        const description = plainTextFromRich(product.description);
        return {
          type: "product" as const,
          title,
          description,
          href: `/products/${product.categorySlug}/${product._id}`,
          image: product.image,
          categorySlug: product.categorySlug,
        };
      });

    return NextResponse.json(
      {
        category: category
          ? {
              title: plainTextFromRich(category.name),
              slug: category.slug,
              description: plainTextFromRich(category.description),
              image: category.image,
            }
          : { title: categorySlug, slug: categorySlug, description: "", image: "" },
        results: products,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  }

  if (q.length < 2) {
    return NextResponse.json({ results: [] as SearchHit[] });
  }

  const results: SearchHit[] = [];

  for (const category of catalog.categories) {
    const title = plainTextFromRich(category.name);
    const description = plainTextFromRich(category.description);
    if (!matches(q, title, description, category.slug)) continue;
    results.push({
      type: "category",
      title,
      description,
      href: `/products/${category.slug}`,
      image: category.image,
      categorySlug: category.slug,
    });
  }

  for (const product of catalog.products) {
    const title = plainTextFromRich(product.name);
    const description = plainTextFromRich(product.description);
    if (!matches(q, title, description, product.categorySlug)) continue;
    results.push({
      type: "product",
      title,
      description,
      href: `/products/${product.categorySlug}/${product._id}`,
      image: product.image,
      categorySlug: product.categorySlug,
    });
  }

  for (const solution of catalog.solutions) {
    const title = plainTextFromRich(solution.title);
    const description = plainTextFromRich(solution.description);
    if (!matches(q, title, description, solution.slug, ...(solution.tags ?? []))) continue;
    results.push({
      type: "solution",
      title,
      description,
      href: solution.href || "/solutions",
      image: solution.image,
    });
  }

  for (const story of stories) {
    const title = plainTextFromRich(story.title);
    const description = plainTextFromRich(story.challenge || story.tagline || "");
    if (!matches(q, title, description, story.slug, story.materials)) continue;
    results.push({
      type: "story",
      title,
      description,
      href: `/brand-stories/${story.slug}`,
      image: story.image,
    });
  }

  for (const article of resources) {
    const title = plainTextFromRich(article.title);
    const description = plainTextFromRich(article.description || "");
    if (!matches(q, title, description, article.slug, article.category)) continue;
    results.push({
      type: "resource",
      title,
      description,
      href: `/resources/${article.slug}`,
      image: article.images?.[0]?.src,
    });
  }

  return NextResponse.json(
    { results: results.slice(0, 24) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    },
  );
}

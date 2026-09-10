import type { Category, Product, Solution } from "@/lib/cms/types";
import { plainTextFromRich } from "@/lib/cms/rich-text";

export type NavCatalog = {
  categories: Category[];
  solutions: Solution[];
};

export function buildNavCatalog(catalog: NavCatalog) {
  const productsLinks = catalog.categories.map((category) => ({
    label: plainTextFromRich(category.name),
    href: `/products/${category.slug}`,
  }));

  const solutionsLinks = catalog.solutions.map((solution) => ({
    label: plainTextFromRich(solution.title),
    href: solution.href,
  }));

  const productFeatures = catalog.categories
    .filter((category) => category.featuredInNav)
    .slice(0, 4)
    .map((category) => ({
      name: plainTextFromRich(category.name),
      image: category.image,
      href: `/products/${category.slug}`,
    }));

  const solutionFeatures = catalog.solutions
    .filter((solution) => solution.featuredInNav)
    .slice(0, 4)
    .map((solution) => ({
      name: plainTextFromRich(solution.title),
      image: solution.image,
      href: solution.href,
    }));

  return { productsLinks, solutionsLinks, productFeatures, solutionFeatures };
}

export function getCategoryNameFromCatalog(categories: Category[], slug: string): string {
  return plainTextFromRich(categories.find((category) => category.slug === slug)?.name ?? "Products");
}

export type GridProduct = Pick<Product, "_id" | "name" | "categorySlug" | "image" | "description">;

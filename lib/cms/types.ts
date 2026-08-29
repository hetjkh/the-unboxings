export type HeaderImageFit = "contain" | "cover";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  headerImageFit: HeaderImageFit;
  sortOrder: number;
  featuredInNav: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  categorySlug: string;
  image: string;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Solution {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
  sortOrder: number;
  featuredInNav: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageHero {
  _id: string;
  pageKey: string;
  label: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CatalogData {
  categories: Category[];
  products: Product[];
  solutions: Solution[];
  pageHeroes: PageHero[];
}

export type CategoryInput = Omit<Category, "_id" | "createdAt" | "updatedAt">;
export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;
export type SolutionInput = Omit<Solution, "_id" | "createdAt" | "updatedAt">;
export type PageHeroInput = Omit<PageHero, "_id" | "createdAt" | "updatedAt">;

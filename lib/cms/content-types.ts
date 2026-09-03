export type ResourceBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type ResourceImage = {
  src: string;
  alt: string;
};

export interface ResourceArticle {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  images: ResourceImage[];
  body: ResourceBlock[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ResourceInput = Omit<ResourceArticle, "_id" | "createdAt" | "updatedAt">;

export interface BrandStorySection {
  heading: string;
  body: string;
}

export interface BrandStory {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  challenge: string;
  materials: string;
  materialsDetail?: string;
  image: string;
  alt: string;
  gallery: string[];
  sections: BrandStorySection[];
  closing: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type BrandStoryInput = Omit<BrandStory, "_id" | "createdAt" | "updatedAt">;

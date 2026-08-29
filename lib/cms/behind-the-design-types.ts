export interface BehindTheDesignStep {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  detail: string;
  image: string;
  alt: string;
  sortOrder: number;
}

export interface BehindTheDesignContent {
  _id: string;
  pageKey: "behind-the-design";
  hero: {
    subtitle: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    image: string;
    alt: string;
    ctaText: string;
  };
  approach: {
    label: string;
    quote: string;
  };
  processHeader: {
    eyebrow: string;
    title: string;
    description: string;
  };
  steps: BehindTheDesignStep[];
  cta: {
    eyebrow: string;
    heading: string;
    linkText: string;
    linkHref: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type BehindTheDesignInput = Omit<BehindTheDesignContent, "_id" | "createdAt" | "updatedAt">;

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getDb, isMongoConfigured } from "../mongodb";
import { brandStories as staticBrandStories } from "../../app/data/brandStories";
import { resourceArticles as staticResources } from "../../app/data/resources";
import type { BrandStory, ResourceArticle } from "./content-types";
import { serializeDoc } from "./serialize";
import { CONTENT_CACHE_TAG, CMS_CACHE_REVALIDATE_SECONDS } from "./cache-tags";

const CACHE_REVALIDATE_SECONDS = CMS_CACHE_REVALIDATE_SECONDS;

function nowIso(): string {
  return new Date().toISOString();
}

function staticResourcesList(): ResourceArticle[] {
  const timestamp = nowIso();
  return staticResources.map((article, index) => ({
    ...article,
    _id: `static-${article.slug}`,
    sortOrder: index,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

function staticBrandStoriesList(): BrandStory[] {
  const timestamp = nowIso();
  return staticBrandStories.map((story, index) => ({
    ...story,
    gallery: [...story.gallery],
    sections: story.sections.map((section) => ({ ...section })),
    _id: `static-${story.slug}`,
    sortOrder: index,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

async function loadResourcesFromSource(): Promise<ResourceArticle[]> {
  if (!isMongoConfigured()) return staticResourcesList();

  try {
    const db = await getDb();
    const docs = await db.collection("resources").find().sort({ sortOrder: 1, title: 1 }).toArray();
    if (!docs.length) return staticResourcesList();
    return docs.map((doc) => serializeDoc(doc) as unknown as ResourceArticle);
  } catch {
    return staticResourcesList();
  }
}

function preferSmallBrandStoryImage(src: string): string {
  const map: Record<string, string> = {
    "/brand-stories/a-majlis-reimagined/hero.webp": "/brand-stories/a-majlis-reimagined/hero.sm.webp",
    "/brand-stories/dubai-skyline-chess-set/hero.webp": "/brand-stories/dubai-skyline-chess-set/hero.sm.webp",
    "/brand-stories/the-private-reveal/hero.webp": "/brand-stories/the-private-reveal/hero.sm.webp",
    "/brand-stories/dubai-developer-homeowners/hero.webp": "/brand-stories/dubai-developer-homeowners/hero.sm.webp",
  };
  return map[src] ?? src;
}

function withSmallBrandStoryImages(story: BrandStory): BrandStory {
  return {
    ...story,
    image: preferSmallBrandStoryImage(story.image),
  };
}

async function loadBrandStoriesFromSource(): Promise<BrandStory[]> {
  if (!isMongoConfigured()) return staticBrandStoriesList().map(withSmallBrandStoryImages);

  try {
    const db = await getDb();
    const docs = await db.collection("brandStories").find().sort({ sortOrder: 1, title: 1 }).toArray();
    if (!docs.length) return staticBrandStoriesList().map(withSmallBrandStoryImages);
    return docs
      .map((doc) => serializeDoc(doc) as unknown as BrandStory)
      .map(withSmallBrandStoryImages);
  } catch {
    return staticBrandStoriesList().map(withSmallBrandStoryImages);
  }
}

const getCachedResources = unstable_cache(loadResourcesFromSource, ["cms-resources"], {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAG],
});

const getCachedBrandStories = unstable_cache(loadBrandStoriesFromSource, ["cms-brand-stories"], {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: [CONTENT_CACHE_TAG],
});

export const getResources = cache(async (): Promise<ResourceArticle[]> => getCachedResources());

export async function getResourceBySlug(slug: string): Promise<ResourceArticle | undefined> {
  const resources = await getResources();
  return resources.find((article) => article.slug === slug);
}

export const getBrandStories = cache(async (): Promise<BrandStory[]> => getCachedBrandStories());

export async function getBrandStoryBySlug(slug: string): Promise<BrandStory | undefined> {
  const stories = await getBrandStories();
  return stories.find((story) => story.slug === slug);
}

export async function seedResourcesIfMissing(): Promise<void> {
  if (!isMongoConfigured()) return;
  const db = await getDb();
  const count = await db.collection("resources").countDocuments();
  if (count > 0) return;

  const timestamp = nowIso();
  await db.collection("resources").insertMany(
    staticResources.map((article, index) => ({
      ...article,
      sortOrder: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
  );
}

export async function seedBrandStoriesIfMissing(): Promise<void> {
  if (!isMongoConfigured()) return;
  const db = await getDb();
  const count = await db.collection("brandStories").countDocuments();
  if (count > 0) return;

  const timestamp = nowIso();
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
}

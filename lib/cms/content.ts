import { getDb, isMongoConfigured } from "../mongodb";
import { brandStories as staticBrandStories } from "../../app/data/brandStories";
import { resourceArticles as staticResources } from "../../app/data/resources";
import type { BrandStory, ResourceArticle } from "./content-types";
import { serializeDoc } from "./serialize";

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

export async function getResources(): Promise<ResourceArticle[]> {
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

export async function getResourceBySlug(slug: string): Promise<ResourceArticle | undefined> {
  const resources = await getResources();
  return resources.find((article) => article.slug === slug);
}

export async function getBrandStories(): Promise<BrandStory[]> {
  if (!isMongoConfigured()) return staticBrandStoriesList();

  try {
    const db = await getDb();
    const docs = await db.collection("brandStories").find().sort({ sortOrder: 1, title: 1 }).toArray();
    if (!docs.length) return staticBrandStoriesList();
    return docs.map((doc) => serializeDoc(doc) as unknown as BrandStory);
  } catch {
    return staticBrandStoriesList();
  }
}

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

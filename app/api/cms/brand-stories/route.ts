import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { seedBrandStoriesIfMissing } from "@/lib/cms/content";
import { slugify } from "@/lib/cms/serialize";
import { PLACEHOLDER_IMAGE } from "@/lib/cms/placeholders";
import type { BrandStoryInput } from "@/lib/cms/content-types";

export async function GET() {
  try {
    await seedBrandStoriesIfMissing();
    const collection = await getCollection("brandStories");
    const stories = await collection.find().sort({ sortOrder: 1, title: 1 }).toArray();
    return NextResponse.json(stories.map(mapDoc));
  } catch (error) {
    console.error("GET /api/cms/brand-stories failed:", error);
    return jsonError("Failed to load brand stories", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<BrandStoryInput>;
    if (!body.title?.trim()) return jsonError("Title is required");
    if (!body.tagline?.trim()) return jsonError("Tagline is required");

    const slug = body.slug?.trim() || slugify(body.title);
    const timestamp = new Date().toISOString();
    const doc = {
      slug,
      title: body.title.trim(),
      tagline: body.tagline.trim(),
      challenge: body.challenge?.trim() || "",
      materials: body.materials?.trim() || "",
      image: body.image?.trim() || PLACEHOLDER_IMAGE,
      alt: body.alt?.trim() || body.title.trim(),
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      sections: Array.isArray(body.sections) ? body.sections : [],
      closing: body.closing?.trim() || "",
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("brandStories");
    const existing = await collection.findOne({ slug });
    if (existing) return jsonError("A brand story with this slug already exists");

    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create brand story", 500);
  }
}

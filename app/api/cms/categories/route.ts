import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { slugify } from "@/lib/cms/serialize";
import { PLACEHOLDER_IMAGE } from "@/lib/cms/placeholders";
import type { CategoryInput } from "@/lib/cms/types";

export async function GET() {
  try {
    const collection = await getCollection("categories");
    const categories = await collection.find().sort({ sortOrder: 1, name: 1 }).toArray();
    return NextResponse.json(categories.map(mapDoc));
  } catch (error) {
    console.error("GET /api/cms/categories failed:", error);
    return jsonError("Failed to load categories", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<CategoryInput>;
    if (!body.name?.trim()) return jsonError("Name is required");
    if (!body.description?.trim()) return jsonError("Description is required");

    const slug = body.slug?.trim() || slugify(body.name);
    const timestamp = new Date().toISOString();
    const doc = {
      name: body.name.trim(),
      slug,
      image: body.image?.trim() || PLACEHOLDER_IMAGE,
      description: body.description.trim(),
      headerImageFit: body.headerImageFit === "contain" ? "contain" : "cover",
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
      featuredInNav: Boolean(body.featuredInNav),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("categories");
    const existing = await collection.findOne({ slug });
    if (existing) return jsonError("A category with this slug already exists");

    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create category", 500);
  }
}

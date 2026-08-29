import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { seedResourcesIfMissing } from "@/lib/cms/content";
import { slugify } from "@/lib/cms/serialize";
import type { ResourceInput } from "@/lib/cms/content-types";

export async function GET() {
  try {
    await seedResourcesIfMissing();
    const collection = await getCollection("resources");
    const resources = await collection.find().sort({ sortOrder: 1, title: 1 }).toArray();
    return NextResponse.json(resources.map(mapDoc));
  } catch (error) {
    console.error("GET /api/cms/resources failed:", error);
    return jsonError("Failed to load resources", 500);
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<ResourceInput>;
    if (!body.title?.trim()) return jsonError("Title is required");
    if (!body.description?.trim()) return jsonError("Description is required");

    const slug = body.slug?.trim() || slugify(body.title);
    const timestamp = new Date().toISOString();
    const doc = {
      slug,
      title: body.title.trim(),
      description: body.description.trim(),
      category: body.category?.trim() || "Resources",
      readTime: body.readTime?.trim() || "5 min read",
      images: Array.isArray(body.images) ? body.images : [],
      body: Array.isArray(body.body) ? body.body : [],
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("resources");
    const existing = await collection.findOne({ slug });
    if (existing) return jsonError("A resource with this slug already exists");

    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create resource", 500);
  }
}

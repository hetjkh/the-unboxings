import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { slugify } from "@/lib/cms/serialize";
import { PLACEHOLDER_IMAGE } from "@/lib/cms/placeholders";
import type { SolutionInput } from "@/lib/cms/types";

export async function GET() {
  const collection = await getCollection("solutions");
  const solutions = await collection.find().sort({ sortOrder: 1, title: 1 }).toArray();
  return NextResponse.json(solutions.map(mapDoc));
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<SolutionInput>;
    if (!body.title?.trim()) return jsonError("Title is required");
    if (!body.description?.trim()) return jsonError("Description is required");

    const slug = body.slug?.trim() || slugify(body.title);
    const timestamp = new Date().toISOString();
    const doc = {
      title: body.title.trim(),
      slug,
      description: body.description.trim(),
      image: body.image?.trim() || PLACEHOLDER_IMAGE,
      href: body.href?.trim() || "/solutions",
      tags: Array.isArray(body.tags) ? body.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
      featuredInNav: Boolean(body.featuredInNav),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("solutions");
    const existing = await collection.findOne({ slug });
    if (existing) return jsonError("A solution with this slug already exists");

    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create solution", 500);
  }
}

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { slugify, toObjectId } from "@/lib/cms/serialize";
import type { SolutionInput } from "@/lib/cms/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const body = (await request.json()) as Partial<SolutionInput>;
    const collection = await getCollection("solutions");

    const update = {
      ...(body.title !== undefined ? { title: body.title.trim() } : {}),
      ...(body.slug !== undefined ? { slug: body.slug.trim() || slugify(body.title ?? "") } : {}),
      ...(body.description !== undefined ? { description: body.description.trim() } : {}),
      ...(body.image !== undefined ? { image: body.image.trim() } : {}),
      ...(body.href !== undefined ? { href: body.href.trim() } : {}),
      ...(body.tags !== undefined
        ? { tags: body.tags.map((tag) => String(tag).trim()).filter(Boolean) }
        : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {}),
      ...(body.featuredInNav !== undefined ? { featuredInNav: Boolean(body.featuredInNav) } : {}),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!result) return jsonError("Solution not found", 404);
    await revalidateCatalog();
    return NextResponse.json(mapDoc(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to update solution", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const collection = await getCollection("solutions");
    const result = await collection.deleteOne({ _id: toObjectId(id) });
    if (!result.deletedCount) return jsonError("Solution not found", 404);
    await revalidateCatalog();
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to delete solution", 500);
  }
}

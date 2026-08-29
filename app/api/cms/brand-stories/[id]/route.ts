import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { slugify, toObjectId } from "@/lib/cms/serialize";
import type { BrandStoryInput } from "@/lib/cms/content-types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const body = (await request.json()) as Partial<BrandStoryInput>;
    const collection = await getCollection("brandStories");

    const update = {
      ...(body.title !== undefined ? { title: body.title.trim() } : {}),
      ...(body.slug !== undefined ? { slug: body.slug.trim() || slugify(body.title ?? "") } : {}),
      ...(body.tagline !== undefined ? { tagline: body.tagline.trim() } : {}),
      ...(body.challenge !== undefined ? { challenge: body.challenge.trim() } : {}),
      ...(body.materials !== undefined ? { materials: body.materials.trim() } : {}),
      ...(body.image !== undefined ? { image: body.image.trim() } : {}),
      ...(body.alt !== undefined ? { alt: body.alt.trim() } : {}),
      ...(body.gallery !== undefined ? { gallery: body.gallery } : {}),
      ...(body.sections !== undefined ? { sections: body.sections } : {}),
      ...(body.closing !== undefined ? { closing: body.closing.trim() } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {}),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!result) return jsonError("Brand story not found", 404);
    await revalidateCatalog();
    return NextResponse.json(mapDoc(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to update brand story", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const collection = await getCollection("brandStories");
    const result = await collection.deleteOne({ _id: toObjectId(id) });
    if (!result.deletedCount) return jsonError("Brand story not found", 404);
    await revalidateCatalog();
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to delete brand story", 500);
  }
}

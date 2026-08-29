import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { toObjectId } from "@/lib/cms/serialize";
import type { PageHeroInput } from "@/lib/cms/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const body = (await request.json()) as Partial<PageHeroInput>;
    const collection = await getCollection("pageHeroes");

    const update = {
      ...(body.pageKey !== undefined ? { pageKey: body.pageKey.trim() } : {}),
      ...(body.label !== undefined ? { label: body.label.trim() } : {}),
      ...(body.image !== undefined ? { image: body.image.trim() } : {}),
      ...(body.alt !== undefined ? { alt: body.alt.trim() } : {}),
      ...(body.title !== undefined ? { title: body.title.trim() } : {}),
      ...(body.subtitle !== undefined ? { subtitle: body.subtitle.trim() } : {}),
      ...(body.description !== undefined ? { description: body.description.trim() } : {}),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!result) return jsonError("Page hero not found", 404);
    await revalidateCatalog();
    return NextResponse.json(mapDoc(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to update page hero", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const collection = await getCollection("pageHeroes");
    const result = await collection.deleteOne({ _id: toObjectId(id) });
    if (!result.deletedCount) return jsonError("Page hero not found", 404);
    await revalidateCatalog();
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to delete page hero", 500);
  }
}

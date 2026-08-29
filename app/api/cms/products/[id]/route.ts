import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import { toObjectId } from "@/lib/cms/serialize";
import type { ProductInput } from "@/lib/cms/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const body = (await request.json()) as Partial<ProductInput>;
    const collection = await getCollection("products");

    const update = {
      ...(body.name !== undefined ? { name: body.name.trim() } : {}),
      ...(body.categorySlug !== undefined ? { categorySlug: body.categorySlug.trim() } : {}),
      ...(body.image !== undefined ? { image: body.image.trim() } : {}),
      ...(body.description !== undefined ? { description: body.description.trim() } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {}),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!result) return jsonError("Product not found", 404);
    await revalidateCatalog();
    return NextResponse.json(mapDoc(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to update product", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAuth();
    const { id } = await context.params;
    const collection = await getCollection("products");
    const result = await collection.deleteOne({ _id: toObjectId(id) });
    if (!result.deletedCount) return jsonError("Product not found", 404);
    await revalidateCatalog();
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to delete product", 500);
  }
}

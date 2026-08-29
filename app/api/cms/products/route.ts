import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import type { ProductInput } from "@/lib/cms/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const collection = await getCollection("products");
  const filter = categorySlug ? { categorySlug } : {};
  const products = await collection.find(filter).sort({ sortOrder: 1, name: 1 }).toArray();
  return NextResponse.json(products.map(mapDoc));
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<ProductInput>;
    if (!body.name?.trim()) return jsonError("Name is required");
    if (!body.categorySlug?.trim()) return jsonError("Category is required");
    if (!body.description?.trim()) return jsonError("Description is required");

    const timestamp = new Date().toISOString();
    const doc = {
      name: body.name.trim(),
      categorySlug: body.categorySlug.trim(),
      image: body.image?.trim() || "/uploads/placeholder.png",
      description: body.description.trim(),
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("products");
    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create product", 500);
  }
}

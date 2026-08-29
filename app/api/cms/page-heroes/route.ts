import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";
import type { PageHeroInput } from "@/lib/cms/types";

export async function GET() {
  const collection = await getCollection("pageHeroes");
  const heroes = await collection.find().sort({ pageKey: 1 }).toArray();
  return NextResponse.json(heroes.map(mapDoc));
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<PageHeroInput>;
    if (!body.pageKey?.trim()) return jsonError("Page key is required");
    if (!body.label?.trim()) return jsonError("Label is required");

    const timestamp = new Date().toISOString();
    const doc = {
      pageKey: body.pageKey.trim(),
      label: body.label.trim(),
      image: body.image?.trim() || "/uploads/placeholder.png",
      alt: body.alt?.trim() || body.label.trim(),
      title: body.title?.trim() || "",
      subtitle: body.subtitle?.trim() || "",
      description: body.description?.trim() || "",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const collection = await getCollection("pageHeroes");
    const existing = await collection.findOne({ pageKey: doc.pageKey });
    if (existing) return jsonError("A hero for this page key already exists");

    const result = await collection.insertOne(doc);
    await revalidateCatalog();
    return NextResponse.json(mapDoc({ ...doc, _id: result.insertedId }));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to create page hero", 500);
  }
}

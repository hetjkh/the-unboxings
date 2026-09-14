import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { serializeDoc } from "@/lib/cms/serialize";
import { CATALOG_CACHE_TAG, CONTENT_CACHE_TAG } from "@/lib/cms/cache-tags";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function revalidateCatalog() {
  revalidateTag(CATALOG_CACHE_TAG, "max");
  revalidateTag(CONTENT_CACHE_TAG, "max");
  revalidatePath("/products");
  revalidatePath("/products/[category]", "page");
  revalidatePath("/solutions");
  revalidatePath("/behind-the-design");
  revalidatePath("/resources");
  revalidatePath("/resources/[slug]", "page");
  revalidatePath("/brand-stories/[slug]", "page");
  revalidatePath("/inspiration-gallery");
  revalidatePath("/");
  revalidatePath("/api/nav");
  revalidatePath("/api/catalog");
}

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}

export function mapDoc<T>(doc: unknown) {
  return serializeDoc(doc as { _id: unknown });
}

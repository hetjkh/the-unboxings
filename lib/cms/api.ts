import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { serializeDoc } from "@/lib/cms/serialize";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function revalidateCatalog() {
  revalidatePath("/products");
  revalidatePath("/products/[category]", "page");
  revalidatePath("/solutions");
  revalidatePath("/behind-the-design");
  revalidatePath("/resources");
  revalidatePath("/resources/[slug]", "page");
  revalidatePath("/brand-stories/[slug]", "page");
  revalidatePath("/inspiration-gallery");
  revalidatePath("/");
}

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}

export function mapDoc<T>(doc: unknown) {
  return serializeDoc(doc as { _id: unknown });
}

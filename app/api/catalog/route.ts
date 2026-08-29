import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getCatalog, seedDatabase } from "@/lib/cms/queries";

export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json(catalog);
}

export async function POST() {
  try {
    await requireAuth();
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

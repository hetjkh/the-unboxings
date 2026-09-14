import { NextResponse } from "next/server";
import { getNavCatalog } from "@/lib/cms/queries";
import { buildNavCatalog } from "@/lib/cms/nav";

export const revalidate = 60;

export async function GET() {
  const catalog = await getNavCatalog();
  const nav = buildNavCatalog(catalog);

  return NextResponse.json(nav, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { jsonError } from "@/lib/cms/api";
import { getSiteSettings, saveSiteSettings, type SiteSettings } from "@/lib/cms/site-settings";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/cms/settings failed:", error);
    return jsonError("Failed to load settings", 500);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<SiteSettings>;
    const settings = await saveSiteSettings(body);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/products/[category]", "page");
    revalidatePath("/solutions");
    revalidatePath("/contact-us");
    return NextResponse.json(settings);
  } catch (error) {
    console.error("PUT /api/cms/settings failed:", error);
    return jsonError("Failed to save settings", 500);
  }
}

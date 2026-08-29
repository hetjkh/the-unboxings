import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { getBehindTheDesignContent, seedBehindTheDesignIfMissing } from "@/lib/cms/behind-the-design";
import type { BehindTheDesignInput } from "@/lib/cms/behind-the-design-types";
import { getCollection, jsonError, mapDoc, revalidateCatalog } from "@/lib/cms/api";

export async function GET() {
  try {
    await seedBehindTheDesignIfMissing();
    const content = await getBehindTheDesignContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/cms/behind-the-design failed:", error);
    return jsonError("Failed to load Behind the Design content", 500);
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as Partial<BehindTheDesignInput>;

    if (!body.hero || !body.approach || !body.processHeader || !body.steps || !body.cta) {
      return jsonError("All page sections are required");
    }

    const collection = await getCollection("behindTheDesign");
    const timestamp = new Date().toISOString();
    const update = {
      pageKey: "behind-the-design" as const,
      hero: body.hero,
      approach: body.approach,
      processHeader: body.processHeader,
      steps: body.steps.map((step, index) => ({ ...step, sortOrder: index })),
      cta: body.cta,
      updatedAt: timestamp,
    };

    const result = await collection.findOneAndUpdate(
      { pageKey: "behind-the-design" },
      {
        $set: update,
        $setOnInsert: { createdAt: timestamp },
      },
      { upsert: true, returnDocument: "after" },
    );

    await revalidateCatalog();
    return NextResponse.json(mapDoc(result));
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("PUT /api/cms/behind-the-design failed:", error);
    return jsonError("Failed to save Behind the Design content", 500);
  }
}

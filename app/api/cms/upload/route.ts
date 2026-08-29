import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/cms/auth";
import { jsonError } from "@/lib/cms/api";
import { saveUploadedFile } from "@/lib/cms/upload";

export async function POST(request: Request) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("No file uploaded");
    }

    if (!file.type.startsWith("image/")) {
      return jsonError("Only image files are allowed");
    }

    const path = await saveUploadedFile(file);
    return NextResponse.json({ path });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return jsonError("Failed to upload image", 500);
  }
}

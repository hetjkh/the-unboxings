import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { slugify } from "./rich-text";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/** Max edge for catalog photos — enough for retina cards without huge payloads. */
const MAX_IMAGE_EDGE = 1600;
const WEBP_QUALITY = 78;

function buildFileName(baseName: string, extension: string): string {
  const safeBase = slugify(baseName) || "image";
  return `${Date.now()}-${safeBase}${extension}`;
}

/**
 * Resize + convert to WebP so collection grids stay light.
 * Falls back to the original buffer if Sharp can't process the file.
 */
async function optimizeImageUpload(
  file: File,
  buffer: Buffer,
): Promise<{ buffer: Buffer; contentType: string; fileName: string }> {
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const baseName = originalName.replace(/\.[^.]+$/, "") || "image";

  try {
    const optimized = await sharp(buffer, { failOn: "none", animated: false })
      .rotate()
      .resize({
        width: MAX_IMAGE_EDGE,
        height: MAX_IMAGE_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();

    return {
      buffer: optimized,
      contentType: "image/webp",
      fileName: buildFileName(baseName, ".webp"),
    };
  } catch {
    const extension = path.extname(originalName) || ".png";
    return {
      buffer,
      contentType: file.type || "application/octet-stream",
      fileName: buildFileName(baseName, extension),
    };
  }
}

async function saveToLocalDisk(fileName: string, buffer: Buffer): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return `/uploads/${fileName}`;
}

function getBlobToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "");
}

async function saveToVercelBlob(
  fileName: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const token = getBlobToken();
  const options = {
    access: "public" as const,
    contentType,
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 31,
    ...(token ? { token } : {}),
  };

  try {
    const blob = await put(`uploads/${fileName}`, buffer, options);
    return blob.url;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Vercel Blob upload failed";
    throw new Error(message);
  }
}

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const raw = Buffer.from(bytes);
  const { buffer, contentType, fileName } = file.type.startsWith("image/")
    ? await optimizeImageUpload(file, raw)
    : {
        buffer: raw,
        contentType: file.type || "application/octet-stream",
        fileName: buildFileName(
          file.name.replace(/\.[^.]+$/, "") || "file",
          path.extname(file.name) || "",
        ),
      };

  if (process.env.VERCEL) {
    if (!getBlobToken() && !process.env.BLOB_STORE_ID) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN is missing. Connect your Blob store to this Vercel project, then redeploy.",
      );
    }
    return saveToVercelBlob(fileName, buffer, contentType);
  }

  if (getBlobToken()) {
    return saveToVercelBlob(fileName, buffer, contentType);
  }

  return saveToLocalDisk(fileName, buffer);
}

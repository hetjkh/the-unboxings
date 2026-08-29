import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { slugify } from "./serialize";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function buildFileName(file: File): string {
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const baseName = slugify(originalName.replace(/\.[^.]+$/, "")) || "image";
  const extension = path.extname(originalName) || ".png";
  return `${Date.now()}-${baseName}${extension}`;
}

async function saveToLocalDisk(file: File, fileName: string, buffer: Buffer): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return `/uploads/${fileName}`;
}

function getBlobToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "");
}

async function saveToVercelBlob(file: File, fileName: string, buffer: Buffer): Promise<string> {
  const token = getBlobToken();
  const options = {
    access: "public" as const,
    contentType: file.type || "application/octet-stream",
    addRandomSuffix: false,
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
  const buffer = Buffer.from(bytes);
  const fileName = buildFileName(file);

  if (process.env.VERCEL) {
    if (!getBlobToken() && !process.env.BLOB_STORE_ID) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN is missing. Connect your Blob store to this Vercel project, then redeploy.",
      );
    }
    return saveToVercelBlob(file, fileName, buffer);
  }

  if (getBlobToken()) {
    return saveToVercelBlob(file, fileName, buffer);
  }

  return saveToLocalDisk(file, fileName, buffer);
}

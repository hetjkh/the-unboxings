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

async function saveToVercelBlob(file: File, fileName: string, buffer: Buffer): Promise<string> {
  const blob = await put(`uploads/${fileName}`, buffer, {
    access: "public",
    contentType: file.type || "application/octet-stream",
    addRandomSuffix: false,
  });
  return blob.url;
}

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = buildFileName(file);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return saveToVercelBlob(file, fileName, buffer);
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Image uploads on Vercel require Vercel Blob. Add a Blob store in your Vercel project settings.",
    );
  }

  return saveToLocalDisk(file, fileName, buffer);
}

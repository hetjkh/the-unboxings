import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { slugify } from "./serialize";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const baseName = slugify(originalName.replace(/\.[^.]+$/, "")) || "image";
  const extension = path.extname(originalName) || ".png";
  const fileName = `${Date.now()}-${baseName}${extension}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, fileName), buffer);

  return `/uploads/${fileName}`;
}

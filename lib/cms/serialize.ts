import { ObjectId, type Document } from "mongodb";
import { plainTextFromRich } from "@/lib/cms/rich-text";

export function serializeDoc<T extends Document>(doc: T): T & { _id: string } {
  return {
    ...doc,
    _id: doc._id instanceof ObjectId ? doc._id.toString() : String(doc._id),
  } as T & { _id: string };
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

/** Always produces a URL-safe kebab slug (spaces, &, HTML entities stripped). */
export function slugify(value: string): string {
  return plainTextFromRich(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

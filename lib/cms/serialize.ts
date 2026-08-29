import { ObjectId, type Document } from "mongodb";

export function serializeDoc<T extends Document>(doc: T): T & { _id: string } {
  return {
    ...doc,
    _id: doc._id instanceof ObjectId ? doc._id.toString() : String(doc._id),
  } as T & { _id: string };
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

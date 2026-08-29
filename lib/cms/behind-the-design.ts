import { getDb, isMongoConfigured } from "../mongodb";
import { DEFAULT_BEHIND_THE_DESIGN } from "./behind-the-design-defaults";
import type { BehindTheDesignContent } from "./behind-the-design-types";
import { serializeDoc } from "./serialize";

function nowIso(): string {
  return new Date().toISOString();
}

function staticBehindTheDesign(): BehindTheDesignContent {
  const timestamp = nowIso();
  return {
    ...DEFAULT_BEHIND_THE_DESIGN,
    _id: "static-behind-the-design",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export async function getBehindTheDesignContent(): Promise<BehindTheDesignContent> {
  if (!isMongoConfigured()) {
    return staticBehindTheDesign();
  }

  try {
    const db = await getDb();
    const doc = await db.collection("behindTheDesign").findOne({ pageKey: "behind-the-design" });
    if (!doc) {
      return staticBehindTheDesign();
    }
    return serializeDoc(doc) as unknown as BehindTheDesignContent;
  } catch {
    return staticBehindTheDesign();
  }
}

export async function seedBehindTheDesignIfMissing(): Promise<void> {
  if (!isMongoConfigured()) return;

  const db = await getDb();
  const existing = await db.collection("behindTheDesign").findOne({ pageKey: "behind-the-design" });
  if (existing) return;

  const timestamp = nowIso();
  await db.collection("behindTheDesign").insertOne({
    ...DEFAULT_BEHIND_THE_DESIGN,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

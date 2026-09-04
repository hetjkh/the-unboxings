import { getDb, isMongoConfigured } from "../mongodb";

export type SiteSettings = {
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  whatsappNumber: process.env.WHATSAPP_NUMBER?.trim() || "97150000000",
  phoneNumber: process.env.CONTACT_PHONE?.trim() || "+971 50 000 0000",
  email: process.env.CONTACT_EMAIL?.trim() || "hello@theunboxing.ae",
};

const SETTINGS_KEY = "site";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isMongoConfigured()) return { ...DEFAULT_SITE_SETTINGS };

  try {
    const db = await getDb();
    const doc = await db.collection("siteSettings").findOne({ key: SETTINGS_KEY });
    if (!doc) return { ...DEFAULT_SITE_SETTINGS };

    return {
      whatsappNumber: String(doc.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber).trim(),
      phoneNumber: String(doc.phoneNumber || DEFAULT_SITE_SETTINGS.phoneNumber).trim(),
      email: String(doc.email || DEFAULT_SITE_SETTINGS.email).trim(),
    };
  } catch {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

export async function saveSiteSettings(input: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const next: SiteSettings = {
    whatsappNumber: input.whatsappNumber?.trim() || current.whatsappNumber,
    phoneNumber: input.phoneNumber?.trim() || current.phoneNumber,
    email: input.email?.trim() || current.email,
  };

  if (!isMongoConfigured()) return next;

  const db = await getDb();
  const timestamp = new Date().toISOString();
  await db.collection("siteSettings").updateOne(
    { key: SETTINGS_KEY },
    {
      $set: {
        key: SETTINGS_KEY,
        ...next,
        updatedAt: timestamp,
      },
      $setOnInsert: {
        createdAt: timestamp,
      },
    },
    { upsert: true },
  );

  return next;
}

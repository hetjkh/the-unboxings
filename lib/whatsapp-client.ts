import sharp from "sharp";

export type WhatsAppConnectionStatus =
  | "idle"
  | "connecting"
  | "qr"
  | "connected"
  | "disconnected"
  | "logged_out";

export type WhatsAppSessionSnapshot = {
  status: WhatsAppConnectionStatus;
  qrDataUrl: string | null;
  connectedJid: string | null;
  lastError: string | null;
  updatedAt: string;
};

export type WhatsAppMediaAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function serviceConfig() {
  const baseUrl = (process.env.WHATSAPP_SERVICE_URL || "").trim().replace(/\/+$/, "");
  const secret = (process.env.WHATSAPP_SERVICE_SECRET || "").trim();
  if (!baseUrl || !secret) {
    throw new Error(
      "WhatsApp service is not configured. Set WHATSAPP_SERVICE_URL and WHATSAPP_SERVICE_SECRET.",
    );
  }
  return { baseUrl, secret };
}

async function serviceFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<T> {
  const { baseUrl, secret } = serviceConfig();
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${secret}`);
  if (init?.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "WhatsApp service rejected the secret. Set the same WHATSAPP_SERVICE_SECRET on Vercel and the VPS.",
      );
    }
    if (response.status === 413) {
      throw new Error(
        "WhatsApp attachment too large for the VPS proxy (413). Raise nginx client_max_body_size to 25m.",
      );
    }
    throw new Error(data.error || `WhatsApp service error (${response.status}).`);
  }
  return data;
}

function isImageMedia(media: WhatsAppMediaAttachment): boolean {
  if (media.contentType?.startsWith("image/")) return true;
  return /\.(jpe?g|png|gif|webp)$/i.test(media.filename);
}

/** Shrink images before base64 transport so nginx (often 1mb) does not return 413. */
async function prepareMediaForTransport(media: WhatsAppMediaAttachment): Promise<{
  filename: string;
  contentBase64: string;
  contentType?: string;
}> {
  if (!isImageMedia(media)) {
    // Cap non-image payloads; oversized files still need nginx limit raised
    if (media.content.length > 2.5 * 1024 * 1024) {
      throw new Error("Attachment is too large for WhatsApp send (max ~2.5MB after email).");
    }
    return {
      filename: media.filename,
      contentBase64: media.content.toString("base64"),
      contentType: media.contentType,
    };
  }

  const jpeg = await sharp(media.content)
    .rotate()
    .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toBuffer();

  return {
    filename: media.filename.replace(/\.[^.]+$/, "") + ".jpg",
    contentBase64: jpeg.toString("base64"),
    contentType: "image/jpeg",
  };
}

export function getWhatsAppSnapshot(): Promise<WhatsAppSessionSnapshot> {
  return serviceFetch<WhatsAppSessionSnapshot>("/session");
}

export function startWhatsAppSession(): Promise<WhatsAppSessionSnapshot> {
  return serviceFetch<WhatsAppSessionSnapshot>("/session/start", { method: "POST", json: {} });
}

export function logoutWhatsAppSession(): Promise<WhatsAppSessionSnapshot> {
  return serviceFetch<WhatsAppSessionSnapshot>("/session/logout", { method: "POST", json: {} });
}

export async function sendWhatsAppBrief(
  phone: string,
  text: string,
  media?: WhatsAppMediaAttachment | null,
): Promise<void> {
  // Text first (small) so briefs still notify even if media is rejected
  await serviceFetch<{ ok: boolean }>("/send", {
    method: "POST",
    json: { phone, text, media: null },
  });

  if (!media || media.content.length === 0) return;

  try {
    const prepared = await prepareMediaForTransport(media);
    await serviceFetch<{ ok: boolean }>("/send", {
      method: "POST",
      json: {
        phone,
        text: `Attachment: ${prepared.filename}`,
        media: prepared,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Attachment send failed.";
    throw new Error(`WhatsApp text was sent, but the attachment failed: ${message}`);
  }
}

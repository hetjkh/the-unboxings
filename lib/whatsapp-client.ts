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

/** Keep base64 JSON under typical nginx limits after encoding (~33% overhead). */
const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

function serviceConfig() {
  const baseUrl = (process.env.WHATSAPP_SERVICE_URL || "").trim().replace(/\/+$/, "");
  const secret = (process.env.WHATSAPP_SERVICE_SECRET || "").trim();
  if (!baseUrl || !secret) {
    throw new Error(
      "WhatsApp service is not configured. Set WHATSAPP_SERVICE_URL and WHATSAPP_SERVICE_SECRET on Vercel.",
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

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
      cache: "no-store",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "network error";
    throw new Error(`Cannot reach WhatsApp service at ${baseUrl}: ${detail}`);
  }

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
  // Text first — VPS compresses attachments with sharp (not Vercel)
  await serviceFetch<{ ok: boolean }>("/send", {
    method: "POST",
    json: { phone, text, media: null },
  });

  if (!media || media.content.length === 0) return;

  if (media.content.length > MAX_MEDIA_BYTES) {
    throw new Error(
      `WhatsApp text was sent, but the attachment is too large (${Math.round(media.content.length / 1024)}KB). Max ~4MB.`,
    );
  }

  try {
    await serviceFetch<{ ok: boolean }>("/send", {
      method: "POST",
      json: {
        phone,
        text: `Attachment: ${media.filename}`,
        media: {
          filename: media.filename,
          contentBase64: media.content.toString("base64"),
          contentType: media.contentType,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Attachment send failed.";
    throw new Error(`WhatsApp text was sent, but the attachment failed: ${message}`);
  }
}

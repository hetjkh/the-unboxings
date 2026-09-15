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
  await serviceFetch<{ ok: boolean }>("/send", {
    method: "POST",
    json: {
      phone,
      text,
      media: media
        ? {
            filename: media.filename,
            contentBase64: media.content.toString("base64"),
            contentType: media.contentType,
          }
        : null,
    },
  });
}

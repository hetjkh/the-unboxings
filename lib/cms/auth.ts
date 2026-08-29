import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CMS_SESSION_COOKIE = "cms_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "dev";
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now()}`;
  const signature = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const separator = decoded.lastIndexOf(":");
    if (separator === -1) return false;

    const payload = decoded.slice(0, separator);
    const signature = decoded.slice(separator + 1);
    if (!payload.startsWith("admin:")) return false;

    const timestamp = Number(payload.split(":")[1]);
    if (!Number.isFinite(timestamp) || Date.now() - timestamp > SESSION_MAX_AGE_MS) {
      return false;
    }

    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (sigBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "dev";
  const input = Buffer.from(password);
  const target = Buffer.from(expected);
  if (input.length !== target.length) return false;
  return timingSafeEqual(input, target);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  return Boolean(token && verifySessionToken(token));
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

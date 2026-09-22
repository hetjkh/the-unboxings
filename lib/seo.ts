/**
 * Canonical site URL for sitemap, robots, Open Graph, etc.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://theunboxing.ae).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  const vercelUrl = process.env.VERCEL_URL?.trim().replace(/\/$/, "");
  if (vercelUrl) return `https://${vercelUrl}`;

  return "https://theunboxing.ae";
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

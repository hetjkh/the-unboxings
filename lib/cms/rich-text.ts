const ALLOWED_TAGS = new Set(["strong", "b", "em", "i", "u", "mark", "a", "br", "p", "span"]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function stripDisallowedTags(html: string): string {
  return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName: string) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (tag === "a") {
      const hrefMatch = match.match(/href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const href = hrefMatch?.[2] ?? hrefMatch?.[3] ?? hrefMatch?.[4] ?? "";
      if (!href || /^javascript:/i.test(href)) return "";
      if (match.startsWith("</")) return "</a>";
      return `<a href="${href.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer">`;
    }
    if (match.startsWith("</")) return `</${tag}>`;
    if (tag === "mark") return "<mark>";
    if (tag === "br") return "<br />";
    return `<${tag}>`;
  });
}

/** Decode common HTML entities (&amp; → &, &#39; → ', etc.) */
export function decodeHtmlEntities(value: string): string {
  if (!value || !value.includes("&")) return value;
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    const key = entity.toLowerCase();
    if (key in NAMED_ENTITIES) return NAMED_ENTITIES[key];
    if (key.startsWith("#x")) {
      const code = Number.parseInt(key.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (key.startsWith("#")) {
      const code = Number.parseInt(key.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return match;
  });
}

export function sanitizeRichText(input: string): string {
  if (!input) return "";
  if (!/[<>]/.test(input)) return decodeHtmlEntities(input);

  return stripDisallowedTags(
    input
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
      .replace(/javascript:/gi, ""),
  );
}

export function isRichText(value: string): boolean {
  return /<(strong|b|em|i|u|mark|a)\b/i.test(value);
}

export function plainTextFromRich(html: string): string {
  if (!html) return "";
  const stripped = /[<>]/.test(html)
    ? html.replace(/<br\s*\/?>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, "")
    : html;
  return decodeHtmlEntities(stripped).replace(/\s+/g, " ").trim();
}

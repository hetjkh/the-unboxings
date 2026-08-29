const ALLOWED_TAGS = new Set(["strong", "b", "em", "i", "u", "mark", "a", "br", "p", "span"]);

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

export function sanitizeRichText(input: string): string {
  if (!input) return "";
  if (!/[<>]/.test(input)) return input;

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
  if (!/[<>]/.test(html)) return html;
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

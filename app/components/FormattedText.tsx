import { sanitizeRichText } from "@/lib/cms/rich-text";

/**
 * CMS rich text often wraps content in <p>…</p>.
 * When FormattedText renders as a <span> or <p> inside another <p>, that nesting
 * is invalid HTML and causes React hydration mismatches. Flatten to inline markup.
 */
function flattenBlockParagraphs(html: string): string {
  if (!/<p\b/i.test(html)) return html;
  return html
    .replace(/<\/p>\s*<p\b[^>]*>/gi, "<br /><br />")
    .replace(/<\/?p\b[^>]*>/gi, "")
    .trim();
}

export default function FormattedText({
  html,
  className = "",
  as: Tag = "span",
}: {
  html: string;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  let safe = sanitizeRichText(html);
  if (Tag === "span" || Tag === "p") {
    safe = flattenBlockParagraphs(safe);
  }

  if (!/[<>]/.test(safe)) {
    return <Tag className={className}>{safe}</Tag>;
  }

  return <Tag className={`rich-text ${className}`.trim()} dangerouslySetInnerHTML={{ __html: safe }} />;
}

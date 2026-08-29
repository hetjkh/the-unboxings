import { sanitizeRichText } from "@/lib/cms/rich-text";

export default function FormattedText({
  html,
  className = "",
  as: Tag = "span",
}: {
  html: string;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  const safe = sanitizeRichText(html);

  if (!/[<>]/.test(safe)) {
    return <Tag className={className}>{safe}</Tag>;
  }

  return <Tag className={`rich-text ${className}`.trim()} dangerouslySetInnerHTML={{ __html: safe }} />;
}

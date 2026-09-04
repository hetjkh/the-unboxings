export function digitsOnlyPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = digitsOnlyPhone(phone);
  if (!digits) return "#";
  const text = encodeURIComponent(message.trim());
  return text ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/${digits}`;
}

export function productInquiryMessage(input: {
  name: string;
  category: string;
  description: string;
}): string {
  return [
    "Hi The Unboxing,",
    "",
    "I'd like details on this product:",
    "",
    `Product: ${input.name}`,
    `Category: ${input.category}`,
    `Description: ${input.description}`,
    "",
    "Please share pricing, MOQ and availability.",
  ].join("\n");
}

export function solutionInquiryMessage(input: {
  title: string;
  description: string;
  tags?: string[];
}): string {
  return [
    "Hi The Unboxing,",
    "",
    "I'd like details on this solution:",
    "",
    `Solution: ${input.title}`,
    input.tags?.length ? `Tags: ${input.tags.join(", ")}` : "",
    `Description: ${input.description}`,
    "",
    "Please share options, timeline and pricing guidance.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function projectBriefMessage(fields: Record<string, string>): string {
  const lines = [
    "Hi The Unboxing,",
    "",
    "I'd like to start a project. Here is my brief:",
    "",
  ];

  const order = [
    "company",
    "audience",
    "occasion",
    "quantity",
    "budget",
    "timeline",
    "industry",
    "objectives",
  ];

  for (const key of order) {
    const value = fields[key]?.trim();
    if (!value) continue;
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    lines.push(`${label}: ${value}`);
  }

  lines.push("", "Looking forward to your concepts.");
  return lines.join("\n");
}

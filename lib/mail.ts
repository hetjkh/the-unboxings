import nodemailer from "nodemailer";

export type ProjectBriefPayload = {
  company: string;
  contactPhone: string;
  contactEmail: string;
  location: string;
  locationCountry: string;
  audience: string;
  occasion: string;
  quantity: string;
  budget: string;
  timeline: string;
  industry: string;
  objectives: string;
  additionalNotes: string;
  specificIdeas: string;
  lookingFor: string;
  whereUsed: string;
  whatInMind: string;
  formVariant: string;
  productInterest: string;
  productCategory: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env.local / Vercel env.`);
  }
  return value;
}

export function getMailConfig() {
  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT?.trim() || "465"),
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS"),
    from: process.env.SMTP_FROM?.trim() || requiredEnv("SMTP_USER"),
    to: process.env.CONTACT_TO?.trim() || "hello@theunboxing.ae",
  };
}

export function createMailTransport() {
  const config = getMailConfig();
  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    }),
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildProjectBriefEmail(fields: ProjectBriefPayload) {
  const productRows = (
    [
      ["Product", fields.productInterest],
      ["Category", fields.productCategory],
    ] as const
  ).filter(([, value]) => value.trim());

  const isActivation = fields.formVariant.trim() === "activation";

  const briefRows = (
    [
      ["Company", fields.company],
      ["Contact number", fields.contactPhone],
      ["Email", fields.contactEmail],
      ["Delivery location", fields.location],
      ["International country", fields.locationCountry],
      ...(isActivation
        ? ([
            ["What are you looking for?", fields.lookingFor],
            ["Where will it be used?", fields.whereUsed],
            ["What should it achieve?", fields.objectives],
            ["When do you need it?", fields.timeline],
            ["What's your budget?", fields.budget],
            ["What do you have in mind?", fields.whatInMind],
          ] as const)
        : ([
            ["Audience", fields.audience],
            ["Occasion", fields.occasion],
            ["Quantity", fields.quantity],
            ["Budget", fields.budget],
            ["Timeline", fields.timeline],
            ["Industry", fields.industry],
            ["Objectives", fields.objectives],
            ["Additional notes", fields.additionalNotes],
            ["Specific ideas", fields.specificIdeas],
          ] as const)),
    ] as const
  ).filter(([, value]) => value.trim());

  const subjectProduct = fields.productInterest.trim() || "General enquiry";
  const subject = `Project brief — ${subjectProduct}${fields.company.trim() ? ` (${fields.company.trim()})` : ""}`;

  const text = [
    "New project brief from theunboxing.ae",
    "",
    ...(productRows.length
      ? ["PRODUCT", ...productRows.map(([label, value]) => `${label}: ${value}`), ""]
      : []),
    "BRIEF",
    ...briefRows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const renderRows = (rows: readonly (readonly [string, string])[]) =>
    rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(value)}</td></tr>`,
      )
      .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111;">
      <p style="margin:0 0 16px;">New project brief from <strong>theunboxing.ae</strong></p>
      ${
        productRows.length
          ? `<p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Product</p>
             <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${renderRows(productRows)}</table>`
          : ""
      }
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Brief</p>
      <table style="width:100%;border-collapse:collapse;">${renderRows(briefRows)}</table>
    </div>
  `;

  return { subject, text, html };
}

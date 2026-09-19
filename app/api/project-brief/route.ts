import { NextResponse } from "next/server";
import { buildProjectBriefEmail, createMailTransport, type ProjectBriefPayload } from "@/lib/mail";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { projectBriefMessage } from "@/lib/whatsapp";
import { sendWhatsAppBrief } from "@/lib/whatsapp-client";

export const runtime = "nodejs";

const FIELD_KEYS = [
  "company",
  "contactPhone",
  "contactEmail",
  "location",
  "locationCountry",
  "audience",
  "occasion",
  "quantity",
  "budget",
  "timeline",
  "industry",
  "objectives",
  "additionalNotes",
  "specificIdeas",
  "lookingFor",
  "whereUsed",
  "whatInMind",
  "formVariant",
  "productInterest",
  "productCategory",
] as const;

const MAX_FILE_BYTES = 8 * 1024 * 1024;

function readFields(form: FormData): ProjectBriefPayload {
  const fields = {} as ProjectBriefPayload;
  for (const key of FIELD_KEYS) {
    if (key === "location") {
      fields.location = form
        .getAll("location")
        .map((value) => String(value).trim())
        .filter(Boolean)
        .join(", ");
      continue;
    }
    fields[key] = String(form.get(key) ?? "").trim();
  }
  return fields;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const fields = readFields(form);

    const hasContent = Object.values(fields).some((value) => value.length > 0);
    if (!hasContent) {
      return NextResponse.json({ error: "Please fill in at least one field." }, { status: 400 });
    }

    const brief = form.get("brief");
    const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];

    if (brief instanceof Blob && brief.size > 0) {
      if (brief.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "Brief file must be under 8MB." }, { status: 400 });
      }

      const fileName =
        brief instanceof File && brief.name.trim() ? brief.name.trim() : "brief-upload";
      const buffer = Buffer.from(await brief.arrayBuffer());
      attachments.push({
        filename: fileName,
        content: buffer,
        contentType: brief.type || undefined,
      });
    }

    const { transporter, config } = createMailTransport();
    const email = buildProjectBriefEmail(fields);
    const attachmentNote =
      attachments.length > 0
        ? `\n\nAttachment included: ${attachments.map((item) => item.filename).join(", ")}`
        : "";

    await transporter.sendMail({
      from: `"The Unboxing Website" <${config.from}>`,
      to: config.to,
      replyTo: fields.contactEmail || config.from,
      subject: email.subject,
      text: `${email.text}${attachmentNote}`,
      html: `${email.html}${
        attachments.length
          ? `<p style="margin-top:20px;font-size:12px;color:#666;">Attachment included: <strong>${attachments
              .map((item) => item.filename)
              .join(", ")}</strong></p>`
          : ""
      }`,
      attachments,
    });

    let whatsapp: { ok: boolean; error?: string } = { ok: false };
    try {
      const settings = await getSiteSettings();
      const media = attachments[0] ?? null;
      await sendWhatsAppBrief(settings.whatsappNumber, projectBriefMessage(fields), media);
      whatsapp = { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "WhatsApp send failed.";
      console.error("[project-brief][whatsapp]", message);
      whatsapp = { ok: false, error: message };
      // Email already sent — still return success, but surface WhatsApp failure.
      return NextResponse.json(
        {
          ok: true,
          email: true,
          whatsapp,
          warning: `Email sent, but WhatsApp media/text failed: ${message}`,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true, email: true, whatsapp });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send brief.";
    console.error("[project-brief]", message);
    return NextResponse.json({ error: "Could not send your brief. Please try again." }, { status: 500 });
  }
}

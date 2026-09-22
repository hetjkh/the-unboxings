import { profile } from "../profile";

export function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.name}`,
    `ORG:${profile.company}`,
    `TITLE:${profile.role}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `URL:${profile.website}`,
    "ADR;TYPE=WORK:;;;Dubai;;;United Arab Emirates",
    "END:VCARD",
    "",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Himanshu-Arora.vcf"',
    },
  });
}

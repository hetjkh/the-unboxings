import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | The Unboxing",
  description:
    "Privacy Policy and GDPR information for The Unboxing — how we collect, use and protect your personal data.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who we are",
    body: [
      "The Unboxing (“we”, “us”, “our”) provides corporate gifting, branded merchandise and packaging solutions. This Privacy Policy explains how we collect, use, store and protect personal data when you visit theunboxing.ae, contact us, submit a project brief, subscribe to updates, or otherwise interact with our services.",
      "For privacy questions or to exercise your rights, contact us at hello@theunboxing.ae.",
    ],
  },
  {
    title: "Data we collect",
    body: [
      "Identity and contact details: name, email address, phone number, company name and job title when you submit forms or request a quote.",
      "Project and enquiry details: brief requirements, quantities, budgets, delivery preferences and any files you choose to share.",
      "Technical and usage data: IP address, browser type, device information, pages visited and approximate location, collected through cookies and similar technologies where permitted.",
      "Communication records: emails, WhatsApp messages and other correspondence related to your enquiry or order.",
    ],
  },
  {
    title: "How we use your data",
    body: [
      "To respond to enquiries, prepare proposals and fulfil orders.",
      "To manage client relationships and provide customer support.",
      "To send newsletters or marketing updates only where you have opted in, with an easy unsubscribe option.",
      "To improve our website, products and services, including analytics where you have consented to non-essential cookies.",
      "To meet legal, accounting and security obligations.",
    ],
  },
  {
    title: "Legal bases (GDPR)",
    body: [
      "Where the EU General Data Protection Regulation (GDPR) or similar laws apply, we process personal data on one or more of these bases:",
      "Consent — for example, newsletter sign-ups and non-essential cookies or analytics.",
      "Contract — to take steps at your request before entering a contract, or to perform a contract for goods or services.",
      "Legitimate interests — to operate, secure and improve our business in ways that do not override your rights.",
      "Legal obligation — where we must retain or disclose information by law.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "We use essential cookies required for the site to function. With your consent, we may also use analytics cookies (including Google Analytics) to understand how the site is used.",
      "You can accept or reject non-essential cookies via our cookie banner. You may change your choice later by clearing site data in your browser or contacting us. Rejecting non-essential cookies will not block access to the website.",
      "For more detail, see this Privacy Policy and our Terms & Conditions.",
    ],
  },
  {
    title: "Sharing and transfers",
    body: [
      "We do not sell your personal data. We may share data with trusted service providers who help us operate (for example email, hosting, analytics or messaging tools), only as needed and under appropriate safeguards.",
      "If data is transferred outside the UAE or the European Economic Area, we take steps to ensure an adequate level of protection, such as standard contractual clauses or equivalent measures where required.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We keep personal data only as long as needed for the purposes above, including enquiry follow-up, order fulfilment, legal retention and dispute resolution. When data is no longer required, we delete or anonymise it where practicable.",
    ],
  },
  {
    title: "Your rights (GDPR)",
    body: [
      "Subject to applicable law, you may have the right to:",
      "Access the personal data we hold about you.",
      "Request correction of inaccurate or incomplete data.",
      "Request erasure (“right to be forgotten”) in certain circumstances.",
      "Restrict or object to certain processing, including direct marketing.",
      "Receive your data in a portable format where processing is based on consent or contract and is carried out by automated means.",
      "Withdraw consent at any time where processing is based on consent, without affecting prior lawful processing.",
      "Lodge a complaint with a supervisory authority in your country of residence or work.",
      "To exercise these rights, email hello@theunboxing.ae. We may need to verify your identity before responding. We aim to reply within one month, or as required by law.",
    ],
  },
  {
    title: "Security",
    body: [
      "We apply reasonable technical and organisational measures to protect personal data against unauthorised access, loss, misuse or alteration. No method of transmission or storage is completely secure; please use strong passwords and share sensitive information carefully.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our website and services are directed at businesses and professionals. We do not knowingly collect personal data from children under 16. If you believe a child has provided us data, contact us and we will delete it where appropriate.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of the site after updates constitutes notice of the revised policy where permitted by law.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-5 py-16 text-black sm:px-8 md:px-16 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Legal</p>
          <h1 className="m-0 mt-4 text-4xl font-light tracking-[-0.04em] uppercase md:text-5xl">
            Privacy Policy
          </h1>
          <p className="m-0 mt-4 text-xs tracking-[0.06em] text-black/40 uppercase">
            Last updated: 23 September 2026
          </p>
          <p className="m-0 mt-8 text-sm leading-6 text-black/60">
            This policy describes how The Unboxing handles personal data in line with applicable privacy laws,
            including the EU General Data Protection Regulation (GDPR) where it applies to our visitors and clients.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title} aria-labelledby={`privacy-${section.title}`}>
                <h2
                  id={`privacy-${section.title}`}
                  className="m-0 text-lg font-medium tracking-[-0.02em] text-black"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="m-0 text-sm leading-6 text-black/60">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="m-0 mt-12 border-t border-black/10 pt-8 text-sm leading-6 text-black/60">
            Related:{" "}
            <Link href="/terms" className="text-black underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
            . Questions?{" "}
            <a href="mailto:hello@theunboxing.ae" className="text-black underline underline-offset-4">
              hello@theunboxing.ae
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Unboxing",
  description:
    "Terms and Conditions for using The Unboxing website and commissioning corporate gifting, merchandise and packaging services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "Agreement",
    body: [
      "These Terms & Conditions (“Terms”) govern your use of theunboxing.ae and any related enquiries, quotes or orders with The Unboxing (“we”, “us”, “our”). By using the site or engaging our services, you agree to these Terms.",
      "If you do not agree, please do not use the website or submit personal information through our forms.",
    ],
  },
  {
    title: "Services",
    body: [
      "We design and supply corporate gifting, branded merchandise, packaging and related services. Product images, descriptions and lead times on the website are indicative. Final specifications, pricing, MOQs and delivery dates are confirmed in a written quotation or order confirmation.",
      "Custom branding, packaging and bespoke work may require artwork approval, sampling and deposits before production begins.",
    ],
  },
  {
    title: "Quotes and orders",
    body: [
      "Quotes are valid for the period stated (or 14 days if none is stated), unless withdrawn earlier. An order is accepted when we confirm it in writing and any required deposit is received.",
      "You are responsible for ensuring that submitted artwork, logos and copy are accurate, lawful and that you have the rights to use them. We may decline work that infringes third-party rights or applicable law.",
    ],
  },
  {
    title: "Pricing and payment",
    body: [
      "Prices are as set out in the quotation, exclusive of applicable taxes, duties and shipping unless stated otherwise. Payment terms (including deposits and balance due dates) are specified in the quote or invoice.",
      "Late payment may delay production or delivery. We reserve the right to charge reasonable recovery costs for overdue amounts where permitted by law.",
    ],
  },
  {
    title: "Delivery",
    body: [
      "Delivery estimates are approximate and begin after artwork approval, deposit receipt and confirmation of all order details. Risk in goods typically passes on delivery to the address you provide, unless otherwise agreed.",
      "You must inspect deliveries promptly and notify us of shortages or visible damage within a reasonable time so we can assist with claims or replacements.",
    ],
  },
  {
    title: "Website use",
    body: [
      "You may use this website for lawful business purposes only. You must not attempt to disrupt the site, scrape content at scale without permission, or misuse forms (including spam or fraudulent submissions).",
      "All website content, branding and materials remain our property or that of our licensors. You may not copy or reuse them commercially without written consent.",
    ],
  },
  {
    title: "Privacy and cookies (GDPR)",
    body: [
      "How we collect and process personal data is described in our Privacy Policy, which forms part of these Terms. Where GDPR or similar laws apply, we process data under the legal bases set out in that policy.",
      "Non-essential cookies and analytics are used only with your consent via our cookie banner. You may accept or reject non-essential cookies. Essential cookies required for site operation may still be used.",
      "You may exercise GDPR rights (access, correction, erasure, restriction, objection, portability and withdrawal of consent) as explained in the Privacy Policy by contacting hello@theunboxing.ae.",
    ],
  },
  {
    title: "Disclaimer",
    body: [
      "The website is provided “as is”. While we aim for accuracy, we do not warrant that all content is complete, current or error-free. Nothing on the site constitutes a binding offer unless confirmed in a written quotation.",
      "To the fullest extent permitted by law, we are not liable for indirect, incidental or consequential losses arising from use of the website. Our liability for confirmed orders is limited as set out in the applicable quotation or, if silent, to the amount paid for the affected order.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These Terms are governed by the laws of the United Arab Emirates, without prejudice to mandatory consumer or data-protection rights that may apply in your country of residence under GDPR or other local law.",
      "Disputes will first be addressed in good faith. If unresolved, courts of Dubai, UAE shall have non-exclusive jurisdiction, unless mandatory law requires otherwise.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update these Terms from time to time. The “Last updated” date will change when we do. Continued use of the site after changes constitutes acceptance of the revised Terms where permitted by law.",
    ],
  },
  {
    title: "Contact",
    body: [
      "The Unboxing — Dubai, United Arab Emirates. Email: hello@theunboxing.ae. Phone: +971 50 602 3071.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-5 py-16 text-black sm:px-8 md:px-16 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Legal</p>
          <h1 className="m-0 mt-4 text-4xl font-light tracking-[-0.04em] uppercase md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="m-0 mt-4 text-xs tracking-[0.06em] text-black/40 uppercase">
            Last updated: 23 September 2026
          </p>
          <p className="m-0 mt-8 text-sm leading-6 text-black/60">
            Please read these Terms carefully before using our website or commissioning services from The Unboxing.
            They include important information about orders, privacy, cookies and GDPR-related rights.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title} aria-labelledby={`terms-${section.title}`}>
                <h2
                  id={`terms-${section.title}`}
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
            <Link href="/privacy" className="text-black underline underline-offset-4">
              Privacy Policy
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

"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our MOQ varies by product type. For most branded merchandise, we start from 50 units. Some products like premium executive gifts can be ordered in smaller quantities, while others like promotional merchandise have MOQs of 100–250 units. Contact us and we'll advise based on your specific requirements.",
  },
  {
    question: "How long does production take?",
    answer: "Lead times depend on product complexity and quantity. Standard branded items typically take 7–14 business days. Complex products with multiple branding techniques or custom packaging may require 15–21 days. Rush orders (under 7 days) are possible for select products with an additional charge. We always advise ordering 3–4 weeks ahead of your event or delivery date.",
  },
  {
    question: "What branding methods do you offer?",
    answer: "We offer a full suite of branding techniques: Laser Engraving, UV Printing, Screen Printing, Embroidery, Foil Stamping, Debossing, DTF (Direct-to-Film) Printing, Sublimation, and Digital Printing. The best method depends on your product, material, and design. Our team will recommend the most suitable option.",
  },
  {
    question: "Can we get a product sample before placing a bulk order?",
    answer: "Yes — we strongly encourage pre-production sampling. For branded samples, there is typically a sample charge that covers the production and branding of 1–3 units. This is often deducted from your final order once you proceed. Sample lead time is typically 5–7 business days.",
  },
  {
    question: "Can you handle custom packaging design?",
    answer: "Absolutely. Our packaging team designs and produces rigid boxes, magnetic closure boxes, mailer boxes, custom inserts, tissue paper, ribbons, personalized cards, and more. Packaging can be fully branded to match your corporate identity. Minimum quantities for custom packaging apply.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes. While we are UAE-based, we deliver worldwide. International shipping costs, duties, and lead times vary by destination. We work with trusted logistics partners to ensure safe, timely delivery. Contact us for a shipping quote to your specific location.",
  },
  {
    question: "Do you provide digital mockups before production?",
    answer: "Yes. Before any production begins, our design team prepares digital mockups showing your logo on the product. For complex orders, we can also produce a physical pre-production sample. Production only begins after your written approval.",
  },
  {
    question: "What file formats do you accept for logos?",
    answer: "For best results, we require vector files: AI, EPS, or PDF. PNG files with transparent backgrounds are acceptable for digital/UV printing. JPEG files are generally not recommended as they lack the resolution needed for high-quality branding.",
  },
  {
    question: "Can you source products not listed on your website?",
    answer: "Yes. We have access to a global sourcing network. If you have a specific product in mind, share the details and we'll source it for you. Custom product development is also possible for large-volume orders.",
  },
  {
    question: "Do you offer design services for gift concepts?",
    answer: "Yes. Our creative team can develop gift concept proposals based on your brief, including product selection, branding layout, and packaging design. This is complimentary for qualified inquiries.",
  },
  {
    question: "How can I discuss my requirements?",
    answer: "Contact us with your requirements — product type, quantity, delivery date, and budget. Our team will respond within 24 hours with a tailored proposal. You can also reach us by email or WhatsApp for urgent requirements.",
  },
  {
    question: "Do you have a catalogue?",
    answer: "We maintain a curated digital catalogue that we share upon request. Because our product range is constantly evolving and we offer custom sourcing, a consultation with our team often yields better results than browsing a static catalogue. Request yours via the form below.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-5 text-left text-xs leading-5 font-bold tracking-[-0.02em] text-black uppercase"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className={`ml-4 shrink-0 text-xl leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="m-0 text-xs leading-6 font-normal text-black/70">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section
          aria-label="Frequently Asked Questions"
          className="mx-auto w-full max-w-[720px] px-8 py-16 md:px-16 md:py-20"
        >
          <div className="text-center">
            <h1 className="m-0 text-xl leading-7 font-bold tracking-[-0.03em] text-black uppercase md:text-2xl md:leading-8">
              Frequently Asked Questions
            </h1>
            <p className="m-0 mt-4 text-xs leading-5 font-normal text-black/60">
              Everything you need to know about corporate gifting, MOQs, branding, and delivery.
            </p>
          </div>

          <div className="mt-14 border-t border-[#e5e5e5]">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Have a question that&apos;s not covered here?
            </p>
            <a
              href="/contact-us"
              className="mt-4 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
            >
              Contact Our Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

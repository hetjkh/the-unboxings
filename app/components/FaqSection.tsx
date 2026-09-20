import FaqAccordion from "./FaqAccordion";
import { homeFaqs } from "../data/faqs";

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:px-16 md:py-24">
        <header className="grid gap-7 border-t border-black pt-7 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">
              Questions, answered
            </p>
            <h2
              id="faq-heading"
              className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl"
            >
              FAQ
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="m-0 max-w-[650px] text-sm leading-6 text-black/50">
              MOQs, lead times, branding, sampling and delivery — the essentials, briefly.
            </p>
            <a
              href="/faq"
              className="mt-6 inline-flex items-center gap-3 border-b border-black pb-2 text-[10px] font-bold tracking-[0.1em] text-black uppercase no-underline"
            >
              View all FAQs <span aria-hidden="true">→</span>
            </a>
          </div>
        </header>

        <FaqAccordion items={homeFaqs} className="mt-12" />

        <div className="mt-10 grid gap-6 border-t border-black/20 pt-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <p className="m-0 max-w-[560px] text-sm leading-6 text-black/50">
            Looking for shipping, mockups, file formats or sourcing? The full FAQ covers every detail.
          </p>
          <a
            href="/faq"
            className="flex items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline md:justify-self-end md:w-full"
          >
            See the full FAQ <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

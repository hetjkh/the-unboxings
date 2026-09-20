import Header from "../components/Header";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";
import DeferredHomeMotion from "../components/DeferredHomeMotion";
import { faqs } from "../data/faqs";

export const metadata = {
  title: "FAQ | The Unboxing — Corporate Gifts UAE",
  description:
    "Answers about MOQs, lead times, branding methods, sampling, packaging, and delivery for The Unboxing.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <DeferredHomeMotion>
          <section
            aria-labelledby="faq-heading"
            className="bg-[#0a0a0a] px-5 py-16 text-white sm:px-8 md:px-16 md:py-24"
          >
            <div className="mx-auto max-w-[1440px] border-t border-white/25 pt-7">
              <p className="m-0 text-[10px] font-medium tracking-[0.22em] text-white/40 uppercase">
                Questions, answered
              </p>
              <div className="mt-10 grid gap-8 sm:mt-16 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <h1
                  id="faq-heading"
                  className="m-0 text-[clamp(2.75rem,9vw,8rem)] leading-[0.86] font-light tracking-[-0.07em] uppercase"
                >
                  FAQ
                </h1>
                <div className="min-w-0 border-t border-white/25 pt-6">
                  <p className="m-0 text-lg leading-7 font-light sm:text-xl">
                    Everything you need to know before the first unboxing.
                  </p>
                  <p className="m-0 mt-4 max-w-[520px] text-sm leading-6 text-white/50">
                    MOQs, lead times, branding, sampling, packaging and delivery — answered in one place.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="faq-directory-heading"
            className="bg-[#f1f0ec] px-5 py-16 text-black sm:px-8 md:px-16 md:py-24"
          >
            <div className="mx-auto max-w-[1440px]">
              <header className="grid gap-6 border-t border-black pt-7 md:grid-cols-2 md:items-end">
                <div>
                  <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">
                    01 / Answers
                  </p>
                  <h2
                    id="faq-directory-heading"
                    className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl"
                  >
                    The essentials
                  </h2>
                </div>
                <p className="m-0 max-w-[500px] text-sm leading-6 text-black/50 md:justify-self-end md:text-right">
                  From first brief to final delivery, these are the questions teams ask most often.
                </p>
              </header>

              <FaqAccordion items={faqs} className="mt-12 bg-white px-5 sm:px-8 md:px-10" />
            </div>
          </section>

          <section
            className="grid bg-[#cbd8d4] text-black md:grid-cols-[1.4fr_0.6fr]"
            aria-labelledby="faq-cta-heading"
          >
            <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">
                Still have a question?
              </p>
              <h2
                id="faq-cta-heading"
                className="m-0 mt-4 max-w-[780px] text-[clamp(1.75rem,5vw,3rem)] leading-tight font-light tracking-[-0.04em] md:text-5xl"
              >
                Tell us about the moment, the people and what you want to achieve.
              </h2>
            </div>
            <div className="flex items-end border-t border-black/15 px-5 py-8 sm:px-8 sm:py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
              <a
                href="/contact-us#start-project"
                className="flex min-h-12 w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline"
              >
                Contact our team <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>
        </DeferredHomeMotion>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMotion from "../components/HomeMotion";
import { getBehindTheDesignContent } from "@/lib/cms/behind-the-design";
import FormattedText from "../components/FormattedText";

export const metadata: Metadata = {
  title: "Behind the Design | The Unboxing",
  description: "See how The Unboxing turns an initial idea into a considered, beautifully made experience.",
};

export const revalidate = 60;

function ProcessImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1200}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  );
}

export default async function BehindTheDesignPage() {
  const content = await getBehindTheDesignContent();
  const steps = [...content.steps].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <Header />
      <main>
        <HomeMotion>
        <section aria-labelledby="behind-design-heading" className="grid bg-[#0a0a0a] text-white lg:min-h-[calc(100svh-72px)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between px-8 py-14 md:px-16 md:py-20">
            <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase">{content.hero.subtitle}</p>
            <div className="mt-24">
              <h1 id="behind-design-heading" className="m-0 text-[clamp(3.25rem,7vw,7rem)] leading-[0.87] font-light tracking-[-0.07em] uppercase">
                {content.hero.titleLine1}<br />{content.hero.titleLine2}
              </h1>
              <p className="m-0 mt-8 max-w-[530px] border-t border-white/25 pt-6 text-sm leading-6 text-white/60 md:text-base md:leading-7">
                <FormattedText html={content.hero.description} />
              </p>
              <a href="#process" className="mt-8 inline-flex items-center gap-3 border-b border-white pb-2 text-[10px] font-bold tracking-[0.12em] text-white uppercase no-underline">
                {content.hero.ctaText} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div data-motion-media className="relative flex min-h-[520px] items-center justify-center bg-[#0a0a0a] p-4 lg:min-h-full lg:p-8">
            <ProcessImage
              src={content.hero.image}
              alt={content.hero.alt}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="max-h-[min(85svh,900px)] object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </section>

        <section aria-label="Our approach" className="grid border-b border-[#dedede] bg-white md:grid-cols-[0.7fr_1.3fr]">
          <div className="px-8 py-10 md:px-16 md:py-16">
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">{content.approach.label}</p>
          </div>
          <div className="border-t border-[#dedede] px-8 py-10 md:border-t-0 md:border-l md:px-16 md:py-16">
            <p className="m-0 max-w-[800px] text-2xl leading-8 font-light tracking-[-0.035em] md:text-4xl md:leading-[1.2]">
              <FormattedText html={content.approach.quote} />
            </p>
          </div>
        </section>

        <section id="process" aria-labelledby="process-heading" className="scroll-mt-[72px] bg-white px-8 py-16 text-black md:px-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 flex flex-col gap-5 border-t border-black pt-7 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">{content.processHeader.eyebrow}</p>
                <h2 id="process-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">
                  <FormattedText html={content.processHeader.title} />
                </h2>
              </div>
              <p className="m-0 max-w-[470px] text-sm leading-6 text-black/50 md:text-right">
                <FormattedText html={content.processHeader.description} />
              </p>
            </header>

            <ol className="m-0 list-none border-t border-l border-black/20 p-0">
              {steps.map((step, index) => {
                const imageFirst = index % 2 === 0;
                return (
                  <li data-motion-card key={step.slug} className="relative grid md:grid-cols-2 md:items-stretch">
                    <div data-motion-media className={`bg-[#0a0a0a] ${imageFirst ? "md:order-1" : "md:order-2"}`}>
                      <ProcessImage
                        src={step.image}
                        alt={step.alt}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="transition-transform duration-1000 hover:scale-[1.01]"
                      />
                    </div>
                    <div className={`flex min-h-[320px] flex-col justify-between border-r border-b border-black/20 bg-[#f1f0ec] p-7 md:h-full md:p-12 lg:p-16 ${imageFirst ? "md:order-2" : "md:order-1"}`}>
                      <span className="text-[10px] font-medium tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                      <div className="flex flex-1 flex-col justify-center py-8 md:py-10">
                        <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">{step.tagline}</p>
                        <h3 className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-4xl">
                          <FormattedText html={step.title} />
                        </h3>
                        <p className="m-0 mt-5 max-w-[420px] text-sm leading-6 text-black/60 md:text-base md:leading-7">
                          <FormattedText html={step.description} />
                        </p>
                        <p className="m-0 mt-5 max-w-[420px] border-t border-black/10 pt-5 text-sm leading-6 text-black/45 md:text-base md:leading-7">
                          <FormattedText html={step.detail} />
                        </p>
                      </div>
                      <span className="text-black/40" aria-hidden="true">↓</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="grid bg-[#cbd8d4] text-black md:grid-cols-[1.4fr_0.6fr]" aria-labelledby="design-cta-heading">
          <div className="px-8 py-14 md:px-16 md:py-20">
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">{content.cta.eyebrow}</p>
            <h2 id="design-cta-heading" className="m-0 mt-4 max-w-[820px] text-3xl leading-tight font-light tracking-[-0.04em] md:text-5xl">
              <FormattedText html={content.cta.heading} />
            </h2>
          </div>
          <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
            <a href={content.cta.linkHref} className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline">{content.cta.linkText} <span aria-hidden="true">→</span></a>
          </div>
        </section>
        </HomeMotion>
      </main>
      <Footer />
    </>
  );
}

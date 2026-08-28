import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMotion from "../components/HomeMotion";

export const metadata: Metadata = {
  title: "Behind the Design | The Unboxing",
  description: "See how The Unboxing turns an initial idea into a considered, beautifully made experience.",
};

const steps = [
  {
    title: "Idea",
    tagline: "The Thought",
    description: "We begin with the brand, the audience and the moment it needs to create.",
    detail: "The process begins on paper. Ideas are questioned, explored and refined before a single dimension is decided.",
    image: "/behind-the-design/idea.png",
    alt: "Concept notes, sketches and a black box asking what the experience should feel like",
  },
  {
    title: "Sketch",
    tagline: "The Sketch",
    description: "Possibilities take shape on paper before materials set any limits.",
    detail: "Multiple concepts are explored, challenged and refined until the right form emerges — designing the packaging and the object as one complete experience.",
    image: "/behind-the-design/sketch.png",
    alt: "Hand-drawn box concept sketches exploring opening mechanisms and bottle forms",
  },
  {
    title: "3D Design",
    tagline: "The Measure",
    description: "Form, proportion and function are resolved down to the smallest detail.",
    detail: "Precision turns an idea into something buildable. Every dimension, clearance and mechanism is carefully considered so the final experience feels effortless and refined.",
    image: "/behind-the-design/3d-design.png",
    alt: "Hands measuring a prototype beside CAD models, technical drawings and hardware",
  },
  {
    title: "Prototype",
    tagline: "The Prototype",
    description: "The idea becomes something tangible that we can hold, assess and improve.",
    detail: "Prototyping turns assumptions into answers. Each version tests the structure, fit and reveal — refining every detail before the final piece moves into production.",
    image: "/behind-the-design/prototype.png",
    alt: "Two packaging prototypes compared for structure and reveal experience",
  },
  {
    title: "Material Selection",
    tagline: "The Layers",
    description: "Every texture, weight and finish is chosen with purpose.",
    detail: "Every layer is designed with intention. From story and materials to personal details and the final object, each reveal builds anticipation for what comes next.",
    image: "/behind-the-design/materials.png",
    alt: "Stacked drawers with wood, stone and fabric samples beside hinges and hardware",
  },
  {
    title: "Production",
    tagline: "The Assembly",
    description: "Precision technology and practiced craftsmanship work together.",
    detail: "Every component is finished separately, then precisely brought together. Structure, materials, hidden mechanisms and illumination become one seamless final experience.",
    image: "/behind-the-design/production.png",
    alt: "Exploded view of lid, trays, mechanisms, illuminated base and bottle assembled as one",
  },
  {
    title: "Packaging",
    tagline: "The Final Product",
    description: "The reveal is designed as carefully as the piece itself.",
    detail: "The final form is intentionally restrained, allowing the experience to unfold through discovery. What appears simple from the outside transforms layer by layer.",
    image: "/behind-the-design/packaging.png",
    alt: "Closed presentation box beside the open illuminated packaging reveal",
  },
  {
    title: "Delivery",
    tagline: "The Masterpiece",
    description: "The final experience reaches the people it was designed for.",
    detail: "What began as an idea becomes a fully resolved experience — where material, structure, light and detail lead to one defining moment: the object itself.",
    image: "/behind-the-design/delivery.png",
    alt: "Finished perfume bottle revealed in its illuminated presentation box",
  },
] as const;

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

export default function BehindTheDesignPage() {
  return (
    <>
      <Header />
      <main>
        <HomeMotion>
        <section aria-labelledby="behind-design-heading" className="grid bg-[#0a0a0a] text-white lg:min-h-[calc(100svh-72px)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-between px-8 py-14 md:px-16 md:py-20">
            <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase">Our process</p>
            <div className="mt-24">
              <h1 id="behind-design-heading" className="m-0 text-[clamp(3.25rem,7vw,7rem)] leading-[0.87] font-light tracking-[-0.07em] uppercase">
                Behind the<br />Design
              </h1>
              <p className="m-0 mt-8 max-w-[530px] border-t border-white/25 pt-6 text-sm leading-6 text-white/60 md:text-base md:leading-7">
                From an idea on paper to an experience in someone&apos;s hands. Every decision, detail and material turns a brand brief into something worth keeping.
              </p>
              <a href="#process" className="mt-8 inline-flex items-center gap-3 border-b border-white pb-2 text-[10px] font-bold tracking-[0.12em] text-white uppercase no-underline">
                Explore the process <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div data-motion-media className="relative flex min-h-[520px] items-center justify-center bg-[#0a0a0a] p-4 lg:min-h-full lg:p-8">
            <ProcessImage
              src="/sketch.png"
              alt="Hand sketching trophy designs on tracing paper beside acrylic prototypes and material samples"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="max-h-[min(85svh,900px)] object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </section>

        <section aria-label="Our approach" className="grid border-b border-[#dedede] bg-white md:grid-cols-[0.7fr_1.3fr]">
          <div className="px-8 py-10 md:px-16 md:py-16">
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">What happens behind the object</p>
          </div>
          <div className="border-t border-[#dedede] px-8 py-10 md:border-t-0 md:border-l md:px-16 md:py-16">
            <p className="m-0 max-w-[800px] text-2xl leading-8 font-light tracking-[-0.035em] md:text-4xl md:leading-[1.2]">The final piece is only the visible part. The real value is built through the thinking, testing and craft that comes before it.</p>
          </div>
        </section>

        <section id="process" aria-labelledby="process-heading" className="scroll-mt-[72px] bg-white px-8 py-16 text-black md:px-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 flex flex-col gap-5 border-t border-black pt-7 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Eight considered stages</p>
                <h2 id="process-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">From thought to form</h2>
              </div>
              <p className="m-0 max-w-[470px] text-sm leading-6 text-black/50 md:text-right">One continuous process, shaped by curiosity, tested through craft and carried through to the final reveal.</p>
            </header>

            <ol className="m-0 list-none border-t border-l border-black/20 p-0">
              {steps.map((step, index) => {
                const imageFirst = index % 2 === 0;
                return (
                  <li data-motion-card key={step.title} className="relative grid md:grid-cols-2 md:items-stretch">
                    <div data-motion-media className={`bg-[#0a0a0a] ${imageFirst ? "md:order-1" : "md:order-2"}`}>
                      <ProcessImage
                        src={step.image}
                        alt={step.alt}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="transition-transform duration-1000 hover:scale-[1.01]"
                      />
                    </div>
                    <div className={`flex min-h-[320px] flex-col justify-between border-r border-b border-black/20 bg-[#f1f0ec] p-7 md:h-full md:p-12 lg:p-16 ${imageFirst ? "md:order-2" : "md:order-1"}`}>
                      <span className="text-[10px] font-medium tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, "0")} / 08</span>
                      <div className="flex flex-1 flex-col justify-center py-8 md:py-10">
                        <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">{step.tagline}</p>
                        <h3 className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-4xl">{step.title}</h3>
                        <p className="m-0 mt-5 max-w-[420px] text-sm leading-6 text-black/60 md:text-base md:leading-7">{step.description}</p>
                        <p className="m-0 mt-5 max-w-[420px] border-t border-black/10 pt-5 text-sm leading-6 text-black/45 md:text-base md:leading-7">{step.detail}</p>
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
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">Designed around your story</p>
            <h2 id="design-cta-heading" className="m-0 mt-4 max-w-[820px] text-3xl leading-tight font-light tracking-[-0.04em] md:text-5xl">Not sourced from a catalogue. Designed from the story up.</h2>
          </div>
          <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
            <a href="/contact-us#start-project" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline">Start your design journey <span aria-hidden="true">→</span></a>
          </div>
        </section>
        </HomeMotion>
      </main>
      <Footer />
    </>
  );
}

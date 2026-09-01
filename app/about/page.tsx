import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | The Unboxing — Corporate Gifts & Branded Merchandise UAE",
  description:
    "We don't start with a catalogue. We start with your story. Custom corporate gifts, branded merchandise and packaging experiences from The Unboxing.",
};

const differentiators = [
  {
    title: "We Start With the Idea",
    description:
      "We begin with the occasion, the recipient and the story you want to tell then find or create the right object around it.",
  },
  {
    title: "Designed, Not Just Branded",
    description:
      "From form and materials to colour, finish and functionality, customization goes far beyond placing a logo on a product.",
  },
  {
    title: "Packaging Is Part of the Gift",
    description:
      "We design the reveal as carefully as the product itself, turning packaging into part of the experience.",
  },
  {
    title: "Materials That Change the Idea",
    description:
      "Acrylic, wood, leather, glass, metal, crystal, fabric and more selected to give each concept its own character.",
  },
  {
    title: "From Concept to Delivery",
    description:
      "Design, prototyping, sourcing, production, quality control, packaging and delivery managed as one connected process.",
  },
  {
    title: "Built for 50 or 5,000",
    description:
      "From intimate executive gifting to large-scale campaigns, every project receives the same attention to detail.",
  },
] as const;

const purposePrinciples = [
  {
    title: "Considered, Not Generic",
    description: "Every gift begins with a purpose, a person and a moment not a catalogue.",
  },
  {
    title: "Personal, Not Promotional",
    description: "We create branded experiences that feel thoughtful, relevant and genuinely worth receiving.",
  },
  {
    title: "Kept, Not Forgotten",
    description:
      "Because the best corporate gifts aren't simply opened. They're used, displayed, remembered and kept.",
  },
] as const;

const process = [
  {
    title: "Understand the Moment",
    description: "Tell us who it's for, why you're gifting and what you want the experience to achieve.",
  },
  {
    title: "Create the Concept",
    description: "We explore ideas, products, materials and packaging to build a direction around your brand.",
  },
  {
    title: "Design & Prototype",
    description: "From branding and finishes to mockups and samples, we refine the details before production begins.",
  },
  {
    title: "Craft & Quality Check",
    description: "Once approved, we manage production with attention to craftsmanship, consistency and quality.",
  },
  {
    title: "Package & Deliver",
    description: "Every piece is prepared, presented and delivered ready for its final moment—the unboxing.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="about-heading" className="bg-[#0a0a0a] text-white">
          <div className="grid min-h-[calc(100svh-72px)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/45 uppercase">
                About The Unboxing
              </p>
              <div className="mt-24">
                <h1
                  id="about-heading"
                  className="m-0 text-[clamp(3.25rem,7vw,7rem)] leading-[0.87] font-light tracking-[-0.07em] uppercase"
                >
                  Your Branding
                  <br />
                  Partner
                </h1>
                <p className="m-0 mt-8 max-w-[500px] border-t border-white/25 pt-6 text-sm leading-6 text-white/60 md:text-base md:leading-7">
                  We don&apos;t start with a catalogue.
                  <br />
                  We start with your story.
                </p>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">
              <Image
                src="/made-in-italy-workshop.png"
                alt="A specialist maker hand-finishing a premium presentation object"
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section aria-labelledby="who-we-are-heading" className="bg-white px-8 py-16 text-black md:px-16 md:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[0.45fr_1.55fr] md:gap-20">
            <div>
              <span className="text-[10px] font-medium tracking-[0.2em] text-black/40">01 / WHO WE ARE</span>
              <h2 id="who-we-are-heading" className="m-0 mt-4 text-sm font-bold tracking-[0.08em] uppercase">
                Built around your brand
              </h2>
            </div>
            <div>
              <p className="m-0 max-w-[980px] text-[clamp(1.8rem,3.5vw,3.75rem)] leading-[1.08] font-light tracking-[-0.045em]">
                We don&apos;t start with a catalogue.
                <br />
                We start with your story.
              </p>
              <p className="m-0 mt-8 max-w-[760px] text-sm leading-6 text-black/55 md:text-base md:leading-7">
                The Unboxing creates custom corporate gifts, branded merchandise and packaging experiences designed around the people, moments and brands they represent.
              </p>
              <div className="mt-10 grid gap-6 border-t border-black/20 pt-7 md:grid-cols-2 md:gap-12">
                <p className="m-0 text-sm leading-6 text-black/55">
                  From a first idea to the final unboxing, we bring together{" "}
                  <strong className="font-semibold text-black/75">
                    concept, design, materials, customization, production and packaging
                  </strong>{" "}
                  to create something worth remembering.
                </p>
                <p className="m-0 text-sm leading-6 text-black/55">
                  Whether it&apos;s 50 executive gifts or 5,000 pieces for a brand campaign, every project begins with the same question:
                </p>
              </div>
              <p className="m-0 mt-8 text-lg font-medium tracking-[-0.02em] text-black md:text-xl">
                What should this gift make someone feel?
              </p>
              <a
                href="/contact-us#start-project"
                className="mt-10 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.06em] text-white uppercase no-underline"
              >
                Create With Us →
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="difference-heading" className="bg-[#f1f0ec] px-8 py-16 text-black md:px-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <header className="grid gap-6 border-t border-black pt-7 md:grid-cols-2 md:items-end">
              <div>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">02 / Our difference</p>
                <h2 id="difference-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">
                  What makes us different
                </h2>
              </div>
              <p className="m-0 max-w-[500px] text-sm leading-6 text-black/50 md:justify-self-end md:text-right">
                Creative thinking, material knowledge and reliable delivery—held together as one considered service.
              </p>
            </header>

            <div className="mt-12 grid border-t border-l border-black/20 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item, index) => (
                <article
                  key={item.title}
                  className="group flex min-h-[260px] flex-col justify-between border-r border-b border-black/20 p-6 transition-colors duration-300 hover:bg-black hover:text-white md:min-h-[300px] md:p-8"
                >
                  <span className="text-[10px] tracking-[0.16em] text-black/35 transition-colors group-hover:text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="m-0 text-lg leading-6 font-medium tracking-[-0.025em] uppercase">{item.title}</h3>
                    <p className="m-0 mt-4 text-xs leading-5 text-black/50 transition-colors group-hover:text-white/55">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="mission-heading" className="bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24">
          <div className="mx-auto max-w-[1440px] border-t border-white/25 pt-7">
            <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <header>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
                  03 / Our purpose
                </p>
                <h2
                  id="mission-heading"
                  className="m-0 mt-5 text-[clamp(2.75rem,5vw,5rem)] leading-[0.9] font-light tracking-[-0.055em] uppercase"
                >
                  Why
                  <br />
                  We Exist
                </h2>
              </header>

              <div>
                <p className="m-0 max-w-[900px] text-[clamp(1.8rem,3.6vw,4rem)] leading-[1.08] font-light tracking-[-0.045em] text-white/90">
                  We want to change what people expect from corporate gifting. From something branded and given, to something considered, experienced and kept.
                </p>

                <div className="mt-12 grid grid-cols-1 border-t border-l border-white/20 sm:grid-cols-3">
                  {purposePrinciples.map((principle, index) => (
                    <div key={principle.title} className="min-h-[160px] border-r border-b border-white/20 p-5 md:min-h-[180px]">
                      <span className="text-[10px] tracking-[0.16em] text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="m-0 mt-7 text-xs leading-5 font-medium tracking-[0.04em] uppercase">
                        {principle.title}
                      </p>
                      <p className="m-0 mt-4 text-xs leading-5 text-white/55">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="process"
          aria-labelledby="process-heading"
          className="scroll-mt-[72px] bg-white px-8 py-16 text-black md:px-16 md:py-24"
        >
          <div className="mx-auto max-w-[1440px]">
            <header className="grid gap-6 border-t border-black pt-7 md:grid-cols-2 md:items-end">
              <div>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">04 / How we work</p>
                <h2 id="process-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">Our Process</h2>
              </div>
              <p className="m-0 max-w-[470px] text-sm leading-6 text-black/50 md:justify-self-end md:text-right">
                From the first idea to the final unboxing, every detail is considered.
              </p>
            </header>

            <ol className="m-0 mt-12 grid list-none border-t border-l border-black/20 p-0 md:grid-cols-5">
              {process.map((step, index) => (
                <li key={step.title} className="flex min-h-[300px] flex-col justify-between border-r border-b border-black/20 p-6 md:min-h-[360px]">
                  <span className="text-5xl font-light tracking-[-0.06em] text-black/15 md:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="m-0 text-sm leading-5 font-bold tracking-[0.04em] uppercase">{step.title}</h3>
                    <p className="m-0 mt-4 text-xs leading-5 text-black/50">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href="/contact-us#start-project"
              className="group mt-10 flex min-h-20 items-center justify-between bg-black px-6 py-5 text-xs font-bold tracking-[0.06em] text-white uppercase no-underline md:px-8 md:text-sm"
            >
              <span>Start a Project</span>
              <span className="text-2xl font-light transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

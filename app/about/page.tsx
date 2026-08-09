import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | The Unboxing — Corporate Gifts & Branded Merchandise UAE",
  description:
    "Your branding partner, not just a gift supplier. Learn about The Unboxing — UAE's leading corporate gifting and brand solutions company.",
};

const differentiators = [
  {
    title: "Creative Product Selection",
    description: "We curate products that tell your brand story—from premium tech accessories to handcrafted luxury items.",
  },
  {
    title: "Global Sourcing Network",
    description: "Access to thousands of products from trusted manufacturers worldwide, with quality control at every step.",
  },
  {
    title: "Innovative Packaging",
    description: "Our packaging designers create unboxing experiences that amplify your brand at the first moment of contact.",
  },
  {
    title: "Customization Expertise",
    description: "In-house capabilities for laser engraving, UV printing, embroidery, foil stamping, and more.",
  },
  {
    title: "Reliable Project Management",
    description: "Dedicated account managers who handle everything from concept to delivery—on time, every time.",
  },
  {
    title: "UAE-Based Support",
    description: "A local team with deep knowledge of UAE corporate culture, occasions, and compliance requirements.",
  },
] as const;

const process = [
  {
    title: "Share Your Requirement",
    description: "Tell us about your event, audience and budget through our project brief or a quick conversation.",
  },
  {
    title: "Concept Development",
    description: "We prepare tailored product recommendations, creative ideas and an initial direction.",
  },
  {
    title: "Branding & Sampling",
    description: "Logo placement, digital mockups and physical samples are approved before production begins.",
  },
  {
    title: "Production",
    description: "Quality-controlled manufacturing follows strict brand guidelines and inspection at every stage.",
  },
  {
    title: "Packaging & Delivery",
    description: "Ready-to-present experiences are packaged with intention and delivered on time.",
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
                  Not just a gift supplier. We turn thoughtful objects into memorable expressions of your brand.
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
                We create customized corporate gifting and branded merchandise that strengthens relationships, celebrates milestones and makes brands visible in meaningful ways.
              </p>
              <div className="mt-10 grid gap-6 border-t border-black/20 pt-7 md:grid-cols-2 md:gap-12">
                <p className="m-0 text-sm leading-6 text-black/55">
                  From employee joining kits to executive appreciation gifts, every project begins with the people and the moment it needs to serve.
                </p>
                <p className="m-0 text-sm leading-6 text-black/55">
                  For large-scale campaigns and intimate gestures alike, we transform an initial idea into an experience people remember.
                </p>
              </div>
              <a
                href="/contact-us#start-project"
                className="mt-10 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.06em] text-white uppercase no-underline"
              >
                Work With Us →
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
                  Our
                  <br />
                  Mission
                </h2>
              </header>

              <div>
                <p className="m-0 max-w-[900px] text-[clamp(1.8rem,3.6vw,4rem)] leading-[1.08] font-light tracking-[-0.045em] text-white/90">
                  We help organizations strengthen relationships through thoughtful, customized experiences that genuinely reflect their brand values.
                </p>

                <div className="mt-12 grid grid-cols-1 border-t border-l border-white/20 sm:grid-cols-3">
                  {["Thoughtful by design", "Personal to every brand", "Made to strengthen bonds"].map((principle, index) => (
                    <div key={principle} className="min-h-[120px] border-r border-b border-white/20 p-5">
                      <span className="text-[10px] tracking-[0.16em] text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="m-0 mt-7 text-xs leading-5 font-medium tracking-[0.04em] uppercase">
                        {principle}
                      </p>
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
                One accountable path from the first requirement to the final delivery.
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

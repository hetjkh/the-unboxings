import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | The Unboxing — Corporate Gifts & Branded Merchandise UAE",
  description: "Your branding partner, not just a gift supplier. Learn about The Unboxing — UAE's leading corporate gifting and brand solutions company.",
};

const differentiators = [
  {
    title: "Creative Product Selection",
    description: "We curate products that tell your brand story — from premium tech accessories to handcrafted luxury items.",
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
    description: "Dedicated account managers who handle everything from concept to delivery — on time, every time.",
  },
  {
    title: "UAE-Based Support",
    description: "Local team with deep knowledge of UAE corporate culture, occasions, and compliance requirements.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Who We Are */}
        <section
          aria-label="Who We Are"
          className="mx-auto w-full max-w-[720px] px-8 py-16 text-center md:px-16 md:py-20"
        >
          <h1 className="m-0 text-xl leading-7 font-bold tracking-[-0.03em] text-black uppercase md:text-2xl md:leading-8">
            Your Branding Partner, Not Just a Gift Supplier
          </h1>
          <p className="m-0 mt-6 text-base leading-7 font-normal text-black">
            We specialize in creating customized corporate gifting and branded merchandise
            solutions that help businesses strengthen relationships, celebrate milestones,
            and enhance brand visibility.
          </p>
          <p className="m-0 mt-4 text-base leading-7 font-normal text-black">
            Whether it&apos;s an employee joining kit, an executive appreciation gift, or a
            large-scale promotional campaign — we transform ideas into memorable brand experiences.
          </p>
          <a
            href="/contact-us"
            className="mt-8 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
          >
            Work With Us
          </a>
        </section>

        {/* What Makes Us Different */}
        <section aria-label="What Makes Us Different" className="border-t border-[#e5e5e5] bg-white">
          <h2 className="m-0 px-8 pt-14 pb-10 text-center text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase md:px-16">
            What Makes Us Different
          </h2>
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 gap-0 px-8 pb-14 md:px-16 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#e5e5e5]">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="border-r border-b border-[#e5e5e5] p-8"
              >
                <h3 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                  {d.title}
                </h3>
                <p className="m-0 mt-3 text-xs leading-5 font-normal text-black/60">
                  {d.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission */}
        <section aria-label="Our Mission" className="border-t border-[#e5e5e5] bg-white">
          <div className="mx-auto w-full max-w-[720px] px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Our Mission
            </h2>
            <p className="m-0 mt-6 text-2xl leading-9 font-light tracking-[-0.03em] text-black md:text-[28px] md:leading-[42px]">
              To help organizations strengthen relationships through thoughtful,
              customized gifting experiences that reflect their brand&apos;s values.
            </p>
          </div>
        </section>

        {/* Our Process anchor */}
        <section aria-label="Our Process" id="process" className="border-t border-[#e5e5e5] bg-white">
          <div className="mx-auto w-full max-w-[720px] px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Our Process
            </h2>
            <div className="mt-10 space-y-8 text-left">
              {[
                { n: "01", t: "Share Your Requirement", d: "Tell us about your event, audience, and budget via our quote form or a quick call." },
                { n: "02", t: "Concept Development", d: "We prepare customized product recommendations, creative ideas, and initial pricing within 24 hours." },
                { n: "03", t: "Branding & Sampling", d: "Logo placement, digital mockups, and physical sample approval before any production begins." },
                { n: "04", t: "Production", d: "Quality-controlled manufacturing with strict brand guidelines and inspection at every stage." },
                { n: "05", t: "Packaging & Delivery", d: "Ready-to-present gifts, packaged to impress, delivered on time to your location." },
              ].map((step) => (
                <div key={step.n} className="flex gap-6">
                  <span className="text-4xl leading-none font-light text-black/15 shrink-0">{step.n}</span>
                  <div>
                    <h3 className="m-0 text-xs leading-4 font-bold text-black uppercase tracking-[0.04em]">{step.t}</h3>
                    <p className="m-0 mt-2 text-xs leading-5 text-black/60">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/contact-us"
              className="mt-10 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
            >
              Contact Us
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

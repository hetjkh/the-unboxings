import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Industries | The Unboxing",
  description: "Branded merchandise and gifting experiences shaped around your industry.",
};

const industries = [
  {
    name: "Real Estate",
    image: "/industries/REAL ESTATE.webp",
    description: "Handover experiences, site-visit kits, and client milestones made memorable.",
  },
  {
    name: "Hospitality",
    image: "/industries/hospitality.webp",
    description: "Guest amenities, opening gifts, and VIP arrivals with a considered sense of place.",
  },
  {
    name: "Government",
    image: "/industries/GOVERNMENT.webp",
    description: "Official presentations, national occasions, and distinguished corporate hospitality.",
  },
  {
    name: "Healthcare",
    image: "/industries/HEALTHCARE.webp",
    description: "Wellness programs, staff recognition, and conference experiences designed with care.",
  },
  {
    name: "Education",
    image: "/industries/EDUCATION.webp",
    description: "Student welcomes, graduation moments, and recognition that celebrates progress.",
  },
  {
    name: "Aviation",
    image: "/industries/AVIATION.webp",
    description: "Crew gifts, passenger amenities, and branded essentials made to travel.",
  },
  {
    name: "Construction",
    image: "/industries/CONSTRUCTION.webp",
    description: "Project milestones, safety programs, and handover packages built for impact.",
  },
  {
    name: "Technology",
    image: "/industries/TECHNOLOGY.webp",
    description: "Onboarding kits, launch merchandise, and useful tools for connected teams.",
  },
  {
    name: "Finance",
    image: "/industries/FINANCE.webp",
    description: "Executive gifts, employee rewards, and premium experiences for valued clients.",
  },
  {
    name: "Automotive",
    image: "/industries/AUTOMOTIVE.webp",
    description: "Vehicle launches, dealer events, and ownership moments that carry the brand forward.",
  },
  {
    name: "Luxury",
    image: "/industries/LUXURY.webp",
    description: "Refined objects, elevated packaging, and tactile experiences with lasting presence.",
  },
  {
    name: "Retail",
    image: "/industries/RETAIL.webp",
    description: "Seasonal campaigns, loyalty rewards, and team merchandise made for everyday visibility.",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="industries-title" className="relative bg-white text-black">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dce8ed] md:aspect-[16/7]">
            <Image
              src="/industries/industries-hero-source.png"
              alt="Modern real estate development under construction"
              fill
              priority
              className="object-cover object-[68%_bottom] md:object-bottom"
              sizes="100vw"
            />
          </div>
          <div className="relative px-8 py-10 md:absolute md:inset-0 md:flex md:items-center md:px-16 md:py-0">
            <div className="mx-auto w-full max-w-[1312px]">
              <div className="max-w-[470px] md:w-[42%]">
                <p className="m-0 text-[10px] font-bold tracking-[0.12em] text-black/45 uppercase">Where ideas meet context</p>
                <h1 id="industries-title" className="m-0 mt-4 text-4xl leading-none font-light md:text-6xl">Industries</h1>
                <p className="m-0 mt-6 max-w-[400px] text-xs leading-5 text-black/60">
                  Industry knowledge shapes the ideas we bring to the table and the experiences we make possible.
                </p>
                <a href="#industry-directory" className="mt-8 inline-flex items-center gap-3 border-b border-black pb-1 text-xs font-bold text-black no-underline uppercase">
                  Explore sectors <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Our approach" className="grid border-b border-[#dedede] bg-white md:grid-cols-[0.7fr_1.3fr]">
          <div className="px-8 py-10 md:px-16 md:py-16">
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">Sector intelligence</p>
          </div>
          <div className="border-t border-[#dedede] px-8 py-10 md:border-t-0 md:border-l md:px-16 md:py-16">
            <p className="m-0 max-w-[760px] text-2xl leading-8 font-light md:text-4xl md:leading-[1.2]">
              The right idea starts with understanding the audience, environment, and standards of your world.
            </p>
            <p className="m-0 mt-7 max-w-[580px] text-xs leading-5 text-black/55">
              We translate sector insight into relevant products, materials, packaging, and moments that feel specific to your people rather than selected from a catalogue.
            </p>
          </div>
        </section>

        <section id="industry-directory" aria-labelledby="industry-directory-title" className="bg-white">
          <div className="flex items-end justify-between px-8 py-10 md:px-16 md:py-14">
            <div>
              <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">Explore</p>
              <h2 id="industry-directory-title" className="m-0 mt-3 text-base font-bold uppercase">Industries we serve</h2>
            </div>
            <span className="text-xs text-black/45">12 sectors</span>
          </div>

          <div className="grid grid-cols-1 border-t border-[#dedede] sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <article key={industry.name} className="group border-r border-b border-[#dedede] bg-white">
                <a href="/contact-us#start-project" className="block text-black no-underline">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#efefed]">
                    <Image
                      src={industry.image}
                      alt={`${industry.name} industry`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-medium text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex min-h-[180px] flex-col p-6 md:p-7">
                    <h3 className="m-0 text-lg leading-6 font-medium">{industry.name}</h3>
                    <p className="m-0 mt-3 max-w-[380px] text-xs leading-5 text-black/50">{industry.description}</p>
                    <span className="mt-auto flex items-center justify-between pt-7 text-[10px] font-bold tracking-[0.08em] uppercase">
                      Discuss your brief <Arrow />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section aria-label="Start an industry project" className="grid bg-[#cbd8d4] md:grid-cols-[1.4fr_0.6fr]">
          <div className="px-8 py-14 md:px-16 md:py-20">
            <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">Your sector is only the start</p>
            <h2 className="m-0 mt-4 max-w-[720px] text-3xl leading-tight font-light md:text-5xl">
              Tell us the moment. We will shape the right experience around it.
            </h2>
          </div>
          <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
            <a href="/contact-us#start-project" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black no-underline uppercase">
              Start your project <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

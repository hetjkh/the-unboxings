import Header from "../components/Header";
import Footer from "../components/Footer";

const industries = [
  { title: "Real Estate", emoji: "🏢", description: "Handover gifts, site visit kits, client appreciation" },
  { title: "Banking & Finance", emoji: "🏦", description: "VIP client gifts, employee rewards, event merchandise" },
  { title: "Government", emoji: "🏛️", description: "National Day gifts, corporate hospitality, official presentations" },
  { title: "Healthcare", emoji: "🏥", description: "Wellness kits, staff appreciation, conference giveaways" },
  { title: "Hospitality", emoji: "🏨", description: "Welcome amenities, VIP packages, hotel opening gifts" },
  { title: "Education", emoji: "🎓", description: "Graduation gifts, staff recognition, student welcome kits" },
  { title: "Technology", emoji: "💻", description: "Tech accessories, employee onboarding, event merchandise" },
  { title: "Retail", emoji: "🛍️", description: "Loyalty programs, seasonal promotions, team uniforms" },
  { title: "Construction", emoji: "🏗️", description: "Safety wear, milestone gifts, handover packages" },
  { title: "Oil & Gas", emoji: "⚡", description: "Safety kits, team recognition, executive corporate gifts" },
  { title: "Automotive", emoji: "🚗", description: "Dealer meets, launch events, client appreciation" },
  { title: "Logistics", emoji: "🚚", description: "Driver kits, employee uniforms, appreciation gifts" },
  { title: "Aviation", emoji: "✈️", description: "Crew gifts, passenger amenities, corporate merchandise" },
];

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Shop by Industry" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Industries We Serve
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              We understand the unique gifting needs of different sectors. Select your industry
              and we&apos;ll recommend the most relevant products and solutions for your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#e5e5e5]">
            {industries.map((industry) => (
              <a
                key={industry.title}
                href="/contact-us"
                className="flex flex-col border-r border-b border-[#e5e5e5] p-8 no-underline hover:bg-[#f9f9f9] transition-colors duration-200"
              >
                <span className="text-3xl leading-none" aria-hidden="true">{industry.emoji}</span>
                <h2 className="m-0 mt-4 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                  {industry.title}
                </h2>
                <p className="m-0 mt-2 text-xs leading-5 font-normal text-black/50">
                  {industry.description}
                </p>
                <span className="mt-4 text-xs leading-4 font-medium text-black underline underline-offset-2">
                  Contact Us →
                </span>
              </a>
            ))}
          </div>

          <div className="px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Don&apos;t see your industry? We serve all sectors. Let&apos;s talk.
            </p>
            <a
              href="/contact-us"
              className="mt-6 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
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

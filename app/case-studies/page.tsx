import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const caseStudies = [
  {
    title: "Employee Onboarding Kit — Tech Company",
    challenge: "A fast-growing tech firm needed 300 branded welcome kits for new hires, delivered in under 2 weeks.",
    solution: "We sourced laptop bags, notebooks, bottles, wireless chargers, and premium packaging — all branded and delivered to 3 office locations.",
    outcome: "300 kits delivered in 11 days. Employee satisfaction scores for onboarding increased by 40%.",
    image: "/bo.png",
    tags: ["HR", "Tech", "Onboarding"],
  },
  {
    title: "Real Estate Handover Collection — Dubai Developer",
    challenge: "A luxury developer needed 150 exclusive handover gift boxes for villa buyers.",
    solution: "Custom rigid magnetic boxes with marble key trays, champagne flutes, personalized copper cards, and luxury candles — all branded.",
    outcome: "Buyers shared unboxing experiences on social media. 12 referrals traced back to the gifting campaign.",
    image: "/products/slides/packaging/red-exploding-gift-box.png",
    tags: ["Real Estate", "Luxury", "VIP"],
  },
  {
    title: "Annual Conference Merchandise — Banking Group",
    challenge: "A regional bank required 1,200 delegate kits for their flagship annual summit in 3 weeks.",
    solution: "Premium tote bags, branded notebooks, pens, USB drives, and lanyards — curated, branded, and delivered to the event venue.",
    outcome: "Conference ran on schedule. All branded items were fully distributed within the first hour.",
    image: "/products/slides/kitchen-apron-black.png",
    tags: ["Events", "Banking", "Conferences"],
  },
  {
    title: "Ramadan Campaign — FMCG Brand",
    challenge: "A leading FMCG brand needed 2,000 Ramadan hampers for clients and retail partners.",
    solution: "Custom luxury boxes with premium dates, Arabic coffee sets, oud candles, and personalized cards — delivered across UAE.",
    outcome: "Campaign received 98% positive feedback. Brand visibility significantly increased among B2B partners.",
    image: "/brand-stories/a-majlis-reimagined/hero.png",
    tags: ["Ramadan", "FMCG", "Seasonal"],
  },
  {
    title: "National Day Gifts — Government Entity",
    challenge: "A government department needed 500 UAE National Day gift sets for staff and VIP guests.",
    solution: "Heritage-inspired gift boxes with locally sourced products, UAE flag accessories, and premium packaging in national colors.",
    outcome: "Delivered 5 days before the event. Praised by senior leadership as the most memorable National Day gift in years.",
    image: "/products/15.jpg",
    tags: ["Government", "National Day", "UAE"],
  },
  {
    title: "Eco Gifting Campaign — Sustainability Initiative",
    challenge: "A multinational company needed 800 sustainable gifts for their global ESG campaign.",
    solution: "100% eco-friendly kits: bamboo notebooks, cork pens, RPET tote bags, seed paper cards, and recycled packaging.",
    outcome: "Campaign aligned with their ESG targets. Featured in their annual sustainability report.",
    image: "/products/21.jpg",
    tags: ["Eco", "CSR", "Global"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Case Studies" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Case Studies
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Real projects. Real results. See how we&apos;ve helped organizations across the UAE
              create meaningful branded experiences.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <article key={cs.title} className="flex h-full flex-col border border-[#e5e5e5]">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] uppercase text-black/40 border border-black/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                      {cs.title}
                    </h2>

                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="m-0 text-[10px] font-bold tracking-[0.06em] uppercase text-black/40">Challenge</p>
                        <p className="m-0 mt-1 text-xs leading-5 text-black/70">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="m-0 text-[10px] font-bold tracking-[0.06em] uppercase text-black/40">Solution</p>
                        <p className="m-0 mt-1 text-xs leading-5 text-black/70">{cs.solution}</p>
                      </div>
                      <div>
                        <p className="m-0 text-[10px] font-bold tracking-[0.06em] uppercase text-black/40">Outcome</p>
                        <p className="m-0 mt-1 text-xs leading-5 font-medium text-black">{cs.outcome}</p>
                      </div>
                    </div>

                    <a
                      href="/contact-us"
                      className="mt-6 shrink-0 text-xs leading-4 font-medium text-black underline underline-offset-2"
                    >
                      Contact Us
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

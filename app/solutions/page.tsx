import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const solutions = [
  {
    title: "Executive Welcome Kit",
    description:
      "Premium leather bag, notebook, bottle, wireless charger, and branded stationery — all curated in a luxury rigid box.",
    image: "/cat_welcome.png",
    tags: ["Onboarding", "HR"],
  },
  {
    title: "Conference Delegate Kit",
    description:
      "Tote bag, branded notebook, pen, USB drive, lanyard, and event badge — perfect for conferences and summits.",
    image: "/cat_promo.png",
    tags: ["Events", "Conferences"],
  },
  {
    title: "Luxury Real Estate Handover Box",
    description:
      "A curated box of premium products for new homeowners — keys presented in a marble tray, champagne flutes, and a personalized card.",
    image: "/cat_packaging.png",
    tags: ["Real Estate", "VIP"],
  },
  {
    title: "Wellness Gift Box",
    description:
      "Aromatherapy diffuser, bamboo products, reusable bottle, and natural soaps — promoting employee wellbeing.",
    image: "/cat_eco.png",
    tags: ["Wellness", "HR"],
  },
  {
    title: "CEO Appreciation Collection",
    description:
      "Marble accessories, leather portfolio, crystal award, and premium writing instruments — for your most valued leaders.",
    image: "/cat_executive.png",
    tags: ["Executive", "VIP"],
  },
  {
    title: "Ramadan Premium Hamper",
    description:
      "Luxury dates, Arabic coffee set, candle, and a premium crystal gift — beautifully packaged for the Holy Month.",
    image: "/cat_luxury.png",
    tags: ["Ramadan", "Seasonal"],
  },
  {
    title: "Tech Kit",
    description:
      "Wireless charger, Bluetooth earbuds, power bank, and laptop sleeve — all branded with your company logo.",
    image: "/cat_tech.png",
    tags: ["Tech", "Onboarding"],
  },
  {
    title: "Work From Home Kit",
    description:
      "Ergonomic mouse pad, phone stand, cable organizer, coffee mug, and a branded notebook for the remote team.",
    image: "/cat_office.png",
    tags: ["WFH", "HR"],
  },
  {
    title: "Brand Launch Kit",
    description:
      "A complete branded experience — apparel, tech accessories, stationery, and packaging that tells your brand story.",
    image: "/cat_apparel.png",
    tags: ["Marketing", "Launch"],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Corporate Solutions" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Branded Corporate Solutions
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Rather than individual products, we curate complete branded experiences.
              Each solution below can be fully customized to match your brand, occasion, and budget.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
              {solutions.map((solution) => (
                <article key={solution.title} className="flex h-full flex-col">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center pt-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {solution.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] uppercase text-black/40 border border-black/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                      {solution.title}
                    </h2>
                    <p className="m-0 mt-4 flex-1 max-w-[360px] text-base leading-6 font-normal text-black">
                      {solution.description}
                    </p>
                    <a
                      href="/contact-us"
                      className="mt-4 shrink-0 text-base leading-6 font-medium text-black underline underline-offset-2"
                    >
                      Contact Us
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="border-t border-[#e5e5e5] px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Don&apos;t see what you&apos;re looking for? We build custom solutions from scratch.
            </p>
            <a
              href="/contact-us"
              className="mt-6 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
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

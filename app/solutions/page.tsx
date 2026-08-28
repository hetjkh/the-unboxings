import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const solutions = [
  {
    title: "Employee Welcome Kits",
    description:
      "Onboarding sets built from tech, office essentials and drinkware — a complete first-day experience in one branded box.",
    image: "/products/14.jpg",
    href: "/products/tech-electronics",
    tags: ["Onboarding", "Tech"],
  },
  {
    title: "Event Merchandise",
    description:
      "Coordinated apparel and uniforms for conferences, activations and teams that need to look like one brand on the floor.",
    image: "/apprales%20%26%20uniforms/corporate-classic.png",
    href: "/products/apparel-uniforms",
    tags: ["Events", "Apparel"],
  },
  {
    title: "Executive Gifts",
    description:
      "Premium presentation sets for leadership, clients and milestones — considered pieces, not catalogue giveaways.",
    image: "/products/15.jpg",
    href: "/products/executive-gifts",
    tags: ["Leadership", "VIP"],
  },
  {
    title: "Awards & Recognition",
    description:
      "Bespoke trophies and recognition pieces that make achievement tangible for teams, partners and long service.",
    image: "/products/27.jpg",
    href: "/products/awards-recognition",
    tags: ["Recognition", "Culture"],
  },
  {
    title: "Packaging Solutions",
    description:
      "Presentation packaging engineered around the product and the opening moment — for launches, handovers and gifting.",
    image: "/products/35.jpg",
    href: "/products/packaging-solutions",
    tags: ["Launch", "Unboxing"],
  },
  {
    title: "Luxury Gifts",
    description:
      "Refined writing, fragrance and collectible gifts for client appreciation, seasonal giving and senior relationships.",
    image: "/products/41.jpg",
    href: "/products/luxury-gifts",
    tags: ["Clients", "Seasonal"],
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
                      href={solution.href}
                      className="mt-4 shrink-0 text-base leading-6 font-medium text-black underline underline-offset-2"
                    >
                      View collection
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

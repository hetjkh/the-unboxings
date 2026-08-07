import Header from "../components/Header";
import Footer from "../components/Footer";

const articles = [
  {
    title: "50 Corporate Gift Ideas for 2025",
    description: "From tech accessories to luxury executive sets — a comprehensive guide to the best corporate gifting ideas for every budget and occasion.",
    category: "Gift Ideas",
    readTime: "8 min read",
    href: "#",
  },
  {
    title: "Best Employee Welcome Kit Ideas",
    description: "How to create a memorable first-day experience for new employees with a curated onboarding kit that reflects your company culture.",
    category: "HR & Onboarding",
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Corporate Gifts Under AED 100",
    description: "Premium doesn't have to mean expensive. Discover our top picks for high-quality branded gifts that fit any budget.",
    category: "Budget Gifting",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Premium Executive Gift Trends 2025",
    description: "The luxury corporate gift trends shaping executive gifting this year — marble accessories, personalized leather, and premium tech.",
    category: "Trends",
    readTime: "7 min read",
    href: "#",
  },
  {
    title: "Real Estate Handover Gift Ideas",
    description: "Creating an unforgettable handover moment for your buyers. From premium keyholder boxes to luxury welcome hampers.",
    category: "Real Estate",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Employee Appreciation Gift Guide",
    description: "How to recognize and reward your team meaningfully — from long service awards to spontaneous appreciation kits.",
    category: "HR & Recognition",
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Sustainable Corporate Gifting Guide",
    description: "Why eco-friendly gifting is no longer optional — and how to source bamboo, cork, RPET, and recycled materials at scale.",
    category: "Sustainability",
    readTime: "6 min read",
    href: "#",
  },
  {
    title: "Exhibition & Conference Giveaway Ideas",
    description: "Stand out at your next trade show or conference with these proven promotional merchandise ideas that drive brand recall.",
    category: "Events",
    readTime: "7 min read",
    href: "#",
  },
  {
    title: "Corporate Gifting Etiquette in the UAE",
    description: "A guide to culturally appropriate gifting in the UAE — understanding occasions, preferences, and presentation standards.",
    category: "UAE Market",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Luxury Gifts That Build Client Relationships",
    description: "How thoughtful, premium gifting strengthens business relationships and keeps your brand top-of-mind with key clients.",
    category: "Client Gifting",
    readTime: "5 min read",
    href: "#",
  },
  {
    title: "Why Customized Packaging Matters",
    description: "The unboxing experience is part of your brand. Learn why packaging design is as important as the gift inside.",
    category: "Packaging",
    readTime: "4 min read",
    href: "#",
  },
  {
    title: "Corporate Gift Ideas by Budget",
    description: "A tier-based gift guide: under AED 100, AED 100–300, AED 300–1,000, and premium. Find the right gift for every recipient.",
    category: "Budget Gifting",
    readTime: "8 min read",
    href: "#",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Resources & Inspiration" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Resource Centre
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Gifting inspiration, industry trends, and practical guides to help you
              create impactful branded experiences for your team and clients.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
              {articles.map((article) => (
                <article key={article.title} className="flex h-full flex-col border-t border-[#e5e5e5] pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-black/40 border border-black/20 px-2 py-0.5">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-black/30">{article.readTime}</span>
                  </div>
                  <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black">
                    {article.title}
                  </h2>
                  <p className="m-0 mt-3 flex-1 text-xs leading-5 font-normal text-black/60">
                    {article.description}
                  </p>
                  <a
                    href={article.href}
                    className="mt-4 shrink-0 text-xs leading-4 font-medium text-black underline underline-offset-2"
                  >
                    Read Article →
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Need personalized guidance on your gifting strategy?
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

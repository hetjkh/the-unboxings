import Header from "../components/Header";
import Footer from "../components/Footer";

const occasions = [
  { title: "New Employee Joining", emoji: "🎁", href: "/contact-us" },
  { title: "Employee Welcome", emoji: "👋", href: "/contact-us" },
  { title: "Work Anniversary", emoji: "🏆", href: "/contact-us" },
  { title: "Long Service Award", emoji: "⭐", href: "/contact-us" },
  { title: "Birthday Gifts", emoji: "🎂", href: "/contact-us" },
  { title: "Promotion Gifts", emoji: "📈", href: "/contact-us" },
  { title: "Retirement Gifts", emoji: "🌅", href: "/contact-us" },
  { title: "Ramadan", emoji: "🌙", href: "/contact-us" },
  { title: "Eid", emoji: "✨", href: "/contact-us" },
  { title: "National Day", emoji: "🇦🇪", href: "/contact-us" },
  { title: "Christmas", emoji: "🎄", href: "/contact-us" },
  { title: "New Year", emoji: "🎆", href: "/contact-us" },
  { title: "Client Thank You", emoji: "🤝", href: "/contact-us" },
  { title: "Annual Conference", emoji: "🎤", href: "/contact-us" },
  { title: "Product Launch", emoji: "🚀", href: "/contact-us" },
  { title: "Real Estate Handover", emoji: "🏠", href: "/contact-us" },
  { title: "Hotel Opening", emoji: "🏨", href: "/contact-us" },
  { title: "Dealer Meets", emoji: "🤝", href: "/contact-us" },
];

export default function OccasionsPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Shop by Occasion" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Shop by Occasion
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Every milestone deserves a meaningful gift. Browse by occasion and we&apos;ll curate
              the perfect branded experience for your team or clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {occasions.map((occasion) => (
              <a
                key={occasion.title}
                href={occasion.href}
                className="group flex flex-col items-center justify-center border border-[#e5e5e5] p-10 no-underline hover:bg-[#f9f9f9] transition-colors duration-200"
              >
                <span className="text-4xl leading-none" aria-hidden="true">{occasion.emoji}</span>
                <span className="mt-4 text-center text-xs leading-4 font-medium tracking-[-0.36px] text-black">
                  {occasion.title}
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-[#e5e5e5] px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Have a specific occasion in mind? Tell us and we&apos;ll build it for you.
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

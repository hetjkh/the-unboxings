import Link from "next/link";

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Shop by Occasion", href: "/occasions" },
  { label: "Shop by Industry", href: "/industries" },
  { label: "Behind the Design", href: "/behind-the-design" },
  { label: "Inspiration Gallery", href: "/inspiration-gallery" },
  { label: "Resources", href: "/resources" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/about#process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "#" },
];

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="group inline-flex items-center gap-2 text-xs leading-5 text-white/55 no-underline hover:text-white"
          >
            <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-4" aria-hidden="true" />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1440px] px-8 pt-16 md:px-16 md:pt-24">
        <div className="grid gap-12 border-t border-white/20 pt-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <div>
            <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase">
              The Unboxing newsletter
            </p>
            <h2 className="m-0 mt-5 max-w-[760px] text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] font-light tracking-[-0.06em] uppercase">
              Ideas worth
              <br />
              unboxing.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="m-0 max-w-[480px] text-sm leading-6 text-white/55">
              Get considered inspiration, material stories and gifting insights delivered occasionally—not constantly.
            </p>
            <form className="mt-8" action="#" method="post">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <div className="flex border-b border-white py-3">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="cursor-pointer border-0 bg-transparent px-0 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase"
                >
                  Subscribe →
                </button>
              </div>
              <p className="m-0 mt-3 text-[10px] leading-4 text-white/30">
                By subscribing, you agree to receive news from The Unboxing.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-16">
          <div>
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Explore</h3>
            <FooterLinks links={quickLinks} />
          </div>
          <div>
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Company</h3>
            <FooterLinks links={companyLinks} />
          </div>
          <div>
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Get in touch</h3>
            <p className="m-0 max-w-[360px] text-xs leading-5 text-white/50">
              UAE-based corporate gifting and branded merchandise specialists. Worldwide delivery. Bulk orders welcome.
            </p>
            <div className="mt-7 space-y-2">
              <a href="mailto:hello@theunboxing.ae" className="block text-sm text-white no-underline hover:text-white/60">hello@theunboxing.ae</a>
              <a href="tel:+97150000000" className="block text-sm text-white no-underline hover:text-white/60">+971 50 000 0000</a>
            </div>
          </div>
        </div>
      </div>

      {/* Brand wordmark — styling intentionally preserved */}
      <div className="flex justify-center px-3 pb-12 md:px-6 md:pb-16">
        <Link
          href="/"
          aria-label="The Unboxing - go to homepage"
          className="flex w-full items-baseline justify-center gap-2 no-underline md:gap-5"
        >
          <span className="text-base leading-none font-medium tracking-normal text-white uppercase md:text-xl lg:text-3xl">
            The
          </span>
          <span className="text-7xl leading-none font-bold tracking-normal text-white uppercase md:text-[9rem] lg:text-[13rem] xl:text-[15rem]">
            Unboxing
          </span>
        </Link>
      </div>

      <div className="border-t border-white/10 px-8 py-6 md:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-[10px] leading-4 text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {new Date().getFullYear()} The Unboxing. All rights reserved.</p>
          <p className="m-0">UAE-based · Worldwide delivery</p>
        </div>
      </div>
    </footer>
  );
}

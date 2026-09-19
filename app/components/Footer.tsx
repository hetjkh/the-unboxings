import Link from "next/link";

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Gift by Industry", href: "/industries" },
  { label: "Solutions", href: "/solutions" },
  { label: "Material Library", href: "/materials" },
  { label: "Behind the Design", href: "/behind-the-design" },
  { label: "Brand Stories", href: "/inspiration-gallery" },
  { label: "Ideas & Insights", href: "/resources" },
];

const companyLinks = [
  { label: "About The Unboxing", href: "/about" },
  { label: "Our Process", href: "/about#process" },
  { label: "Signature Projects", href: "/inspiration-gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact-us" },
  { label: "Privacy", href: "/privacy" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-unboxing/about/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theunboxing.ae/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="m-0 list-none p-0 md:space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="group inline-flex min-h-11 items-center gap-2 text-xs leading-5 text-white/55 no-underline hover:text-white md:min-h-0"
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
      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 md:px-16 md:pt-24">
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
              A considered edit of gifting ideas, material discoveries, packaging inspiration and brand stories delivered occasionally, never unnecessarily.
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
                  className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/35 md:text-sm"
                />
                <button
                  type="submit"
                  className="min-h-11 shrink-0 cursor-pointer border-0 bg-transparent px-0 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase md:min-h-0"
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

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 border-t border-white/15 py-12 md:mt-20 md:gap-12 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-16">
          <div>
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Explore</h3>
            <FooterLinks links={quickLinks} />
          </div>
          <div>
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Company</h3>
            <FooterLinks links={companyLinks} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="m-0 mb-6 text-[10px] font-bold tracking-[0.16em] text-white uppercase">Get in touch</h3>
            <p className="m-0 max-w-[360px] text-xs leading-5 text-white/50">
              Have an idea, occasion or brief in mind? Let&apos;s create something people will remember opening.
            </p>
            <div className="mt-7 space-y-2">
              <a href="mailto:hello@theunboxing.ae" className="flex min-h-11 items-center text-sm text-white no-underline hover:text-white/60 md:block md:min-h-0">hello@theunboxing.ae</a>
              <a href="tel:+971506023071" className="flex min-h-11 items-center text-sm text-white no-underline hover:text-white/60 md:block md:min-h-0">+971 50 602 3071</a>
            </div>
            <div className="mt-7 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center text-white/55 no-underline transition-colors hover:text-white md:h-auto md:w-auto"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand wordmark — styling intentionally preserved */}
      <div className="flex w-full justify-center px-3 pb-12 md:px-6 md:pb-16">
        <Link
          href="/"
          aria-label="The Unboxing - go to homepage"
          className="flex w-full min-w-0 items-baseline justify-center gap-[2vw] overflow-hidden whitespace-nowrap no-underline"
        >
          <span className="shrink-0 text-[clamp(0.65rem,2vw,1.875rem)] leading-none font-medium tracking-normal text-white uppercase">
            The
          </span>
          <span className="min-w-0 text-[clamp(2.5rem,15vw,15rem)] leading-[0.82] font-bold tracking-[-0.045em] text-white uppercase">
            Unboxing
          </span>
        </Link>
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8 md:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-[10px] leading-4 text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© {new Date().getFullYear()} The Unboxing. All rights reserved.</p>
          <p className="m-0">UAE-based · Worldwide delivery</p>
        </div>
      </div>
    </footer>
  );
}

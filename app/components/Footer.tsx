function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );
}

function FooterInput({
  label,
  placeholder,
  name,
}: {
  label: string;
  placeholder: string;
  name: string;
}) {
  return (
    <div className="mt-6">
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <div className="relative border-b border-white">
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent py-3 pr-10 text-sm leading-5 text-white outline-none placeholder:text-white/80"
        />
        <button
          type="submit"
          aria-label={`Submit ${label}`}
          className="absolute top-1/2 right-0 flex -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Shop by Occasion", href: "/occasions" },
  { label: "Shop by Industry", href: "/industries" },
  { label: "Branding Services", href: "/branding-services" },
  { label: "Inspiration Gallery", href: "/inspiration-gallery" },
  { label: "Resources", href: "/resources" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/about#process" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
  {
    label: "Privacy Policy",
    href: "#",
  },
];

function FooterLinkList({
  links,
}: {
  links: { label: string; href: string; isButton?: boolean }[];
}) {
  return (
    <ul className="m-0 list-none p-0">
      {links.map((link) => (
        <li key={link.label} className="mb-3 last:mb-0">
          {link.isButton ? (
            <button
              type="button"
              className="cursor-pointer border-0 bg-transparent p-0 text-xs leading-4 text-white underline underline-offset-2"
            >
              {link.label}
            </button>
          ) : (
            <a
              href={link.href}
              className="text-xs leading-4 text-white underline underline-offset-2"
            >
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top CTA */}
      <div className="px-8 py-20 text-center md:px-16">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] uppercase">
          Let&apos;s Create Something Memorable
        </h2>
        <p className="mx-auto mt-8 max-w-[872px] text-2xl leading-10 font-light tracking-[-0.03em] md:text-[32px] md:leading-[48px]">
          Whether you&apos;re planning a corporate event, welcoming new employees, or building
          your brand — we&apos;d love to help you create lasting impressions.
        </p>
        <a
          href="/contact-us"
          className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center border border-white bg-transparent px-8 text-xs leading-4 font-bold tracking-[0.04em] text-white uppercase no-underline"
        >
          Contact Us
        </a>
      </div>

      {/* Links Grid */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-8 pb-20 md:px-16 lg:grid-cols-[1fr_1fr_2fr] lg:gap-6">
        <div>
          <h3 className="m-0 mb-6 text-xs leading-4 font-bold tracking-[-0.05em] uppercase">
            Quick Links
          </h3>
          <FooterLinkList links={quickLinks} />
        </div>

        <div>
          <h3 className="m-0 mb-6 text-xs leading-4 font-bold tracking-[-0.05em] uppercase">
            Company
          </h3>
          <FooterLinkList links={companyLinks} />
        </div>

        <div>
          <h3 className="m-0 mb-6 text-xs leading-4 font-bold tracking-[-0.05em] uppercase">
            Get In Touch
          </h3>
          <p className="m-0 text-xs leading-5 font-normal text-white/80">
            UAE-based corporate gifting and branded merchandise specialists.
            Worldwide delivery. Bulk orders welcome.
          </p>
          <p className="m-0 mt-4 text-xs leading-5 font-normal text-white">
            <a href="mailto:hello@theunboxing.ae" className="text-white underline underline-offset-2">
              hello@theunboxing.ae
            </a>
          </p>
          <p className="m-0 mt-2 text-xs leading-5 font-normal text-white">
            <a href="tel:+97150000000" className="text-white underline underline-offset-2">
              +971 50 000 0000
            </a>
          </p>

          <h3 className="m-0 mt-10 mb-6 text-xs leading-4 font-bold tracking-[-0.05em] uppercase">
            Stay Updated
          </h3>
          <p className="m-0 text-xs leading-4 font-normal text-white">
            Get inspiration, gifting trends, and exclusive corporate offers in your inbox.
          </p>
          <FooterInput label="Email" name="footer-email" placeholder="Your email address" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 py-6 text-center md:px-16">
        <p className="m-0 text-[10px] leading-4 text-white/40">
          © {new Date().getFullYear()} The Unboxing. All rights reserved. UAE-Based Corporate Gifting & Brand Solutions.
        </p>
      </div>
    </footer>
  );
}

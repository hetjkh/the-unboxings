import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-black"
    >
      {children}
    </svg>
  );
}

const occasions: {
  title: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    title: "New Employee Joining",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 7v10M7 12h10" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </Icon>
    ),
  },
  {
    title: "Employee Welcome",
    href: "/contact-us",
    icon: (
      <Icon>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 19c0-3 2.5-5 6-5" />
        <path d="M16 11l2 2 4-4" />
      </Icon>
    ),
  },
  {
    title: "Work Anniversary",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
        <path d="M5 4h2M17 4h2" />
        <path d="M5 4a2 2 0 0 0 0 4M19 4a2 2 0 0 1 0 4" />
      </Icon>
    ),
  },
  {
    title: "Long Service Award",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.9L12 14.3 7.7 16.5l.8-4.9L5 8.2l4.8-.7L12 3z" />
      </Icon>
    ),
  },
  {
    title: "Birthday Gifts",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 8v13" />
        <path d="M4 12h16v9H4z" />
        <path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M12 7c-1.5-2-3-2.5-3-4a1.5 1.5 0 0 1 3 0c0 1.5-1.5 2-3 4M12 7c1.5-2 3-2.5 3-4a1.5 1.5 0 0 0-3 0c0 1.5 1.5 2 3 4" />
      </Icon>
    ),
  },
  {
    title: "Promotion Gifts",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15l4-6 3 3 5-7" />
        <path d="M16 5h4v4" />
      </Icon>
    ),
  },
  {
    title: "Retirement Gifts",
    href: "/contact-us",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </Icon>
    ),
  },
  {
    title: "Ramadan",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M15.5 4.5A7.5 7.5 0 1 0 19.5 15 6 6 0 0 1 15.5 4.5z" />
        <path d="M18 5l.6 1.4L20 7l-1.4.6L18 9l-.6-1.4L16 7l1.4-.6L18 5z" />
      </Icon>
    ),
  },
  {
    title: "Eid",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 3l1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4L12 3z" />
        <path d="M18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13z" />
        <path d="M6 14l.7 1.8L8.5 16.5 6.7 17.2 6 19l-.7-1.8L3.5 16.5l1.8-.7L6 14z" />
      </Icon>
    ),
  },
  {
    title: "National Day",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M5 21V4" />
        <path d="M5 4h10l-2 3 2 3H5" />
      </Icon>
    ),
  },
  {
    title: "Christmas",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 3l4 6H8l4-6z" />
        <path d="M12 8l5 7H7l5-7z" />
        <path d="M12 13l6 7H6l6-7z" />
        <path d="M10 21h4" />
      </Icon>
    ),
  },
  {
    title: "New Year",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 14V4" />
        <path d="M9 7l3-3 3 3" />
        <path d="M6 14c0 3.3 2.7 6 6 6s6-2.7 6-6" />
        <path d="M8 11l-2-1M16 11l2-1M10 9l-1-2M14 9l1-2" />
      </Icon>
    ),
  },
  {
    title: "Client Thank You",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M8 11c0-2 1.5-3.5 3.5-3.5S15 9 15 11c0 3-3.5 5-3.5 5S8 14 8 11z" />
        <path d="M15 12.5c1.5.5 2.5 1.5 2.5 3 0 1.5-1.5 2.5-2.5 2.5" />
        <path d="M7 15.5c-1 .2-2.5 1-2.5 2.5S6 20 7.5 20H12" />
      </Icon>
    ),
  },
  {
    title: "Annual Conference",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M12 3v11" />
        <path d="M8 7h8" />
        <path d="M9 14h6l1 4H8l1-4z" />
        <path d="M7 21h10" />
      </Icon>
    ),
  },
  {
    title: "Product Launch",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M5 15l-1 5 5-1L20 8a2.5 2.5 0 0 0-3.5-3.5L5 15z" />
        <path d="M14 6l4 4" />
      </Icon>
    ),
  },
  {
    title: "Real Estate Handover",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </Icon>
    ),
  },
  {
    title: "Hotel Opening",
    href: "/contact-us",
    icon: (
      <Icon>
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M9 21v-4h6v4" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </Icon>
    ),
  },
  {
    title: "Dealer Meets",
    href: "/contact-us",
    icon: (
      <Icon>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M2 19c0-2.8 2.2-5 6-5" />
        <path d="M13 19c0-2.2 1.8-4 4.5-4s4.5 1.8 4.5 4" />
      </Icon>
    ),
  },
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
                <span className="inline-flex" aria-hidden="true">
                  {occasion.icon}
                </span>
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

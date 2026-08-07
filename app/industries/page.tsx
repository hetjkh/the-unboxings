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

const industries: {
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    title: "Real Estate",
    description: "Handover gifts, site visit kits, client appreciation",
    icon: (
      <Icon>
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 10h.01M15 10h.01" />
      </Icon>
    ),
  },
  {
    title: "Banking & Finance",
    description: "VIP client gifts, employee rewards, event merchandise",
    icon: (
      <Icon>
        <path d="M3 10h18L12 3 3 10z" />
        <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
        <path d="M3 18h18" />
        <path d="M2 21h20" />
      </Icon>
    ),
  },
  {
    title: "Government",
    description: "National Day gifts, corporate hospitality, official presentations",
    icon: (
      <Icon>
        <path d="M12 3l8 5v2H4V8l8-5z" />
        <path d="M6 10v7M10 10v7M14 10v7M18 10v7" />
        <path d="M4 17h16" />
        <path d="M3 21h18" />
      </Icon>
    ),
  },
  {
    title: "Healthcare",
    description: "Wellness kits, staff appreciation, conference giveaways",
    icon: (
      <Icon>
        <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
        <path d="M12 9v5M9.5 11.5h5" />
      </Icon>
    ),
  },
  {
    title: "Hospitality",
    description: "Welcome amenities, VIP packages, hotel opening gifts",
    icon: (
      <Icon>
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M9 21v-4h6v4" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M9 14h.01M15 14h.01" />
      </Icon>
    ),
  },
  {
    title: "Education",
    description: "Graduation gifts, staff recognition, student welcome kits",
    icon: (
      <Icon>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M5 10.5v4.5c0 1.5 3.1 3 7 3s7-1.5 7-3v-4.5" />
        <path d="M21 8v6" />
      </Icon>
    ),
  },
  {
    title: "Technology",
    description: "Tech accessories, employee onboarding, event merchandise",
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </Icon>
    ),
  },
  {
    title: "Retail",
    description: "Loyalty programs, seasonal promotions, team uniforms",
    icon: (
      <Icon>
        <path d="M6 8h12l1 12H5L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </Icon>
    ),
  },
  {
    title: "Construction",
    description: "Safety wear, milestone gifts, handover packages",
    icon: (
      <Icon>
        <path d="M14 7l3-3 3 3-3 3" />
        <path d="M17 4l-5.5 5.5a3 3 0 0 0 0 4.2l.3.3" />
        <path d="M10 14l-7 7" />
        <path d="M7 11l-4 1 2 2 1-4z" />
      </Icon>
    ),
  },
  {
    title: "Oil & Gas",
    description: "Safety kits, team recognition, executive corporate gifts",
    icon: (
      <Icon>
        <path d="M12 3c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
        <path d="M10 17.5c.5 1 1.2 1.5 2 1.5s1.5-.5 2-1.5" />
      </Icon>
    ),
  },
  {
    title: "Automotive",
    description: "Dealer meets, launch events, client appreciation",
    icon: (
      <Icon>
        <path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5" />
        <path d="M3 13h18v3a1 1 0 0 1-1 1h-1" />
        <path d="M3 16a1 1 0 0 1-1-1v-2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M9 17h6" />
      </Icon>
    ),
  },
  {
    title: "Logistics",
    description: "Driver kits, employee uniforms, appreciation gifts",
    icon: (
      <Icon>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7v-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </Icon>
    ),
  },
  {
    title: "Aviation",
    description: "Crew gifts, passenger amenities, corporate merchandise",
    icon: (
      <Icon>
        <path d="M12 3v6l8 3v2l-8-1.5V19l3 1.5V22l-4.5-1.5L6 22v-1.5L9 19v-6.5L1 14v-2l8-3V3a1.5 1.5 0 0 1 3 0z" />
      </Icon>
    ),
  },
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
                className="flex flex-col items-center text-center border-r border-b border-[#e5e5e5] p-8 no-underline hover:bg-[#f9f9f9] transition-colors duration-200"
              >
                <span className="inline-flex" aria-hidden="true">
                  {industry.icon}
                </span>
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

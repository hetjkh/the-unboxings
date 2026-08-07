import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

export const metadata = {
  title: "Contact Us | The Unboxing — Corporate Gifts UAE",
  description:
    "Get in touch with The Unboxing team for corporate gifting, branded merchandise, and bulk orders.",
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
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

const contactMethods: {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    title: "Email",
    description: "Our team responds to all inquiries within 24 hours.",
    action: "hello@theunboxing.ae",
    href: "mailto:hello@theunboxing.ae",
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 7l9 7 9-7" />
      </Icon>
    ),
  },
  {
    title: "WhatsApp",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "Message us on WhatsApp",
    href: "https://wa.me/97150000000",
    icon: (
      <Icon>
        <path d="M12 3a9 9 0 0 0-7.7 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" />
        <path d="M9 10.5c.3 1.8 2.2 3.7 4 4" />
      </Icon>
    ),
  },
  {
    title: "Phone",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "+971 50 000 0000",
    href: "tel:+97150000000",
    icon: (
      <Icon>
        <path d="M6.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 5 5a1.5 1.5 0 0 1 1.5-1.5z" />
      </Icon>
    ),
  },
];

const formFields = [
  ["company", "Company"],
  ["audience", "Audience"],
  ["occasion", "Occasion"],
  ["quantity", "Quantity"],
  ["budget", "Budget"],
  ["timeline", "Timeline"],
  ["industry", "Industry"],
  ["objectives", "Objectives"],
] as const;

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section
          aria-label="Contact The Unboxing"
          className="border-b border-[#e5e5e5] px-8 py-16 text-center md:px-16 md:py-20"
        >
          <h1 className="m-0 text-xl leading-7 font-bold tracking-[-0.03em] text-black uppercase md:text-2xl md:leading-8">
            Let&apos;s Build Something Memorable
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-xs leading-5 font-normal text-black/60 md:text-sm md:leading-6">
            Whether you&apos;re planning a corporate event, launching a campaign, welcoming
            employees, or looking for premium branded merchandise — we&apos;d love to help.
          </p>
        </section>

        {/* Start Your Project form */}
        <section
          id="start-project"
          aria-label="Start your project"
          className="border-b border-[#e5e5e5] px-8 py-14 md:px-16 md:py-20"
        >
          <div className="mx-auto max-w-[960px]">
            <div className="text-center">
              <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                Start Your Project
              </h2>
              <p className="mx-auto mt-3 max-w-[560px] text-xs leading-5 text-black/60">
                Give our designers the context they need to shape an exceptional first direction.
              </p>
            </div>

            <form className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {formFields.map(([name, label]) => (
                <label
                  key={name}
                  className="text-[11px] leading-4 font-bold tracking-[0.08em] text-black uppercase"
                >
                  {label}
                  <input
                    name={name}
                    type="text"
                    className="mt-2 w-full border border-black bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-black outline-none"
                  />
                </label>
              ))}

              <label className="text-[11px] leading-4 font-bold tracking-[0.08em] text-black uppercase md:col-span-2">
                Brief Upload
                <input
                  name="brief"
                  type="file"
                  className="mt-2 block w-full border border-black bg-white px-4 py-3 text-xs font-normal normal-case tracking-normal text-black"
                />
              </label>

              <div className="text-center md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-12 cursor-pointer items-center justify-center border-0 bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase"
                >
                  Receive Three Bespoke Concepts Within 48 Hours
                </button>
                <p className="m-0 mt-4 text-xs leading-5 text-black/50">
                  Our designers will contact you within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Contact methods */}
        <section
          aria-label="Contact methods"
          className="border-b border-[#e5e5e5] px-8 py-14 md:px-16 md:py-16"
        >
          <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {contactMethods.map((method) => (
              <article key={method.title} className="flex flex-col items-center text-center">
                <span className="inline-flex" aria-hidden="true">
                  {method.icon}
                </span>
                <h2 className="m-0 mt-4 text-xs leading-4 font-bold tracking-[0.08em] text-black uppercase">
                  {method.title}
                </h2>
                <p className="m-0 mt-3 text-xs leading-4 font-normal text-black/60">
                  {method.description}
                </p>
                <a
                  href={method.href}
                  className="mt-4 text-xs leading-4 font-normal text-black underline underline-offset-2"
                >
                  {method.action}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Location */}
        <section aria-label="Location" className="px-8 py-12 text-center md:px-16 md:py-14">
          <p className="m-0 text-xs leading-5 text-black/50">
            UAE-based · Worldwide delivery · Bulk orders welcome
          </p>
          <p className="m-0 mt-2 text-xs leading-5 text-black/50">Dubai, United Arab Emirates</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 2.5H7L8 5.5L6.5 6.5C7.2 8.4 8.6 9.8 10.5 10.5L11.5 9L14.5 10V12.5C14.5 13.05 14.05 13.5 13.5 13.5C7.3 13.5 2.5 8.7 2.5 2.5C2.5 1.95 2.95 1.5 3.5 1.5H4.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 9.24 1.86 10.39 2.48 11.35L1.5 14.5L4.74 13.55C5.65 14.1 6.78 14.42 8 14.42C11.59 14.42 14.5 11.51 14.5 7.92C14.5 4.33 11.59 1.5 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6 6.5C6.2 7.8 7.7 9.3 9.5 9.8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="12" height="8" stroke="currentColor" strokeWidth="1" />
      <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function LiveChatIcon() {
  return (
    <span className="inline-block h-2 w-2 rounded-full bg-[#f5c518]" aria-hidden="true" />
  );
}

const contactMethods = [
  {
    title: "Phone",
    description: "Monday to Sunday from 10 am to 7 pm (CET).",
    action: "Call Us +35 227874086",
    href: "tel:+35227874086",
    icon: <PhoneIcon />,
  },
  {
    title: "WhatsApp",
    description: "Monday to Sunday from 10 am to 7 pm (CET).",
    action: "WhatsApp Us",
    href: "#",
    icon: <WhatsAppIcon />,
  },
  {
    title: "Email",
    description: "Your inquiry will receive a response from a Client Advisor.",
    action: "Write Us",
    href: "#",
    icon: <EmailIcon />,
  },
  {
    title: "Live Chat",
    description: "Monday to Sunday from 10 am to 7 pm (CET).",
    action: "Message Us",
    href: "#",
    icon: <LiveChatIcon />,
  },
];

const countries = [
  "Luxembourg",
  "United States",
  "United Kingdom",
  "France",
  "Germany",
  "Italy",
  "Japan",
];

export default function ContactUsSection() {
  return (
    <section
      aria-label="Contact Gucci Client Services"
      className="mx-auto w-full max-w-[720px] px-8 py-16 md:px-16 md:py-20"
    >
      <div className="text-center">
        <h1 className="m-0 text-xl leading-7 font-bold tracking-[-0.03em] text-black uppercase md:text-2xl md:leading-8">
          How to contact Gucci Client Services
        </h1>
        <p className="m-0 mt-4 text-xs leading-4 font-normal tracking-[0.02em] text-black uppercase">
          Choose your preferred method of contact and connect with us
        </p>
      </div>

      <div className="mt-12">
        <label
          htmlFor="contact-country"
          className="mb-3 block text-center text-[11px] leading-4 font-normal tracking-[0.08em] text-black uppercase"
        >
          View contact information for
        </label>
        <div className="relative">
          <select
            id="contact-country"
            defaultValue="Luxembourg"
            className="w-full cursor-pointer appearance-none border border-black bg-white px-4 py-4 pr-10 text-sm leading-5 font-normal text-black"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-black">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {contactMethods.map((method) => (
          <article key={method.title} className="text-center">
            <h2 className="m-0 text-xs leading-4 font-bold tracking-[0.08em] text-black uppercase">
              {method.title}
            </h2>
            <p className="m-0 mt-3 text-xs leading-4 font-normal text-black">
              {method.description}
            </p>
            <a
              href={method.href}
              className="mt-4 inline-flex items-center justify-center gap-2 text-xs leading-4 font-normal text-black underline underline-offset-2"
            >
              {method.icon}
              {method.action}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

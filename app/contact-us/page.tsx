import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | The Unboxing — Corporate Gifts UAE",
  description:
    "Get in touch with The Unboxing team for corporate gifting, branded merchandise, and bulk orders.",
};

const formFields = [
  { name: "company", label: "Company", placeholder: "Your company name" },
  { name: "audience", label: "Audience", placeholder: "Who is this for?" },
  { name: "occasion", label: "Occasion", placeholder: "Event, launch, welcome…" },
  { name: "quantity", label: "Quantity", placeholder: "Estimated units" },
  { name: "budget", label: "Budget", placeholder: "Estimated budget" },
  { name: "timeline", label: "Timeline", placeholder: "When do you need it?" },
  { name: "industry", label: "Industry", placeholder: "Your industry" },
] as const;

const contactMethods = [
  {
    number: "01",
    title: "Email",
    description: "Our team responds to all inquiries within 24 hours.",
    action: "hello@theunboxing.ae",
    href: "mailto:hello@theunboxing.ae",
  },
  {
    number: "02",
    title: "WhatsApp",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "Message us on WhatsApp",
    href: "https://wa.me/97150000000",
  },
  {
    number: "03",
    title: "Phone",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "+971 50 000 0000",
    href: "tel:+97150000000",
  },
] as const;

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main>
        <section
          aria-labelledby="contact-heading"
          className="flex min-h-[70vh] items-end bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
            <div>
              <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/45 uppercase">
                Begin a conversation
              </p>
              <h1
                id="contact-heading"
                className="m-0 mt-5 max-w-[900px] text-[clamp(3.25rem,8vw,8rem)] leading-[0.86] font-light tracking-[-0.07em] uppercase"
              >
                Let&apos;s Build
                <br />
                Something
                <br />
                Memorable
              </h1>
            </div>
            <p className="m-0 max-w-[520px] border-t border-white/25 pt-6 text-sm leading-6 text-white/60 md:text-base md:leading-7">
              Whether you&apos;re planning a corporate event, launching a campaign, welcoming employees, or looking for premium branded merchandise — we&apos;d love to help.
            </p>
          </div>
        </section>

        <section
          id="start-project"
          aria-labelledby="project-form-heading"
          className="scroll-mt-18 bg-[#f1f0ec] px-8 py-16 text-black md:px-16 md:py-24"
        >
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <header className="lg:sticky lg:top-24 lg:self-start">
              <span className="text-[10px] font-medium tracking-[0.2em] text-black/40">01 / PROJECT BRIEF</span>
              <h2
                id="project-form-heading"
                className="m-0 mt-5 text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.9] font-light tracking-[-0.06em] uppercase"
              >
                Start Your
                <br />
                Project
              </h2>
              <p className="m-0 mt-7 max-w-[420px] text-sm leading-6 text-black/60 md:text-base md:leading-7">
                Give our designers the context they need to shape an exceptional first direction.
              </p>
              <div className="mt-10 flex items-center gap-4 text-[10px] tracking-[0.16em] text-black/35 uppercase">
                <span>Your context</span>
                <span className="h-px w-12 bg-black/25" aria-hidden="true" />
                <span>Our direction</span>
              </div>
            </header>

            <form className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2" encType="multipart/form-data">
              {formFields.map((field) => (
                <label key={field.name} className="group block">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">
                    {field.label}
                  </span>
                  <input
                    name={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    className="mt-3 w-full border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
                  />
                </label>
              ))}

              <label className="group block md:col-span-2">
                <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Objectives</span>
                <textarea
                  name="objectives"
                  rows={4}
                  placeholder="What should this experience achieve?"
                  className="mt-3 w-full resize-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-sm leading-6 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-black"
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-[10px] font-bold tracking-[0.14em] text-black uppercase">Brief Upload</span>
                <span className="mt-3 flex min-h-24 cursor-pointer items-center justify-between gap-5 border border-dashed border-black/35 px-5 py-4 transition-colors hover:border-black hover:bg-white/40">
                  <span>
                    <span className="block text-sm font-medium">Add your brief or reference files</span>
                    <span className="mt-1 block text-xs text-black/40">PDF, DOC, JPG or PNG</span>
                  </span>
                  <span className="text-2xl font-light" aria-hidden="true">+</span>
                  <input name="brief" type="file" className="sr-only" />
                </span>
              </label>

              <div className="pt-2 md:col-span-2">
                <button
                  type="submit"
                  className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-black px-6 py-5 text-left text-xs font-bold tracking-[0.06em] text-white uppercase md:px-8 md:text-sm"
                >
                  <span>Receive Two Bespoke Concepts Within 48 Hours</span>
                  <span className="shrink-0 text-2xl font-light transition-transform group-hover:translate-x-2" aria-hidden="true">→</span>
                </button>
                <p className="m-0 mt-4 text-sm leading-6 text-black/55">
                  We&apos;ll review your brief and get back to you within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </section>

        <section aria-labelledby="direct-contact-heading" className="bg-white px-8 py-16 text-black md:px-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <header className="grid gap-6 border-t border-black pt-7 md:grid-cols-2 md:items-end">
              <div>
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Prefer to talk?</p>
                <h2 id="direct-contact-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">
                  Contact us directly
                </h2>
              </div>
              <p className="m-0 text-sm leading-6 text-black/50 md:justify-self-end md:text-right">
                UAE-based · Worldwide delivery · Bulk orders welcome
                <br />
                Dubai, United Arab Emirates
              </p>
            </header>

            <div className="mt-12 grid border-t border-l border-black/20 md:grid-cols-3">
              {contactMethods.map((method) => (
                <article
                  key={method.title}
                  className="group flex min-h-[260px] flex-col justify-between border-r border-b border-black/20 p-6 transition-colors duration-300 hover:bg-black hover:text-white md:min-h-[320px] md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] tracking-[0.16em] text-black/35 transition-colors group-hover:text-white/40">{method.number}</span>
                    <span className="text-xl font-light transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </div>
                  <div>
                    <h3 className="m-0 text-xl font-medium tracking-[-0.03em] uppercase">{method.title}</h3>
                    <p className="m-0 mt-3 text-xs leading-5 text-black/50 transition-colors group-hover:text-white/55">{method.description}</p>
                    <a href={method.href} className="mt-6 inline-block text-sm text-black underline underline-offset-4 transition-colors group-hover:text-white">
                      {method.action}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

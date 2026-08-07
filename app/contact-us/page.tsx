import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | The Unboxing — Corporate Gifts UAE",
  description: "Get in touch with The Unboxing team for corporate gifting, branded merchandise, and bulk orders.",
};

const contactMethods = [
  {
    title: "Email",
    description: "Our team responds to all inquiries within 24 hours.",
    action: "hello@theunboxing.ae",
    href: "mailto:hello@theunboxing.ae",
  },
  {
    title: "WhatsApp",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "Message us on WhatsApp",
    href: "https://wa.me/97150000000",
  },
  {
    title: "Phone",
    description: "Sunday to Thursday, 9am – 6pm GST.",
    action: "+971 50 000 0000",
    href: "tel:+97150000000",
  },
];

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section
          aria-label="Contact The Unboxing"
          className="mx-auto w-full max-w-[720px] px-8 py-16 md:px-16 md:py-20"
        >
          <div className="text-center">
            <h1 className="m-0 text-xl leading-7 font-bold tracking-[-0.03em] text-black uppercase md:text-2xl md:leading-8">
              Let&apos;s Build Something Memorable
            </h1>
            <p className="m-0 mt-4 text-xs leading-5 font-normal text-black/60">
              Whether you&apos;re planning a corporate event, launching a campaign, welcoming employees,
              or looking for premium branded merchandise — we&apos;d love to help.
            </p>
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
                  {method.action}
                </a>
              </article>
            ))}
          </div>

          <section id="start-project" aria-label="Start your project" className="mt-16 border-t border-[#e5e5e5] pt-14">
            <div className="text-center">
              <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">Start Your Project</h2>
              <p className="m-0 mt-3 text-xs leading-5 text-black/60">Give our designers the context they need to shape an exceptional first direction.</p>
            </div>
            <form className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                ["company", "Company"], ["audience", "Audience"], ["occasion", "Occasion"], ["quantity", "Quantity"],
                ["budget", "Budget"], ["timeline", "Timeline"], ["industry", "Industry"], ["objectives", "Objectives"],
              ].map(([name, label]) => (
                <label key={name} className="text-[11px] leading-4 font-bold tracking-[0.08em] text-black uppercase">
                  {label}
                  <input name={name} type="text" className="mt-2 w-full border border-black bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-black outline-none" />
                </label>
              ))}
              <label className="text-[11px] leading-4 font-bold tracking-[0.08em] text-black uppercase md:col-span-2">
                Brief Upload
                <input name="brief" type="file" className="mt-2 block w-full border border-black bg-white px-4 py-3 text-xs font-normal normal-case tracking-normal text-black" />
              </label>
              <div className="text-center md:col-span-2">
                <button type="submit" className="inline-flex h-12 cursor-pointer items-center justify-center border-0 bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase">
                  Receive Three Bespoke Concepts Within 48 Hours
                </button>
                <p className="m-0 mt-4 text-xs leading-5 text-black/50">Our designers will contact you within 24 hours.</p>
              </div>
            </form>
          </section>

          <div className="mt-14 border-t border-[#e5e5e5] pt-14 text-center">
            <p className="m-0 text-xs leading-5 text-black/50">
              UAE-based · Worldwide delivery · Bulk orders welcome
            </p>
            <p className="m-0 mt-2 text-xs leading-5 text-black/50">
              Dubai, United Arab Emirates
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

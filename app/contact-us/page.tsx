import Header from "../components/Header";
import Footer from "../components/Footer";
import StartProjectForm from "../components/StartProjectForm";

export const metadata = {
  title: "Contact Us | The Unboxing — Corporate Gifts UAE",
  description:
    "Get in touch with The Unboxing team for corporate gifting, branded merchandise, and bulk orders.",
};

const contactMethods = [
  {
    number: "01",
    title: "Email",
    description: "For briefs, enquiries and new projects.",
    action: "hello@theunboxing.ae",
    href: "mailto:hello@theunboxing.ae",
  },
  {
    number: "02",
    title: "WhatsApp",
    description: "For quick questions and conversations.",
    action: "Start a conversation →",
    href: "https://wa.me/971506023071",
  },
  {
    number: "03",
    title: "Phone",
    description: "Prefer to speak? We'd be happy to hear from you.",
    action: "+971 50 602 3071",
    href: "tel:+971506023071",
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
                className="m-0 mt-5 max-w-[980px] text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.86] font-light tracking-[-0.07em] uppercase"
              >
                Let&apos;s Create
                <br />
                Something
                <br />
                Worth Keeping
              </h1>
            </div>
            <p className="m-0 max-w-[520px] border-t border-white/25 pt-6 text-sm leading-6 text-white/60 md:text-base md:leading-7">
              Whether you&apos;re welcoming employees, celebrating clients, launching a brand or creating a defining moment, tell us what you want people to feel. We&apos;ll design the experience around it.
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
                Give us the context. We&apos;ll turn it into a considered creative direction.
              </p>
              <div className="mt-10 flex items-center gap-4 text-[10px] tracking-[0.16em] text-black/35 uppercase">
                <span>Your context</span>
                <span className="h-px w-12 bg-black/25" aria-hidden="true" />
                <span>Our direction</span>
              </div>
            </header>

            <StartProjectForm />
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
                Dubai-based · Global sourcing · International delivery
                <br />
                United Arab Emirates
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
                    <a
                      href={method.href}
                      className="mt-6 inline-block text-sm text-black underline underline-offset-4 transition-colors group-hover:text-white"
                      target={method.title === "WhatsApp" ? "_blank" : undefined}
                      rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    >
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

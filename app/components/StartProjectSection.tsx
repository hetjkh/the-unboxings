export default function StartProjectSection() {
  return (
    <section
      id="start-project"
      aria-labelledby="start-project-heading"
      className="bg-[#f1f0ec] px-8 py-16 text-black md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-t border-black pt-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-black/45 uppercase">
              Your brief, considered
            </p>
            <h2
              id="start-project-heading"
              className="m-0 mt-5 max-w-[760px] text-[clamp(3rem,7vw,7rem)] leading-[0.88] font-light tracking-[-0.065em] uppercase"
            >
              Start Your
              <br />
              Project
            </h2>
          </div>

          <div className="flex flex-col justify-between">
            <p className="m-0 max-w-[560px] text-base leading-7 text-black/65 md:text-xl md:leading-8">
              Tell us about the moment, the people and what you want to achieve. Share your timeline and budget, and we&apos;ll take it from there.
            </p>

            <div className="mt-12 grid grid-cols-3 border-t border-l border-black/20">
              {[
                ["01", "Share the brief"],
                ["02", "We shape the direction"],
                ["03", "Review your concepts"],
              ].map(([number, label]) => (
                <div key={number} className="min-h-[110px] min-w-0 border-r border-b border-black/20 p-3 sm:p-4">
                  <p className="m-0 text-[10px] tracking-[0.16em] text-black/35 uppercase">
                    {number}
                    <span aria-hidden="true"> —</span>
                  </p>
                  <p className="m-0 mt-7 text-[10px] leading-4 font-medium uppercase sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="/contact-us#start-project"
          className="group mt-12 flex min-h-20 items-center justify-between gap-6 bg-black px-6 py-5 text-xs font-bold tracking-[0.06em] text-white uppercase no-underline md:mt-16 md:px-8 md:text-sm"
        >
          <span>Receive Two Bespoke Concepts Within 48 Hours</span>
          <span className="shrink-0 text-2xl font-light transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
        </a>
        <p className="m-0 mt-4 text-sm leading-6 text-black/55">
          We&apos;ll review your brief and get back to you within 24 hours.
        </p>
      </div>
    </section>
  );
}

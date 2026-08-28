const method = [
  { letter: "C", title: "Consult", description: "Clarify the audience, objective and commercial opportunity." },
  { letter: "R", title: "Research", description: "Find the cultural, material and contextual insight." },
  { letter: "E", title: "Envision", description: "Shape a concept people will want to keep." },
  { letter: "A", title: "Assemble", description: "Prototype, refine and bring every detail into alignment." },
  { letter: "T", title: "Transform", description: "Elevate the idea into a considered brand experience." },
  { letter: "E", title: "Execute", description: "Deliver with precision, on time and with measurable brand impact." },
];

export default function CreateMethodSection() {
  return (
    <section
      aria-labelledby="create-method-heading"
      className="overflow-hidden bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="grid gap-8 border-b border-white/20 pb-10 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
          <div>
            <p className="m-0 text-[10px] leading-4 font-medium tracking-[0.24em] text-white/50 uppercase">
              Our process
            </p>
            <h2
              id="create-method-heading"
              className="m-0 mt-4 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.88] font-light tracking-[-0.065em] uppercase"
            >
              CREATE<span className="align-top text-[0.24em] leading-none tracking-normal">™</span>
            </h2>
          </div>
          <p className="m-0 max-w-[390px] text-sm leading-6 text-white/60 md:text-right">
            Six connected stages. One clear path from opportunity to lasting brand impact.
          </p>
        </header>

        <div className="grid md:grid-cols-6">
          {method.map(({ letter, title, description }, index) => (
            <article
              key={title}
              className="group relative grid grid-cols-[3.5rem_1fr] gap-4 border-b border-white/15 py-8 last:border-b-0 md:block md:min-h-[360px] md:border-r md:border-b-0 md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="relative">
                <span className="text-[10px] leading-4 font-medium tracking-[0.18em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-[3px] h-full w-px bg-white/15 md:hidden"
                />
              </div>

              <div className="md:flex md:h-full md:flex-col">
                <span
                  aria-hidden="true"
                  className="block text-6xl leading-[0.8] font-light tracking-[-0.06em] text-white/20 transition-colors duration-300 group-hover:text-white md:mt-8 md:text-[clamp(4.5rem,7vw,7rem)]"
                >
                  {letter}
                </span>
                <div className="mt-7 md:mt-auto">
                  <h3 className="m-0 text-sm leading-5 font-bold tracking-[0.08em] uppercase">
                    {title}
                  </h3>
                  <p className="m-0 mt-3 max-w-[260px] text-xs leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/80">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center border-t border-white/20 pt-10">
          <a
            href="/behind-the-design"
            className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-[10px] font-bold tracking-[0.14em] text-white uppercase no-underline hover:bg-white hover:text-black"
          >
            Explore behind the design&nbsp; →
          </a>
        </div>
      </div>
    </section>
  );
}

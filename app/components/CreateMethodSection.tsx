const method = [
  { letter: "C", title: "Consult", description: "Understand the audience, occasion, objective and desired impact." },
  { letter: "R", title: "Research", description: "Explore the cultural, material and contextual details that shape the idea." },
  { letter: "E", title: "Envision", description: "Turn insight into a concept worth remembering — and keeping." },
  { letter: "A", title: "Assemble", description: "Prototype, test and refine every material, detail and finish." },
  { letter: "T", title: "Transform", description: "Bring product, packaging and presentation together as one experience." },
  { letter: "E", title: "Execute", description: "Produce, quality-check and deliver every detail with precision." },
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
            Six stages. One considered process from first thought to final unboxing.
          </p>
        </header>

        <div className="grid md:grid-cols-6 md:grid-rows-[auto_minmax(11rem,1fr)_auto_auto]">
          {method.map(({ letter, title, description }, index) => (
            <article
              key={title}
              className="group relative grid grid-cols-[3.5rem_1fr] gap-4 border-b border-white/15 py-8 last:border-b-0 md:row-span-4 md:grid md:grid-rows-subgrid md:grid-cols-1 md:gap-0 md:border-r md:border-b-0 md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="relative md:row-start-1">
                <span className="text-[10px] leading-4 font-medium tracking-[0.18em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-[3px] h-full w-px bg-white/15 md:hidden"
                />
              </div>

              <div className="col-start-2 grid gap-0 md:contents">
                <div className="relative mt-0 md:row-start-2 md:pb-10">
                  <span
                    aria-hidden="true"
                    className="block text-6xl leading-[0.8] font-light tracking-[-0.06em] text-white/20 transition-colors duration-300 group-hover:text-white md:absolute md:top-0 md:left-0 md:text-[clamp(4.5rem,7vw,7rem)] md:leading-none"
                  >
                    {letter}
                  </span>
                </div>
                <h3 className="m-0 mt-10 text-sm leading-5 font-bold tracking-[0.08em] uppercase md:row-start-3 md:mt-0">
                  {title}
                </h3>
                <p className="m-0 mt-3 max-w-[260px] text-xs leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/80 md:row-start-4">
                  {description}
                </p>
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

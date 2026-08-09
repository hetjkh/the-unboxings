const prompts = [
  "Audience",
  "Occasion",
  "Quantity",
  "Budget",
  "Timeline",
  "Industry",
  "Objective",
  "Desired Feeling",
];

export default function ConceptLabSection() {
  return (
    <section
      aria-labelledby="concept-lab-heading"
      className="overflow-hidden bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-20">
          <header className="lg:sticky lg:top-24 lg:self-start">
            <p className="m-0 text-[10px] leading-4 font-medium tracking-[0.24em] text-white/45 uppercase">
              Start with the right questions
            </p>
            <h2
              id="concept-lab-heading"
              className="m-0 mt-5 max-w-[620px] text-[clamp(3rem,7vw,7rem)] leading-[0.88] font-light tracking-[-0.065em] uppercase"
            >
              Concept
              <br />
              Lab
            </h2>
            <p className="m-0 mt-8 max-w-[470px] text-sm leading-6 text-white/60 md:text-base md:leading-7">
              Tell us what the moment needs to achieve. We will turn the right questions into an original direction for your brand.
            </p>

            <div className="mt-10 flex items-center gap-4 text-[10px] tracking-[0.18em] text-white/35 uppercase">
              <span>Questions</span>
              <span className="h-px w-14 bg-white/25" aria-hidden="true" />
              <span>Direction</span>
            </div>
          </header>

          <ol className="m-0 grid list-none grid-cols-1 border-t border-l border-white/20 p-0 sm:grid-cols-2">
            {prompts.map((prompt, index) => (
              <li
                key={prompt}
                className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden border-r border-b border-white/20 p-5 transition-colors duration-300 hover:bg-white hover:text-black md:min-h-[190px] md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] leading-4 font-medium tracking-[0.18em] text-white/35 transition-colors duration-300 group-hover:text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-lg leading-none font-light text-white/50 transition-all duration-300 group-hover:rotate-90 group-hover:border-black/20 group-hover:text-black"
                  >
                    +
                  </span>
                </div>
                <span className="relative z-10 text-lg leading-6 font-medium tracking-[-0.025em] md:text-xl">
                  {prompt}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -bottom-8 text-[7rem] leading-none font-light tracking-[-0.08em] text-white transition-colors duration-300 group-hover:text-black/10"
                >
                  {index + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const prompts = ["Audience", "Occasion", "Quantity", "Budget", "Timeline", "Industry", "Objective", "Desired Feeling"];

export default function ConceptLabSection() {
  return (
    <section aria-label="Concept lab" className="bg-black px-8 py-14 text-white md:px-16 md:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] uppercase">Concept Lab</h2>
          <p className="m-0 mt-4 max-w-[480px] text-sm leading-6 text-white/70">Tell us what the moment needs to achieve. We will turn the right questions into an original direction for your brand.</p>
        </div>
        <div className="grid grid-cols-2 border-t border-l border-white/20">
          {prompts.map((prompt) => <span key={prompt} className="border-r border-b border-white/20 px-4 py-4 text-xs leading-4 text-white/80">{prompt}</span>)}
        </div>
      </div>
    </section>
  );
}

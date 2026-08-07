const method = [
  ["C", "Consult", "Clarify the audience, objective and commercial opportunity."],
  ["R", "Research", "Find the cultural, material and contextual insight."],
  ["E", "Envision", "Shape a concept people will want to keep."],
  ["A", "Assemble", "Prototype, refine and bring every detail into alignment."],
  ["T", "Transform", "Deliver an experience with measurable brand impact."],
];

export default function CreateMethodSection() {
  return (
    <section aria-label="CREATE method" className="bg-black px-8 py-14 text-white md:px-16 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="m-0 text-center text-base leading-6 font-bold tracking-[-0.03em] uppercase">CREATE™ Method</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
          {method.map(([letter, title, description]) => (
            <article key={title}>
              <span className="text-4xl leading-none font-light text-white/30">{letter}</span>
              <h3 className="m-0 mt-3 text-xs leading-4 font-bold tracking-[0.06em] uppercase">{title}</h3>
              <p className="m-0 mt-2 text-xs leading-5 text-white/65">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

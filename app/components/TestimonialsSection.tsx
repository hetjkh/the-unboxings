import Link from "next/link";

const projects = [
  { number: "01", title: "A Landmark Arrival", description: "A considered welcome experience for 500 new homeowners.", href: "/brand-stories/dubai-developer-homeowners" },
  { number: "02", title: "A Boardroom Object", description: "Dubai architecture translated into an acrylic chess set.", href: "/brand-stories/dubai-skyline-chess-set" },
  { number: "03", title: "Access, Unboxed", description: "A private banking card presentation designed around anticipation.", href: "/brand-stories/the-private-reveal" },
];

export default function TestimonialsSection() {
  return (
    <section aria-label="Signature projects" className="bg-white px-8 py-14 md:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-4 border-b border-black pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 text-[10px] font-bold tracking-[0.08em] text-black/40 uppercase">Selected work</p>
            <h2 className="m-0 mt-3 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">Signature Projects</h2>
          </div>
          <p className="m-0 max-w-[420px] text-xs leading-5 text-black/60 md:text-right">A few examples of ideas made tangible.</p>
        </div>
        <div className="border-l border-[#e5e5e5]">
          {projects.map((project) => (
            <Link key={project.number} href={project.href} className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 border-r border-b border-[#e5e5e5] px-5 py-5 text-black no-underline md:grid-cols-[64px_1fr_auto] md:px-6">
              <span className="text-2xl font-light tracking-[-0.04em] text-black/25 transition-colors duration-300 group-hover:text-black">{project.number}</span>
              <div>
                <h3 className="m-0 text-xs leading-4 font-bold tracking-[-0.02em] uppercase">{project.title}</h3>
                <p className="m-0 mt-1 text-xs leading-5 text-black/60">{project.description}</p>
              </div>
              <span className="text-xs leading-4 font-medium underline underline-offset-4">View</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

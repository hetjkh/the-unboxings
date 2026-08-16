import Image from "next/image";

const stories = [
  { number: "01", title: "Architectural materials", description: "Acrylic brings clarity, precise form and architectural presence to a finished object.", material: "Acrylic", product: "Recognition award", image: "/materials/tiles/acrylic.png" },
  { number: "02", title: "Tactile finishes", description: "Full-grain leather adds softness, character and a considered feel to every interaction.", material: "Leather", product: "Executive portfolio", image: "/materials/tiles/leather.png" },
  { number: "03", title: "Future-minded choices", description: "Recycled composite materials create expressive products with a more responsible material story.", material: "Recycled composite", product: "Premium packaging", image: "/materials/tiles/recycled.png" },
] as const;

export default function GucciServicesSection() {
  return (
    <section aria-labelledby="material-library-heading" className="bg-[#f1f0ec] text-black">
      <div className="mx-auto max-w-[1440px] px-8 py-16 md:px-16 md:py-24">
        <header className="grid gap-7 border-t border-black pt-7 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">Surface · Weight · Finish</p>
            <h2 id="material-library-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">Material Library</h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="m-0 max-w-[650px] text-sm leading-6 text-black/50">Every material carries a message. We select it not only for how it looks, but for what it allows the final product to become.</p>
            <a href="/materials" className="mt-6 inline-flex items-center gap-3 border-b border-black pb-2 text-[10px] font-bold tracking-[0.1em] text-black uppercase no-underline">View more materials <span aria-hidden="true">→</span></a>
          </div>
        </header>
      </div>

      <div className="border-t border-black/20">
        {stories.map((story, index) => {
          const imageFirst = index % 2 === 0;
          return (
            <article key={story.title} className="grid border-b border-black/20 bg-white lg:grid-cols-2">
              <div data-motion-media className={`group relative min-h-[420px] overflow-hidden md:min-h-[560px] ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                <Image src={story.image} alt={`${story.material} used to create a ${story.product}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />
                <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-5 p-6 text-white md:p-8">
                  <span className="text-xs font-bold tracking-[0.06em] uppercase">{story.material}</span>
                  <span className="text-right text-[10px] leading-4 text-white/65 uppercase">{story.product}</span>
                </div>
              </div>
              <div className={`flex min-h-[380px] flex-col justify-between px-8 py-10 md:min-h-[560px] md:px-16 md:py-14 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                <span className="text-[10px] font-medium tracking-[0.18em] text-black/35">{story.number} / MATERIAL STORY</span>
                <div className="my-16">
                  <h3 className="m-0 max-w-[560px] text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">{story.title}</h3>
                  <p className="m-0 mt-6 max-w-[520px] text-sm leading-6 text-black/50">{story.description}</p>
                </div>
                <div className="border-t border-black/20 pt-5">
                  <p className="m-0 text-[10px] font-bold tracking-[0.12em] text-black/40 uppercase">Made into</p>
                  <ul className="m-0 mt-4 list-none p-0">
                    <li className="border-l border-black pl-3 text-xs leading-5">{story.product}</li>
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid bg-[#cbd8d4] md:grid-cols-[1.4fr_0.6fr]">
        <div className="px-8 py-12 md:px-16 md:py-16">
          <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">From material to meaning</p>
          <h3 className="m-0 mt-4 max-w-[760px] text-3xl leading-tight font-light tracking-[-0.04em] md:text-5xl">See how each choice becomes part of the final experience.</h3>
        </div>
        <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-14">
          <a href="/behind-the-design" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline">Explore our process <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}

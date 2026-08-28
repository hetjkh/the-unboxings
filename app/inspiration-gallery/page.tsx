import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMotion from "../components/HomeMotion";
import { brandStories } from "../data/brandStories";

export const metadata: Metadata = {
  title: "Brand Stories | The Unboxing",
  description: "Explore how insights become ideas, designs and memorable brand experiences.",
};

export default function InspirationGalleryPage() {
  return (
    <>
      <Header />
      <main>
        <HomeMotion>
          <section aria-labelledby="inspiration-heading" className="grid bg-[#0a0a0a] text-white lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase">Selected work</p>
              <div className="mt-24">
                <h1 id="inspiration-heading" className="m-0 text-[clamp(3.25rem,7vw,7rem)] leading-[0.87] font-light tracking-[-0.07em] uppercase">Brand<br />Stories</h1>
                <p className="m-0 mt-8 max-w-[520px] border-t border-white/25 pt-6 text-base leading-7 text-white/65">Every memorable piece begins with a story.</p>
                <p className="m-0 mt-4 max-w-[520px] text-sm leading-6 text-white/45">Explore how an insight becomes an idea, an idea becomes a design, and a design becomes an experience people remember.</p>
              </div>
            </div>
            <div data-motion-media className="relative min-h-[500px] overflow-hidden lg:min-h-full">
              <Image src={brandStories[0].image} alt={brandStories[0].alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </section>

          <section aria-labelledby="story-directory-heading" className="bg-[#11100f] px-4 py-16 text-white md:px-8 md:py-24">
            <div className="mx-auto max-w-[1440px]">
              <header className="mb-12 flex items-end justify-between border-t border-white/25 pt-7 md:mb-16">
                <div>
                  <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">Brand stories</p>
                  <h2 id="story-directory-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">From brief to experience</h2>
                </div>
                <span className="hidden text-xs text-white/35 sm:block">{String(brandStories.length).padStart(2, "0")} stories</span>
              </header>

              <div className="border-t border-l border-white/15">
                {brandStories.map((story, index) => {
                  const imageFirst = index % 2 === 0;
                  return (
                    <article key={story.slug} data-motion-card className="grid border-r border-b border-white/15 bg-[#171614] lg:grid-cols-[1.15fr_0.85fr]">
                      <Link href={`/brand-stories/${story.slug}`} data-motion-media className={`group relative min-h-[360px] overflow-hidden md:min-h-[540px] ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                        <Image src={story.image} alt={story.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 1024px) 100vw, 58vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
                        <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.16em] text-white/70">{String(index + 1).padStart(2, "0")} / {String(brandStories.length).padStart(2, "0")}</span>
                      </Link>
                      <div className={`flex min-h-[380px] flex-col justify-between p-7 md:min-h-[540px] md:p-12 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                        <p className="m-0 text-[10px] font-medium tracking-[0.18em] text-white/35 uppercase">Brand story</p>
                        <div className="my-14">
                          <h3 className="m-0 text-3xl leading-[1.06] font-light tracking-[-0.045em] uppercase md:text-5xl">{story.title}</h3>
                          <p className="m-0 mt-6 max-w-[520px] text-sm leading-6 text-white/50">{story.challenge}</p>
                        </div>
                        <div className="border-t border-white/15 pt-5">
                          <p className="m-0 text-[10px] leading-4 tracking-[0.1em] text-white/35 uppercase">{story.materials}</p>
                          <Link href={`/brand-stories/${story.slug}`} className="mt-7 flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-white uppercase no-underline">View the brand story <span className="text-lg font-light" aria-hidden="true">→</span></Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid bg-[#cbd8d4] text-black md:grid-cols-[1.4fr_0.6fr]" aria-labelledby="inspiration-cta-heading">
            <div className="px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">Your story starts here</p>
              <h2 id="inspiration-cta-heading" className="m-0 mt-4 max-w-[800px] text-3xl leading-tight font-light tracking-[-0.04em] md:text-5xl">Bring us the moment. We will shape an experience around it.</h2>
            </div>
            <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
              <a href="/contact-us#start-project" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline">Start your project <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </HomeMotion>
      </main>
      <Footer />
    </>
  );
}

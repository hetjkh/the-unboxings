import Image from "next/image";
import Link from "next/link";
import { brandStories } from "../data/brandStories";

export default function MenCampaignHero() {
  const [featuredStory, ...supportingStories] = brandStories;

  return (
    <section
      id="brand-stories"
      aria-labelledby="brand-stories-heading"
      className="overflow-hidden bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="grid gap-8 border-b border-white/20 pb-10 md:grid-cols-[1fr_0.8fr] md:items-end md:pb-14">
          <div>
            <p className="m-0 text-[10px] leading-4 font-medium tracking-[0.24em] text-white/45 uppercase">
              Selected work
            </p>
            <h2
              id="brand-stories-heading"
              className="m-0 mt-5 max-w-[760px] text-[clamp(3rem,7vw,7rem)] leading-[0.88] font-light tracking-[-0.065em] uppercase"
            >
              Brand
              <br />
              Stories
            </h2>
          </div>
          <p className="m-0 max-w-[540px] text-sm leading-6 text-white/60 md:justify-self-end md:text-base md:leading-7">
            We don&apos;t sell gifts. We design memorable brand experiences—from the first reference to the moment they are opened.
          </p>
        </header>

        <Link
          href={`/brand-stories/${featuredStory.slug}`}
          data-motion-card
          className="group mt-10 grid overflow-hidden border border-white/20 text-white no-underline md:mt-14 md:grid-cols-[1.35fr_0.65fr]"
        >
          <div data-motion-media className="relative min-h-[360px] overflow-hidden bg-white/10 md:min-h-[680px]">
            <Image
              src={featuredStory.image}
              alt={featuredStory.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              sizes="(max-width: 768px) 100vw, 68vw"
            />
            <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.18em] text-white/70">
              01 / 04
            </span>
          </div>

          <div className="flex min-h-[360px] flex-col justify-between p-6 md:p-10">
            <div>
              <p className="m-0 text-[10px] font-medium tracking-[0.18em] text-white/40 uppercase">
                Featured story
              </p>
              <h3 className="m-0 mt-5 text-2xl leading-[1.08] font-light tracking-[-0.04em] uppercase md:text-4xl">
                {featuredStory.title}
              </h3>
              <p className="m-0 mt-6 text-sm leading-6 text-white/55">
                {featuredStory.challenge}
              </p>
            </div>

            <div className="mt-12 border-t border-white/20 pt-5">
              <p className="m-0 text-[10px] leading-4 tracking-[0.12em] text-white/40 uppercase">
                {featuredStory.materials}
              </p>
              <span className="mt-8 flex items-center justify-between text-xs font-bold tracking-[0.08em] uppercase">
                View case study
                <span className="text-xl font-light transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {supportingStories.map((story, index) => (
            <Link
              key={story.slug}
              href={`/brand-stories/${story.slug}`}
              data-motion-card
              className="group flex flex-col border border-white/20 text-white no-underline"
            >
              <div data-motion-media className="relative aspect-[4/3] overflow-hidden bg-white/10">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.18em] text-white/70">
                  {String(index + 2).padStart(2, "0")} / 04
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="m-0 text-lg leading-6 font-medium tracking-[-0.03em] uppercase">
                  {story.title}
                </h3>
                <p className="m-0 mt-3 flex-1 text-xs leading-5 text-white/50">
                  {story.challenge}
                </p>
                <span className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] font-bold tracking-[0.12em] uppercase">
                  Read story
                  <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

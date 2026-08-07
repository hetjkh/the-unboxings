import Image from "next/image";
import Link from "next/link";
import { brandStories } from "../data/brandStories";

const journey = ["Brief", "Moodboard", "Sketch", "Materials", "Production", "Packaging", "Final Experience"];

export default function MenCampaignHero() {
  return (
    <section id="brand-stories" aria-label="Brand stories" className="bg-black py-14 text-white md:py-20">
      <div className="px-8 text-center md:px-16">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] uppercase">Brand Stories</h2>
        <p className="mx-auto mt-4 max-w-[720px] text-xs leading-5 text-white/70">
          We don&apos;t sell gifts. We design memorable brand experiences—from the first reference to the moment they are opened.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-10 px-8 md:grid-cols-2 md:px-16">
        {brandStories.map((story) => (
          <Link key={story.slug} href={`/brand-stories/${story.slug}`} className="group no-underline">
            <div className="relative aspect-square overflow-hidden bg-white/10">
              <Image src={story.image} alt={story.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <h3 className="m-0 mt-4 text-base leading-6 font-bold tracking-[-0.03em] text-white uppercase">{story.title}</h3>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-[10px] leading-4 font-medium tracking-[0.04em] text-white/60 uppercase">
              {journey.map((step, index) => <span key={step}>{index ? "→ " : ""}{step}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

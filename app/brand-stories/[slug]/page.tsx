import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { brandStories } from "../../data/brandStories";

export function generateStaticParams() {
  return brandStories.map(({ slug }) => ({ slug }));
}

export default async function BrandStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = brandStories.find((item) => item.slug === slug);

  if (!story) notFound();

  const details = [
    ["Challenge", story.challenge],
    ["Concept", story.concept],
    ["Materials", story.materials],
    ["Process", story.process],
    ["Prototype", story.prototype],
    ["Final Outcome", story.outcome],
  ];

  return (
    <>
      <Header />
      <main className="bg-white">
        <section aria-label={story.title} className="px-8 pt-14 pb-10 md:px-16 md:pt-20">
          <h1 className="mx-auto m-0 max-w-[1000px] text-center text-2xl leading-8 font-bold tracking-[-0.04em] text-black uppercase md:text-4xl md:leading-[1.1]">
            {story.title}
          </h1>
        </section>
        <div className="relative aspect-square w-full overflow-hidden md:aspect-[16/9]">
          <Image src={story.image} alt={story.alt} fill priority className="object-cover" sizes="100vw" />
        </div>
        <section className="mx-auto max-w-[1200px] px-8 py-14 md:px-16 md:py-20">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
            {details.map(([label, value]) => (
              <article key={label} className="border-t border-[#e5e5e5] pt-5">
                <h2 className="m-0 text-xs leading-4 font-bold tracking-[0.06em] text-black/40 uppercase">{label}</h2>
                <p className="m-0 mt-3 text-base leading-6 text-black">{value}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href="/contact-us#start-project" className="inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline">
              Start Your Project
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

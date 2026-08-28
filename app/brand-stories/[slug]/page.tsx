import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeMotion from "../../components/HomeMotion";
import { brandStories } from "../../data/brandStories";

function StoryImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1200}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  );
}

export function generateStaticParams() {
  return brandStories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = brandStories.find((item) => item.slug === slug);
  if (!story) return { title: "Brand Story | The Unboxing" };
  return {
    title: `${story.title} | The Unboxing`,
    description: story.challenge,
  };
}

export default async function BrandStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = brandStories.find((item) => item.slug === slug);

  if (!story) notFound();

  const storyIndex = brandStories.findIndex((item) => item.slug === slug);
  const nextStory = brandStories[(storyIndex + 1) % brandStories.length];

  return (
    <>
      <Header />
      <main className="bg-white">
        <HomeMotion>
          <section aria-labelledby="story-heading" className="grid bg-[#0a0a0a] text-white lg:min-h-[calc(100svh-72px)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-between px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase">Brand story</p>
              <div className="mt-24">
                <h1 id="story-heading" className="m-0 max-w-[640px] text-[clamp(2.4rem,5.5vw,4.75rem)] leading-[0.92] font-light tracking-[-0.055em] uppercase">
                  {story.title}
                </h1>
                <p className="m-0 mt-8 max-w-[480px] border-t border-white/25 pt-6 text-base leading-7 text-white/65">
                  {story.tagline}
                </p>
                <p className="m-0 mt-5 max-w-[480px] text-sm leading-6 text-white/45">
                  {story.challenge}
                </p>
              </div>
            </div>
            <div data-motion-media className="relative flex min-h-[520px] items-center justify-center bg-[#0a0a0a] p-4 lg:min-h-full lg:p-8">
              <StoryImage
                src={story.image}
                alt={story.alt}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="max-h-[min(85svh,900px)] object-contain object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </section>

          <section aria-label="Story details" className="bg-white px-8 py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-12 border-t border-black/10 pt-6 md:mb-16">
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/35 uppercase">Materials & focus</p>
                <p className="m-0 mt-4 max-w-[640px] text-sm leading-6 text-black/55">{story.materials}</p>
              </div>

              {story.gallery.length === 1 ? (
                <div className="grid gap-12 border-t border-black/10 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pt-16">
                  <div className="space-y-12">
                    {story.sections.map((section) => (
                      <article key={section.heading} className="border-t border-black/10 pt-6">
                        <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                        <p className="m-0 mt-4 text-base leading-7 text-black/80 md:text-lg md:leading-8">{section.body}</p>
                      </article>
                    ))}
                  </div>
                  <div data-motion-media className="bg-[#f1f0ec] md:sticky md:top-28 md:self-start">
                    <StoryImage
                      src={story.gallery[0]}
                      alt={`${story.title} — detail`}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                </div>
              ) : (
                <div className="border-t border-black/10">
                  {story.sections.map((section, index) => {
                    const image = story.gallery[index];
                    const imageFirst = index % 2 === 0;

                    return (
                      <article
                        key={section.heading}
                        className={`grid border-b border-black/10 ${image ? "md:grid-cols-2 md:items-start" : ""}`}
                      >
                        {image ? (
                          <div
                            data-motion-media
                            className={`bg-[#f1f0ec] ${imageFirst ? "md:order-1" : "md:order-2"}`}
                          >
                            <StoryImage
                              src={image}
                              alt={`${story.title} — ${section.heading}`}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        ) : null}
                        <div
                          className={`flex flex-col justify-center p-7 md:p-12 lg:p-16 ${image ? (imageFirst ? "md:order-2" : "md:order-1") : ""}`}
                        >
                          <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                          <p className="m-0 mt-4 text-base leading-7 text-black/80 md:text-lg md:leading-8">{section.body}</p>
                        </div>
                      </article>
                    );
                  })}

                  {story.gallery.slice(story.sections.length).map((src, index) => (
                    <div key={src} data-motion-media className="border-b border-black/10 bg-[#f1f0ec]">
                      <StoryImage
                        src={src}
                        alt={`${story.title} — detail ${story.sections.length + index + 1}`}
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section aria-label="Closing thought" className="bg-[#f1f0ec] px-8 py-16 md:px-16 md:py-24">
            <blockquote className="mx-auto m-0 max-w-[900px] text-center">
              <p className="m-0 text-2xl leading-snug font-light tracking-[-0.04em] text-black md:text-4xl md:leading-[1.2]">
                {story.closing}
              </p>
            </blockquote>
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <a href="/contact-us#start-project" className="inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline">
                Start Your Project
              </a>
              <Link href={`/brand-stories/${nextStory.slug}`} className="inline-flex h-12 items-center justify-center border border-black px-8 text-xs font-bold tracking-[0.04em] text-black uppercase no-underline">
                Next story&nbsp; →
              </Link>
            </div>
          </section>
        </HomeMotion>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeMotion from "../../components/HomeMotion";
import { getBrandStories, getBrandStoryBySlug } from "@/lib/cms/content";
import { plainTextFromRich } from "@/lib/cms/rich-text";
import FormattedText from "../../components/FormattedText";

export const revalidate = 60;

function StoryImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  fill = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover object-center ${className}`}
      />
    );
  }

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

export async function generateStaticParams() {
  const stories = await getBrandStories();
  return stories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getBrandStoryBySlug(slug);
  if (!story) return { title: "Brand Story | The Unboxing" };
  return {
    title: `${plainTextFromRich(story.title)} | The Unboxing`,
    description: story.challenge,
  };
}

export default async function BrandStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brandStories = await getBrandStories();
  const story = await getBrandStoryBySlug(slug);

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
                  <FormattedText html={story.title} />
                </h1>
                <p className="m-0 mt-8 max-w-[480px] border-t border-white/25 pt-6 text-base leading-7 text-white/65">
                  <FormattedText html={story.tagline} />
                </p>
                <p className="m-0 mt-5 max-w-[480px] text-sm leading-6 text-white/45">
                  <FormattedText html={story.challenge} />
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
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/35 uppercase">Material & focus info</p>
                <div className="mt-4 max-w-[760px] text-sm leading-6 text-black/55 [&_strong]:font-bold [&_strong]:text-black">
                  <FormattedText html={story.materialsDetail || story.materials} as="div" />
                </div>
              </div>

              {story.gallery.length === 1 ? (
                <div className="grid gap-12 border-t border-black/10 pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pt-16">
                  <div className="space-y-12">
                    {story.sections.map((section) => (
                      <article key={section.heading} className="border-t border-black/10 pt-6">
                        <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                        <p className="m-0 mt-4 text-base leading-7 text-black/80 md:text-lg md:leading-8">
                          <FormattedText html={section.body} />
                        </p>
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
                        className={`grid border-b border-black/10 ${image ? "md:grid-cols-2" : ""}`}
                      >
                        {image ? (
                          <div
                            data-motion-media
                            className={`relative min-h-[280px] bg-[#f1f0ec] md:min-h-[420px] ${imageFirst ? "md:order-1" : "md:order-2"}`}
                          >
                            <StoryImage
                              src={image}
                              alt={`${story.title} — ${section.heading}`}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              fill
                            />
                          </div>
                        ) : null}
                        <div
                          className={`flex flex-col justify-center p-7 md:p-10 lg:p-12 ${image ? (imageFirst ? "md:order-2" : "md:order-1") : ""}`}
                        >
                          <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                          <p className="m-0 mt-4 text-base leading-7 text-black/80 md:text-lg md:leading-8">
                          <FormattedText html={section.body} />
                        </p>
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
            <blockquote className="mx-auto m-0 w-full text-center">
              <p className="m-0 whitespace-nowrap text-[clamp(1.05rem,2.6vw,2.25rem)] leading-snug font-light tracking-[-0.04em] text-black">
                <FormattedText html={story.closing} />
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

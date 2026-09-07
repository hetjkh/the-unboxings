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
          <section
            aria-labelledby="story-heading"
            className="grid overflow-hidden border-b border-black/20 bg-[#0a0a0a] text-white md:h-[52vh] md:max-h-[680px] md:grid-cols-[1fr_1.05fr] lg:h-[min(calc(100svh-72px),820px)] lg:max-h-none"
          >
            {/* Mobile: image first. Desktop: text left / image right */}
            <div
              data-motion-media
              className="relative order-1 aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a] sm:aspect-[16/9] md:order-2 md:aspect-auto md:flex md:h-full md:min-h-0 md:items-center md:justify-center md:p-6 lg:p-8"
            >
              <StoryImage
                src={story.image}
                alt={story.alt}
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
                fill
                className="object-cover object-center md:object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="order-2 flex flex-col justify-end px-5 py-6 sm:px-8 sm:py-8 md:order-1 md:justify-center md:px-16 md:py-16">
              <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-white/45 uppercase sm:text-[11px] md:text-xs">
                Brand story
              </p>
              <h1
                id="story-heading"
                className="m-0 mt-3 max-w-[640px] text-[clamp(1.75rem,7vw,4.75rem)] leading-[0.95] font-light tracking-[-0.055em] uppercase sm:mt-4 md:mt-5 md:leading-[0.92]"
              >
                <FormattedText html={story.title} />
              </h1>
              <p className="m-0 mt-3 max-w-[480px] border-t border-white/25 pt-4 text-sm leading-6 text-white/65 sm:mt-4 sm:pt-5 sm:text-base sm:leading-7 md:mt-6 md:pt-6">
                <FormattedText html={story.tagline} />
              </p>
              <p className="m-0 mt-3 max-w-[480px] text-sm leading-6 text-white/45 sm:mt-4 md:mt-5">
                <FormattedText html={story.challenge} />
              </p>
            </div>
          </section>

          <section aria-label="Story details" className="bg-white px-5 py-12 sm:px-8 sm:py-16 md:px-16 md:py-24">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-10 border-t border-black/10 pt-5 sm:mb-12 sm:pt-6 md:mb-16">
                <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/35 uppercase">Material & focus info</p>
                <div className="mt-4 max-w-[760px] text-sm leading-6 text-black/55 [&_strong]:font-bold [&_strong]:text-black">
                  <FormattedText html={story.materialsDetail || story.materials} as="div" />
                </div>
              </div>

              {story.gallery.length === 1 ? (
                <div className="grid gap-10 border-t border-black/10 pt-10 sm:gap-12 sm:pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:pt-16">
                  <div className="space-y-10 sm:space-y-12">
                    {story.sections.map((section) => (
                      <article key={section.heading} className="border-t border-black/10 pt-5 sm:pt-6">
                        <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                        <p className="m-0 mt-4 text-sm leading-6 text-black/80 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                          <FormattedText html={section.body} />
                        </p>
                      </article>
                    ))}
                  </div>
                  <div data-motion-media className="overflow-hidden bg-[#f1f0ec] md:sticky md:top-28 md:self-start">
                    <StoryImage
                      src={story.gallery[0]}
                      alt={`${plainTextFromRich(story.title)} — detail`}
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
                            className={`relative aspect-[4/3] overflow-hidden bg-[#f1f0ec] sm:aspect-auto sm:min-h-[320px] md:min-h-[420px] ${imageFirst ? "md:order-1" : "md:order-2"}`}
                          >
                            <StoryImage
                              src={image}
                              alt={`${plainTextFromRich(story.title)} — ${section.heading}`}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              fill
                            />
                          </div>
                        ) : null}
                        <div
                          className={`flex flex-col justify-center p-5 sm:p-7 md:p-10 lg:p-12 ${image ? (imageFirst ? "md:order-2" : "md:order-1") : ""}`}
                        >
                          <h2 className="m-0 text-xs font-bold tracking-[0.08em] text-black/40 uppercase">{section.heading}</h2>
                          <p className="m-0 mt-4 text-sm leading-6 text-black/80 sm:text-base sm:leading-7 md:text-lg md:leading-8">
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
                        alt={`${plainTextFromRich(story.title)} — detail ${story.sections.length + index + 1}`}
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section aria-label="Closing thought" className="bg-[#f1f0ec] px-5 py-12 sm:px-8 sm:py-16 md:px-16 md:py-24">
            <blockquote className="mx-auto m-0 w-full text-center">
              <p className="m-0 text-[clamp(1.05rem,4.2vw,2.25rem)] leading-snug font-light tracking-[-0.04em] text-black whitespace-normal md:whitespace-nowrap md:text-[clamp(1.05rem,2.6vw,2.25rem)]">
                <FormattedText html={story.closing} />
              </p>
            </blockquote>
            <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <a
                href="/contact-us#start-project"
                className="inline-flex min-h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
              >
                Start Your Project
              </a>
              <Link
                href={`/brand-stories/${nextStory.slug}`}
                className="inline-flex min-h-12 items-center justify-center border border-black px-8 text-xs font-bold tracking-[0.04em] text-black uppercase no-underline"
              >
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

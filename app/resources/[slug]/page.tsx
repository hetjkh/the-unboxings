import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getResourceBySlug, getResources } from "@/lib/cms/content";
import { plainTextFromRich } from "@/lib/cms/rich-text";
import type { ResourceBlock } from "@/lib/cms/content-types";
import FormattedText from "../../components/FormattedText";
import { PLACEHOLDER_IMAGE } from "@/lib/cms/placeholders";

export const revalidate = 60;

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = await getResourceBySlug((await params).slug);
  return article
    ? { title: `${plainTextFromRich(article.title)} | The Unboxing`, description: article.description }
    : {};
}

function BodyBlock({ block }: { block: ResourceBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="m-0 mt-16 border-t border-black/15 pt-6 text-xs font-bold tracking-[0.14em] text-black uppercase">
        <FormattedText html={block.text} />
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ol className="m-0 mt-6 list-none p-0">
        {block.items.map((item, index) => (
          <li
            key={`${index}-${item.slice(0, 24)}`}
            className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-black/10 py-4 text-sm leading-6 text-black/75"
          >
            <span className="text-[10px] font-medium tracking-[0.12em] text-black/35">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <p className="m-0 mt-5 text-sm leading-7 text-black/70">
      <FormattedText html={block.text} />
    </p>
  );
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getResourceBySlug(slug);

  if (!article) notFound();

  const cover = article.images[0] ?? { src: PLACEHOLDER_IMAGE, alt: plainTextFromRich(article.title) };
  const gallery = article.images.slice(1);
  const firstHeadingIndex = article.body.findIndex((block) => block.type === "heading");
  const intro = firstHeadingIndex === -1 ? article.body.slice(0, 3) : article.body.slice(0, firstHeadingIndex);
  const rest = firstHeadingIndex === -1 ? article.body.slice(3) : article.body.slice(firstHeadingIndex);

  return (
    <>
      <Header />
      <main className="bg-white">
        <article>
          <section
            aria-labelledby="article-title"
            className="grid bg-[#0a0a0a] text-white lg:min-h-[640px] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="flex flex-col justify-between px-8 py-12 md:px-16 md:py-16">
              <div>
                <Link
                  href="/resources"
                  className="text-[10px] font-medium tracking-[0.24em] text-white/40 uppercase no-underline hover:text-white"
                >
                  Resource Centre
                </Link>
              </div>

              <div className="mt-16 lg:mt-24">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium tracking-[0.16em] text-white/45 uppercase">
                  <span>{article.category}</span>
                  <span className="h-px w-6 bg-white/25" aria-hidden="true" />
                  <span>{article.readTime}</span>
                </div>
                <h1
                  id="article-title"
                  className="m-0 mt-6 max-w-[620px] text-[clamp(1.75rem,4.2vw,3.35rem)] leading-[1.05] font-light tracking-[-0.045em] uppercase"
                >
                  <FormattedText html={article.title} />
                </h1>
                <p className="m-0 mt-8 max-w-[520px] border-t border-white/20 pt-6 text-sm leading-6 text-white/60">
                  <FormattedText html={article.description} />
                </p>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </section>

          <section className="bg-white px-8 py-14 md:px-16 md:py-20">
            <div className="mx-auto max-w-[760px]">
              {intro.map((block, index) => (
                <BodyBlock key={`intro-${index}`} block={block} />
              ))}
            </div>

            {gallery.length > 0 ? (
              <div
                className={`mx-auto mt-14 grid max-w-[1100px] gap-6 ${gallery.length > 1 ? "md:grid-cols-2" : ""}`}
              >
                {gallery.map((image) => (
                  <figure key={image.src} className="m-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            ) : null}

            <div className="mx-auto max-w-[760px]">
              {rest.map((block, index) => (
                <BodyBlock key={`rest-${index}`} block={block} />
              ))}

              <div className="mt-16 border-t border-black/15 pt-10">
                <p className="m-0 text-[10px] font-medium tracking-[0.18em] text-black/35 uppercase">Next step</p>
                <p className="m-0 mt-4 text-xl leading-7 font-light tracking-[-0.03em] text-black">
                  Have an occasion, budget or idea in mind?
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="/contact-us"
                    className="inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
                  >
                    Start a Conversation
                  </a>
                  <Link href="/resources" className="text-xs text-black/50 underline underline-offset-4">
                    Back to Resource Centre
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

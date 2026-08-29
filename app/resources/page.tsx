import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getResources } from "@/lib/cms/content";
import FormattedText from "../components/FormattedText";
import { PLACEHOLDER_IMAGE } from "@/lib/cms/placeholders";

export const metadata: Metadata = {
  title: "Resource Centre | The Unboxing",
  description:
    "Gifting inspiration, industry trends, and practical guides to help you create impactful branded experiences for your team and clients.",
};

export const revalidate = 60;

export default async function ResourcesPage() {
  const resourceArticles = await getResources();

  return (
    <>
      <Header />
      <main>
        <section aria-label="Resources & Inspiration" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Resource Centre
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Gifting inspiration, industry trends, and practical guides to help you
              create impactful branded experiences for your team and clients.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
              {resourceArticles.map((article) => (
                <article key={article._id} className="flex h-full flex-col">
                  <Link href={`/resources/${article.slug}`} className="group block no-underline">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.images[0]?.src ?? PLACEHOLDER_IMAGE}
                        alt={article.images[0]?.alt ?? article.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="border border-black/20 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-black/40 uppercase">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-black/30">{article.readTime}</span>
                    </div>
                    <h2 className="m-0 mt-3 text-base leading-6 font-bold tracking-[-0.03em] text-black">
                      <FormattedText html={article.title} />
                    </h2>
                    <p className="m-0 mt-3 text-xs leading-5 font-normal text-black/60">
                      <FormattedText html={article.description} />
                    </p>
                    <span className="mt-4 inline-block text-xs leading-4 font-medium text-black underline underline-offset-2">
                      Read Article →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Need personalized guidance on your gifting strategy?
            </p>
            <a
              href="/contact-us"
              className="mt-6 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

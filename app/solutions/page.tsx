import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCatalog } from "@/lib/cms/queries";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { plainTextFromRich } from "@/lib/cms/rich-text";
import { buildWhatsAppUrl, solutionInquiryMessage } from "@/lib/whatsapp";
import FormattedText from "../components/FormattedText";

export const revalidate = 60;

export default async function SolutionsPage() {
  const [catalog, settings] = await Promise.all([getCatalog(), getSiteSettings()]);
  const generalContact = buildWhatsAppUrl(
    settings.whatsappNumber,
    "Hi The Unboxing,\n\nI'd like to discuss a custom branded solution.\n\nPlease share how we can get started.",
  );

  return (
    <>
      <Header />
      <main>
        <section aria-label="Corporate Solutions" className="bg-white">
          <div className="px-5 pt-10 pb-8 text-center sm:px-8 sm:pt-14 sm:pb-10 md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Branded Corporate Solutions
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-sm leading-6 font-normal text-black sm:text-base">
              Rather than individual products, we curate complete branded experiences.
              Each solution below can be fully customized to match your brand, occasion, and budget.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 sm:pb-14 md:px-16">
            <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 md:gap-10">
              {catalog.solutions.map((solution) => {
                const title = plainTextFromRich(solution.title);
                const description = plainTextFromRich(solution.description);
                const detailsHref = buildWhatsAppUrl(
                  settings.whatsappNumber,
                  solutionInquiryMessage({
                    title,
                    description,
                    tags: solution.tags,
                  }),
                );

                return (
                  <article key={solution._id} className="flex h-full min-w-0 flex-col">
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-white">
                      <Image
                        src={solution.image}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 50vw, 400px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col items-center pt-3 text-center sm:pt-4">
                      <div className="mb-2 flex flex-wrap justify-center gap-1">
                        {solution.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-black/20 px-1.5 py-0.5 text-[8px] font-bold tracking-[0.08em] text-black/40 uppercase sm:px-2 sm:text-[9px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="m-0 text-xs leading-5 font-bold tracking-[-0.03em] text-black uppercase sm:text-base sm:leading-6">
                        <FormattedText html={solution.title} />
                      </h2>
                      <p className="m-0 mt-2 line-clamp-4 max-w-[360px] text-[11px] leading-4 font-normal text-black sm:mt-4 sm:line-clamp-none sm:text-base sm:leading-6">
                        <FormattedText html={solution.description} />
                      </p>
                      <div className="mt-auto flex shrink-0 flex-col items-center gap-2 pt-3 sm:pt-4">
                        <a
                          href={detailsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center justify-center border border-black px-3 text-[9px] font-bold tracking-[0.06em] text-black uppercase no-underline hover:bg-black hover:text-white sm:h-10 sm:min-h-0 sm:px-5 sm:text-[10px]"
                        >
                          Request details
                        </a>
                        <a
                          href={solution.href}
                          className="text-[11px] leading-5 font-medium text-black underline underline-offset-2 sm:text-base sm:leading-6"
                        >
                          View collection
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] px-5 py-10 text-center sm:px-8 sm:py-14 md:px-16">
            <p className="m-0 text-sm leading-6 font-normal text-black sm:text-base">
              Don&apos;t see what you&apos;re looking for? We build custom solutions from scratch.
            </p>
            <a
              href={generalContact}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline sm:h-12 sm:px-10"
            >
              Contact on WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

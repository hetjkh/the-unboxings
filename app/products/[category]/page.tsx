import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductGrid from "../../components/ProductGrid";
import { getCategoryBySlug, getCatalog } from "@/lib/cms/queries";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { plainTextFromRich } from "@/lib/cms/rich-text";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import FormattedText from "../../components/FormattedText";

export const revalidate = 60;

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = await getCategoryBySlug((await params).category);
  return category ? { title: `${plainTextFromRich(category.name)} | The Unboxing`, description: category.description } : {};
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const slug = (await params).category;
  const [catalog, settings] = await Promise.all([getCatalog(), getSiteSettings()]);
  const category = catalog.categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryProducts = catalog.products.filter((product) => product.categorySlug === category.slug);
  const containHeaderImage = category.headerImageFit === "contain";
  const tallHeader = category.slug === "luxury-writing";
  const headerClassName = tallHeader
    ? "grid overflow-hidden border-b border-black/20 bg-[#0a0a0a] text-white md:h-[62vh] md:max-h-[820px] md:grid-cols-[1fr_1.05fr]"
    : "grid overflow-hidden border-b border-black/20 bg-[#0a0a0a] text-white md:h-[52vh] md:max-h-[680px] md:grid-cols-[1fr_1.05fr]";
  const collectionWhatsApp = buildWhatsAppUrl(
    settings.whatsappNumber,
    `Hi The Unboxing,\n\nI'd like a curated proposal for the ${plainTextFromRich(category.name)} collection.\n\nPlease share options, MOQ and timeline.`,
  );

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className={headerClassName} aria-labelledby="category-title">
          {/* Mobile: image first. Desktop: text left / image right */}
          <div
            className={`relative order-1 aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] md:order-2 md:aspect-auto md:h-full md:min-h-0 ${
              containHeaderImage ? "flex items-center justify-center bg-[#0a0a0a]" : ""
            }`}
          >
            <Image
              src={category.image}
              alt={plainTextFromRich(category.name)}
              fill
              priority
              className={containHeaderImage ? "object-contain object-center" : "object-cover object-center"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="order-2 flex flex-col justify-end px-5 py-6 sm:px-8 sm:py-8 md:order-1 md:justify-center md:px-16 md:py-16">
            <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-white/45 uppercase sm:text-[11px] md:text-xs">
              Products / {plainTextFromRich(category.name)}
            </p>
            <h1
              id="category-title"
              className="m-0 mt-3 text-[clamp(1.75rem,7vw,5.5rem)] leading-[0.95] font-light tracking-[-0.04em] uppercase sm:mt-4 md:mt-5"
            >
              <FormattedText html={category.name} />
            </h1>
            <p className="m-0 mt-3 max-w-[560px] text-sm leading-6 text-white/65 sm:mt-4 sm:text-base sm:leading-7 md:mt-6 md:text-lg md:leading-8">
              <FormattedText html={category.description} />
            </p>
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 border-b border-[#dedede] px-5 py-3 text-xs sm:px-8 sm:py-4 md:px-16">
          <span>
            {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
          </span>
          <Link href="/products" className="shrink-0 text-black no-underline">
            View all products
          </Link>
        </div>

        {categoryProducts.length ? (
          <ProductGrid
            items={categoryProducts}
            categories={catalog.categories}
            whatsappNumber={settings.whatsappNumber}
          />
        ) : (
          <section className="px-5 py-16 text-center sm:px-8 sm:py-20 md:px-16 md:py-28">
            <p className="m-0 text-xl font-light sm:text-2xl">Made around your brief.</p>
            <p className="mx-auto mt-4 max-w-[520px] text-xs leading-5 text-black/50">
              This category is produced to specification. Share your quantity, timeline, and branding requirements for a curated proposal.
            </p>
            <a
              href={collectionWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center bg-black px-7 text-xs font-bold text-white uppercase no-underline"
            >
              Request a collection
            </a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

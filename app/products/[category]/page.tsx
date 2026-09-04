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
    ? "grid h-[62vh] min-h-[520px] max-h-[820px] grid-rows-[auto_1fr] overflow-hidden border-b border-black/20 bg-[#0a0a0a] text-white md:grid-cols-[1fr_1.05fr] md:grid-rows-1"
    : "grid h-[52vh] min-h-[420px] max-h-[680px] grid-rows-[auto_1fr] overflow-hidden border-b border-black/20 bg-[#0a0a0a] text-white md:grid-cols-[1fr_1.05fr] md:grid-rows-1";
  const collectionWhatsApp = buildWhatsAppUrl(
    settings.whatsappNumber,
    `Hi The Unboxing,\n\nI'd like a curated proposal for the ${plainTextFromRich(category.name)} collection.\n\nPlease share options, MOQ and timeline.`,
  );

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className={headerClassName} aria-labelledby="category-title">
          <div className="flex flex-col justify-center px-8 py-10 md:px-16 md:py-16">
            <p className="m-0 text-[11px] font-bold tracking-[0.14em] text-white/45 uppercase md:text-xs">Products / {category.name}</p>
            <h1 id="category-title" className="m-0 mt-5 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-light tracking-[-0.04em] uppercase">
              <FormattedText html={category.name} />
            </h1>
            <p className="m-0 mt-6 max-w-[560px] text-base leading-7 text-white/65 md:text-lg md:leading-8">
              <FormattedText html={category.description} />
            </p>
          </div>
          <div className={`relative h-full ${tallHeader ? "min-h-[360px]" : "min-h-[280px]"} md:min-h-0 ${containHeaderImage ? "flex items-center justify-center" : ""}`}>
            <Image
              src={category.image}
              alt={plainTextFromRich(category.name)}
              fill
              priority
              className={containHeaderImage ? "object-contain object-center" : "object-cover object-center"}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        <div className="flex items-center justify-between border-b border-[#dedede] px-8 py-4 text-xs md:px-16">
          <span>{categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}</span>
          <Link href="/products" className="text-black no-underline">View all products</Link>
        </div>

        {categoryProducts.length ? (
          <ProductGrid
            items={categoryProducts}
            categories={catalog.categories}
            whatsappNumber={settings.whatsappNumber}
          />
        ) : (
          <section className="px-8 py-20 text-center md:px-16 md:py-28">
            <p className="m-0 text-2xl font-light">Made around your brief.</p>
            <p className="mx-auto mt-4 max-w-[520px] text-xs leading-5 text-black/50">This category is produced to specification. Share your quantity, timeline, and branding requirements for a curated proposal.</p>
            <a href={collectionWhatsApp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-11 items-center bg-black px-7 text-xs font-bold text-white no-underline uppercase">Request a collection</a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

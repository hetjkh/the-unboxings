import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import StartProjectForm from "../../../components/StartProjectForm";
import FormattedText from "../../../components/FormattedText";
import CmsImage from "../../../components/CmsImage";
import { getCatalog, getProductById } from "@/lib/cms/queries";
import { plainTextFromRich } from "@/lib/cms/rich-text";

export const revalidate = 60;

type ProductPageParams = {
  category: string;
  productId: string[];
};

function resolveProductId(segments: string[]): string {
  return segments.join("/");
}

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.products.map((product) => ({
    category: product.categorySlug,
    productId: product._id.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductPageParams>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(resolveProductId(productId));
  if (!product) return { title: "Product | The Unboxing" };
  return {
    title: `${plainTextFromRich(product.name)} | The Unboxing`,
    description: plainTextFromRich(product.description),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<ProductPageParams>;
}) {
  const { category: categorySlug, productId } = await params;
  const product = await getProductById(resolveProductId(productId));
  if (!product || product.categorySlug !== categorySlug) notFound();

  const catalog = await getCatalog();
  const category = catalog.categories.find((item) => item.slug === product.categorySlug);
  const name = plainTextFromRich(product.name);
  const categoryName = plainTextFromRich(category?.name ?? "Products");
  const categoryProducts = catalog.products.filter((item) => item.categorySlug === product.categorySlug);
  const productIndex = categoryProducts.findIndex((item) => item._id === product._id);
  const formVariant =
    product.categorySlug === "events-activations" && productIndex >= 0 && productIndex < 16
      ? "activation"
      : "default";

  const related = [
    ...catalog.products.filter(
      (item) => item.categorySlug === product.categorySlug && item._id !== product._id,
    ),
    ...catalog.products.filter(
      (item) => item.categorySlug !== product.categorySlug && item._id !== product._id,
    ),
  ].slice(0, 8);

  return (
    <>
      <Header />
      <main className="bg-white">
        <section
          id="start-project"
          aria-labelledby="product-heading"
          className="scroll-mt-18 border-b border-black/15"
        >
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            <div className="lg:sticky lg:top-[var(--header-height)] lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-square">
                <CmsImage
                  src={product.image}
                  alt={name}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="px-5 pb-8 pt-3 sm:px-6 sm:pb-10 md:px-8">
                <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">
                  <Link
                    href={`/products/${product.categorySlug}`}
                    className="text-inherit no-underline hover:text-black"
                  >
                    Products / {categoryName}
                  </Link>
                </p>
                <h1
                  id="product-heading"
                  className="m-0 mt-3 text-[clamp(1.6rem,3.8vw,3rem)] leading-[0.95] font-light tracking-[-0.04em] uppercase"
                >
                  <FormattedText html={product.name} />
                </h1>
                <p className="m-0 mt-4 max-w-[520px] text-sm leading-6 text-black/60">
                  <FormattedText html={product.description} />
                </p>
                <p className="m-0 mt-4 text-sm italic text-black/45">Pricing on request</p>
              </div>
            </div>

            <div className="flex flex-col bg-[#f1f0ec] px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16">
              <div>
                <span className="text-[10px] font-medium tracking-[0.2em] text-black/40">
                  01 / PROJECT BRIEF
                </span>
                <h2 className="m-0 mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[0.95] font-light tracking-[-0.05em] uppercase">
                  Start Your Project
                </h2>
                <p className="m-0 mt-4 max-w-[420px] text-sm leading-6 text-black/55">
                  Tell us how you&apos;d like to use this piece. We&apos;ll turn it into a considered creative direction.
                </p>
              </div>

              <div className="mt-10">
                <StartProjectForm
                  productName={name}
                  productCategory={categoryName}
                  formVariant={formVariant}
                />
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section
            aria-labelledby="more-products-heading"
            className="bg-white px-5 py-14 sm:px-8 md:px-16 md:py-20"
          >
            <div className="mx-auto max-w-[1440px]">
              <header className="flex flex-wrap items-end justify-between gap-4 border-b border-black/15 pb-6">
                <div>
                  <p className="m-0 text-[10px] font-medium tracking-[0.2em] text-black/40 uppercase">
                    Continue exploring
                  </p>
                  <h2
                    id="more-products-heading"
                    className="m-0 mt-3 text-[clamp(1.75rem,4vw,3rem)] leading-[0.95] font-light tracking-[-0.04em] uppercase"
                  >
                    More to discover
                  </h2>
                </div>
                <Link
                  href={`/products/${product.categorySlug}`}
                  className="text-[11px] font-bold tracking-[0.06em] text-black uppercase no-underline"
                >
                  View collection →
                </Link>
              </header>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
                {related.map((item) => {
                  const itemName = plainTextFromRich(item.name);
                  const href = `/products/${item.categorySlug}/${item._id}`;
                  return (
                    <Link
                      key={item._id}
                      href={href}
                      className="group block text-black no-underline"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <CmsImage
                          src={item.image}
                          alt={itemName}
                          fill
                          className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="m-0 mt-3 line-clamp-2 text-[11px] leading-4 font-normal tracking-[-0.01em] sm:text-xs sm:leading-5">
                        <FormattedText html={item.name} />
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

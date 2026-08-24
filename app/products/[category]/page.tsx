import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductGrid from "../../components/ProductGrid";
import { getCategory, productCategories, products } from "../../data/products";

export function generateStaticParams() {
  return productCategories.filter((category) => category.slug !== "travel-collection").map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = getCategory((await params).category);
  return category ? { title: `${category.name} | The Unboxing`, description: category.description } : {};
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = getCategory((await params).category);
  if (!category || category.slug === "travel-collection") notFound();
  const categoryProducts = products.filter((product) => product.category === category.slug);
  const extraImage = categoryProducts.find((product) => product.image !== category.image) ?? categoryProducts[0];
  const headerImages = extraImage
    ? [
        { src: category.image, alt: category.name },
        { src: extraImage.image, alt: extraImage.name },
      ]
    : [{ src: category.image, alt: category.name }];

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="grid h-[52vh] min-h-[380px] max-h-[620px] grid-rows-[auto_1fr] overflow-hidden border-b border-[#dedede] bg-white md:grid-cols-[1fr_1.15fr] md:grid-rows-1" aria-labelledby="category-title">
          <div className="flex flex-col justify-center px-8 py-8 md:px-16 md:py-16">
            <p className="m-0 text-xs font-bold tracking-[0.1em] text-black/40 uppercase">Products / {category.name}</p>
            <h1 id="category-title" className="m-0 mt-5 text-4xl leading-[1.05] font-light tracking-[-0.03em] md:text-6xl lg:text-7xl">{category.name}</h1>
            <p className="m-0 mt-6 max-w-[520px] text-sm leading-6 text-black/60 md:text-base md:leading-7">{category.description}</p>
          </div>
          <div className="flex h-full min-h-0">
            {headerImages.map((image, index) => (
              <div key={image.src} className="relative min-h-0 flex-1">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  className={`object-contain ${headerImages.length > 1 ? (index === 0 ? "object-right" : "object-left") : "object-center"}`}
                  sizes="(max-width: 768px) 50vw, 32vw"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between border-b border-[#dedede] px-8 py-4 text-xs md:px-16">
          <span>{categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}</span>
          <Link href="/products" className="text-black no-underline">View all products</Link>
        </div>

        {categoryProducts.length ? (
          <ProductGrid items={categoryProducts} />
        ) : (
          <section className="px-8 py-20 text-center md:px-16 md:py-28">
            <p className="m-0 text-2xl font-light">Made around your brief.</p>
            <p className="mx-auto mt-4 max-w-[520px] text-xs leading-5 text-black/50">This category is produced to specification. Share your quantity, timeline, and branding requirements for a curated proposal.</p>
            <a href="/contact-us#start-project" className="mt-7 inline-flex h-11 items-center bg-black px-7 text-xs font-bold text-white no-underline uppercase">Request a collection</a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

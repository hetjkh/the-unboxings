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

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="grid border-b border-[#dedede] md:grid-cols-[0.7fr_1.3fr]" aria-labelledby="category-title">
          <div className="px-8 py-10 md:px-16 md:py-14">
            <p className="m-0 text-[10px] font-bold tracking-[0.08em] text-black/40 uppercase">Products / Category</p>
            <h1 id="category-title" className="m-0 mt-3 text-3xl leading-tight font-light md:text-5xl">{category.name}</h1>
            <p className="m-0 mt-5 max-w-[430px] text-xs leading-5 text-black/55">{category.description}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef] md:aspect-auto md:min-h-[430px]">
            <Image src={category.image} alt={category.name} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 65vw" />
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

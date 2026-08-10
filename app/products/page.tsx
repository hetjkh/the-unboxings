import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4H14" stroke="currentColor" strokeWidth="1" />
      <path d="M4 8H14" stroke="currentColor" strokeWidth="1" />
      <path d="M6 12H14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4H14M4 8H14M6 12H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="3" cy="4" r="1.5" fill="currentColor" />
      <circle cx="5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="All Products" className="bg-white">
          <div className="px-8 pt-10 pb-6 md:px-16">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                All Products
              </h1>
              <span className="text-xs leading-4 font-normal text-black">
                {products.length} products
              </span>
            </div>
            <p className="m-0 mt-2 text-xs leading-5 text-black/50">
              Browse our full range of customizable corporate gifting products and contact our team for a tailored proposal.
            </p>
          </div>

          <div className="border-t border-[#e5e5e5] px-8 py-4 md:px-16">
            <div className="flex items-center justify-between text-xs leading-4 font-medium text-black">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs leading-4 font-medium text-black"
              >
                <SortIcon />
                <span>Sort By: <span className="font-bold">Category</span></span>
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs leading-4 font-medium text-black"
              >
                <FilterIcon />
                Filters
              </button>
            </div>
          </div>

          <ProductGrid items={products} />
        </section>
      </main>
      <Footer />
    </>
  );
}

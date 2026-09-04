import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { getCatalog } from "@/lib/cms/queries";
import { getSiteSettings } from "@/lib/cms/site-settings";

export const revalidate = 60;

export default async function ProductsPage() {
  const [catalog, settings] = await Promise.all([getCatalog(), getSiteSettings()]);

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
                {catalog.products.length} products
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
                <span>Sort By: <span className="font-bold">Category</span></span>
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs leading-4 font-medium text-black"
              >
                Filters
              </button>
            </div>
          </div>

          <ProductGrid
            items={catalog.products}
            categories={catalog.categories}
            whatsappNumber={settings.whatsappNumber}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

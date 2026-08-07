import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  { name: "Wireless Charging Pad", category: "Tech & Electronics", image: "/prodcuts/product1.png" },
  { name: "Premium Vacuum Bottle", category: "Drinkware", image: "/prodcuts/product2.png" },
  { name: "Leather Executive Notebook", category: "Office Essentials", image: "/prodcuts/product3.png" },
  { name: "Crystal Award Trophy", category: "Awards & Recognition", image: "/prodcuts/product4.png" },
  { name: "Branded Polo Shirt", category: "Apparel & Uniforms", image: "/prodcuts/product5.png" },
  { name: "Luxury Gift Box", category: "Packaging Solutions", image: "/prodcuts/product6.png" },
  { name: "Bamboo Desk Organizer", category: "Eco-Friendly Gifts", image: "/prodcuts/product7.png" },
  { name: "Premium Leather Wallet", category: "Executive Gifts", image: "/prodcuts/product8.png" },
  { name: "Travel Organizer Kit", category: "Travel Collection", image: "/prodcuts/product9.png" },
  { name: "Conference Tote Bag", category: "Promotional Merchandise", image: "/prodcuts/product10.png" },
  { name: "Marble Pen Holder", category: "Luxury Gifts", image: "/prodcuts/product11.png" },
  { name: "Employee Welcome Box", category: "Welcome Kits", image: "/prodcuts/product12.png" },
  { name: "Branded USB Drive", category: "Tech & Electronics", image: "/prodcuts/product13.png" },
  { name: "Ceramic Coffee Mug", category: "Drinkware", image: "/prodcuts/product14.png" },
  { name: "Cork Notebook", category: "Eco-Friendly Gifts", image: "/prodcuts/product15.png" },
  { name: "Gold Desk Nameplate", category: "Office Branding", image: "/prodcuts/product16.png" },
  { name: "Canvas Weekender Bag", category: "Travel Collection", image: "/prodcuts/product17.png" },
  { name: "Custom Gift Hamper", category: "Celebration Gifts", image: "/prodcuts/product18.png" },
  { name: "Recycled Paper Journal", category: "Eco-Friendly Gifts", image: "/prodcuts/product19.png" },
  { name: "Desktop Wireless Speaker", category: "Tech & Electronics", image: "/prodcuts/product20.png" },
  { name: "Signature Pen Set", category: "Executive Gifts", image: "/prodcuts/product21.png" },
];

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

          <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.name} className="flex flex-col bg-white group">
                <div className="group relative block aspect-square w-full bg-[#f5f5f5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="px-4 pt-3 pb-4">
                  <p className="m-0 text-xs leading-4 font-normal text-black">{product.name}</p>
                  <p className="m-0 mt-1 text-[10px] leading-4 font-normal text-black/40 uppercase tracking-[0.04em]">{product.category}</p>
                  <p className="m-0 mt-1 text-xs leading-4 font-normal text-black/50 italic">Pricing on request</p>
                  <a
                    href="/contact-us"
                    className="mt-3 flex items-center gap-2 cursor-pointer border border-black bg-transparent px-3 py-2 text-[10px] font-bold leading-4 tracking-[0.04em] text-black uppercase w-full justify-center hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

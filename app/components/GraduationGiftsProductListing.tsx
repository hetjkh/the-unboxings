import Image from "next/image";

const products = [
  {
    image: "/prodcuts/product1.png",
    name: "Premium Leather Tote",
  },
  {
    image: "/prodcuts/product2.png",
    name: "Executive Hobo Bag",
  },
  {
    image: "/prodcuts/product3.png",
    name: "Corporate Welcome Gift",
  },
  {
    image: "/prodcuts/product4.png",
    name: "Branded Accessories Set",
  },
  {
    image: "/prodcuts/product5.png",
    name: "Executive Mini Gift Set",
  },
  {
    image: "/prodcuts/product6.png",
    name: "Premium Corporate Gift",
  },
];

const repeatedProducts = Array.from({ length: 4 }, (_, repeatIndex) =>
  products.map((product, productIndex) => ({
    ...product,
    id: `${repeatIndex}-${productIndex}`,
  })),
).flat();

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
      <path
        d="M2 4H14M4 8H14M6 12H14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="3" cy="4" r="1.5" fill="currentColor" />
      <circle cx="5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function GraduationGiftsProductListing() {
  return (
    <section aria-label="Corporate Gifts" className="bg-white">
      <div className="px-8 pt-10 pb-6 md:px-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
            Corporate Gifts
          </h1>
          <span className="text-xs leading-4 font-normal text-black">
            {repeatedProducts.length} items
          </span>
        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-4 md:px-16">
        <div className="flex items-center justify-between text-xs leading-4 font-medium text-black">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-xs leading-4 font-medium text-black"
          >
            <SortIcon />
            <span>
              Sort By: <span className="font-bold">Recommended</span>
            </span>
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
        {repeatedProducts.map((product) => (
          <article key={product.id} className="flex flex-col bg-white">
            <div className="group relative block aspect-square w-full bg-[#f5f5f5]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="px-4 pt-3 pb-4">
              <p className="m-0 text-xs leading-4 font-normal text-black">{product.name}</p>
              <p className="m-0 mt-1 text-[10px] leading-4 font-normal text-black/50 italic">Pricing on request</p>
              <a
                href="/contact-us"
                className="mt-3 flex items-center justify-center gap-2 w-full cursor-pointer border border-black bg-transparent px-3 py-2 text-[10px] font-bold leading-4 tracking-[0.04em] text-black uppercase hover:bg-black hover:text-white transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

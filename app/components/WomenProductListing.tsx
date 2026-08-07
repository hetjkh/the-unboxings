import Image from "next/image";

const products = [
  {
    image: "/prodcuts/product1.png",
    alt: "Gucci Melrose medium boston bag",
    name: "Gucci Melrose medium boston bag",
    price: "$2,000",
  },
  {
    image: "/prodcuts/product2.png",
    alt: "Printed stretch jersey bikini",
    name: "Printed stretch jersey bikini",
    price: "$850",
  },
  {
    image: "/prodcuts/product3.png",
    alt: "Women's platform slide sandal",
    name: "Women's platform slide sandal",
    price: "$790",
  },
  {
    image: "/prodcuts/product4.png",
    alt: "Crêpe jersey draped shorts",
    name: "Crêpe jersey draped shorts",
    price: "$750",
  },
  {
    image: "/prodcuts/product5.png",
    alt: "Straw bucket hat with web",
    name: "Straw bucket hat with web",
    price: "$590",
  },
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

export default function WomenProductListing() {
  return (
    <section aria-label="Gucci Summer Collection for Women" className="bg-white">
      <div className="px-8 pt-10 pb-6 md:px-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
            Gucci Summer Collection for Women
          </h1>
          <span className="text-xs leading-4 font-normal text-black">292 items</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-3 rounded-full border border-black bg-white px-4 py-2 text-xs leading-4 font-medium text-black"
          >
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#f5f5f5]">
              <Image
                src="/prodcuts/product1.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="32px"
              />
            </span>
            Women&apos;s
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-3 rounded-full border border-[#d4d4d4] bg-white px-4 py-2 text-xs leading-4 font-medium text-black"
          >
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#f5f5f5]">
              <Image
                src="/prodcuts/product2.png"
                alt=""
                fill
                className="object-cover object-center"
                sizes="32px"
              />
            </span>
            Men&apos;s
          </button>
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
        {products.map((product) => (
          <article key={product.name} className="flex flex-col bg-white">
            <a
              href="#"
              className="group relative block aspect-square w-full bg-white no-underline"
            >
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </a>
            <div className="px-4 pt-3 pb-4">
              <p className="m-0 text-xs leading-4 font-normal text-black">{product.name}</p>
              <p className="m-0 mt-1 text-xs leading-4 font-bold text-black">{product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

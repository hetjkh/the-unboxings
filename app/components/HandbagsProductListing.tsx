import Image from "next/image";

const products = [
  {
    image: "/prodcuts/product1.png",
    name: "Flora medium hobo bag",
    price: "$2,500",
  },
  {
    image: "/prodcuts/product2.png",
    name: "Flora print hobo bag",
    price: "$2,500",
  },
  {
    image: "/prodcuts/product3.png",
    name: "Ophidia small shoulder bag",
    price: "$1,290",
  },
  {
    image: "/prodcuts/product4.png",
    name: "Gucci Giglio medium tote",
    price: "$2,200",
  },
  {
    image: "/prodcuts/product5.png",
    name: "Gucci Melrose medium boston bag",
    price: "$2,000",
  },
  {
    image: "/prodcuts/product6.png",
    name: "Ophidia small bucket bag",
    price: "$1,350",
  },
  {
    image: "/prodcuts/product7.png",
    name: "GG Supreme medium tote",
    price: "$1,890",
  },
  {
    image: "/prodcuts/product8.png",
    name: "Ophidia mini hobo bag",
    price: "$1,190",
  },
  {
    image: "/prodcuts/product1.png",
    name: "GG Supreme large tote",
    price: "$2,100",
  },
  {
    image: "/prodcuts/product2.png",
    name: "Ophidia hobo with pouch",
    price: "$1,650",
  },
  {
    image: "/prodcuts/product3.png",
    name: "Ophidia small baguette bag",
    price: "$1,100",
  },
  {
    image: "/prodcuts/product4.png",
    name: "GG Marmont mini shoulder bag",
    price: "$1,450",
  },
  {
    image: "/prodcuts/product5.png",
    name: "Ophidia trapeze shoulder bag",
    price: "$980",
  },
  {
    image: "/prodcuts/product6.png",
    name: "GG Supreme boston bag",
    price: "$1,750",
  },
  {
    image: "/prodcuts/product7.png",
    name: "Ophidia medium hobo bag",
    price: "$1,550",
  },
  {
    image: "/prodcuts/product8.png",
    name: "GG Supreme open tote",
    price: "$1,980",
  },
  {
    image: "/prodcuts/product1.png",
    name: "Ophidia ring-handle tote",
    price: "$2,050",
  },
  {
    image: "/prodcuts/product2.png",
    name: "GG Supreme shoulder bag",
    price: "$1,420",
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

export default function HandbagsProductListing() {
  return (
    <section aria-label="Handbags" className="bg-white">
      <div className="px-8 pt-10 pb-6 md:px-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
            Handbags
          </h1>
          <span className="text-xs leading-4 font-normal text-black">
            {products.length} items
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
        {products.map((product) => (
          <article key={product.image} className="flex flex-col bg-white">
            <a
              href="#"
              className="group relative block aspect-square w-full bg-white no-underline"
            >
              <Image
                src={product.image}
                alt={product.name}
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

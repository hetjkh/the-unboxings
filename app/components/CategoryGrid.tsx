import Image from "next/image";

const categories = [
  {
    title: "Employee Experience",
    image: "/experience1.png",
    href: "/solutions",
  },
  {
    title: "Client Experience",
    image: "/experience2.png",
    href: "/solutions",
  },
  {
    title: "Brand Experience",
    image: "/experience3.png",
    href: "/branding-services",
  },
  {
    title: "Event Experience",
    image: "/experience4.png",
    href: "/solutions",
  },
];

export default function CategoryGrid() {
  return (
    <section aria-label="Experience solutions" className="w-full bg-white">
      <h2 className="m-0 px-8 pt-14 pb-10 text-center text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase md:px-16">
        Experience Solutions
      </h2>
      <p className="mx-auto -mt-5 max-w-[720px] px-8 pb-10 text-center text-xs leading-5 text-black/60 md:px-16">
        Designed around the people, moments and outcomes that matter to your brand.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category.title}
            href={category.href}
            className="group flex flex-col no-underline"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#ececec]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <span className="flex items-center justify-center py-3 text-center text-xs leading-4 font-medium tracking-[-0.36px] text-black">
              {category.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

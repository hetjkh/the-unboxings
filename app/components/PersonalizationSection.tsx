import Image from "next/image";

export default function PersonalizationSection() {
  return (
    <section aria-label="Personalization" className="border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto w-full max-w-[720px] px-8 py-16 text-center md:px-16 md:py-20">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
          Personalization
        </h2>

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[560px] overflow-hidden">
          <Image
            src="/card2.jpg"
            alt="Gucci personalization"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>

        <p className="m-0 mx-auto mt-10 max-w-[520px] text-base leading-6 font-normal text-black">
          Emboss select bags, luggage, belts and leather accessories with initials to create
          a truly unique present.
        </p>
        <a
          href="#"
          className="mt-6 inline-block text-base leading-6 font-medium text-black underline underline-offset-2"
        >
          Discover The Collection
        </a>
      </div>
    </section>
  );
}

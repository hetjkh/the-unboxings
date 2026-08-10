import Image from "next/image";

export default function MadeInItalySection() {
  return (
    <section aria-label="Crafted with intention" className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex min-h-[500px] flex-col justify-between px-8 py-16 md:min-h-[720px] md:px-16 md:py-20">
          <div>
            <p className="m-0 text-[10px] leading-4 font-bold tracking-[0.08em] text-black/40 uppercase">
              Made to be remembered
            </p>
            <h2 className="m-0 mt-4 text-3xl leading-9 font-bold tracking-[-0.04em] text-black uppercase md:text-5xl md:leading-[1.08]">
              Crafted with Intention
            </h2>
            <p className="m-0 mt-6 max-w-[470px] text-sm leading-6 text-black/70 md:text-base">
              We work with specialist makers who understand that exceptional objects are built slowly—from the first material choice to the final hand-finished detail.
            </p>
          </div>
          <div className="mt-12 border-t border-[#e5e5e5] pt-5">
            <p className="m-0 max-w-[470px] text-xs leading-5 text-black/60">
              Precision, material knowledge and quiet craftsmanship give every brand experience a feeling that lasts beyond the first impression.
            </p>
            <a href="/contact-us#start-project" className="mt-6 inline-flex h-12 items-center justify-center bg-black px-8 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline">
              Start Your Project
            </a>
          </div>
        </div>
        <div data-motion-media className="relative min-h-[500px] overflow-hidden md:min-h-[720px]">
          <Image
            src="/made-in-italy-workshop.webp"
            alt="Artisans hand-finishing a premium presentation object"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMotion from "../components/HomeMotion";

export const metadata: Metadata = {
  title: "Material Library | The Unboxing",
  description: "Explore the materials, finishes and product applications available for custom brand experiences.",
};

const materials = [
  {
    name: "Acrylic",
    image: "/materials/tiles/acrylic.png",
    products: "Awards · Desk Objects · Display Pieces · Sculptures · Presentation Pieces · Branded Installations",
    description:
      "Light, precise and highly adaptable, acrylic brings clarity and architectural definition to bespoke objects.",
  },
  {
    name: "Wood",
    image: "/materials/tiles/wood.png",
    products: "Presentation Boxes · Desk Objects · Awards · Display Pieces · Executive Sets",
    description:
      "Natural grain, rich texture and crafted joinery bring warmth, character and permanence to every piece.",
  },
  {
    name: "Leather",
    image: "/materials/tiles/leather.png",
    products: "Executive Portfolios · Travel Accessories · Desk Accessories · Presentation Cases",
    description:
      "Rich texture, natural character and a tactile finish that becomes more distinctive with use.",
  },
  {
    name: "Marble",
    image: "/materials/tiles/marble.png",
    products: "Desk Objects · Presentation Bases · Awards · Key Trays · Executive Gifts",
    description:
      "Natural veining, substantial weight and a timeless finish give every piece a distinctive sense of permanence.",
  },
  {
    name: "Brass",
    image: "/materials/tiles/brass.png",
    products: "Plaques · Awards · Desk Objects · Hardware · Decorative Accents · Presentation Pieces",
    description:
      "Warm, substantial and enduring, brass brings refined contrast and a distinctive sense of craftsmanship to every piece.",
  },
  {
    name: "Steel",
    image: "/materials/tiles/steel.png",
    products: "Drinkware · Desk Accessories · Tech Accessories · Travel Accessories · Executive Gifts",
    description:
      "Clean, durable and precisely finished, stainless steel brings a contemporary character to functional objects.",
  },
  {
    name: "Crystal",
    image: "/materials/tiles/crystal.png",
    products: "Awards · Recognition Pieces · Commemorative Objects · Architectural Keepsakes · Executive Gifts",
    description:
      "Optical clarity, sculptural form and the play of light give crystal an unmistakable sense of distinction.",
  },
  {
    name: "Resin",
    image: "/materials/tiles/resin.png",
    products: "Sculptures · Awards · Desk Objects · Commemorative Pieces · Decorative Inserts · Bespoke Collectibles",
    description:
      "Colour, translucency and embedded elements allow resin to transform ideas, textures and stories into distinctive sculptural forms.",
  },
  {
    name: "Fabric",
    image: "/materials/tiles/fabric.png",
    products: "Pouches · Gift Packaging · Travel Accessories · Presentation Linings · Sleeves · Executive Sets",
    description:
      "Texture, softness and depth bring warmth and tactile character to presentation, packaging and everyday objects.",
  },
  {
    name: "Glass",
    image: "/materials/tiles/glass.png",
    products: "Drinkware · Awards · Desk Objects · Decorative Pieces · Presentation Objects · Executive Gifts",
    description:
      "Clarity, reflection and sculptural form give glass a refined presence that feels both contemporary and timeless.",
  },
  {
    name: "Concrete",
    image: "/materials/tiles/concrete.png",
    products: "Awards · Desk Objects · Sculptures · Architectural Keepsakes · Bases · Branded Objects",
    description:
      "Raw texture, sculptural form and substantial weight give concrete a distinctive architectural presence.",
  },
  {
    name: "Recycled",
    image: "/materials/tiles/recycled.png",
    products: "Packaging · Notebooks · Desk Accessories · Presentation Pieces · Event Gifts · Branded Objects",
    description:
      "Reclaimed fibres and recycled composites transform existing materials into distinctive objects with a more considered material story.",
  },
] as const;

export default function MaterialsPage() {
  return (
    <>
      <Header />
      <main>
        <HomeMotion>
          <section aria-labelledby="materials-heading" className="bg-[#0a0a0a] px-8 py-16 text-white md:px-16 md:py-24">
            <div className="mx-auto max-w-[1440px] border-t border-white/25 pt-7">
              <p className="m-0 text-[10px] font-medium tracking-[0.22em] text-white/40 uppercase">Material Exploration</p>
              <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <h1 id="materials-heading" className="m-0 text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] font-light tracking-[-0.07em] uppercase">Material<br />Library</h1>
                <div className="border-t border-white/25 pt-6">
                  <p className="m-0 text-xl leading-7 font-light">Every material tells a different story.</p>
                  <p className="m-0 mt-4 max-w-[520px] text-sm leading-6 text-white/50">Explore texture, weight, finish and character—and discover the materials that bring your brand to life.</p>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="materials-directory-heading" className="bg-[#f1f0ec] px-8 py-16 text-black md:px-16 md:py-24">
            <div className="mx-auto max-w-[1440px]">
              <header className="flex items-end justify-between border-t border-black pt-7">
                <div>
                  <p className="m-0 text-[10px] font-medium tracking-[0.18em] text-black/40 uppercase">Explore the collection</p>
                  <h2 id="materials-directory-heading" className="m-0 mt-4 text-3xl font-light tracking-[-0.045em] uppercase md:text-5xl">Materials and applications</h2>
                </div>
                <span className="hidden text-xs text-black/40 sm:block">12 materials</span>
              </header>

              <div className="mt-12 grid border-t border-l border-black/20 sm:grid-cols-2 lg:grid-cols-3">
                {materials.map((material, index) => (
                  <article key={material.name} data-motion-card className="group border-r border-b border-black/20 bg-white">
                    <div data-motion-media className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                      <Image src={material.image} alt={`${material.name} samples and finished product applications`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                      <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.14em] text-white/70">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex min-h-[280px] flex-col p-6 md:min-h-[300px] md:p-7">
                      <h3 className="m-0 text-lg font-medium uppercase">{material.name}</h3>
                      <p className="m-0 mt-3 text-xs leading-5 text-black/50">{material.description}</p>
                      <div className="mt-auto border-t border-black/15 pt-5">
                        <p className="m-0 text-[9px] font-bold tracking-[0.12em] text-black/35 uppercase">Applications</p>
                        <p className="m-0 mt-2 text-xs leading-5">{material.products}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid bg-[#cbd8d4] text-black md:grid-cols-[1.4fr_0.6fr]" aria-labelledby="materials-cta-heading">
            <div className="px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-bold tracking-[0.1em] text-black/50 uppercase">Your material story</p>
              <h2 id="materials-cta-heading" className="m-0 mt-4 max-w-[780px] text-3xl leading-tight font-light tracking-[-0.04em] md:text-5xl">Let the right material give your idea weight, texture and meaning.</h2>
            </div>
            <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
              <a href="/contact-us#start-project" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black uppercase no-underline">Discuss your project <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </HomeMotion>
      </main>
      <Footer />
    </>
  );
}

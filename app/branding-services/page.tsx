import Header from "../components/Header";
import Footer from "../components/Footer";

const brandingMethods = [
  {
    title: "Laser Engraving",
    description:
      "Permanently etches your logo into metal, wood, leather, and glass surfaces. Precise, durable, and premium — ideal for executive gifts, awards, and tech accessories.",
    bestFor: "Metal, Wood, Leather, Glass",
    image: "/cat_executive.png",
  },
  {
    title: "UV Printing",
    description:
      "Full-color, photo-quality printing directly onto virtually any surface. Great for complex logos and gradients on hard surfaces.",
    bestFor: "Acrylic, Metal, Plastic, Glass",
    image: "/cat_tech.png",
  },
  {
    title: "Embroidery",
    description:
      "Classic, premium thread stitching for apparel and soft goods. Creates a high-quality, textured finish that signals professionalism.",
    bestFor: "Polo Shirts, Caps, Jackets, Bags",
    image: "/cat_apparel.png",
  },
  {
    title: "Screen Printing",
    description:
      "Cost-effective for large quantities. Vibrant solid colors on flat surfaces — the standard for mass promotional merchandise.",
    bestFor: "T-Shirts, Tote Bags, Caps",
    image: "/cat_promo.png",
  },
  {
    title: "Foil Stamping",
    description:
      "Gold, silver, or colored metallic foil applied under heat. Creates an elegant, luxury finish for notebooks, boxes, and cards.",
    bestFor: "Notebooks, Gift Boxes, Stationery",
    image: "/cat_office.png",
  },
  {
    title: "Debossing",
    description:
      "Pressed indentation of your logo into leather or paper. A subtle, sophisticated branding method for premium products.",
    bestFor: "Leather Goods, Notebooks, Packaging",
    image: "/cat_luxury.png",
  },
  {
    title: "DTF Printing",
    description:
      "Direct-to-film printing transfers full-color designs onto fabric with photographic accuracy. Perfect for complex artwork on apparel.",
    bestFor: "T-Shirts, Hoodies, Bags",
    image: "/cat_apparel.png",
  },
  {
    title: "Sublimation",
    description:
      "Heat-transfer process that bonds ink into polyester fabric or coated surfaces. Brilliant colors that won't crack or fade.",
    bestFor: "Mugs, Bottles, Polyester Apparel",
    image: "/cat_drinkware.png",
  },
  {
    title: "Custom Packaging",
    description:
      "From design to production — rigid boxes, magnetic closures, custom inserts, tissue paper, ribbons, and personalized cards for a complete unboxing experience.",
    bestFor: "All Products",
    image: "/cat_packaging.png",
  },
];

export default function BrandingServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Custom Branding Services" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Custom Branding Services
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              We don&apos;t just sell products — we bring your brand to life. Our in-house and partner
              branding capabilities ensure every item is a perfect ambassador for your company.
            </p>
          </div>

          <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
            <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
              {brandingMethods.map((method) => (
                <article key={method.title} className="flex h-full flex-col border border-[#e5e5e5]">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
                    <img
                      src={method.image}
                      alt={method.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                      {method.title}
                    </h2>
                    <p className="m-0 mt-3 flex-1 text-xs leading-5 font-normal text-black/70">
                      {method.description}
                    </p>
                    <p className="m-0 mt-4 text-[10px] font-bold leading-4 tracking-[0.06em] text-black/40 uppercase">
                      Best for: {method.bestFor}
                    </p>
                    <a
                      href="/contact-us"
                      className="mt-4 shrink-0 text-xs leading-4 font-medium text-black underline underline-offset-2"
                    >
                      Contact Us
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

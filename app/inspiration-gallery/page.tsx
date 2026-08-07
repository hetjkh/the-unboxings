import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const galleryItems = [
  {
    title: "Executive Welcome Kit",
    description: "Luxury rigid box with branded laptop bag, notebook, bottle, and gold-foil welcome card.",
    image: "/cat_welcome.png",
    tags: ["Welcome Kit", "HR"],
  },
  {
    title: "Luxury CEO Gift Set",
    description: "Crystal award, leather portfolio, gold pen, and marble desk accessory in a premium magnetic box.",
    image: "/cat_executive.png",
    tags: ["Executive", "VIP"],
  },
  {
    title: "Real Estate Handover Box",
    description: "Key presentation in a marble tray, champagne flutes, custom copper card, and luxury candle.",
    image: "/cat_packaging.png",
    tags: ["Real Estate", "Luxury"],
  },
  {
    title: "Conference Tech Kit",
    description: "Wireless charger, earbuds, power bank, and USB drive in a branded rigid box.",
    image: "/cat_tech.png",
    tags: ["Tech", "Events"],
  },
  {
    title: "Eco Sustainability Kit",
    description: "Bamboo notebook, cork pen, seed paper card, and RPET tote bag — all naturally branded.",
    image: "/cat_eco.png",
    tags: ["Eco", "CSR"],
  },
  {
    title: "Ramadan Hamper",
    description: "Premium dates, Arabic coffee set, oud candle, and crystal gifting accessories for the Holy Month.",
    image: "/cat_luxury.png",
    tags: ["Ramadan", "Seasonal"],
  },
  {
    title: "Wellness Gift Box",
    description: "Aromatherapy diffuser, bamboo products, reusable bottle, and wellness journal.",
    image: "/cat_eco.png",
    tags: ["Wellness", "HR"],
  },
  {
    title: "Travel Kit",
    description: "Passport holder, luggage tag, travel wallet, power bank, and neck pillow in a branded pouch.",
    image: "/cat_travel.png",
    tags: ["Travel", "Executive"],
  },
  {
    title: "Awards Night Collection",
    description: "Crystal trophies, acrylic plaques, and engraved glass awards with personalized certificates.",
    image: "/cat_awards.png",
    tags: ["Awards", "Recognition"],
  },
  {
    title: "Branded Apparel Kit",
    description: "Custom polo, cap, and jacket in a branded garment box — perfect for new team members.",
    image: "/cat_apparel.png",
    tags: ["Apparel", "Onboarding"],
  },
  {
    title: "Coffee Experience Kit",
    description: "Premium travel tumbler, ceramic mug, specialty coffee sachets, and a personalized card.",
    image: "/cat_drinkware.png",
    tags: ["Drinkware", "Gifting"],
  },
  {
    title: "Dealer Meet Kit",
    description: "Conference folder, branded pen, USB drive, lanyard, and event badge in a premium tote.",
    image: "/cat_promo.png",
    tags: ["Events", "Automotive"],
  },
];

export default function InspirationGalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-label="Inspiration Gallery" className="bg-white">
          <div className="px-8 pt-14 pb-10 text-center md:px-16">
            <h1 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
              Inspiration Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-[720px] text-base leading-6 font-normal text-black">
              Browse complete branded concepts. Every collection here is a curated experience
              that can be fully customized for your brand, occasion, and budget.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <a
                key={item.title}
                href="/contact-us"
                className="group flex flex-col no-underline"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#f5f5f5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <span className="inline-flex h-9 items-center justify-center bg-white px-4 text-[10px] font-bold tracking-normal text-black uppercase">
                      Request This
                    </span>
                  </div>
                </div>
                <div className="py-3 px-2">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-bold tracking-[0.08em] uppercase text-black/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs leading-4 font-medium tracking-[-0.36px] text-black">
                    {item.title}
                  </span>
                  <p className="m-0 mt-1 text-[10px] leading-4 text-black/50 hidden md:block">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="border-t border-[#e5e5e5] px-8 py-14 text-center md:px-16">
            <p className="m-0 text-base leading-6 font-normal text-black">
              Ready to create your own branded experience?
            </p>
            <a
              href="/contact-us"
              className="mt-6 inline-flex h-12 items-center justify-center bg-black px-10 text-xs font-bold tracking-[0.04em] text-white uppercase no-underline"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

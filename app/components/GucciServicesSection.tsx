import Image from "next/image";

const services = [
  {
    title: "Architectural Materials",
    description:
      "Acrylic, wood, marble, brass and steel are selected for their structural presence and tactile character.",
    linkText: "Explore Our Process",
    href: "/branding-services",
    image: "/material-fabrication.png",
  },
  {
    title: "Tactile Finishes",
    description:
      "Leather, fabric, glass and crystal bring weight, softness and clarity to an experience worth holding onto.",
    linkText: "View Brand Stories",
    href: "#brand-stories",
    image: "/experience-client.png",
  },
  {
    title: "Future-Minded Choices",
    description:
      "Resin, concrete and recycled materials allow us to balance expressive design with responsible production.",
    linkText: "Start Your Project",
    href: "/contact-us#start-project",
    image: "/brand-story-homeowners.png",
  },
];

export default function GucciServicesSection() {
  return (
    <section aria-label="Material library" className="bg-white">
      <div className="px-8 pt-14 pb-4 text-center md:px-16">
        <h2 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
          Material Library
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-xs leading-5 font-normal text-black/60">
          Every material carries a message. We match surface, weight and finish to the story your brand needs to tell.
        </p>
      </div>

      {/* Feature bullets */}
      <div className="mx-auto max-w-[1440px] px-8 pb-10 md:px-16">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-6">
          {[
            "Acrylic", "Wood", "Leather", "Marble", "Brass", "Steel", "Crystal", "Resin", "Fabric", "Glass", "Concrete", "Recycled Materials",
          ].map((f) => (
            <span key={f} className="flex items-center gap-2 text-xs leading-5 text-black">
              <span aria-hidden="true" className="text-black font-bold">✓</span>
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="flex h-full flex-col">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <div className="flex flex-1 flex-col items-center pt-4 text-center">
                <h3 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                  {service.title}
                </h3>
                <p className="m-0 mt-4 flex-1 max-w-[360px] text-base leading-6 font-normal text-black">
                  {service.description}
                </p>
                <a
                  href={service.href}
                  className="mt-4 shrink-0 text-base leading-6 font-medium text-black underline underline-offset-2"
                >
                  {service.linkText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

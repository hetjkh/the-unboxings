import Image from "next/image";

const orderTopics = [
  {
    image: "/card1.avif",
    alt: "Order tracking on mobile",
    title: "Order & Return Tracking",
    description:
      "Once your order is on its way, we will send you a tracking number by email. If you have registered for a MY GUCCI account, you can sign in for delivery updates online or in the App.",
    links: [{ label: "Discover How", href: "#" }],
  },
  {
    image: "/card2.jpg",
    alt: "Gucci gift boxes",
    title: "Complimentary Shipping & Returns",
    description:
      "Enjoy shipping in 1-2 business days, extended returns for holidays season and streamlined exchanges with no extra cost.",
    links: [
      { label: "Complimentary Shipping", href: "#" },
      { label: "Complimentary Exchanges & Returns", href: "#" },
    ],
  },
  {
    image: "/card3.avif",
    alt: "Gucci handbag",
    title: "Product Care",
    description:
      "Discover how to properly care for your beloved Gucci products or how to request a repair.",
    links: [
      { label: "Bag Care", href: "#" },
      { label: "Shoe Care", href: "#" },
    ],
  },
];

export default function OrdersAboutSection() {
  return (
    <section aria-label="All About Your Orders" className="border-t border-[#e5e5e5] bg-white">
      <h2 className="m-0 px-8 pt-14 pb-10 text-center text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase md:px-16">
        All About Your Orders
      </h2>

      <div className="mx-auto max-w-[1440px] px-8 pb-14 md:px-16">
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
          {orderTopics.map((topic) => (
            <article key={topic.title} className="flex h-full flex-col">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden">
                <Image
                  src={topic.image}
                  alt={topic.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              <div className="flex flex-1 flex-col items-center pt-4 text-center">
                <h3 className="m-0 text-base leading-6 font-bold tracking-[-0.03em] text-black uppercase">
                  {topic.title}
                </h3>
                <p className="m-0 mt-4 flex-1 max-w-[360px] text-base leading-6 font-normal text-black">
                  {topic.description}
                </p>
                <div className="mt-4 flex shrink-0 flex-col items-center gap-2">
                  {topic.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-base leading-6 font-medium text-black underline underline-offset-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

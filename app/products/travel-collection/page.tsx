import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const metadata: Metadata = {
  title: "Travel Collection | The Unboxing",
  description: "Explore customizable travel essentials for corporate gifting.",
};

const products = [
  { name: "Pocket Power Bank", type: "Travel tech", image: "/travel/2.webp" },
  { name: "Packable Travel Tote", type: "Lightweight luggage", image: "/travel/3.webp" },
  { name: "Insulated Adventure Bottle", type: "Drinkware", image: "/travel/4.webp" },
  { name: "Memory Foam Travel Pillow", type: "In-flight comfort", image: "/travel/5.webp" },
  { name: "Executive Luggage Tag", type: "Travel accessory", image: "/travel/6.webp" },
  { name: "Leather Passport Wallet", type: "Travel accessory", image: "/travel/7.webp" },
  { name: "Voyager Weekender Duffel", type: "Soft luggage", image: "/travel/8.webp" },
  { name: "Business Travel Backpack", type: "Business luggage", image: "/travel/9.webp" },
];

function ArrowIcon() {
  return <span aria-hidden="true">-&gt;</span>;
}

export default function TravelCollectionPage() {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="travel-collection-title" className="relative h-[68vh] min-h-[500px] max-h-[760px] overflow-hidden bg-[#ece9e5]">
          <Image
            src="/travel/10.webp"
            alt="Cabin spinner suitcase from the travel collection"
            fill
            priority
            className="object-cover object-center md:object-[70%_50%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-start px-8 pt-10 md:items-center md:px-16 md:pt-0">
            <div className="max-w-[300px] text-black md:max-w-[440px]">
              <p className="m-0 text-[10px] font-bold tracking-[0.08em] uppercase">Products / Travel</p>
              <h1 id="travel-collection-title" className="m-0 mt-4 text-4xl leading-[1.05] font-light md:text-6xl">
                Travel Collection
              </h1>
              <p className="m-0 mt-5 max-w-[360px] text-xs leading-5">
                Thoughtful essentials for journeys that begin with your brand and travel far beyond it.
              </p>
              <a
                href="#collection"
                className="mt-7 inline-flex items-center gap-3 border-b border-black pb-1 text-xs font-bold text-black no-underline uppercase"
              >
                Explore the collection <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section id="collection" aria-label="Travel products" className="bg-white">
          <div className="grid border-b border-[#dedede] md:grid-cols-[1fr_2fr]">
            <div className="px-8 py-10 md:px-16 md:py-14">
              <p className="m-0 text-[10px] font-bold tracking-[0.08em] text-black/40 uppercase">The collection</p>
              <p className="m-0 mt-3 text-base font-bold uppercase">10 products</p>
            </div>
            <div className="border-t border-[#dedede] px-8 py-10 md:border-t-0 md:border-l md:px-16 md:py-14">
              <p className="m-0 max-w-[650px] text-xl leading-8 font-light md:text-3xl md:leading-10">
                Designed to move. Selected for comfort, utility, and a polished arrival.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#dedede] pt-5 text-[10px] font-bold tracking-[0.05em] uppercase">
                <span>Luggage</span>
                <span>Accessories</span>
                <span>Travel tech</span>
                <span>Comfort</span>
              </div>
            </div>
          </div>

          <article className="grid bg-black text-white md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-[#eeeae5] md:aspect-auto md:min-h-[620px]">
              <Image src="/travel/1.webp" alt="Executive Travel Gift Set" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-between px-8 py-10 md:px-16 md:py-16">
              <span className="text-xs text-white/50">01 / Featured set</span>
              <div className="mt-20 max-w-[430px]">
                <h2 className="m-0 text-3xl leading-tight font-light md:text-5xl">Executive Travel Gift Set</h2>
                <p className="m-0 mt-5 text-xs leading-5 text-white/65">
                  A coordinated passport wallet, luggage tag, power bank, organizer, and insulated bottle presented in a premium gift box.
                </p>
                <a href="/contact-us#start-project" className="mt-8 inline-flex items-center gap-3 border-b border-white pb-1 text-xs font-bold text-white no-underline uppercase">
                  Request details <ArrowIcon />
                </a>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 border-b border-[#dedede] sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.image} className="group flex flex-col border-t border-[#dedede] bg-white lg:border-r last:lg:border-r-0">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f1efec]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex min-h-[130px] flex-col px-5 py-5">
                  <p className="m-0 text-[10px] leading-4 tracking-[0.05em] text-black/40 uppercase">{product.type}</p>
                  <h2 className="m-0 mt-2 text-sm leading-5 font-normal text-black">{product.name}</h2>
                  <a href="/contact-us#start-project" aria-label={`Enquire about ${product.name}`} className="mt-auto pt-5 text-xs text-black no-underline">
                    Enquire <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="grid bg-[#d9e2df] md:grid-cols-[2fr_1fr]">
            <div className="px-8 py-14 md:px-16 md:py-20">
              <p className="m-0 text-[10px] font-bold tracking-[0.08em] text-black/50 uppercase">Made for your brand</p>
              <h2 className="m-0 mt-4 max-w-[680px] text-3xl leading-tight font-light md:text-5xl">
                Build a travel kit around the way your people move.
              </h2>
            </div>
            <div className="flex items-end border-t border-black/15 px-8 py-10 md:border-t-0 md:border-l md:px-12 md:py-16">
              <a href="/contact-us#start-project" className="flex w-full items-center justify-between border-b border-black pb-3 text-xs font-bold text-black no-underline uppercase">
                Start a project <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

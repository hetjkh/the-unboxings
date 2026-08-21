import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { products as allProducts } from "../../data/products";

export const metadata: Metadata = {
  title: "Travel Collection | The Unboxing",
  description: "Explore customizable travel essentials for corporate gifting.",
};

const travelProducts = allProducts.filter((product) => product.category === "travel-collection");
const featured = travelProducts.find((product) => product.name === "The Long-Haul Box") ?? travelProducts[0];
const gridProducts = travelProducts.filter((product) => product.image !== featured.image);

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
            src={featured.image}
            alt={featured.name}
            fill
            priority
            className="object-contain object-center p-8 md:p-16"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-start px-8 pt-10 md:items-center md:px-16 md:pt-0">
            <div className="max-w-[300px] bg-white/80 p-5 text-black backdrop-blur-[2px] md:max-w-[440px]">
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
              <p className="m-0 mt-3 text-base font-bold uppercase">{travelProducts.length} products</p>
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
            <div className="relative aspect-square overflow-hidden bg-[#111] md:aspect-auto md:min-h-[620px]">
              <Image src={featured.image} alt={featured.name} fill className="object-contain p-8" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-between px-8 py-10 md:px-16 md:py-16">
              <span className="text-xs text-white/50">01 / Featured set</span>
              <div className="mt-20 max-w-[430px]">
                <h2 className="m-0 text-3xl leading-tight font-light md:text-5xl">{featured.name}</h2>
                <p className="m-0 mt-5 text-xs leading-5 text-white/65">{featured.description}</p>
                <a href="/contact-us#start-project" className="mt-8 inline-flex items-center gap-3 border-b border-white pb-1 text-xs font-bold text-white no-underline uppercase">
                  Request details <ArrowIcon />
                </a>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 border-b border-[#dedede] sm:grid-cols-2 lg:grid-cols-4">
            {gridProducts.map((product) => (
              <article key={product.image} className="group flex flex-col border-t border-[#dedede] bg-white lg:border-r last:lg:border-r-0">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f1efec]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex min-h-[160px] flex-col px-5 py-5">
                  <h2 className="m-0 text-sm leading-5 font-normal text-black">{product.name}</h2>
                  <p className="m-0 mt-2 text-[11px] leading-4 text-black/50">{product.description}</p>
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

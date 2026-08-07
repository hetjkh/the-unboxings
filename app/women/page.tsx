import Header from "../components/Header";
import PromoBanner from "../components/PromoBanner";
import WomenHero from "../components/WomenHero";
import WomenProductListing from "../components/WomenProductListing";
import Footer from "../components/Footer";

export const metadata = {
  title: "Women's Summer | GUCCI® US Official Site",
  description: "Shop Women's Summer at Gucci",
};

export default function WomenPage() {
  return (
    <>
      <PromoBanner />
      <Header overlay promoOffset={32} />
      <main>
        <WomenHero />
        <WomenProductListing />
      </main>
      <Footer />
    </>
  );
}

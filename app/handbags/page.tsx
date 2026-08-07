import Header from "../components/Header";
import PromoBanner from "../components/PromoBanner";
import HandbagsHero from "../components/HandbagsHero";
import HandbagsProductListing from "../components/HandbagsProductListing";
import Footer from "../components/Footer";

export const metadata = {
  title: "Handbags | GUCCI® US Official Site",
  description: "Shop Gucci handbags",
};

export default function HandbagsPage() {
  return (
    <>
      <PromoBanner />
      <Header overlay promoOffset={32} />
      <main>
        <HandbagsHero />
        <HandbagsProductListing />
      </main>
      <Footer />
    </>
  );
}

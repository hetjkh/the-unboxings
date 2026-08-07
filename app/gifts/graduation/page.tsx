import Header from "../../components/Header";
import PromoBanner from "../../components/PromoBanner";
import GraduationGiftsHero from "../../components/GraduationGiftsHero";
import GraduationGiftsProductListing from "../../components/GraduationGiftsProductListing";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Graduation Gifts | GUCCI® US Official Site",
  description: "Shop Gucci graduation gifts",
};

export default function GraduationGiftsPage() {
  return (
    <>
      <PromoBanner />
      <Header overlay promoOffset={32} />
      <main>
        <GraduationGiftsHero />
        <GraduationGiftsProductListing />
      </main>
      <Footer />
    </>
  );
}

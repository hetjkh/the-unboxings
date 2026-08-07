import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import MenCampaignHero from "./components/MenCampaignHero";
import MadeInItalySection from "./components/MadeInItalySection";
import GucciServicesSection from "./components/GucciServicesSection";
import CreateMethodSection from "./components/CreateMethodSection";
import IndustriesSection from "./components/IndustriesSection";
import ConceptLabSection from "./components/ConceptLabSection";
import StartProjectSection from "./components/StartProjectSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header overlay />
      <main>
        <Hero />
        <CategoryGrid />
        <MenCampaignHero />
        <MadeInItalySection />
        <GucciServicesSection />
        <CreateMethodSection />
        <IndustriesSection />
        <ConceptLabSection />
        <StartProjectSection />
      </main>
      <Footer />
    </>
  );
}

import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import MenCampaignHero from "./components/MenCampaignHero";
import MadeInItalySection from "./components/MadeInItalySection";
import GucciServicesSection from "./components/GucciServicesSection";
import CreateMethodSection from "./components/CreateMethodSection";
import IndustriesSection from "./components/IndustriesSection";
import ConceptLabSection from "./components/ConceptLabSection";
import FaqSection from "./components/FaqSection";
import StartProjectSection from "./components/StartProjectSection";
import Footer from "./components/Footer";
import DeferredHomeMotion from "./components/DeferredHomeMotion";
import HomeVideoPreload from "./components/HomeVideoPreload";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <HomeVideoPreload />
      <Header overlay />
      <main>
        <DeferredHomeMotion>
          <Hero />
          <CategoryGrid />
          <MenCampaignHero />
          <MadeInItalySection />
          <GucciServicesSection />
          <CreateMethodSection />
          <IndustriesSection />
          <ConceptLabSection />
          <FaqSection />
          <StartProjectSection />
        </DeferredHomeMotion>
      </main>
      <Footer />
    </>
  );
}

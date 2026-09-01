import CampaignHero from "./CampaignHero";

export default function Hero() {
  return (
    <CampaignHero
      ariaLabel="Custom Corporate Gifts & Branded Merchandise"
      title={
        <>
          NOT JUST GIVEN.
          <br />
          REMEMBERED
        </>
      }
      titleAlt="Not just given. Remembered."
      subline="Corporate gifting, designed differently."
      heading
      image="/hero1.png"
      video="/hero.webm"
      href="/contact-us#start-project"
      buttonStyle="light"
      buttonText="Let's Create Something Unique"
      secondaryHref="#brand-stories"
      secondaryButtonText="Explore Our Work"
      splitLayout
      priority
      bottomGradient
      fullViewport
    />
  );
}

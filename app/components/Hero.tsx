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
      splitLayout
      priority
      bottomGradient
      fullViewport
    />
  );
}

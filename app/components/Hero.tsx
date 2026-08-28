import CampaignHero from "./CampaignHero";

export default function Hero() {
  return (
    <CampaignHero
      ariaLabel="Custom Corporate Gifts & Branded Merchandise"
      title={
        <>
          We don&apos;t sell gifts.
          <br />
          We design memorable brand experiences.
        </>
      }
      titleAlt="We don't sell gifts. We design memorable brand experiences."
      description="Custom-designed merchandise, employee welcome kits, VIP gifts, event giveaways and branded experiences, crafted exclusively for your brand."
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

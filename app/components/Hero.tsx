import CampaignHero from "./CampaignHero";
import { HOME_HERO_DESKTOP_VIDEO, HOME_HERO_MOBILE_VIDEO, HOME_HERO_POSTER } from "../lib/home-videos";

export default function Hero() {
  return (
    <CampaignHero
      ariaLabel="Custom Corporate Gifts & Branded Merchandise"
      title={
        <>
          NOT JUST GIVEN.
          <br />
          REMEMBERED.
        </>
      }
      titleAlt="Not just given. Remembered."
      subline="Corporate gifting, designed differently."
      heading
      image={HOME_HERO_POSTER}
      video={HOME_HERO_DESKTOP_VIDEO}
      mobileVideo={HOME_HERO_MOBILE_VIDEO}
      splitLayout
      priority
      bottomGradient
      fullViewport
    />
  );
}

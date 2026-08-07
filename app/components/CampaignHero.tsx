"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  heroCtaContainerClass,
  heroOverlayButtonDark,
  heroOverlayButtonLight,
  heroOverlayDescriptionClass,
  heroOverlayHeadingClass,
  heroOverlaySplitDescriptionClass,
  heroOverlaySplitHeadingClass,
  heroOverlayTitleClass,
} from "./heroCtaStyles";
import { usePinHeroCta } from "../hooks/usePinHeroCta";

type CampaignHeroProps = {
  ariaLabel: string;
  title: string;
  description?: string;
  heading?: boolean;
  image: string;
  video?: string;
  mobileImage?: string;
  href: string;
  buttonStyle?: "light" | "dark";
  buttonText?: string;
  secondaryHref?: string;
  secondaryButtonText?: string;
  splitLayout?: boolean;
  priority?: boolean;
  bottomGradient?: boolean;
  fullViewport?: boolean;
};

export default function CampaignHero({
  ariaLabel,
  title,
  description,
  heading = false,
  image,
  video,
  mobileImage,
  href,
  buttonStyle = "light",
  buttonText = "Shop Now",
  secondaryHref,
  secondaryButtonText,
  splitLayout = false,
  priority = false,
  bottomGradient = false,
  fullViewport = false,
}: CampaignHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinCta = usePinHeroCta(sectionRef);

  const buttonClassName =
    buttonStyle === "dark" ? heroOverlayButtonDark : heroOverlayButtonLight;

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden ${fullViewport ? "h-svh" : ""}`}
    >
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "metadata" : "none"}
          poster={image}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : mobileImage ? (
        <Image
          src={mobileImage}
          alt={title}
          width={750}
          height={1200}
          priority={priority}
          className="block h-auto w-full md:hidden"
          sizes="100vw"
        />
      ) : null}
      {!video ? (
        <Image
          src={image}
          alt={title}
          width={1425}
          height={801}
          priority={priority}
          className={`block h-auto w-full ${mobileImage ? "hidden md:block" : ""}`}
          sizes="100vw"
        />
      ) : null}

      {bottomGradient ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[50vh] bg-gradient-to-b from-transparent via-black/35 to-black/80"
        />
      ) : null}

      {splitLayout ? (
        <div className={`z-40 px-6 md:px-16 ${pinCta ? "fixed inset-x-0 bottom-6 md:bottom-10" : "absolute inset-x-0 bottom-6 md:bottom-10"}`}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)] md:items-start md:gap-12">
            {heading ? <h1 className={heroOverlaySplitHeadingClass}>{title}</h1> : <p className={heroOverlayTitleClass}>{title}</p>}
            <div className="flex flex-col gap-5">
              {description ? <p className={heroOverlaySplitDescriptionClass}>{description}</p> : null}
              <div className="grid grid-cols-2 gap-3">
                <a href={href} className={`${buttonClassName} w-full`}>
                  {buttonText}
                </a>
                {secondaryHref && secondaryButtonText ? (
                  <a href={secondaryHref} className={`${heroOverlayButtonDark} w-full`}>
                    {secondaryButtonText}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={heroCtaContainerClass(pinCta)}>
          {heading ? (
            <h1 className={heroOverlayHeadingClass}>{title}</h1>
          ) : (
            <p className={heroOverlayTitleClass}>{title}</p>
          )}
          {description ? <p className={heroOverlayDescriptionClass}>{description}</p> : null}
          <div className="flex flex-wrap justify-center gap-3">
            <a href={href} className={buttonClassName}>
              {buttonText}
            </a>
            {secondaryHref && secondaryButtonText ? (
              <a href={secondaryHref} className={heroOverlayButtonDark}>
                {secondaryButtonText}
              </a>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

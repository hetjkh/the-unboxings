"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  heroCtaContainerClass,
  heroOverlayButtonDark,
  heroOverlayButtonLight,
  heroOverlayDescriptionClass,
  heroOverlayHeadingClass,
  heroOverlaySplitDescriptionClass,
  heroOverlaySplitHeadingClass,
  heroOverlaySplitSublineClass,
  heroOverlayTitleClass,
} from "./heroCtaStyles";
import { usePinHeroCta } from "../hooks/usePinHeroCta";
import { signalHeroVideoReady } from "./site-loader-events";

type CampaignHeroProps = {
  ariaLabel: string;
  title: ReactNode;
  titleAlt?: string;
  subline?: string;
  description?: string;
  heading?: boolean;
  image: string;
  video?: string;
  mobileVideo?: string;
  mobileImage?: string;
  href?: string;
  buttonStyle?: "light" | "dark";
  buttonText?: string;
  secondaryHref?: string;
  secondaryButtonText?: string;
  splitLayout?: boolean;
  priority?: boolean;
  bottomGradient?: boolean;
  fullViewport?: boolean;
};

function subscribeIsMobile(onChange: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getIsMobileSnapshot(): boolean | null {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getIsMobileServerSnapshot(): boolean | null {
  return null;
}

export default function CampaignHero({
  ariaLabel,
  title,
  titleAlt,
  subline,
  description,
  heading = false,
  image,
  video,
  mobileVideo,
  mobileImage,
  href,
  buttonStyle = "light",
  buttonText,
  secondaryHref,
  secondaryButtonText,
  splitLayout = false,
  priority = false,
  bottomGradient = false,
  fullViewport = false,
}: CampaignHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pinCta = usePinHeroCta(sectionRef);
  const isMobile = useSyncExternalStore(
    subscribeIsMobile,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot,
  );
  const [videoReady, setVideoReady] = useState(false);
  const signaledRef = useRef(false);

  const buttonClassName =
    buttonStyle === "dark" ? heroOverlayButtonDark : heroOverlayButtonLight;

  const imageAlt = titleAlt ?? (typeof title === "string" ? title : ariaLabel);
  const showButtons = Boolean(buttonText && href);
  const showRightColumn = Boolean(description || showButtons);
  const activeVideo =
    isMobile == null ? undefined : isMobile ? mobileVideo || video : video;
  const hasVideo = Boolean(video || mobileVideo);

  useEffect(() => {
    const el = videoRef.current;

    // Wait for matchMedia before choosing desktop/mobile video — never signal
    // ready on the poster-only frame (that dismissed the loader too early).
    if (!activeVideo) return;
    if (!el) return;

    setVideoReady(false);

    const markReady = () => {
      setVideoReady(true);
      if (priority && !signaledRef.current) {
        signaledRef.current = true;
        signalHeroVideoReady();
      }
      el.play().catch(() => {
        // Autoplay may be blocked until user interaction.
      });
    };

    if (el.readyState >= 3) {
      markReady();
    } else {
      el.addEventListener("canplay", markReady);
      el.addEventListener("loadeddata", markReady);
    }

    // Safety: never leave the loader waiting forever if the video stalls.
    const failSafe = window.setTimeout(() => {
      setVideoReady(true);
      if (priority && !signaledRef.current) {
        signaledRef.current = true;
        signalHeroVideoReady();
      }
    }, 4500);

    return () => {
      window.clearTimeout(failSafe);
      el.removeEventListener("canplay", markReady);
      el.removeEventListener("loadeddata", markReady);
    };
  }, [activeVideo, priority]);

  const showPoster = hasVideo && !videoReady;

  return (
    <section
      ref={sectionRef}
      data-home-hero={priority ? "" : undefined}
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden ${fullViewport ? "h-svh max-md:min-h-[420px]" : ""}`}
    >
      {activeVideo ? (
        <video
          ref={videoRef}
          key={activeVideo}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={image}
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={activeVideo}
        />
      ) : null}

      {!hasVideo && mobileImage ? (
        <Image
          src={mobileImage}
          alt={imageAlt}
          width={750}
          height={1200}
          priority={priority}
          className="block h-auto w-full md:hidden"
          sizes="100vw"
        />
      ) : null}

      {!hasVideo ? (
        <Image
          src={image}
          alt={imageAlt}
          width={1425}
          height={801}
          priority={priority}
          className={`block h-auto w-full ${mobileImage ? "hidden md:block" : ""}`}
          sizes="100vw"
        />
      ) : null}

      {showPoster ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          // Don't steal LCP / paint ahead of the loader — video is the real hero.
          priority={false}
          className="object-cover object-center"
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
        <div
          className={`z-40 px-5 max-md:absolute max-md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:px-16 ${
            pinCta ? "fixed inset-x-0 bottom-6 md:bottom-10" : "absolute inset-x-0 bottom-6 md:bottom-10"
          }`}
        >
          <div
            className={`mx-auto grid max-w-[1440px] gap-6 ${
              showRightColumn
                ? "grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)] md:items-start md:gap-12"
                : "grid-cols-1"
            }`}
          >
            {heading ? (
              <div>
                <h1 className={heroOverlaySplitHeadingClass}>{title}</h1>
                {subline ? <p className={heroOverlaySplitSublineClass}>{subline}</p> : null}
              </div>
            ) : (
              <p className={heroOverlayTitleClass}>{title}</p>
            )}
            {showRightColumn ? (
              <div className="flex flex-col gap-5">
                {description ? <p className={heroOverlaySplitDescriptionClass}>{description}</p> : null}
                {showButtons ? (
                  <div
                    className={`grid gap-3 ${
                      secondaryHref && secondaryButtonText ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    <a href={href} className={`${buttonClassName} w-full`}>
                      {buttonText}
                    </a>
                    {secondaryHref && secondaryButtonText ? (
                      <a href={secondaryHref} className={`${heroOverlayButtonDark} w-full`}>
                        {secondaryButtonText}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
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
          {showButtons ? (
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
          ) : null}
        </div>
      )}
    </section>
  );
}

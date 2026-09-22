"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_LOADER_COMPLETE_EVENT, isSiteLoaderComplete } from "./site-loader-events";

/**
 * Page-scoped scroll animations. Smooth scrolling is handled globally by SmoothScroll.
 */
export default function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let context: gsap.Context | null = null;
    let didSetup = false;
    let failSafeTimer = 0;

    const setupMotion = () => {
      if (didSetup) return;
      didSetup = true;
      window.clearTimeout(failSafeTimer);

      context?.revert();
      context = gsap.context(() => {
        if (reduceMotion) return;

        const sections = gsap.utils.toArray<HTMLElement>("section", root);
        const hero = sections[0];

        if (hero) {
          const heroCopy = hero.querySelectorAll("h1, h1 ~ div > p, h1 ~ div a");
          gsap.fromTo(
            heroCopy,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.15,
            },
          );

          const heroMedia = hero.querySelector("video, img");
          if (heroMedia) {
            gsap.fromTo(
              heroMedia,
              { scale: 1.05 },
              {
                scale: 1.14,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          }
        }

        sections.slice(1).forEach((section) => {
          const intro = section.querySelectorAll("h2, header > p");
          if (!intro.length) return;

          gsap.fromTo(
            intro,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 65%",
                once: true,
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-media]", root).forEach((media) => {
          if (media.closest("[data-motion-card]")) return;

          gsap.fromTo(
            media,
            { clipPath: "inset(6% 0% 6% 0%)", scale: 0.97 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: media,
                start: "top 70%",
                once: true,
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-motion-card]", root).forEach((card) => {
          gsap.fromTo(
            card,
            { y: 28 },
            {
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                once: true,
                toggleActions: "play none none none",
              },
            },
          );
        });
      }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (reduceMotion || isSiteLoaderComplete()) {
      setupMotion();
    } else {
      window.addEventListener(SITE_LOADER_COMPLETE_EVENT, setupMotion, { once: true });
      failSafeTimer = window.setTimeout(setupMotion, 8000);
    }

    const refreshScrollPositions = () => {
      if (didSetup) ScrollTrigger.refresh();
    };
    const media = root.querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video");

    media.forEach((item) => {
      if (item instanceof HTMLImageElement) {
        if (!item.complete) item.addEventListener("load", refreshScrollPositions, { once: true });
      } else if (item.readyState < 1) {
        item.addEventListener("loadedmetadata", refreshScrollPositions, { once: true });
      }
    });

    window.addEventListener("load", refreshScrollPositions, { once: true });

    return () => {
      window.removeEventListener(SITE_LOADER_COMPLETE_EVENT, setupMotion);
      window.clearTimeout(failSafeTimer);
      window.removeEventListener("load", refreshScrollPositions);
      media.forEach((item) => {
        item.removeEventListener("load", refreshScrollPositions);
        item.removeEventListener("loadedmetadata", refreshScrollPositions);
      });
      context?.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

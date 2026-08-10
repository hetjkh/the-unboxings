"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      anchors: { offset: -72 },
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      if (reduceMotion) return;

      const sections = gsap.utils.toArray<HTMLElement>("section", root);
      const hero = sections[0];

      if (hero) {
        const heroCopy = hero.querySelectorAll("h1, h1 ~ div > p, h1 ~ div a");
        gsap.from(heroCopy, {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        });

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
        if (intro.length) {
          gsap.from(intro, {
            autoAlpha: 0,
            y: 36,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });
        }

      });

      gsap.utils.toArray<HTMLElement>("[data-motion-media]", root).forEach((media) => {
        gsap.from(media, {
          clipPath: "inset(8% 0% 8% 0%)",
          scale: 0.96,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: media,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    const refreshScrollPositions = () => ScrollTrigger.refresh();
    const media = root.querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video");

    media.forEach((item) => {
      if (item instanceof HTMLImageElement) {
        if (!item.complete) item.addEventListener("load", refreshScrollPositions, { once: true });
      } else if (item.readyState < 1) {
        item.addEventListener("loadedmetadata", refreshScrollPositions, { once: true });
      }
    });

    window.addEventListener("load", refreshScrollPositions, { once: true });
    const refresh = window.setTimeout(refreshScrollPositions, 100);

    return () => {
      window.clearTimeout(refresh);
      window.removeEventListener("load", refreshScrollPositions);
      media.forEach((item) => {
        item.removeEventListener("load", refreshScrollPositions);
        item.removeEventListener("loadedmetadata", refreshScrollPositions);
      });
      context.revert();
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      gsap.ticker.remove(tick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

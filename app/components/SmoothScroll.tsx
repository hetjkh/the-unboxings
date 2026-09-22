"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide Lenis smooth scroll (desktop + mobile) mounted from the root layout.
 *
 * Important: do NOT put data-lenis-prevent on full-width horizontal carousels.
 * Lenis owns page scroll (html overflow hidden) — preventing it there traps vertical scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      anchors: { offset: -72 },
      lerp: 0.085,
      smoothWheel: true,
      // Only claim vertical gestures so horizontal carousels keep native swipe
      gestureOrientation: "vertical",
      syncTouch: true,
      syncTouchLerp: 0.12,
      touchInertiaExponent: 1.4,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
      allowNestedScroll: true,
      respectReducedMotion: true,
      // Modals / drawers / selects only — not page-wide carousels
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    const refreshTimer = window.setTimeout(refresh, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Only handle in-page hash clicks; we reset scroll ourselves on route changes
      anchors: { offset: -72 },
      lerp: 0.085,
      smoothWheel: true,
      gestureOrientation: "vertical",
      syncTouch: true,
      syncTouchLerp: 0.12,
      touchInertiaExponent: 1.4,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
      allowNestedScroll: true,
      respectReducedMotion: true,
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for route-change scroll reset
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    const refreshTimer = window.setTimeout(refresh, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(tick);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Always start new pages at the top (Lenis otherwise keeps prior scroll).
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
    const hasHash = typeof window !== "undefined" && Boolean(window.location.hash);

    if (hasHash) {
      // Allow Lenis/native hash targeting (e.g. /contact-us#start-project)
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}

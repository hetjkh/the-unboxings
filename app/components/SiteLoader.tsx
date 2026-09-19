"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { gsap as GsapNS } from "gsap";
import {
  isBrandLoaderPath,
  isCollectionPath,
  prepareSiteLoader,
  resetCollectionImagesReady,
  resetHeroVideoReady,
  signalSiteLoaderComplete,
  waitForCollectionImagesReady,
  waitForHeroVideoReady,
} from "./site-loader-events";

export { SITE_LOADER_COMPLETE_EVENT, HERO_VIDEO_READY_EVENT } from "./site-loader-events";

type GsapTimeline = ReturnType<typeof GsapNS.timeline>;

function finishLoader() {
  signalSiteLoaderComplete();
}

/** Brand intro → wait for page media → brand outro + slide away. */
function playBrandLoader(
  gsap: typeof GsapNS,
  els: {
    overlay: HTMLElement;
    theWord: HTMLElement;
    unboxingWord: HTMLElement;
    line: HTMLElement;
  },
  waitForMedia: () => Promise<void>,
  onDone: () => void,
  isCancelled: () => boolean,
): GsapTimeline {
  const { overlay, theWord, unboxingWord, line } = els;
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
  gsap.set([theWord, unboxingWord, line], { autoAlpha: 0 });
  gsap.set(unboxingWord, { y: 28, clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(theWord, { y: 12 });
  gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

  timeline
    .to(theWord, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
    .to(
      unboxingWord,
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.05,
        ease: "power4.out",
      },
      0.12,
    )
    .to(line, { autoAlpha: 1, scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.8)
    .to({}, { duration: 0.2 })
    .add(() => {
      timeline.pause();
      void waitForMedia().then(() => {
        if (isCancelled()) {
          onDone();
          return;
        }
        timeline.resume();
      });
    })
    .to(
      [theWord, unboxingWord],
      {
        y: -18,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.04,
        ease: "power3.in",
      },
    )
    .to(
      line,
      {
        scaleX: 0,
        transformOrigin: "right center",
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.in",
      },
      "<0.1",
    )
    .to(
      overlay,
      {
        yPercent: -100,
        duration: 0.95,
        ease: "power4.inOut",
        onComplete: onDone,
      },
      "-=0.2",
    );

  return timeline;
}

export default function SiteLoader() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const unboxingRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const [cycle, setCycle] = useState(0);

  // Re-show the white brand loader on home + collection navigations.
  useLayoutEffect(() => {
    if (!isBrandLoaderPath(pathname)) {
      // Non-brand routes: if we somehow still cover the page, clear it.
      finishLoader();
      setVisible(false);
      return;
    }

    prepareSiteLoader();
    if (isCollectionPath(pathname)) resetCollectionImagesReady();
    if (pathname === "/" || pathname === "") resetHeroVideoReady();
    setVisible(true);
    setCycle((value) => value + 1);
  }, [pathname]);

  // Run the animation after the overlay is mounted and refs exist.
  useLayoutEffect(() => {
    if (!visible || cycle === 0) return;
    if (!isBrandLoaderPath(pathname)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      finishLoader();
      setVisible(false);
      return;
    }

    let cancelled = false;
    let timeline: GsapTimeline | null = null;
    let failSafe = 0;

    const start = () => {
      const overlay = overlayRef.current;
      const theWord = theRef.current;
      const unboxingWord = unboxingRef.current;
      const line = lineRef.current;

      if (!overlay || !theWord || !unboxingWord || !line) {
        finishLoader();
        setVisible(false);
        return;
      }

      const waitForMedia = () =>
        isCollectionPath(pathname)
          ? waitForCollectionImagesReady(4500)
          : waitForHeroVideoReady(5000);

      void import("gsap").then(({ default: gsap }) => {
        if (cancelled) return;

        timeline = playBrandLoader(
          gsap,
          { overlay, theWord, unboxingWord, line },
          waitForMedia,
          () => {
            finishLoader();
            setVisible(false);
          },
          () => cancelled,
        );
      });

      failSafe = window.setTimeout(() => {
        if (cancelled) return;
        finishLoader();
        setVisible(false);
      }, 10000);
    };

    // Wait one frame so refs attach after setVisible(true) on soft navigations.
    const raf = window.requestAnimationFrame(start);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
      timeline?.kill();
    };
  }, [visible, cycle, pathname]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="flex items-baseline justify-center gap-[0.35em] whitespace-nowrap">
          <span
            ref={theRef}
            className="text-[clamp(1rem,2.8vw,1.875rem)] font-medium tracking-normal text-black uppercase max-md:text-[clamp(0.65rem,2.8vw,1rem)]"
          >
            The
          </span>
          <span
            ref={unboxingRef}
            className="text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.82] font-bold tracking-[-0.045em] text-black uppercase max-md:text-[12vw]"
          >
            Unboxing
          </span>
        </div>
        <span
          ref={lineRef}
          aria-hidden="true"
          className="mt-8 block h-px w-[min(220px,42vw)] bg-black/20"
        />
      </div>
    </div>
  );
}

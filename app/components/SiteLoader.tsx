"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { gsap as GsapNS } from "gsap";
import {
  isCollectionPath,
  signalSiteLoaderComplete,
  waitForCollectionImagesReady,
  waitForHeroVideoReady,
} from "./site-loader-events";

export { SITE_LOADER_COMPLETE_EVENT, HERO_VIDEO_READY_EVENT } from "./site-loader-events";

type GsapTimeline = ReturnType<typeof GsapNS.timeline>;

function finishLoader() {
  signalSiteLoaderComplete();
}

function removeBootCover() {
  document.getElementById("site-boot-cover")?.remove();
}

function playExit(
  gsap: typeof GsapNS,
  overlay: HTMLElement,
  onDone: () => void,
): GsapTimeline {
  const timeline = gsap.timeline({ onComplete: onDone });
  gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
  timeline.to(overlay, {
    yPercent: -100,
    duration: 0.7,
    ease: "power3.inOut",
  });
  return timeline;
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const unboxingRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  // Visible on SSR + first paint so content never flashes underneath.
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    removeBootCover();
    document.documentElement.classList.add("site-loading");
    document.documentElement.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHome = window.location.pathname === "/" || window.location.pathname === "";
    const isCollection = isCollectionPath();

    if (reduceMotion) {
      finishLoader();
      setVisible(false);
      return;
    }

    // Home + collections: full brand animation while media warms behind.
    if (isHome || isCollection) {
      const overlay = overlayRef.current;
      const theWord = theRef.current;
      const unboxingWord = unboxingRef.current;
      const line = lineRef.current;

      if (!overlay || !theWord || !unboxingWord || !line) {
        finishLoader();
        setVisible(false);
        return;
      }

      let cancelled = false;
      let timeline: GsapTimeline | null = null;

      const waitForMedia = () =>
        isCollection ? waitForCollectionImagesReady(4500) : waitForHeroVideoReady(5000);

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

      const failSafe = window.setTimeout(() => {
        if (cancelled) return;
        finishLoader();
        setVisible(false);
      }, 10000);

      return () => {
        cancelled = true;
        window.clearTimeout(failSafe);
        timeline?.kill();
        document.documentElement.style.overflow = "";
        document.documentElement.classList.remove("site-loading");
      };
    }

    // Other pages: quick slide away.
    const overlay = overlayRef.current;
    let cancelled = false;
    let timeline: GsapTimeline | null = null;

    void import("gsap").then(({ default: gsap }) => {
      if (cancelled || !overlay) {
        finishLoader();
        setVisible(false);
        return;
      }

      timeline = playExit(gsap, overlay, () => {
        finishLoader();
        setVisible(false);
      });
    });

    const failSafe = window.setTimeout(() => {
      finishLoader();
      setVisible(false);
    }, 2000);

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      timeline?.kill();
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("site-loading");
    };
  }, []);

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

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { gsap as GsapNS } from "gsap";
import { SITE_LOADER_COMPLETE_EVENT, waitForHeroVideoReady, signalSiteLoaderComplete } from "./site-loader-events";

export { SITE_LOADER_COMPLETE_EVENT, HERO_VIDEO_READY_EVENT } from "./site-loader-events";

type GsapTimeline = ReturnType<typeof GsapNS.timeline>;

const LOADER_SEEN_KEY = "theunboxing-loader-seen";

function hasSeenLoaderThisSession() {
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markLoaderSeenThisSession() {
  try {
    sessionStorage.setItem(LOADER_SEEN_KEY, "1");
  } catch {
    // Ignore private-mode / blocked storage.
  }
}

function finishLoader() {
  markLoaderSeenThisSession();
  document.documentElement.style.overflow = "";
  document.documentElement.classList.remove("site-loading");
  document.getElementById("site-boot-cover")?.remove();
  signalSiteLoaderComplete();
}

export default function SiteLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const unboxingRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  // Decide once: skip on repeat visits this session.
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenLoaderThisSession() || reduceMotion) {
      finishLoader();
      return;
    }

    document.documentElement.classList.add("site-loading");
    document.documentElement.style.overflow = "hidden";
    setVisible(true);
  }, []);

  useLayoutEffect(() => {
    if (!visible) return;

    // Hand off from the static boot cover to the animated overlay.
    document.getElementById("site-boot-cover")?.remove();

    const overlay = overlayRef.current;
    const theWord = theRef.current;
    const unboxingWord = unboxingRef.current;
    const line = lineRef.current;

    if (!overlay || !theWord || !unboxingWord || !line) return;

    let cancelled = false;
    let timeline: GsapTimeline | null = null;

    void import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;

      timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

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
          timeline?.pause();
          void waitForHeroVideoReady(5000).then(() => {
            if (cancelled || !timeline) {
              finishLoader();
              setVisible(false);
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
            onComplete: () => {
              finishLoader();
              setVisible(false);
            },
          },
          "-=0.2",
        );
    });

    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, [visible]);

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

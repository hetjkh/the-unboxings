"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export const SITE_LOADER_COMPLETE_EVENT = "site-loader-complete";

function finishLoader() {
  document.documentElement.style.overflow = "";
  window.dispatchEvent(new Event(SITE_LOADER_COMPLETE_EVENT));
}

export default function SiteLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const unboxingRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      finishLoader();
      return;
    }

    setVisible(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  useLayoutEffect(() => {
    if (!visible) return;

    const overlay = overlayRef.current;
    const theWord = theRef.current;
    const unboxingWord = unboxingRef.current;
    const line = lineRef.current;

    if (!overlay || !theWord || !unboxingWord || !line) return;

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        finishLoader();
        setVisible(false);
      },
    });

    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set([theWord, unboxingWord, line], { autoAlpha: 0 });
    gsap.set(unboxingWord, { y: 28, clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(theWord, { y: 12 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

    timeline
      .to(overlay, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
      .to(theWord, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.15)
      .to(
        unboxingWord,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          ease: "power4.out",
        },
        0.28,
      )
      .to(line, { autoAlpha: 1, scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.95)
      .to({}, { duration: 0.35 })
      .to(
        [theWord, unboxingWord],
        {
          y: -18,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.in",
        },
        "+=0.05",
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
        },
        "-=0.2",
      );

    return () => {
      timeline.kill();
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white opacity-0"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="flex items-baseline justify-center gap-[0.35em] whitespace-nowrap">
          <span
            ref={theRef}
            className="text-[clamp(1rem,2.8vw,1.875rem)] font-medium tracking-normal text-black uppercase"
          >
            The
          </span>
          <span
            ref={unboxingRef}
            className="text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.82] font-bold tracking-[-0.045em] text-black uppercase"
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

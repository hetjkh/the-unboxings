"use client";

import { useEffect, useState, type RefObject } from "react";

function getViewportHeight() {
  return window.visualViewport?.height ?? window.innerHeight;
}

export function usePinHeroCta(ref: RefObject<HTMLElement | null>) {
  const [pinCta, setPinCta] = useState(false);

  useEffect(() => {
    const update = () => {
      const section = ref.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = getViewportHeight();
      const heroExtendsBelowViewport = rect.bottom > viewportHeight;
      const heroInView = rect.top < viewportHeight && rect.bottom > 0;
      setPinCta(heroExtendsBelowViewport && heroInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, [ref]);

  return pinCta;
}

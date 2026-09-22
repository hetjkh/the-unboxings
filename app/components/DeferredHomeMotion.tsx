"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";

/**
 * Renders children immediately, then hydrates page scroll animations
 * from a separate chunk — only on pages that import this wrapper.
 * Site-wide Lenis lives in SmoothScroll (root layout).
 */
export default function DeferredHomeMotion({ children }: { children: ReactNode }) {
  const [Motion, setMotion] = useState<ComponentType<{ children: ReactNode }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void import("./HomeMotion").then((mod) => {
      if (!cancelled) setMotion(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Motion) return <>{children}</>;
  return <Motion>{children}</Motion>;
}

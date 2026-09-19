"use client";

import { useEffect } from "react";
import { resetCollectionImagesReady, signalCollectionImagesReady } from "./site-loader-events";

type CollectionImagePreloadProps = {
  /** Header + product image URLs to warm while the site loader is up. */
  urls: readonly string[];
  /** How many images must finish before we release the loader. */
  waitFor?: number;
};

/**
 * Preloads collection images behind the loader (Image() only — no <link> in the
 * React tree, which was breaking hydration / client navigations).
 */
export default function CollectionImagePreload({
  urls,
  waitFor = 8,
}: CollectionImagePreloadProps) {
  const unique = Array.from(new Set(urls.filter((url) => Boolean(url))));
  const warmList = unique.slice(0, Math.max(waitFor, 8));
  const waitCount = Math.min(waitFor, warmList.length);
  const warmKey = warmList.join("|");

  useEffect(() => {
    resetCollectionImagesReady();

    let cancelled = false;
    let settled = false;
    let loaded = 0;

    const finish = () => {
      if (cancelled || settled) return;
      settled = true;
      signalCollectionImagesReady();
    };

    if (waitCount === 0) {
      finish();
      return;
    }

    const failSafe = window.setTimeout(finish, 4500);

    warmList.forEach((url, index) => {
      const img = new window.Image();
      img.decoding = "async";
      const onDone = () => {
        if (index >= waitCount) return;
        loaded += 1;
        if (loaded >= waitCount) {
          window.clearTimeout(failSafe);
          finish();
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
      img.src = url;
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
    };
  }, [warmKey, waitCount]);

  return null;
}

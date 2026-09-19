"use client";

import { HOME_VIDEO_CACHE_NAME } from "./home-videos";

const blobUrls = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();
const listeners = new Map<string, Set<(src: string) => void>>();

function notify(src: string, resolved: string) {
  const set = listeners.get(src);
  if (!set) return;
  for (const listener of set) listener(resolved);
}

/** Subscribe to a video becoming available from cache (or after preload). */
export function subscribeVideoSrc(src: string, listener: (resolved: string) => void) {
  const cached = blobUrls.get(src);
  if (cached) {
    listener(cached);
    return () => {};
  }

  let set = listeners.get(src);
  if (!set) {
    set = new Set();
    listeners.set(src, set);
  }
  set.add(listener);

  return () => {
    set?.delete(listener);
    if (set && set.size === 0) listeners.delete(src);
  };
}

export function getCachedVideoSrc(src: string): string | undefined {
  return blobUrls.get(src);
}

/**
 * Fetch a video into Cache Storage and expose a blob: URL for instant playback.
 * Concurrent callers share one in-flight request.
 */
export function preloadVideo(src: string): Promise<string> {
  const existing = blobUrls.get(src);
  if (existing) return Promise.resolve(existing);

  const pending = inflight.get(src);
  if (pending) return pending;

  const promise = (async () => {
    try {
      let response: Response | undefined;

      if (typeof caches !== "undefined") {
        const cache = await caches.open(HOME_VIDEO_CACHE_NAME);
        response = await cache.match(src);
        if (!response) {
          const network = await fetch(src, { credentials: "same-origin" });
          if (network.ok) {
            await cache.put(src, network.clone());
            response = network;
          }
        }
      } else {
        const network = await fetch(src, { credentials: "same-origin" });
        if (network.ok) response = network;
      }

      if (response?.ok) {
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        blobUrls.set(src, objectUrl);
        notify(src, objectUrl);
        return objectUrl;
      }
    } catch {
      // Fall through to network URL.
    }

    notify(src, src);
    return src;
  })();

  inflight.set(src, promise);
  void promise.finally(() => {
    if (inflight.get(src) === promise) inflight.delete(src);
  });

  return promise;
}

/** Warm multiple videos sequentially so the first (hero) wins bandwidth. */
export async function preloadVideos(urls: readonly string[], concurrency = 2) {
  const queue = [...urls];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length) {
      const next = queue.shift();
      if (!next) break;
      await preloadVideo(next);
    }
  });
  await Promise.all(workers);
}

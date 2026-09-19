export const SITE_LOADER_COMPLETE_EVENT = "site-loader-complete";

/** Fired by the homepage hero when the background video can play. */
export const HERO_VIDEO_READY_EVENT = "hero-video-ready";

let heroVideoReady = false;
let siteLoaderComplete = false;

export function isHeroVideoReady() {
  return heroVideoReady;
}

export function isSiteLoaderComplete() {
  return siteLoaderComplete;
}

export function signalHeroVideoReady() {
  if (typeof window === "undefined") return;
  heroVideoReady = true;
  window.dispatchEvent(new Event(HERO_VIDEO_READY_EVENT));
}

export function signalSiteLoaderComplete() {
  if (typeof window === "undefined") return;
  siteLoaderComplete = true;
  document.documentElement.style.overflow = "";
  document.documentElement.classList.remove("site-loading");
  window.dispatchEvent(new Event(SITE_LOADER_COMPLETE_EVENT));
}

/** Resolves when the hero can play, or after timeout / non-home routes. */
export function waitForHeroVideoReady(timeoutMs = 5000): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const path = window.location.pathname;
  const isHome = path === "/" || path === "";
  if (!isHome || heroVideoReady) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      window.removeEventListener(HERO_VIDEO_READY_EVENT, finish);
      resolve();
    };

    window.addEventListener(HERO_VIDEO_READY_EVENT, finish, { once: true });
    const timer = window.setTimeout(finish, timeoutMs);
  });
}

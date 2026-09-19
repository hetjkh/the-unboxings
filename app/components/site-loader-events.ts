export const SITE_LOADER_COMPLETE_EVENT = "site-loader-complete";

/** Fired by the homepage hero when the background video can play. */
export const HERO_VIDEO_READY_EVENT = "hero-video-ready";

/** Fired when the first viewport of collection images is warm (or timed out). */
export const COLLECTION_IMAGES_READY_EVENT = "collection-images-ready";

let heroVideoReady = false;
let siteLoaderComplete = false;
let collectionImagesReady = false;

export function isHeroVideoReady() {
  return heroVideoReady;
}

export function isSiteLoaderComplete() {
  return siteLoaderComplete;
}

export function isCollectionImagesReady() {
  return collectionImagesReady;
}

export function isCollectionPath(pathname = typeof window !== "undefined" ? window.location.pathname : "") {
  return pathname === "/products" || pathname.startsWith("/products/");
}

export function isBrandLoaderPath(pathname: string) {
  return pathname === "/" || pathname === "" || isCollectionPath(pathname);
}

export function signalHeroVideoReady() {
  if (typeof window === "undefined") return;
  heroVideoReady = true;
  window.dispatchEvent(new Event(HERO_VIDEO_READY_EVENT));
}

export function signalCollectionImagesReady() {
  if (typeof window === "undefined") return;
  collectionImagesReady = true;
  window.dispatchEvent(new Event(COLLECTION_IMAGES_READY_EVENT));
}

export function resetCollectionImagesReady() {
  collectionImagesReady = false;
}

export function resetHeroVideoReady() {
  heroVideoReady = false;
}

/** Start a fresh loader cycle (used on soft navigations to home/collections). */
export function prepareSiteLoader() {
  if (typeof window === "undefined") return;
  siteLoaderComplete = false;
  document.documentElement.classList.add("site-loading");
  document.documentElement.style.overflow = "hidden";
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

/** Resolves when collection images are warm, or after timeout / non-collection routes. */
export function waitForCollectionImagesReady(timeoutMs = 4500): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!isCollectionPath() || collectionImagesReady) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      window.removeEventListener(COLLECTION_IMAGES_READY_EVENT, finish);
      resolve();
    };

    window.addEventListener(COLLECTION_IMAGES_READY_EVENT, finish, { once: true });
    const timer = window.setTimeout(finish, timeoutMs);
  });
}

"use client";

import { useEffect } from "react";
import {
  HOME_EXPERIENCE_VIDEOS,
  HOME_HERO_DESKTOP_VIDEO,
  HOME_HERO_MOBILE_VIDEO,
} from "../lib/home-videos";
import { preloadVideo, preloadVideos } from "../lib/video-cache";

/**
 * Warms the hero video first, then the four experience clips behind the scenes
 * (Cache Storage + blob URLs) so CategoryGrid plays without a gray flash.
 */
export default function HomeVideoPreload() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const heroSrc = isMobile ? HOME_HERO_MOBILE_VIDEO : HOME_HERO_DESKTOP_VIDEO;

    let cancelled = false;

    void (async () => {
      await preloadVideo(heroSrc);
      if (cancelled) return;
      await preloadVideos(HOME_EXPERIENCE_VIDEOS, 2);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <link
        rel="preload"
        as="video"
        href={HOME_HERO_DESKTOP_VIDEO}
        type="video/webm"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="video"
        href={HOME_HERO_MOBILE_VIDEO}
        type="video/webm"
        media="(max-width: 767px)"
      />
    </>
  );
}

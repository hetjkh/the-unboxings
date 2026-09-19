"use client";

import {
  HOME_HERO_DESKTOP_VIDEO,
  HOME_HERO_MOBILE_VIDEO,
} from "../lib/home-videos";

/**
 * Hint the browser to fetch the correct hero video as early as possible.
 * Experience clips load from <video preload="auto"> after the hero is ready.
 */
export default function HomeVideoPreload() {
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

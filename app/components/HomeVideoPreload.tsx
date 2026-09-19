"use client";

import { useEffect } from "react";
import {
  HOME_HERO_DESKTOP_VIDEO,
  HOME_HERO_MOBILE_VIDEO,
} from "../lib/home-videos";

/**
 * Preload hero videos via document.head outside the React tree so Next.js
 * hydration / client navigations are not disrupted by body <link> nodes.
 */
export default function HomeVideoPreload() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    const add = (href: string, media: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = href;
      link.type = "video/webm";
      link.media = media;
      document.head.appendChild(link);
      links.push(link);
    };

    add(HOME_HERO_DESKTOP_VIDEO, "(min-width: 768px)");
    add(HOME_HERO_MOBILE_VIDEO, "(max-width: 767px)");

    return () => {
      for (const link of links) link.remove();
    };
  }, []);

  return null;
}

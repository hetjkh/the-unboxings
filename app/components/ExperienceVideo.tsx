"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_READY_EVENT, isHeroVideoReady } from "./site-loader-events";

type ExperienceVideoProps = {
  src: string;
  label: string;
};

export default function ExperienceVideo({ src, label }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [heroReady, setHeroReady] = useState(() => isHeroVideoReady());

  useEffect(() => {
    if (heroReady) return;
    const onReady = () => setHeroReady(true);
    window.addEventListener(HERO_VIDEO_READY_EVENT, onReady, { once: true });
    return () => window.removeEventListener(HERO_VIDEO_READY_EVENT, onReady);
  }, [heroReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible) setShouldLoad(true);
        if (!visible) video.pause();
      },
      { rootMargin: "280px", threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // After hero is ready, preload nearby experience clips even before they enter view.
  useEffect(() => {
    if (heroReady) setShouldLoad(true);
  }, [heroReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const onReady = () => setReady(true);
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 3) onReady();

    if (inView) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
    };
  }, [shouldLoad, inView]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload={shouldLoad ? "auto" : "none"}
      className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-500 group-hover:scale-105 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

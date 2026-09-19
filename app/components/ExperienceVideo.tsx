"use client";

import { useEffect, useRef, useState } from "react";

type ExperienceVideoProps = {
  src: string;
  label: string;
};

/**
 * Load each clip only when near the viewport — avoids loading all four
 * full videos at once (which can OOM the tab on cold loads).
 */
export default function ExperienceVideo({ src, label }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

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
      { rootMargin: "200px", threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
      preload={shouldLoad ? "metadata" : "none"}
      className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-500 group-hover:scale-105 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

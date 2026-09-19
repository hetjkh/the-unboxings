"use client";

import { useEffect, useRef, useState } from "react";
import { getCachedVideoSrc, preloadVideo, subscribeVideoSrc } from "../lib/video-cache";

type ExperienceVideoProps = {
  src: string;
  label: string;
};

export default function ExperienceVideo({ src, label }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackSrc, setPlaybackSrc] = useState<string | undefined>(() => getCachedVideoSrc(src));
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const cached = getCachedVideoSrc(src);
    if (cached) setPlaybackSrc(cached);

    const unsubscribe = subscribeVideoSrc(src, setPlaybackSrc);
    void preloadVideo(src).then(setPlaybackSrc);
    return unsubscribe;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (!visible) {
          video.pause();
          return;
        }
        if (video.src) {
          video.play().catch(() => {
            // Autoplay may be blocked until user interaction.
          });
        }
      },
      { rootMargin: "200px", threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackSrc || !inView) return;
    video.play().catch(() => {
      // Autoplay may be blocked until user interaction.
    });
  }, [playbackSrc, inView]);

  return (
    <video
      ref={videoRef}
      src={playbackSrc}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload={playbackSrc ? "auto" : "none"}
      className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-500 group-hover:scale-105 ${
        playbackSrc ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

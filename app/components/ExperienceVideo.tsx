"use client";

import { useEffect, useRef, useState } from "react";

type ExperienceVideoProps = {
  src: string;
  label: string;
};

export default function ExperienceVideo({ src, label }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }

        setShouldLoad(true);
        video.play().catch(() => {
          // Autoplay may be blocked until user interaction.
        });
      },
      { rootMargin: "120px", threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
    />
  );
}

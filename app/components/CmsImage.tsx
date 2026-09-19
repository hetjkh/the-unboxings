"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

function isRemoteSrc(src: ImageProps["src"]) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

type CmsImageProps = ImageProps & {
  /** Soft gray wash behind the image while it loads */
  showPlaceholder?: boolean;
};

/**
 * CMS / Blob images are already on a CDN. Skip Sharp re-optimization for remotes
 * (avoids OOM on big collections). Local paths still use Next Image optimization.
 * Fades in once decoded for a smoother grid load.
 */
export default function CmsImage({
  src,
  alt,
  unoptimized,
  className = "",
  showPlaceholder = true,
  onLoad,
  ...props
}: CmsImageProps) {
  const [loaded, setLoaded] = useState(false);
  const remote = isRemoteSrc(src);

  return (
    <>
      {showPlaceholder && !loaded ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-[#f0eeea]"
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        unoptimized={unoptimized ?? remote}
        decoding="async"
        className={`transition-[opacity,transform] duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        {...props}
      />
    </>
  );
}

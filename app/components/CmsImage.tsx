"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

function isRemoteSrc(src: ImageProps["src"]) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

type CmsImageProps = ImageProps & {
  /** Soft wash behind the image while it loads */
  showPlaceholder?: boolean;
};

/**
 * Soft fade-in for CMS / grid images. Optimization is off globally in next.config
 * (avoids Vercel Image Optimization 402 quota). Remotes stay unoptimized explicitly.
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
          className="absolute inset-0 animate-pulse bg-white"
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

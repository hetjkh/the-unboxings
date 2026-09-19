import Image, { type ImageProps } from "next/image";

function isRemoteSrc(src: ImageProps["src"]) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

/**
 * CMS / Blob images are already on a CDN. Re-running them through Next's
 * Sharp optimizer for every product in a collection OOMs the dev server
 * and leaves many images blank. Serve remotes as-is; keep local paths optimized.
 */
export default function CmsImage({ src, alt, unoptimized, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={unoptimized ?? isRemoteSrc(src)}
      {...props}
    />
  );
}

import type { NextConfig } from "next";

/** 31 days — Vercel Image Optimization max recommended TTL */
const IMAGE_CACHE_TTL = 60 * 60 * 24 * 31;

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF is slower to encode on first transform (cold cache)
    formats: ["image/webp"],
    // Keep optimized variants on the Vercel CDN for a full month
    minimumCacheTTL: IMAGE_CACHE_TTL,
    // Limit quality variants (Next 16 requires an allowlist)
    qualities: [75],
    // Fewer widths = fewer unique transformations to generate/cache
    deviceSizes: [640, 750, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap", "lenis"],
  },
  async headers() {
    return [
      {
        // Static site images — long CDN/browser cache; allow refresh after TTL
        source: "/:path*\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${IMAGE_CACHE_TTL}, stale-while-revalidate=86400`,
          },
        ],
      },
      {
        // Uploaded files use unique names — safe to cache immutably
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${IMAGE_CACHE_TTL}, immutable`,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/women", destination: "/products", permanent: true },
      { source: "/handbags", destination: "/products", permanent: true },
      { source: "/gifts/graduation", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;

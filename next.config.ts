import type { NextConfig } from "next";

/** 31 days — Vercel Image Optimization max recommended TTL */
const IMAGE_CACHE_TTL = 60 * 60 * 24 * 31;

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  images: {
    // Bypass Vercel Image Optimization — Hobby/pro quota 402s break /_next/image.
    // Assets are already WebP (upload pipeline + public/); serve them as static files.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
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
        source: "/:path*\\.:extension(jpg|jpeg|png|webp|avif|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${IMAGE_CACHE_TTL}, stale-while-revalidate=86400`,
          },
        ],
      },
      {
        // Hero + experience videos — long CDN/browser cache
        source: "/:path*\\.:extension(webm|mp4)",
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

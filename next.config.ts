import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [64, 128, 256, 384, 512],
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
  async redirects() {
    return [
      { source: "/women", destination: "/products", permanent: true },
      { source: "/handbags", destination: "/products", permanent: true },
      { source: "/gifts/graduation", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;

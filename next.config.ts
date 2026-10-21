import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; Vercel handles the optimization at the edge.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

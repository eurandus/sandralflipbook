import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are resized for each screen so the book loads quickly.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;

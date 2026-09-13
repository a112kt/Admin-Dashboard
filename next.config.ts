import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output bundles only required node_modules for minimal Docker image
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

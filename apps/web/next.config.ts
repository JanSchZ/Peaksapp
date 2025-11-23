import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@peaks/ui", "@peaks/core"],
};

export default nextConfig;

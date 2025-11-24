/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@peaks/ui", "@peaks/core"],
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@peaks/ui", "@peaks/core"],
  reactCompiler: true,
};

export default nextConfig;

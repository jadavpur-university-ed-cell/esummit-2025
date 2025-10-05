import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "media.licdn.com"],  // <-- add any external hosts here
  },
};

export default nextConfig;

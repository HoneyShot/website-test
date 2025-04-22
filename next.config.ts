import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  allowedDevOrigins: ['http://192.168.1.103:3000']
};

export default nextConfig;

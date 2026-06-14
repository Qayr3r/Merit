import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Thêm dòng này để Next.js xuất ra HTML tĩnh
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

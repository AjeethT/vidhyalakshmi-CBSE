/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.vidhyalakshmi.cus.firrham.com',
      },
    ],
  },
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;

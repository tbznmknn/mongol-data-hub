// import { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'bondmarket.mn',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'gobideluxe.mn',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5021'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: ''
      },
      {
        protocol: 'https', // ✅ Add Pixabay
        hostname: 'cdn.pixabay.com',
        port: ''
      },
      {
        protocol: 'http', // ✅ Add Pixabay
        hostname: '103.168.56.92',
        port: ''
      },
      {
        protocol: 'https', // ✅ Add Pixabay
        hostname: 'cdn.pixabay.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist']
};

export default withNextIntl(nextConfig);

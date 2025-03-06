import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sgtm-worker.emmanuelowouko.workers.dev https://www.googletagmanager.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://flagcdn.com https://illustrations.popsy.co http://images.ctfassets.net https://*.ctfassets.net; connect-src 'self' https://sgtm-worker.emmanuelowouko.workers.dev https://www.googletagmanager.com;"
              : "default-src 'self'; script-src 'self' https://sgtm-worker.emmanuelowouko.workers.dev https://www.googletagmanager.com https://va.vercel-scripts.com; style-src 'self'; img-src 'self' data: https://flagcdn.com https://illustrations.popsy.co http://images.ctfassets.net https://*.ctfassets.net; connect-src 'self' https://sgtm-worker.emmanuelowouko.workers.dev https://www.googletagmanager.com;",
          },
        ]
      }
    ]
  }
};

export default nextConfig;

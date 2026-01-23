import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Extract CDN hostname from environment variable
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
const cdnHostname = cdnUrl ? new URL(cdnUrl).hostname : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Active: Payment page flag icons
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      // Active: Payment page cryptocurrency icons
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      // Active: CDN for hero banner, service gradients, portfolio mockups
      // Configured via NEXT_PUBLIC_CDN_URL environment variable
      ...(cdnHostname ? [{
        protocol: 'https' as const,
        hostname: cdnHostname,
      }] : []),
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'next-intl'],
  },
  // Performance optimizations
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com https://*.vercel-insights.com https://www.googletagmanager.com https://analytics.dreeeams.com https://app.cal.com https://app.chatwoot.com; style-src 'self' 'unsafe-inline' https://app.chatwoot.com; img-src 'self' data: https: blob:; font-src 'self' data: https://app.chatwoot.com; connect-src 'self' https://vercel.live https://va.vercel-scripts.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://twenty-production-25cf.up.railway.app https://www.google-analytics.com https://www.googletagmanager.com https://analytics.dreeeams.com https://app.cal.com https://app.chatwoot.com https://cdn.jsdelivr.net https://images.ctfassets.net https://cdn.worldvectorlogo.com https://api.pirsch.io https://hooks.zapier.com wss://app.chatwoot.com; frame-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
          }
        ]
      },
      // Cache static assets (images, fonts, etc.)
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache Next.js static files
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache favicon and manifest
      {
        source: '/(favicon.ico|icon.svg|apple-icon.png|manifest.webmanifest)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ]
  }
};

export default bundleAnalyzer(withNextIntl(nextConfig));

import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

const ztHoky = localFont({
  src: [
    {
      path: '../public/fonts/ZTHoky-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-nostalgic',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com'),
  title: 'Dream Studio - Web & App Development Studio',
  description:
    'We build stunning websites, mobile apps, and digital experiences. Custom software development with cutting-edge design.',
  keywords: [
    'web development',
    'mobile apps',
    'software development',
    'UI/UX design',
    'tech consulting',
  ],
  authors: [{ name: 'Dream Studio' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E8E4DC' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical resource preloading */}
        <link rel="preload" href="/fonts/ZTHoky-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" fetchPriority="high" />

        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="https://cal.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Critical preconnects */}
        {cdnUrl && <link rel="preconnect" href={cdnUrl} crossOrigin="anonymous" />}
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${ztHoky.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

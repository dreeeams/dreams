/**
 * REFERENCE: Updated Root Layout with LazyMotion
 *
 * This file shows how to integrate LazyMotion into the existing layout.tsx.
 * Copy the LazyMotion import and wrap your layout children with it.
 *
 * Current location: /app/layout.tsx
 * You only need to:
 * 1. Add the import statement
 * 2. Wrap {children} with LazyMotion component
 *
 * NO OTHER CHANGES NEEDED to existing components!
 */

import { LazyMotion, domAnimation } from 'framer-motion';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com'),
  title: 'Dreeeams - Web & App Development Studio',
  description:
    'We build stunning websites, mobile apps, and digital experiences. Custom software development with cutting-edge design.',
  keywords: [
    'web development',
    'mobile apps',
    'software development',
    'UI/UX design',
    'tech consulting',
  ],
  authors: [{ name: 'Dreeeams' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E8E4DC' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}

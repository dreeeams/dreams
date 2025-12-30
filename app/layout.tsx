import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tech Agency - Web & App Development Studio',
  description:
    'We build stunning websites, mobile apps, and digital experiences. Custom software development with cutting-edge design.',
  keywords: [
    'web development',
    'mobile apps',
    'software development',
    'UI/UX design',
    'tech consulting',
  ],
  authors: [{ name: 'Tech Agency' }],
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
  return children;
}

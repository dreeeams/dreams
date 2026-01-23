'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

  return (
    <div className="relative w-full h-screen">
      {/* SEO H1 - Visually hidden but available for screen readers and SEO */}
      <h1 className="sr-only">
        {t('seoHeading')}
      </h1>

      {/* Hero Banner GIF as Background */}
      <Image
        src={`${cdnUrl}/storage/v1/object/public/content/hero_banner.gif`}
        alt="Dream Studio Hero Banner"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        unoptimized
      />

      {/* Hero Title with Blend Mode */}
      <div className="absolute inset-0 flex items-center justify-center">
        <m.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nostalgic text-white mix-blend-difference px-8 text-center leading-tight tracking-wider"
        >
          {t('tagline')}
        </m.h2>
      </div>
    </div>
  );
}

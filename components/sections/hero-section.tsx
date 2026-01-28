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
        quality={85}
      />

      {/* Hero Content with Blend Mode */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white mix-blend-difference px-8 text-center">
        <m.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] mb-4 uppercase"
        >
          {t('tagline')}
        </m.span>
        <m.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic leading-tight tracking-wider max-w-4xl"
        >
          {t('title')}
        </m.h2>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cdnAssetUrl } from '@/lib/constants';

export default function HeroSection() {
  const t = useTranslations('hero');
  const heroSrc = cdnAssetUrl('hero_banner.gif');

  return (
    <div className="relative w-full h-screen">
      {/* SEO H1 - Visually hidden but available for screen readers and SEO */}
      <h1 className="sr-only">
        {t('seoHeading')}
      </h1>

      {/* Hero Banner GIF as Background */}
      {heroSrc && (
        <Image
          src={heroSrc}
          alt="Dreeeams Hero Banner"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
      )}

      {/* Hero Text — keeps mix-blend-difference for editorial feel */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white mix-blend-difference px-8 text-center pb-32">
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
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic leading-tight tracking-wider max-w-4xl line-clamp-2"
        >
          {t('title')}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg font-mono tracking-wide mt-6 max-w-2xl drop-shadow-sm"
        >
          {t('subtitle')}
        </m.p>
      </div>

      {/* CTA Cluster — isolated from blend mode, with its own backdrop for legibility */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex items-center gap-6 px-8 py-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm">
          <Link
            href="/start"
            className="px-8 py-3.5 text-sm font-medium tracking-wider bg-white text-black hover:bg-white/90 transition-colors duration-300"
          >
            {t('buttons.startProject')} →
          </Link>
          <a
            href="#work"
            className="text-sm font-mono tracking-wider text-white/80 hover:text-white border-b border-white/30 hover:border-white/70 pb-0.5 transition-all duration-300"
          >
            {t('buttons.viewWork')} ↓
          </a>
        </div>
      </m.div>
    </div>
  );
}

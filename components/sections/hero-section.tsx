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

      {/* Hero content cluster — single centered flex column */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10">
        {/* Text group — mix-blend-difference for editorial feel */}
        <div className="mix-blend-difference text-white max-w-3xl">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] mb-4 uppercase"
          >
            {t('tagline')}
          </m.span>
          <m.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic leading-tight tracking-wider"
          >
            {t('title')}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg font-mono tracking-wide mt-6 drop-shadow-sm"
          >
            {t('subtitle')}
          </m.p>
        </div>

        {/* CTA cluster — outside blend mode, in natural flow below text */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10"
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
    </div>
  );
}

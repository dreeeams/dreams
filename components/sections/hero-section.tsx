'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cdnAssetUrl } from '@/lib/constants';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

const ShaderAnimation = dynamic(
  () => import('@/components/ui/shader-animation'),
  { ssr: false }
);

export default function HeroSection() {
  const t = useTranslations('hero');
  const heroSrc = cdnAssetUrl('hero_banner.gif');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const showShader = isDesktop && !prefersReducedMotion;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* SEO H1 - Visually hidden but available for screen readers and SEO */}
      <h1 className="sr-only">
        {t('seoHeading')}
      </h1>

      {/* Layer 1: GIF background — always present as base/fallback */}
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

      {/* Layer 2: Shader background — desktop only, respects reduced motion */}
      {showShader && (
        <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
          <ShaderAnimation className="w-full h-full" />
        </div>
      )}

      {/* Layer 3: Readability overlay */}
      <div className="absolute inset-0 z-[2] bg-black/40 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Layer 4: Hero content — unchanged */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-white mix-blend-difference px-8 text-center">
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
          className="text-xs sm:text-sm font-mono tracking-wide mt-6 opacity-80"
        >
          {t('subtitle')}
        </m.p>
      </div>
    </div>
  );
}

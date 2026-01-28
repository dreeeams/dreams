'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function ManifestoSection() {
  const t = useTranslations('manifesto');
  const tNav = useTranslations('nav');

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Manifesto Text */}
        <div className="font-nostalgic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight text-white text-center mb-12">
          {t('weAre')}{' '}
          <span className="inline-block align-baseline translate-y-[12%]">
            <Logo className="h-[0.85em] w-auto" fill="white" />
          </span>
          , {t('description')}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/contact">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-base md:text-lg font-medium text-black bg-white hover:bg-gray-200 border border-white transition-colors"
            >
              {tNav('getStarted')} →
            </m.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

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
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-nostalgic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight text-white text-center mb-12"
        >
          {t('weAre')}{' '}
          <span className="inline-block align-baseline translate-y-[12%]">
            <Logo className="h-[0.85em] w-auto" fill="white" />
          </span>
          , {t('description')}
        </m.div>

        {/* Proof Points */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12"
        >
          {(t.raw('proofPoints') as string[]).map((point: string, index: number) => (
            <span key={index} className="text-sm font-mono tracking-wider text-white/60">
              {point}{index < (t.raw('proofPoints') as string[]).length - 1 && <span className="ml-4 md:ml-8">·</span>}
            </span>
          ))}
        </m.div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/start">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-base md:text-lg font-medium text-black bg-white hover:bg-surface-light-1 border border-white transition-colors"
            >
              {tNav('getStarted')} →
            </m.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

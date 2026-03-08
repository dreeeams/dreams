'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Link from 'next/link';

export default function ManifestoSection() {
  const t = useTranslations('manifesto');
  const tNav = useTranslations('nav');

  const principles = t.raw('principles') as { title: string; description: string }[];
  const introContrast = t.raw('introContrast') as string[];

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-nostalgic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight text-white text-center mb-16"
        >
          {t('headline')}
        </m.h2>

        {/* Intro block */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center"
        >
          <p className="text-base md:text-lg leading-relaxed text-white/70 mb-6">
            {t('intro')}
          </p>
          <div className="space-y-1 mb-6">
            {introContrast.map((line, i) => (
              <p key={i} className="text-sm font-mono tracking-wider text-white/40">
                {line}
              </p>
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed text-white/70">
            {t('introClose')}
          </p>
        </m.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
          {principles.map((principle, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-white/10 pt-6"
            >
              <h3 className="text-lg md:text-xl font-nostalgic font-bold text-white mb-2">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {principle.description}
              </p>
            </m.div>
          ))}
        </div>

        {/* Closing line + CTA */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-base md:text-lg font-mono tracking-wide text-white/60 mb-10">
            {t('closing')}
          </p>
          <Link href="/start">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-base md:text-lg font-medium text-black bg-white hover:bg-surface-light-1 border border-white transition-colors"
            >
              {tNav('getStarted')} →
            </m.button>
          </Link>
        </m.div>
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

const milestones = ['2023', '2024', '2025', '2026'] as const;

export default function TimelineSection() {
  const t = useTranslations('timeline');

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nostalgic max-w-4xl leading-tight mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base font-mono tracking-widest text-muted-foreground">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {milestones.map((year, index) => (
            <m.div
              key={year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-t border-black/10 pt-8 pb-10 pr-8"
            >
              <span className="block text-sm font-mono tracking-wider text-black/30 mb-4">
                {year}
              </span>
              <h3 className="text-xl md:text-2xl font-nostalgic font-bold tracking-tight mb-3">
                {t(`items.${year}.phase`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                {t(`items.${year}.description`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

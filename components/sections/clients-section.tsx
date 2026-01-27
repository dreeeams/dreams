'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ClientsSection() {
  const t = useTranslations('clients');

  const clientTypes = [
    'nonprofits',
    'smallBusinesses',
    'startups',
    'eventPlanners',
    'ecommerce',
    'agencies',
    'personalBrands',
  ];

  return (
    <section className="relative z-10 py-16 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Small Badge */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-4 py-1.5 border border-black/20">
            <p className="text-xs font-medium tracking-wider uppercase text-black/60">
              {t('badge')}
            </p>
          </div>
        </m.div>

        {/* Client Types - Inline */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-center"
        >
          {clientTypes.map((type, index) => (
            <span key={type} className="text-base md:text-lg font-nostalgic text-black/80">
              {t(type)}
              {index < clientTypes.length - 1 && (
                <span className="mx-2 md:mx-3 text-red-500">•</span>
              )}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  );
}

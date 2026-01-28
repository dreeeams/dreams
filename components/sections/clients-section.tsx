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
      <div className="max-w-5xl mx-auto">
        {/* Small Badge */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 border border-black/20">
            <p className="text-xs font-medium tracking-wider uppercase text-black/60">
              {t('badge')}
            </p>
          </div>
        </m.div>

        {/* Client Types - Pills */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {clientTypes.map((type) => (
            <m.div
              key={type}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="px-5 py-2.5 border border-black/10 hover:border-black/30 hover:bg-black/5 transition-colors"
            >
              <span className="text-sm md:text-base font-medium text-black/80">
                {t(type)}
              </span>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

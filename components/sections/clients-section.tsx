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
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-background-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 border border-black/20 mb-8">
            <p className="text-sm font-medium tracking-wider uppercase">
              {t('badge')}
            </p>
          </div>
        </m.div>

        {/* Client Types Grid */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-center"
        >
          {clientTypes.map((type, index) => (
            <m.div
              key={type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-black/90">
                {t(type)}
                {index < clientTypes.length - 1 && (
                  <span className="mx-3 md:mx-4 text-red-500 not-italic">•</span>
                )}
              </h3>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

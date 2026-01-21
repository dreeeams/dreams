'use client';

import { useTranslations } from 'next-intl';

export default function SocialProofSection() {
  const t = useTranslations('socialProof');

  const metrics = [
    {
      value: t('metrics.tickets.value'),
      label: t('metrics.tickets.label'),
    },
    {
      value: t('metrics.visits.value'),
      label: t('metrics.visits.label'),
    },
    {
      value: t('metrics.downloads.value'),
      label: t('metrics.downloads.label'),
    },
    {
      value: t('metrics.rating.value'),
      label: t('metrics.rating.label'),
    },
  ];

  return (
    <section id="social-proof" className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          {t('title')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200"
            >
              <div className="text-3xl md:text-5xl font-bold mb-2 font-mono">
                {metric.value}
              </div>
              <div className="text-sm md:text-base font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

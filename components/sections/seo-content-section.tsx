'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function SeoContentSection() {
  const t = useTranslations('seoContent');

  return (
    <section className="relative z-10 py-16 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* SEO-rich content with H1 keyword integration */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('heading')}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('paragraph1')}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('paragraph2')}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-8">
              {t('whyChooseHeading')}
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('paragraph3')}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('paragraph4')}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-8">
              {t('expertiseHeading')}
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('paragraph5')}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Code2, Smartphone, Zap } from 'lucide-react';

export default function SeoContentSection() {
  const t = useTranslations('seoContent');

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-nostalgic mb-6" style={{ letterSpacing: '-0.04em' }}>
            {t('heading')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              {t('paragraph1')}
            </p>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              {t('paragraph2')}
            </p>
          </div>
        </m.div>

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Why Choose Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/10 p-8 bg-white/5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-white/10 border border-white/20">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-nostalgic mt-2" style={{ letterSpacing: '-0.04em' }}>
                {t('whyChooseHeading')}
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {t('paragraph3')}
              </p>
            </div>
          </m.div>

          {/* Mobile App Development Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 p-8 bg-white/5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-white/10 border border-white/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-nostalgic mt-2" style={{ letterSpacing: '-0.04em' }}>
                Mobile Apps
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                {t('paragraph4')}
              </p>
            </div>
          </m.div>
        </div>

        {/* Expertise Section - Full Width */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border border-white/10 p-8 md:p-12 bg-white/5 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/10 border border-white/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-nostalgic mt-2" style={{ letterSpacing: '-0.04em' }}>
              {t('expertiseHeading')}
            </h3>
          </div>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-5xl">
            {t('paragraph5')}
          </p>
        </m.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/sections/footer-section';
import SkipToContent from '@/components/skip-to-content';
import CustomCursor from '@/components/custom-cursor';

export default function DisenoUIUXPage() {
  const t = useTranslations('uiuxPage');

  const processSteps = [
    {
      number: '01',
      key: 'research',
    },
    {
      number: '02',
      key: 'wireframe',
    },
    {
      number: '03',
      key: 'design',
    },
    {
      number: '04',
      key: 'prototype',
    },
    {
      number: '05',
      key: 'handoff',
    },
  ];

  const tools = [
    { key: 'figma', icon: '🎨' },
    { key: 'sketch', icon: '✏️' },
    { key: 'adobe', icon: '🔷' },
    { key: 'principle', icon: '⚡' },
    { key: 'userTesting', icon: '👥' },
    { key: 'analytics', icon: '📊' },
  ];

  const principles = [
    { key: 'userFirst', icon: '👤' },
    { key: 'simplicity', icon: '⚡' },
    { key: 'consistency', icon: '🎯' },
    { key: 'accessibility', icon: '♿' },
    { key: 'dataInformed', icon: '📈' },
    { key: 'iterative', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-background-light cursor-none">
      <CustomCursor />
      <SkipToContent />
      <Navigation />

      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-nostalgic mb-8">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-foreground-light/80">
                {t('hero.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-24 px-6 md:px-12 bg-surface-light-1">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic mb-6">
                {t('process.title')}
              </h2>
              <p className="text-base md:text-lg text-foreground-light/70 max-w-2xl mx-auto">
                {t('process.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-24">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  {/* Number */}
                  <div className="text-brand text-6xl md:text-7xl font-mono font-bold mb-4 opacity-40">
                    [{step.number}]
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-sans tracking-tight">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed text-foreground-light/70">
                    {t(`process.steps.${step.key}.description`)}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-6 h-1 w-20 bg-black group-hover:w-40 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Methods Section */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic mb-6">
                {t('tools.title')}
              </h2>
              <p className="text-base md:text-lg text-foreground-light/70 max-w-2xl mx-auto">
                {t('tools.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white border-2 border-black p-8 hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold mb-2 font-pixel">
                    {t(`tools.items.${tool.key}.title`)}
                  </h3>
                  <p className="text-sm opacity-70">
                    {t(`tools.items.${tool.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="py-24 px-6 md:px-12 bg-surface-light-1">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic mb-6">
                {t('principles.title')}
              </h2>
              <p className="text-base md:text-lg text-foreground-light/70 max-w-2xl mx-auto">
                {t('principles.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-black p-8 group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-xl font-bold mb-3 font-sans">
                    {t(`principles.items.${principle.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-light/70">
                    {t(`principles.items.${principle.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-nostalgic mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg md:text-xl mb-12 opacity-80">
                {t('cta.subtitle')}
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 bg-brand text-white border-2 border-white font-bold text-base hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                {t('cta.button')}
              </motion.a>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
}

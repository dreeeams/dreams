'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SplitText } from '@/components/ui/animated-text';
import BentoGrid from '@/components/ui/bento-grid-01';

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
    },
    {
      number: '02',
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
    },
    {
      number: '03',
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
    },
    {
      number: '04',
      titleKey: 'consulting.title',
      descriptionKey: 'consulting.description',
    },
  ];

  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center">
              <SplitText text={t('title')} delay={0.2} />
            </h2>
          </div>
        </motion.div>

        {/* Services Grid - Minimalista con Números */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-24 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
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
              {/* Número */}
              <div className="text-brand text-6xl md:text-7xl font-mono font-bold mb-4 opacity-40">
                [{service.number}]
              </div>

              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-sans tracking-tight">
                {t(service.titleKey)}
              </h3>

              {/* Descripción */}
              <p className="text-base md:text-lg leading-relaxed text-foreground-light/70">
                {t(service.descriptionKey)}
              </p>

              {/* Línea decorativa */}
              <div className="mt-6 h-1 w-20 bg-black group-hover:w-40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <BentoGrid />
        </div>
      </div>
    </section>
  );
}

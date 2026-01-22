'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BentoGrid from '@/components/ui/bento-grid-01';

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=800&fit=crop&q=80',
    },
    {
      number: '02',
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
      image: 'https://eeyjhkhrdoouapuilwep.supabase.co/storage/v1/object/public/content/green_gradient.jpeg',
    },
    {
      number: '03',
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&h=800&fit=crop&q=80',
    },
  ];

  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center">
              {t('title')}
            </h2>
          </div>
        </m.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <m.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              className="group relative h-[600px] overflow-hidden"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-500" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white z-10">
                {/* Número */}
                <div className="text-white/40 text-5xl md:text-6xl font-mono font-bold mb-4">
                  [{service.number}]
                </div>

                {/* Título */}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 font-nostalgic tracking-tight">
                  {t(service.titleKey)}
                </h3>

                {/* Descripción */}
                <p className="text-base md:text-lg leading-relaxed text-white/90 mb-6">
                  {t(service.descriptionKey)}
                </p>

                {/* Línea decorativa */}
                <div className="h-1 w-20 bg-white group-hover:w-40 transition-all duration-500" />
              </div>
            </m.div>
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

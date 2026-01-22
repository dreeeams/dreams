'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
      image: 'https://eeyjhkhrdoouapuilwep.supabase.co/storage/v1/object/public/content/red_gradient.jpeg',
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
      image: 'https://eeyjhkhrdoouapuilwep.supabase.co/storage/v1/object/public/content/blue_gradient.jpeg',
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center" style={{ letterSpacing: '-0.04em' }}>
              {t('title')}
            </h2>
          </div>
        </m.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500" />

              {/* Content */}
              <div className="relative h-full flex flex-col p-8 text-white z-10">
                {/* Top Section - Número y Título pegados arriba */}
                <div className="mb-auto">
                  {/* Subtítulo (Número) */}
                  <p className="text-sm md:text-base text-white/70 mb-2">
                    {service.number}
                  </p>

                  {/* Título */}
                  <h3 className="text-3xl md:text-4xl font-bold font-nostalgic tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                </div>

                {/* Bottom Section - Descripción y Features abajo */}
                <div className="mt-auto">
                  {/* Descripción */}
                  <p className="text-base md:text-lg leading-relaxed text-white/90 mb-6 font-nostalgic">
                    {t(service.descriptionKey)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 font-nostalgic">
                    {t.raw(`${service.titleKey.split('.')[0]}.features`).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-sm md:text-base text-white/90">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Línea decorativa */}
                  <div className="h-1 w-20 bg-white group-hover:w-40 transition-all duration-500" />
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

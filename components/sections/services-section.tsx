'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesSection() {
  const t = useTranslations('services');
  const tClients = useTranslations('clients');
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
      image: `${cdnUrl}/storage/v1/object/public/content/red_gradient.jpeg`,
      link: '/web-development',
    },
    {
      number: '02',
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
      image: `${cdnUrl}/storage/v1/object/public/content/green_gradient.jpeg`,
      link: '/mobile-development',
    },
    {
      number: '03',
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
      image: `${cdnUrl}/storage/v1/object/public/content/blue_gradient.jpeg`,
      link: '/ai-solutions',
    },
  ];

  const clientTypes = [
    'nonprofits',
    'smallBusinesses',
    'startups',
    'eventPlanners',
    'ecommerce',
    'agencies',
    'personalBrands',
    'construction',
    'restaurants',
    'healthcare',
    'realestate',
    'education',
    'fitness',
    'consultants',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nostalgic max-w-4xl leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
            {t('subtitle')}
          </h2>
          <p className="text-sm md:text-base font-mono tracking-widest text-gray-500">
            {t('title')}
          </p>
        </m.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {services.map((service, index) => (
            <Link key={service.titleKey} href={service.link}>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="group relative h-[600px] overflow-hidden cursor-pointer"
              >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                fill
                loading="lazy"
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
                  <p className="text-sm md:text-base text-muted mb-2">
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
                  <p className="text-base md:text-lg leading-relaxed text-tertiary mb-6 font-nostalgic">
                    {t(service.descriptionKey)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 font-nostalgic">
                    {t.raw(`${service.titleKey.split('.')[0]}.features`).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-sm md:text-base text-tertiary">
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
            </Link>
          ))}
        </div>

        {/* Who we love to work with */}
        <div style={{ marginTop: '80px' }}>
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
                {tClients('badge')}
              </p>
            </div>
          </m.div>

          {/* Client Types - Pills */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
          >
            {clientTypes.map((type) => (
              <m.div
                key={type}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="px-5 py-2.5 border border-black/10 hover:border-black/30 hover:bg-black/5 transition-colors"
              >
                <span className="text-sm md:text-base font-medium text-black/80">
                  {tClients(type)}
                </span>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

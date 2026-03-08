'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { cdnAssetUrl } from '@/lib/constants';

export default function ServicesSection() {
  const t = useTranslations('services');
  const tClients = useTranslations('clients');

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
      image: cdnAssetUrl('red_gradient.jpeg'),
      link: '/web-development',
    },
    {
      number: '02',
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
      image: cdnAssetUrl('green_gradient.jpeg'),
      link: '/mobile-development',
    },
    {
      number: '03',
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
      image: cdnAssetUrl('blue_gradient.jpeg'),
      link: '/ai-solutions',
    },
  ];

  const clientTypes = [
    'startups',
    'ecommerce',
    'agencies',
    'eventPlanners',
    'smallBusinesses',
    'personalBrands',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nostalgic max-w-4xl leading-tight mb-4 tracking-tight">
            {t('subtitle')}
          </h2>
          <p className="text-sm md:text-base font-mono tracking-widest text-muted-foreground">
            {t('title')}
          </p>
        </m.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
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
                whileHover={{ y: -8 }}
                className="group relative min-h-[500px] overflow-hidden cursor-pointer transition-shadow duration-500 shadow-lg hover:shadow-2xl"
              >
              {/* Top highlight line — reveals on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-white/0 group-hover:bg-white/60 transition-colors duration-500 z-20" />

              {/* Background Image */}
              {service.image ? (
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-black" />
              )}

              {/* Overlay — deeper on hover for contrast */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

              {/* Glass surface on hover */}
              <div className="absolute inset-0 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-500" />

              {/* Content */}
              <div className="relative h-full flex flex-col p-8 text-white z-10">
                {/* Top Section */}
                <div className="mb-auto">
                  <p className="text-sm md:text-base text-white/50 group-hover:text-white/70 mb-2 font-mono transition-colors duration-300">
                    {service.number}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold font-nostalgic tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                </div>

                {/* Bottom Section — slides up slightly on hover */}
                <div className="mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-base md:text-lg leading-relaxed text-white/70 group-hover:text-white/90 mb-6 transition-colors duration-300">
                    {t(service.descriptionKey)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {t.raw(`${service.titleKey.split('.')[0]}.features`).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start text-sm md:text-base text-white/60 group-hover:text-white/80 transition-colors duration-300">
                        <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-white/60 group-hover:bg-white flex-shrink-0 transition-colors duration-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Decorative line */}
                  <div className="h-px w-16 bg-white/40 group-hover:w-32 group-hover:bg-white transition-all duration-500" />
                </div>
              </div>
              </m.div>
            </Link>
          ))}
        </div>

        {/* Who we love to work with */}
        <div className="mt-20">
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
              <div
                key={type}
                className="px-5 py-2.5 border border-black/10 hover:border-black/30 hover:bg-black/5 transition-colors"
              >
                <span className="text-sm md:text-base font-medium text-black/80">
                  {tClients(type)}
                </span>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

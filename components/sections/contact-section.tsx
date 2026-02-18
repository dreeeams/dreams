'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="relative z-10 bg-background-light pt-12">
      {/* Contact Section */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center leading-tight" style={{ letterSpacing: '-0.04em' }}>
                {t('title')}
              </h2>
            </div>
            <p className="text-lg md:text-xl mb-4">{t('subtitle')}</p>
          </m.div>

          {/* Botón para agendar reunión */}
          <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-3xl mx-auto text-center"
            >
              <m.a
                href="/start"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 text-lg font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 border-2 border-black shadow-lg group"
              >
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>{t('scheduleCall') || 'Agendar una Reunión'}</span>
              </m.a>
            </m.div>
        </div>
      </div>
    </section>
  );
}

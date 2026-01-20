'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    // Detectar si estamos en localhost
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    setIsLocalhost(isLocal);
  }, []);

  const handleFormSuccess = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    websiteUrl: string;
    projectType: string;
    projectDetails: string;
    howDidYouHear: string;
  }) => {
    // Form successfully submitted - webhook is now called from backend
    console.log('Form submitted successfully');
  };

  return (
    <section id="contact" className="relative z-10 bg-background-light pt-12">
      {/* Contact Section */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center leading-tight">
                {t('title')}
              </h2>
            </div>
            <p className="text-lg md:text-xl mb-4">{t('subtitle')}</p>
            <p className="text-sm text-gray-600">{t('noSpam')}</p>
          </motion.div>

          {/* Conditional rendering: Form in localhost, Button in production */}
          {isLocalhost ? (
            // Mostrar formulario en localhost
            <ContactForm onSuccess={handleFormSuccess} />
          ) : (
            // Mostrar botón para agendar en producción
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-3xl mx-auto text-center"
            >
              <motion.a
                href="https://cal.com/luis-fernandez-ezzzmp/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-12 py-6 text-lg font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 border-2 border-black shadow-lg group"
              >
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>{t('scheduleCall') || 'Agendar una Reunión'}</span>
              </motion.a>

              <p className="text-sm text-gray-600 mt-6">
                {t('callDescription') || 'Agenda una llamada de 30 minutos para hablar sobre tu proyecto'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

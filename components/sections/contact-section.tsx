'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import ContactForm from '@/components/contact-form';
import Cal, { getCalApi } from '@calcom/embed-react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    // Detectar si estamos en localhost
    const hostname = window.location.hostname;
    setIsLocalhost(hostname === 'localhost' || hostname === '127.0.0.1');

    // Inicializar Cal.com embed si NO estamos en localhost
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      (async function () {
        const cal = await getCalApi({ namespace: 'dream-studio-discovery-call' });
        cal('ui', {
          theme: 'light',
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      })();
    }
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

          {/* Conditional rendering: Form in localhost, Cal.com in production */}
          {isLocalhost ? (
            // Mostrar formulario en localhost
            <ContactForm onSuccess={handleFormSuccess} />
          ) : (
            // Mostrar Cal.com embedded en producción
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl mx-auto"
            >
              <Cal
                namespace="dream-studio-discovery-call"
                calLink="dream-studio-sa/dream-studio-discovery-call"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', theme: 'light' }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

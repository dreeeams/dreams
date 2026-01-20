'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/contact-form';

export default function ContactSection() {
  const t = useTranslations('contact');

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

          {/* Contact Form */}
          <ContactForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    </section>
  );
}

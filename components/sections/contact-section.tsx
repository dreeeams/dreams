'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/contact-form';

export default function ContactSection() {
  const t = useTranslations('contact');

  const handleFormSuccess = async (data: {
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
    // Send data to Zapier webhook
    try {
      const fullName = `${data.firstName}${data.lastName ? ' ' + data.lastName : ''}`.trim();

      const zapierData = {
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        websiteUrl: data.websiteUrl,
        projectType: data.projectType,
        projectDetails: data.projectDetails,
        howDidYouHear: data.howDidYouHear,
        submittedAt: new Date().toISOString(),
      };

      await fetch('https://hooks.zapier.com/hooks/catch/26067874/uqb7bzv/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zapierData),
      });

      console.log('Data sent to Zapier successfully');
    } catch (error) {
      console.error('Failed to send data to Zapier:', error);
    }
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

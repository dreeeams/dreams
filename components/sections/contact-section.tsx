'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import ContactForm from '@/components/contact-form';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [showCalendar, setShowCalendar] = useState(false);
  const [prefillData, setPrefillData] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
  }>({});

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#787878" },
          dark: { "cal-brand": "#DEE5ED" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
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
    // Prepare prefill data for Cal.com
    const fullName = `${data.firstName}${data.lastName ? ' ' + data.lastName : ''}`.trim();
    const notes = `Company: ${data.companyName}\nWebsite: ${data.websiteUrl}\nProject Details: ${data.projectDetails}\nHow did you hear about us: ${data.howDidYouHear}`;

    setPrefillData({
      name: fullName,
      email: data.email,
      phone: data.phone,
      notes: notes,
    });

    // Show calendar after form submission
    setShowCalendar(true);
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

          {/* Form or Calendar */}
          {!showCalendar ? (
            <ContactForm onSuccess={handleFormSuccess} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Cal
                calLink="luis-fernandez-ezzzmp/30min"
                style={{ width: "100%", height: "auto" }}
                config={{
                  layout: "month_view",
                  theme: "light",
                  ...(prefillData.name && { name: prefillData.name }),
                  ...(prefillData.email && { email: prefillData.email }),
                  ...(prefillData.phone && { phone: prefillData.phone }),
                  ...(prefillData.notes && { notes: prefillData.notes }),
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

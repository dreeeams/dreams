'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function ContactSection() {
  const t = useTranslations('contact');

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

  return (
    <section id="contact" className="relative z-10 bg-background-light">
      {/* Contact Section */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic">
                ({' '}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic text-center whitespace-nowrap">
                {t('title').toUpperCase()}
              </h2>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic">
                {' '}
                )
              </span>
            </div>
            <p className="text-lg md:text-xl mb-4">{t('subtitle')}</p>
            <p className="text-sm text-gray-600">{t('noSpam')}</p>
          </motion.div>

          {/* Cal.com Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <Cal
              calLink="luis-fernandez-ezzzmp/30min"
              style={{ width: "100%", height: "auto" }}
              config={{ layout: "month_view", theme: "light" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

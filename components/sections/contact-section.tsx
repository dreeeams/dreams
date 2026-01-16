'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import Link from 'next/link';

export default function ContactSection() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('contact.footer');

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1E1E1E' },
          dark: { 'cal-brand': '#DEE5ED' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section id="contact" className="relative z-10 bg-white">
      {/* Contact Section */}
      <div className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic">
                ({' '}
              </span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic text-center">
                {t('title').toUpperCase()}
              </h2>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic">
                {' '}
                )
              </span>
            </div>
            <p className="text-lg md:text-xl mb-4">{t('subtitle')}</p>
            <p className="text-sm text-gray-600">{t('noSpam')}</p>
          </motion.div>

          {/* Cal.com Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              data-cal-namespace="30min"
              data-cal-link="luis-fernandez-ezzzmp/30min"
              data-cal-config='{"layout":"month_view","theme":"light"}'
              className="inline-block bg-black text-white px-8 py-4 text-lg font-bold hover:bg-gray-800 transition-colors"
            >
              {t('title')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-nostalgic mb-4">DREAM STUDIO</h3>
              <p className="text-gray-400 text-sm">{tFooter('tagline')}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">{tFooter('quickLinks')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('services')}
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('portfolio')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">{tFooter('legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    {tFooter('terms')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Dream Studio. {tFooter('rights')}.
            </p>
            <p className="text-sm text-gray-400">
              {tFooter('madeWith')} Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

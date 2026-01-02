'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="relative z-10 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight font-nostalgic whitespace-nowrap px-4">
            {t('title')}
          </h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-4 border-black bg-white p-6 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 font-nostalgic">START YOUR PROJECT</h3>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold mb-2 block">{t('form.name').toUpperCase()}</label>
                <input
                  type="text"
                  className="w-full border-2 border-black bg-white text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-xs font-bold mb-2 block">{t('form.email').toUpperCase()}</label>
                <input
                  type="email"
                  className="w-full border-2 border-black bg-white text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold mb-2 block">PROJECT TYPE</label>
                <select className="w-full border-2 border-black bg-white text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                  <option>Website Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>E-Commerce</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold mb-2 block">{t('form.message').toUpperCase()}</label>
                <textarea
                  rows={4}
                  className="w-full border-2 border-black bg-white text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-black text-white border-2 border-black py-4 font-bold text-sm hover:bg-brand hover:border-brand transition-colors"
              >
                {t('form.submit').toUpperCase()} →
              </motion.button>
            </form>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Email */}
            <motion.div
              whileHover={{ x: 5 }}
              className="border-4 border-black bg-brand p-6 md:p-8 text-white cursor-pointer"
            >
              <p className="text-xs font-bold mb-2">EMAIL US</p>
              <p className="text-xl md:text-2xl font-bold break-all">hello@techagency.com</p>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ x: 5 }}
              className="border-4 border-black bg-black p-6 md:p-8 text-white cursor-pointer"
            >
              <p className="text-xs font-bold mb-2">CALL US</p>
              <p className="text-xl md:text-2xl font-bold">+1 (555) 123-4567</p>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ x: 5 }}
              className="border-4 border-black bg-white p-6 md:p-8"
            >
              <p className="text-xs font-bold mb-2">VISIT US</p>
              <p className="text-xl font-bold">123 Tech Street</p>
              <p className="text-sm text-gray-600 mt-1">San Francisco, CA 94102</p>
            </motion.div>

            {/* Social Links */}
            <div className="grid grid-cols-4 gap-4">
              {['TW', 'LI', 'GH', 'DR'].map((social, i) => (
                <motion.div
                  key={social}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="aspect-square border-2 border-black bg-white flex items-center justify-center font-bold cursor-pointer hover:bg-black hover:text-white transition-colors text-xs sm:text-base"
                >
                  {social}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t-4 border-black pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl md:text-2xl mb-2 font-nostalgic">DREAM STUDIO</h4>
              <p className="text-xs text-gray-600">Building digital experiences since 2019</p>
            </div>

            <div>
              <p className="text-xs font-bold mb-2">QUICK LINKS</p>
              <div className="space-y-1 text-xs">
                <p className="hover:underline cursor-pointer">Services</p>
                <p className="hover:underline cursor-pointer">Portfolio</p>
                <p className="hover:underline cursor-pointer">About</p>
                <p className="hover:underline cursor-pointer">Contact</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold mb-2">LEGAL</p>
              <div className="space-y-1 text-xs">
                <p className="hover:underline cursor-pointer">Privacy Policy</p>
                <p className="hover:underline cursor-pointer">Terms of Service</p>
                <p className="hover:underline cursor-pointer">Cookie Policy</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-600">
            <p>© 2024 Dream Studio. All rights reserved. Built with ❤️ using Next.js & Framer Motion</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('contact.footer');

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
          className="border-t-4 border-black pt-16 mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  width="32"
                  height="37"
                  viewBox="0 0 97 114"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_3_75_animated)">
                    <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor" className="text-black"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_3_75_animated" x="0" y="0" width="96.1645" height="113.29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_75"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_75" result="shape"/>
                    </filter>
                  </defs>
                </svg>
                <h4 className="text-2xl md:text-3xl font-nostalgic">DREAM STUDIO</h4>
              </div>
              <p className="text-sm text-gray-600 max-w-xs">
                {tFooter('tagline')}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                  <motion.div
                    key={social}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors"
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-sm font-bold mb-4">{tFooter('quickLinks').toUpperCase()}</p>
              <div className="space-y-2 text-sm">
                <a href="#services" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('services')}
                </a>
                <a href="#work" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('portfolio')}
                </a>
                <a href="#about" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('about')}
                </a>
                <a href="#contact" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('contact')}
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-sm font-bold mb-4">{tFooter('legal').toUpperCase()}</p>
              <div className="space-y-2 text-sm">
                <p className="hover:text-brand transition-colors cursor-pointer">
                  {tFooter('privacy')}
                </p>
                <p className="hover:text-brand transition-colors cursor-pointer">
                  {tFooter('terms')}
                </p>
                <p className="hover:text-brand transition-colors cursor-pointer">
                  {tFooter('cookies')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t-4 border-black text-center">
            <p className="text-xs text-gray-600">
              © 2024 Dream Studio. {tFooter('rights')}.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

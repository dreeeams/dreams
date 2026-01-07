'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CalEmbed } from '@/components/ui/cal-embed';

export default function ContactSection() {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tFooter = useTranslations('contact.footer');

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    company: '',
    website: '',
    need: '',
    summary: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.company && formData.need) {
      setIsSubmitting(true);
      setError('');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }

        setSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit form');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-nostalgic">
            {t('title').toUpperCase()}
          </h2>
          <p className="text-lg text-gray-600 mb-2">{t('subtitle')}</p>
          <p className="text-sm text-gray-500 font-mono">{t('noSpam')}</p>
        </motion.div>

        {/* 2-Step Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-4 border-black bg-background-light p-8 md:p-12"
              >
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold">
                      {tForm('step')} {step} {tForm('of')} 2 — {step === 1 ? tForm('stepContact') : tForm('stepProject')}
                    </span>
                    <span className="font-mono text-sm text-gray-500">{step === 1 ? '50%' : '100%'}</span>
                  </div>
                  <div className="h-1 bg-gray-200 border border-black">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: '0%' }}
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleContinue}
                      className="space-y-6"
                    >
                      {/* Full Name */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('fullName')} *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="Juan Pérez"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('email')} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="juan@empresa.com"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('whatsapp')}
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="+1 555 123 4567"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-black text-white border-2 border-black py-4 font-bold text-base hover:bg-brand hover:border-brand transition-colors"
                      >
                        {tForm('continue')} →
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Company */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('company')} *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="Mi Startup"
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('website')}
                        </label>
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="www.miempresa.com o @instagram"
                        />
                      </div>

                      {/* Need */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('need')} *
                        </label>
                        <select
                          name="need"
                          required
                          value={formData.need}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="landing">{tForm('needOptions.landing')}</option>
                          <option value="webapp">{tForm('needOptions.webapp')}</option>
                          <option value="mobile">{tForm('needOptions.mobile')}</option>
                          <option value="automation">{tForm('needOptions.automation')}</option>
                          <option value="design">{tForm('needOptions.design')}</option>
                          <option value="other">{tForm('needOptions.other')}</option>
                        </select>
                      </div>

                      {/* Summary */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('summary')}
                        </label>
                        <input
                          type="text"
                          name="summary"
                          maxLength={140}
                          value={formData.summary}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder={tForm('summaryPlaceholder')}
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">{formData.summary.length}/140</p>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setStep(1)}
                          disabled={isSubmitting}
                          className="w-1/3 bg-white text-black border-2 border-black py-4 font-bold text-base hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ← Atrás
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 bg-black text-white border-2 border-black py-4 font-bold text-base hover:bg-brand hover:border-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Enviando...' : `${tForm('submit')} →`}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Success Message */}
                <div className="border-4 border-black bg-brand p-8 md:p-12 text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-nostalgic">
                    {tForm('successTitle')}
                  </h3>
                  <p className="text-base md:text-lg mb-2">{tForm('successMessage')}</p>
                  <p className="text-sm opacity-90 font-mono">
                    {tForm('scheduleCall')}
                  </p>
                </div>

                {/* Cal.com Embed */}
                <CalEmbed />
              </motion.div>
            )}
          </AnimatePresence>
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

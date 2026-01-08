'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Link from 'next/link';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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

  // Track form start
  useEffect(() => {
    analytics.formStarted('contact');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.whatsapp) {
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
        analytics.formCompleted('contact', { need: formData.need });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to submit form';
        setError(errorMessage);
        analytics.formError('contact', errorMessage);
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
                          {tForm('whatsapp')} *
                        </label>
                        <PhoneInput
                          international
                          defaultCountry="US"
                          value={formData.whatsapp}
                          onChange={(value) => setFormData({ ...formData, whatsapp: value || '' })}
                          className="w-full border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-brand phone-input-custom"
                          required
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
                  <h3 className="text-5xl md:text-6xl font-bold mb-6 font-nostalgic tracking-widest">
                    {tForm('successTitle').toUpperCase()}
                  </h3>
                  <p className="text-base md:text-lg">{tForm('successMessage')}</p>
                </div>
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
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/dreamstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/company/dreamstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:contact@dreamstudio.dev"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>

                {/* X (Twitter) */}
                <motion.a
                  href="https://x.com/dreamstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors group"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
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
                <Link href="/privacy" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('privacy')}
                </Link>
                <Link href="/terms" className="block hover:text-brand transition-colors cursor-pointer">
                  {tFooter('terms')}
                </Link>
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

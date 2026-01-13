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
    linkedin: '',
    role: '',
    company: '',
    website: '',
    websiteUrl: '',
    instagram: '',
    companySize: '',
    industry: '',
    need: [] as string[],
    summary: '',
    heardFrom: '',
    acceptTerms: false,
  });

  // Track form start
  useEffect(() => {
    analytics.formStarted('contact');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && name === 'acceptTerms') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNeedCheckbox = (value: string) => {
    const currentNeeds = formData.need;
    if (currentNeeds.includes(value)) {
      setFormData({ ...formData, need: currentNeeds.filter(need => need !== value) });
    } else {
      setFormData({ ...formData, need: [...currentNeeds, value] });
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.fullName && formData.email && formData.whatsapp && formData.role) {
      setStep(2);
    } else if (step === 2) {
      // Validar Step 2: company, website selection, size, industry
      const hasWebsiteUrl = formData.website === 'has-website' ? formData.websiteUrl : true;
      const hasInstagram = formData.website === 'no-website' ? formData.instagram : true;

      if (formData.company && formData.website && formData.companySize && formData.industry && hasWebsiteUrl && hasInstagram) {
        setStep(3);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.need.length > 0 && formData.acceptTerms) {
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
        analytics.formCompleted('contact', { need: formData.need.join(', ') });
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
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-nostalgic">
                  {tForm('successTitle').toUpperCase()}
                </h2>
                <p className="text-lg text-gray-600">{tForm('successMessage')}</p>
              </motion.div>
            ) : (
              <motion.div
                key="form-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-nostalgic">
                  {t('title').toUpperCase()}
                </h2>
                <p className="text-lg text-gray-600 mb-2">{t('subtitle')}</p>
                <p className="text-sm text-gray-500 font-mono">{t('noSpam')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 2-Step Form */}
        {!submitted && (
          <div className="max-w-2xl mx-auto mb-16">
            <AnimatePresence mode="wait">
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
                      {tForm('step')} {step} {tForm('of')} 3 — {step === 1 ? tForm('stepContact') : step === 2 ? tForm('stepCompany') : tForm('stepProject')}
                    </span>
                    <span className="font-mono text-sm text-gray-500">{step === 1 ? '33%' : step === 2 ? '66%' : '100%'}</span>
                  </div>
                  <div className="h-1 bg-gray-200 border border-black">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: '0%' }}
                      animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
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
                          defaultCountry="CO"
                          value={formData.whatsapp}
                          onChange={(value) => setFormData({ ...formData, whatsapp: value || '' })}
                          className="w-full border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-brand phone-input-custom"
                          required
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('role')} *
                        </label>
                        <select
                          name="role"
                          required
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">{tForm('roleOptions.select')}</option>
                          <option value="founder">{tForm('roleOptions.founder')}</option>
                          <option value="ceo">{tForm('roleOptions.ceo')}</option>
                          <option value="cto">{tForm('roleOptions.cto')}</option>
                          <option value="product">{tForm('roleOptions.product')}</option>
                          <option value="marketing">{tForm('roleOptions.marketing')}</option>
                          <option value="developer">{tForm('roleOptions.developer')}</option>
                          <option value="designer">{tForm('roleOptions.designer')}</option>
                          <option value="other">{tForm('roleOptions.other')}</option>
                        </select>
                      </div>

                      {/* LinkedIn */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('linkedin')}
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                          placeholder="linkedin.com/in/tu-perfil"
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
                  ) : step === 2 ? (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleContinue}
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
                          {tForm('website')} *
                        </label>
                        <select
                          name="website"
                          required
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">{tForm('websiteOptions.select')}</option>
                          <option value="no-website">{tForm('websiteOptions.noWebsite')}</option>
                          <option value="has-website">{tForm('websiteOptions.hasWebsite')}</option>
                        </select>
                      </div>

                      {/* Website URL - solo si tiene website */}
                      {formData.website === 'has-website' && (
                        <div>
                          <label className="text-sm font-bold mb-2 block">
                            {tForm('websiteUrl')} *
                          </label>
                          <input
                            type="url"
                            name="websiteUrl"
                            required
                            value={formData.websiteUrl || ''}
                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                            className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="www.miempresa.com"
                          />
                        </div>
                      )}

                      {/* Instagram - solo si NO tiene website */}
                      {formData.website === 'no-website' && (
                        <div>
                          <label className="text-sm font-bold mb-2 block">
                            {tForm('instagram')} *
                          </label>
                          <input
                            type="text"
                            name="instagram"
                            required
                            value={formData.instagram}
                            onChange={handleInputChange}
                            className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="@miempresa"
                          />
                        </div>
                      )}

                      {/* Company Size */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('companySize')} *
                        </label>
                        <select
                          name="companySize"
                          required
                          value={formData.companySize}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">{tForm('companySizeOptions.select')}</option>
                          <option value="solo">{tForm('companySizeOptions.solo')}</option>
                          <option value="2-10">{tForm('companySizeOptions.small')}</option>
                          <option value="11-50">{tForm('companySizeOptions.medium')}</option>
                          <option value="51-200">{tForm('companySizeOptions.large')}</option>
                          <option value="201+">{tForm('companySizeOptions.enterprise')}</option>
                        </select>
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('industry')} *
                        </label>
                        <select
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">{tForm('industryOptions.select')}</option>
                          <option value="tech">{tForm('industryOptions.tech')}</option>
                          <option value="ecommerce">{tForm('industryOptions.ecommerce')}</option>
                          <option value="finance">{tForm('industryOptions.finance')}</option>
                          <option value="health">{tForm('industryOptions.health')}</option>
                          <option value="education">{tForm('industryOptions.education')}</option>
                          <option value="real-estate">{tForm('industryOptions.realEstate')}</option>
                          <option value="food">{tForm('industryOptions.food')}</option>
                          <option value="entertainment">{tForm('industryOptions.entertainment')}</option>
                          <option value="services">{tForm('industryOptions.services')}</option>
                          <option value="other">{tForm('industryOptions.other')}</option>
                        </select>
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-white text-black border-2 border-black py-4 font-bold text-base hover:bg-gray-100 transition-colors"
                        >
                          ← Atrás
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-2/3 bg-black text-white border-2 border-black py-4 font-bold text-base hover:bg-brand hover:border-brand transition-colors"
                        >
                          {tForm('continue')} →
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Need */}
                      <div>
                        <label className="text-sm font-bold mb-3 block">
                          {tForm('need')} *
                        </label>
                        <div className="space-y-3">
                          {[
                            { value: 'landing', label: tForm('needOptions.landing') },
                            { value: 'webapp', label: tForm('needOptions.webapp') },
                            { value: 'mobile', label: tForm('needOptions.mobile') },
                            { value: 'chatbot', label: tForm('needOptions.chatbot') },
                            { value: 'automation', label: tForm('needOptions.automation') },
                            { value: 'design', label: tForm('needOptions.design') },
                            { value: 'other', label: tForm('needOptions.other') },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center gap-3 cursor-pointer border-2 border-black bg-white p-3 hover:bg-gray-50 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={formData.need.includes(option.value)}
                                onChange={() => handleNeedCheckbox(option.value)}
                                className="w-5 h-5 border-2 border-black accent-black focus:ring-2 focus:ring-black"
                              />
                              <span className="text-sm font-medium">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('summary')}
                        </label>
                        <textarea
                          name="summary"
                          rows={5}
                          maxLength={500}
                          value={formData.summary}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                          placeholder={tForm('summaryPlaceholder')}
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">{formData.summary.length}/500</p>
                      </div>

                      {/* Heard From */}
                      <div>
                        <label className="text-sm font-bold mb-2 block">
                          {tForm('heardFrom')}
                        </label>
                        <select
                          name="heardFrom"
                          value={formData.heardFrom}
                          onChange={handleInputChange}
                          className="w-full border-2 border-black bg-white text-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-brand"
                        >
                          <option value="">{tForm('heardFromOptions.select')}</option>
                          <option value="google">{tForm('heardFromOptions.google')}</option>
                          <option value="social">{tForm('heardFromOptions.social')}</option>
                          <option value="referral">{tForm('heardFromOptions.referral')}</option>
                          <option value="linkedin">{tForm('heardFromOptions.linkedin')}</option>
                          <option value="instagram">{tForm('heardFromOptions.instagram')}</option>
                          <option value="event">{tForm('heardFromOptions.event')}</option>
                          <option value="other">{tForm('heardFromOptions.other')}</option>
                        </select>
                      </div>

                      {/* Accept Terms */}
                      <div className="border-2 border-black bg-gray-50 p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            required
                            className="mt-1 w-5 h-5 border-2 border-black accent-black focus:ring-2 focus:ring-black"
                          />
                          <span className="text-sm">
                            {tForm('acceptTerms.text')}{' '}
                            <Link href="/terms" className="underline hover:text-brand" target="_blank">
                              {tForm('acceptTerms.terms')}
                            </Link>
                            {' '}{tForm('acceptTerms.and')}{' '}
                            <Link href="/privacy" className="underline hover:text-brand" target="_blank">
                              {tForm('acceptTerms.privacy')}
                            </Link>
                          </span>
                        </label>
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
                          onClick={() => setStep(2)}
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
            </AnimatePresence>
          </div>
        )}

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

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/15558920875?text=Hi!%20I'm%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center cursor-pointer hover:bg-[#25D366] hover:text-white transition-colors group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

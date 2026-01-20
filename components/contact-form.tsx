'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    projectType: '',
    projectDetails: '',
    howDidYouHear: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          website: '',
          projectType: '',
          projectDetails: '',
          howDidYouHear: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
              {t('firstName')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
              {t('lastName')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ejemplo@dreeeams.com"
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+57"
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
            {t('companyName')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder={t('companyNamePlaceholder')}
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-900 mb-2">
            {t('website')} <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            placeholder={t('websitePlaceholder')}
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-900 mb-2">
            {t('projectType')} <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="">{t('projectTypePlaceholder')}</option>
            <option value="web">{t('projectTypeWeb')}</option>
            <option value="mobile">{t('projectTypeMobile')}</option>
            <option value="both">{t('projectTypeBoth')}</option>
            <option value="other">{t('projectTypeOther')}</option>
          </select>
        </div>

        {/* Project Details */}
        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-900 mb-2">
            {t('projectDetails')}
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            rows={5}
            placeholder={t('projectDetailsPlaceholder')}
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* How Did You Hear */}
        <div>
          <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-900 mb-2">
            {t('howDidYouHear')} <span className="text-red-500">*</span>
          </label>
          <select
            id="howDidYouHear"
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="">{t('howDidYouHearPlaceholder')}</option>
            <option value="google">{t('howDidYouHearGoogle')}</option>
            <option value="social">{t('howDidYouHearSocial')}</option>
            <option value="referral">{t('howDidYouHearReferral')}</option>
            <option value="other">{t('howDidYouHearOther')}</option>
          </select>
        </div>

        {/* Terms */}
        <div className="text-sm text-gray-600">
          {t('termsText')}{' '}
          <Link href={`/${locale}/terms`} className="underline hover:text-black transition-colors">
            {t('termsLink')}
          </Link>{' '}
          {t('and')}{' '}
          <Link href={`/${locale}/privacy`} className="underline hover:text-black transition-colors">
            {t('privacyLink')}
          </Link>
          .
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-sm font-medium text-gray-700 border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-200"
          >
            {t('back')}
          </motion.button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('confirm')}
          </motion.button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border-2 border-green-500 text-green-800 text-sm"
          >
            {t('successMessage')}
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border-2 border-red-500 text-red-800 text-sm"
          >
            {t('errorMessage')}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

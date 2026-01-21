'use client';

import { m } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

interface ContactFormProps {
  onSuccess?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    websiteUrl: string;
    projectType: string;
    projectDetails: string;
    howDidYouHear: string;
  }) => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    websiteUrl: '',
    projectType: '',
    projectDetails: '',
    howDidYouHear: '',
    website: '', // Honeypot field (hidden)
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
      // Transform form data to API format
      const apiData: any = {
        fullName: `${formData.firstName}${formData.lastName ? ' ' + formData.lastName : ''}`.trim(),
        email: formData.email.trim(),
        company: formData.companyName.trim(),
        need: 'web',
        acceptTerms: true,
        website: '', // Honeypot (should be empty)
      };

      // Add optional phone number with proper E.164 formatting
      if (formData.phone.trim()) {
        let whatsappNumber = formData.phone.trim();
        // Remove any non-numeric characters except +
        whatsappNumber = whatsappNumber.replace(/[^\d+]/g, '');

        // Ensure it starts with country code
        if (!whatsappNumber.startsWith('+')) {
          whatsappNumber = `+57${whatsappNumber}`;
        }

        // Only add if it matches E.164 format (+ followed by 1-15 digits)
        if (/^\+[1-9]\d{1,14}$/.test(whatsappNumber)) {
          apiData.whatsapp = whatsappNumber;
        }
      }

      if (formData.websiteUrl.trim()) {
        apiData.websiteUrl = formData.websiteUrl.trim();
      }

      if (formData.projectDetails.trim()) {
        apiData.summary = formData.projectDetails.trim();
      }

      // Only add heardFrom if user actually selected something (not empty string)
      if (formData.howDidYouHear && formData.howDidYouHear !== '') {
        apiData.heardFrom = formData.howDidYouHear;
      }

      console.log('Sending to API:', apiData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Call onSuccess callback with form data before resetting
        if (onSuccess) {
          onSuccess({ ...formData });
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          websiteUrl: '',
          projectType: '',
          projectDetails: '',
          howDidYouHear: '',
          website: '',
        });
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        if (errorData.details) {
          console.error('Error details:', JSON.stringify(errorData.details, null, 2));
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row - 2 columns on mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
              {t('firstName')} <span className="text-gray-400">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
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
              className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            {t('email')} <span className="text-gray-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ejemplo@dreeeams.com"
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57"
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
            {t('companyName')} <span className="text-gray-400">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder={t('companyNamePlaceholder')}
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-900 mb-2">
            {t('website')}
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder={t('websitePlaceholder')}
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ position: 'absolute', left: '-9999px' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

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
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* How Did You Hear */}
        <div>
          <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-900 mb-2">
            {t('howDidYouHear')}
          </label>
          <select
            id="howDidYouHear"
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            className="w-full px-0 py-3 border-0 border-b-2 border-black/20 focus:border-black focus:outline-none transition-all duration-300 bg-transparent text-gray-900 appearance-none cursor-pointer pr-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0 center',
            }}
          >
            <option value="">{t('howDidYouHearPlaceholder')}</option>
            <option value="google">{t('howDidYouHearGoogle')}</option>
            <option value="instagram">{t('howDidYouHearInstagram')}</option>
            <option value="facebook">{t('howDidYouHearFacebook')}</option>
            <option value="linkedin">{t('howDidYouHearLinkedIn')}</option>
            <option value="twitter">{t('howDidYouHearTwitter')}</option>
            <option value="tiktok">{t('howDidYouHearTikTok')}</option>
            <option value="youtube">{t('howDidYouHearYouTube')}</option>
            <option value="referral">{t('howDidYouHearReferral')}</option>
            <option value="event">{t('howDidYouHearEvent')}</option>
            <option value="blog">{t('howDidYouHearBlog')}</option>
            <option value="advertisement">{t('howDidYouHearAdvertisement')}</option>
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
          <m.button
            type="button"
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-sm font-medium text-gray-700 border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-200"
          >
            {t('back')}
          </m.button>
          <m.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('confirm')}
          </m.button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border-2 border-green-500 text-green-800 text-sm"
          >
            {t('successMessage')}
          </m.div>
        )}
        {submitStatus === 'error' && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border-2 border-red-500 text-red-800 text-sm"
          >
            {t('errorMessage')}
          </m.div>
        )}
      </form>
    </m.div>
  );
}

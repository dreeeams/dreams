'use client';

import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import { useState, useEffect } from 'react';
import { trackFormStart } from '@/lib/google-ads-tracking';

// Function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

interface StepOneProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function StepOne({ formData, updateFormData, onNext, currentStep, totalSteps }: StepOneProps) {
  const t = useTranslations('contact.stepOne');
  const tCommon = useTranslations('contact');
  const [country, setCountry] = useState<Country>('CO');
  const [phoneError, setPhoneError] = useState<string>('');
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  // Track form start when user interacts with any field
  useEffect(() => {
    if (!hasTrackedStart && (formData.name || formData.email || formData.company || formData.phone)) {
      trackFormStart();
      setHasTrackedStart(true);
    }
  }, [formData.name, formData.email, formData.company, formData.phone, hasTrackedStart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number (now required)
    const fullPhone = `+${getCountryCallingCode(country)}${formData.phone}`;
    try {
      if (!isValidPhoneNumber(fullPhone, country)) {
        setPhoneError(t('phoneInvalid') || 'Invalid phone number for selected country');
        return;
      }
    } catch (error) {
      setPhoneError(t('phoneInvalid') || 'Invalid phone number format');
      return;
    }
    // Save country code with phone number
    updateFormData({ phoneCountry: getCountryCallingCode(country) });

    setPhoneError('');
    onNext();
  };

  const isValid = formData.name && formData.email && formData.company && formData.phone;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-lg font-medium mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-lg font-medium mb-2">
          {t('company')}
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => updateFormData({ company: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="Doecompany"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="john@doecompany.com"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-lg font-medium mb-2">
          {t('phone')}
        </label>
        <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black transition-colors px-4 py-3">
          <div className="flex items-center flex-shrink-0 mr-2 relative">
            {/* Flag Display with Arrow */}
            <div className="pointer-events-none absolute left-0 flex items-center gap-1">
              <span className="text-xl">{getFlagEmoji(country)}</span>
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {/* Hidden Select */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className="opacity-0 cursor-pointer relative z-10"
              style={{ width: '48px', height: '24px' }}
            >
              {getCountries().map((c) => (
                <option key={c} value={c}>
                  {getFlagEmoji(c)} {en[c]} +{getCountryCallingCode(c)}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-500">+{getCountryCallingCode(country)}</span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              updateFormData({ phone: e.target.value });
              if (phoneError) setPhoneError(''); // Clear error on change
            }}
            className="flex-1 border-none outline-none bg-transparent ml-2"
            placeholder="456 78 90 12"
            required
          />
        </div>
        {phoneError && (
          <p className="text-red-500 text-sm mt-1">{phoneError}</p>
        )}
      </div>

      {/* Navigation and Steps */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-500 font-mono tracking-wider">
          {tCommon('step')} {currentStep} {tCommon('of')} {totalSteps}
        </p>
        <button
          type="submit"
          disabled={!isValid}
          className="px-4 md:px-8 py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <span className="hidden md:inline">{t('next')}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}

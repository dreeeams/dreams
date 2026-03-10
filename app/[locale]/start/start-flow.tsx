'use client';

import { useState, useCallback, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CalendarEmbed from '@/components/contact/calendar-embed';
import {
  API_ENDPOINTS,
  COUNTRY_PHONE_PREFIXES,
  DEFAULT_PHONE_PREFIX,
} from '@/lib/constants';

type Step = 'service' | 'timeline' | 'budget' | 'identity' | 'booking' | 'not-fit';

const SERVICE_OPTIONS = ['web', 'mobile', 'backend', 'ai', 'branding', 'unsure'] as const;
const TIMELINE_OPTIONS = ['asap', 'soon', 'planned', 'flexible'] as const;
const BUDGET_OPTIONS = ['low', 'mid', 'high', 'under'] as const;

const STEP_NUMBER: Record<string, number> = {
  service: 1,
  timeline: 2,
  budget: 3,
  identity: 4,
};
const TOTAL_STEPS = 4;

function extractBrowser(ua: string): string {
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  return 'other';
}

interface GeoContext {
  countryCode: string;
  city: string;
  timezone: string;
}

interface StartFlowProps {
  locale: string;
  geoContext: GeoContext;
}

export default function StartFlow({ locale, geoContext }: StartFlowProps) {
  const t = useTranslations('start');

  // Flow state
  const [step, setStep] = useState<Step>('service');
  const [service, setService] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [selected, setSelected] = useState('');

  // Identity state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identityEmail, setIdentityEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');

  // Not-fit email capture
  const [notFitEmail, setNotFitEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Silent enrichment
  const [enrichment, setEnrichment] = useState({
    timezone: '',
    language: '',
    device: '',
    browser: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    referrer: '',
  });

  // Collect enrichment data on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ua = navigator.userAgent;

    setEnrichment({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      device: /Mobile|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop',
      browser: extractBrowser(ua),
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      referrer: document.referrer || '',
    });
  }, []);

  const phonePrefix =
    COUNTRY_PHONE_PREFIXES[geoContext.countryCode] || DEFAULT_PHONE_PREFIX;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const successRedirectUrl = `${baseUrl}/${locale}/thank-you`;

  const submitLead = useCallback(
    (qualified: boolean, overrides: Record<string, string> = {}) => {
      const email = overrides.email || identityEmail;
      const domain = email.includes('@') ? email.split('@')[1]?.toLowerCase() || '' : '';

      fetch(API_ENDPOINTS.LEAD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: overrides.firstName || firstName,
          lastName,
          email,
          phone: phone ? `${phonePrefix}${phone}` : '',
          company,
          service,
          timeline,
          budget,
          qualified,
          country: geoContext.countryCode,
          city: geoContext.city,
          timezone: enrichment.timezone || geoContext.timezone,
          language: enrichment.language,
          device: enrichment.device,
          browser: enrichment.browser,
          company_domain: companyDomain || domain,
          utm_source: enrichment.utm_source,
          utm_medium: enrichment.utm_medium,
          utm_campaign: enrichment.utm_campaign,
          referrer: enrichment.referrer,
          created_at: new Date().toISOString(),
        }),
      }).catch(() => {
        // silent — non-blocking
      });
    },
    [
      firstName,
      lastName,
      identityEmail,
      phone,
      phonePrefix,
      company,
      companyDomain,
      service,
      timeline,
      budget,
      geoContext,
      enrichment,
    ]
  );

  const advance = useCallback(
    (value: string, setter: (v: string) => void, nextStep: Step) => {
      setter(value);
      setSelected(value);
      setTimeout(() => {
        setSelected('');
        if (nextStep === 'identity') {
          // Budget step just completed — check qualification
          const isQualified = value !== 'under';
          if (isQualified) {
            setStep('identity');
          } else {
            setStep('not-fit');
          }
        } else {
          setStep(nextStep);
        }
      }, 200);
    },
    []
  );

  const handleBack = () => {
    if (step === 'timeline') setStep('service');
    else if (step === 'budget') setStep('timeline');
    else if (step === 'identity') setStep('budget');
    else if (step === 'not-fit') setStep('budget');
    else if (step === 'booking') setStep('identity');
  };

  const handleIdentityEmailChange = (value: string) => {
    setIdentityEmail(value);
    const parts = value.split('@');
    if (parts.length === 2 && parts[1].includes('.')) {
      setCompanyDomain(parts[1].toLowerCase());
    } else {
      setCompanyDomain('');
    }
  };

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !identityEmail) return;
    submitLead(true);
    setStep('booking');
  };

  const handleNotFitEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notFitEmail) {
      submitLead(false, { email: notFitEmail, firstName: '' });
      setEmailSent(true);
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const isQuestionStep = step in STEP_NUMBER;

  const inputClassName =
    'w-full px-5 py-4 border-2 border-white/15 bg-transparent text-white font-mono text-base placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors';

  const renderOption = (
    key: string,
    label: string,
    currentValue: string,
    onSelect: () => void
  ) => {
    const isFlash = selected === key;
    const isSelected = currentValue === key && !selected;

    return (
      <m.button
        key={key}
        onClick={onSelect}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full text-left px-5 py-4 border-2 text-base font-mono tracking-wide transition-all duration-150 ${
          isFlash
            ? 'border-white bg-white text-black'
            : isSelected
              ? 'border-white/40 text-white'
              : 'border-white/15 text-white/70 hover:border-white/40'
        }`}
      >
        {label}
      </m.button>
    );
  };

  return (
    <div className="min-h-[60vh]">
      {/* Header */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-nostalgic mb-3 text-white">
          {step === 'booking' ? t('bookingHeading') : t('heading')}
        </h1>
        <p className="text-lg text-gray-400">
          {step === 'booking' ? t('bookingSubtitle') : t('subtitle')}
        </p>
      </m.div>

      {/* Progress indicator */}
      {isQuestionStep && (
        <div className="mb-8">
          <span className="text-sm text-gray-500 font-mono">
            {STEP_NUMBER[step]} / {TOTAL_STEPS}
          </span>
        </div>
      )}

      {/* Steps */}
      <AnimatePresence mode="wait">
        {/* Service step */}
        {step === 'service' && (
          <m.div key="service" {...fadeVariants} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-medium text-white mb-5">
              {t('service.label')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map((key) =>
                renderOption(key, t(`service.options.${key}`), service, () =>
                  advance(key, setService, 'timeline')
                )
              )}
            </div>
          </m.div>
        )}

        {/* Timeline step */}
        {step === 'timeline' && (
          <m.div key="timeline" {...fadeVariants} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-medium text-white mb-5">
              {t('timeline.label')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TIMELINE_OPTIONS.map((key) =>
                renderOption(key, t(`timeline.options.${key}`), timeline, () =>
                  advance(key, setTimeline, 'budget')
                )
              )}
            </div>
            <div className="mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
              >
                {t('back')}
              </button>
            </div>
          </m.div>
        )}

        {/* Budget step */}
        {step === 'budget' && (
          <m.div key="budget" {...fadeVariants} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-medium text-white mb-5">
              {t('budget.label')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUDGET_OPTIONS.map((key) =>
                renderOption(key, t(`budget.options.${key}`), budget, () =>
                  advance(key, setBudget, 'identity')
                )
              )}
            </div>
            <div className="mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
              >
                {t('back')}
              </button>
            </div>
          </m.div>
        )}

        {/* Identity step */}
        {step === 'identity' && (
          <m.div key="identity" {...fadeVariants} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-medium text-white mb-5">
              {t('identity.label')}
            </h2>
            <form onSubmit={handleIdentitySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 font-mono mb-2">
                    {t('identity.firstName')} *
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t('identity.firstNamePlaceholder')}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 font-mono mb-2">
                    {t('identity.lastName')}
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t('identity.lastNamePlaceholder')}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-mono mb-2">
                  {t('identity.email')} *
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={identityEmail}
                  onChange={(e) => handleIdentityEmailChange(e.target.value)}
                  placeholder={t('identity.emailPlaceholder')}
                  className={inputClassName}
                />
              </div>

              {companyDomain && !company && (
                <button
                  type="button"
                  onClick={() => {
                    const name = companyDomain.split('.')[0];
                    setCompany(name.charAt(0).toUpperCase() + name.slice(1));
                  }}
                  className="text-sm text-white/40 font-mono hover:text-white/60 transition-colors"
                >
                  {t('identity.companySuggestion', { domain: companyDomain })}
                </button>
              )}

              <div>
                <label className="block text-sm text-gray-400 font-mono mb-2">
                  {t('identity.phone')}
                </label>
                <div className="flex items-stretch">
                  <span className="flex items-center px-4 border-2 border-r-0 border-white/15 text-white/50 font-mono text-sm bg-white/5 shrink-0">
                    {phonePrefix}
                  </span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('identity.phonePlaceholder')}
                    className={`${inputClassName} border-l-0`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 font-mono mb-2">
                  {t('identity.company')}
                </label>
                <input
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t('identity.companyPlaceholder')}
                  className={inputClassName}
                />
              </div>

              <button
                type="submit"
                disabled={!firstName || !identityEmail}
                className="w-full px-5 py-4 border-2 border-white bg-white text-black font-medium text-base transition-colors hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed mt-2"
              >
                {t('identity.continue')}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
              >
                {t('back')}
              </button>
            </div>
          </m.div>
        )}

        {/* Booking step */}
        {step === 'booking' && (
          <m.div key="booking" {...fadeVariants} transition={{ duration: 0.3 }}>
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
            >
              {t('back')}
            </button>
            <CalendarEmbed
              successRedirectUrl={successRedirectUrl}
              name={firstName}
              email={identityEmail}
            />
          </m.div>
        )}

        {/* Not-fit step */}
        {step === 'not-fit' && (
          <m.div key="not-fit" {...fadeVariants} transition={{ duration: 0.3 }}>
            <div className="bg-white border-2 border-white p-8">
              <h2 className="text-2xl font-nostalgic text-black mb-4">
                {t('notFit.heading')}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('notFit.message')}
              </p>

              {!emailSent ? (
                <form onSubmit={handleNotFitEmailSubmit} className="flex gap-3">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={notFitEmail}
                    onChange={(e) => setNotFitEmail(e.target.value)}
                    placeholder={t('notFit.emailPlaceholder')}
                    className="flex-1 px-4 py-3 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white border-2 border-black hover:bg-gray-800 font-medium transition-colors whitespace-nowrap"
                  >
                    {t('notFit.send')}
                  </button>
                </form>
              ) : (
                <p className="text-black font-medium">{t('notFit.sent')}</p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
              >
                {t('back')}
              </button>
              <Link
                href={`/${locale}`}
                className="px-6 py-3 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
              >
                {t('notFit.noThanks')}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

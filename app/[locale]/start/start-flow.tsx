'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CalendarEmbed from '@/components/contact/calendar-embed';

type Step = 'service' | 'budget' | 'timeline' | 'booking' | 'not-fit';

const SERVICE_OPTIONS = ['web', 'backend', 'ai', 'branding', 'other'] as const;
const BUDGET_OPTIONS = ['under', 'low', 'mid', 'high', 'premium'] as const;
const TIMELINE_OPTIONS = ['asap', 'soon', 'planned', 'flexible'] as const;

// "under" is the only budget that disqualifies
const BUDGET_FIT: Record<string, boolean> = {
  under: false,
  low: true,
  mid: true,
  high: true,
  premium: true,
};

const stepOrder: Step[] = ['service', 'budget', 'timeline'];

interface StartFlowProps {
  locale: string;
}

export default function StartFlow({ locale }: StartFlowProps) {
  const t = useTranslations('start');

  const [step, setStep] = useState<Step>('service');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const currentStepIndex = stepOrder.indexOf(step);
  const totalSteps = stepOrder.length;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const successRedirectUrl = `${baseUrl}/${locale}/thank-you`;

  const handleNext = () => {
    if (step === 'service' && service) {
      setStep('budget');
    } else if (step === 'budget' && budget) {
      if (!BUDGET_FIT[budget]) {
        setStep('not-fit');
      } else {
        setStep('timeline');
      }
    } else if (step === 'timeline' && timeline) {
      setStep('booking');
    }
  };

  const handleBack = () => {
    if (step === 'budget') setStep('service');
    else if (step === 'timeline') setStep('budget');
    else if (step === 'not-fit') setStep('budget');
    else if (step === 'booking') setStep('timeline');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const isQuestionStep = step === 'service' || step === 'budget' || step === 'timeline';

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

      {/* Step indicator */}
      {isQuestionStep && (
        <div className="mb-8 flex items-center gap-3">
          <span className="text-sm text-gray-500 font-mono">
            {t('step')} {currentStepIndex + 1} {t('of')} {totalSteps}
          </span>
          <div className="flex gap-1.5 flex-1 max-w-[120px]">
            {stepOrder.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 ${
                  i <= currentStepIndex ? 'bg-white' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
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
            <div className="grid gap-3">
              {SERVICE_OPTIONS.map((key) => (
                <button
                  key={key}
                  onClick={() => setService(key)}
                  className={`w-full text-left px-5 py-4 border-2 text-base font-medium transition-colors ${
                    service === key
                      ? 'border-white bg-white text-black'
                      : 'border-gray-700 text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {t(`service.options.${key}`)}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={handleNext}
                disabled={!service}
                className="px-8 py-3 text-base font-medium bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('next')} →
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
            <div className="grid gap-3">
              {BUDGET_OPTIONS.map((key) => (
                <button
                  key={key}
                  onClick={() => setBudget(key)}
                  className={`w-full text-left px-5 py-4 border-2 text-base font-medium transition-colors ${
                    budget === key
                      ? 'border-white bg-white text-black'
                      : 'border-gray-700 text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {t(`budget.options.${key}`)}
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-base font-medium text-gray-400 border-2 border-gray-700 hover:border-gray-400 transition-colors"
              >
                ← {t('back')}
              </button>
              <button
                onClick={handleNext}
                disabled={!budget}
                className="px-8 py-3 text-base font-medium bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('next')} →
              </button>
            </div>
          </m.div>
        )}

        {/* Timeline step */}
        {step === 'timeline' && (
          <m.div key="timeline" {...fadeVariants} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-medium text-white mb-5">
              {t('timeline.label')}
            </h2>
            <div className="grid gap-3">
              {TIMELINE_OPTIONS.map((key) => (
                <button
                  key={key}
                  onClick={() => setTimeline(key)}
                  className={`w-full text-left px-5 py-4 border-2 text-base font-medium transition-colors ${
                    timeline === key
                      ? 'border-white bg-white text-black'
                      : 'border-gray-700 text-gray-300 hover:border-gray-400'
                  }`}
                >
                  {t(`timeline.options.${key}`)}
                </button>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-base font-medium text-gray-400 border-2 border-gray-700 hover:border-gray-400 transition-colors"
              >
                ← {t('back')}
              </button>
              <button
                onClick={handleNext}
                disabled={!timeline}
                className="px-8 py-3 text-base font-medium bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t('bookCall')} →
              </button>
            </div>
          </m.div>
        )}

        {/* Booking step (Cal.com inline) */}
        {step === 'booking' && (
          <m.div key="booking" {...fadeVariants} transition={{ duration: 0.3 }}>
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 text-sm text-gray-400 border border-gray-700 hover:border-gray-400 transition-colors"
            >
              ← {t('back')}
            </button>
            <CalendarEmbed successRedirectUrl={successRedirectUrl} />
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
                <form onSubmit={handleEmailSubmit} className="flex gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                className="px-6 py-3 text-base font-medium text-gray-400 border-2 border-gray-700 hover:border-gray-400 transition-colors"
              >
                ← {t('back')}
              </button>
              <Link
                href={`/${locale}`}
                className="px-6 py-3 text-base font-medium text-gray-400 border-2 border-gray-700 hover:border-gray-400 transition-colors"
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

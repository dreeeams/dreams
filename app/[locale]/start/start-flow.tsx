'use client';

import { useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CalendarEmbed from '@/components/contact/calendar-embed';
import { API_ENDPOINTS } from '@/lib/constants';

type Step = 'service' | 'timeline' | 'budget' | 'booking' | 'not-fit';

const SERVICE_OPTIONS = ['web', 'mobile', 'backend', 'ai', 'branding', 'unsure'] as const;
const TIMELINE_OPTIONS = ['asap', 'soon', 'planned', 'flexible'] as const;
const BUDGET_OPTIONS = ['low', 'mid', 'high', 'under'] as const;

const STEP_NUMBER: Record<string, number> = { service: 1, timeline: 2, budget: 3 };

interface StartFlowProps {
  locale: string;
}

export default function StartFlow({ locale }: StartFlowProps) {
  const t = useTranslations('start');

  const [step, setStep] = useState<Step>('service');
  const [service, setService] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [selected, setSelected] = useState(''); // tracks flash state
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const successRedirectUrl = `${baseUrl}/${locale}/thank-you`;

  const submitIntake = useCallback(
    (qualified: boolean, emailValue?: string) => {
      if (!service || !timeline || !budget) return;
      fetch(API_ENDPOINTS.INTAKE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          timeline,
          budget,
          qualified,
          ...(emailValue ? { email: emailValue } : {}),
        }),
      }).catch(() => {
        // silent — non-blocking
      });
    },
    [service, timeline, budget]
  );

  const advance = useCallback(
    (value: string, setter: (v: string) => void, nextStep: Step) => {
      setter(value);
      setSelected(value);
      setTimeout(() => {
        setSelected('');
        if (nextStep === 'booking') {
          // Budget step just completed — check qualification
          const isQualified = value !== 'under';
          if (isQualified) {
            submitIntake(true);
            setStep('booking');
          } else {
            setStep('not-fit');
          }
        } else {
          setStep(nextStep);
        }
      }, 200);
    },
    [submitIntake]
  );

  const handleBack = () => {
    if (step === 'timeline') setStep('service');
    else if (step === 'budget') setStep('timeline');
    else if (step === 'not-fit') setStep('budget');
    else if (step === 'booking') setStep('budget');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      submitIntake(false, email);
      setEmailSent(true);
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  const isQuestionStep = step in STEP_NUMBER;

  const renderOption = (
    key: string,
    label: string,
    currentValue: string,
    onSelect: () => void
  ) => {
    const isSelected = selected === key || (currentValue === key && !selected);
    const isFlash = selected === key;

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
            {STEP_NUMBER[step]} / 3
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
                  advance(key, setBudget, 'booking')
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

        {/* Booking step */}
        {step === 'booking' && (
          <m.div key="booking" {...fadeVariants} transition={{ duration: 0.3 }}>
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 text-sm font-mono text-gray-500 border border-gray-700 hover:border-gray-400 transition-colors"
            >
              {t('back')}
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

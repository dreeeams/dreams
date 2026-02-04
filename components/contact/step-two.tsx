'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';
import { trackStep2Reached, trackNeedSelection, trackBudgetSelection, trackReferralSelection } from '@/lib/google-ads-tracking';

interface StepTwoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  currentStep: number;
  totalSteps: number;
  utmReferral?: string | null;
}

export default function StepTwo({ formData, updateFormData, onBack, onSubmit, currentStep, totalSteps, utmReferral }: StepTwoProps) {
  const t = useTranslations('contact.stepTwo');
  const tBudget = useTranslations('contact.stepThree');
  const tCommon = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track when user reaches Step 2
  useEffect(() => {
    trackStep2Reached();
  }, []);

  const needsOptions = [
    { id: 'branding', label: t('branding') },
    { id: 'webDesign', label: t('webDesign') },
    { id: 'websiteDevelopment', label: t('websiteDevelopment') },
    { id: 'backend', label: t('backend') },
    { id: 'aiDevelopment', label: t('aiDevelopment') },
    { id: 'ecommerce', label: t('ecommerce') },
    { id: 'integrations', label: t('integrations') },
    { id: 'consulting', label: t('consulting') },
    { id: 'workflowOptimization', label: t('workflowOptimization') },
  ];

  const budgetOptions = [
    { id: 'less-2500', label: tBudget('lessThan2500') },
    { id: '2500-5000', label: tBudget('range2500to5000') },
    { id: '5000-10000', label: tBudget('range5000to10000') },
    { id: '10000-15000', label: tBudget('range10000to15000') },
    { id: '15000-20000', label: tBudget('range15000to20000') },
    { id: '20000-30000', label: tBudget('range20000to30000') },
    { id: 'more-30000', label: tBudget('moreThan30000') },
    { id: 'dont-know', label: tBudget('dontKnow') },
  ];

  const referralOptions = [
    { id: 'google', label: tBudget('referralOptions.google') },
    { id: 'social', label: tBudget('referralOptions.social') },
    { id: 'referral', label: tBudget('referralOptions.referral') },
    { id: 'linkedin', label: tBudget('referralOptions.linkedin') },
    { id: 'instagram', label: tBudget('referralOptions.instagram') },
    { id: 'event', label: tBudget('referralOptions.event') },
    { id: 'other', label: tBudget('referralOptions.other') },
  ];

  const toggleNeed = (needId: string) => {
    const currentNeeds = formData.needs;
    const newNeeds = currentNeeds.includes(needId)
      ? currentNeeds.filter((id) => id !== needId)
      : [...currentNeeds, needId];
    updateFormData({ needs: newNeeds });

    // Track need selection
    if (!currentNeeds.includes(needId)) {
      trackNeedSelection(newNeeds);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  // If UTM referral exists, don't require manual referral selection
  const isValid = formData.needs.length > 0 && formData.budget && formData.projectDescription && (utmReferral || formData.referral);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* I need */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{t('title')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {needsOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleNeed(option.id)}
              className={`py-2.5 md:py-3 px-3 md:px-4 border font-medium transition-colors text-sm md:text-base ${
                formData.needs.includes(option.id)
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 bg-white text-gray-700 hover:border-black'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{tBudget('budgetTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                updateFormData({ budget: option.id });
                trackBudgetSelection(option.id);
              }}
              className={`py-2.5 md:py-3 px-3 md:px-4 border font-medium transition-colors text-left text-sm md:text-base ${
                formData.budget === option.id
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 bg-white text-gray-700 hover:border-black'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-2">{tBudget('projectTitle')}</h2>
        <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{tBudget('projectSubtitle')}</p>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => updateFormData({ projectDescription: e.target.value })}
          className="w-full px-3 md:px-4 py-2 md:py-3 border border-black/20 focus:border-black outline-none transition-colors resize-none text-sm md:text-base"
          rows={4}
          placeholder={tBudget('projectPlaceholder')}
          required
        />
      </div>

      {/* Referral - Only show if no UTM detected */}
      {!utmReferral && (
        <div>
          <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{tBudget('referralTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {referralOptions.map((option) => {
              // For "other" option, show button or input based on selection
              if (option.id === 'other') {
                return (
                  <div key={option.id}>
                    {formData.referral === 'other' ? (
                      // Show input when "other" is selected
                      <input
                        type="text"
                        value={formData.referralOther || ''}
                        onChange={(e) => {
                          updateFormData({ referralOther: e.target.value });
                          if (e.target.value) {
                            trackReferralSelection('other');
                          }
                        }}
                        autoFocus
                        className="w-full py-2.5 md:py-3 px-3 md:px-4 border border-black bg-white text-black font-medium outline-none transition-colors text-sm md:text-base"
                        placeholder={tBudget('referralOtherPlaceholder') || 'Please specify...'}
                      />
                    ) : (
                      // Show button when "other" is not selected
                      <button
                        type="button"
                        onClick={() => {
                          updateFormData({ referral: 'other', referralOther: '' });
                          trackReferralSelection('other');
                        }}
                        className="w-full py-2.5 md:py-3 px-3 md:px-4 border border-black/20 bg-white text-gray-700 font-medium transition-colors text-left hover:border-black text-sm md:text-base"
                      >
                        {option.label}
                      </button>
                    )}
                  </div>
                );
              }

              // Regular buttons for other options
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    updateFormData({ referral: option.id, referralOther: '' });
                    trackReferralSelection(option.id);
                  }}
                  className={`py-2.5 md:py-3 px-3 md:px-4 border font-medium transition-colors text-left text-sm md:text-base ${
                    formData.referral === option.id
                      ? 'border-black bg-black text-white'
                      : 'border-black/20 bg-white text-gray-700 hover:border-black'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation and Steps */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 md:pt-4 sticky bottom-0 bg-white pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 border-t md:border-t-0 border-gray-200 md:static">
        <p className="text-xs md:text-sm text-gray-500 font-mono tracking-wider order-2 sm:order-1">
          {tCommon('step')} {currentStep} {tCommon('of')} {totalSteps}
        </p>
        <div className="flex gap-2 md:gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial px-3 md:px-6 py-2.5 md:py-3 bg-white text-black border border-black font-medium hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline text-sm md:text-base">{t('back')}</span>
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex-1 sm:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="hidden md:inline">{tBudget('submitting')}</span>
              </>
            ) : (
              <>
                <span className="hidden md:inline">{tBudget('submit')}</span>
                <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

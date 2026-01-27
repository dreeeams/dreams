'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';

interface StepTwoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepTwo({ formData, updateFormData, onBack, onSubmit }: StepTwoProps) {
  const t = useTranslations('contact.stepTwo');
  const t3 = useTranslations('contact.stepThree');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needsOptions = [
    { id: 'branding', label: t('branding') },
    { id: 'print', label: t('print') },
    { id: 'webDesign', label: t('webDesign') },
    { id: 'websiteDevelopment', label: t('websiteDevelopment') },
    { id: 'other', label: t('other') },
  ];

  const budgetOptions = [
    { id: 'less-2500', label: t3('lessThan2500') },
    { id: '2500-5000', label: t3('range2500to5000') },
    { id: '5000-10000', label: t3('range5000to10000') },
    { id: '10000-15000', label: t3('range10000to15000') },
    { id: '15000-20000', label: t3('range15000to20000') },
    { id: '20000-30000', label: t3('range20000to30000') },
    { id: 'more-30000', label: t3('moreThan30000') },
    { id: 'dont-know', label: t3('dontKnow') },
  ];

  const toggleNeed = (needId: string) => {
    const currentNeeds = formData.needs;
    const newNeeds = currentNeeds.includes(needId)
      ? currentNeeds.filter((id) => id !== needId)
      : [...currentNeeds, needId];
    updateFormData({ needs: newNeeds });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  const isValid = formData.needs.length > 0 && formData.budget && formData.projectDescription;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* I need */}
      <div>
        <h2 className="text-2xl font-medium mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {needsOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleNeed(option.id)}
              className={`py-4 px-6 border font-medium transition-colors ${
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
        <h2 className="text-2xl font-medium mb-6">{t3('budgetTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => updateFormData({ budget: option.id })}
              className={`py-4 px-6 border font-medium transition-colors text-left ${
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
        <h2 className="text-2xl font-medium mb-2">{t3('projectTitle')}</h2>
        <p className="text-sm text-gray-500 mb-4">{t3('projectSubtitle')}</p>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => updateFormData({ projectDescription: e.target.value })}
          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none transition-colors resize-none"
          rows={6}
          placeholder={t3('projectPlaceholder')}
          required
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-8 py-3 bg-white text-black border border-black font-medium hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="px-8 py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              {t3('submitting')}
            </>
          ) : (
            t3('submit')
          )}
        </button>
      </div>
    </form>
  );
}

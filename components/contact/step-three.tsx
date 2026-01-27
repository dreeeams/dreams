'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';

interface StepThreeProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepThree({ formData, updateFormData, onBack, onSubmit }: StepThreeProps) {
  const t = useTranslations('contact.stepThree');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    { id: 'less-2500', label: t('lessThan2500') },
    { id: '2500-5000', label: t('range2500to5000') },
    { id: '5000-10000', label: t('range5000to10000') },
    { id: '10000-15000', label: t('range10000to15000') },
    { id: '15000-20000', label: t('range15000to20000') },
    { id: '20000-30000', label: t('range20000to30000') },
    { id: 'more-30000', label: t('moreThan30000') },
    { id: 'dont-know', label: t('dontKnow') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  const isValid = formData.budget && formData.projectDescription;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Budget */}
      <div>
        <h2 className="text-2xl font-medium mb-6">{t('budgetTitle')}</h2>
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
        <h2 className="text-2xl font-medium mb-2">{t('projectTitle')}</h2>
        <p className="text-sm text-gray-500 mb-4">{t('projectSubtitle')}</p>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => updateFormData({ projectDescription: e.target.value })}
          className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none transition-colors resize-none"
          rows={6}
          placeholder={t('projectPlaceholder')}
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
              {t('submitting')}
            </>
          ) : (
            t('submit')
          )}
        </button>
      </div>
    </form>
  );
}

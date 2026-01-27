'use client';

import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';

interface StepTwoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ formData, updateFormData, onNext, onBack }: StepTwoProps) {
  const t = useTranslations('contact.stepTwo');

  const needsOptions = [
    { id: 'branding', label: t('branding') },
    { id: 'print', label: t('print') },
    { id: 'webDesign', label: t('webDesign') },
    { id: 'websiteDevelopment', label: t('websiteDevelopment') },
    { id: 'other', label: t('other') },
  ];

  const toggleNeed = (needId: string) => {
    const currentNeeds = formData.needs;
    const newNeeds = currentNeeds.includes(needId)
      ? currentNeeds.filter((id) => id !== needId)
      : [...currentNeeds, needId];
    updateFormData({ needs: newNeeds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isValid = formData.needs.length > 0;

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

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-white text-black border border-black font-medium hover:bg-black hover:text-white transition-colors"
        >
          {t('back')}
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {t('next')}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { FormData } from './contact-form';

interface StepOneProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export default function StepOne({ formData, updateFormData, onNext }: StepOneProps) {
  const t = useTranslations('contact.stepOne');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isValid = formData.name && formData.email;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Type Toggle */}
      <div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'new-project' })}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              formData.projectType === 'new-project'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('newProject')}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'other' })}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              formData.projectType === 'other'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('other')}
          </button>
        </div>
      </div>

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
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="+32 456..."
        />
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {t('next')}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface SupportFormProps {
  onSubmit: (data: SupportFormData) => Promise<void>;
}

export interface SupportFormData {
  name: string;
  email: string;
  company: string;
  websiteUrl: string;
  issueType: string;
  urgencyLevel: string;
  description: string;
  files: File[];
}

export default function SupportForm({ onSubmit }: SupportFormProps) {
  const t = useTranslations('contact.support');
  const tCommon = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupportFormData>({
    name: '',
    email: '',
    company: '',
    websiteUrl: '',
    issueType: '',
    urgencyLevel: '',
    description: '',
    files: [],
  });

  const issueTypes = [
    { id: 'bug', label: t('issueTypes.bug') },
    { id: 'performance', label: t('issueTypes.performance') },
    { id: 'security', label: t('issueTypes.security') },
    { id: 'other', label: t('issueTypes.other') },
  ];

  const urgencyLevels = [
    { id: 'low', label: t('urgency.low') },
    { id: 'medium', label: t('urgency.medium') },
    { id: 'high', label: t('urgency.high') },
    { id: 'critical', label: t('urgency.critical') },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...filesArray] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid =
    formData.name &&
    formData.email &&
    formData.company &&
    formData.websiteUrl &&
    formData.issueType &&
    formData.urgencyLevel &&
    formData.description;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Client Notice */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 md:p-4">
        <p className="text-xs md:text-sm font-medium text-yellow-800">{t('clientNotice')}</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="support-name" className="block text-lg font-medium mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          id="support-name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="support-email" className="block text-lg font-medium mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="support-email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="john@company.com"
          required
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="support-company" className="block text-lg font-medium mb-2">
          {t('company')}
        </label>
        <input
          type="text"
          id="support-company"
          value={formData.company}
          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="Company Inc."
          required
        />
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="website-url" className="block text-lg font-medium mb-2">
          {t('websiteUrl')}
        </label>
        <input
          type="url"
          id="website-url"
          value={formData.websiteUrl}
          onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
          className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-black outline-none transition-colors bg-transparent"
          placeholder="https://yourwebsite.com"
          required
        />
      </div>

      {/* Issue Type */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{t('issueTypeTitle')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {issueTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, issueType: type.id }))}
              className={`py-2.5 md:py-3 px-3 md:px-4 border font-medium transition-colors text-sm md:text-base ${
                formData.issueType === type.id
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 bg-white text-gray-700 hover:border-black'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency Level */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">{t('urgencyTitle')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
          {urgencyLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, urgencyLevel: level.id }))}
              className={`py-2.5 md:py-3 px-3 md:px-4 border font-medium transition-colors text-sm md:text-base ${
                formData.urgencyLevel === level.id
                  ? 'border-black bg-black text-white'
                  : 'border-black/20 bg-white text-gray-700 hover:border-black'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-2">{t('descriptionTitle')}</h2>
        <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{t('descriptionSubtitle')}</p>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 md:px-4 py-2 md:py-3 border border-black/20 focus:border-black outline-none transition-colors resize-none text-sm md:text-base"
          rows={4}
          placeholder={t('descriptionPlaceholder')}
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-xl md:text-2xl font-medium mb-2">{t('filesTitle')}</h2>
        <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{t('filesSubtitle')}</p>
        <div className="border-2 border-dashed border-black/20 p-4 md:p-6 text-center">
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-4 md:px-6 py-2.5 md:py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black transition-colors text-sm md:text-base"
          >
            {t('uploadButton')}
          </label>
          <p className="text-xs md:text-sm text-gray-500 mt-2">{t('fileFormats')}</p>
        </div>

        {/* File List */}
        {formData.files.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-black/10 bg-gray-50"
              >
                <span className="text-sm font-medium truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  {t('removeFile')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-3 md:pt-4 sticky bottom-0 bg-white pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 border-t md:border-t-0 border-gray-200 md:static">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-black text-white border border-black font-medium hover:bg-white hover:text-black disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
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

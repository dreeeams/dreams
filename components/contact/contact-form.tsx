'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import StepOne from './step-one';
import StepTwo from './step-two';
import SupportForm, { SupportFormData } from './support-form';
import { trackFormSubmit, trackConversion } from '@/lib/google-ads-tracking';

export interface FormData {
  projectType: 'new-project' | 'support';
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  needs: string[];
  budget: string;
  projectDescription: string;
  referral: string;
  referralOther?: string;
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: 'new-project',
    name: '',
    company: '',
    email: '',
    phone: '',
    needs: [],
    budget: '',
    projectDescription: '',
    referral: '',
    referralOther: '',
  });

  const totalSteps = 2;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Build phone with country code if provided
      let whatsappNumber = '';
      if (formData.phone && formData.phoneCountry) {
        whatsappNumber = `+${formData.phoneCountry}${formData.phone}`;
      }

      // Build referral value - use custom text if "other" was selected
      let referralValue = formData.referral || '';
      if (formData.referral === 'other' && formData.referralOther) {
        referralValue = formData.referralOther;
      }

      // Map form data to API format
      const apiData = {
        fullName: formData.name,
        email: formData.email,
        whatsapp: whatsappNumber,
        company: formData.company,
        need: formData.needs,
        summary: formData.projectDescription || '',
        heardFrom: referralValue,
        acceptTerms: true,
        website: '', // honeypot field
      };

      const response = await fetch('/api/contact-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        // Track successful form submission
        trackFormSubmit();

        // Track conversion if Google Ads IDs are configured
        const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
        const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
        if (conversionId && conversionLabel) {
          trackConversion(conversionId, conversionLabel);
        }

        // Redirect to thank you page
        router.push(`/${locale}/thank-you`);
      } else {
        alert(t('errorMessage'));
      }
    } catch {
      alert(t('errorMessage'));
    }
  };

  const handleSupportSubmit = async (supportData: SupportFormData) => {
    try {
      // Map support data to API format
      const apiData = {
        fullName: supportData.name,
        email: supportData.email,
        company: supportData.company,
        websiteUrl: supportData.websiteUrl,
        issueType: supportData.issueType,
        urgencyLevel: supportData.urgencyLevel,
        summary: supportData.description,
        acceptTerms: true,
        website: '', // honeypot field
      };

      const response = await fetch('/api/contact-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        // Redirect to thank you page
        router.push(`/${locale}/thank-you`);
      } else {
        alert(t('errorMessage'));
      }
    } catch (error) {
      console.error('Error submitting support form:', error);
      alert(t('errorMessage'));
    }
  };

  return (
    <div className="bg-white border border-black p-8">
      {/* Project Type Tabs */}
      <div className="mb-8">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'new-project' })}
            className={`px-6 py-3 border font-medium transition-colors ${
              formData.projectType === 'new-project'
                ? 'border-black bg-black text-white'
                : 'border-black/20 bg-white text-gray-700 hover:border-black'
            }`}
          >
            {t('stepOne.newProject')}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'support' })}
            className={`px-6 py-3 border font-medium transition-colors ${
              formData.projectType === 'support'
                ? 'border-black bg-black text-white'
                : 'border-black/20 bg-white text-gray-700 hover:border-black'
            }`}
          >
            {t('stepOne.support')}
          </button>
        </div>
      </div>

      {/* Step Content */}
      {formData.projectType === 'support' ? (
        <SupportForm onSubmit={handleSupportSubmit} />
      ) : (
        <>
          {currentStep === 1 && (
            <StepOne
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              formData={formData}
              updateFormData={updateFormData}
              onBack={prevStep}
              onSubmit={handleSubmit}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )}
        </>
      )}
    </div>
  );
}

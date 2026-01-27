'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';

export interface FormData {
  projectType: 'new-project' | 'other';
  name: string;
  company: string;
  email: string;
  phone: string;
  needs: string[];
  budget: string;
  projectDescription: string;
}

export default function ContactForm() {
  const t = useTranslations('contact');
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
  });

  const totalSteps = 3;

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
      // Map form data to API format
      const apiData = {
        fullName: formData.name,
        email: formData.email,
        whatsapp: formData.phone,
        company: formData.company,
        need: formData.needs,
        summary: formData.projectDescription,
        acceptTerms: true,
        website: '', // honeypot field
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        alert(t('successMessage'));
        // Reset form
        setFormData({
          projectType: 'new-project',
          name: '',
          company: '',
          email: '',
          phone: '',
          needs: [],
          budget: '',
          projectDescription: '',
        });
        setCurrentStep(1);
      } else {
        alert(t('errorMessage'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('errorMessage'));
    }
  };

  return (
    <div className="bg-white border border-black p-8">
      {/* Project Type Tabs */}
      <div className="border-b border-black/10 mb-8">
        <div className="flex gap-0">
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'new-project' })}
            className={`px-6 py-3 border-b-2 font-medium transition-colors ${
              formData.projectType === 'new-project'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black hover:border-black/20'
            }`}
          >
            {t('stepOne.newProject')}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'other' })}
            className={`px-6 py-3 border-b-2 font-medium transition-colors ${
              formData.projectType === 'other'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black hover:border-black/20'
            }`}
          >
            {t('stepOne.other')}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2 gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 transition-colors ${
                step <= currentStep ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center font-mono tracking-wider">
          {t('step')} {currentStep} {t('of')} {totalSteps}
        </p>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <StepOne
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          formData={formData}
          updateFormData={updateFormData}
          onBack={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

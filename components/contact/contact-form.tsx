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
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Project Type Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'new-project' })}
            className={`pb-3 font-medium transition-all relative ${
              formData.projectType === 'new-project'
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('stepOne.newProject')}
            {formData.projectType === 'new-project' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ projectType: 'other' })}
            className={`pb-3 font-medium transition-all relative ${
              formData.projectType === 'other'
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('stepOne.other')}
            {formData.projectType === 'other' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                step <= currentStep ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">
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

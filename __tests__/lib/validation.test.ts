import { describe, it, expect } from 'vitest';
import { ContactFormSchema } from '@/lib/validation';

describe('Contact Form Validation', () => {
  it('should validate a correct contact form', () => {
    const validData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      whatsapp: '+573001234567',
      role: 'developer',
      company: 'Tech Corp',
      websiteUrl: 'https://example.com',
      companySize: 'small',
      industry: 'tech',
      need: ['webapp'],
      summary: 'Need a web application',
      acceptTerms: true,
      website: '', // Honeypot field
    };

    const result = ContactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      fullName: 'John Doe',
      email: 'invalid-email',
      whatsapp: '+573001234567',
      role: 'developer',
      company: 'Tech Corp',
      companySize: 'small',
      industry: 'tech',
      need: ['webapp'],
      acceptTerms: true,
      website: '',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject if terms not accepted', () => {
    const invalidData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      whatsapp: '+573001234567',
      role: 'developer',
      company: 'Tech Corp',
      companySize: 'small',
      industry: 'tech',
      need: ['webapp'],
      acceptTerms: false,
      website: '',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject if honeypot is filled (bot detection)', () => {
    const botData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      whatsapp: '+573001234567',
      role: 'developer',
      company: 'Tech Corp',
      companySize: 'small',
      industry: 'tech',
      need: ['webapp'],
      acceptTerms: true,
      website: 'bot filled this', // Honeypot field filled = bot
    };

    const result = ContactFormSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });

  it('should accept a form without optional fields', () => {
    const minimalData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      company: 'Tech Corp',
      need: ['webapp'],
      acceptTerms: true,
      website: '',
    };

    const result = ContactFormSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });
});

import { z } from 'zod';

/**
 * Contact Form Validation Schema
 * Validates all inputs with strict rules to prevent injection attacks
 */

// Phone number validation (E.164 format)
const phoneRegex = /^\+[1-9]\d{1,14}$/;

// URL validation (basic but safe)
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

// LinkedIn URL validation
const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;

// Instagram handle validation
const instagramRegex = /^@?[a-zA-Z0-9._]{1,30}$/;

// Name validation (letters, spaces, hyphens, apostrophes, accents)
const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,100}$/;

// Company name validation (alphanumeric, spaces, common business characters)
const companyRegex = /^[a-zA-Z0-9\s&.,'()-]{2,100}$/;

// Personal email domains to block (common free email providers)
const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'yandex.com',
  'mail.com',
  'gmx.com',
  'tutanota.com',
  'fastmail.com',
  'hushmail.com',
  'inbox.com',
  'mail.ru',
  'rediffmail.com',
];

/**
 * Validates if an email is corporate (not from a personal email provider)
 * @param email - Email address to validate
 * @returns true if corporate email, false if personal
 */
export function isCorporateEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;

  return !personalEmailDomains.includes(domain);
}

export const ContactFormSchema = z.object({
  // Required fields
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(nameRegex, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase()
    .trim()
    .refine(
      (email) => isCorporateEmail(email),
      'Please use a corporate email address (personal emails like Gmail, Yahoo, etc. are not accepted)'
    ),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .regex(companyRegex, 'Company name contains invalid characters'),

  need: z
    .union([
      z.string().min(1, 'Please select a service'),
      z.array(z.string()).min(1, 'Please select at least one service'),
    ])
    .transform((val) => (Array.isArray(val) ? val : [val])),

  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),

  // Optional fields
  whatsapp: z
    .string()
    .regex(phoneRegex, 'Invalid phone number format (use +country code + number)')
    .optional()
    .or(z.literal('')),

  linkedin: z
    .string()
    .regex(linkedinRegex, 'Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),

  role: z
    .string()
    .max(100, 'Role must be less than 100 characters')
    .regex(nameRegex, 'Role contains invalid characters')
    .optional()
    .or(z.literal('')),

  websiteUrl: z
    .string()
    .regex(urlRegex, 'Invalid website URL')
    .optional()
    .or(z.literal('')),

  instagram: z
    .string()
    .regex(instagramRegex, 'Invalid Instagram handle')
    .optional()
    .or(z.literal('')),

  companySize: z
    .enum(['solo', 'small', 'medium', 'large', 'enterprise'])
    .optional()
    .or(z.literal('')),

  industry: z
    .enum([
      'tech',
      'ecommerce',
      'finance',
      'health',
      'education',
      'realEstate',
      'food',
      'entertainment',
      'services',
      'other',
    ])
    .optional()
    .or(z.literal('')),

  budget: z
    .enum([
      'less-2500',
      '2500-5000',
      '5000-10000',
      '10000-15000',
      '15000-20000',
      '20000-30000',
      'more-30000',
      'dont-know',
    ])
    .optional()
    .or(z.literal('')),

  summary: z
    .string()
    .max(500, 'Summary must be less than 500 characters')
    .optional()
    .or(z.literal('')),

  heardFrom: z
    .string()
    .max(100, 'Source must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  website: z
    .string()
    .max(0, 'Honeypot field must be empty')
    .optional()
    .or(z.literal('')), // Honeypot field
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Validates contact form data
 * @throws {z.ZodError} if validation fails
 */
export function validateContactForm(data: unknown): ContactFormData {
  return ContactFormSchema.parse(data);
}

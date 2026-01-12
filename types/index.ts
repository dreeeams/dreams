/**
 * Shared TypeScript Types and Interfaces
 * Centralized type definitions to avoid duplication
 */

// Locale Types
export type Locale = 'en' | 'es';

// Form Types
export type CompanySize = 'solo' | 'small' | 'medium' | 'large' | 'enterprise';

export type Industry =
  | 'tech'
  | 'ecommerce'
  | 'finance'
  | 'health'
  | 'education'
  | 'realEstate'
  | 'food'
  | 'entertainment'
  | 'services'
  | 'other';

export type Need =
  | 'landing'
  | 'webapp'
  | 'mobile'
  | 'chatbot'
  | 'automation'
  | 'design'
  | 'other';

export type HeardFrom =
  | 'google'
  | 'social'
  | 'referral'
  | 'linkedin'
  | 'instagram'
  | 'event'
  | 'other';

export interface ContactFormData {
  fullName: string;
  email: string;
  whatsapp?: string;
  linkedin?: string;
  role?: string;
  company: string;
  website?: string;
  websiteUrl?: string;
  instagram?: string;
  companySize?: CompanySize;
  industry?: Industry;
  need: Need[] | string;
  summary?: string;
  heardFrom?: HeardFrom;
  acceptTerms: boolean;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

// Rate Limit Types
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
}

// Web Vitals Types
export type WebVitalMetric =
  | 'CLS'
  | 'FID'
  | 'LCP'
  | 'FCP'
  | 'TTFB'
  | 'INP';

export type MetricRating = 'good' | 'needs-improvement' | 'poor';

export interface WebVitalThreshold {
  good: number;
  poor: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
}

// Portfolio Types
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  category: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies?: string[];
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

// Error Types
export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

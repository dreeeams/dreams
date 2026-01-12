/**
 * Application Constants
 * Centralized constants to avoid magic numbers and strings
 */

// Rate Limiting
export const RATE_LIMIT = {
  REQUESTS: 3,
  WINDOW: '1 m',
  WINDOW_MS: 60_000,
} as const;

// Animation Timings
export const ANIMATION = {
  TYPING_DELAY: 150,
  MESSAGE_DELAY: 800,
  PAGE_LOAD_MIN_DELAY: 500,
  MENU_TRANSITION_DELAY: 300,
} as const;

// Cache Durations (in seconds)
export const CACHE = {
  STATIC_ASSETS: 31536000, // 1 year
  FAVICON: 86400, // 1 day
} as const;

// External URLs
export const SOCIAL_MEDIA = {
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/dreamstudio',
  LINKEDIN: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/dreamstudio',
  TWITTER: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/dreamstudio',
  EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'contact@dreamstudio.dev',
  WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP || '',
} as const;

// Form Steps
export const FORM_STEPS = {
  CONTACT: 1,
  COMPANY: 2,
  PROJECT: 3,
  TOTAL: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  HEALTH: '/api/health',
} as const;

// SEO
export const SEO = {
  DEFAULT_TITLE: 'Dream Studio - Web & Mobile App Development Experts',
  DEFAULT_DESCRIPTION:
    'Dream Studio builds scalable web and mobile apps. Expert developers in React, Next.js & React Native.',
  SITE_NAME: 'Dream Studio',
  TWITTER_HANDLE: '@dreamstudio',
} as const;

// Validation Limits
export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 100,
  COMPANY_MAX: 100,
  ROLE_MAX: 100,
  SUMMARY_MAX: 500,
} as const;

// Web Vitals Thresholds
export const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  LCP: { good: 2500, poor: 4000 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
} as const;

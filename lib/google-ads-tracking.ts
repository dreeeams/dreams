/**
 * Google Ads Conversion Tracking
 *
 * Track user interactions with the contact form for Google Ads optimization
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        currency?: string;
        send_to?: string;
        [key: string]: unknown;
      }
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track when user starts filling the form (Step 1 interaction)
 */
export function trackFormStart() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_start', {
      event_category: 'Contact Form',
      event_label: 'User started filling contact form',
    });
    console.log('📊 Google Ads: form_start tracked');
  }
}

/**
 * Track when user reaches Step 2
 */
export function trackStep2Reached() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_step_2', {
      event_category: 'Contact Form',
      event_label: 'User reached step 2',
    });
    console.log('📊 Google Ads: form_step_2 tracked');
  }
}

/**
 * Track form submission (conversion)
 */
export function trackFormSubmit() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Contact Form',
      event_label: 'Form submitted successfully',
    });
    console.log('📊 Google Ads: form_submit tracked');
  }
}

/**
 * Track conversion with specific conversion ID and label
 * Use this for Google Ads conversion tracking
 */
export function trackConversion(conversionId?: string, conversionLabel?: string) {
  if (typeof window !== 'undefined' && window.gtag && conversionId && conversionLabel) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
    });
    console.log(`📊 Google Ads: conversion tracked (${conversionId}/${conversionLabel})`);
  }
}

/**
 * Track need/service selection
 */
export function trackNeedSelection(needs: string[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'need_selection', {
      event_category: 'Contact Form',
      event_label: needs.join(', '),
    });
    console.log('📊 Google Ads: need_selection tracked:', needs);
  }
}

/**
 * Track budget selection
 */
export function trackBudgetSelection(budget: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'budget_selection', {
      event_category: 'Contact Form',
      event_label: budget,
    });
    console.log('📊 Google Ads: budget_selection tracked:', budget);
  }
}

/**
 * Track referral source selection
 */
export function trackReferralSelection(referral: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'referral_selection', {
      event_category: 'Contact Form',
      event_label: referral,
    });
    console.log('📊 Google Ads: referral_selection tracked:', referral);
  }
}

'use client';

import { useEffect } from 'react';
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';
import { reportWebVitals } from '@/lib/web-vitals';

/**
 * Web Vitals Reporter Component
 * Automatically tracks and reports Core Web Vitals metrics
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Loading performance
 * - INP (Interaction to Next Paint): Responsiveness (replaces FID)
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Initial load
 * - TTFB (Time to First Byte): Server response time
 *
 * Note: FID has been deprecated in favor of INP in web-vitals v4
 */
export default function WebVitalsReporter() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    onCLS(reportWebVitals);
    onLCP(reportWebVitals);
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  }, []);

  // This component doesn't render anything
  return null;
}

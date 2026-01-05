'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', metric.name, metric.value, metric.rating);
    }

    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      const analyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

      if (analyticsUrl) {
        // Use sendBeacon if available for better reliability
        if (navigator.sendBeacon) {
          navigator.sendBeacon(analyticsUrl, body);
        } else {
          fetch(analyticsUrl, {
            method: 'POST',
            body,
            headers: {
              'Content-Type': 'application/json',
            },
            keepalive: true,
          }).catch((error) => {
            console.error('Failed to send web vitals:', error);
          });
        }
      }

      // Also send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }
    }
  });

  return null;
}

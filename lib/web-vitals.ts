/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals metrics and sends them to analytics
 */

import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-insights.com/v1/vitals';

function getConnectionSpeed(): string {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const conn = (navigator as any).connection;
  return conn?.effectiveType || 'unknown';
}

/**
 * Send metrics to analytics endpoint
 */
export function sendToAnalytics(metric: Metric) {
  const body: Record<string, string> = {
    dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || '',
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

/**
 * Log metrics to console in development
 */
export function logMetric(metric: Metric) {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Check if metric is poor and log warning
  if (metric.rating === 'poor') {
    console.warn(`⚠️ Poor ${metric.name} detected:`, metric.value);
  }
}

/**
 * Get threshold status for a metric
 * Note: FID is deprecated in favor of INP
 */
export function getMetricStatus(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    LCP: { good: 2500, poor: 4000 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];

  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report all Web Vitals
 */
export function reportWebVitals(metric: Metric) {
  // Log to console
  logMetric(metric);

  // Send to analytics
  sendToAnalytics(metric);

  // You can also send to your own analytics service here
  // Example: sendToCustomAnalytics(metric);
}

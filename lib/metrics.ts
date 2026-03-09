/**
 * Performance metrics tracking utility
 * Tracks API response times, success rates, and other metrics
 */

interface MetricData {
  name: string;
  value: number;
  unit: 'ms' | 'count' | 'bytes';
  tags?: Record<string, string>;
  timestamp?: number;
}

/**
 * Log a performance metric
 *
 * @param name - Metric name (e.g., 'api.contact.duration')
 * @param value - Metric value
 * @param unit - Unit of measurement
 * @param tags - Additional context tags
 *
 * @example
 * trackMetric('api.contact.duration', 142, 'ms', { status: '200' });
 */
export function trackMetric(
  name: string,
  value: number,
  unit: 'ms' | 'count' | 'bytes' = 'ms',
  tags?: Record<string, string>
) {
  const metric: MetricData = {
    name,
    value,
    unit,
    tags,
    timestamp: Date.now(),
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[METRIC]', metric);
  }

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Vercel Analytics, Datadog, or similar
    // Example: analytics.track(metric);
  }
}

/**
 * Measure async function execution time
 *
 * @param name - Metric name
 * @param fn - Async function to measure
 * @param tags - Additional context tags
 *
 * @example
 * const result = await measureAsync('db.query.users', () => db.users.findMany());
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const start = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - start;

    trackMetric(name, duration, 'ms', { ...tags, status: 'success' });

    return result;
  } catch (error) {
    const duration = performance.now() - start;

    trackMetric(name, duration, 'ms', { ...tags, status: 'error' });

    throw error;
  }
}

/**
 * Create a timer for manual measurement
 *
 * @param name - Metric name
 * @param tags - Additional context tags
 *
 * @example
 * const timer = startTimer('process.images');
 * // ... do work
 * timer.end({ count: imageCount });
 */
export function startTimer(name: string, tags?: Record<string, string>) {
  const start = performance.now();

  return {
    end: (additionalTags?: Record<string, string>) => {
      const duration = performance.now() - start;
      trackMetric(name, duration, 'ms', { ...tags, ...additionalTags });
      return duration;
    },
  };
}

/**
 * Track API endpoint metrics
 */
export function trackAPIMetrics(
  endpoint: string,
  method: string,
  duration: number,
  statusCode: number
) {
  trackMetric('api.request.duration', duration, 'ms', {
    endpoint,
    method,
    status: statusCode.toString(),
  });

  trackMetric('api.request.count', 1, 'count', {
    endpoint,
    method,
    status: statusCode.toString(),
  });
}

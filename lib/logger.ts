/**
 * Production-safe logger utility
 * - Errors and warnings always logged (critical for debugging)
 * - Info and debug logs only in development
 * - Structured logging for better monitoring
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';

/**
 * Format log message with timestamp and context
 */
function formatLog(level: string, args: any[]): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  return `${prefix} ${args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
  ).join(' ')}`;
}

export const logger = {
  /**
   * Debug logs - only in development
   */
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Error logs - ALWAYS logged (critical for production debugging)
   * In production, these should be sent to error tracking service
   */
  error: (...args: any[]) => {
    console.error(...args);

    // In production server-side, you could send to error tracking
    if (!isDevelopment && isServer) {
      // TODO: Send to Sentry/error tracking service
      // Example: Sentry.captureException(args[0]);
      const formatted = formatLog('error', args);
      console.error(formatted);
    }
  },

  /**
   * Warning logs - ALWAYS logged (important for monitoring)
   */
  warn: (...args: any[]) => {
    console.warn(...args);

    // In production, format for better parsing
    if (!isDevelopment && isServer) {
      const formatted = formatLog('warn', args);
      console.warn(formatted);
    }
  },

  /**
   * Info logs - only in development
   */
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

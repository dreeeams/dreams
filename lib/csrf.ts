/**
 * CSRF Protection
 * Validates request origin to prevent Cross-Site Request Forgery attacks
 */

/**
 * Gets the list of allowed origins for CSRF protection
 * @returns Array of allowed origin URLs
 */
export function getAllowedOrigins(): string[] {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const allowedOrigins: string[] = [];

  // Add configured site URL
  if (siteUrl) {
    allowedOrigins.push(siteUrl);
  }

  // Add production domains
  allowedOrigins.push('https://dreeeams.com');
  allowedOrigins.push('https://www.dreeeams.com');
  allowedOrigins.push('https://preview.dreeeams.com');

  // Add localhost for development
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000');
    allowedOrigins.push('http://localhost:3001');
    allowedOrigins.push('http://127.0.0.1:3000');
  }

  // Remove duplicates and empty strings
  return [...new Set(allowedOrigins)].filter(Boolean);
}

/**
 * Validates the request origin against allowed origins
 * @param origin - The Origin header from the request
 * @returns true if valid, false if invalid/missing
 */
export function validateOrigin(origin: string | null): boolean {
  // In development, be more lenient
  if (process.env.NODE_ENV === 'development' && !origin) {
    return true; // Allow requests without origin in dev (e.g., curl, Postman)
  }

  // If no origin header, we'll validate using referer instead
  // Some browsers don't send origin on same-origin requests
  if (!origin) {
    return true; // Allow and rely on referer check
  }

  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin);
}

/**
 * Validates the request referer as a secondary check
 * @param referer - The Referer header from the request
 * @returns true if valid or missing, false if invalid
 */
export function validateReferer(referer: string | null): boolean {
  // Referer is optional, but if present, should match our domain
  if (!referer) {
    return true; // Missing referer is okay
  }

  try {
    const refererUrl = new URL(referer);
    const allowedOrigins = getAllowedOrigins();

    return allowedOrigins.some((allowed) => {
      const allowedUrl = new URL(allowed);
      return refererUrl.hostname === allowedUrl.hostname;
    });
  } catch {
    // Invalid referer URL
    return false;
  }
}

/**
 * Comprehensive CSRF validation
 * Checks both origin and referer headers
 * @param headers - Request headers
 * @returns Object with validation result and error message
 */
export function validateCSRF(headers: Headers): {
  valid: boolean;
  error?: string;
} {
  const origin = headers.get('origin');
  const referer = headers.get('referer');

  // Check origin first (most reliable)
  if (!validateOrigin(origin)) {
    return {
      valid: false,
      error: 'Invalid or missing origin header',
    };
  }

  // Check referer as secondary validation
  if (!validateReferer(referer)) {
    return {
      valid: false,
      error: 'Invalid referer header',
    };
  }

  return { valid: true };
}

/**
 * Checks if request is from a same-site context
 * @param headers - Request headers
 * @returns true if same-site, false otherwise
 */
export function isSameSite(headers: Headers): boolean {
  const origin = headers.get('origin');
  const referer = headers.get('referer');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  try {
    const siteHost = new URL(siteUrl).hostname;

    if (origin) {
      const originHost = new URL(origin).hostname;
      if (originHost === siteHost) return true;
    }

    if (referer) {
      const refererHost = new URL(referer).hostname;
      if (refererHost === siteHost) return true;
    }

    return false;
  } catch {
    return false;
  }
}

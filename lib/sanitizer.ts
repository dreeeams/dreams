import DOMPurify from 'isomorphic-dompurify';

/**
 * Robust input sanitization to prevent XSS, SQL injection, and other attacks
 */

/**
 * Sanitizes a string input by removing HTML tags and escaping special characters
 * @param input - The string to sanitize
 * @returns Sanitized string safe for database storage and display
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  // 1. Trim whitespace
  let clean = input.trim();

  // 2. Remove all HTML tags using DOMPurify
  clean = DOMPurify.sanitize(clean, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content
  });

  // 3. Escape special characters for additional safety
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // 4. Remove any potential script injection attempts
  clean = clean
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/<script/gi, '')
    .replace(/<\/script>/gi, '');

  return clean;
}

/**
 * Sanitizes an email address
 * @param email - The email to sanitize
 * @returns Sanitized and lowercased email
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Sanitizes a URL
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  try {
    const parsed = new URL(url.trim());

    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Validates that a string doesn't contain NoSQL injection patterns
 * @param input - The string to validate
 * @returns true if safe, false if potentially malicious
 */
export function validateNoSQLInjection(input: string): boolean {
  const dangerousPatterns = [
    /\$where/i,
    /\$ne/i,
    /\$gt/i,
    /\$gte/i,
    /\$lt/i,
    /\$lte/i,
    /\$regex/i,
    /\$in/i,
    /\$nin/i,
    /\{\s*\$/,
    /javascript:/i,
    /eval\s*\(/i,
    /function\s*\(/i,
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(input));
}

/**
 * Capitalizes first letter of each word
 * @param text - The text to capitalize
 * @returns Capitalized text
 */
export function capitalizeText(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Comprehensive sanitization for contact form data
 * Combines validation and sanitization
 */
export function sanitizeContactData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Check for NoSQL injection patterns
      if (!validateNoSQLInjection(value)) {
        throw new Error(`Potential injection attack detected in field: ${key}`);
      }

      // Sanitize based on field type
      if (key === 'email') {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.includes('Url') || key.includes('website')) {
        sanitized[key] = sanitizeUrl(value);
      } else if (key === 'fullName' || key === 'company' || key === 'role') {
        sanitized[key] = capitalizeText(sanitizeInput(value));
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

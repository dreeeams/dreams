/**
 * Checks if the current environment is localhost
 * Used to restrict admin features to local development only
 */
export function isLocalhost(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: check headers
    return false;
  }

  // Client-side: check hostname
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

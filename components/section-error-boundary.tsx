'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from './error-boundary';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  section: string;
}

/**
 * Lightweight Error Boundary for page sections
 *
 * Shows a compact error message that doesn't take over the whole page.
 * Useful for wrapping individual sections like forms, portfolios, etc.
 *
 * @example
 * <SectionErrorBoundary section="Contact Form">
 *   <ContactSection />
 * </SectionErrorBoundary>
 */
export function SectionErrorBoundary({ children, section }: SectionErrorBoundaryProps) {
  const fallback = (
    <div className="p-6 border border-red-200 bg-red-50 rounded-lg my-8">
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Error in {section}
      </h3>
      <p className="text-sm text-red-700 mb-4">
        We're having trouble loading this section. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
      >
        Refresh Page
      </button>
    </div>
  );

  return (
    <ErrorBoundary section={section} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}

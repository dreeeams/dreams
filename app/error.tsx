'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="border-4 border-black p-12 bg-black text-white mb-8">
          <h1 className="text-9xl font-nostalgic mb-4">500</h1>
          <p className="text-2xl font-bold mb-2">SOMETHING WENT WRONG</p>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            We're sorry, but something unexpected happened. Our team has been notified.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border-2 border-red-500 p-4 text-left">
              <p className="font-mono text-sm text-red-700 break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="bg-black text-white border-2 border-black px-8 py-3 font-bold hover:bg-brand hover:border-brand transition-colors"
            >
              TRY AGAIN
            </button>
            <a
              href="/"
              className="bg-white text-black border-2 border-black px-8 py-3 font-bold hover:bg-gray-100 transition-colors inline-block"
            >
              GO HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

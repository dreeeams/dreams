'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry, LogRocket, etc.)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background-light">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Icon */}
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="border-4 border-black bg-white p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-nostalgic mb-4">
              SOMETHING WENT WRONG
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We encountered an unexpected error. Our team has been notified.
            </p>

            {/* Terminal-style error */}
            <div className="bg-black text-white p-4 font-mono text-left text-sm mb-6 overflow-x-auto">
              <p className="text-red-400">&gt; Error: {error.message || 'Unknown error'}</p>
              {error.digest && <p className="text-gray-400">&gt; Digest: {error.digest}</p>}
              <p className="text-yellow-400">&gt; Status: Logging error...</p>
              <p className="text-green-400">&gt; Ready to retry</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="bg-black text-white px-8 py-4 border-2 border-black font-bold hover:bg-brand hover:border-brand transition-colors"
              >
                TRY AGAIN
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/"
                className="bg-white text-black px-8 py-4 border-2 border-black font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                GO HOME
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import { useTranslations } from 'next-intl';

type LoaderContextType = {
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextType>({ isLoading: true });

export const useLoader = () => useContext(LoaderContext);

export default function PageLoader() {
  const t = useTranslations('loader.messages');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    t('init'),
    t('loading'),
    t('compiling'),
    t('preparing'),
    t('almostReady'),
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoading(false);
            // Dispatch custom event when loading completes
            window.dispatchEvent(new Event('loaderComplete'));
          }, 500);
          return 100;
        }
        // Faster initial progress, slower at the end
        const increment = prev < 60 ? Math.random() * 15 + 5 : Math.random() * 5 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    // Change messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background-light flex items-center justify-center"
        >
          <div className="max-w-md w-full px-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-12"
            >
              <svg
                width="48"
                height="56"
                viewBox="0 0 97 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4"
                role="img"
                aria-labelledby="loader-logo-title"
              >
                <title id="loader-logo-title">Dream Studio Loading</title>
                <motion.path
                  d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z"
                  fill="currentColor"
                  className="text-black"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <div className="text-2xl font-logo" aria-label="Dreeeams">DREEEAMS</div>
            </motion.div>

            {/* Terminal Message */}
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="font-mono text-sm text-gray-600 mb-6 h-6"
            >
              {loadingMessages[messageIndex]}
            </motion.div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full h-1 bg-gray-200 border border-black">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Percentage Counter */}
            <motion.div
              className="mt-4 text-center font-mono text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

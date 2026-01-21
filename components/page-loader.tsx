'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background-light flex items-center justify-center"
        >
          <div className="max-w-md w-full px-8">
            {/* Logo */}
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-12"
            >
              <Image
                src="/dreeeams-logo.png"
                alt="Dreeeams"
                width={200}
                height={52}
                className="h-auto w-auto max-w-[250px]"
                priority
              />
            </m.div>

            {/* Terminal Message */}
            <m.div
              key={messageIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="font-mono text-sm text-gray-600 mb-6 h-6"
            >
              {loadingMessages[messageIndex]}
            </m.div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full h-1 bg-gray-200 border border-black">
                <m.div
                  className="h-full bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Percentage Counter */}
            <m.div
              className="mt-4 text-center font-mono text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(progress)}%
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

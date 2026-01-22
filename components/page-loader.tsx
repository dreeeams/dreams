'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';

type LoaderContextType = {
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextType>({ isLoading: true });

export const useLoader = () => useContext(LoaderContext);

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black overflow-hidden"
        >
          {/* Loading Percentage - Top Right Corner */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-8 right-8 text-white font-mono text-7xl md:text-9xl font-bold"
          >
            {Math.round(progress)}%
          </m.div>

          {/* Giant Logo - Bottom Center, Partially Cut Off */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] max-w-[3000px]"
            style={{
              transform: 'translateX(-50%) translateY(35%)'
            }}
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-full h-auto"
              style={{
                filter: 'brightness(0) invert(1)',
                opacity: 0.9
              }}
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

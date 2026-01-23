'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import Logo from '@/components/logo';
import { transitions } from '@/lib/motion-presets';

type LoaderContextType = {
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextType>({ isLoading: true });

export const useLoader = () => useContext(LoaderContext);

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress with smooth animation (1.5s max)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoading(false);
            // Dispatch custom event when loading completes
            window.dispatchEvent(new Event('loaderComplete'));
          }, 300);
          return 100;
        }
        // Calculated to reach 100% in ~1.5 seconds (30 intervals of 50ms)
        const increment = prev < 70 ? Math.random() * 2 + 3 : Math.random() * 1 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.medium}
          className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
        >
          {/* Loading Percentage - Top Right Corner */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transitions.medium }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-12 md:right-12 text-white font-mono text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold z-20"
          >
            {Math.round(progress)}%
          </m.div>

          {/* Giant Logo SVG - Bottom Center */}
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...transitions.smooth }}
            className="absolute bottom-0 left-0 right-0 w-[180vw] sm:w-[160vw] md:w-[140vw] lg:w-[120vw] max-w-[4000px] mx-auto"
            style={{
              transform: 'translateY(35%)',
              opacity: 0.85
            }}
          >
            <Logo fill="white" className="w-full h-auto" />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

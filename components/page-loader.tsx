'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import Image from 'next/image';

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
          className="fixed inset-0 z-[9999] bg-black flex items-end justify-center overflow-hidden"
        >
          {/* Loading Percentage - Top Right Corner */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-8 right-8 text-white font-mono text-6xl md:text-8xl font-bold z-10"
          >
            {Math.round(progress)}%
          </m.div>

          {/* Giant Logo - Bottom Center, Partially Cut Off */}
          <m.div
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: '180vw',
              maxWidth: '2500px',
              transform: 'translateX(-50%) translateY(40%)'
            }}
          >
            <Image
              src="/logo.svg"
              alt="Dreeeams"
              width={2780}
              height={730}
              className="w-full h-auto brightness-0 invert opacity-90"
              priority
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

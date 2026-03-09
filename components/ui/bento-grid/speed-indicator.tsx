'use client';

import React, { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';

interface SpeedIndicatorProps {
  loadTimeText: string;
}

function SpeedIndicatorComponent({ loadTimeText }: SpeedIndicatorProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 sm:gap-4">
      <div className="h-8 sm:h-10 flex items-center justify-center overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <m.div
              key="loader"
              className="h-6 w-20 sm:h-8 sm:w-24 bg-black/10 group-hover:bg-overlay-bg-light border border-black group-hover:border-white transition-smooth"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: 'absolute' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <m.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-white transition-smooth"
            >
              100ms
            </m.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 font-bold transition-smooth">
        {loadTimeText}
      </span>
      <div className="w-full max-w-[100px] sm:max-w-[120px] h-1.5 bg-overlay-bg-light group-hover:bg-overlay-bg-light overflow-hidden border border-white group-hover:border-white transition-smooth">
        <m.div
          className="h-full bg-white group-hover:bg-white transition-smooth"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  );
}

export const SpeedIndicator = memo(SpeedIndicatorComponent);

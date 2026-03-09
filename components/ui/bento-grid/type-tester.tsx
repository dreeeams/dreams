'use client';

import React, { useState, useEffect, memo } from 'react';
import { m } from 'framer-motion';
import { transitions } from '@/lib/motion-presets';

function TypeTesterComponent() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <m.span
        className="font-serif text-4xl sm:text-6xl md:text-8xl text-black group-hover:text-white font-medium transition-smooth"
        animate={{ scale }}
        transition={{ ...transitions.smooth }}
      >
        Aa
      </m.span>
    </div>
  );
}

export const TypeTester = memo(TypeTesterComponent);

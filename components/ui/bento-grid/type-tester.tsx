'use client';

import React, { useState, memo } from 'react';
import { m } from 'framer-motion';
import { transitions } from '@/lib/motion-presets';
import { useInterval } from '@/lib/hooks/use-interval';

function TypeTesterComponent() {
  const [scale, setScale] = useState(1);

  useInterval(() => {
    setScale((prev) => (prev === 1 ? 1.5 : 1));
  }, 2000);

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

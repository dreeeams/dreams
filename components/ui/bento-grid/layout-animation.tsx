'use client';

import React, { useState, memo } from 'react';
import { m } from 'framer-motion';
import { easing, transitions } from '@/lib/motion-presets';
import { useInterval } from '@/lib/hooks/use-interval';

function LayoutAnimationComponent() {
  const [layout, setLayout] = useState(0);

  useInterval(() => {
    setLayout((prev) => (prev + 1) % 3);
  }, 2500);

  const layouts = ['grid-cols-2', 'grid-cols-3', 'grid-cols-1'];

  return (
    <div className="h-full flex items-center justify-center">
      <m.div
        className={`grid ${layouts[layout]} gap-1 sm:gap-1.5 w-full max-w-[100px] sm:max-w-[140px] h-full`}
        layout
        transition={{ ...transitions.medium, ease: easing.smooth }}
      >
        {[1, 2, 3].map((i) => (
          <m.div
            key={i}
            className="bg-black group-hover:bg-white h-4 sm:h-5 w-full border border-black group-hover:border-white transition-smooth"
            layout
            transition={{ ...transitions.medium, ease: easing.smooth }}
          />
        ))}
      </m.div>
    </div>
  );
}

export const LayoutAnimation = memo(LayoutAnimationComponent);

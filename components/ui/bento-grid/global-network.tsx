'use client';

import React, { memo } from 'react';
import { m } from 'framer-motion';

function GlobalNetworkComponent() {
  const pulses = [0, 1];

  return (
    <div className="flex items-center justify-center h-full relative">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        className="w-10 h-10 sm:w-14 sm:h-14 z-10 fill-black group-hover:fill-white transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
      {pulses.map((pulse) => (
        <m.div
          key={pulse}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border border-black/10 group-hover:border-overlay-border-light rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export const GlobalNetwork = memo(GlobalNetworkComponent);

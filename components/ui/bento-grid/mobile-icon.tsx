'use client';

import React, { memo } from 'react';
import { m } from 'framer-motion';

function MobileIconComponent() {
  return (
    <m.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className="w-12 h-12 sm:w-16 sm:h-16"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        y: [0, -8, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Phone body */}
      <rect
        x="20"
        y="8"
        width="24"
        height="48"
        className="fill-none stroke-black group-hover:stroke-white transition-smooth"
        strokeWidth="1"
      />
      {/* Screen */}
      <rect x="22" y="12" width="20" height="36" className="fill-black group-hover:fill-white transition-smooth" />
      {/* Home button/indicator */}
      <circle cx="32" cy="52" r="2" className="fill-black group-hover:fill-white transition-smooth" />
    </m.svg>
  );
}

export const MobileIcon = memo(MobileIconComponent);

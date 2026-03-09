'use client';

import React, { useState, useEffect, memo } from 'react';
import { m } from 'framer-motion';
import { Lock } from 'lucide-react';

interface Shield {
  id: number;
  active: boolean;
}

function SecurityBadgeComponent() {
  const [shields, setShields] = useState<Shield[]>([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShields((prev) => {
        const nextIndex = prev.findIndex((s) => !s.active);
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }));
        }
        return prev.map((s, i) => (i === nextIndex ? { ...s, active: true } : s));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full gap-1.5 sm:gap-2">
      {shields.map((shield) => (
        <m.div
          key={shield.id}
          className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border transition-smooth ${
            shield.active
              ? 'bg-black border-black group-hover:bg-white group-hover:border-white'
              : 'bg-white border-black group-hover:bg-black group-hover:border-white'
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-smooth ${
              shield.active ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'
            }`}
          />
        </m.div>
      ))}
    </div>
  );
}

export const SecurityBadge = memo(SecurityBadgeComponent);

'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';

// Lazy load BentoGrid with no SSR to reduce initial bundle
const BentoGrid = dynamic(() => import('./bento-grid-01'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-7xl mx-auto">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 auto-rows-[240px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 border border-black p-8" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default memo(BentoGrid);

'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Skeleton, SkeletonText } from './skeleton';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  skeletonType?: 'cards' | 'text' | 'grid';
  skeletonCount?: number;
}

export function SectionWrapper({
  children,
  className = '',
  skeletonType = 'text',
  skeletonCount = 3,
}: SectionWrapperProps) {
  const [hasViewed, setHasViewed] = useState(false);

  const renderSkeleton = () => {
    if (skeletonType === 'cards') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="border-2 border-gray-200 p-6">
              <Skeleton className="h-8 w-8 mb-4" variant="rectangular" />
              <Skeleton variant="text" className="w-3/4 mb-3 h-6" />
              <SkeletonText lines={3} />
            </div>
          ))}
        </div>
      );
    }

    if (skeletonType === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3]" />
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton variant="text" className="w-2/3 h-7" />
                <SkeletonText lines={2} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <Skeleton variant="text" className="w-1/2 h-12 mx-auto" />
        <SkeletonText lines={2} className="max-w-2xl mx-auto" />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      onViewportEnter={() => setHasViewed(true)}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {hasViewed ? children : renderSkeleton()}
    </motion.div>
  );
}

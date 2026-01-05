import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`border-4 border-black bg-white p-6 ${className}`}>
      <Skeleton className="h-48 mb-4" />
      <Skeleton variant="text" className="w-3/4 mb-3" />
      <SkeletonText lines={2} />
    </div>
  );
}

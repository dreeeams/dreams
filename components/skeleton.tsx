import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        {
          'rounded-full': variant === 'circular',
          'rounded': variant === 'rectangular',
          'rounded-md h-4': variant === 'text',
        },
        className
      )}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

// Composable skeleton components
export function SkeletonCard() {
  return (
    <div className="border-4 border-black bg-white p-6 space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-6 w-3/4" variant="text" />
      <Skeleton className="h-4 w-full" variant="text" />
      <Skeleton className="h-4 w-2/3" variant="text" />
    </div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="border-4 border-black bg-white overflow-hidden">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-1/2" variant="text" />
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-3/4" variant="text" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}

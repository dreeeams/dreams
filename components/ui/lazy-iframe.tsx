'use client';

import { useState } from 'react';
import { Skeleton } from './skeleton';

interface LazyIframeProps {
  src: string;
  title: string;
  className?: string;
  mobileView?: boolean;
}

export function LazyIframe({ src, title, className = '', mobileView = false }: LazyIframeProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      {mobileView ? (
        <iframe
          src={src}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          title={title}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full scale-[0.25] origin-top-left">
          <iframe
            src={src}
            className={`w-[400%] h-[400%] pointer-events-none border-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            title={title}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      )}
    </>
  );
}

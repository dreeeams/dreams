import Image, { ImageProps } from 'next/image';
import { memo } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /**
   * Enable blur placeholder (requires blurDataURL or static import)
   */
  enableBlur?: boolean;
  /**
   * Custom blur data URL (base64)
   */
  blurDataURL?: string;
}

/**
 * Optimized Image component with automatic lazy loading and blur placeholder
 *
 * Features:
 * - Automatic lazy loading (except priority images)
 * - Blur placeholder for better UX
 * - Responsive srcset generation
 * - WebP/AVIF format support via Next.js
 *
 * @example
 * <OptimizedImage
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   enableBlur
 * />
 */
function OptimizedImageComponent({
  enableBlur = false,
  blurDataURL,
  loading = 'lazy',
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const placeholder = enableBlur && blurDataURL ? 'blur' : 'empty';

  return (
    <Image
      {...props}
      loading={props.priority ? 'eager' : loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      quality={quality}
    />
  );
}

export const OptimizedImage = memo(OptimizedImageComponent);

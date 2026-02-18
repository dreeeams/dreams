import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader that generates the same /_next/image URLs as
 * the default loader but without the client-side hostname validation
 * that breaks under Turbopack dev mode.
 *
 * Server-side /_next/image still validates hostnames via remotePatterns.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

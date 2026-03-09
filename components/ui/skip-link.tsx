import { memo } from 'react';

interface SkipLinkProps {
  /**
   * Target element ID to skip to
   */
  targetId: string;
  /**
   * Text to display in skip link
   */
  text: string;
}

/**
 * Skip link for keyboard navigation accessibility
 *
 * Allows keyboard users to skip repetitive navigation
 * and jump directly to main content.
 *
 * @example
 * <SkipLink targetId="main-content" text="Skip to main content" />
 */
function SkipLinkComponent({ targetId, text }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      {text}
    </a>
  );
}

export const SkipLink = memo(SkipLinkComponent);

import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * ARIA label for screen readers (required if no visible text)
   */
  ariaLabel?: string;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Icon-only button (requires ariaLabel)
   */
  iconOnly?: boolean;
}

/**
 * Accessible button component with keyboard navigation and ARIA support
 *
 * Features:
 * - Full keyboard navigation (Enter, Space)
 * - Screen reader support
 * - Focus management
 * - Loading states
 * - Icon-only support
 *
 * @example
 * <AccessibleButton ariaLabel="Close menu" onClick={closeMenu}>
 *   <XIcon />
 * </AccessibleButton>
 */
const AccessibleButtonComponent = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ ariaLabel, isLoading, iconOnly, className, children, disabled, onClick, ...props }, ref) => {
    // Icon-only buttons MUST have ariaLabel
    if (iconOnly && !ariaLabel) {
      console.warn('AccessibleButton: iconOnly buttons require ariaLabel for accessibility');
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      // Enter and Space should trigger onClick
      if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled && !isLoading) {
        e.preventDefault();
        onClick(e as any);
      }
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        disabled={disabled || isLoading}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
          'transition-all duration-200',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span aria-live="polite" aria-atomic="true">
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

AccessibleButtonComponent.displayName = 'AccessibleButton';

export const AccessibleButton = memo(AccessibleButtonComponent);

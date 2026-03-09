import { useState, useEffect, useRef } from 'react';

/**
 * Debounced scroll position hook
 * Reduces scroll event frequency for better performance
 *
 * @param delay - Debounce delay in milliseconds
 * @returns Object with scrollY and isAtTop
 *
 * @example
 * const { scrollY, isAtTop } = useDebouncedScroll(100);
 */
export function useDebouncedScroll(delay = 100) {
  const [scrollY, setScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        setIsAtTop(currentScrollY < 50);
      }, delay);
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay]);

  return { scrollY, isAtTop };
}

import { useEffect, useRef } from 'react';

/**
 * Custom hook for intervals with automatic cleanup
 * Uses refs to avoid recreating the interval on every render
 *
 * @param callback - Function to call on interval
 * @param delay - Delay in milliseconds (null to pause)
 *
 * @example
 * useInterval(() => {
 *   setCount(c => c + 1);
 * }, 1000);
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

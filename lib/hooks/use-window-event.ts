import { useEffect } from 'react';

export function useWindowEvent<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(event, handler, options);
    return () => window.removeEventListener(event, handler);
  }, [event, handler, options]);
}

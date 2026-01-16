'use client';

import { useEffect } from 'react';

export default function DisableZoomOnInput() {
  useEffect(() => {
    // Only run on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    let viewport: HTMLMetaElement | null = document.querySelector('meta[name=viewport]');

    const disableZoom = () => {
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      }
    };

    const enableZoom = () => {
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      }
    };

    // Listen for focus events on the entire document
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      // Check if the focused element is an input, select, or textarea
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA'
      ) {
        disableZoom();
      }
    };

    const handleFocusOut = () => {
      // Re-enable zoom after a small delay to prevent zoom during transition
      setTimeout(() => {
        enableZoom();
      }, 300);
    };

    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('focusout', handleFocusOut, true);

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('focusout', handleFocusOut, true);
      enableZoom();
    };
  }, []);

  return null;
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Hide on start and thank-you pages
  const shouldHide = pathname?.includes('/start') || pathname?.includes('/thank-you');

  useEffect(() => {
    let ticking = false;
    const threshold = 400;
    const hysteresis = 50; // Add hysteresis to prevent flickering

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Clear any pending timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Add hysteresis: show at 400px, hide at 350px
          if (currentScrollY > threshold && !isVisible) {
            setIsVisible(true);
          } else if (currentScrollY < threshold - hysteresis && isVisible) {
            setIsVisible(false);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Don't render on start or thank-you pages, or when not scrolled down
  if (shouldHide || !isVisible) {
    return null;
  }

  return (
    <m.button
      layoutId="scroll-to-top-button"
      onClick={scrollToTop}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 sm:bottom-8 left-6 sm:left-8 z-50 p-3 sm:p-3 bg-black text-white border border-black hover:bg-white hover:text-black transition-fast shadow-lg"
      aria-label="Scroll to top"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </m.button>
  );
}

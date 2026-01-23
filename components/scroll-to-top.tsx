'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/lib/hooks';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    // Show button when page is scrolled down 400px
    setIsVisible(scrollY > 400);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
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
      )}
    </AnimatePresence>
  );
}

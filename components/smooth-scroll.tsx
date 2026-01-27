'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Add smooth scroll behavior with momentum
    let isScrolling = false;
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    const ease = 0.08; // Lower = slower, heavier scroll (0.05-0.15 range)

    function smoothScroll() {
      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        isScrolling = false;
        return;
      }

      currentY += (targetY - currentY) * ease;
      window.scrollTo(0, currentY);

      if (isScrolling) {
        requestAnimationFrame(smoothScroll);
      }
    }

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      targetY += e.deltaY;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    }

    function handleScroll() {
      if (!isScrolling) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    }

    // Only apply smooth scroll on desktop (not mobile)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return null;
}

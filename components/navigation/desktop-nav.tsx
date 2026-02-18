'use client';

import { m, AnimatePresence } from 'framer-motion';

interface DesktopNavProps {
  isAtTop: boolean;
  isVisible: boolean;
  servicesLabel: string;
  getStartedLabel: string;
  isContactPage: boolean;
}

export default function DesktopNav({ isAtTop, isVisible, servicesLabel, getStartedLabel, isContactPage }: DesktopNavProps) {
  return (
    <>
      {/* Desktop Services Link */}
      <m.a
        whileTap={{ scale: 0.98 }}
        href="#services"
        className={`md:block hidden px-4 py-2 text-sm font-medium border transition-fast ${
          isAtTop
            ? 'text-white border-overlay-border-medium hover:bg-white hover:text-black'
            : 'text-foreground-light border-black/10 hover:border-black hover:text-white hover:bg-black'
        }`}
      >
        {servicesLabel}
      </m.a>

      {/* Contact Button - Visible when header is visible - Desktop only */}
      {isVisible && !isContactPage && (
        <m.a
          layoutId="get-started-button"
          whileTap={{ scale: 0.98 }}
          href="/start"
          className={`hidden sm:block px-4 py-2 text-sm font-medium border transition-fast ${
            isAtTop
              ? 'text-black bg-white border-overlay-border-medium hover:bg-gray-200'
              : 'text-white bg-black hover:bg-gray-800 border-black hover:border-gray-800'
          }`}
        >
          {getStartedLabel} →
        </m.a>
      )}
    </>
  );
}

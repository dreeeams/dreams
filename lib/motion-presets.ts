import type { Transition, Variants } from 'framer-motion';

// Common easing curves
export const easing = {
  smooth: [0.16, 1, 0.3, 1],
  spring: [0.6, 0.01, -0.05, 0.95],
} as const;

// Common transitions
export const transitions = {
  smooth: { duration: 0.8, ease: easing.smooth },
  fast: { duration: 0.3, ease: easing.smooth },
  medium: { duration: 0.5, ease: easing.smooth },
} as const;

// Common variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

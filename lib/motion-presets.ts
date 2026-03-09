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

export const fadeInUpView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export const fadeInView = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export const createStaggeredFadeInUp = (index: number, baseDelay = 0.1) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: {
    duration: 0.5,
    delay: index * baseDelay,
  },
});

// Card animation variants
export const cardFadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const cardFadeInUpWithViewport = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: transitions.medium,
};

// Scale animations
export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export const scaleOnHoverSubtle = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.fast,
};

// Blur animations
export const blurFadeIn: Variants = {
  initial: { y: 20, opacity: 0, filter: 'blur(5px)' },
  animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
  exit: { y: -20, opacity: 0, filter: 'blur(5px)' },
};

// Pulse animations
export const pulse = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  },
};

// Width animations
export const expandWidth = {
  initial: { width: 0 },
  animate: { width: '100%' },
  transition: transitions.smooth,
};

// Rotation animations
export const rotateOnHover = {
  whileHover: { rotate: 360 },
  transition: { duration: 0.5, ease: easing.smooth },
};

// Stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Slide animations
export const slideInFromLeft: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

export const slideInFromRight: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};

// Viewport configuration presets
export const viewportOnce = {
  once: true,
  margin: '-100px',
} as const;

export const viewportRepeating = {
  once: false,
  amount: 0.3,
} as const;

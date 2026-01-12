/**
 * Reusable Framer Motion Animation Configurations
 * DRY approach to avoid repeating animation configs across components
 */

import type { Variants } from 'framer-motion';

/**
 * Fade in from bottom
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/**
 * Fade in from top
 */
export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

/**
 * Fade in from left
 */
export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/**
 * Fade in from right
 */
export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/**
 * Simple fade in
 */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/**
 * Stagger children animations
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Scale on hover
 */
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
};

/**
 * Move up on hover
 */
export const moveUpOnHover = {
  whileHover: { y: -2 },
  transition: { duration: 0.2 },
};

/**
 * Scale with tap
 */
export const scaleOnTap = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 },
};

/**
 * Slide in from bottom (for modals/drawers)
 */
export const slideInFromBottom = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

/**
 * Slide in from right (for sidebars)
 */
export const slideInFromRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

/**
 * Page transition fade
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

/**
 * Combined hover and tap effects (common for buttons)
 */
export const buttonInteraction = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
};

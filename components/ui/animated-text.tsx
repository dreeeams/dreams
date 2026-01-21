'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', delay = 0, duration = 0.5, stagger = 0.03 }: AnimatedTextProps) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <m.span
      style={{ display: 'inline-flex', overflow: 'hidden', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <m.span
          variants={child}
          key={index}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </m.span>
      ))}
    </m.span>
  );
}

export function RevealText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <m.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <m.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        {text}
      </m.div>
    </m.div>
  );
}

export function ScrambleText({ text, className = '' }: AnimatedTextProps) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onViewportEnter={(entry) => {
        let iteration = 0;
        const interval = setInterval(() => {
          const target = entry?.target as HTMLElement;
          if (target) {
            target.innerText = text
              .split('')
              .map((letter, index) => {
                if (index < iteration) {
                  return text[index];
                }
                return letters[Math.floor(Math.random() * 26)];
              })
              .join('');

            if (iteration >= text.length) {
              clearInterval(interval);
            }

            iteration += 1 / 3;
          }
        }, 30);
      }}
    >
      {text}
    </m.span>
  );
}

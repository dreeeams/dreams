'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxY({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y }}>
        {children}
      </m.div>
    </div>
  );
}

export function ParallaxScale({ children, speed = 0.2, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ scale, opacity }}>
        {children}
      </m.div>
    </div>
  );
}

export function ParallaxRotate({ children, speed = 10, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ rotate }}>
        {children}
      </m.div>
    </div>
  );
}

export function ParallaxOpacity({ children, className = '' }: Omit<ParallaxProps, 'speed'>) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <m.div style={{ opacity }}>
        {children}
      </m.div>
    </div>
  );
}

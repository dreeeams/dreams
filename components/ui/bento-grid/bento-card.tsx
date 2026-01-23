'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

export default function BentoCard({ className = '', children, delay = 0 }: BentoCardProps) {
  return (
    <m.div
      className={`bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-smooth cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}

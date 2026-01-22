'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen">
      {/* SEO H1 - Visually hidden but available for screen readers and SEO */}
      <h1 className="sr-only">
        Dream Studio - Professional Web Development Agency | Custom Mobile App Development | React & Next.js Experts
      </h1>

      {/* Hero Banner GIF as Background */}
      <Image
        src="https://eeyjhkhrdoouapuilwep.supabase.co/storage/v1/object/public/content/hero_banner.gif"
        alt="Dream Studio Hero Banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Scroll Indicator */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-white font-nostalgic text-sm tracking-wider">
          [ SCROLL ]
        </span>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <m.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </m.div>
      </m.div>
    </div>
  );
}

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

      {/* Hero Title with Blend Mode */}
      <div className="absolute inset-0 flex items-center justify-center">
        <m.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-nostalgic text-white mix-blend-difference px-8 text-center leading-tight"
        >
          [ DREEEAMS ]
        </m.h2>
      </div>
    </div>
  );
}

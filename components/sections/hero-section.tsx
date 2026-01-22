'use client';

import Image from 'next/image';

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
    </div>
  );
}

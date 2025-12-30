'use client';

import { VelocityScroll } from '@/components/ui/scroll-based-velocity';

export default function MarqueeSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-black dark:bg-white border-y-2 sm:border-y-3 md:border-y-4 border-black dark:border-white">
      <VelocityScroll
        text="LF DREAMS • LF DREAMS • LF DREAMS • LF DREAMS • "
        default_velocity={3}
        className="font-nostalgic text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white dark:text-black"
      />
    </section>
  );
}

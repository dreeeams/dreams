'use client';

import { VelocityScroll } from '@/components/ui/scroll-based-velocity';

export default function MarqueeSection() {
  return (
    <section className="w-full py-20 bg-black dark:bg-white border-y-4 border-black dark:border-white">
      <VelocityScroll
        text="LF DREAMS • LF DREAMS • LF DREAMS • LF DREAMS • "
        default_velocity={3}
        className="font-nostalgic text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white dark:text-black"
      />
    </section>
  );
}

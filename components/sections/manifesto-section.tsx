'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from '@/components/logo';

export default function ManifestoSection() {
  const t = useTranslations('manifesto');

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 bg-white border-b border-black/5">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-6 text-center"
        >
          <span className="text-3xl md:text-4xl lg:text-5xl font-nostalgic leading-tight">
            {t('weAre')}
          </span>
          <div className="inline-block translate-y-[10%] md:translate-y-[15%]">
            <Logo 
              className="h-8 md:h-10 lg:h-12 w-auto" 
              fill="black" 
            />
          </div>
          <span className="text-3xl md:text-4xl lg:text-5xl font-nostalgic leading-tight">
            {t('description')}
          </span>
        </m.div>
      </div>
    </section>
  );
}

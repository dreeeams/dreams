'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from '@/components/logo';

export default function ManifestoSection() {
  const t = useTranslations('manifesto');

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-nostalgic text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-white"
        >
          {t('weAre')}{' '}
          <span className="inline-block align-baseline translate-y-[14%]">
            <Logo 
              className="h-[0.85em] w-auto" 
              fill="white" 
            />
          </span>{' '}
          {t('description')}
        </m.div>
      </div>
    </section>
  );
}
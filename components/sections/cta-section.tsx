'use client';

import { useTranslations } from 'next-intl';
import { InteractiveCTA } from '@/components/ui/interactive-cta';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <InteractiveCTA
        heading={t('title.line2') ? `${t('title.line1')} ${t('title.line2')}` : t('title.line1')}
        description={t('description')}
        buttonText={t('button')}
        href="/start"
      />
    </section>
  );
}

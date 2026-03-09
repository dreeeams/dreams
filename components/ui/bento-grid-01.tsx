'use client';

import React, { memo } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BentoCard from '@/components/ui/bento-grid/bento-card';
import { TypeTester } from '@/components/ui/bento-grid/type-tester';
import { LayoutAnimation } from '@/components/ui/bento-grid/layout-animation';
import { SpeedIndicator } from '@/components/ui/bento-grid/speed-indicator';
import { SecurityBadge } from '@/components/ui/bento-grid/security-badge';
import { GlobalNetwork } from '@/components/ui/bento-grid/global-network';
import { MobileIcon } from '@/components/ui/bento-grid/mobile-icon';

interface BentoCardWrapperProps {
  delay: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

const BentoCardWrapper = memo(({ delay, title, description, children }: BentoCardWrapperProps) => (
  <m.div
    className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-smooth cursor-pointer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
  >
    <div className="flex-1">{children}</div>
    <div className="mt-2 sm:mt-4">
      <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-smooth">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-smooth">
        {description}
      </p>
    </div>
  </m.div>
));

BentoCardWrapper.displayName = 'BentoCardWrapper';

function BentoGridComponent() {
  const t = useTranslations('features');

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto">
        <m.p
          className="text-gray-600 text-sm uppercase tracking-widest mb-8 font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </m.p>

        {/* Bento Grid - 3x3 Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 auto-rows-[240px]">
          {/* Typography */}
          <BentoCardWrapper delay={0} title={t('typography.title')} description={t('typography.description')}>
            <TypeTester />
          </BentoCardWrapper>

          {/* Speed */}
          <BentoCardWrapper delay={0.1} title={t('speed.title')} description={t('speed.description')}>
            <SpeedIndicator loadTimeText={t('speedIndicator.loadTime')} />
          </BentoCardWrapper>

          {/* Layouts */}
          <BentoCardWrapper delay={0.2} title={t('layouts.title')} description={t('layouts.description')}>
            <LayoutAnimation />
          </BentoCardWrapper>

          {/* Global Network */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-6 flex flex-col overflow-hidden group hover:bg-black transition-smooth cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <GlobalNetwork />
              </div>
            </div>
            <div className="mt-auto">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-smooth">
                {t('speedNetwork.title')}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-smooth">
                {t('speedNetwork.description')}
              </p>
            </div>
          </m.div>

          {/* Security */}
          <BentoCardWrapper delay={0.4} title={t('security.title')} description={t('security.description')}>
            <SecurityBadge />
          </BentoCardWrapper>

          {/* Mobile Ready */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-smooth cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <MobileIcon />
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-smooth">
                {t('mobile.title')}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-smooth">
                {t('mobile.description')}
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}

export default memo(BentoGridComponent);

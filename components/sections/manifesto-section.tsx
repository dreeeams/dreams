'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from '@/components/logo';
import { useEffect } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function ManifestoSection() {
  const t = useTranslations('manifesto');

  useEffect(() => {
    // Load Cal.com embed script
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', 'kickoff', { origin: 'https://app.cal.com' });

    window.Cal.ns.kickoff('inline', {
      elementOrSelector: '#my-cal-inline-kickoff',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'luis-fernandez-ezzzmp/kickoff',
    });

    window.Cal.ns.kickoff('ui', {
      cssVarsPerTheme: {
        light: { 'cal-brand': '#1E1E1E' },
        dark: { 'cal-brand': '#DEE5ED' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Manifesto Text */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-nostalgic text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-white text-center mb-16"
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

        {/* Cal.com Inline Embed */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            id="my-cal-inline-kickoff"
          ></div>
        </m.div>
      </div>
    </section>
  );
}
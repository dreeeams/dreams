'use client';

import { useEffect, useRef } from 'react';
import { CAL_EVENT_LINK } from '@/lib/constants';

declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalendarEmbedProps {
  /** Override the default cal.com event link */
  calLink?: string;
  /** URL to redirect to after successful booking */
  successRedirectUrl?: string;
  /** Prefill guest name */
  name?: string;
  /** Prefill guest email */
  email?: string;
}

export default function CalendarEmbed({
  calLink,
  successRedirectUrl,
  name,
  email,
}: CalendarEmbedProps) {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const link = calLink || CAL_EVENT_LINK;

  useEffect(() => {
    const initCalendar = () => {
      if (window.Cal) {
        const container = document.getElementById('my-cal-inline');
        if (container) {
          container.innerHTML = '';
        }

        window.Cal('init', 'booking', { origin: 'https://app.cal.com' });

        const config: Record<string, string> = {
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        };

        if (successRedirectUrl) {
          config.successRedirectUrl = successRedirectUrl;
        }

        if (name) {
          config.name = name;
        }

        if (email) {
          config.email = email;
        }

        window.Cal.ns.booking('inline', {
          elementOrSelector: '#my-cal-inline',
          config,
          calLink: link,
        });

        window.Cal.ns.booking('ui', {
          cssVarsPerTheme: {
            light: { 'cal-brand': '#1E1E1E' },
            dark: { 'cal-brand': '#DEE5ED' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    };

    const loadCalScript = () => {
      if (isInitialized.current) return;
      isInitialized.current = true;

      if (typeof window !== 'undefined' && !window.Cal) {
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
              const api: any = function () {
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

        setTimeout(initCalendar, 100);
      } else {
        initCalendar();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadCalScript();
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [link, successRedirectUrl, name, email]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        id="my-cal-inline"
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        data-lenis-prevent
      />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

export default function CalendarEmbed() {
  const isInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCalendar = () => {
      if (window.Cal) {
        // Clear any existing calendar instance
        const container = document.getElementById('my-cal-inline-kickoff');
        if (container) {
          container.innerHTML = '';
        }

        // Reinitialize calendar
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
      }
    };

    const loadCalScript = () => {
      if (isInitialized.current) return;
      isInitialized.current = true;

      // Load Cal.com script if not already loaded
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

        // Wait for script to load
        setTimeout(initCalendar, 100);
      } else {
        // Script already loaded, just reinitialize
        initCalendar();
      }
    };

    // Use IntersectionObserver to load Cal.com only when visible
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
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div
        id="my-cal-inline-kickoff"
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        data-lenis-prevent
      />
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export function CalEmbed() {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Cal after script loads
      if (typeof window !== 'undefined' && (window as any).Cal) {
        const Cal = (window as any).Cal;
        Cal('init', '30min', { origin: 'https://app.cal.com' });

        Cal.ns['30min']('inline', {
          elementOrSelector: '#my-cal-inline-30min',
          config: { layout: 'month_view' },
          calLink: 'luis-fernandez-ezzzmp/30min',
        });

        Cal.ns['30min']('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full h-[600px] overflow-auto border-4 border-black bg-white">
      <div id="my-cal-inline-30min" className="w-full h-full" />
    </div>
  );
}

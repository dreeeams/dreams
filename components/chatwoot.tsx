'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    chatwootSettings?: {
      hideMessageBubble?: boolean;
      position?: 'left' | 'right';
      locale?: string;
      type?: 'standard' | 'expanded_bubble';
    };
  }
}

export default function Chatwoot() {
  useEffect(() => {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right',
      locale: 'en',
      type: 'standard',
    };

    // Add Chatwoot Script
    const BASE_URL = 'https://app.chatwoot.com';
    const g = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];

    g.src = BASE_URL + '/packs/js/sdk.js';
    g.async = true;
    g.defer = true;

    g.onload = function () {
      window.chatwootSDK?.run({
        websiteToken: 'pr941NP2WqgRHb5LExLMjoei',
        baseUrl: BASE_URL,
      });
    };

    s.parentNode?.insertBefore(g, s);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const chatwootScript = document.querySelector(
        `script[src="${BASE_URL}/packs/js/sdk.js"]`
      );
      if (chatwootScript) {
        chatwootScript.remove();
      }
    };
  }, []);

  return null;
}

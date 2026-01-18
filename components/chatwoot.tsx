'use client';

import { useEffect, useState } from 'react';

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
    $chatwoot?: any;
  }
}

export default function Chatwoot() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for page to fully load before initializing Chatwoot
    const initChatwoot = () => {
      if (isLoaded) return;

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
        console.log('Chatwoot SDK loaded successfully');
        window.chatwootSDK?.run({
          websiteToken: 'pr941NP2WqgRHb5LExLMjoei',
          baseUrl: BASE_URL,
        });
        setIsLoaded(true);
      };

      g.onerror = function () {
        console.error('Failed to load Chatwoot SDK');
      };

      s.parentNode?.insertBefore(g, s);
    };

    // Listen for loader complete event
    const handleLoaderComplete = () => {
      setTimeout(() => {
        initChatwoot();
      }, 1000);
    };

    // Check if loader is already complete
    if (document.readyState === 'complete') {
      handleLoaderComplete();
    } else {
      window.addEventListener('loaderComplete', handleLoaderComplete);
      window.addEventListener('load', handleLoaderComplete);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('loaderComplete', handleLoaderComplete);
      window.removeEventListener('load', handleLoaderComplete);

      // Remove the script when component unmounts
      const BASE_URL = 'https://app.chatwoot.com';
      const chatwootScript = document.querySelector(
        `script[src="${BASE_URL}/packs/js/sdk.js"]`
      );
      if (chatwootScript) {
        chatwootScript.remove();
      }
    };
  }, [isLoaded]);

  return null;
}

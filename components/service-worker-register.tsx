'use client';

import { useEffect } from 'react';

const SW_VERSION = 'v2'; // Increment this to force SW update

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      const currentVersion = localStorage.getItem('sw-version');

      // Only unregister if version changed
      if (currentVersion && currentVersion !== SW_VERSION) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
          localStorage.setItem('sw-version', SW_VERSION);
          // Reload after unregistering old SW
          window.location.reload();
          return;
        });
      }

      // Register the service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          // Store current version
          localStorage.setItem('sw-version', SW_VERSION);

          // Force update check
          registration.update();

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New Service Worker available');
                  // Update version and reload
                  localStorage.setItem('sw-version', SW_VERSION);
                  window.location.reload();
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}

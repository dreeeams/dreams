import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dreeeams - Digital Product Development',
    short_name: 'Dreeeams',
    description: 'We build beautiful, scalable digital products. Modern web apps, mobile applications, and exceptional user experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#DEE5ED',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

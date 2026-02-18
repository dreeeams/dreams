import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';
  const lastModified = new Date();

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];

  // Service pages (high priority)
  const servicePages = [
    'web-development',
    'mobile-development',
    'ai-solutions',
  ];

  const services = servicePages.flatMap((page) => [
    {
      url: `${baseUrl}/es/${page}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/${page}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  // Contact and legal pages
  const contactPages = [
    {
      url: `${baseUrl}/es/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/start`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/start`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Legal pages (low priority, rarely change)
  const legalPages = [
    {
      url: `${baseUrl}/es/legal`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/legal`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/es/privacy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/es/terms`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Payments page
  const paymentsPages = [
    {
      url: `${baseUrl}/es/payments`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/payments`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [
    ...mainPages,
    ...services,
    ...contactPages,
    ...paymentsPages,
    ...legalPages,
  ];
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { locales } from '@/i18n/config';
import { ThemeProvider } from '@/components/providers/theme-provider';
import PageLoader from '@/components/page-loader';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsReporter from '@/components/web-vitals-reporter';
import { ErrorBoundary } from '@/components/error-boundary';
import WhatsAppButton from '@/components/whatsapp-button';
import type { Metadata } from 'next';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const monigue = localFont({
  src: [
    {
      path: '../../public/fonts/Monigue-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-nostalgic',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    en: {
      title: 'Dream Studio - Web & Mobile App Development Experts',
      description: 'Dream Studio builds scalable web and mobile apps. Expert developers in React, Next.js & React Native. Transform your ideas into exceptional digital products.',
      keywords: 'dream studio, web development, mobile app development, React, Next.js, React Native, UI/UX design, software development agency, custom web applications, SaaS development',
    },
    es: {
      title: 'Dream Studio - Expertos en Desarrollo Web y Móvil',
      description: 'Dream Studio construye apps web y móviles escalables. Expertos en React, Next.js y React Native. Transformamos tus ideas en productos digitales.',
      keywords: 'dream studio, desarrollo web, desarrollo de aplicaciones móviles, React, Next.js, React Native, diseño UI/UX, agencia de desarrollo de software, aplicaciones web personalizadas, desarrollo SaaS',
    },
  };

  const meta = locale === 'es' ? metadata.es : metadata.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamstudio.dev';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Dream Studio' }],
    creator: 'Dream Studio',
    publisher: 'Dream Studio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      url: `${baseUrl}/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: 'Dream Studio',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Dream Studio - Digital Product Development',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.png'],
      creator: '@dreamstudio',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when ready
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  // Schema.org structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dream Studio',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    description: locale === 'es'
      ? 'Agencia de desarrollo web y móvil especializada en React, Next.js y React Native'
      : 'Web and mobile development agency specializing in React, Next.js, and React Native',
    email: 'contact@dreamstudio.dev',
    foundingDate: '2026',
    sameAs: [
      // Add social media URLs when available
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@dreamstudio.dev',
      availableLanguage: ['English', 'Spanish'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dream Studio',
    url: baseUrl,
    description: locale === 'es'
      ? 'Construimos productos digitales hermosos y escalables. Aplicaciones web modernas, apps móviles y experiencias de usuario excepcionales.'
      : 'We build beautiful, scalable digital products. Modern web apps, mobile applications, and exceptional user experiences.',
    inLanguage: [locale === 'es' ? 'es-ES' : 'en-US'],
    publisher: {
      '@type': 'Organization',
      name: 'Dream Studio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
      },
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://analytics.dreeeams.com/script.js"
          data-website-id="247f3db2-3f01-4be3-ab41-9f3e6d9a0767"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monigue.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <PageLoader />
              {children}
              <WhatsAppButton />
              <Analytics />
              <SpeedInsights />
              <WebVitalsReporter />
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

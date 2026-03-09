import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { locales } from '@/i18n/config';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import ScrollToTop from '@/components/scroll-to-top';
import DisableZoomOnInput from '@/components/disable-zoom-on-input';
import MotionProvider from '@/components/providers/motion-provider';
import PageLoader from '@/components/page-loader';
import LenisScroll from '@/components/lenis-scroll';
import GoogleAdsScript from '@/components/analytics/google-ads-script';
import { BASE_URL } from '@/lib/constants';
import { getMetadataForLocale } from '@/lib/metadata/locale-metadata';
import { createOrganizationSchema, createWebsiteSchema } from '@/lib/metadata/schemas';
import type { Metadata } from 'next';
import Script from 'next/script';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = getMetadataForLocale(locale);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.join(', '),
    authors: [{ name: 'Dreeeams' }],
    creator: 'Dreeeams',
    publisher: 'Dreeeams',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: BASE_URL,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      url: `${BASE_URL}/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: 'Dreeeams',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Dreeeams - Digital Product Development',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dreamstudio',
      creator: '@dreamstudio',
      title: meta.title,
      description: meta.description,
      images: {
        url: '/og-image.png',
        alt: 'Dreeeams - Professional Web & Mobile App Development Agency',
      },
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
    verification: {},
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
  const organizationSchema = createOrganizationSchema(locale, BASE_URL);
  const websiteSchema = createWebsiteSchema(locale, BASE_URL);

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        {locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <PageLoader />
            <LenisScroll />
            <DisableZoomOnInput />
            <ErrorBoundary>
              {children}
              <ScrollToTop />
            </ErrorBoundary>
          </MotionProvider>
        </ThemeProvider>
      </NextIntlClientProvider>

      {/* Google Analytics - loaded lazily */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7RHVN0C6WY"
        strategy="lazyOnload"
        async
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7RHVN0C6WY');
        `}
      </Script>

      {/* Google Ads Conversion Tracking */}
      <GoogleAdsScript />

      {/* Schema.org structured data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

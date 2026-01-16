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
import ScrollToTop from '@/components/scroll-to-top';
import ServiceWorkerRegister from '@/components/service-worker-register';
import DisableZoomOnInput from '@/components/disable-zoom-on-input';
import type { Metadata } from 'next';
import '../globals.css';
import ConsoleFilter from '@/components/console-filter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
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
      title: 'Dream Studio - Professional Web Development Agency | Mobile App Development',
      description: 'Leading web development agency specializing in custom web applications, mobile apps, and SaaS solutions. Expert React, Next.js, and React Native developers. Get a free consultation today.',
      keywords: 'web development agency, mobile app development company, custom web development, professional web developers, react development agency, nextjs development, react native developers, web application development, mobile application development, software development company, web design agency, app development services, saas development, ecommerce development, ui ux design agency, frontend development, backend development, full stack developers, web development services, app development agency, digital agency, technology consulting, startup development, mvp development, web app development, progressive web apps, responsive web design, api development, cloud development, agile development, software consulting',
    },
    es: {
      title: 'Dream Studio - Agencia de Desarrollo Web Profesional | Desarrollo de Apps',
      description: 'Agencia líder en desarrollo web especializada en aplicaciones web personalizadas, apps móviles y soluciones SaaS. Expertos en React, Next.js y React Native. Consulta gratis hoy.',
      keywords: 'agencia desarrollo web, empresa desarrollo aplicaciones móviles, desarrollo web personalizado, desarrolladores web profesionales, agencia desarrollo react, desarrollo nextjs, desarrolladores react native, desarrollo aplicaciones web, desarrollo aplicaciones móviles, empresa desarrollo software, agencia diseño web, servicios desarrollo apps, desarrollo saas, desarrollo ecommerce, agencia diseño ui ux, desarrollo frontend, desarrollo backend, desarrolladores full stack, servicios desarrollo web, agencia desarrollo apps, agencia digital, consultoría tecnológica, desarrollo startups, desarrollo mvp, desarrollo web app, aplicaciones web progresivas, diseño web responsive, desarrollo api, desarrollo cloud, desarrollo ágil, consultoría software',
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
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
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
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'Dream Studio',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    image: `${baseUrl}/og-image.png`,
    description: locale === 'es'
      ? 'Agencia de desarrollo web y móvil profesional especializada en React, Next.js y React Native. Creamos aplicaciones web personalizadas, apps móviles y soluciones SaaS escalables.'
      : 'Professional web and mobile development agency specializing in React, Next.js, and React Native. We create custom web applications, mobile apps, and scalable SaaS solutions.',
    email: 'info@dreeeams.com',
    telephone: '+1-XXX-XXX-XXXX',
    foundingDate: '2024',
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      geoRadius: '10000',
    },
    sameAs: [
      // Add social media URLs when available
      // 'https://twitter.com/dreamstudio',
      // 'https://linkedin.com/company/dreamstudio',
      // 'https://github.com/dreamstudio',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@dreeeams.com',
      availableLanguage: ['English', 'Spanish'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'es' ? 'Servicios de Desarrollo' : 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Web' : 'Web Development',
            description: locale === 'es'
              ? 'Desarrollo de aplicaciones web modernas con React y Next.js'
              : 'Modern web application development with React and Next.js',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Móvil' : 'Mobile Development',
            description: locale === 'es'
              ? 'Aplicaciones móviles nativas e híbridas con React Native'
              : 'Native and hybrid mobile applications with React Native',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Diseño UI/UX' : 'UI/UX Design',
            description: locale === 'es'
              ? 'Diseño de interfaces y experiencia de usuario'
              : 'User interface and experience design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Backend y APIs' : 'Backend & API Development',
            description: locale === 'es'
              ? 'Desarrollo de APIs REST y GraphQL escalables'
              : 'Scalable REST and GraphQL API development',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '24',
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
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7RHVN0C6WY"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7RHVN0C6WY');
            `,
          }}
        />
        {/* Umami Analytics */}
        <script
          defer
          src="https://analytics.dreeeams.com/script.js"
          data-website-id="247f3db2-3f01-4be3-ab41-9f3e6d9a0767"
        />
        {/* Schema.org structured data */}
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
            <ConsoleFilter />
            <ServiceWorkerRegister />
            <DisableZoomOnInput />
            <ErrorBoundary>
              <PageLoader />
              {children}
              <ScrollToTop />
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

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { locales } from '@/i18n/config';
import { ThemeProvider } from '@/components/providers/theme-provider';
import PageLoader from '@/components/page-loader';
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
      title: 'Dream Studio | Web & Mobile Development Agency',
      description: 'We build beautiful, scalable digital products. Modern web apps, mobile applications, and exceptional user experiences. React, Next.js, React Native experts.',
      keywords: 'web development, mobile app development, React, Next.js, React Native, UI/UX design, software development agency, custom web applications, SaaS development',
    },
    es: {
      title: 'Dream Studio | Agencia de Desarrollo Web y Móvil',
      description: 'Construimos productos digitales hermosos y escalables. Aplicaciones web modernas, apps móviles y experiencias de usuario excepcionales. Expertos en React, Next.js y React Native.',
      keywords: 'desarrollo web, desarrollo de aplicaciones móviles, React, Next.js, React Native, diseño UI/UX, agencia de desarrollo de software, aplicaciones web personalizadas, desarrollo SaaS',
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
        en: '/en',
        es: '/es',
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

  return (
    <html lang={locale} suppressHydrationWarning>
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
            <PageLoader />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

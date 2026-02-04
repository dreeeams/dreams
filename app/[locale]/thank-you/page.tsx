import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/sections/footer-section';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'es'
    ? '¡Gracias por contactarnos! - Dreeeams'
    : 'Thank You for Contacting Us! - Dreeeams';

  const description = locale === 'es'
    ? 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'
    : 'We have received your message and will get back to you soon.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/thank-you`,
      type: 'website',
    },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('thankYou');

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main id="main-content" className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-white w-16 h-16 border-2 border-black flex items-center justify-center">
              <svg
                className="w-10 h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 text-center mb-8">
            {t('subtitle')}
          </p>

          {/* Message */}
          <div className="bg-white border-2 border-black p-6 mb-8">
            <p className="text-gray-800 leading-relaxed">
              {t('message')}
            </p>
          </div>

          {/* What's Next */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {t('whatsNext')}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-white mr-3 mt-1">★</span>
                <p className="text-gray-300">{t('step1')}</p>
              </div>
              <div className="flex items-start">
                <span className="text-white mr-3 mt-1">★</span>
                <p className="text-gray-300">{t('step2')}</p>
              </div>
              <div className="flex items-start">
                <span className="text-white mr-3 mt-1">★</span>
                <p className="text-gray-300">{t('step3')}</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-8">
            <Link
              href={`/${locale}`}
              className="block w-full bg-white text-black px-6 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors font-medium text-center"
            >
              {t('backToHome')}
            </Link>
          </div>

          {/* Response Time */}
          <p className="text-sm text-gray-500 text-center">
            {t('responseTime')}
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
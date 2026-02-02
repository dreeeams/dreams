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
      <main id="main-content" className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-ping opacity-25"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-nostalgic mb-6 text-white">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Message */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              {t('message')}
            </p>
          </div>

          {/* What's next */}
          <div className="mb-12">
            <h2 className="text-2xl font-nostalgic mb-4 text-white">
              {t('whatsNext')}
            </h2>
            <ul className="space-y-3 text-left max-w-xl mx-auto text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">✓</span>
                <span>{t('step1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">✓</span>
                <span>{t('step2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">✓</span>
                <span>{t('step3')}</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}`}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              {t('backToHome')}
            </Link>
            <a
              href="https://wa.me/message/YOUR_WHATSAPP_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              {t('contactWhatsapp')}
            </a>
          </div>

          {/* Additional info */}
          <p className="text-sm text-gray-500 mt-12">
            {t('responseTime')}
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
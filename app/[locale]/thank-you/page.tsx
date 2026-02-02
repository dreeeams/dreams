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
        <div className="max-w-6xl mx-auto px-6">
          {/* Main Container with brutalist border */}
          <div className="bg-white border-4 border-black">
            {/* Header with black background */}
            <div className="bg-black p-8 md:p-12 border-b-4 border-black">
              <div className="flex items-center justify-center mb-6">
                {/* Success Icon with brutalist style */}
                <div className="bg-white w-20 h-20 border-4 border-black flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center uppercase tracking-tight">
                {t('title')}
              </h1>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              {/* Subtitle with brutalist accent */}
              <div className="bg-yellow-300 border-4 border-black p-6 mb-8 -rotate-1 transform hover:rotate-0 transition-transform">
                <p className="text-xl md:text-2xl font-bold text-black text-center">
                  {t('subtitle')}
                </p>
              </div>

              {/* Message Box */}
              <div className="bg-gray-100 border-4 border-black p-8 mb-10">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {t('message')}
                </p>
              </div>

              {/* What's Next Section */}
              <div className="mb-12">
                <div className="bg-black text-white p-4 mb-6 inline-block">
                  <h2 className="text-2xl font-bold uppercase">
                    {t('whatsNext')}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-4 group-hover:bg-yellow-300 group-hover:text-black transition-colors border-2 border-black">
                      1
                    </div>
                    <p className="text-lg text-gray-800 pt-1">{t('step1')}</p>
                  </div>
                  <div className="flex items-start group">
                    <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-4 group-hover:bg-yellow-300 group-hover:text-black transition-colors border-2 border-black">
                      2
                    </div>
                    <p className="text-lg text-gray-800 pt-1">{t('step2')}</p>
                  </div>
                  <div className="flex items-start group">
                    <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-4 group-hover:bg-yellow-300 group-hover:text-black transition-colors border-2 border-black">
                      3
                    </div>
                    <p className="text-lg text-gray-800 pt-1">{t('step3')}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons with brutalist style */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={`/${locale}`}
                  className="flex-1 bg-black text-white px-8 py-4 border-4 border-black hover:bg-white hover:text-black transition-colors font-bold text-center uppercase tracking-wide"
                >
                  {t('backToHome')}
                </Link>
                <a
                  href="https://wa.me/5215583107293"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-black px-8 py-4 border-4 border-black hover:bg-green-400 transition-colors font-bold flex items-center justify-center gap-3 uppercase tracking-wide"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  {t('contactWhatsapp')}
                </a>
              </div>

              {/* Response Time Info */}
              <div className="bg-gray-200 border-2 border-black p-4 text-center">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  {t('responseTime')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
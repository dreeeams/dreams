import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  const metadata = {
    en: {
      title: 'Payment Instructions | Dream Studio',
      description: 'Learn how to make payments for our services.',
    },
    es: {
      title: 'Instrucciones de Pago | Dream Studio',
      description: 'Aprende cómo realizar pagos por nuestros servicios.',
    },
  };

  const meta = locale === 'es' ? metadata.es : metadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/payments`,
      languages: {
        en: `${baseUrl}/en/payments`,
        es: `${baseUrl}/es/payments`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/payments`,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default async function PaymentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'payments' });

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
            {t('title')}
          </h1>
          <p className="text-sm text-gray-500">{t('lastUpdated')}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Introduction */}
        <section className="mb-20">
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('intro')}
          </p>
        </section>

        {/* Bank Transfer */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('bankTransfer.title')}
          </h2>
          <dl className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer.bankName')}</dt>
              <dd className="font-medium text-gray-900">Bancolombia</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer.accountType')}</dt>
              <dd className="font-medium text-gray-900">{t('bankTransfer.savingsAccount')}</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer.accountNumber')}</dt>
              <dd className="font-mono text-gray-900">000-000000-00</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer.accountHolder')}</dt>
              <dd className="font-medium text-gray-900">LF DREAMS S.A.S.</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-3">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer.idNumber')}</dt>
              <dd className="font-mono text-gray-900">902.022.315-1</dd>
            </div>
          </dl>
          <div className="mt-8 p-6 bg-gray-50">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{t('bankTransfer.important')}:</span>{' '}
              {t('bankTransfer.importantText')}
            </p>
          </div>
        </section>

        {/* Nequi */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('nequi.title')}
          </h2>
          <dl className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('nequi.phoneNumber')}</dt>
              <dd className="font-mono text-gray-900">+57 300 000 0000</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-3">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('nequi.accountHolder')}</dt>
              <dd className="font-medium text-gray-900">Luis Fernando Fernandez</dd>
            </div>
          </dl>
        </section>

        {/* International Payments */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('international.title')}
          </h2>
          <div className="space-y-12">
            {/* PayPal */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">{t('international.paypal.title')}</h3>
              <dl>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.paypal.email')}</dt>
                  <dd className="text-gray-900">info@dreeeams.com</dd>
                </div>
              </dl>
            </div>

            {/* Wise */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">{t('international.wise.title')}</h3>
              <p className="text-sm text-gray-600">{t('international.wise.description')}</p>
            </div>

            {/* Crypto */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">{t('international.crypto.title')}</h3>
              <p className="text-sm text-gray-600">{t('international.crypto.description')}</p>
            </div>
          </div>
        </section>

        {/* Payment Confirmation */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('confirmation.title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('confirmation.description')}</p>

          <div className="space-y-4 mb-8">
            <div>
              <span className="text-sm text-gray-500">{t('confirmation.email')}</span>
              <a href="mailto:info@dreeeams.com" className="block mt-1 text-gray-900 hover:text-brand transition-colors">
                info@dreeeams.com
              </a>
            </div>
            <div>
              <span className="text-sm text-gray-500">{t('confirmation.whatsapp')}</span>
              <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="block mt-1 text-gray-900 hover:text-brand transition-colors">
                +57 300 000 0000
              </a>
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            <p className="text-sm font-medium text-gray-900 mb-3">{t('confirmation.include')}:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-gray-400">—</span>
                <span>{t('confirmation.item1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400">—</span>
                <span>{t('confirmation.item2')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gray-400">—</span>
                <span>{t('confirmation.item3')}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Support */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('support.title')}
          </h2>
          <p className="text-gray-600 mb-6">{t('support.description')}</p>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">{t('support.email')}</span>
              <a href="mailto:info@dreeeams.com" className="block mt-1 text-gray-900 hover:text-brand transition-colors">
                info@dreeeams.com
              </a>
            </div>
            <div>
              <span className="text-sm text-gray-500">{t('support.whatsapp')}</span>
              <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="block mt-1 text-gray-900 hover:text-brand transition-colors">
                +57 300 000 0000
              </a>
            </div>
          </div>
        </section>

        {/* Footer Link */}
        <div className="pt-12 border-t border-gray-200">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← {t('backToHome')}
          </Link>
        </div>
      </main>
    </div>
  );
}

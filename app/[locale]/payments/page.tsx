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
      {/* Header */}
      <div className="border-b-4 border-black bg-brand">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/" className="inline-block mb-6 text-white hover:underline">
            ← {t('backToHome')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-white/90">{t('lastUpdated')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {t('intro')}
            </p>
          </section>

          {/* Bank Transfer */}
          <section className="mb-12 bg-gray-50 p-8 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-4">
              {t('bankTransfer.title')}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('bankTransfer.bankName')}:</span>
                <span className="text-gray-700">Bancolombia</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('bankTransfer.accountType')}:</span>
                <span className="text-gray-700">{t('bankTransfer.savingsAccount')}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('bankTransfer.accountNumber')}:</span>
                <span className="text-gray-700 font-mono text-lg">000-000000-00</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('bankTransfer.accountHolder')}:</span>
                <span className="text-gray-700">LF DREAMS S.A.S.</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('bankTransfer.idNumber')}:</span>
                <span className="text-gray-700 font-mono">902.022.315-1</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white border-l-4 border-brand">
              <p className="text-sm text-gray-600 font-semibold mb-2">{t('bankTransfer.important')}:</p>
              <p className="text-sm text-gray-700">{t('bankTransfer.importantText')}</p>
            </div>
          </section>

          {/* Nequi */}
          <section className="mb-12 bg-gray-50 p-8 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-4">
              {t('nequi.title')}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('nequi.phoneNumber')}:</span>
                <span className="text-gray-700 font-mono text-lg">+57 300 000 0000</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <span className="font-bold text-gray-900">{t('nequi.accountHolder')}:</span>
                <span className="text-gray-700">Luis Fernando Fernandez</span>
              </div>
            </div>
          </section>

          {/* International Payments */}
          <section className="mb-12 bg-gray-50 p-8 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-4">
              {t('international.title')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">{t('international.paypal.title')}</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <span className="font-bold text-gray-900">{t('international.paypal.email')}:</span>
                    <span className="text-gray-700">info@dreeeams.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">{t('international.wise.title')}</h3>
                <p className="text-gray-700">{t('international.wise.description')}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">{t('international.crypto.title')}</h3>
                <p className="text-gray-700">{t('international.crypto.description')}</p>
              </div>
            </div>
          </section>

          {/* Payment Confirmation */}
          <section className="mb-12 bg-brand/10 p-8 border-2 border-black">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-4">
              {t('confirmation.title')}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>{t('confirmation.description')}</p>
              <div className="space-y-2">
                <p className="font-semibold">{t('confirmation.sendTo')}:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>{t('confirmation.email')}:</strong> <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a></li>
                  <li><strong>{t('confirmation.whatsapp')}:</strong> <a href="https://wa.me/573000000000" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">+57 300 000 0000</a></li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-white border-l-4 border-brand">
                <p className="text-sm font-semibold mb-2">{t('confirmation.include')}:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>{t('confirmation.item1')}</li>
                  <li>{t('confirmation.item2')}</li>
                  <li>{t('confirmation.item3')}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-4">
              {t('support.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('support.description')}
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>{t('support.email')}:</strong> <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a></p>
              <p><strong>{t('support.whatsapp')}:</strong> <a href="https://wa.me/573000000000" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">+57 300 000 0000</a></p>
            </div>
          </section>
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-black text-white border-2 border-black px-8 py-3 font-bold hover:bg-brand hover:border-brand transition-colors">
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

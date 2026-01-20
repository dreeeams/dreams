import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Building2, Smartphone, Globe, CheckCircle, Mail, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          {t('intro')}
        </p>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Bank Transfer */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-black rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t('bankTransfer.title')}</h2>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{t('bankTransfer.bankName')}</span>
                <span className="font-medium text-gray-900">Bancolombia</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{t('bankTransfer.accountType')}</span>
                <span className="font-medium text-gray-900">{t('bankTransfer.savingsAccount')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{t('bankTransfer.accountNumber')}</span>
                <span className="font-mono font-medium text-gray-900">000-000000-00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{t('bankTransfer.accountHolder')}</span>
                <span className="font-medium text-gray-900">LF DREAMS S.A.S.</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('bankTransfer.idNumber')}</span>
                <span className="font-mono font-medium text-gray-900">902.022.315-1</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong className="font-semibold">{t('bankTransfer.important')}:</strong> {t('bankTransfer.importantText')}
              </p>
            </div>
          </div>

          {/* Nequi */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{t('nequi.title')}</h2>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{t('nequi.phoneNumber')}</span>
                <span className="font-mono font-medium text-gray-900">+57 300 000 0000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">{t('nequi.accountHolder')}</span>
                <span className="font-medium text-gray-900">Luis Fernando Fernandez</span>
              </div>
            </div>
          </div>
        </div>

        {/* International Payments */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('international.title')}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PayPal */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('international.paypal.title')}</h3>
              <p className="text-sm text-gray-600 break-all">info@dreeeams.com</p>
            </div>

            {/* Wise */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('international.wise.title')}</h3>
              <p className="text-sm text-gray-600">{t('international.wise.description')}</p>
            </div>

            {/* Crypto */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('international.crypto.title')}</h3>
              <p className="text-sm text-gray-600">{t('international.crypto.description')}</p>
            </div>
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t('confirmation.title')}</h2>
              <p className="text-gray-600 mt-2">{t('confirmation.description')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a href="mailto:info@dreeeams.com" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t('confirmation.email')}</p>
                <p className="text-sm text-gray-600">info@dreeeams.com</p>
              </div>
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t('confirmation.whatsapp')}</p>
                <p className="text-sm text-gray-600">+57 300 000 0000</p>
              </div>
            </a>
          </div>

          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">{t('confirmation.include')}:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{t('confirmation.item1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{t('confirmation.item2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{t('confirmation.item3')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('support.title')}</h2>
          <p className="text-gray-600 mb-6">{t('support.description')}</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:info@dreeeams.com" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="font-medium">info@dreeeams.com</span>
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

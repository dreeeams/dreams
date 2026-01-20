import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Building2, Smartphone, Globe, Mail, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-background-light">
      {/* Bold Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          <Link href="/" className="inline-flex items-center text-sm font-bold font-mono hover:text-brand mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-nostalgic">
            {t('title')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Introduction */}
        <p className="text-lg md:text-xl mb-16 max-w-3xl">
          {t('intro')}
        </p>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Bank Transfer */}
          <div className="bg-white border-2 border-black p-8 hover:translate-x-1 hover:translate-y-1 transition-transform">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-black">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{t('bankTransfer.title')}</h2>
              </div>
            </div>
            <div className="space-y-4 text-sm md:text-base">
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-gray-600">{t('bankTransfer.bankName')}</span>
                <span className="block font-bold mt-1">Bancolombia</span>
              </div>
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-gray-600">{t('bankTransfer.accountType')}</span>
                <span className="block font-bold mt-1">{t('bankTransfer.savingsAccount')}</span>
              </div>
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-gray-600">{t('bankTransfer.accountNumber')}</span>
                <span className="block font-mono font-bold mt-1">000-000000-00</span>
              </div>
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-gray-600">{t('bankTransfer.accountHolder')}</span>
                <span className="block font-bold mt-1">LF DREAMS S.A.S.</span>
              </div>
              <div className="pb-3">
                <span className="font-mono text-gray-600">{t('bankTransfer.idNumber')}</span>
                <span className="block font-mono font-bold mt-1">902.022.315-1</span>
              </div>
            </div>
            <div className="mt-6 bg-brand p-4 border-2 border-black">
              <p className="text-sm font-bold">
                {t('bankTransfer.important')}: <span className="font-normal">{t('bankTransfer.importantText')}</span>
              </p>
            </div>
          </div>

          {/* Nequi */}
          <div className="bg-white border-2 border-black p-8 hover:translate-x-1 hover:translate-y-1 transition-transform">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-600 border-2 border-black">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{t('nequi.title')}</h2>
              </div>
            </div>
            <div className="space-y-4 text-sm md:text-base">
              <div className="border-b-2 border-black pb-3">
                <span className="font-mono text-gray-600">{t('nequi.phoneNumber')}</span>
                <span className="block font-mono font-bold mt-1">+57 300 000 0000</span>
              </div>
              <div className="pb-3">
                <span className="font-mono text-gray-600">{t('nequi.accountHolder')}</span>
                <span className="block font-bold mt-1">Luis Fernando Fernandez</span>
              </div>
            </div>
          </div>
        </div>

        {/* International Payments */}
        <div className="bg-white border-2 border-black p-8 mb-16">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-green-600 border-2 border-black">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('international.title')}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PayPal */}
            <div className="border-2 border-black p-6 bg-background-light">
              <h3 className="font-bold text-lg mb-3 font-mono">[01] {t('international.paypal.title')}</h3>
              <p className="text-sm break-all font-mono">info@dreeeams.com</p>
            </div>

            {/* Wise */}
            <div className="border-2 border-black p-6 bg-background-light">
              <h3 className="font-bold text-lg mb-3 font-mono">[02] {t('international.wise.title')}</h3>
              <p className="text-sm">{t('international.wise.description')}</p>
            </div>

            {/* Crypto */}
            <div className="border-2 border-black p-6 bg-background-light">
              <h3 className="font-bold text-lg mb-3 font-mono">[03] {t('international.crypto.title')}</h3>
              <p className="text-sm">{t('international.crypto.description')}</p>
            </div>
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-brand border-2 border-black p-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('confirmation.title')}</h2>
          <p className="mb-6 text-base md:text-lg">{t('confirmation.description')}</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <a href="mailto:info@dreeeams.com" className="flex items-center gap-3 p-4 bg-white border-2 border-black hover:translate-x-1 hover:translate-y-1 transition-transform">
              <Mail className="w-5 h-5" />
              <div>
                <p className="text-sm font-bold">{t('confirmation.email')}</p>
                <p className="text-sm font-mono">info@dreeeams.com</p>
              </div>
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white border-2 border-black hover:translate-x-1 hover:translate-y-1 transition-transform">
              <MessageCircle className="w-5 h-5" />
              <div>
                <p className="text-sm font-bold">{t('confirmation.whatsapp')}</p>
                <p className="text-sm font-mono">+57 300 000 0000</p>
              </div>
            </a>
          </div>

          <div className="bg-white border-2 border-black p-6">
            <p className="text-sm font-bold mb-3">{t('confirmation.include')}:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold">→</span>
                <span>{t('confirmation.item1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold">→</span>
                <span>{t('confirmation.item2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold">→</span>
                <span>{t('confirmation.item3')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white border-2 border-black p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('support.title')}</h2>
          <p className="mb-6 text-base md:text-lg">{t('support.description')}</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:info@dreeeams.com" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white border-2 border-black font-bold hover:bg-brand hover:text-black transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@dreeeams.com</span>
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white border-2 border-black font-bold hover:bg-green-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Bitcoin, Circle } from 'lucide-react';

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

        {/* Colombian Payments */}
        <section className="mb-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🇨🇴</span>
              <h2 className="text-2xl font-light text-gray-900">{t('colombianPayments.title')}</h2>
            </div>
            <p className="text-sm text-gray-500 ml-11">{t('colombianPayments.subtitle')}</p>
          </div>

          {/* Bank Account 1 - Bold CF */}
          <div className="mb-12">
            <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {t('bankTransfer1.title')}
            </h3>
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.bankName')}</dt>
                <dd className="font-medium text-gray-900">Bold CF - Depósito Electrónico</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.accountNumber')}</dt>
                <dd className="font-mono text-gray-900">1700-1386-5009</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.accountHolder')}</dt>
                <dd className="font-medium text-gray-900">LF DREAMS SAS</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.idNumber')}</dt>
                <dd className="font-mono text-gray-900">902022315</dd>
              </div>
            </dl>
            <div className="mt-6 p-4 bg-gray-50">
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-900">{t('bankTransfer1.important')}:</span>{' '}
                {t('bankTransfer1.importantText')}
              </p>
            </div>
          </div>

          {/* Bank Account 2 - Placeholder */}
          <div className="mb-12">
            <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {t('bankTransfer2.title')}
            </h3>
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer2.bankName')}</dt>
                <dd className="font-medium text-gray-900">[Bank Name]</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer2.accountType')}</dt>
                <dd className="font-medium text-gray-900">[Account Type]</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer2.accountNumber')}</dt>
                <dd className="font-mono text-gray-900">[Account Number]</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer2.accountHolder')}</dt>
                <dd className="font-medium text-gray-900">[Account Holder]</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer2.idNumber')}</dt>
                <dd className="font-mono text-gray-900">[Tax ID]</dd>
              </div>
            </dl>
          </div>

          {/* Nequi */}
          <div className="mb-12">
            <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {t('nequi.title')}
            </h3>
            <dl className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('nequi.phoneNumber')}</dt>
                <dd className="font-mono text-gray-900">+57 300 000 0000</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('nequi.accountHolder')}</dt>
                <dd className="font-medium text-gray-900">Luis Fernando Fernandez</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* BRE-B Account */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-2">{t('brebAccount.title')}</h2>
            <p className="text-sm text-gray-500">{t('brebAccount.subtitle')}</p>
          </div>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('brebAccount.accountNumber')}</dt>
              <dd className="font-mono text-gray-900">[BRE-B Account Number]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('brebAccount.brebKey')}</dt>
              <dd className="font-mono text-gray-900">[BRE-B Key]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('brebAccount.accountHolder')}</dt>
              <dd className="font-medium text-gray-900">[Account Holder]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('brebAccount.idNumber')}</dt>
              <dd className="font-mono text-gray-900">[Tax ID]</dd>
            </div>
          </dl>
        </section>

        {/* US Wise Account */}
        <section className="mb-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🇺🇸</span>
              <h2 className="text-2xl font-light text-gray-900">{t('wiseAccount.title')}</h2>
            </div>
            <p className="text-sm text-gray-500 ml-11">{t('wiseAccount.subtitle')}</p>
          </div>
          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.bankName')}</dt>
              <dd className="font-medium text-gray-900">Wise</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.accountHolder')}</dt>
              <dd className="font-medium text-gray-900">[Account Holder Name]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.accountNumber')}</dt>
              <dd className="font-mono text-gray-900">[Account Number]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.routingNumber')}</dt>
              <dd className="font-mono text-gray-900">[Routing Number]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.swiftCode')}</dt>
              <dd className="font-mono text-gray-900">[SWIFT Code]</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between py-2">
              <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.bankAddress')}</dt>
              <dd className="text-sm text-gray-900">[Bank Address]</dd>
            </div>
          </dl>
        </section>

        {/* International - PayPal */}
        <section className="mb-20">
          <h2 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">
            {t('international.title')}
          </h2>
          <div className="mb-12">
            <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
              {t('international.paypal.title')}
            </h3>
            <dl>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.paypal.email')}</dt>
                <dd className="text-gray-900">info@dreeeams.com</dd>
              </div>
            </dl>
          </div>

          {/* Crypto */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-1">{t('international.crypto.title')}</h3>
              <p className="text-sm text-gray-500">{t('international.crypto.subtitle')}</p>
            </div>
            <div className="space-y-6">
              {/* Ethereum */}
              <div className="p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L4 12L12 16L20 12L12 2Z" fill="#627EEA" />
                        <path d="M12 17L4 13L12 22L20 13L12 17Z" fill="#627EEA" fillOpacity="0.6" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Ethereum (ETH)</div>
                      <div className="text-xs text-gray-500">{t('international.crypto.ethereumNetwork')}</div>
                    </div>
                  </div>
                  <Circle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('international.crypto.address')}</p>
                  <p className="font-mono text-xs text-gray-900 break-all">0xD36e81f28b10A847af00153b359De90b5156FAEF</p>
                </div>
              </div>

              {/* Bitcoin */}
              <div className="p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                      <Bitcoin className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Bitcoin (BTC)</div>
                      <div className="text-xs text-gray-500">{t('international.crypto.bitcoinNetwork')}</div>
                    </div>
                  </div>
                  <Circle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('international.crypto.address')}</p>
                  <p className="font-mono text-xs text-gray-900 break-all">bc1qcehlyz0es7cavgtzl938c93j89mcy0hu5rda44</p>
                </div>
              </div>

              {/* USDT */}
              <div className="p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#26A17B" />
                        <path d="M13.5 9.5V8H10.5V9.5H9V11H10.5V15.5H9V17H15V15.5H13.5V11H15V9.5H13.5Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Tether (USDT)</div>
                      <div className="text-xs text-gray-500">{t('international.crypto.ethereumNetwork')}</div>
                    </div>
                  </div>
                  <Circle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('international.crypto.address')}</p>
                  <p className="font-mono text-xs text-gray-900 break-all">0xD36e81f28b10A847af00153b359De90b5156FAEF</p>
                </div>
              </div>

              {/* USDC */}
              <div className="p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#2775CA" />
                        <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6ZM13.5 15H10.5V14C10.5 13.724 10.724 13.5 11 13.5H13C13.276 13.5 13.5 13.276 13.5 13V11C13.5 10.724 13.276 10.5 13 10.5H10.5V9H13.5C14.328 9 15 9.672 15 10.5V13.5C15 14.328 14.328 15 13.5 15Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">USD Coin (USDC)</div>
                      <div className="text-xs text-gray-500">{t('international.crypto.ethereumNetwork')}</div>
                    </div>
                  </div>
                  <Circle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="text-xs text-gray-500 mb-1">{t('international.crypto.address')}</p>
                  <p className="font-mono text-xs text-gray-900 break-all">0xD36e81f28b10A847af00153b359De90b5156FAEF</p>
                </div>
              </div>
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

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Circle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentsPage() {
  const t = useTranslations('payments');
  const [activeTab, setActiveTab] = useState<'colombia' | 'usa' | 'crypto'>('colombia');

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

      {/* Tabs - Outside Header */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('colombia')}
            className={`px-6 py-3 text-sm font-medium transition-all border ${
              activeTab === 'colombia'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="https://flagcdn.com/w80/co.png"
                  alt="Colombia"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{t('tabs.colombia')}</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('usa')}
            className={`px-6 py-3 text-sm font-medium transition-all border ${
              activeTab === 'usa'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="https://flagcdn.com/w80/us.png"
                  alt="USA"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{t('tabs.usa')}</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-6 py-3 text-sm font-medium transition-all border ${
              activeTab === 'crypto'
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
            }`}
          >
            <span className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png"
                  alt="Crypto"
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{t('tabs.crypto')}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        {/* Introduction */}
        <section className="mb-20">
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('intro')}
          </p>
        </section>

        {/* Colombia Tab */}
        {activeTab === 'colombia' && (
          <section className="space-y-12">
            {/* Bank Account 1 - Bold CF */}
            <div>
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
            <div>
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
            <div>
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

            {/* BRE-B Account */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">{t('brebAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('brebAccount.subtitle')}</p>
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
            </div>
          </section>
        )}

        {/* USA Tab */}
        {activeTab === 'usa' && (
          <section className="space-y-12">
            {/* Wise Account */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">{t('wiseAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('wiseAccount.subtitle')}</p>
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
            </div>

            {/* PayPal */}
            <div>
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
          </section>
        )}

        {/* Crypto Tab */}
        {activeTab === 'crypto' && (
          <section>
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-1">{t('international.crypto.title')}</h3>
              <p className="text-sm text-gray-500">{t('international.crypto.subtitle')}</p>
            </div>
            <div className="space-y-6">
              {/* Ethereum */}
              <div className="p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"
                        alt="Ethereum"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
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
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png"
                        alt="Bitcoin"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
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
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png"
                        alt="Tether"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
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
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png"
                        alt="USD Coin"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
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
          </section>
        )}

        {/* Payment Confirmation */}
        <section className="mt-20">
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
        <section className="mt-20">
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
        <div className="pt-12 border-t border-gray-200 mt-20">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← {t('backToHome')}
          </Link>
        </div>
      </main>
    </div>
  );
}

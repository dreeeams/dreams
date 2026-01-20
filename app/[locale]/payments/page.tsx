'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Circle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentsPage() {
  const t = useTranslations('payments');
  const [activeTab, setActiveTab] = useState<'colombia' | 'usa' | 'europe' | 'crypto'>('colombia');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({ text, fieldId }: { text: string; fieldId: string }) => (
    <button
      onClick={() => copyToClipboard(text, fieldId)}
      className="ml-2 p-1.5 hover:bg-gray-100 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copiedField === fieldId ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      )}
    </button>
  );

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
        <div className="-mx-6 px-6">
          <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab('colombia')}
              className={`px-2 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
                activeTab === 'colombia'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
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
              className={`px-2 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
                activeTab === 'usa'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
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
              onClick={() => setActiveTab('europe')}
              className={`px-2 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
                activeTab === 'europe'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://flagcdn.com/w80/eu.png"
                    alt="Europe"
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{t('tabs.europe')}</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-2 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
                activeTab === 'crypto'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <span className="flex items-center gap-2 sm:gap-3">
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
            {/* BRE-B Account */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">{t('brebAccount.title')}</h3>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('brebAccount.brebKey')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>@bold902022315</span>
                    <CopyButton text="@bold902022315" fieldId="breb-key" />
                  </dd>
                </div>
              </dl>
            </div>

            {/* Bank Account 1 - Bold CF */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Deposito Ordinario
              </h3>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.bankName')}</dt>
                  <dd className="font-medium text-gray-900">Bold CF</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.accountType')}</dt>
                  <dd className="font-medium text-gray-900">Depósito Electrónico</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.accountNumber')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>1700-1386-5009</span>
                    <CopyButton text="1700-1386-5009" fieldId="bold-account" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.accountHolder')}</dt>
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>LF DREAMS SAS</span>
                    <CopyButton text="LF DREAMS SAS" fieldId="bold-holder" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('bankTransfer1.idNumber')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>902022315</span>
                    <CopyButton text="902022315" fieldId="bold-nit" />
                  </dd>
                </div>
              </dl>
              <div className="mt-6 p-4 bg-gray-50">
                <p className="text-xs text-gray-600">
                  <span className="font-medium text-gray-900">{t('bankTransfer1.important')}:</span>{' '}
                  {t('bankTransfer1.importantText')}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* USA Tab */}
        {activeTab === 'usa' && (
          <section>
            {/* Wise Account */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">{t('wiseAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('wiseAccount.subtitle')}</p>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.bankName')}</dt>
                  <dd className="font-medium text-gray-900">Wise US Inc</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.accountHolder')}</dt>
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>LF DREAMS SAS</span>
                    <CopyButton text="LF DREAMS SAS" fieldId="wise-usa-holder" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.accountNumber')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>863066497361982</span>
                    <CopyButton text="863066497361982" fieldId="wise-account-number" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.routingNumber')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>084009519</span>
                    <CopyButton text="084009519" fieldId="wise-routing" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.swiftCode')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>TRWIUS35XXX</span>
                    <CopyButton text="TRWIUS35XXX" fieldId="wise-swift" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.bankAddress')}</dt>
                  <dd className="text-sm text-gray-900">108 W 13th St, Wilmington, DE, 19801, United States</dd>
                </div>
              </dl>
            </div>
          </section>
        )}

        {/* Europe Tab */}
        {activeTab === 'europe' && (
          <section>
            {/* European Wise Account */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">{t('europeanAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('europeanAccount.subtitle')}</p>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.bankName')}</dt>
                  <dd className="font-medium text-gray-900">Wise</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.accountHolder')}</dt>
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>LF DREAMS SAS</span>
                    <CopyButton text="LF DREAMS SAS" fieldId="europe-holder" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.iban')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>BE55 9675 2466 1444</span>
                    <CopyButton text="BE55 9675 2466 1444" fieldId="europe-iban" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.bic')}</dt>
                  <dd className="font-mono text-gray-900 flex items-center justify-between">
                    <span>TRWIBEB1XXX</span>
                    <CopyButton text="TRWIBEB1XXX" fieldId="europe-bic" />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.bankAddress')}</dt>
                  <dd className="text-sm text-gray-900">Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium</dd>
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
                  <p className="font-mono text-xs text-gray-900 break-all flex items-center justify-between">
                    <span>0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                    <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="eth-address" />
                  </p>
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
                  <p className="font-mono text-xs text-gray-900 break-all flex items-center justify-between">
                    <span>bc1qcehlyz0es7cavgtzl938c93j89mcy0hu5rda44</span>
                    <CopyButton text="bc1qcehlyz0es7cavgtzl938c93j89mcy0hu5rda44" fieldId="btc-address" />
                  </p>
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
                  <p className="font-mono text-xs text-gray-900 break-all flex items-center justify-between">
                    <span>0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                    <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="usdt-address" />
                  </p>
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
                  <p className="font-mono text-xs text-gray-900 break-all flex items-center justify-between">
                    <span>0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                    <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="usdc-address" />
                  </p>
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
              <a href="https://wa.me/15558920875" target="_blank" rel="noopener noreferrer" className="block mt-1 text-gray-900 hover:text-brand transition-colors">
                +1 555 892 0875
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

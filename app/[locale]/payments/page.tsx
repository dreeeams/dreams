'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Copy, Check, Globe, Languages } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentsPage() {
  const t = useTranslations('payments');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'colombia' | 'usa' | 'europe' | 'crypto'>('colombia');
  const [copiedFields, setCopiedFields] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFields(prev => new Set(prev).add(fieldId));
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
      {copiedFields.has(fieldId) ? (
        <Check className="w-4 h-4 text-black" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 pb-8" style={{ paddingTop: '5.5rem' }}>
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <Image
              src="/dreeeams-logo.png"
              alt="Dreeeams"
              width={200}
              height={52}
              className="h-8 w-auto"
            />
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
            {t('title')}
          </h1>
          <p className="text-sm text-gray-500 mb-4">{t('lastUpdated')}</p>
        </div>
      </header>

      {/* Tabs - Outside Header */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-4">
        <div className="-mx-6 px-6">
          <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab('colombia')}
              className={`px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
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
              className={`px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
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
              className={`px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
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
              className={`px-3 sm:px-4 md:px-6 py-3 text-sm font-medium transition-all border whitespace-nowrap ${
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
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Introduction */}
        <section className="mb-20">
          <p className="text-sm font-light text-gray-700">
            {t('intro')}
          </p>
        </section>

        {/* Colombia Tab */}
        {activeTab === 'colombia' && (
          <section>
            {/* Colombia Account Header */}
            <div className="mb-12">
              <h3 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">{t('colombianPayments.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('colombianPayments.subtitle')}</p>
            </div>

            <div className="space-y-12">
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
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>Bold CF</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ml-3">
                      <svg width="32" height="32" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M216 108C216 167.647 167.647 216 108 216C48.3532 216 0 167.647 0 108C0 48.3532 48.3532 0 108 0C167.647 0 216 48.3532 216 108Z" fill="url(#paint0_linear_84_18)"/>
                        <defs>
                          <linearGradient id="paint0_linear_84_18" x1="108" y1="0" x2="108" y2="216" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EE434E"/>
                            <stop offset="0.903846" stopColor="#111E6C"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Tipo de Cuenta</dt>
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
            </div>
          </section>
        )}

        {/* USA Tab */}
        {activeTab === 'usa' && (
          <section>
            {/* Wise Account */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">{t('wiseAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('wiseAccount.subtitle')}</p>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('wiseAccount.bankName')}</dt>
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>Wise US Inc</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#9FE870] flex items-center justify-center ml-3">
                      <svg width="20" height="20" viewBox="0 0 86 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55.6947 82.7221H38.9351L63.3792 15.2158H31.9092L38.9351 27.4963L27.9571 40.1446H45.6682L40.9843 52.9399L0 52.8664L22.8341 25.805L9.0019 1.31738H85.1155L55.6947 82.7221Z" fill="#163300"/>
                      </svg>
                    </div>
                  </dd>
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
              <h3 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">{t('europeanAccount.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('europeanAccount.subtitle')}</p>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('europeanAccount.bankName')}</dt>
                  <dd className="font-medium text-gray-900 flex items-center justify-between">
                    <span>Wise</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#9FE870] flex items-center justify-center ml-3">
                      <svg width="20" height="20" viewBox="0 0 86 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55.6947 82.7221H38.9351L63.3792 15.2158H31.9092L38.9351 27.4963L27.9571 40.1446H45.6682L40.9843 52.9399L0 52.8664L22.8341 25.805L9.0019 1.31738H85.1155L55.6947 82.7221Z" fill="#163300"/>
                      </svg>
                    </div>
                  </dd>
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
            <div className="mb-12">
              <h3 className="text-2xl font-light text-gray-900 mb-8 pb-3 border-b border-gray-200">{t('international.crypto.title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('international.crypto.subtitle')}</p>
            </div>
            <div className="space-y-12">
              {/* Ethereum */}
              <div>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Cryptocurrency</dt>
                    <dd className="font-medium text-gray-900 flex items-center justify-between">
                      <span>Ethereum (ETH)</span>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center ml-3">
                        <Image
                          src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"
                          alt="Ethereum"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Network</dt>
                    <dd className="font-medium text-gray-900">{t('international.crypto.ethereumNetwork')}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.crypto.address')}</dt>
                    <dd className="font-mono text-gray-900 flex items-center justify-between">
                      <span className="truncate break-all mr-2">0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                      <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="eth-address" />
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Bitcoin */}
              <div>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Cryptocurrency</dt>
                    <dd className="font-medium text-gray-900 flex items-center justify-between">
                      <span>Bitcoin (BTC)</span>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center ml-3">
                        <Image
                          src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png"
                          alt="Bitcoin"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Network</dt>
                    <dd className="font-medium text-gray-900">{t('international.crypto.bitcoinNetwork')}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.crypto.address')}</dt>
                    <dd className="font-mono text-gray-900 flex items-center justify-between">
                      <span className="truncate break-all mr-2">bc1qcehlyz0es7cavgtzl938c93j89mcy0hu5rda44</span>
                      <CopyButton text="bc1qcehlyz0es7cavgtzl938c93j89mcy0hu5rda44" fieldId="btc-address" />
                    </dd>
                  </div>
                </dl>
              </div>

              {/* USDT */}
              <div>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Cryptocurrency</dt>
                    <dd className="font-medium text-gray-900 flex items-center justify-between">
                      <span>Tether (USDT)</span>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center ml-3">
                        <Image
                          src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png"
                          alt="Tether"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Network</dt>
                    <dd className="font-medium text-gray-900">{t('international.crypto.ethereumNetwork')}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.crypto.address')}</dt>
                    <dd className="font-mono text-gray-900 flex items-center justify-between">
                      <span className="truncate break-all mr-2">0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                      <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="usdt-address" />
                    </dd>
                  </div>
                </dl>
              </div>

              {/* USDC */}
              <div>
                <dl className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Cryptocurrency</dt>
                    <dd className="font-medium text-gray-900 flex items-center justify-between">
                      <span>USD Coin (USDC)</span>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200 flex items-center justify-center ml-3">
                        <Image
                          src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png"
                          alt="USD Coin"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">Network</dt>
                    <dd className="font-medium text-gray-900">{t('international.crypto.ethereumNetwork')}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <dt className="text-sm text-gray-500 mb-1 sm:mb-0">{t('international.crypto.address')}</dt>
                    <dd className="font-mono text-gray-900 flex items-center justify-between">
                      <span className="truncate break-all mr-2">0xD36e81f28b10A847af00153b359De90b5156FAEF</span>
                      <CopyButton text="0xD36e81f28b10A847af00153b359De90b5156FAEF" fieldId="usdc-address" />
                    </dd>
                  </div>
                </dl>
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

            {/* Enhanced WhatsApp Section - International/Multilingual */}
            <div className="border border-[#25D366] bg-gradient-to-br from-[#25D366]/5 to-transparent p-4 rounded-lg">
              <div className="flex items-start gap-3">
                {/* WhatsApp Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/>
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{t('confirmation.whatsapp')}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white rounded-full border border-gray-200">
                      <Globe className="w-3 h-3 text-gray-600" />
                      <Languages className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>
                  <a
                    href="https://wa.me/15558920875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-gray-900 hover:text-[#25D366] transition-colors mb-1"
                  >
                    +1 555 892 0875
                  </a>
                  <p className="text-xs text-gray-600">
                    {locale === 'es'
                      ? '🌍 Disponible en todos los países • Español & English'
                      : '🌍 Available worldwide • English & Spanish'}
                  </p>
                </div>
              </div>
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

        {/* Footer Links */}
        <div className="pt-12 border-t border-gray-200 mt-20">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            <Link href={`/${locale}/terms`} className="hover:text-black transition-colors">
              {locale === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}
            </Link>
            <span className="text-gray-300">•</span>
            <Link href={`/${locale}/privacy`} className="hover:text-black transition-colors">
              {locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

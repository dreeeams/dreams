'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Copy, Check } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <svg
              width="24"
              height="28"
              viewBox="0 0 97 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-auto"
              role="img"
              aria-labelledby="logo-title-payments"
            >
              <title id="logo-title-payments">Dream Studio Logo</title>
              <g filter="url(#filter0_d_payments)">
                <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor" className="text-black"/>
              </g>
              <defs>
                <filter id="filter0_d_payments" x="0" y="0" width="96.1645" height="113.29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_payments"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_payments" result="shape"/>
                </filter>
              </defs>
            </svg>
            <span className="text-lg font-logo">DREEEAMS</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
            {t('title')}
          </h1>
          <p className="text-sm text-gray-500 mb-4">{t('lastUpdated')}</p>
          <p className="text-sm font-light text-gray-700">
            Gracias por confiar en Dream Studio. A continuación encontrarás las diferentes opciones para realizar tu pago de forma segura y conveniente.
          </p>
        </div>
      </header>

      {/* Tabs - Outside Header */}
      <div className="max-w-3xl mx-auto px-6 py-4">
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
          <p className="text-lg text-gray-600 leading-relaxed">
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
                      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="50" fill="url(#paint0_linear_83_4)"/>
                        <defs>
                          <linearGradient id="paint0_linear_83_4" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EE434E"/>
                            <stop offset="0.903846" stopColor="#111E6C"/>
                          </linearGradient>
                        </defs>
                        <g transform="translate(26, 35) scale(0.17)">
                          <path d="M32.64 72.096C32.64 72.576 32.256 72.96 31.776 72.96H0.864C0.384 72.96 0 72.576 0 72.096V71.904C0 71.424 0.384 71.04 0.864 71.04H2.976C3.456 71.04 3.84 70.656 3.84 70.176V69.984C3.84 69.504 4.224 69.12 4.704 69.12H4.896C5.376 69.12 5.76 68.736 5.76 68.256V68.064C5.76 67.584 6.144 67.2 6.624 67.2H6.816C7.296 67.2 7.68 66.816 7.68 66.336V6.624C7.68 6.144 7.296 5.76 6.816 5.76H6.624C6.144 5.76 5.76 5.376 5.76 4.896V4.704C5.76 4.224 5.376 3.84 4.896 3.84H4.704C4.224 3.84 3.84 3.456 3.84 2.976V2.784C3.84 2.304 3.456 1.92 2.976 1.92H0.864C0.384 1.92 0 1.536 0 1.056V0.864C0 0.384001 0.384 0 0.864 0H31.776C32.256 0 32.64 0.384001 32.64 0.864V1.056C32.64 1.536 33.024 1.92 33.504 1.92H35.616C36.096 1.92 36.48 2.304 36.48 2.784V2.976C36.48 3.456 36.864 3.84 37.344 3.84H37.536C38.016 3.84 38.4 4.224 38.4 4.704V4.896C38.4 5.376 38.784 5.76 39.264 5.76H39.456C39.936 5.76 40.32 6.144 40.32 6.624V6.816C40.32 7.296 40.704 7.68 41.184 7.68H41.376C41.856 7.68 42.24 8.064 42.24 8.544V8.736C42.24 9.216 42.624 9.6 43.104 9.6H43.296C43.776 9.6 44.16 9.984 44.16 10.464V10.656C44.16 11.136 44.544 11.52 45.024 11.52H45.216C45.696 11.52 46.08 11.904 46.08 12.384V16.416C46.08 16.896 46.464 17.28 46.944 17.28H47.136C47.616 17.28 48 17.664 48 18.144V20.256C48 20.736 48.384 21.12 48.864 21.12H49.056C49.536 21.12 49.92 21.504 49.92 21.984V50.976C49.92 51.456 49.536 51.84 49.056 51.84H48.864C48.384 51.84 48 52.224 48 52.704V56.736C48 57.216 47.616 57.6 47.136 57.6H46.944C46.464 57.6 46.08 57.984 46.08 58.464V60.576C46.08 61.056 45.696 61.44 45.216 61.44H45.024C44.544 61.44 44.16 61.824 44.16 62.304V62.496C44.16 62.976 43.776 63.36 43.296 63.36H43.104C42.624 63.36 42.24 63.744 42.24 64.224V64.416C42.24 64.896 41.856 65.28 41.376 65.28H41.184C40.704 65.28 40.32 65.664 40.32 66.144V66.336C40.32 66.816 39.936 67.2 39.456 67.2H39.264C38.784 67.2 38.4 67.584 38.4 68.064V68.256C38.4 68.736 38.016 69.12 37.536 69.12H37.344C36.864 69.12 36.48 69.504 36.48 69.984V70.176C36.48 70.656 36.096 71.04 35.616 71.04H33.504C33.024 71.04 32.64 71.424 32.64 71.904V72.096ZM15.36 66.336C15.36 66.816 15.744 67.2 16.224 67.2H16.416C16.896 67.2 17.28 67.584 17.28 68.064V68.256C17.28 68.736 17.664 69.12 18.144 69.12H29.856C30.336 69.12 30.72 68.736 30.72 68.256V68.064C30.72 67.584 31.104 67.2 31.584 67.2H33.696C34.176 67.2 34.56 66.816 34.56 66.336V66.144C34.56 65.664 34.944 65.28 35.424 65.28H35.616C36.096 65.28 36.48 64.896 36.48 64.416V62.304C36.48 61.824 36.864 61.44 37.344 61.44H37.536C38.016 61.44 38.4 61.056 38.4 60.576V58.464C38.4 57.984 38.784 57.6 39.264 57.6H39.456C39.936 57.6 40.32 57.216 40.32 56.736V50.784C40.32 50.304 40.704 49.92 41.184 49.92H41.376C41.856 49.92 42.24 49.536 42.24 49.056V21.984C42.24 21.504 41.856 21.12 41.376 21.12H41.184C40.704 21.12 40.32 20.736 40.32 20.256V18.144C40.32 17.664 39.936 17.28 39.456 17.28H39.264C38.784 17.28 38.4 16.896 38.4 16.416V12.384C38.4 11.904 38.016 11.52 37.536 11.52H37.344C36.864 11.52 36.48 11.136 36.48 10.656V10.464C36.48 9.984 36.096 9.6 35.616 9.6H35.424C34.944 9.6 34.56 9.216 34.56 8.736V8.544C34.56 8.064 34.176 7.68 33.696 7.68H33.504C33.024 7.68 32.64 7.296 32.64 6.816V6.624C32.64 6.144 32.256 5.76 31.776 5.76H31.584C31.104 5.76 30.72 5.376 30.72 4.896V4.704C30.72 4.224 30.336 3.84 29.856 3.84H18.144C17.664 3.84 17.28 4.224 17.28 4.704V4.896C17.28 5.376 16.896 5.76 16.416 5.76H16.224C15.744 5.76 15.36 6.144 15.36 6.624V66.336Z" fill="white"/>
                          <path d="M52.7152 72.96C52.2352 72.96 51.8512 72.576 51.8512 72.096V71.904C51.8512 71.424 52.2352 71.04 52.7152 71.04H52.9072C53.3872 71.04 53.7712 70.656 53.7712 70.176V69.984C53.7712 69.504 54.1552 69.12 54.6353 69.12H54.8273C55.3073 69.12 55.6912 68.736 55.6912 68.256V68.064C55.6912 67.584 56.0752 67.2 56.5552 67.2H56.7472C57.2272 67.2 57.6112 66.816 57.6112 66.336V31.584C57.6112 31.104 57.2272 30.72 56.7472 30.72H52.7152C52.2352 30.72 51.8512 30.336 51.8512 29.856V27.744C51.8512 27.264 52.2352 26.88 52.7152 26.88H54.8273C55.3073 26.88 55.6912 26.496 55.6912 26.016V25.824C55.6912 25.344 56.0752 24.96 56.5552 24.96H58.6673C59.1473 24.96 59.5312 24.576 59.5312 24.096V23.904C59.5312 23.424 59.9152 23.04 60.3952 23.04H62.5073C62.9873 23.04 63.3713 23.424 63.3713 23.904V29.856C63.3713 30.336 63.7553 30.72 64.2353 30.72H64.4272C64.9072 30.72 65.2913 30.336 65.2913 29.856V27.744C65.2913 27.264 65.6753 26.88 66.1553 26.88H66.3473C66.8273 26.88 67.2113 26.496 67.2113 26.016V25.824C67.2113 25.344 67.5952 24.96 68.0752 24.96H68.2673C68.7472 24.96 69.1312 24.576 69.1312 24.096V23.904C69.1312 23.424 69.5153 23.04 69.9953 23.04H75.9473C76.4272 23.04 76.8112 23.424 76.8112 23.904V24.096C76.8112 24.576 77.1952 24.96 77.6752 24.96H77.8672C78.3472 24.96 78.7313 25.344 78.7313 25.824V29.856C78.7313 30.336 78.3472 30.72 77.8672 30.72H77.6752C77.1952 30.72 76.8112 31.104 76.8112 31.584V31.776C76.8112 32.256 76.4272 32.64 75.9473 32.64H71.9153C71.4353 32.64 71.0512 32.256 71.0512 31.776V31.584C71.0512 31.104 70.6672 30.72 70.1872 30.72H68.0752C67.5952 30.72 67.2113 31.104 67.2113 31.584V31.776C67.2113 32.256 66.8273 32.64 66.3473 32.64H66.1553C65.6753 32.64 65.2913 33.024 65.2913 33.504V35.616C65.2913 36.096 64.9072 36.48 64.4272 36.48H64.2353C63.7553 36.48 63.3713 36.864 63.3713 37.344V66.336C63.3713 66.816 63.7553 67.2 64.2353 67.2H64.4272C64.9072 67.2 65.2913 67.584 65.2913 68.064V68.256C65.2913 68.736 65.6753 69.12 66.1553 69.12H66.3473C66.8273 69.12 67.2113 69.504 67.2113 69.984V70.176C67.2113 70.656 67.5952 71.04 68.0752 71.04H68.2673C68.7472 71.04 69.1312 71.424 69.1312 71.904V72.096C69.1312 72.576 68.7472 72.96 68.2673 72.96H52.7152Z" fill="white"/>
                          <path d="M77.901 72.96C77.421 72.96 77.037 72.576 77.037 72.096V71.904C77.037 71.424 76.653 71.04 76.173 71.04H75.981C75.501 71.04 75.117 70.656 75.117 70.176V66.144C75.117 65.664 74.733 65.28 74.253 65.28H74.061C73.581 65.28 73.197 64.896 73.197 64.416V54.624C73.197 54.144 73.581 53.76 74.061 53.76H74.253C74.733 53.76 75.117 53.376 75.117 52.896V48.864C75.117 48.384 75.501 48 75.981 48H76.173C76.653 48 77.037 47.616 77.037 47.136V45.024C77.037 44.544 77.421 44.16 77.901 44.16H78.093C78.573 44.16 78.957 43.776 78.957 43.296V41.184C78.957 40.704 79.341 40.32 79.821 40.32H80.013C80.493 40.32 80.877 39.936 80.877 39.456V37.344C80.877 36.864 81.261 36.48 81.741 36.48H81.933C82.413 36.48 82.797 36.096 82.797 35.616V33.504C82.797 33.024 83.181 32.64 83.661 32.64H83.853C84.333 32.64 84.717 32.256 84.717 31.776V31.584C84.717 31.104 85.101 30.72 85.581 30.72H85.773C86.253 30.72 86.637 30.336 86.637 29.856V29.664C86.637 29.184 87.021 28.8 87.501 28.8H87.693C88.173 28.8 88.557 28.416 88.557 27.936V27.744C88.557 27.264 88.941 26.88 89.421 26.88H89.613C90.093 26.88 90.477 26.496 90.477 26.016V25.824C90.477 25.344 90.861 24.96 91.341 24.96H93.453C93.933 24.96 94.317 24.576 94.317 24.096V23.904C94.317 23.424 94.701 23.04 95.181 23.04H104.973C105.453 23.04 105.837 23.424 105.837 23.904V24.096C105.837 24.576 106.221 24.96 106.701 24.96H106.893C107.373 24.96 107.757 25.344 107.757 25.824V27.936C107.757 28.416 108.141 28.8 108.621 28.8H108.813C109.293 28.8 109.677 29.184 109.677 29.664V33.696C109.677 34.176 109.293 34.56 108.813 34.56H108.621C108.141 34.56 107.757 34.944 107.757 35.424V35.616C107.757 36.096 107.373 36.48 106.893 36.48H106.701C106.221 36.48 105.837 36.864 105.837 37.344V37.536C105.837 38.016 105.453 38.4 104.973 38.4H104.781C104.301 38.4 103.917 38.784 103.917 39.264V39.456C103.917 39.936 103.533 40.32 103.053 40.32H100.941C100.461 40.32 100.077 40.704 100.077 41.184V41.376C100.077 41.856 99.693 42.24 99.213 42.24H99.021C98.541 42.24 98.157 42.624 98.157 43.104V43.296C98.157 43.776 97.773 44.16 97.293 44.16H93.261C92.781 44.16 92.397 44.544 92.397 45.024V45.216C92.397 45.696 92.013 46.08 91.533 46.08H83.661C83.181 46.08 82.797 46.464 82.797 46.944V52.896C82.797 53.376 82.413 53.76 81.933 53.76H81.741C81.261 53.76 80.877 54.144 80.877 54.624V64.416C80.877 64.896 81.261 65.28 81.741 65.28H81.933C82.413 65.28 82.797 65.664 82.797 66.144V68.256C82.797 68.736 83.181 69.12 83.661 69.12H87.693C88.173 69.12 88.557 68.736 88.557 68.256V68.064C88.557 67.584 88.941 67.2 89.421 67.2H89.613C90.093 67.2 90.477 66.816 90.477 66.336V66.144C90.477 65.664 90.861 65.28 91.341 65.28H91.533C92.013 65.28 92.397 64.896 92.397 64.416V64.224C92.397 63.744 92.781 63.36 93.261 63.36H93.453C93.933 63.36 94.317 62.976 94.317 62.496V62.304C94.317 61.824 94.701 61.44 95.181 61.44H95.373C95.853 61.44 96.237 61.056 96.237 60.576V60.384C96.237 59.904 96.621 59.52 97.101 59.52H97.293C97.773 59.52 98.157 59.136 98.157 58.656V56.544C98.157 56.064 98.541 55.68 99.021 55.68H99.213C99.693 55.68 100.077 55.296 100.077 54.816V54.624C100.077 54.144 100.461 53.76 100.941 53.76H101.133C101.613 53.76 101.997 54.144 101.997 54.624V56.736C101.997 57.216 101.613 57.6 101.133 57.6H100.941C100.461 57.6 100.077 57.984 100.077 58.464V60.576C100.077 61.056 99.693 61.44 99.213 61.44H99.021C98.541 61.44 98.157 61.824 98.157 62.304V62.496C98.157 62.976 97.773 63.36 97.293 63.36H97.101C96.621 63.36 96.237 63.744 96.237 64.224V64.416C96.237 64.896 95.853 65.28 95.373 65.28H95.181C94.701 65.28 94.317 65.664 94.317 66.144V68.256C94.317 68.736 93.933 69.12 93.453 69.12H93.261C92.781 69.12 92.397 69.504 92.397 69.984V70.176C92.397 70.656 92.013 71.04 91.533 71.04H91.341C90.861 71.04 90.477 71.424 90.477 71.904V72.096C90.477 72.576 90.093 72.96 89.613 72.96H77.901ZM84.717 41.376C84.717 41.856 85.101 42.24 85.581 42.24H89.613C90.093 42.24 90.477 41.856 90.477 41.376V41.184C90.477 40.704 90.861 40.32 91.341 40.32H93.453C93.933 40.32 94.317 39.936 94.317 39.456V39.264C94.317 38.784 94.701 38.4 95.181 38.4H97.293C97.773 38.4 98.157 38.016 98.157 37.536V37.344C98.157 36.864 98.541 36.48 99.021 36.48H99.213C99.693 36.48 100.077 36.096 100.077 35.616V35.424C100.077 34.944 100.461 34.56 100.941 34.56H101.133C101.613 34.56 101.997 34.176 101.997 33.696V29.664C101.997 29.184 101.613 28.8 101.133 28.8H100.941C100.461 28.8 100.077 28.416 100.077 27.936V27.744C100.077 27.264 99.693 26.88 99.213 26.88H95.181C94.701 26.88 94.317 27.264 94.317 27.744V27.936C94.317 28.416 93.933 28.8 93.453 28.8H93.261C92.781 28.8 92.397 29.184 92.397 29.664V29.856C92.397 30.336 92.013 30.72 91.533 30.72H91.341C90.861 30.72 90.477 31.104 90.477 31.584V31.776C90.477 32.256 90.093 32.64 89.613 32.64H89.421C88.941 32.64 88.557 33.024 88.557 33.504V35.616C88.557 36.096 88.173 36.48 87.693 36.48H87.501C87.021 36.48 86.637 36.864 86.637 37.344V39.456C86.637 39.936 86.253 40.32 85.773 40.32H85.581C85.101 40.32 84.717 40.704 84.717 41.184V41.376Z" fill="white"/>
                          <path d="M105.778 72.96C105.298 72.96 104.914 72.576 104.914 72.096V71.904C104.914 71.424 104.53 71.04 104.05 71.04H103.858C103.378 71.04 102.994 70.656 102.994 70.176V66.144C102.994 65.664 102.611 65.28 102.131 65.28H101.938C101.458 65.28 101.075 64.896 101.075 64.416V54.624C101.075 54.144 101.458 53.76 101.938 53.76H102.131C102.611 53.76 102.994 53.376 102.994 52.896V48.864C102.994 48.384 103.378 48 103.858 48H104.05C104.53 48 104.914 47.616 104.914 47.136V45.024C104.914 44.544 105.298 44.16 105.778 44.16H105.97C106.45 44.16 106.834 43.776 106.834 43.296V41.184C106.834 40.704 107.219 40.32 107.699 40.32H107.89C108.37 40.32 108.755 39.936 108.755 39.456V37.344C108.755 36.864 109.138 36.48 109.618 36.48H109.811C110.291 36.48 110.674 36.096 110.674 35.616V33.504C110.674 33.024 111.058 32.64 111.538 32.64H111.73C112.211 32.64 112.594 32.256 112.594 31.776V31.584C112.594 31.104 112.978 30.72 113.458 30.72H113.65C114.13 30.72 114.514 30.336 114.514 29.856V29.664C114.514 29.184 114.898 28.8 115.378 28.8H115.57C116.05 28.8 116.435 28.416 116.435 27.936V27.744C116.435 27.264 116.818 26.88 117.299 26.88H117.491C117.971 26.88 118.354 26.496 118.354 26.016V25.824C118.354 25.344 118.738 24.96 119.218 24.96H121.33C121.81 24.96 122.194 24.576 122.194 24.096V23.904C122.194 23.424 122.579 23.04 123.059 23.04H132.85C133.33 23.04 133.714 23.424 133.714 23.904V24.096C133.714 24.576 134.099 24.96 134.579 24.96H134.77C135.25 24.96 135.635 25.344 135.635 25.824V27.936C135.635 28.416 136.019 28.8 136.499 28.8H136.69C137.17 28.8 137.555 29.184 137.555 29.664V33.696C137.555 34.176 137.17 34.56 136.69 34.56H136.499C136.019 34.56 135.635 34.944 135.635 35.424V35.616C135.635 36.096 135.25 36.48 134.77 36.48H134.579C134.099 36.48 133.714 36.864 133.714 37.344V37.536C133.714 38.016 133.33 38.4 132.85 38.4H132.658C132.178 38.4 131.794 38.784 131.794 39.264V39.456C131.794 39.936 131.41 40.32 130.93 40.32H128.818C128.338 40.32 127.954 40.704 127.954 41.184V41.376C127.954 41.856 127.57 42.24 127.09 42.24H126.898C126.418 42.24 126.035 42.624 126.035 43.104V43.296C126.035 43.776 125.65 44.16 125.17 44.16H121.138C120.658 44.16 120.274 44.544 120.274 45.024V45.216C120.274 45.696 119.89 46.08 119.41 46.08H111.538C111.058 46.08 110.674 46.464 110.674 46.944V52.896C110.674 53.376 110.291 53.76 109.811 53.76H109.618C109.138 53.76 108.755 54.144 108.755 54.624V64.416C108.755 64.896 109.138 65.28 109.618 65.28H109.811C110.291 65.28 110.674 65.664 110.674 66.144V68.256C110.674 68.736 111.058 69.12 111.538 69.12H115.57C116.05 69.12 116.435 68.736 116.435 68.256V68.064C116.435 67.584 116.818 67.2 117.299 67.2H117.491C117.971 67.2 118.354 66.816 118.354 66.336V66.144C118.354 65.664 118.738 65.28 119.218 65.28H119.41C119.89 65.28 120.274 64.896 120.274 64.416V64.224C120.274 63.744 120.658 63.36 121.138 63.36H121.33C121.81 63.36 122.194 62.976 122.194 62.496V62.304C122.194 61.824 122.579 61.44 123.059 61.44H123.25C123.73 61.44 124.115 61.056 124.115 60.576V60.384C124.115 59.904 124.498 59.52 124.979 59.52H125.17C125.65 59.52 126.035 59.136 126.035 58.656V56.544C126.035 56.064 126.418 55.68 126.898 55.68H127.09C127.57 55.68 127.954 55.296 127.954 54.816V54.624C127.954 54.144 128.338 53.76 128.818 53.76H129.01C129.49 53.76 129.874 54.144 129.874 54.624V56.736C129.874 57.216 129.49 57.6 129.01 57.6H128.818C128.338 57.6 127.954 57.984 127.954 58.464V60.576C127.954 61.056 127.57 61.44 127.09 61.44H126.898C126.418 61.44 126.035 61.824 126.035 62.304V62.496C126.035 62.976 125.65 63.36 125.17 63.36H124.979C124.498 63.36 124.115 63.744 124.115 64.224V64.416C124.115 64.896 123.73 65.28 123.25 65.28H123.059C122.579 65.28 122.194 65.664 122.194 66.144V68.256C122.194 68.736 121.81 69.12 121.33 69.12H121.138C120.658 69.12 120.274 69.504 120.274 69.984V70.176C120.274 70.656 119.89 71.04 119.41 71.04H119.218C118.738 71.04 118.354 71.424 118.354 71.904V72.096C118.354 72.576 117.971 72.96 117.491 72.96H105.778ZM112.594 41.376C112.594 41.856 112.978 42.24 113.458 42.24H117.491C117.971 42.24 118.354 41.856 118.354 41.376V41.184C118.354 40.704 118.738 40.32 119.218 40.32H121.33C121.81 40.32 122.194 39.936 122.194 39.456V39.264C122.194 38.784 122.579 38.4 123.059 38.4H125.17C125.65 38.4 126.035 38.016 126.035 37.536V37.344C126.035 36.864 126.418 36.48 126.898 36.48H127.09C127.57 36.48 127.954 36.096 127.954 35.616V35.424C127.954 34.944 128.338 34.56 128.818 34.56H129.01C129.49 34.56 129.874 34.176 129.874 33.696V29.664C129.874 29.184 129.49 28.8 129.01 28.8H128.818C128.338 28.8 127.954 28.416 127.954 27.936V27.744C127.954 27.264 127.57 26.88 127.09 26.88H123.059C122.579 26.88 122.194 27.264 122.194 27.744V27.936C122.194 28.416 121.81 28.8 121.33 28.8H121.138C120.658 28.8 120.274 29.184 120.274 29.664V29.856C120.274 30.336 119.89 30.72 119.41 30.72H119.218C118.738 30.72 118.354 31.104 118.354 31.584V31.776C118.354 32.256 117.971 32.64 117.491 32.64H117.299C116.818 32.64 116.435 33.024 116.435 33.504V35.616C116.435 36.096 116.05 36.48 115.57 36.48H115.378C114.898 36.48 114.514 36.864 114.514 37.344V39.456C114.514 39.936 114.13 40.32 113.65 40.32H113.458C112.978 40.32 112.594 40.704 112.594 41.184V41.376Z" fill="white"/>
                          <path d="M133.656 72.96C133.176 72.96 132.792 72.576 132.792 72.096V71.904C132.792 71.424 132.408 71.04 131.928 71.04H131.736C131.256 71.04 130.872 70.656 130.872 70.176V66.144C130.872 65.664 130.488 65.28 130.008 65.28H129.816C129.336 65.28 128.952 64.896 128.952 64.416V54.624C128.952 54.144 129.336 53.76 129.816 53.76H130.008C130.488 53.76 130.872 53.376 130.872 52.896V48.864C130.872 48.384 131.256 48 131.736 48H131.928C132.408 48 132.792 47.616 132.792 47.136V45.024C132.792 44.544 133.176 44.16 133.656 44.16H133.848C134.328 44.16 134.712 43.776 134.712 43.296V41.184C134.712 40.704 135.096 40.32 135.576 40.32H135.768C136.248 40.32 136.632 39.936 136.632 39.456V37.344C136.632 36.864 137.016 36.48 137.496 36.48H137.688C138.168 36.48 138.552 36.096 138.552 35.616V33.504C138.552 33.024 138.936 32.64 139.416 32.64H139.608C140.088 32.64 140.472 32.256 140.472 31.776V31.584C140.472 31.104 140.856 30.72 141.336 30.72H141.528C142.008 30.72 142.392 30.336 142.392 29.856V29.664C142.392 29.184 142.776 28.8 143.256 28.8H143.448C143.928 28.8 144.312 28.416 144.312 27.936V27.744C144.312 27.264 144.696 26.88 145.176 26.88H145.368C145.848 26.88 146.232 26.496 146.232 26.016V25.824C146.232 25.344 146.616 24.96 147.096 24.96H149.208C149.688 24.96 150.072 24.576 150.072 24.096V23.904C150.072 23.424 150.456 23.04 150.936 23.04H160.728C161.208 23.04 161.592 23.424 161.592 23.904V24.096C161.592 24.576 161.976 24.96 162.456 24.96H162.648C163.128 24.96 163.512 25.344 163.512 25.824V27.936C163.512 28.416 163.896 28.8 164.376 28.8H164.568C165.048 28.8 165.432 29.184 165.432 29.664V33.696C165.432 34.176 165.048 34.56 164.568 34.56H164.376C163.896 34.56 163.512 34.944 163.512 35.424V35.616C163.512 36.096 163.128 36.48 162.648 36.48H162.456C161.976 36.48 161.592 36.864 161.592 37.344V37.536C161.592 38.016 161.208 38.4 160.728 38.4H160.536C160.056 38.4 159.672 38.784 159.672 39.264V39.456C159.672 39.936 159.288 40.32 158.808 40.32H156.696C156.216 40.32 155.832 40.704 155.832 41.184V41.376C155.832 41.856 155.448 42.24 154.968 42.24H154.776C154.296 42.24 153.912 42.624 153.912 43.104V43.296C153.912 43.776 153.528 44.16 153.048 44.16H149.016C148.536 44.16 148.152 44.544 148.152 45.024V45.216C148.152 45.696 147.768 46.08 147.288 46.08H139.416C138.936 46.08 138.552 46.464 138.552 46.944V52.896C138.552 53.376 138.168 53.76 137.688 53.76H137.496C137.016 53.76 136.632 54.144 136.632 54.624V64.416C136.632 64.896 137.016 65.28 137.496 65.28H137.688C138.168 65.28 138.552 65.664 138.552 66.144V68.256C138.552 68.736 138.936 69.12 139.416 69.12H143.448C143.928 69.12 144.312 68.736 144.312 68.256V68.064C144.312 67.584 144.696 67.2 145.176 67.2H145.368C145.848 67.2 146.232 66.816 146.232 66.336V66.144C146.232 65.664 146.616 65.28 147.096 65.28H147.288C147.768 65.28 148.152 64.896 148.152 64.416V64.224C148.152 63.744 148.536 63.36 149.016 63.36H149.208C149.688 63.36 150.072 62.976 150.072 62.496V62.304C150.072 61.824 150.456 61.44 150.936 61.44H151.128C151.608 61.44 151.992 61.056 151.992 60.576V60.384C151.992 59.904 152.376 59.52 152.856 59.52H153.048C153.528 59.52 153.912 59.136 153.912 58.656V56.544C153.912 56.064 154.296 55.68 154.776 55.68H154.968C155.448 55.68 155.832 55.296 155.832 54.816V54.624C155.832 54.144 156.216 53.76 156.696 53.76H156.888C157.368 53.76 157.752 54.144 157.752 54.624V56.736C157.752 57.216 157.368 57.6 156.888 57.6H156.696C156.216 57.6 155.832 57.984 155.832 58.464V60.576C155.832 61.056 155.448 61.44 154.968 61.44H154.776C154.296 61.44 153.912 61.824 153.912 62.304V62.496C153.912 62.976 153.528 63.36 153.048 63.36H152.856C152.376 63.36 151.992 63.744 151.992 64.224V64.416C151.992 64.896 151.608 65.28 151.128 65.28H150.936C150.456 65.28 150.072 65.664 150.072 66.144V68.256C150.072 68.736 149.688 69.12 149.208 69.12H149.016C148.536 69.12 148.152 69.504 148.152 69.984V70.176C148.152 70.656 147.768 71.04 147.288 71.04H147.096C146.616 71.04 146.232 71.424 146.232 71.904V72.096C146.232 72.576 145.848 72.96 145.368 72.96H133.656ZM140.472 41.376C140.472 41.856 140.856 42.24 141.336 42.24H145.368C145.848 42.24 146.232 41.856 146.232 41.376V41.184C146.232 40.704 146.616 40.32 147.096 40.32H149.208C149.688 40.32 150.072 39.936 150.072 39.456V39.264C150.072 38.784 150.456 38.4 150.936 38.4H153.048C153.528 38.4 153.912 38.016 153.912 37.536V37.344C153.912 36.864 154.296 36.48 154.776 36.48H154.968C155.448 36.48 155.832 36.096 155.832 35.616V35.424C155.832 34.944 156.216 34.56 156.696 34.56H156.888C157.368 34.56 157.752 34.176 157.752 33.696V29.664C157.752 29.184 157.368 28.8 156.888 28.8H156.696C156.216 28.8 155.832 28.416 155.832 27.936V27.744C155.832 27.264 155.448 26.88 154.968 26.88H150.936C150.456 26.88 150.072 27.264 150.072 27.744V27.936C150.072 28.416 149.688 28.8 149.208 28.8H149.016C148.536 28.8 148.152 29.184 148.152 29.664V29.856C148.152 30.336 147.768 30.72 147.288 30.72H147.096C146.616 30.72 146.232 31.104 146.232 31.584V31.776C146.232 32.256 145.848 32.64 145.368 32.64H145.176C144.696 32.64 144.312 33.024 144.312 33.504V35.616C144.312 36.096 143.928 36.48 143.448 36.48H143.256C142.776 36.48 142.392 36.864 142.392 37.344V39.456C142.392 39.936 142.008 40.32 141.528 40.32H141.336C140.856 40.32 140.472 40.704 140.472 41.184V41.376Z" fill="white"/>
                        </g>
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

'use client';

import Link from 'next/link';
import Logo from '@/components/logo';
import LanguageSelector from '@/components/language-selector';

interface LegalHeaderProps {
  locale: string;
  title: string;
  lastUpdated: string;
}

export default function LegalHeader({ locale, title, lastUpdated }: LegalHeaderProps) {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center hover:opacity-80 transition-opacity">
            <Logo
              className="h-auto w-auto max-w-[120px]"
              fill="currentColor"
            />
          </Link>
          <LanguageSelector variant="dark" />
        </div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
          {title}
        </h1>
        <p className="text-sm text-gray-500">{lastUpdated}</p>
      </div>
    </header>
  );
}

'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
}

export default function LanguageSelector({ variant = 'dark' }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const isLight = variant === 'light';

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2 border transition-all flex items-center justify-center gap-2 group ${
        isLight
          ? 'border-white/30 hover:bg-white'
          : 'border-gray-300 hover:border-gray-900 hover:bg-black'
      }`}
      aria-label="Toggle language"
    >
      {locale === 'en' ? (
        <svg className="w-7 h-5" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#bd3d44" d="M0 0h640v480H0z"/>
          <path stroke="#fff" strokeWidth="37" d="M0 55.3h640m0 74H0m0 73.9h640m0 74H0m0 73.8h640m0 74H0"/>
          <path fill="#192f5d" d="M0 0h364.8v258.5H0z"/>
          <marker id="us-a" markerHeight="30" markerWidth="30">
            <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z"/>
          </marker>
          <path fill="none" markerMid="url(#us-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"/>
        </svg>
      ) : (
        <svg className="w-7 h-5" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="300" fill="#FCD116"/>
          <rect width="900" height="150" y="300" fill="#003893"/>
          <rect width="900" height="150" y="450" fill="#CE1126"/>
        </svg>
      )}
      {/* Chevron Down Icon */}
      <svg
        className={`w-3 h-3 transition-colors ${
          isLight ? 'text-white group-hover:text-black' : 'text-gray-600 group-hover:text-white'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

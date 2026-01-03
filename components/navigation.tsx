'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            >
              <svg
                width="24"
                height="28"
                viewBox="0 0 97 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 sm:h-7 md:h-8 w-auto"
              >
                <g filter="url(#filter0_d_3_75_animated)">
                  <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor" className="text-black"/>
                </g>
                <defs>
                  <filter id="filter0_d_3_75_animated" x="0" y="0" width="96.1645" height="113.29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_75"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_75" result="shape"/>
                  </filter>
                </defs>
              </svg>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-nostalgic">DREAM STUDIO</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-foreground-light">
            <motion.a
              whileHover={{ y: -2 }}
              href="#services"
              className="hover:opacity-60 transition-opacity hidden sm:block"
            >
              {t('services')}
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#work"
              className="hover:opacity-60 transition-opacity hidden md:block"
            >
              {t('work')}
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#contact"
              className="hover:opacity-60 transition-opacity hidden sm:block"
            >
              {t('contact')}
            </motion.a>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-colors text-black font-bold text-[10px] sm:text-xs"
              aria-label="Toggle language"
            >
              {locale.toUpperCase()}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

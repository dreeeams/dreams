'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-nostalgic">LF DREAMS</div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-base sm:text-lg font-nostalgic"
          >
            LF DREAMS
          </motion.div>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-foreground-light dark:text-foreground-dark">
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
              href="#team"
              className="hover:opacity-60 transition-opacity hidden md:block"
            >
              {t('team')}
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#contact"
              className="hover:opacity-60 transition-opacity hidden sm:block"
            >
              {t('contact')}
            </motion.a>

            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-colors text-black dark:text-white font-bold text-[10px] sm:text-xs"
                aria-label="Toggle language"
              >
                {locale.toUpperCase()}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black flex items-center justify-center hover:bg-brand hover:border-brand dark:hover:bg-brand dark:hover:border-brand transition-colors"
                aria-label="Toggle theme"
              >
              {theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

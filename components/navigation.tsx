'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const menuItems = [
    { label: t('services'), href: '#services' },
    { label: t('work'), href: '#work' },
    { label: t('contact'), href: '#contact' },
  ];

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    // Small delay to allow animation to start before navigating
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-black/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
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
                  className="h-8 sm:h-7 md:h-8 w-auto"
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
                <span className="text-lg sm:text-lg md:text-xl lg:text-2xl font-nostalgic">DREAM STUDIO</span>
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

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border-2 border-black bg-white hover:bg-black group transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-black group-hover:bg-white transition-colors"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-black group-hover:bg-white transition-colors"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-black group-hover:bg-white transition-colors"
                />
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-colors text-black font-bold text-xs sm:text-xs"
                aria-label="Toggle language"
              >
                {locale.toUpperCase()}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-background-light sm:hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center border-2 border-black bg-white hover:bg-black group transition-colors"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black group-hover:bg-white rotate-45 transform -translate-y-1/2" />
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-black group-hover:bg-white -rotate-45 transform -translate-y-1/2" />
              </div>
            </motion.button>

            <div className="h-full flex flex-col items-center justify-center px-8">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-12"
              >
                <svg
                  width="48"
                  height="56"
                  viewBox="0 0 97 114"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4"
                >
                  <path
                    d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z"
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </motion.div>

              {/* Menu Items */}
              <nav className="flex flex-col items-center gap-8 mb-12">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    onClick={() => handleMenuClick(item.href)}
                    className="text-4xl font-nostalgic hover:text-brand transition-colors"
                  >
                    [ {item.label.toUpperCase()} ]
                  </motion.button>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-12 left-0 right-0 px-8"
              >
                <div className="flex items-center justify-between text-sm font-mono">
                  <span className="text-gray-600">DREAM STUDIO</span>
                  <span className="text-gray-600">2024</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

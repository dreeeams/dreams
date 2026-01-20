'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Only show services dropdown in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px threshold
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const services = [
    { name: 'Diseño UI/UX', href: `/${locale}/servicios/diseno-uiux` },
    { name: 'Innovación Digital', href: `/${locale}/servicios/innovacion-digital` },
    { name: 'API & Backend', href: `/${locale}/servicios/api-backend` },
    { name: 'Desarrollo Software', href: `/${locale}/servicios/desarrollo-software` },
    { name: 'Seguridad', href: `/${locale}/servicios/seguridad-ciberseguridad` },
    { name: 'IA Empresas', href: `/${locale}/servicios/ai-empresas` },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const menuItems = [
    { label: t('services'), href: '#services' },
    { label: t('work'), href: '#work' },
    { label: t('getStarted'), href: '#contact' },
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
      {/* Main Navigation - Hides on scroll */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 backdrop-blur-sm border-b border-black/10"
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo */}
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
                  className="h-6 sm:h-5 md:h-6 w-auto"
                  role="img"
                  aria-labelledby="logo-title"
                >
                  <title id="logo-title">Dream Studio Logo</title>
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
                <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-logo">DREEEAMS</span>
              </motion.div>
            </Link>

            {/* Right Side - Navigation & Controls */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground-light ml-auto">
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 hover:bg-black border border-black/10 hover:border-black transition-all duration-200 flex items-center justify-center group"
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
                    <path fill="none" marker-mid="url(#us-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"/>
                  </svg>
                ) : (
                  <svg className="w-7 h-5" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="900" height="300" fill="#FCD116"/>
                    <rect width="900" height="150" y="300" fill="#003893"/>
                    <rect width="900" height="150" y="450" fill="#CE1126"/>
                  </svg>
                )}
              </motion.button>

              {/* Desktop Menu Items */}
              {/* Services with Dropdown - Only in Development */}
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="#services"
                onMouseEnter={() => isDevelopment && setIsServicesOpen(true)}
                className="md:block hidden px-4 py-2 text-sm font-medium text-foreground-light hover:text-white hover:bg-black border border-black/10 hover:border-black transition-all duration-200"
              >
                {t('services')}
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.98 }}
                href="#work"
                className="md:block hidden px-4 py-2 text-sm font-medium text-foreground-light hover:text-white hover:bg-black border border-black/10 hover:border-black transition-all duration-200"
              >
                {t('work')}
              </motion.a>

              {/* Contact Button - Visible when header is visible - Desktop only */}
              {isVisible && (
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 border border-black hover:border-gray-800 transition-all duration-200"
                >
                  {t('getStarted')} →
                </motion.a>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.98 }}
                className="sm:hidden px-3 py-2 flex flex-col items-center justify-center gap-1.5 border border-black/10 hover:border-black hover:bg-black group transition-all duration-200"
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
            </div>
          </div>
        </div>

        {/* Services Dropdown - Expands below nav - Only in Development */}
        <AnimatePresence>
          {isDevelopment && isServicesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden bg-white/90 backdrop-blur-md border-t border-black/5"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-right">
                <div className="inline-flex flex-wrap gap-1 justify-end">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link
                        href={service.href}
                        className="inline-block px-4 py-2 text-sm font-medium text-foreground-light hover:text-white hover:bg-black border border-black/10 hover:border-black transition-all duration-200"
                      >
                        {service.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Ver Todos Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: services.length * 0.03 }}
                  >
                    <Link
                      href="#services"
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 border border-black hover:border-gray-800 transition-all duration-200"
                    >
                      Ver todos →
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Fixed Contact Button - Visible when header is hidden */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{
          opacity: isVisible ? 0 : 1,
          x: isVisible ? 20 : 0,
          scale: isVisible ? 0.95 : 1
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.98 }}
        className="block fixed top-4 sm:top-5 right-4 sm:right-6 md:right-[calc((100vw-80rem)/2+1.5rem)] z-[60] px-4 py-2 text-xs sm:text-sm font-medium text-white bg-black hover:bg-gray-800 border border-black hover:border-gray-800 transition-all duration-200"
        style={{ pointerEvents: isVisible ? 'none' : 'auto' }}
      >
        {t('getStarted')} →
      </motion.a>

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
              className="absolute top-4 right-4 px-4 py-3 flex items-center justify-center border border-black/10 hover:border-black hover:bg-black group transition-all duration-200"
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
                  <span className="text-gray-600 font-logo">DREEEAMS</span>
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

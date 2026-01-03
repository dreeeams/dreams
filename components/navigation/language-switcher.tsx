'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2 border-2 border-black">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-xs font-bold transition-colors ${
          locale === 'en'
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-100'
        }`}
      >
        EN
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('es')}
        className={`px-3 py-1 text-xs font-bold transition-colors ${
          locale === 'es'
            ? 'bg-black text-white'
            : 'bg-white text-black hover:bg-gray-100'
        }`}
      >
        ES
      </motion.button>
    </div>
  );
}

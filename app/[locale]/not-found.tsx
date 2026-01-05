'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background-light">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-nostalgic text-black leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="border-4 border-black bg-white p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-nostalgic mb-4">
              PAGE NOT FOUND
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Terminal-style error */}
            <div className="bg-black text-white p-4 font-mono text-left text-sm mb-6">
              <p className="text-red-400">&gt; Error 404: Page not found</p>
              <p className="text-gray-400">&gt; Searching in all directories...</p>
              <p className="text-gray-400">&gt; No results found</p>
              <p className="text-green-400">&gt; Redirecting to homepage...</p>
            </div>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 border-2 border-black font-bold hover:bg-brand hover:border-brand transition-colors"
              >
                GO TO HOMEPAGE →
              </motion.button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
            <Link href="/#services" className="hover:text-brand transition-colors">
              SERVICES
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/#work" className="hover:text-brand transition-colors">
              WORK
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/#contact" className="hover:text-brand transition-colors">
              CONTACT
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

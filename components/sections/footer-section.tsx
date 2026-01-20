'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FooterSection() {
  const tFooter = useTranslations('contact.footer');

  return (
    <footer className="bg-black text-white border-t border-white/10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-logo mb-3">DREEEAMS</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              {tFooter('tagline')}
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Bogotá, Colombia
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div className="space-y-3">
              <a href="#services" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('services')}
              </a>
              <a href="#work" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('portfolio')}
              </a>
              <a href="#contact" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('contact')}
              </a>
            </div>

            <div className="space-y-3">
              <Link href="/privacy" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('privacy')}
              </Link>
              <Link href="/terms" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('terms')}
              </Link>
            </div>

            <div className="space-y-3">
              <a href="mailto:info@dreeeams.com" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Dream Studio. {tFooter('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

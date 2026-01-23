'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SocialLinks from '@/components/social-links';
import Logo from '@/components/logo';

export default function FooterSection() {
  const tFooter = useTranslations('contact.footer');

  return (
    <footer className="bg-black text-white border-t border-overlay-border-light py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Dream Studio Home">
              <Logo
                className="h-auto w-auto max-w-[180px] mb-3"
                fill="white"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              {tFooter('tagline')}
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Bogotá, Colombia
            </p>
            <div className="mt-4">
              <SocialLinks />
            </div>
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
              <Link href="/payments" className="block text-sm text-gray-400 hover:text-white transition-colors">
                {tFooter('payments')}
              </Link>
              <Link href="/legal" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Legal
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
        <div className="border-t border-overlay-border-light pt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Dream Studio. {tFooter('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

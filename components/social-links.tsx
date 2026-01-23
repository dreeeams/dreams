'use client';

import { MessageCircle, Mail } from 'lucide-react';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/573124567890',
      icon: MessageCircle,
      ariaLabel: 'Contact us on WhatsApp',
    },
    {
      name: 'Email',
      href: 'mailto:info@dreeeams.com',
      icon: Mail,
      ariaLabel: 'Send us an email',
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}

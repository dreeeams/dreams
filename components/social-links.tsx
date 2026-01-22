'use client';

import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export default function SocialLinks() {
  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/dreamstudio',
      icon: Twitter,
      ariaLabel: 'Follow us on Twitter',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/dreamstudio',
      icon: Linkedin,
      ariaLabel: 'Connect with us on LinkedIn',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/dreamstudio',
      icon: Github,
      ariaLabel: 'View our projects on GitHub',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/dreamstudio',
      icon: Instagram,
      ariaLabel: 'Follow us on Instagram',
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

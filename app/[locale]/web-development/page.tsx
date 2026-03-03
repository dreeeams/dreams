import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import WebDevContent from './web-dev-content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.webDev');

  return {
    title: `${t('title')} - Dreeeams`,
    description: t('metaDescription'),
  };
}

export default function WebDevelopmentPage() {
  return <WebDevContent />;
}

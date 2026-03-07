import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/service-page/service-page-template';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.mobileDev');

  return {
    title: `${t('title')} - Dreeeams`,
    description: t('metaDescription'),
  };
}

export default function MobileDevelopmentPage() {
  return <ServicePageTemplate serviceKey="mobileDevelopment" />;
}

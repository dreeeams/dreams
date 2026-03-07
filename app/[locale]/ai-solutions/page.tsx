import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/service-page/service-page-template';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.uiux');

  return {
    title: `${t('title')} - Dreeeams`,
    description: t('metaDescription'),
  };
}

export default function AISolutionsPage() {
  return <ServicePageTemplate serviceKey="uiux" />;
}

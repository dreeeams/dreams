import { getTranslations } from 'next-intl/server';
import { Code2, Palette, Zap, Users } from 'lucide-react';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/service-detail-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.webDev');

  return {
    title: `${t('title')} - Dream Studio`,
    description: t('metaDescription'),
  };
}

export default function WebDevelopmentPage() {
  const features = [
    {
      icon: Palette,
      titleKey: 'detailFeatures.design.title',
      descKey: 'detailFeatures.design.description',
    },
    {
      icon: Code2,
      titleKey: 'detailFeatures.development.title',
      descKey: 'detailFeatures.development.description',
    },
    {
      icon: Zap,
      titleKey: 'detailFeatures.performance.title',
      descKey: 'detailFeatures.performance.description',
    },
    {
      icon: Users,
      titleKey: 'detailFeatures.ux.title',
      descKey: 'detailFeatures.ux.description',
    },
  ];

  return <ServiceDetailPage serviceKey="webDev" features={features} />;
}

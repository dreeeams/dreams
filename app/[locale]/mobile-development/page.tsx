import { getTranslations } from 'next-intl/server';
import { Server, Database, Shield, Cpu } from 'lucide-react';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/service-detail-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.mobileDev');

  return {
    title: `${t('title')} - Dreeeams`,
    description: t('metaDescription'),
  };
}

export default function MobileDevelopmentPage() {
  const features = [
    {
      icon: Server,
      titleKey: 'detailFeatures.apis.title',
      descKey: 'detailFeatures.apis.description',
    },
    {
      icon: Database,
      titleKey: 'detailFeatures.database.title',
      descKey: 'detailFeatures.database.description',
    },
    {
      icon: Shield,
      titleKey: 'detailFeatures.security.title',
      descKey: 'detailFeatures.security.description',
    },
    {
      icon: Cpu,
      titleKey: 'detailFeatures.scalability.title',
      descKey: 'detailFeatures.scalability.description',
    },
  ];

  return <ServiceDetailPage serviceKey="mobileDev" features={features} />;
}

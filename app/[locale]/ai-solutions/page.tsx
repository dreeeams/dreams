import { getTranslations } from 'next-intl/server';
import { Brain, Workflow, TrendingUp, Bot } from 'lucide-react';
import type { Metadata } from 'next';
import ServiceDetailPage from '@/components/service-detail-page';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.uiux');

  return {
    title: `${t('title')} - Dream Studio`,
    description: t('metaDescription'),
  };
}

export default function AISolutionsPage() {
  const features = [
    {
      icon: Brain,
      titleKey: 'detailFeatures.ai.title',
      descKey: 'detailFeatures.ai.description',
    },
    {
      icon: Workflow,
      titleKey: 'detailFeatures.automation.title',
      descKey: 'detailFeatures.automation.description',
    },
    {
      icon: TrendingUp,
      titleKey: 'detailFeatures.optimization.title',
      descKey: 'detailFeatures.optimization.description',
    },
    {
      icon: Bot,
      titleKey: 'detailFeatures.chatbots.title',
      descKey: 'detailFeatures.chatbots.description',
    },
  ];

  return <ServiceDetailPage serviceKey="uiux" features={features} />;
}

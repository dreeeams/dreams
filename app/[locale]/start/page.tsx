import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/sections/footer-section';
import StartFlow from './start-flow';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('start.meta');

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/start`,
      type: 'website',
    },
  };
}

export default async function StartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main id="main-content" className="pt-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
          <StartFlow locale={locale} />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

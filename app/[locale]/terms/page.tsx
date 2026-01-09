import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: {
        en: `${baseUrl}/en/terms`,
        es: `${baseUrl}/es/terms`,
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${baseUrl}/${locale}/terms`,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default function TermsPage() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black bg-black">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/" className="inline-block mb-6 text-white hover:underline">
            ← {t('backToHome')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title').toUpperCase()}
          </h1>
          <p className="text-white/90">{t('lastUpdated')}: January 8, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.introduction.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.introduction.p1')}
            </p>
          </section>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.services.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.services.p1')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('sections.services.items.web')}</li>
              <li>{t('sections.services.items.mobile')}</li>
              <li>{t('sections.services.items.design')}</li>
              <li>{t('sections.services.items.backend')}</li>
            </ul>
          </section>

          {/* Project Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.projects.title')}
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold mb-2">{t('sections.projects.proposals.title')}</h3>
                <p>{t('sections.projects.proposals.desc')}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">{t('sections.projects.timeline.title')}</h3>
                <p>{t('sections.projects.timeline.desc')}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">{t('sections.projects.changes.title')}</h3>
                <p>{t('sections.projects.changes.desc')}</p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.payment.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('sections.payment.items.deposit')}</li>
              <li>{t('sections.payment.items.milestones')}</li>
              <li>{t('sections.payment.items.late')}</li>
              <li>{t('sections.payment.items.refunds')}</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.ip.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.ip.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.ip.p2')}
            </p>
          </section>

          {/* Warranties */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.warranties.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.warranties.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.warranties.p2')}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.liability.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.liability.p1')}
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-black pl-4">
              {t('sections.termination.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.termination.p1')}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-12 bg-gray-50 p-6 border-2 border-black">
            <h2 className="text-2xl font-bold mb-4">
              {t('sections.contact.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.contact.p1')}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:contact@dreamstudio.dev" className="text-brand hover:underline">contact@dreamstudio.dev</a>
            </p>
          </section>
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-black text-white border-2 border-black px-8 py-3 font-bold hover:bg-brand hover:border-brand transition-colors">
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

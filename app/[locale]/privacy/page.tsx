import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black bg-brand">
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
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.introduction.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.introduction.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.introduction.p2')}
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.collect.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.collect.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>{t('sections.collect.items.name.title')}:</strong> {t('sections.collect.items.name.desc')}</li>
              <li><strong>{t('sections.collect.items.email.title')}:</strong> {t('sections.collect.items.email.desc')}</li>
              <li><strong>{t('sections.collect.items.phone.title')}:</strong> {t('sections.collect.items.phone.desc')}</li>
              <li><strong>{t('sections.collect.items.company.title')}:</strong> {t('sections.collect.items.company.desc')}</li>
              <li><strong>{t('sections.collect.items.technical.title')}:</strong> {t('sections.collect.items.technical.desc')}</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.usage.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('sections.usage.items.respond')}</li>
              <li>{t('sections.usage.items.services')}</li>
              <li>{t('sections.usage.items.improve')}</li>
              <li>{t('sections.usage.items.communication')}</li>
            </ul>
          </section>

          {/* Data Storage */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.storage.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('sections.storage.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.storage.p2')}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.rights.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>{t('sections.rights.items.access')}</li>
              <li>{t('sections.rights.items.correct')}</li>
              <li>{t('sections.rights.items.delete')}</li>
              <li>{t('sections.rights.items.opt')}</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-brand pl-4">
              {t('sections.cookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('sections.cookies.p1')}
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

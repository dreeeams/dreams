import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('services.webDev');

  return {
    title: `${t('title')} - Dreeeams`,
    description: t('metaDescription'),
  };
}

function WebDevContent() {
  const t = useTranslations('services.webDev');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 px-4 py-2 border border-overlay-border-medium bg-black/50 backdrop-blur-sm hover:bg-overlay-bg-light transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* 1) Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm text-muted/70">
              {t('hero.microline')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          {/* 2) Problem / Outcome */}
          <div className="mb-20">
            <h2 className="heading-xl mb-6">
              {t('problem.title')}
            </h2>
            <ul className="space-y-3">
              {(t.raw('problem.bullets') as string[]).map((bullet, i) => (
                <li key={i} className="text-lg text-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-white mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3) Deliverables */}
          <div className="mb-20">
            <h2 className="heading-xl mb-6">
              {t('deliverables.title')}
            </h2>
            <ul className="space-y-3">
              {(t.raw('deliverables.items') as string[]).map((item, i) => (
                <li key={i} className="text-lg text-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-white mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4) Process */}
          <div className="mb-20">
            <h2 className="heading-xl mb-6">
              {t('processSection.title')}
            </h2>
            <ol className="space-y-4">
              {(t.raw('processSection.steps') as string[]).map((step, i) => (
                <li key={i} className="text-lg text-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-white font-medium shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 5) Fit */}
          <div className="mb-20">
            <h2 className="heading-xl mb-6">
              {t('fit.title')}
            </h2>
            <ul className="space-y-3">
              {(t.raw('fit.bullets') as string[]).map((bullet, i) => (
                <li key={i} className="text-lg text-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-white mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6) Proof */}
          {/* TODO: Insert real metrics and case study data here */}
          <div className="mb-20">
            <h2 className="heading-xl mb-6">
              {t('proof.title')}
            </h2>
            <ul className="space-y-3">
              {(t.raw('proof.bullets') as string[]).map((bullet, i) => (
                <li key={i} className="text-lg text-secondary leading-relaxed flex items-start gap-3">
                  <span className="text-white mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7) Final CTA */}
          <div className="text-center border border-overlay-border-light p-12 bg-overlay-bg-subtle backdrop-blur-sm">
            <h2 className="heading-xl mb-6">
              {t('cta.heading')}
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 transition-smooth font-medium"
            >
              {t('cta.button')}
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

export default function WebDevelopmentPage() {
  return <WebDevContent />;
}

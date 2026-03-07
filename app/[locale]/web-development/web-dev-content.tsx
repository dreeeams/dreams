"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Package, Blocks, Workflow, Search, Gauge, CheckCircle } from 'lucide-react';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { FlipWords } from '@/components/ui/flip-words';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { InteractiveCTA } from '@/components/ui/interactive-cta';

export default function WebDevContent() {
  const t = useTranslations('services.webDev');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-overlay-border-medium bg-black/50 backdrop-blur-sm hover:bg-overlay-bg-light transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* 1) Hero — self-contained background */}
      <section className="relative overflow-hidden bg-black pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Animated SVG background */}
        <div className="absolute inset-0 z-0">
          <BackgroundPaths />
        </div>

        {/* Readability overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Hero content */}
        <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
          <h1 className="heading-display text-white">
            {t('hero.h1')}
          </h1>

          <h2 className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-muted whitespace-nowrap">{t('hero.h2Prefix')}</span>
            <span className="relative inline-block overflow-hidden">
              {/* Invisible measurer reserves stable width */}
              <span className="invisible whitespace-nowrap" aria-hidden="true">
                {(t.raw('hero.flipWords') as string[]).reduce((a, b) => a.length >= b.length ? a : b) + '.'}
              </span>
              {/* Animated word centered within reserved space */}
              <span className="absolute inset-0 flex items-start justify-center">
                <FlipWords
                  words={(t.raw('hero.flipWords') as string[]).map(w => w + '.')}
                  duration={2400}
                  className="text-white !px-0"
                />
              </span>
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-muted">
            {t('hero.microline')}
          </p>
        </div>
      </section>

      {/* Body sections */}
      <section className="mt-8 md:mt-12 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          {/* 2) What You Get — merged Outcomes + Deliverables */}
          <div className="mb-16">
            <h2 className="heading-xl mb-4">
              {t('problem.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
              {(t.raw('problem.bullets') as string[]).map((bullet, i) => (
                <p key={i} className="border-l-2 border-overlay-border-medium pl-4 text-base text-secondary leading-relaxed">
                  {bullet}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(t.raw('deliverables.items') as string[]).map((item, i) => {
                const icons = [Package, Blocks, Workflow, Search, Gauge];
                const Icon = icons[i] || Package;
                const isLast = i === (t.raw('deliverables.items') as string[]).length - 1 && (t.raw('deliverables.items') as string[]).length % 2 !== 0;
                return (
                  <div key={i} className={`relative rounded-[1.25rem] border border-overlay-border-light p-2 md:rounded-[1.5rem] md:p-3 bg-transparent ${isLast ? 'md:col-span-2' : ''}`}>
                    <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.2} borderWidth={2} blur={0} disabled={false} variant="white" />
                    <div className="relative flex flex-col gap-3 rounded-xl border border-overlay-border-light bg-overlay-bg-subtle p-6 backdrop-blur-md hover:bg-overlay-bg-light transition-smooth">
                      <div className="w-fit rounded-lg border border-overlay-border-light bg-overlay-bg-subtle p-2.5">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-base text-secondary leading-relaxed">{item}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3) How It Works — merged Process + Fit + Proof */}
          <div className="mb-16">
            <h2 className="heading-xl mb-6">
              {t('processSection.title')}
            </h2>
            <ol className="space-y-3 mb-10">
              {(t.raw('processSection.steps') as string[]).map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-overlay-border-medium text-sm font-medium text-white">
                    {i + 1}
                  </span>
                  <span className="text-lg text-secondary leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>

            <p className="text-sm font-medium uppercase tracking-wider text-muted mb-4">
              {t('fit.title')}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
              {(t.raw('fit.bullets') as string[]).map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-overlay-border-light bg-overlay-bg-subtle px-4 py-3">
                  <CheckCircle className="h-4 w-4 shrink-0 text-white/40 mt-0.5" />
                  <span className="text-sm text-secondary leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              {(t.raw('proof.bullets') as string[]).map((bullet, i) => (
                <blockquote key={i} className="border-l-2 border-overlay-border-medium pl-4 text-muted italic">
                  {bullet}
                </blockquote>
              ))}
            </div>
          </div>

          {/* 4) Final CTA */}
          <InteractiveCTA
            heading={t('cta.heading')}
            description={t('cta.description')}
            buttonText={t('cta.button')}
            href="/start"
          />

        </div>
      </section>
    </main>
  );
}

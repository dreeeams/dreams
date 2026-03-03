"use client"

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { FlipWords } from '@/components/ui/flip-words';

export default function WebDevContent() {
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

      {/* 1) Hero — self-contained background */}
      <section className="relative overflow-hidden bg-black pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Animated grid background */}
        <div className="absolute inset-0 z-0">
          <FlickeringGrid
            className="absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.35}
            flickerChance={0.08}
          />
        </div>

        {/* Readability overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />

        {/* Hero content */}
        <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white">
            {t('hero.h1')}
          </h1>

          <div className="mt-5 inline-flex items-baseline justify-center gap-2 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white/70">{t('hero.h2Prefix')}</span>
            <span className="relative inline-block min-w-[12ch] text-left align-baseline">
              <FlipWords
                words={t.raw('hero.flipWords') as string[]}
                duration={2400}
                className="text-white px-0"
              />
            </span>
            <span className="text-white/70">.</span>
          </div>

          <p className="mt-4 text-sm md:text-base text-white/60">
            {t('hero.microline')}
          </p>
        </div>
      </section>

      {/* Body sections */}
      <section className="mt-12 md:mt-16 py-16 px-6 md:px-12">
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

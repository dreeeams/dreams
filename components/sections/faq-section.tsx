'use client';

import { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

// ---------------------------------------------------------------------------
// Spiral — golden-angle dot field with pulse animation (adapted from resource)
// ---------------------------------------------------------------------------
function Spiral() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = 700;
    const DOT = 1.8;
    const CENTER = SIZE / 2;
    const MAX_R = CENTER - 4 - DOT;
    const DURATION = 3;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', String(SIZE));
    svg.setAttribute('height', String(SIZE));
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', x.toFixed(3));
      c.setAttribute('cy', y.toFixed(3));
      c.setAttribute('r', String(DOT));
      c.setAttribute('fill', '#ffffff');
      c.setAttribute('opacity', '0.6');

      const animR = document.createElementNS(svgNS, 'animate');
      animR.setAttribute('attributeName', 'r');
      animR.setAttribute('values', `${DOT * 0.5};${DOT * 1.4};${DOT * 0.5}`);
      animR.setAttribute('dur', `${DURATION}s`);
      animR.setAttribute('begin', `${(frac * DURATION).toFixed(3)}s`);
      animR.setAttribute('repeatCount', 'indefinite');
      animR.setAttribute('calcMode', 'spline');
      animR.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1');
      c.appendChild(animR);

      const animO = document.createElementNS(svgNS, 'animate');
      animO.setAttribute('attributeName', 'opacity');
      animO.setAttribute('values', '0.25;0.9;0.25');
      animO.setAttribute('dur', `${DURATION}s`);
      animO.setAttribute('begin', `${(frac * DURATION).toFixed(3)}s`);
      animO.setAttribute('repeatCount', 'indefinite');
      animO.setAttribute('calcMode', 'spline');
      animO.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1');
      c.appendChild(animO);

      svg.appendChild(c);
    }

    ref.current.innerHTML = '';
    ref.current.appendChild(svg);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
      style={{
        maskImage:
          'radial-gradient(circle at center, rgba(255,255,255,1), rgba(255,255,255,0.1) 60%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(circle at center, rgba(255,255,255,1), rgba(255,255,255,0.1) 60%, transparent 75%)',
      }}
    >
      <div ref={ref} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQCard — click-to-expand card with grid-rows transition
// ---------------------------------------------------------------------------
function FAQCard({
  faqKey,
  index,
  question,
  answer,
}: {
  faqKey: string;
  index: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group border border-white/10 hover:border-white/25 bg-black/40 p-6 md:p-7 transition-colors duration-300"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between text-left gap-4"
        aria-expanded={open}
        aria-controls={`faq-answer-${faqKey}`}
      >
        <div className="flex items-baseline gap-4 flex-1 min-w-0">
          <span className="text-xs font-mono tracking-widest text-white/25 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-base md:text-lg font-nostalgic font-semibold text-white leading-tight"
            itemProp="name"
          >
            {question}
          </h3>
        </div>
        <span
          className={`text-white/40 group-hover:text-white/70 text-xl font-mono shrink-0 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>

      <div
        id={`faq-answer-${faqKey}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pl-8 space-y-2" itemProp="text">
            {answer.split('\n').map((line, i) => (
              <p
                key={i}
                className="text-sm md:text-base leading-relaxed text-white/50"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

// ---------------------------------------------------------------------------
// FAQSection
// ---------------------------------------------------------------------------
export default function FAQSection() {
  const t = useTranslations('faq');
  const locale = useLocale();

  // SEO schema
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqKeys.map((faqKey) => ({
        '@type': 'Question',
        name: t(`questions.${faqKey}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`questions.${faqKey}.answer`),
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    script.id = 'faq-schema';

    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, [t, locale]);

  return (
    <section
      className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black overflow-hidden"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Spiral background */}
      <Spiral />

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="text-sm md:text-base text-white/40 mb-3">
            {t('intro')}
          </p>
          <h2 className="text-3xl md:text-5xl font-nostalgic text-white">
            {t('title')}
          </h2>
        </m.div>

        {/* FAQ grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {faqKeys.map((faqKey, index) => (
            <FAQCard
              key={faqKey}
              faqKey={faqKey}
              index={index}
              question={t(`questions.${faqKey}.question`)}
              answer={String(t(`questions.${faqKey}.answer`))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

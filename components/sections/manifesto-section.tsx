'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// MorphWord — adapted from GooeyText merge/morph mechanism
// Keeps: rAF loop, blur+opacity crossfade, SVG feColorMatrix threshold filter
// Removed: demo styling, className props, foreground color tokens
// Changed: slower timing (1.5s morph, 2s cooldown), proper rAF cleanup,
//          inline-flex layout with dynamic spacer for longest word
// ---------------------------------------------------------------------------
function MorphWord({ words }: { words: string[] }) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  // Find the longest word for the invisible spacer
  const spacer = useMemo(
    () => words.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [words]
  );

  useEffect(() => {
    const morphTime = 1.5;
    const cooldownTime = 2;
    let textIndex = words.length - 1;
    let time = Date.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId: number;

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = '';
      text2Ref.current.style.opacity = '100%';
      text1Ref.current.style.filter = '';
      text1Ref.current.style.opacity = '0%';
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = () => {
      const now = Date.now();
      const shouldIncrement = cooldown > 0;
      const dt = (now - time) / 1000;
      time = now;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrement) {
          textIndex = (textIndex + 1) % words.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = words[textIndex % words.length];
            text2Ref.current.textContent = words[(textIndex + 1) % words.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [words]);

  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="threshold-manifesto">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <span
        className="relative inline-flex items-center justify-center"
        style={{ filter: 'url(#threshold-manifesto)' }}
      >
        <span ref={text1Ref} className="absolute text-white" />
        <span ref={text2Ref} className="absolute text-white" />
        {/* Invisible spacer — reserves width of longest word */}
        <span className="invisible">{spacer}</span>
      </span>
    </>
  );
}

// ---------------------------------------------------------------------------
// ManifestoSection
// ---------------------------------------------------------------------------
export default function ManifestoSection() {
  const t = useTranslations('manifesto');
  const tNav = useTranslations('nav');

  const principles = t.raw('principles') as { title: string; description: string }[];
  const introContrast = t.raw('introContrast') as string[];
  const morphWords = t.raw('morphWords') as string[];

  return (
    <section className="relative z-10 py-28 md:py-36 px-6 md:px-12 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Headline with morphing keyword */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-nostalgic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight text-white text-center mb-20"
        >
          {t('headlineBefore')}{' '}
          <MorphWord words={morphWords} />{' '}
          {t('headlineAfter')}
        </m.h2>

        {/* Intro block */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 text-center"
        >
          <p className="text-base md:text-lg leading-relaxed text-white/70 mb-6">
            {t('intro')}
          </p>
          <div className="space-y-1 mb-6">
            {introContrast.map((line, i) => (
              <p key={i} className="text-sm font-mono tracking-wider text-white/40">
                {line}
              </p>
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed text-white/70">
            {t('introClose')}
          </p>
        </m.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-20">
          {principles.map((principle, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-white/10 pt-6"
            >
              <h3 className="text-lg md:text-xl font-nostalgic font-bold text-white mb-2">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {principle.description}
              </p>
            </m.div>
          ))}
        </div>

        {/* Closing line + CTA */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-base md:text-lg font-mono tracking-wide text-white/60 mb-10">
            {t('closing')}
          </p>
          <Link href="/start">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-base md:text-lg font-medium text-black bg-white hover:bg-surface-light-1 border border-white transition-colors"
            >
              {tNav('getStarted')} →
            </m.button>
          </Link>
        </m.div>
      </div>
    </section>
  );
}

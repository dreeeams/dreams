'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import Logo from '@/components/logo';

// ---------------------------------------------------------------------------
// MorphWord — text merge/morph animation
// Uses SVG feColorMatrix threshold + blur/opacity crossfade on two spans.
// Fixed-width inline-block container sized to longest word prevents layout shift.
// ---------------------------------------------------------------------------
function MorphWord({ words }: { words: string[] }) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

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
        className="relative inline-block text-center align-baseline"
        style={{ filter: 'url(#threshold-manifesto)' }}
      >
        <span ref={text1Ref} className="absolute inset-0 text-white" />
        <span ref={text2Ref} className="absolute inset-0 text-white" />
        <span className="invisible" aria-hidden="true">{spacer}</span>
      </span>
    </>
  );
}

// ---------------------------------------------------------------------------
// ManifestoSection
// ---------------------------------------------------------------------------
export default function ManifestoSection() {
  const t = useTranslations('manifesto');

  const principles = t.raw('principles') as { title: string; description: string }[];
  const morphWords = t.raw('morphWords') as string[];

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Logo identity anchor */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-16 md:mb-20"
        >
          <Logo className="h-8 md:h-10 w-auto" fill="white" />
        </m.div>

        {/* Morphing headline */}
        <m.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-nostalgic text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] tracking-tight text-white text-center mb-24 md:mb-32"
        >
          {t('headlineBefore')}{' '}
          <MorphWord words={morphWords} />{' '}
          {t('headlineAfter')}
        </m.h2>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {principles.map((principle, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
            >
              {/* Grid texture layer */}
              <div
                className="size-full"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Gradient overlay */}
                <div className="size-full bg-gradient-to-tr from-black/95 via-black/70 to-black/40">
                  <div className="p-7 md:p-10">
                    <span className="block text-xs font-mono tracking-widest text-white/25 mb-5">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-nostalgic font-bold text-white mb-3 group-hover:text-white/95 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import TerminalPong from '@/components/terminal-pong';

type CodeLine = {
  text: string;
  color: string;
  inline?: Array<{ text: string; color: string }>;
};

export default function HeroSection() {
  const t = useTranslations('hero.terminal');
  const tButtons = useTranslations('hero.buttons');
  const [displayedLines, setDisplayedLines] = useState<CodeLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const codeLines = [
    { text: t('init'), color: 'text-purple-400' },
    { text: t('loading'), color: 'text-gray-500' },
    { text: t('initializing'), color: 'text-gray-500' },
    { text: t('compiling'), color: 'text-gray-500' },
    { text: '', color: '' },
    { text: t('constStudio'), color: 'text-purple-400', inline: [
      { text: t('studio'), color: 'text-blue-400' },
      { text: t('equals'), color: 'text-yellow-300' }
    ]},
    { text: t('name'), color: 'text-cyan-400', inline: [
      { text: ': ', color: 'text-white' },
      { text: t('nameValue'), color: 'text-orange-400' },
      { text: ',', color: 'text-white' }
    ]},
    { text: t('mission'), color: 'text-cyan-400', inline: [
      { text: ': ', color: 'text-white' },
      { text: t('missionValue'), color: 'text-orange-400' },
      { text: ',', color: 'text-white' }
    ]},
    { text: t('output'), color: 'text-cyan-400', inline: [
      { text: ': ', color: 'text-white' },
      { text: t('outputValue'), color: 'text-orange-400' },
      { text: ',', color: 'text-white' }
    ]},
    { text: t('status'), color: 'text-cyan-400', inline: [
      { text: ': ', color: 'text-white' },
      { text: t('statusValue'), color: 'text-orange-400' }
    ]},
    { text: t('closeBrace'), color: 'text-yellow-300' },
    { text: '', color: '' },
    { text: t('ready'), color: 'text-green-400' },
  ];

  useEffect(() => {
    // Listen for loader completion
    const handleLoaderComplete = () => {
      setLoaderComplete(true);
    };

    window.addEventListener('loaderComplete', handleLoaderComplete);

    return () => {
      window.removeEventListener('loaderComplete', handleLoaderComplete);
    };
  }, []);

  useEffect(() => {
    // Don't start typing animation until loader is complete
    if (!loaderComplete) return;

    if (currentLineIndex >= codeLines.length) {
      setIsTypingComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, codeLines[currentLineIndex]]);
      setCurrentLineIndex(prev => prev + 1);
    }, 150);

    return () => clearTimeout(timer);
  }, [currentLineIndex, codeLines, loaderComplete]);

  return (
    <section className="w-full h-full flex items-center justify-center px-4 sm:px-6 bg-background-light">
      <div className="max-w-5xl w-full mx-auto">
        {/* SEO H1 - Visually hidden but available for screen readers and SEO */}
        <h1 className="sr-only">
          Dream Studio - Web and Mobile App Development Agency
        </h1>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black border-4 border-black shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-white border-b-4 border-black px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 border-2 border-black" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500 border-2 border-black" />
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-black" />
              </div>
              <span className="ml-3 sm:ml-4 text-xs sm:text-sm font-mono font-bold">terminal</span>
            </div>
            <span className="text-xs font-mono hidden sm:block">~/dream-studio</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] font-mono text-sm sm:text-base md:text-lg">
            {displayedLines.map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line.inline ? (
                  <span>
                    <span className={line.color}>{line.text}</span>
                    {line.inline.map((part, partIndex) => (
                      <span key={partIndex} className={part.color}>
                        {part.text}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className={line.color || 'text-white'}>{line.text || '\u00A0'}</span>
                )}
              </div>
            ))}
            {!isTypingComplete && <span className="animate-pulse text-white">▊</span>}

            {/* Pong Game - appears after typing is complete */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8"
              >
                <TerminalPong />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-12 py-3 sm:py-5 bg-brand text-white border-4 border-black font-bold text-xs sm:text-base hover:bg-black hover:border-brand transition-colors cursor-pointer"
          >
            {tButtons('startProject')}
          </motion.a>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-12 py-3 sm:py-5 bg-transparent text-black border-4 border-black font-bold text-xs sm:text-base hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            {tButtons('viewWork')}
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypingComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <motion.a
            href="#services"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-xs sm:text-sm font-bold font-mono text-black opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span>&gt; {tButtons('scrollDown')}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const faqs = ['q1', 'q2', 'q3', 'q4', 'q5'];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const t = useTranslations('faq');

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-20"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic whitespace-nowrap">(</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mx-2 sm:mx-3 md:mx-4 lg:mx-6 font-nostalgic whitespace-nowrap">{t('title').toUpperCase()}</h2>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic whitespace-nowrap">)</span>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-0">
          {faqs.map((faqKey, index) => (
            <motion.div
              key={faqKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t-4 border-black first:border-t-0"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6 flex-1">
                  <span className="text-4xl md:text-5xl font-mono font-bold text-brand opacity-40 group-hover:opacity-100 transition-opacity">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl md:text-2xl font-bold group-hover:text-brand transition-colors">
                    {t(`questions.${faqKey}.question`)}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold flex-shrink-0 ml-6"
                >
                  +
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-20">
                  <p className="text-base md:text-lg leading-relaxed text-gray-600">
                    {t(`questions.${faqKey}.answer`)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t-4 border-black"></div>
        </div>
      </div>
    </section>
  );
}

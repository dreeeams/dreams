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
      <div className="max-w-6xl mx-auto">
        {/* FAQ Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-16"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic whitespace-nowrap">(</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mx-2 sm:mx-3 md:mx-4 lg:mx-6 font-nostalgic whitespace-nowrap">{t('title').toUpperCase()}</h2>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-nostalgic whitespace-nowrap">)</span>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faqKey, index) => (
            <motion.div
              key={faqKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-4 border-black bg-white overflow-hidden"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-start justify-between hover:bg-gray-50 transition-colors text-left gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <span className="text-brand font-mono font-bold text-2xl flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base md:text-lg font-bold leading-tight pt-1">
                      {t(`questions.${faqKey}.question`)}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold flex-shrink-0 leading-none"
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t-4 border-black">
                  <div className="pt-6 pl-14">
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      {t(`questions.${faqKey}.answer`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

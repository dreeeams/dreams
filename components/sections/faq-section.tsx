'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const faqs = [
  { questionKey: 'question1', answerKey: 'answer1' },
  { questionKey: 'question2', answerKey: 'answer2' },
  { questionKey: 'question3', answerKey: 'answer3' },
  { questionKey: 'question4', answerKey: 'answer4' },
  { questionKey: 'question5', answerKey: 'answer5' },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations('faq');

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* FAQ Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-16"
        >
          <span className="text-7xl md:text-9xl font-nostalgic">(</span>
          <h2 className="text-7xl md:text-9xl mx-6 font-nostalgic">{t('title').toUpperCase()}</h2>
          <span className="text-7xl md:text-9xl font-nostalgic">)</span>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {[
            {
              question: 'HOW LONG DOES A TYPICAL PROJECT TAKE?',
              answer: 'Project timelines vary based on complexity. A simple website can take 4-6 weeks, while a full mobile app typically takes 3-6 months.',
            },
            {
              question: 'WHAT IS YOUR PRICING MODEL?',
              answer: 'We offer both fixed-price and hourly rate models. Most projects start at $10,000 for websites and $25,000 for mobile apps.',
            },
            {
              question: 'DO YOU PROVIDE ONGOING SUPPORT?',
              answer: 'Yes! We offer maintenance packages that include bug fixes, updates, security patches, and feature enhancements.',
            },
            {
              question: 'CAN YOU WORK WITH OUR EXISTING TEAM?',
              answer: 'Absolutely! We collaborate seamlessly with in-house teams, providing expertise where needed.',
            },
            {
              question: 'WHAT TECHNOLOGIES DO YOU SPECIALIZE IN?',
              answer: 'We specialize in React, Next.js, React Native, Node.js, TypeScript, and modern cloud platforms.',
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-2 border-black dark:border-white bg-white dark:bg-black overflow-hidden"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-surface-2 transition-colors text-left"
              >
                <span className="text-sm font-bold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold"
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
                <div className="p-6 pt-0 border-t-2 border-black dark:border-white">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

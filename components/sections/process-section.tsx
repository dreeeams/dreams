'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const processSteps = [
  { number: '01', iconKey: '🔍' },
  { number: '02', iconKey: '✏️' },
  { number: '03', iconKey: '⚡' },
  { number: '04', iconKey: '🚀' },
];

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section id="process" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-xs font-bold mb-4">( {t('title').toUpperCase()} )</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-black dark:border-white max-w-4xl mx-auto">
            <div className="border-r-4 border-black dark:border-white p-6 bg-white dark:bg-black">
              <h3 className="text-2xl font-nostalgic">HOW</h3>
            </div>
            <div className="border-r-4 border-black dark:border-white p-6 bg-black dark:bg-white text-white dark:text-black">
              <h3 className="text-2xl italic font-nostalgic">WE</h3>
            </div>
            <div className="border-r-4 border-black dark:border-white p-6 bg-white dark:bg-black">
              <h3 className="text-2xl font-nostalgic">WORK</h3>
            </div>
            <div className="p-6 bg-brand text-white">
              <h3 className="text-2xl italic font-nostalgic">WITH YOU</h3>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="border-4 border-black dark:border-white bg-white dark:bg-black p-8 relative group cursor-pointer"
            >
              {/* Step Number */}
              <motion.div
                className="absolute -top-6 -left-6 w-16 h-16 bg-brand border-4 border-black dark:border-white flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-xl">{step.number}</span>
              </motion.div>

              {/* Icon */}
              <div className="text-5xl mb-4">{step.iconKey}</div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 font-nostalgic">
                {t(`${['discover', 'design', 'develop', 'deliver'][index]}.title`).toUpperCase()}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {t(`${['discover', 'design', 'develop', 'deliver'][index]}.description`)}
              </p>

              {/* Decorative Arrow */}
              {index < processSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  className="hidden md:block absolute -right-10 top-1/2 transform -translate-y-1/2 text-6xl"
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-4 border-black dark:border-white bg-white dark:bg-black p-8"
        >
          <h3 className="text-xs font-bold mb-6">TYPICAL PROJECT TIMELINE:</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-black dark:bg-white"></div>

            {/* Timeline Points */}
            <div className="grid grid-cols-4 gap-4 relative">
              {['Week 1-2', 'Week 3-4', 'Week 5-8', 'Week 9+'].map((week, i) => (
                <motion.div
                  key={week}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    className="w-12 h-12 bg-brand border-4 border-black dark:border-white rounded-full mx-auto mb-3 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm">{i + 1}</span>
                  </motion.div>
                  <p className="text-xs font-medium">{week}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t(`${['discover', 'design', 'develop', 'deliver'][i]}.title`).toUpperCase()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Collaboration Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 border-4 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black p-8 text-center"
        >
          <p className="text-sm font-medium max-w-2xl mx-auto">
            "WE BELIEVE IN TRANSPARENT COMMUNICATION AND COLLABORATIVE DEVELOPMENT.
            YOU'LL BE INVOLVED EVERY STEP OF THE WAY."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

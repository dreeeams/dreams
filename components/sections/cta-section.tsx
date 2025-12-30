'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('contact');

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-black dark:bg-white">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(white 1px, transparent 1px),
            linear-gradient(90deg, white 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="border-4 border-white dark:border-black p-12 md:p-20 bg-black dark:bg-white">
          {/* Main heading with animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-nostalgic text-white dark:text-black mb-8 leading-none">
              READY TO
            </h2>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-nostalgic italic text-brand mb-8 leading-none">
              BUILD
            </h2>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-nostalgic text-white dark:text-black leading-none">
              TOGETHER?
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-xl md:text-2xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto mb-16"
          >
            Let's transform your vision into a powerful digital reality.
            Get in touch and start building something extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-brand text-white border-4 border-brand font-bold text-lg hover:bg-white hover:text-brand hover:border-white transition-all duration-300"
            >
              START YOUR PROJECT
            </motion.a>

            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-transparent text-white dark:text-black border-4 border-white dark:border-black font-bold text-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
            >
              VIEW OUR WORK
            </motion.a>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-0 border-4 border-white dark:border-black"
          >
            {[
              { value: '100+', label: 'PROJECTS' },
              { value: '50+', label: 'CLIENTS' },
              { value: '5+', label: 'YEARS' },
              { value: '24/7', label: 'SUPPORT' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className={`p-8 text-center ${
                  index !== 3 ? 'border-r-4 border-white dark:border-black' : ''
                } ${
                  index % 2 === 0 ? 'bg-white/5 dark:bg-black/5' : ''
                }`}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 font-nostalgic text-brand">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white dark:text-black">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-brand" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-brand" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-brand" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-brand" />
    </section>
  );
}

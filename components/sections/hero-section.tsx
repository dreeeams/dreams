'use client';

import { LayoutGroup, motion } from 'motion/react';
import { TextRotate } from '@/components/ui/text-rotate';

export default function HeroSection() {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <LayoutGroup>
          {/* Main Heading with Rotating Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 sm:mb-14 md:mb-16"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] font-nostalgic flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4"
                layout
              >
                <span>WE BUILD</span>
                <TextRotate
                  texts={[
                    "SOFTWARE",
                    "WEBSITES",
                    "MOBILE APPS",
                    "PLATFORMS",
                    "SOLUTIONS"
                  ]}
                  mainClassName="text-white dark:text-black px-3 sm:px-4 md:px-6 bg-brand overflow-hidden justify-center border-2 sm:border-3 md:border-4 border-black dark:border-white"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </motion.h1>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.9] font-nostalgic"
                layout
              >
                THAT CONVERTS
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 sm:mb-12"
          >
            <div className="border-2 sm:border-3 md:border-4 border-black dark:border-white p-5 sm:p-6 md:p-8 bg-white dark:bg-surface-1 max-w-2xl">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black dark:text-white">
                From concept to deployment, we craft digital experiences that drive results.
                Modern, scalable, and built for growth.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 md:gap-6"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-black dark:bg-white text-white dark:text-black border-2 sm:border-3 md:border-4 border-black dark:border-white font-bold text-sm sm:text-base hover:bg-brand hover:text-white hover:border-brand dark:hover:bg-brand dark:hover:text-white transition-colors cursor-pointer text-center"
            >
              START PROJECT
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-transparent text-black dark:text-white border-2 sm:border-3 md:border-4 border-black dark:border-white font-bold text-sm sm:text-base hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer text-center"
            >
              VIEW PORTFOLIO
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-brand flex items-center justify-center border-2 sm:border-3 md:border-4 border-black dark:border-white cursor-pointer flex-shrink-0"
            >
              <span className="text-2xl sm:text-3xl text-white">↓</span>
            </motion.a>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

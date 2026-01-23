'use client';

import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Lock, Smartphone } from "lucide-react"
import { useTranslations } from 'next-intl'

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <m.span
        className="font-serif text-4xl sm:text-6xl md:text-8xl text-black group-hover:text-white font-medium transition-colors duration-300"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Aa
      </m.span>
    </div>
  )
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"]

  return (
    <div className="h-full flex items-center justify-center">
      <m.div
        className={`grid ${layouts[layout]} gap-1 sm:gap-1.5 w-full max-w-[100px] sm:max-w-[140px] h-full`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <m.div
            key={i}
            className="bg-black group-hover:bg-white h-4 sm:h-5 w-full border border-black group-hover:border-white transition-colors duration-300"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </m.div>
    </div>
  )
}

function SpeedIndicator({ loadTimeText }: { loadTimeText: string }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 sm:gap-4">
      <div className="h-8 sm:h-10 flex items-center justify-center overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <m.div
              key="loader"
              className="h-6 w-20 sm:h-8 sm:w-24 bg-black/10 group-hover:bg-overlay-bg-light border border-black group-hover:border-white transition-colors duration-300"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: 'absolute' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <m.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-white transition-colors duration-300"
            >
              100ms
            </m.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 font-bold transition-colors duration-300">{loadTimeText}</span>
      <div className="w-full max-w-[100px] sm:max-w-[120px] h-1.5 bg-overlay-bg-light group-hover:bg-overlay-bg-light overflow-hidden border border-white group-hover:border-white transition-colors duration-300">
        <m.div
          className="h-full bg-white group-hover:bg-white transition-colors duration-300"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  )
}

function SecurityBadge() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShields(prev => {
        const nextIndex = prev.findIndex(s => !s.active)
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }))
        }
        return prev.map((s, i) => i === nextIndex ? { ...s, active: true } : s)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full gap-1.5 sm:gap-2">
      {shields.map((shield) => (
        <m.div
          key={shield.id}
          className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center border transition-colors duration-300 ${
            shield.active
              ? 'bg-black border-black group-hover:bg-white group-hover:border-white'
              : 'bg-white border-black group-hover:bg-black group-hover:border-white'
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
            shield.active
              ? 'text-white group-hover:text-black'
              : 'text-black group-hover:text-white'
          }`} />
        </m.div>
      ))}
    </div>
  )
}

function GlobalNetwork() {
  const pulses = [0, 1]

  return (
    <div className="flex items-center justify-center h-full relative">
      <svg width="56" height="56" viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14 z-10 fill-black group-hover:fill-white transition-all duration-300" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
      </svg>
      {pulses.map((pulse) => (
        <m.div
          key={pulse}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border border-black/10 group-hover:border-overlay-border-light rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

export default function BentoGrid() {
  const t = useTranslations('features')

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto">
        <m.p
          className="text-gray-600 text-sm uppercase tracking-widest mb-8 font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </m.p>

        {/* Bento Grid - 3x3 Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 auto-rows-[240px]">

          {/* Row 1 - 3 cards */}

          {/* 1. Typography */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <TypeTester />
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">{t('typography.title')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('typography.description')}</p>
            </div>
          </m.div>

          {/* 2. Speed */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex-1">
              <SpeedIndicator loadTimeText={t('speedIndicator.loadTime')} />
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">{t('speed.title')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('speed.description')}</p>
            </div>
          </m.div>

          {/* 3. Layouts */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1">
              <LayoutAnimation />
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">{t('layouts.title')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('layouts.description')}</p>
            </div>
          </m.div>

          {/* Row 2 - 3 cards */}

          {/* 4. Global Network */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-6 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <GlobalNetwork />
              </div>
            </div>
            <div className="mt-auto">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">
                {t('speedNetwork.title')}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('speedNetwork.description')}</p>
            </div>
          </m.div>

          {/* 5. Security */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex-1">
              <SecurityBadge />
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">
                {t('security.title')}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('security.description')}</p>
            </div>
          </m.div>

          {/* 6. Mobile Ready */}
          <m.div
            className="bg-gray-100 border border-black p-4 sm:p-8 flex flex-col overflow-hidden group hover:bg-black transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <m.svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                className="w-12 h-12 sm:w-16 sm:h-16"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Phone body */}
                <rect
                  x="20"
                  y="8"
                  width="24"
                  height="48"
                  className="fill-none stroke-black group-hover:stroke-white transition-colors duration-300"
                  strokeWidth="1"
                />
                {/* Screen */}
                <rect
                  x="22"
                  y="12"
                  width="20"
                  height="36"
                  className="fill-black group-hover:fill-white transition-colors duration-300"
                />
                {/* Home button/indicator */}
                <circle
                  cx="32"
                  cy="52"
                  r="2"
                  className="fill-black group-hover:fill-white transition-colors duration-300"
                />
              </m.svg>
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="font-sans text-base sm:text-xl text-black font-light group-hover:text-white transition-colors duration-300">{t('mobile.title')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">{t('mobile.description')}</p>
            </div>
          </m.div>

        </div>
      </div>
    </div>
  )
}

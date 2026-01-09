'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TechCard = ({
  name,
  logo,
  delay,
  invertOnHover = false,
}: {
  name: string;
  logo: string;
  delay: number;
  invertOnHover?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 0.4,
      delay,
      ease: 'easeOut'
    }}
    className="border-2 border-black p-4 flex flex-col items-center justify-center bg-white hover:bg-black hover:border-black transition-all cursor-pointer group"
  >
    <div className={`relative w-12 h-12 mb-2 grayscale group-hover:grayscale-0 transition-all ${invertOnHover ? 'group-hover:invert' : ''}`}>
      <Image src={logo} alt={name} fill className="object-contain" />
    </div>
    <span className="text-[10px] font-bold text-center text-black group-hover:text-white transition-colors">
      {name}
    </span>
  </motion.div>
);

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      number: '01',
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
    },
    {
      number: '02',
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
    },
    {
      number: '03',
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
    },
    {
      number: '04',
      titleKey: 'consulting.title',
      descriptionKey: 'consulting.description',
    },
  ];

  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic">( </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic text-center">
              {t('title').toUpperCase()}
            </h2>
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic"> )</span>
          </div>
        </motion.div>

        {/* Services Grid - Minimalista con Números */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-20 md:gap-y-24 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Número */}
              <div className="text-brand text-6xl md:text-7xl font-mono font-bold mb-4 opacity-40">
                [{service.number}]
              </div>

              {/* Título */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-sans tracking-tight">
                {t(service.titleKey).toUpperCase()}
              </h3>

              {/* Descripción */}
              <p className="text-base md:text-lg leading-relaxed text-foreground-light/70">
                {t(service.descriptionKey)}
              </p>

              {/* Línea decorativa */}
              <div className="mt-6 h-1 w-20 bg-black group-hover:w-40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="border-4 border-black p-8 bg-background-light">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-black font-nostalgic md:tracking-wider">
              {t('techStack.title').toUpperCase()}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
              <TechCard
                name="REACT"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                delay={0}
              />
              <TechCard
                name="NEXT.JS"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                delay={0.05}
                invertOnHover={true}
              />
              <TechCard
                name="TYPESCRIPT"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                delay={0.1}
              />
              <TechCard
                name="NODE.JS"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                delay={0.15}
              />
              <TechCard
                name="TAILWIND"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                delay={0.2}
              />
              <TechCard
                name="REACT NATIVE"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                delay={0.25}
              />
              <TechCard
                name="FRAMER"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg"
                delay={0.3}
                invertOnHover={true}
              />
              <TechCard
                name="SHOPIFY"
                logo="https://cdn.worldvectorlogo.com/logos/shopify.svg"
                delay={0.35}
              />
              <TechCard
                name="SUPABASE"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
                delay={0.4}
              />
              <TechCard
                name="POSTGRESQL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                delay={0.45}
              />
              <TechCard
                name="STRIPE"
                logo="https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg"
                delay={0.5}
              />
              <TechCard
                name="RADIX UI"
                logo="https://avatars.githubusercontent.com/u/75042455?s=200&v=4"
                delay={0.55}
              />
              <TechCard
                name="VERCEL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
                delay={0.6}
                invertOnHover={true}
              />
              <TechCard
                name="EXPO"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg"
                delay={0.65}
                invertOnHover={true}
              />
              <TechCard
                name="GRAPHQL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
                delay={0.7}
              />
              <TechCard
                name="GITHUB"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                delay={0.75}
                invertOnHover={true}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-sm font-medium text-gray-600 mt-6"
            >
              {t('techStack.andMore')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

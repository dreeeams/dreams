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
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    className="border-2 border-black dark:border-white p-4 flex flex-col items-center justify-center bg-white dark:bg-surface-1 hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white transition-all cursor-pointer group"
  >
    <div className={`relative w-12 h-12 mb-2 grayscale group-hover:grayscale-0 transition-all ${invertOnHover ? 'group-hover:invert' : ''}`}>
      <Image src={logo} alt={name} fill className="object-contain" />
    </div>
    <span className="text-[10px] font-bold text-center text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">
      {name}
    </span>
  </motion.div>
);

export default function ServicesSection() {
  const t = useTranslations('services');

  const services = [
    {
      titleKey: 'webDev.title',
      descriptionKey: 'webDev.description',
      icon: '◐',
      color: 'bg-brand',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    },
    {
      titleKey: 'mobileDev.title',
      descriptionKey: 'mobileDev.description',
      icon: '◑',
      color: 'bg-black dark:bg-white',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
    },
    {
      titleKey: 'uiux.title',
      descriptionKey: 'uiux.description',
      icon: '◒',
      color: 'bg-white dark:bg-surface-1 border-2 border-black dark:border-white',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    },
    {
      titleKey: 'consulting.title',
      descriptionKey: 'consulting.description',
      icon: '◓',
      color: 'bg-brand',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <span className="text-7xl md:text-9xl font-nostalgic">(</span>
            <h2 className="text-7xl md:text-9xl mx-6 font-nostalgic">
              {t('title').toUpperCase()}
            </h2>
            <span className="text-7xl md:text-9xl font-nostalgic">)</span>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="border-4 border-black dark:border-white bg-white dark:bg-surface-1 overflow-hidden">
                {/* Service Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 font-nostalgic">
                    {t(service.titleKey).toUpperCase()}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>
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
          <div className="border-4 border-black dark:border-white p-8 bg-background-light dark:bg-surface-2">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-black dark:text-white font-nostalgic">
              TECHNOLOGIES & TOOLS WE USE:
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
                delay={0.02}
                invertOnHover={true}
              />
              <TechCard
                name="TYPESCRIPT"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                delay={0.04}
              />
              <TechCard
                name="NODE.JS"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                delay={0.06}
              />
              <TechCard
                name="TAILWIND"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                delay={0.08}
              />
              <TechCard
                name="REACT NATIVE"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                delay={0.1}
              />
              <TechCard
                name="FRAMER"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg"
                delay={0.12}
                invertOnHover={true}
              />
              <TechCard
                name="SHOPIFY"
                logo="https://cdn.worldvectorlogo.com/logos/shopify.svg"
                delay={0.14}
              />
              <TechCard
                name="SUPABASE"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"
                delay={0.16}
              />
              <TechCard
                name="POSTGRESQL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                delay={0.18}
              />
              <TechCard
                name="STRIPE"
                logo="https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg"
                delay={0.2}
              />
              <TechCard
                name="SHADCN"
                logo="https://ui.shadcn.com/favicon.ico"
                delay={0.22}
                invertOnHover={true}
              />
              <TechCard
                name="VERCEL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
                delay={0.24}
                invertOnHover={true}
              />
              <TechCard
                name="MERCADOPAGO"
                logo="https://contactopuro.com/wp-content/uploads/2020/08/mercadopago-logo.png"
                delay={0.26}
              />
              <TechCard
                name="GRAPHQL"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
                delay={0.28}
              />
              <TechCard
                name="GITHUB"
                logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                delay={0.3}
                invertOnHover={true}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mt-6"
            >
              Y muchas más...
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

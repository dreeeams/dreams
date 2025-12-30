'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Project = {
  titleKey: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  url?: string;
  mobileView?: boolean;
  isMockup?: boolean;
  rating?: {
    stars: number;
    reviews: number;
  };
  appStore?: boolean;
  downloads?: number;
};

const projects: Project[] = [
  {
    titleKey: 'HUNT RHO',
    category: 'WEB APP',
    description: 'Modern ticketing and event management platform with real-time updates and analytics',
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    color: 'bg-brand',
    url: 'hunt-rho.vercel.app',
  },
  {
    titleKey: 'PERRO NEGRO',
    category: 'WEB APP',
    description: 'Event ticketing platform for Perro Negro with real-time ticket sales and management',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black dark:bg-surface-1',
    url: 'perronegro.biotickets.com',
  },
  {
    titleKey: 'MARÍA HELENA AMADOR',
    category: 'WEB APP',
    description: 'Ticketing platform for María Helena Amador events with seamless booking experience',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black dark:bg-surface-1',
    url: 'maria-helena-amador.hunt-tickets.com',
    mobileView: true,
  },
  {
    titleKey: 'AMAZONAS TOURES',
    category: 'WEB APP',
    description: 'Tourism and travel agency platform showcasing amazing Amazon tours and experiences',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    color: 'bg-white dark:bg-black border-4 border-black dark:border-white',
    url: 'www.amazonas-toures.com',
  },
  {
    titleKey: 'WEDDING INVITATION',
    category: 'WEB APP',
    description: 'Beautiful and elegant wedding invitation website with RSVP and event details',
    tags: ['Next.js', 'Framer Motion', 'Vercel'],
    color: 'bg-brand',
    url: 'wedding-three-rose.vercel.app',
  },
  {
    titleKey: 'HUNT TICKETS',
    category: 'MOBILE APP',
    description: 'Modern ticketing and event management mobile application with real-time updates and analytics',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    color: 'bg-gradient-to-br from-blue-600 to-purple-600',
    isMockup: true,
    rating: { stars: 4.3, reviews: 250 },
    appStore: true,
    downloads: 5000,
  },
];

export default function PortfolioSection() {
  const t = useTranslations('portfolio');

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <span className="text-7xl md:text-9xl font-nostalgic">(</span>
            <h2 className="text-7xl md:text-9xl mx-6 italic font-nostalgic">
              {t('title').toUpperCase()}
            </h2>
            <span className="text-7xl md:text-9xl font-nostalgic">)</span>
          </div>
          <p className="text-center text-sm max-w-2xl mx-auto">
            {t('subtitle').toUpperCase()}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.titleKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Project Image Placeholder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`aspect-[4/3] ${project.color} relative overflow-hidden mb-4 border-4 border-black dark:border-white`}
              >
                {project.isMockup ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Phone Mockup - Proper iPhone 14 Pro proportions (19.5:9 aspect ratio) */}
                    <div className="relative h-[85%] aspect-[9/17.5]">
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-black dark:bg-surface-1 rounded-[1.5rem] shadow-2xl p-2">
                        {/* Screen */}
                        <div className="w-full h-full bg-white dark:bg-black rounded-[1.3rem] overflow-hidden relative">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[3%] bg-black dark:bg-surface-1 rounded-b-[0.4rem] z-10" />

                          {/* App Content */}
                          <div className="absolute inset-0 pt-[5%] px-[5%]">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center mb-[4%] text-[0.6rem]">
                              <span className="font-medium">9:41</span>
                              <div className="flex gap-[0.15rem]">
                                <div className="w-[0.6rem] h-[0.45rem] bg-current opacity-60" />
                                <div className="w-[0.6rem] h-[0.45rem] bg-current opacity-60" />
                                <div className="w-[0.6rem] h-[0.45rem] bg-current" />
                              </div>
                            </div>

                            {/* App Header */}
                            <div className="mb-[4%]">
                              <h3 className="text-[1.1rem] font-bold mb-[0.3rem]">Banking</h3>
                              <p className="text-[0.65rem] opacity-60">Welcome back, John</p>
                            </div>

                            {/* Balance Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-[0.8rem] p-[0.8rem] mb-[3%] shadow-lg">
                              <p className="text-[0.55rem] opacity-80 mb-[0.2rem]">Total Balance</p>
                              <p className="text-[1.3rem] font-bold mb-[0.8rem]">$24,582.00</p>
                              <div className="flex justify-between text-[0.55rem]">
                                <span>**** 4829</span>
                                <span>12/25</span>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-4 gap-[0.4rem] mb-[4%]">
                              {['Send', 'Receive', 'Pay', 'More'].map((action) => (
                                <div key={action} className="text-center">
                                  <div className="w-[2.2rem] h-[2.2rem] bg-gray-100 dark:bg-neutral-950 rounded-[0.6rem] mx-auto mb-[0.2rem]" />
                                  <span className="text-[0.5rem]">{action}</span>
                                </div>
                              ))}
                            </div>

                            {/* Transactions */}
                            <div>
                              <h4 className="text-[0.6rem] font-bold mb-[0.5rem] opacity-60">Recent Transactions</h4>
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-[0.5rem] mb-[0.6rem]">
                                  <div className="w-[1.8rem] h-[1.8rem] bg-gray-100 dark:bg-neutral-950 rounded-full flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="h-[0.4rem] bg-gray-200 dark:bg-gray-700 rounded mb-[0.2rem] w-[60%]" />
                                    <div className="h-[0.3rem] bg-gray-100 dark:bg-neutral-950 rounded w-[40%]" />
                                  </div>
                                  <div className="h-[0.5rem] bg-gray-200 dark:bg-gray-700 rounded w-[2rem] flex-shrink-0" />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Home Indicator */}
                          <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2 w-[30%] h-[0.3rem] bg-gray-400 dark:bg-gray-600 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : project.url ? (
                  project.mobileView ? (
                    <iframe
                      src={`https://${project.url}`}
                      className="absolute inset-0 w-full h-full pointer-events-none border-0"
                      title={project.titleKey}
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full scale-[0.25] origin-top-left">
                      <iframe
                        src={`https://${project.url}`}
                        className="w-[400%] h-[400%] pointer-events-none border-0"
                        title={project.titleKey}
                      />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`text-6xl font-bold ${
                        project.color.includes('white') && !project.color.includes('dark')
                          ? 'text-black dark:text-white'
                          : 'text-white dark:text-black opacity-20'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                {!project.isMockup && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                  >
                    <a
                      href={project.url ? `https://${project.url}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold border-2 border-white px-6 py-3 pointer-events-auto"
                    >
                      VIEW PROJECT →
                    </a>
                  </motion.div>
                )}
              </motion.div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-start gap-3 flex-wrap">
                  <span className="text-xs font-bold bg-black dark:bg-surface-1 text-white dark:text-black px-3 py-1">
                    {project.category}
                  </span>
                  {project.appStore && (
                    <div className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-neutral-950 px-2 py-1 rounded">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                      <span className="font-medium">App Store</span>
                    </div>
                  )}
                  {project.rating && (
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-yellow-500">★</span>
                      <span className="font-bold">{project.rating.stars}</span>
                      <span className="text-gray-400">({project.rating.reviews}+ reviews)</span>
                    </div>
                  )}
                  {project.downloads && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span className="font-medium">{project.downloads.toLocaleString()}+ downloads</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-nostalgic">
                  {project.titleKey}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* URL if available */}
                {project.url && !project.isMockup && (
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                  >
                    {project.url} →
                  </a>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-black dark:border-white px-2 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border-4 border-black dark:border-white font-bold text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            VIEW ALL PROJECTS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

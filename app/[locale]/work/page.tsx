'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useMemo } from 'react';

type Project = {
  titleKey: string;
  categoryKey: 'webApp' | 'mobileApp';
  descriptionKey: string;
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
  year?: number;
};

const projects: Project[] = [
  {
    titleKey: 'HUNT RHO',
    categoryKey: 'webApp',
    descriptionKey: 'huntRho',
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    color: 'bg-brand',
    url: 'hunt-rho.vercel.app',
    year: 2024,
  },
  {
    titleKey: 'PERRO NEGRO',
    categoryKey: 'webApp',
    descriptionKey: 'perroNegro',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black',
    url: 'perronegro.biotickets.com',
    year: 2024,
  },
  {
    titleKey: 'MARÍA HELENA AMADOR',
    categoryKey: 'webApp',
    descriptionKey: 'mariaHelena',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black',
    url: 'maria-helena-amador.hunt-tickets.com',
    mobileView: true,
    year: 2024,
  },
  {
    titleKey: 'AMAZONAS TOURES',
    categoryKey: 'webApp',
    descriptionKey: 'amazonasToures',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    color: 'bg-white border-4 border-black',
    url: 'www.amazonas-toures.com',
    year: 2023,
  },
  {
    titleKey: 'WEDDING INVITATION',
    categoryKey: 'webApp',
    descriptionKey: 'wedding',
    tags: ['Next.js', 'Framer Motion', 'Vercel'],
    color: 'bg-brand',
    url: 'wedding-three-rose.vercel.app',
    year: 2023,
  },
  {
    titleKey: 'HUNT TICKETS',
    categoryKey: 'mobileApp',
    descriptionKey: 'huntTickets',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    color: 'bg-gradient-to-br from-blue-600 to-purple-600',
    isMockup: true,
    rating: { stars: 4.3, reviews: 250 },
    appStore: true,
    downloads: 5000,
    year: 2024,
  },
];

type SortOption = 'newest' | 'oldest' | 'nameAZ' | 'nameZA';

export default function AllProjectsPage() {
  const t = useTranslations('portfolio.allProjects');
  const tFilters = useTranslations('portfolio.allProjects.filters');
  const tButtons = useTranslations('portfolio.buttons');
  const tLabels = useTranslations('portfolio.labels');
  const tProjects = useTranslations('portfolio.projects');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'webApp' | 'mobileApp'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.categoryKey === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project => {
        const searchLower = searchQuery.toLowerCase();
        return (
          project.titleKey.toLowerCase().includes(searchLower) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          tProjects(`${project.descriptionKey}.description`).toLowerCase().includes(searchLower)
        );
      });
    }

    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.year || 0) - (a.year || 0);
        case 'oldest':
          return (a.year || 0) - (b.year || 0);
        case 'nameAZ':
          return a.titleKey.localeCompare(b.titleKey);
        case 'nameZA':
          return b.titleKey.localeCompare(a.titleKey);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, tProjects]);

  return (
    <main className="min-h-screen bg-white">
      {/* Filters Section */}
      <section className="py-12 px-6 md:px-12 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder={tFilters('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-4 border-black px-6 py-4 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-brand placeholder:text-gray-400"
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filters and Sort */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-3 border-4 border-black font-bold text-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {tFilters('all')} ({projects.length})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('webApp')}
                  className={`px-6 py-3 border-4 border-black font-bold text-sm transition-colors ${
                    selectedCategory === 'webApp'
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {tLabels('webApp')} ({projects.filter(p => p.categoryKey === 'webApp').length})
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('mobileApp')}
                  className={`px-6 py-3 border-4 border-black font-bold text-sm transition-colors ${
                    selectedCategory === 'mobileApp'
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {tLabels('mobileApp')} ({projects.filter(p => p.categoryKey === 'mobileApp').length})
                </motion.button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">{tFilters('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border-4 border-black px-4 py-3 font-bold text-sm bg-white focus:outline-none focus:ring-4 focus:ring-brand cursor-pointer"
                >
                  <option value="newest">{tFilters('newest')}</option>
                  <option value="oldest">{tFilters('oldest')}</option>
                  <option value="nameAZ">{tFilters('nameAZ')}</option>
                  <option value="nameZA">{tFilters('nameZA')}</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="text-sm font-bold text-gray-600">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'} FOUND
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4">{t('noResults')}</h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('newest');
                }}
                className="px-8 py-3 border-4 border-black font-bold text-sm hover:bg-black hover:text-white transition-colors"
              >
                RESET FILTERS
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.titleKey}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  {/* Project Image Placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`${project.isMockup ? 'aspect-[4/3]' : 'aspect-[4/3]'} ${project.color} relative mb-4 border-4 border-black`}
                  >
                    {project.isMockup ? (
                      <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-purple-600">
                        {/* Phone Mockup with Real GIF */}
                        <div className="relative h-full aspect-[9/19.5]">
                          {/* Phone Frame */}
                          <div className="absolute inset-0 bg-black rounded-[1.8rem] shadow-2xl p-2">
                            {/* Screen with GIF */}
                            <div className="w-full h-full bg-black rounded-[1.4rem] overflow-hidden relative">
                              {/* GIF Content */}
                              <img
                                src="/images/hunt-tickets-app.gif"
                                alt="Hunt Tickets App Demo"
                                className="w-full h-full object-cover"
                              />
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
                              ? 'text-black'
                              : 'text-white opacity-20'
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                    )}

                    {/* Year Badge */}
                    {project.year && (
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold">
                        {project.year}
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
                          className="text-white font-bold border-2 border-white px-6 py-3 pointer-events-auto hover:bg-white hover:text-black transition-colors"
                        >
                          {tButtons('viewProject')} →
                        </a>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-start gap-3 flex-wrap">
                      <span className="text-xs font-bold bg-black text-white px-3 py-1">
                        {tLabels(project.categoryKey)}
                      </span>
                      {project.appStore && (
                        <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                          </svg>
                          <span className="font-medium">{tLabels('appStore')}</span>
                        </div>
                      )}
                      {project.rating && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-yellow-500">★</span>
                          <span className="font-bold">{project.rating.stars}</span>
                          <span className="text-gray-400">({project.rating.reviews}+ {tLabels('reviews')})</span>
                        </div>
                      )}
                      {project.downloads && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          <span className="font-medium">{project.downloads.toLocaleString()}+ {tLabels('downloads')}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-sans">
                      {project.titleKey}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {tProjects(`${project.descriptionKey}.description`)}
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
                          className="text-xs border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer"
                          onClick={() => setSearchQuery(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-nostalgic">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Let's create something amazing together
            </p>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-brand text-white border-4 border-white font-bold text-sm hover:bg-white hover:text-black transition-colors"
              >
                GET IN TOUCH →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

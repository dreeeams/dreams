'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SplitText } from '@/components/ui/animated-text';
import ProjectCard from '@/components/sections/portfolio/project-card';

type Project = {
  titleKey: string;
  categoryKey: 'webApp' | 'mobileApp';
  descriptionKey: string;
  tags: string[];
  color: string;
  url?: string;
  mobileView?: boolean;
  isMockup?: boolean;
  isIcon?: boolean;
  rating?: {
    stars: number;
    reviews: number;
  };
  appStore?: boolean;
  downloads?: number;
  ticketsSold?: number;
  metrics?: {
    visitors?: string;
    visits?: string;
    bounceRate?: string;
  };
};

const projects: Project[] = [
  {
    titleKey: 'HUNT TICKETS',
    categoryKey: 'mobileApp',
    descriptionKey: 'huntTickets',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    color: 'bg-white',
    isMockup: true,
    rating: { stars: 4.3, reviews: 250 },
    appStore: true,
    downloads: 5000,
    ticketsSold: 30000,
  },
  {
    titleKey: 'PERRO NEGRO',
    categoryKey: 'webApp',
    descriptionKey: 'perroNegro',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black',
    url: 'perronegro.biotickets.com',
    metrics: {
      visitors: 'visitors',
      visits: 'visits',
    },
  },
  {
    titleKey: 'AMAZONAS TOURES',
    categoryKey: 'webApp',
    descriptionKey: 'amazonasToures',
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    color: 'bg-white',
    url: 'www.amazonas-toures.com',
  },
  {
    titleKey: 'MARÍA HELENA AMADOR',
    categoryKey: 'webApp',
    descriptionKey: 'mariaHelena',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'bg-black',
    url: 'maria-helena-amador.hunt-tickets.com',
    mobileView: true,
  },
  {
    titleKey: 'HUNT RHO',
    categoryKey: 'webApp',
    descriptionKey: 'huntRho',
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    color: 'bg-brand',
    url: 'hunt-rho.vercel.app',
  },
  {
    titleKey: 'KUENTA',
    categoryKey: 'webApp',
    descriptionKey: 'kuenta',
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    url: 'paga-dreamstudio.vercel.app',
  },
];

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const tButtons = useTranslations('portfolio.buttons');
  const tLabels = useTranslations('portfolio.labels');
  const tProjects = useTranslations('portfolio.projects');

  return (
    <section id="work" className="relative z-10 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic text-center" style={{ letterSpacing: '-0.04em' }}>
              {t('title')}
            </h2>
          </div>
          <p className="text-center text-sm max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects
            .filter((project) => {
              // Only show Hunt Rho and Kuenta in development
              if (process.env.NODE_ENV === 'production') {
                return project.titleKey !== 'HUNT RHO' && project.titleKey !== 'KUENTA';
              }
              return true;
            })
            .map((project, index) => (
              <ProjectCard
                key={project.titleKey}
                project={project}
                index={index}
                tButtons={tButtons}
                tLabels={tLabels}
                tProjects={tProjects}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { LazyIframe } from '@/components/ui/lazy-iframe';

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

interface ProjectCardProps {
  project: Project;
  index: number;
  tButtons: (key: string) => string;
  tLabels: (key: string) => string;
  tProjects: (key: string) => string;
}

export default function ProjectCard({ project, index, tButtons, tLabels, tProjects }: ProjectCardProps) {
  return (
    <m.div
      key={project.titleKey}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
    >
      {/* Project Image Placeholder */}
      <m.div
        className={`aspect-[4/3] ${project.color} relative mb-4 border-2 border-black overflow-hidden`}
      >
        {project.isMockup ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <Image
              src="https://eeyjhkhrdoouapuilwep.supabase.co/storage/v1/object/public/content/hunt_mockup.png"
              alt="Hunt Tickets App Mockup"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : project.url ? (
          <LazyIframe
            src={`https://${project.url}`}
            title={project.titleKey}
            className="absolute inset-0 w-full h-full pointer-events-none border-0"
            mobileView={project.mobileView}
            delay={index * 300}
          />
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

        {/* Hover Overlay */}
        {!project.isMockup && !project.isIcon && (
          <m.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center"
          >
            <a
              href={project.url ? `https://${project.url}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (project.url) {
                  window.open(`https://${project.url}`, '_blank');
                }
              }}
              className="text-white font-bold border-2 border-white px-8 py-4 pointer-events-auto hover:bg-white hover:text-black transition-colors"
            >
              {tButtons('viewProject')} →
            </a>
          </m.div>
        )}
      </m.div>

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
              <span className="font-medium">{project.downloads >= 1000 ? `${(project.downloads / 1000).toFixed(0)}K` : project.downloads}+ {tLabels('downloads')}</span>
            </div>
          )}
          {project.ticketsSold && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span className="font-medium">{project.ticketsSold >= 1000 ? `${(project.ticketsSold / 1000).toFixed(0)}K` : project.ticketsSold}+ {tLabels('ticketsSold')}</span>
            </div>
          )}
          {project.metrics?.visitors && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">{tProjects(`${project.descriptionKey}.metrics.${project.metrics.visitors}`)} {tProjects(`${project.descriptionKey}.metrics.${project.metrics.visitors}Label`).toLowerCase()}</span>
            </div>
          )}
          {project.metrics?.visits && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium">{tProjects(`${project.descriptionKey}.metrics.${project.metrics.visits}`)} {tProjects(`${project.descriptionKey}.metrics.${project.metrics.visits}Label`).toLowerCase()}</span>
            </div>
          )}
          {project.metrics?.bounceRate && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-medium">{tProjects(`${project.descriptionKey}.metrics.${project.metrics.bounceRate}`)} {tProjects(`${project.descriptionKey}.metrics.${project.metrics.bounceRate}Label`).toLowerCase()}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-nostalgic">
          {project.titleKey}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {tProjects(`${project.descriptionKey}.description`)}
        </p>

        {/* URL if available */}
        {project.url && !project.isMockup && !project.isIcon && (
          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
          >
            {project.url} →
          </a>
        )}
      </div>
    </m.div>
  );
}

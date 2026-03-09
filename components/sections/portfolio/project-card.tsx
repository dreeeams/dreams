'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { LazyIframe } from '@/components/ui/lazy-iframe';
import { MetricBadge } from '@/components/ui/metric-badge';
import { AppStoreIcon, DownloadIcon, TicketIcon, UsersIcon, EyeIcon, ChartIcon } from '@/components/ui/icons';
import { formatLargeNumber } from '@/lib/format';
import { CDN_URL } from '@/lib/constants';
import { fadeInUpView } from '@/lib/motion-presets';
import type { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
  tButtons: (key: string) => string;
  tLabels: (key: string) => string;
  tProjects: (key: string) => string;
}

export default function ProjectCard({ project, index, tButtons, tLabels, tProjects }: ProjectCardProps) {
  const isPriority = index < 2;

  const CardContent = (
    <m.div
      key={project.titleKey}
      {...fadeInUpView}
      className="group cursor-pointer"
    >
      <m.div
        className={`aspect-[4/3] ${project.color} relative mb-4 border-2 border-black overflow-hidden`}
      >
        {project.isMockup ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-white group-hover:opacity-0 transition-opacity duration-300">
              <Image
                src={project.mockupUrl || `${CDN_URL}/storage/v1/object/public/content/hunt_mockup.png`}
                alt={`${project.titleKey} Mockup`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                loading={isPriority ? "eager" : "lazy"}
                priority={isPriority}
                quality={80}
              />
            </div>
            {project.url && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <LazyIframe
                  src={`https://${project.url}`}
                  title={project.titleKey}
                  className="absolute inset-0 w-full h-full pointer-events-none border-0"
                  mobileView={project.mobileView}
                  delay={index * 300}
                />
              </div>
            )}
          </>
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
              className="text-white font-bold border-2 border-white px-8 py-4 pointer-events-auto hover:bg-white hover:text-black transition-colors"
            >
              {tButtons('viewProject')} →
            </a>
          </m.div>
        )}
      </m.div>

      <div className="space-y-3">
        <div className="flex items-center justify-start gap-3 flex-wrap">
          <span className="text-xs font-bold bg-black text-white px-3 py-1">
            {tLabels(project.categoryKey)}
          </span>

          {project.appStore && (
            <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
              <AppStoreIcon />
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
            <MetricBadge
              icon={<DownloadIcon />}
              label={`${formatLargeNumber(project.downloads)}+ ${tLabels('downloads')}`}
            />
          )}

          {project.ticketsSold && (
            <MetricBadge
              icon={<TicketIcon />}
              label={`${formatLargeNumber(project.ticketsSold)}+ ${tLabels('ticketsSold')}`}
            />
          )}

          {project.metrics?.visitors && (
            <MetricBadge
              icon={<UsersIcon />}
              label={`${tProjects(`${project.descriptionKey}.metrics.${project.metrics.visitors}`)} ${tProjects(`${project.descriptionKey}.metrics.${project.metrics.visitors}Label`).toLowerCase()}`}
            />
          )}

          {project.metrics?.visits && (
            <MetricBadge
              icon={<EyeIcon />}
              label={`${tProjects(`${project.descriptionKey}.metrics.${project.metrics.visits}`)} ${tProjects(`${project.descriptionKey}.metrics.${project.metrics.visits}Label`).toLowerCase()}`}
            />
          )}

          {project.metrics?.bounceRate && (
            <MetricBadge
              icon={<ChartIcon />}
              label={`${tProjects(`${project.descriptionKey}.metrics.${project.metrics.bounceRate}`)} ${tProjects(`${project.descriptionKey}.metrics.${project.metrics.bounceRate}Label`).toLowerCase()}`}
            />
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-nostalgic">
          {project.titleKey}
        </h3>
      </div>
    </m.div>
  );

  if (project.caseStudyUrl) {
    return (
      <Link href={project.caseStudyUrl}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

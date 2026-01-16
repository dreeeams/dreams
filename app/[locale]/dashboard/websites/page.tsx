'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Website = {
  id: string;
  name: string;
  url: string;
  client: string;
  status: 'live' | 'development' | 'maintenance';
  lastUpdated: string;
  thumbnail: string;
  tech: string[];
};

const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'E-commerce Store',
    url: 'https://example-store.com',
    client: 'Fashion Co.',
    status: 'live',
    lastUpdated: '2024-01-10',
    thumbnail: '🛍️',
    tech: ['Next.js', 'Stripe', 'Tailwind'],
  },
  {
    id: '2',
    name: 'SaaS Platform',
    url: 'https://saas-platform.io',
    client: 'TechStart Inc.',
    status: 'development',
    lastUpdated: '2024-01-15',
    thumbnail: '💼',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '3',
    name: 'Portfolio Website',
    url: 'https://creative-portfolio.com',
    client: 'John Designer',
    status: 'live',
    lastUpdated: '2023-12-20',
    thumbnail: '🎨',
    tech: ['Next.js', 'Framer Motion'],
  },
  {
    id: '4',
    name: 'Restaurant Menu',
    url: 'https://delicious-bites.com',
    client: 'Bistro Deluxe',
    status: 'live',
    lastUpdated: '2024-01-05',
    thumbnail: '🍽️',
    tech: ['React', 'Supabase'],
  },
  {
    id: '5',
    name: 'Booking Platform',
    url: 'https://bookings.io',
    client: 'Travel Agency',
    status: 'development',
    lastUpdated: '2024-01-12',
    thumbnail: '✈️',
    tech: ['Next.js', 'Stripe', 'Calendar API'],
  },
  {
    id: '6',
    name: 'Corporate Website',
    url: 'https://corporate-site.com',
    client: 'BigCorp Ltd.',
    status: 'maintenance',
    lastUpdated: '2023-11-30',
    thumbnail: '🏢',
    tech: ['WordPress', 'PHP'],
  },
  {
    id: '7',
    name: 'Real Estate Portal',
    url: 'https://dream-homes.com',
    client: 'Realty Solutions',
    status: 'live',
    lastUpdated: '2024-01-08',
    thumbnail: '🏠',
    tech: ['Next.js', 'Mapbox', 'Supabase'],
  },
  {
    id: '8',
    name: 'Fitness App',
    url: 'https://fitness-tracker.app',
    client: 'FitLife Gym',
    status: 'development',
    lastUpdated: '2024-01-14',
    thumbnail: '💪',
    tech: ['React Native', 'Firebase'],
  },
  {
    id: '9',
    name: 'Blog Platform',
    url: 'https://tech-blog.io',
    client: 'Content Creators',
    status: 'live',
    lastUpdated: '2024-01-03',
    thumbnail: '📝',
    tech: ['Next.js', 'MDX', 'Vercel'],
  },
  {
    id: '10',
    name: 'Event Management',
    url: 'https://event-manager.com',
    client: 'Events Pro',
    status: 'live',
    lastUpdated: '2023-12-28',
    thumbnail: '🎉',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '11',
    name: 'Education Portal',
    url: 'https://learn-online.edu',
    client: 'EduTech',
    status: 'maintenance',
    lastUpdated: '2024-01-06',
    thumbnail: '📚',
    tech: ['Next.js', 'Video API', 'Stripe'],
  },
  {
    id: '12',
    name: 'Healthcare Dashboard',
    url: 'https://health-dashboard.com',
    client: 'MediCare Clinic',
    status: 'development',
    lastUpdated: '2024-01-16',
    thumbnail: '🏥',
    tech: ['React', 'Chart.js', 'FHIR API'],
  },
];

export default function WebsitesPage() {
  const [filter, setFilter] = useState<'all' | 'live' | 'development' | 'maintenance'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWebsites = mockWebsites.filter((website) => {
    const matchesFilter = filter === 'all' || website.status === filter;
    const matchesSearch =
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Website['status']) => {
    switch (status) {
      case 'live':
        return 'bg-green-500';
      case 'development':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-orange-500';
    }
  };

  const getStatusLabel = (status: Website['status']) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'development':
        return 'In Development';
      case 'maintenance':
        return 'Maintenance';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-nostalgic mb-2">WEBSITES</h1>
          <p className="text-gray-600">Manage all your client websites</p>
        </div>
        <button className="px-6 py-3 bg-brand text-white border-4 border-black font-bold hover:bg-black transition-colors">
          + NEW WEBSITE
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites or clients..."
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {(['all', 'live', 'development', 'maintenance'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-3 border-2 border-black font-medium transition-colors ${
                  filter === status
                    ? 'bg-brand text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebsites.map((website, index) => (
          <motion.div
            key={website.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-surface-light-1 border-b-4 border-black flex items-center justify-center">
              <span className="text-6xl">{website.thumbnail}</span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(website.status)}`}></span>
                <span className="text-xs font-bold uppercase">{getStatusLabel(website.status)}</span>
              </div>

              {/* Name & Client */}
              <div>
                <h3 className="text-xl font-bold mb-1">{website.name}</h3>
                <p className="text-sm text-gray-600">{website.client}</p>
              </div>

              {/* URL */}
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:underline break-all"
              >
                {website.url}
              </a>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {website.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-surface-light-1 border border-black text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Last Updated */}
              <p className="text-xs text-gray-500">
                Last updated: {new Date(website.lastUpdated).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-4 py-2 bg-brand text-white border-2 border-black font-medium text-sm hover:bg-black transition-colors">
                  Edit
                </button>
                <button className="px-4 py-2 border-2 border-black font-medium text-sm hover:bg-gray-100 transition-colors">
                  ⚙️
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWebsites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No websites found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}

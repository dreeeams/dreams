'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Websites', value: '12', icon: '🌐' },
    { label: 'Active Clients', value: '8', icon: '👥' },
    { label: 'Projects in Progress', value: '3', icon: '⚙️' },
    { label: 'Completed This Month', value: '5', icon: '✅' },
  ];

  const recentActivity = [
    { action: 'Website deployed', project: 'E-commerce Store', time: '2 hours ago' },
    { action: 'New client added', project: 'Tech Startup', time: '5 hours ago' },
    { action: 'Design approved', project: 'Portfolio Site', time: '1 day ago' },
    { action: 'Meeting scheduled', project: 'SaaS Platform', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-nostalgic mb-2">DASHBOARD</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/websites"
              className="block p-4 border-2 border-black hover:bg-brand hover:text-white transition-colors font-medium"
            >
              📁 View All Websites
            </Link>
            <button className="w-full text-left p-4 border-2 border-black hover:bg-brand hover:text-white transition-colors font-medium">
              ➕ Add New Client
            </button>
            <button className="w-full text-left p-4 border-2 border-black hover:bg-brand hover:text-white transition-colors font-medium">
              📊 Generate Report
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="border-l-4 border-brand pl-4 py-2"
              >
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.project}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

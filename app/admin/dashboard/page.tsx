'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Clients',
      value: '42',
      change: '+12%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Projects',
      value: '18',
      change: '+8%',
      icon: Briefcase,
      trend: 'up',
    },
    {
      title: 'Revenue (Monthly)',
      value: '$125,400',
      change: '+23%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+5%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  const recentProjects = [
    { id: 1, name: 'E-commerce Platform', client: 'TechCorp', status: 'In Progress', priority: 'High' },
    { id: 2, name: 'Mobile App Redesign', client: 'StartupXYZ', status: 'In Progress', priority: 'Medium' },
    { id: 3, name: 'CMS Migration', client: 'MediaCo', status: 'Planning', priority: 'Low' },
    { id: 4, name: 'AI Integration', client: 'InnovateLabs', status: 'In Progress', priority: 'High' },
  ];

  const supportTickets = [
    { id: 1, title: 'Performance issue on homepage', client: 'TechCorp', urgency: 'Critical', status: 'Open' },
    { id: 2, title: 'Bug in checkout flow', client: 'ShopNow', urgency: 'High', status: 'In Progress' },
    { id: 3, title: 'Feature request: Dark mode', client: 'StartupXYZ', urgency: 'Low', status: 'Open' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your agency overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Active projects in your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={project.priority === 'High' ? 'destructive' : project.priority === 'Medium' ? 'default' : 'secondary'}
                    >
                      {project.priority}
                    </Badge>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Recent support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start justify-between pb-3 border-b last:border-0">
                  <div className="flex items-start gap-3">
                    {ticket.urgency === 'Critical' ? (
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    ) : ticket.status === 'In Progress' ? (
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground">{ticket.client}</p>
                    </div>
                  </div>
                  <Badge
                    variant={ticket.urgency === 'Critical' ? 'destructive' : ticket.urgency === 'High' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {ticket.urgency}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

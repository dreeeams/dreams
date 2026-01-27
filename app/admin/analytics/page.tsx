'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, DollarSign, Briefcase, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 88000 },
    { month: 'Apr', revenue: 95000 },
    { month: 'May', revenue: 110000 },
    { month: 'Jun', revenue: 125000 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  const topClients = [
    { name: 'InnovateLabs', revenue: 67000, projects: 4, growth: 23 },
    { name: 'TechCorp Inc.', revenue: 45000, projects: 3, growth: 15 },
    { name: 'StartupXYZ', revenue: 32000, projects: 2, growth: 8 },
    { name: 'ShopNow LLC', revenue: 28500, projects: 2, growth: 12 },
    { name: 'MediaCo', revenue: 18000, projects: 1, growth: -5 },
  ];

  const serviceMetrics = [
    { service: 'Web Development', projects: 12, revenue: 85000, percentage: 45 },
    { service: 'Mobile Development', projects: 6, revenue: 48000, percentage: 25 },
    { service: 'AI Integration', projects: 4, revenue: 32000, percentage: 17 },
    { service: 'Consulting', projects: 5, revenue: 25500, percentage: 13 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights and metrics for your agency</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$595,000</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +3% on-time delivery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.2 from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.map((data) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">${(data.revenue / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
            <CardDescription>Highest revenue generating clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.projects} projects</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">${(client.revenue / 1000).toFixed(1)}k</div>
                    <div className={`text-xs flex items-center gap-1 justify-end ${
                      client.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {client.growth >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(client.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Service Revenue Breakdown</CardTitle>
          <CardDescription>Revenue distribution by service type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {serviceMetrics.map((service) => (
              <div key={service.service} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{service.service}</div>
                    <div className="text-xs text-muted-foreground">{service.projects} projects</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${(service.revenue / 1000).toFixed(1)}k</div>
                    <div className="text-xs text-muted-foreground">{service.percentage}%</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

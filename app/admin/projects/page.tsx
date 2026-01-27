'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Calendar, DollarSign } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      status: 'In Progress',
      priority: 'High',
      progress: 65,
      budget: '$45,000',
      startDate: '2025-01-15',
      deadline: '2025-03-30',
      team: ['Designer', 'Frontend Dev', 'Backend Dev'],
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      client: 'StartupXYZ',
      status: 'In Progress',
      priority: 'Medium',
      progress: 40,
      budget: '$32,000',
      startDate: '2025-01-20',
      deadline: '2025-04-15',
      team: ['UI Designer', 'Mobile Dev'],
    },
    {
      id: 3,
      name: 'CMS Migration',
      client: 'MediaCo',
      status: 'Planning',
      priority: 'Low',
      progress: 10,
      budget: '$18,000',
      startDate: '2025-02-01',
      deadline: '2025-05-01',
      team: ['Backend Dev', 'DevOps'],
    },
    {
      id: 4,
      name: 'AI Integration',
      client: 'InnovateLabs',
      status: 'In Progress',
      priority: 'High',
      progress: 75,
      budget: '$67,000',
      startDate: '2024-12-01',
      deadline: '2025-02-28',
      team: ['AI Engineer', 'Backend Dev', 'Frontend Dev'],
    },
    {
      id: 5,
      name: 'Payment System Update',
      client: 'ShopNow LLC',
      status: 'Testing',
      priority: 'High',
      progress: 90,
      budget: '$28,500',
      startDate: '2024-12-15',
      deadline: '2025-02-10',
      team: ['Backend Dev', 'QA'],
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage all your agency projects</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">5 active this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">67% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$190,500</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Overview of all active and planned projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-muted-foreground">{project.team.join(', ')}</div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge variant={
                      project.status === 'In Progress' ? 'default' :
                      project.status === 'Testing' ? 'secondary' :
                      'outline'
                    }>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      project.priority === 'High' ? 'destructive' :
                      project.priority === 'Medium' ? 'default' :
                      'secondary'
                    }>
                      {project.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <DollarSign className="h-3 w-3" />
                      {project.budget}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

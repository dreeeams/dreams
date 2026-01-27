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
import { Plus, Mail, Phone, Building } from 'lucide-react';

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      contact: 'John Doe',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      projects: 3,
      status: 'Active',
      revenue: '$45,000',
    },
    {
      id: 2,
      name: 'StartupXYZ',
      contact: 'Jane Smith',
      email: 'jane@startupxyz.com',
      phone: '+1 (555) 234-5678',
      projects: 2,
      status: 'Active',
      revenue: '$32,000',
    },
    {
      id: 3,
      name: 'MediaCo',
      contact: 'Bob Johnson',
      email: 'bob@mediaco.com',
      phone: '+1 (555) 345-6789',
      projects: 1,
      status: 'Planning',
      revenue: '$18,000',
    },
    {
      id: 4,
      name: 'InnovateLabs',
      contact: 'Alice Williams',
      email: 'alice@innovatelabs.com',
      phone: '+1 (555) 456-7890',
      projects: 4,
      status: 'Active',
      revenue: '$67,000',
    },
    {
      id: 5,
      name: 'ShopNow LLC',
      contact: 'Charlie Brown',
      email: 'charlie@shopnow.com',
      phone: '+1 (555) 567-8901',
      projects: 2,
      status: 'Active',
      revenue: '$28,500',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your client relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$190,500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Project Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,583</div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>A list of all clients and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{client.contact}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{client.projects} projects</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.status === 'Active' ? 'default' : 'outline'}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{client.revenue}</TableCell>
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

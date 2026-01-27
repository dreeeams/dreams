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
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function SupportPage() {
  const tickets = [
    {
      id: 'TICK-001',
      title: 'Performance issue on homepage',
      client: 'TechCorp Inc.',
      urgency: 'Critical',
      status: 'Open',
      assignee: 'John Dev',
      created: '2025-01-27 10:30',
      website: 'https://techcorp.com',
    },
    {
      id: 'TICK-002',
      title: 'Bug in checkout flow',
      client: 'ShopNow LLC',
      urgency: 'High',
      status: 'In Progress',
      assignee: 'Jane Developer',
      created: '2025-01-27 09:15',
      website: 'https://shopnow.com',
    },
    {
      id: 'TICK-003',
      title: 'CSS styling issues on mobile',
      client: 'StartupXYZ',
      urgency: 'Medium',
      status: 'Open',
      assignee: 'Bob Designer',
      created: '2025-01-26 16:45',
      website: 'https://startupxyz.com',
    },
    {
      id: 'TICK-004',
      title: 'Email notifications not working',
      client: 'MediaCo',
      urgency: 'High',
      status: 'In Progress',
      assignee: 'Alice Backend',
      created: '2025-01-26 14:20',
      website: 'https://mediaco.com',
    },
    {
      id: 'TICK-005',
      title: 'Feature request: Dark mode',
      client: 'InnovateLabs',
      urgency: 'Low',
      status: 'Open',
      assignee: 'Unassigned',
      created: '2025-01-25 11:00',
      website: 'https://innovatelabs.com',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage client support requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <p className="text-xs text-muted-foreground">Being resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-green-600">-15% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Support Tickets</CardTitle>
          <CardDescription>Overview of all client support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div className="font-mono text-sm font-medium">{ticket.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      {ticket.urgency === 'Critical' ? (
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      ) : ticket.status === 'In Progress' ? (
                        <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{ticket.title}</div>
                        <div className="text-xs text-muted-foreground">{ticket.website}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.client}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.urgency === 'Critical' ? 'destructive' :
                        ticket.urgency === 'High' ? 'default' :
                        ticket.urgency === 'Medium' ? 'secondary' :
                        'outline'
                      }
                    >
                      {ticket.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === 'In Progress' ? 'default' : 'outline'
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{ticket.assignee}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground">{ticket.created}</div>
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

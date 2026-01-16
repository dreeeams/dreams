'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if running on localhost
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
    setIsLocalhost(isLocal);

    // Check authentication
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');

    setIsLoading(false);

    // Redirect if not authenticated or not localhost
    if (!isLocal || auth !== 'true') {
      router.push(isLocal ? '/login' : '/');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLocalhost || !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-surface-light-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

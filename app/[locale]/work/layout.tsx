import { ReactNode } from 'react';
import Navigation from '@/components/navigation';

export default function WorkLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />
      {children}
    </div>
  );
}

import { ReactNode } from 'react';
import Navbar from '@/components/navigation/navbar';

export default function WorkLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        {children}
      </div>
    </>
  );
}

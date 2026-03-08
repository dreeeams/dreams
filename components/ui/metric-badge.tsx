import { type ReactNode } from 'react';

interface MetricBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

export function MetricBadge({ icon, label, className = "text-gray-600" }: MetricBadgeProps) {
  return (
    <div className={`flex items-center gap-1 text-xs ${className}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

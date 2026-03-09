/**
 * Optimized icon exports for tree-shaking
 *
 * This barrel export imports only the icons we actually use in the application,
 * allowing better tree-shaking and reducing the final bundle size.
 *
 * Instead of importing from 'lucide-react' directly, import from '@/lib/icons'
 *
 * @example
 * // Before:
 * import { Mail, Phone } from 'lucide-react';
 *
 * // After:
 * import { Mail, Phone } from '@/lib/icons';
 */

// Navigation & UI
export { Menu } from 'lucide-react';
export { X } from 'lucide-react';
export { ArrowLeft } from 'lucide-react';
export { ArrowRight } from 'lucide-react';
export { Plus } from 'lucide-react';
export { ChevronRight } from 'lucide-react';

// Communication
export { Mail } from 'lucide-react';
export { Phone } from 'lucide-react';

// Business & Analytics
export { Users } from 'lucide-react';
export { Briefcase } from 'lucide-react';
export { TrendingUp } from 'lucide-react';
export { TrendingDown } from 'lucide-react';
export { DollarSign } from 'lucide-react';
export { Target } from 'lucide-react';
export { Building } from 'lucide-react';
export { Building2 } from 'lucide-react';

// Status & Feedback
export { AlertCircle } from 'lucide-react';
export { CheckCircle } from 'lucide-react';
export { Check } from 'lucide-react';
export { Circle } from 'lucide-react';
export { Clock } from 'lucide-react';

// Tech & Development
export { Code2 } from 'lucide-react';
export { Server } from 'lucide-react';
export { Database } from 'lucide-react';
export { Shield } from 'lucide-react';
export { Cpu } from 'lucide-react';
export { Brain } from 'lucide-react';
export { Bot } from 'lucide-react';
export { Workflow } from 'lucide-react';

// Design
export { Palette } from 'lucide-react';
export { Zap } from 'lucide-react';

// Security
export { Lock } from 'lucide-react';

// Actions
export { Copy } from 'lucide-react';
export { Download } from 'lucide-react';
export { Trash2 } from 'lucide-react';
export { Settings } from 'lucide-react';
export { Calendar } from 'lucide-react';

// Location & Payment
export { MapPin } from 'lucide-react';
export { CreditCard } from 'lucide-react';

// Types
export type { LucideIcon } from 'lucide-react';

# Bundle Optimization Guide

## Current Setup

The project uses Turbopack (Next.js 16) which doesn't support traditional bundle analyzer.
Use `next experimental-analyze` for Turbopack analysis.

## Icon Optimization

### Problem
Importing icons from `lucide-react` can bloat the bundle if not tree-shaken properly.

### Solution
Create barrel exports for only the icons we use:

```typescript
// lib/icons/index.ts (optimized barrel export)
export { Lock } from 'lucide-react';
export { Smartphone } from 'lucide-react';
export { X } from 'lucide-react';
export { Menu } from 'lucide-react';
// ... only icons actually used
```

Then import from our barrel:
```typescript
import { Lock, Smartphone } from '@/lib/icons';
```

## Framer Motion Optimization

### Problem
Framer Motion is a large library (~60kb gzipped).

### Current Strategy
- Using `m` import (lightweight version)
- Only importing needed animation features
- Already optimized in motion-presets.ts

## Dependencies Audit

### Large Dependencies (>20kb)
- `framer-motion`: 60kb - Essential for animations
- `@radix-ui/*`: ~40kb - Essential for UI primitives
- `html2canvas`: 38kb - Lazy loaded ✓
- `jspdf`: 30kb - Lazy loaded ✓
- `react-phone-number-input`: 25kb - Only used in contact form

### Optimization Opportunities
1. ✅ Lazy load heavy components (BentoGrid)
2. ✅ Dynamic imports for admin routes
3. ✅ Code splitting by route
4. ⏳ Icon tree-shaking
5. ⏳ Remove unused Radix components

## Bundle Size Targets

### Current (estimated)
- First Load JS: ~120-150kb
- Shared chunks: ~80kb

### Target
- First Load JS: <100kb
- Shared chunks: <70kb

## Measuring Bundle Size

```bash
# With Turbopack (Next.js 16)
npm run build
# Check .next/static/ folder sizes

# For detailed analysis
npx next experimental-analyze

# Alternative: Build with webpack
npm run build -- --webpack
npm run build:analyze -- --webpack
```

## Performance Monitoring

Track these metrics in production:
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.8s
- Total Blocking Time (TBT): <200ms
- Cumulative Layout Shift (CLS): <0.1

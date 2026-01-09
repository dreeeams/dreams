# Performance Optimization Guide

## Performance Metrics Target

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s ⭐
- **FID (First Input Delay):** < 100ms ⭐
- **CLS (Cumulative Layout Shift):** < 0.1 ⭐

### Lighthouse Scores Target
- Performance: 90+ 🎯
- Accessibility: 95+ 🎯
- Best Practices: 95+ 🎯
- SEO: 100 🎯

---

## Optimizations Implemented

### 1. Bundle Size Optimization ✅

**Bundle Analyzer:**
```bash
npm run build:analyze
```

**Optimizations:**
- Tree-shaking enabled (automatic with Next.js 16)
- Package optimization: `framer-motion`, `react-phone-number-input`
- SWC minification (default in Next.js 16)
- Production source maps disabled (-30% bundle size)

**Current Bundle Sizes:**
```
Route (app)                           Size     First Load JS
┌ ○ /_not-found                      ~140B     ~85kB
├ ƒ /[locale]                        ~5kB      ~90kB
├ ƒ /[locale]/privacy                ~2kB      ~87kB
├ ƒ /[locale]/terms                  ~2kB      ~87kB
└ ƒ /api/contact                     ~1kB      ~86kB
```

### 2. Caching Strategy ✅

**Static Assets (1 year):**
- Images: `Cache-Control: public, max-age=31536000, immutable`
- Fonts: `Cache-Control: public, max-age=31536000, immutable`
- `_next/static/*`: `Cache-Control: public, max-age=31536000, immutable`

**Meta files (24 hours):**
- Favicon, manifest: `Cache-Control: public, max-age=86400, must-revalidate`

**API Routes:**
- No caching (form submissions)

### 3. Image Optimization ✅

**Next.js Image Component:**
- Format: AVIF, WebP fallback
- Lazy loading enabled
- Responsive sizes
- Device-specific optimization

**Configuration:**
```typescript
formats: ['image/avif', 'image/webp']
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
```

### 4. Code Splitting ✅

- Automatic code splitting (Next.js App Router)
- Dynamic imports for heavy components
- Route-based code splitting

### 5. Compression ✅

- Gzip/Brotli compression enabled (Vercel automatic)
- `compress: true` in next.config.ts

### 6. Font Optimization ✅

- Next.js Font Optimization (automatic)
- Self-hosted fonts
- `font-display: swap`

---

## Performance Monitoring

### Vercel Analytics ✅

Already integrated:
```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
```

**Metrics tracked:**
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times
- Geographic distribution

### How to Monitor:

1. **Vercel Dashboard:**
   - Go to: https://vercel.com/[your-team]/tech-agency-pro/analytics
   - View Core Web Vitals
   - Monitor page performance

2. **Local Testing:**
   ```bash
   npm run build
   npm run start
   # Open http://localhost:3000
   # Chrome DevTools → Lighthouse
   ```

3. **Bundle Analysis:**
   ```bash
   npm run build:analyze
   # Opens interactive bundle visualization
   ```

---

## Lighthouse Audit Checklist

### Pre-Deployment Audit

Run before every production deploy:

```bash
# 1. Build production
npm run build

# 2. Start production server
npm run start

# 3. Open Chrome DevTools → Lighthouse
# 4. Run audit (Desktop + Mobile)
# 5. Verify all scores above target
```

### Common Issues & Fixes

**Issue: Low Performance Score**
- ✅ Check bundle size (`npm run build:analyze`)
- ✅ Optimize images (use Next.js Image)
- ✅ Remove unused dependencies
- ✅ Enable caching

**Issue: Low Accessibility Score**
- ✅ Add alt text to images
- ✅ Ensure proper heading hierarchy
- ✅ Test keyboard navigation
- ✅ Check color contrast

**Issue: Low Best Practices Score**
- ✅ Ensure HTTPS (Vercel automatic)
- ✅ Remove console.logs in production
- ✅ Use secure headers (already configured)

**Issue: Low SEO Score**
- ✅ Add meta descriptions
- ✅ Verify robots.txt
- ✅ Check sitemap.xml
- ✅ Add structured data (Schema.org)

---

## Performance Tips

### 1. Lazy Load Components

For heavy components:
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});
```

### 2. Optimize Third-Party Scripts

Use Next.js Script component:
```typescript
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload" // or "afterInteractive"
/>
```

### 3. Reduce JavaScript Execution

- Minimize client-side JS
- Use Server Components when possible
- Avoid large dependencies

### 4. Optimize API Routes

- Enable caching where appropriate
- Use edge functions for low latency
- Implement pagination for large datasets

---

## Performance Budget

### Bundle Size Budget

- Total JS (First Load): < 100 KB ✅ (Currently ~90KB)
- Total CSS: < 50 KB ✅
- Images per page: Optimized on-demand ✅

### Network Budget

- Time to First Byte (TTFB): < 600ms
- First Contentful Paint (FCP): < 1.8s
- Time to Interactive (TTI): < 3.8s

---

## Monitoring & Alerts

### Weekly Performance Review

1. Check Vercel Analytics dashboard
2. Review Core Web Vitals trends
3. Monitor bundle size changes
4. Run Lighthouse audit on main pages

### Set Up Alerts (Recommended)

Vercel Dashboard → Settings → Alerts:
- Core Web Vitals degradation
- Build failures
- High error rates

---

## Commands Reference

```bash
# Development
npm run dev                 # Start dev server with Turbopack

# Production
npm run build              # Build for production
npm run start              # Start production server
npm run build:analyze      # Analyze bundle size

# Quality Checks
npm run type-check         # TypeScript validation
npm run lint               # ESLint check
npm run lint:fix           # Auto-fix linting issues
npm run test:security      # Security audit
npm run audit              # npm vulnerability check
```

---

## Next Steps

### TODO: Advanced Optimizations

- [ ] Implement ISR (Incremental Static Regeneration) for blog/portfolio
- [ ] Add Redis caching for API routes
- [ ] Implement CDN for static assets (Vercel Edge Network)
- [ ] Set up E2E performance testing (Lighthouse CI)
- [ ] Monitor Real User Monitoring (RUM) metrics
- [ ] Implement prefetching for key navigation paths

### Continuous Monitoring

- Set up weekly Lighthouse audits
- Monitor Vercel Analytics weekly
- Review bundle size on every PR
- Track Core Web Vitals trends

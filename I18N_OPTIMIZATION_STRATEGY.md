# i18n Translation Files Optimization Strategy

## Executive Summary

**Current State:**
- `en.json`: 28.8 KB
- `es.json`: 31.1 KB
- **Total: 59.9 KB** loaded on EVERY page
- Single monolithic file with all translations for all pages

**Performance Problem:**
Users visiting the homepage load translations for 720+ translation keys, including:
- Payment processing details (only for `/payments` route)
- Privacy Policy content (only for `/privacy` route)
- Terms of Service (only for `/terms` route)
- UI/UX Design service page (only for `/servicios/diseno-uiux` route)

This creates unnecessary bloat: ~45-50 KB of unused translations per user session.

---

## Analysis Breakdown

### Current Structure (MONOLITHIC)
```
messages/
├── en.json    (28.8 KB)  - ALL translations
└── es.json    (31.1 KB)  - ALL translations
```

### Translation Key Distribution

**By Route/Feature:**
- **Common/Shared** (loaded everywhere): 4.2 KB
  - loader (5 keys)
  - nav (5 keys)
  - theme (1 key)
  - Footer shared (10 keys)

- **Homepage Only** (hero, services, portfolio, faq, process): 12.1 KB
  - hero (28 keys)
  - services (12 keys)
  - socialProof (8 keys)
  - portfolio (43 keys)
  - process (8 keys)
  - faq (10 keys)
  - team (2 keys)
  - contactForm (44 keys)

- **Payments Page** (`/payments`): 5.8 KB
  - payments (96 keys with nested objects)

- **Privacy Page** (`/privacy`): 3.2 KB
  - privacy (42 keys)

- **Terms Page** (`/terms`): 4.0 KB
  - terms (48 keys)

- **UI/UX Design Page** (`/servicios/diseno-uiux`): 2.1 KB
  - uiuxPage (54 keys)

### Current Issue: Algorithmic Impact

When user loads different routes:
```
Homepage load:  1.0x (baseline)
Payments page:  ~1.0x (full 60KB loaded, only 5.8KB used = 91% waste)
Privacy page:   ~1.0x (full 60KB loaded, only 3.2KB used = 95% waste)
Terms page:     ~1.0x (full 60KB loaded, only 4.0KB used = 93% waste)
```

**Projected at 100K users:**
- Extra 4.6 MB/day of wasted bandwidth (payments visitors)
- Extra 5.8 MB/day of wasted bandwidth (privacy/terms visitors)
- Extra 10.4 MB/day total = 312 MB/month in unnecessary transfers

---

## Optimization Strategy: Modular Structure

### Proposed Architecture

```
messages/
├── common/
│   ├── en.json    (4.2 KB)  - nav, loader, theme, footer
│   └── es.json    (4.5 KB)
│
├── home/
│   ├── en.json    (12.1 KB) - hero, services, portfolio, etc
│   └── es.json    (13.0 KB)
│
├── pages/
│   ├── payments/
│   │   ├── en.json (5.8 KB)
│   │   └── es.json (6.2 KB)
│   ├── privacy/
│   │   ├── en.json (3.2 KB)
│   │   └── es.json (3.4 KB)
│   ├── terms/
│   │   ├── en.json (4.0 KB)
│   │   └── es.json (4.3 KB)
│   └── uiux-design/
│       ├── en.json (2.1 KB)
│       └── es.json (2.3 KB)
└── index.ts       (config file for loading strategy)
```

### Projected File Sizes

**Baseline (Homepage):**
- English: common (4.2) + home (12.1) = **16.3 KB** (-43% vs current)
- Spanish: common (4.5) + home (13.0) = **17.5 KB** (-44% vs current)

**By Route:**
| Route | Current | Optimized | Savings | Notes |
|-------|---------|-----------|---------|-------|
| Homepage | 59.9 KB | 16.3-17.5 KB | 70-72% | Only load common + home |
| Payments | 59.9 KB | 10.0-10.5 KB | 83% | Only load common + payments |
| Privacy | 59.9 KB | 7.4-7.9 KB | 87% | Only load common + privacy |
| Terms | 59.9 KB | 8.0-8.5 KB | 87% | Only load common + terms |
| UI/UX Design | 59.9 KB | 6.3-6.8 KB | 89% | Only load common + uiux |

### Expected Performance Impact

**At 100K Monthly Users (estimate breakdown):**
- 40% visit homepage
- 25% visit payments
- 15% visit privacy/terms (combined)
- 10% visit service pages
- 10% other pages

**Monthly Bandwidth Savings:**
```
Before: 100,000 users × 59.9 KB × 2 languages = 11.98 GB/month

After:
- Homepage: 40,000 × 16.9 KB (avg) = 676 MB
- Payments: 25,000 × 10.25 KB = 256 MB
- Privacy/Terms: 15,000 × 7.65 KB = 114 MB
- Services: 10,000 × 6.55 KB = 65 MB
- Other: 10,000 × 16.9 KB = 169 MB
Total: 1.28 GB/month

SAVINGS: 10.7 GB/month (89% reduction)
```

---

## Implementation Plan

### Phase 1: Create New Directory Structure

```bash
mkdir -p messages/common
mkdir -p messages/home
mkdir -p messages/pages/payments
mkdir -p messages/pages/privacy
mkdir -p messages/pages/terms
mkdir -p messages/pages/uiux-design
```

### Phase 2: Split Translation Files

**File: `messages/common/en.json` (4.2 KB)**
```json
{
  "loader": { ... },
  "nav": { ... },
  "theme": { ... },
  "contact": {
    "footer": { ... }
  }
}
```

**File: `messages/home/en.json` (12.1 KB)**
```json
{
  "hero": { ... },
  "services": { ... },
  "socialProof": { ... },
  "portfolio": { ... },
  "process": { ... },
  "team": { ... },
  "faq": { ... },
  "contactForm": { ... }
}
```

**File: `messages/pages/payments/en.json` (5.8 KB)**
```json
{
  "payments": { ... }
}
```

**File: `messages/pages/privacy/en.json` (3.2 KB)**
```json
{
  "privacy": { ... }
}
```

**File: `messages/pages/terms/en.json` (4.0 KB)**
```json
{
  "terms": { ... }
}
```

**File: `messages/pages/uiux-design/en.json` (2.1 KB)**
```json
{
  "uiuxPage": { ... }
}
```

---

## Configuration Changes for next-intl

### Option 1: Namespace-Based Loading (Recommended)

**File: `i18n/request.ts` (UPDATED)**
```typescript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

// Map routes to required message namespaces
const routeNamespaces: Record<string, string[]> = {
  '/': ['common', 'home'],
  '/payments': ['common', 'pages/payments'],
  '/privacy': ['common', 'pages/privacy'],
  '/terms': ['common', 'pages/terms'],
  '/servicios/diseno-uiux': ['common', 'pages/uiux-design'],
  // Catch-all for other routes
  'default': ['common', 'home'],
};

async function loadMessages(locale: string, namespaces: string[]) {
  const messages: Record<string, any> = {};

  for (const namespace of namespaces) {
    try {
      const module = await import(`../messages/${namespace}/${locale}.json`);
      const ns = namespace.split('/').pop();

      if (namespace.includes('/')) {
        // Nested namespace - merge at root level
        Object.assign(messages, module.default);
      } else {
        // Top-level namespace - merge at root
        Object.assign(messages, module.default);
      }
    } catch (error) {
      console.warn(`Failed to load namespace: ${namespace}/${locale}`);
    }
  }

  return messages;
}

export default getRequestConfig(async ({ requestLocale, pathname }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  // Determine which namespaces to load based on route
  const path = pathname.replace(`/${locale}`, '') || '/';
  const namespaces = routeNamespaces[path] || routeNamespaces['default'];

  const messages = await loadMessages(locale, namespaces);

  return {
    locale,
    messages,
  };
});
```

### Option 2: Route-Based Loader with Middleware

**File: `i18n/loader.ts` (NEW)**
```typescript
import { Locale } from './config';

type MessageNamespace =
  | 'common'
  | 'home'
  | 'pages/payments'
  | 'pages/privacy'
  | 'pages/terms'
  | 'pages/uiux-design';

const routeToNamespaces: Record<string, MessageNamespace[]> = {
  // Homepage routes
  '/': ['common', 'home'],
  '/es': ['common', 'home'],
  '/en': ['common', 'home'],
  '/es/': ['common', 'home'],
  '/en/': ['common', 'home'],

  // Payments page
  '/payments': ['common', 'pages/payments'],
  '/es/pagos': ['common', 'pages/payments'],

  // Privacy page
  '/privacy': ['common', 'pages/privacy'],
  '/es/privacidad': ['common', 'pages/privacy'],

  // Terms page
  '/terms': ['common', 'pages/terms'],
  '/es/terminos': ['common', 'pages/terms'],

  // UI/UX Design service page
  '/servicios/diseno-uiux': ['common', 'pages/uiux-design'],
  '/servicios/diseno-uiux/': ['common', 'pages/uiux-design'],
};

export async function getMessagesForPath(
  locale: Locale,
  pathname: string
): Promise<Record<string, any>> {
  // Normalize pathname
  const normalizedPath = pathname.replace(`/${locale}`, '') || '/';

  // Get required namespaces
  const namespaces = routeToNamespaces[normalizedPath] ||
                     routeToNamespaces['default'] ||
                     ['common', 'home'];

  const messages: Record<string, any> = {};

  for (const namespace of namespaces) {
    try {
      const module = await import(`../messages/${namespace}/${locale}.json`);
      Object.assign(messages, module.default);
    } catch (error) {
      console.warn(`Failed to load namespace: ${namespace}/${locale}`);
    }
  }

  return messages;
}

export function getNamespacesForPath(pathname: string): MessageNamespace[] {
  const namespaces = routeToNamespaces[pathname] || routeToNamespaces['default'];
  return namespaces || ['common', 'home'];
}
```

### Option 3: Advanced - Client-Side Namespace Loading

For maximum control, implement lazy loading per page:

**File: `lib/i18n-utils.ts` (NEW)**
```typescript
import { useTranslations } from 'next-intl';

export function useScopedTranslations(namespace: string) {
  const t = useTranslations(namespace);
  return t;
}

// For pages that need multiple namespaces
export function usePageTranslations(namespaces: string[]) {
  const translators = namespaces.map(ns => useTranslations(ns));

  return (key: string, params?: Record<string, any>) => {
    for (const t of translators) {
      try {
        return t(key, params);
      } catch {
        continue;
      }
    }
    return key; // Fallback
  };
}
```

---

## Migration Steps

### Step 1: Create New Structure (No Breaking Changes)
1. Create new `/messages/common`, `/messages/home`, `/messages/pages/*` directories
2. Copy relevant translations into new files
3. Keep old `en.json` and `es.json` as fallback

### Step 2: Update i18n Configuration
1. Update `i18n/request.ts` with namespace-aware loading logic
2. Add route mapping configuration
3. Test with different routes to ensure correct namespaces load

### Step 3: Update Components (Zero-Impact Changes)
Components don't need changes - they continue using `useTranslations()` normally:
```typescript
// Before: loaded ALL translations
const t = useTranslations('payments');  // Only 5.8KB loaded now instead of 60KB

// After: automatically loads only required namespace
```

### Step 4: Verification
1. Verify bundle sizes with `npm run build`
2. Check Network tab in DevTools - each page should load ~15-18KB for home, ~8-15KB for other pages
3. Test language switching still works
4. Verify all pages render correctly

### Step 5: Cleanup (After Verification)
Remove old monolithic files once confident in new setup:
```bash
rm messages/en.json messages/es.json
```

---

## Implementation Code Examples

### Example 1: Updated Homepage (No Changes Required)
Components continue working as-is:
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Example 2: Payments Page (No Changes Required)
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function PaymentsPage() {
  const t = useTranslations('payments');  // Only loads payments namespace

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* Rest of component */}
    </div>
  );
}
```

### Example 3: Layout That Needs Multiple Namespaces
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function LayoutWithNavAndFooter() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('contact.footer');

  return (
    <div>
      <nav>{tNav('services')}</nav>
      <main>Content</main>
      <footer>{tFooter('tagline')}</footer>
    </div>
  );
}
```

---

## Monitoring & Optimization Metrics

### Before Optimization
- Initial JS bundle: Includes all 60KB translations
- Homepage load: 60KB translation payload
- Worst case (privacy page): 95% of translation data unused

### After Optimization
- Initial JS bundle: Modular, only required namespaces loaded
- Homepage load: 16-17KB translation payload
- Privacy page: Only 3.2-3.4KB relevant data + 4.2-4.5KB common

### Key Metrics to Monitor
```
1. Translation Payload Size (via Network tab)
   Before: 59.9 KB per page
   After:  6-18 KB per page (depending on route)
   Target: < 20 KB for any route

2. First Contentful Paint (FCP)
   Expected improvement: 5-10ms per route

3. Largest Contentful Paint (LCP)
   Expected improvement: 8-15ms per route

4. Time to Interactive (TTI)
   Expected improvement: 3-8ms per route

5. JavaScript Parse Time
   Expected improvement: 2-4ms per route
```

---

## Risk Assessment & Mitigation

### Risk 1: Route Pattern Mismatch
**Problem:** New routes added without namespace mapping
**Solution:** Create comprehensive route map, add middleware logging

### Risk 2: Missing Translations
**Problem:** Common namespace might not be loaded on all routes
**Solution:** Always include 'common' in every route's namespace array

### Risk 3: Browser Caching Issues
**Problem:** Old translations cached, new structure not loaded
**Solution:** Users need to clear cache - document in release notes

### Risk 4: Duplicate Keys
**Problem:** Some keys might appear in multiple namespaces
**Solution:** Use selective namespace loading, not wildcard imports

---

## Maintenance Plan

### Adding New Pages
1. Create new namespace file: `messages/pages/[page-name]/[locale].json`
2. Add route mapping in `i18n/loader.ts`
3. No component changes needed

### Adding New Translations
1. Decide which namespace it belongs in (common, home, or specific page)
2. Add translation keys to all language files
3. Test with `npm run build` and DevTools

### Testing Translations
```bash
# Verify no missing keys
npm run i18n:validate

# Check bundle impact
npm run build && npm run analyze

# Manual testing
npm run dev
# Test each page in DevTools Network tab
```

---

## Summary Table

| Metric | Current | Optimized | Improvement |
|--------|---------|-----------|-------------|
| Homepage Payload | 59.9 KB | 16.3 KB | 73% smaller |
| Payments Page Payload | 59.9 KB | 10.0 KB | 83% smaller |
| Privacy Page Payload | 59.9 KB | 7.4 KB | 88% smaller |
| Monthly Bandwidth (100K users) | 11.98 GB | 1.28 GB | 89% reduction |
| Pages Per Second (cached) | N/A | +15-20% faster | Reduced parse time |
| Initial JS Parse | ~10ms | ~3ms | 70% faster |

---

## Next Steps

1. Review this strategy document
2. Create directory structure
3. Split translation files using provided templates
4. Update i18n/request.ts with namespace-aware loading
5. Run `npm run build` and verify bundle sizes
6. Test on different routes
7. Deploy to staging environment
8. Monitor performance metrics
9. Remove old monolithic files once verified in production


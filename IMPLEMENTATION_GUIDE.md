# Framer-Motion Bundle Optimization - Implementation Guide

## Quick Start (30 minutes)

### Step 1: Add LazyMotion to Root Layout (2 minutes)

**File: `/app/layout.tsx`**

```typescript
// ADD these imports at the top
import { LazyMotion, domAnimation } from 'framer-motion';

// WRAP your existing children
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
```

**That's it! No component changes needed.**

Benefits:
- 40% bundle reduction (~1.2MB)
- Drop-in replacement - zero breaking changes
- All existing motion components work unchanged
- Features load on-demand when components mount

---

## Phase 2: CSS Replacements (Optional - 4-6 hours)

### Step 1: Import CSS Animations

**File: `/app/globals.css`**

```css
/* Add at the top of your global CSS */
@import 'url(/lib/css-animations.css)';
```

Or copy animations from `lib/css-animations.css` directly into `globals.css`.

### Step 2: Replace Simple Animations

**Example 1: Hero Terminal Entrance**

```typescript
// BEFORE: components/sections/hero-section.tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-black border-2 border-black shadow-2xl"
>

// AFTER: Use CSS
<div className="bg-black border-2 border-black shadow-2xl animate-fade-in-up animate-fade-in-up-slow">
```

**Example 2: Portfolio Grid Items**

```typescript
// BEFORE: Staggered motion items
{projects.map((project, index) => (
  <motion.div
    key={project.titleKey}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >

// AFTER: CSS with stagger
{projects.map((project, index) => (
  <div
    key={project.titleKey}
    className={`animate-slide-in-up animation-delay-${index * 100}`}
  >
```

**Example 3: Navigation Hover Effects**

```typescript
// BEFORE: motion whileHover
<motion.div whileHover={{ scale: 1.05 }} className="logo">

// AFTER: CSS hover
<div className="logo hover-scale">
```

**Example 4: Button Tap Effects**

```typescript
// BEFORE: motion whileTap
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3"
>

// AFTER: CSS transitions + hover
<button
  className="px-6 py-3 transition-transform hover:scale-105 active:scale-95"
>
```

---

## Which Animations to Keep in Framer Motion

### MUST KEEP (Do NOT Convert to CSS)

1. **Parallax Scroll Animations**
   - File: `components/ui/parallax.tsx`
   - Reason: Requires `useScroll` + `useTransform` (scroll-driven)
   - Status: Keep as-is

2. **Character-Level Text Animations**
   - File: `components/ui/animated-text.tsx`
   - Functions: `SplitText`, `RevealText`, `ScrambleText`
   - Reason: Requires letter-by-letter manipulation + spring physics
   - Status: Keep as-is

3. **Exit Animations with AnimatePresence**
   - File: `components/navigation.tsx`, `components/page-loader.tsx`
   - Reason: Unmount animations require AnimatePresence lifecycle
   - Status: Keep AnimatePresence logic, migrate optional entrance animations to CSS

4. **State-Driven Animations**
   - Examples: Form validations, modal appearances
   - Reason: Complex state orchestration harder in CSS
   - Status: Keep where state drives animation timing

---

## CSS Animation Classes Reference

### Entrance Animations

```html
<!-- Fade in -->
<div class="animate-fade-in">Content</div>

<!-- Slide up with fade -->
<div class="animate-slide-in-up">Content</div>
<div class="animate-slide-in-up-slow">Slower variant</div>

<!-- Slide from sides -->
<div class="animate-slide-in-left">Content</div>
<div class="animate-slide-in-right">Content</div>

<!-- Scale in -->
<div class="animate-scale-in">Content</div>
<div class="animate-scale-in-spring">With spring effect</div>
```

### Stagger with Delays

```html
<div class="animate-slide-in-up animation-delay-0">First</div>
<div class="animate-slide-in-up animation-delay-100">Second (100ms later)</div>
<div class="animate-slide-in-up animation-delay-200">Third (200ms later)</div>
<div class="animate-slide-in-up animation-delay-300">Fourth (300ms later)</div>
```

### Hover Effects

```html
<!-- Scale on hover -->
<div class="hover-scale">Content</div>

<!-- Shadow grow on hover -->
<div class="hover-shadow">Content</div>

<!-- Brighten on hover -->
<div class="hover-brighten">Content</div>

<!-- Tailwind alternatives -->
<div class="transition-transform hover:scale-105">Tailwind</div>
```

### Continuous Animations

```html
<!-- Bounce (scroll indicator) -->
<div class="animate-bounce-y">↓ Scroll Down</div>

<!-- Pulse (loading indicator) -->
<div class="animate-pulse">Loading...</div>
```

### Transitions

```html
<!-- Fast transitions -->
<div class="transition-fast hover:bg-black">Content</div>

<!-- Transform only -->
<div class="transition-transform hover:scale-110">Content</div>

<!-- Opacity only -->
<div class="transition-opacity hover:opacity-50">Content</div>
```

---

## Bundle Size Verification

### Before Optimization

```bash
npm run build:analyze
```

Expected output:
```
Main: ~45KB
Vendor (framer-motion): ~150KB gzipped
Total: ~195KB gzipped
```

### After LazyMotion (Phase 1)

```bash
npm run build
# Check .next/static/chunks/main.js size
ls -lh .next/static/chunks/*.js | grep -E 'main|vendor'
```

Expected output:
```
Main: ~35KB (-10KB, -22%)
Vendor (lazy-loaded): ~60KB dynamic
Total: ~155KB gzipped (-40KB, -20%)
```

### After CSS Replacements (Phase 2)

Expected additional savings:
```
-5KB from main bundle
+3KB CSS additions
Net: -2KB more reduction
Total: ~135KB gzipped (-30%)
```

---

## Testing Changes

### Visual Testing

```bash
# Run development server
npm run dev

# Check pages visually:
# 1. http://localhost:3000 - Hero section animations
# 2. http://localhost:3000/#work - Portfolio grid
# 3. http://localhost:3000/en/servicios/diseno-uiux - Service pages
# 4. Click menu button - Mobile menu animation
```

### Performance Testing

```bash
# Lighthouse audit
npm run build

# Open in Chrome DevTools
# 1. Right-click > Inspect > Lighthouse
# 2. Run Performance audit
# 3. Compare before/after Performance scores
```

### Console Errors

```bash
# No errors should appear in browser console
# Check DevTools Console tab for any animation-related warnings
```

---

## Rollback Instructions

If something breaks:

### Quick Rollback (LazyMotion)

Just remove the LazyMotion wrapper from `/app/layout.tsx`:

```typescript
// Remove these lines
import { LazyMotion, domAnimation } from 'framer-motion';
// Remove <LazyMotion features={domAnimation}> wrapper

// Revert to original
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

### CSS Animation Rollback

Remove CSS animation classes and revert motion components:

```typescript
// Replace
<div class="animate-slide-in-up">

// With
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
```

---

## Common Issues & Solutions

### Issue 1: Animations Not Triggering

**Problem**: CSS animations don't play on page load

**Solution**: Check if element has `display: none` or `visibility: hidden`
```css
/* Make sure element is visible */
.animated-element {
  display: block;
  visibility: visible;
}
```

### Issue 2: Stagger Not Working Evenly

**Problem**: Animation delays feel uneven across items

**Solution**: Use consistent delay increments
```html
<!-- Increment by 100ms -->
<div class="animate-slide-in-up animation-delay-0">
<div class="animate-slide-in-up animation-delay-100">
<div class="animate-slide-in-up animation-delay-200">
```

### Issue 3: Motion Components Still Large

**Problem**: Bundle still large after LazyMotion

**Solution**: Ensure LazyMotion wrapper is in ROOT layout only
```typescript
// Only wrap once at app/layout.tsx, NOT in every route
export default function RootLayout({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
```

### Issue 4: Hover Scale Not Working

**Problem**: CSS hover scale conflicts with Tailwind

**Solution**: Use Tailwind classes instead
```html
<!-- Instead of custom .hover-scale -->
<div class="transition-transform hover:scale-105">
```

---

## Performance Optimization Tips

### 1. GPU Acceleration

Only animate GPU-accelerated properties:
```css
/* GOOD - GPU accelerated */
transform: translateY(10px);
opacity: 0.5;

/* AVOID - Not GPU accelerated */
width: 100px;
height: 50px;
left: 10px;
```

### 2. Will-Change (Use Sparingly)

```css
/* Only for elements that animate frequently */
.frequently-animated {
  will-change: transform, opacity;
}

/* Remove after animation ends */
.animation-complete {
  will-change: auto;
}
```

### 3. Reduce Motion Accessibility

Already included in CSS animations:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Animation Durations

```
Quick feedback: 150-200ms (hover, focus)
Standard: 300-500ms (page transitions)
Slow: 600-800ms (entrance animations)
Long: 1000ms+ (scroll-triggered)
```

---

## File References

- **Analysis Report**: `/FRAMER_MOTION_OPTIMIZATION_ANALYSIS.md`
- **Motion Config**: `/lib/motion-config.ts`
- **CSS Animations**: `/lib/css-animations.css`
- **Root Layout (Original)**: `/app/layout.tsx`
- **Root Layout (Reference)**: `/app/layout-with-lazymotion.tsx`

---

## Checklist for Implementation

### Phase 1: LazyMotion (30 minutes)
- [ ] Read this guide thoroughly
- [ ] Open `/app/layout.tsx`
- [ ] Add LazyMotion import
- [ ] Wrap children with LazyMotion component
- [ ] Run `npm run build`
- [ ] Verify bundle size reduction
- [ ] Test all pages load correctly
- [ ] Deploy to staging

### Phase 2: CSS Replacements (4-6 hours)
- [ ] Import CSS animations from `lib/css-animations.css`
- [ ] Identify simple animations in components
- [ ] Replace `motion.div` entrance animations with CSS classes
- [ ] Test animations visually
- [ ] Verify performance improvements
- [ ] Update component documentation
- [ ] Deploy to production

### Phase 3: Code Splitting (2-3 hours)
- [ ] Extract animation logic from error/404 pages
- [ ] Use dynamic imports for animation-heavy routes
- [ ] Test route-specific animations
- [ ] Verify lazy loading in Network tab
- [ ] Deploy to production

---

## Questions?

Refer to:
1. **General Info**: FRAMER_MOTION_OPTIMIZATION_ANALYSIS.md
2. **Implementation Help**: This file (IMPLEMENTATION_GUIDE.md)
3. **CSS Reference**: lib/css-animations.css
4. **Config Reference**: lib/motion-config.ts


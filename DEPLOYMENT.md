# 🚀 Production Deployment Checklist

## Pre-Deployment Checks

### ✅ Security (CRITICAL)
- [ ] Run security check: `npm run test:security`
- [ ] Verify environment variables in Vercel
- [ ] Check API keys are not in code
- [ ] Confirm HTTPS enforcement
- [ ] Review SECURITY.md

### ✅ Performance
- [ ] Run production build: `npm run build`
- [ ] Check bundle size: `npm run build:analyze`
- [ ] Run Lighthouse audit (Desktop + Mobile)
- [ ] Verify Core Web Vitals targets
- [ ] Review PERFORMANCE.md

### ✅ Code Quality
- [ ] TypeScript check: `npm run type-check`
- [ ] ESLint: `npm run lint`
- [ ] No console.logs in production code
- [ ] Remove debug code

### ✅ Testing
- [ ] Test contact form submission
- [ ] Verify Twenty CRM integration
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Safari, Firefox)
- [ ] Verify i18n (English + Spanish)

### ✅ SEO
- [ ] Meta tags on all pages
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] OpenGraph images
- [ ] Favicon and manifest

### ✅ Content
- [ ] All text translated (EN + ES)
- [ ] All images optimized
- [ ] Legal pages (Privacy, Terms)
- [ ] Contact information updated

---

## Deployment Steps

### 1. Final Code Review

```bash
# Run all quality checks
npm run type-check
npm run lint
npm run test:security
npm run audit
npm run build
```

### 2. Commit & Push

```bash
git status
git add .
git commit -m "chore: production release v1.0.0"
git push origin main
```

### 3. Vercel Configuration

**Environment Variables:**
```
NEXT_PUBLIC_SITE_URL=https://dreeeams.com
TWENTY_API_KEY=[your-api-key]
TWENTY_API_URL=https://twenty-production-25cf.up.railway.app
```

**Build Settings:**
- Framework Preset: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Deploy

- Push to `main` branch (auto-deploy)
- OR: Manual deploy via Vercel Dashboard

### 5. Post-Deployment Verification

```bash
# Wait for deployment to complete
# Then verify:
```

- [ ] Visit https://dreeeams.com
- [ ] Test contact form submission
- [ ] Check Twenty CRM for new contact
- [ ] Verify analytics are tracking
- [ ] Test on mobile
- [ ] Run Lighthouse on live site

---

## Monitoring Setup

### Vercel Analytics

1. Go to: https://vercel.com/[team]/tech-agency-pro/analytics
2. Enable Web Analytics
3. Enable Speed Insights
4. Set up alerts:
   - Core Web Vitals degradation
   - Build failures
   - High error rates

### Weekly Checks

- [ ] Monday: Check Vercel Analytics dashboard
- [ ] Wednesday: Review Core Web Vitals
- [ ] Friday: Check for npm security advisories

---

## Rollback Plan

If deployment fails:

```bash
# Option 1: Revert via Vercel Dashboard
# 1. Go to Deployments
# 2. Find last working deployment
# 3. Click "Promote to Production"

# Option 2: Git revert
git revert HEAD
git push origin main
```

---

## Domain Configuration

### DNS Settings (Vercel)

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

- Automatically provisioned by Vercel
- Auto-renewal enabled
- HTTPS enforced via middleware

---

## API Key Rotation Schedule

**Next Rotation Due:** 2026-04-08 (90 days)

See SECURITY.md for rotation procedure.

---

## Emergency Contacts

- **Technical Issues:** info@dreeeams.com
- **Twenty CRM:** https://twenty-production-25cf.up.railway.app
- **Vercel Support:** https://vercel.com/support

---

## Post-Launch Tasks

### Week 1
- [ ] Monitor error rates daily
- [ ] Check form submissions are working
- [ ] Review Core Web Vitals
- [ ] Fix any user-reported issues

### Week 2
- [ ] Run full Lighthouse audit
- [ ] Review bundle size
- [ ] Check for security updates
- [ ] Update documentation if needed

### Month 1
- [ ] Review analytics data
- [ ] Optimize based on user behavior
- [ ] Plan feature updates
- [ ] Update dependencies

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-08 | Initial production release |

---

## Success Criteria

### Technical
- ✅ Lighthouse Performance: 90+
- ✅ Core Web Vitals: All green
- ✅ Zero security vulnerabilities
- ✅ Build time: < 2 minutes
- ✅ Page load: < 2 seconds

### Business
- ✅ Contact form working
- ✅ CRM integration active
- ✅ Analytics tracking
- ✅ Mobile-responsive
- ✅ Bilingual (EN/ES)

---

## Documentation

- **Security:** See SECURITY.md
- **Performance:** See PERFORMANCE.md
- **Development:** See README.md
- **Environment:** See .env.example

---

## Commands Quick Reference

```bash
# Development
npm run dev

# Quality Checks
npm run type-check
npm run lint
npm run test:security
npm run audit

# Build & Deploy
npm run build
npm run build:analyze
npm run start

# Maintenance
npm update
npm audit fix
```

---

## 🎉 Ready for Production!

Once all checkboxes are ticked, you're ready to deploy to production.

**Final verification:**
```bash
npm run test:security && npm run type-check && npm run build
```

If all pass: **DEPLOY! 🚀**

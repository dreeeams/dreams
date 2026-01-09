# Security Documentation

## API Key Management

### Twenty CRM API Key Rotation

**IMPORTANT:** Rotate API keys every 90 days or immediately if compromised.

#### Steps to Rotate Twenty CRM API Key:

1. **Generate New Key in Twenty CRM:**
   - Go to https://twenty-production-25cf.up.railway.app/settings/developers
   - Click "Create New API Key"
   - Name it: `Production API Key - [Date]`
   - Copy the generated token

2. **Update Environment Variables:**

   **Local Development:**
   ```bash
   # Update .env.local
   TWENTY_API_KEY=your_new_api_key_here
   ```

   **Vercel Production:**
   ```bash
   # Via Vercel Dashboard:
   # 1. Go to Project Settings → Environment Variables
   # 2. Edit TWENTY_API_KEY
   # 3. Add new value
   # 4. Select: Production, Preview, Development
   # 5. Save

   # Or via Vercel CLI:
   vercel env rm TWENTY_API_KEY production
   vercel env add TWENTY_API_KEY production
   ```

3. **Test New Key:**
   ```bash
   # Test locally first
   npm run dev
   # Submit test form at http://localhost:3000

   # Check Twenty CRM for new contact
   ```

4. **Deploy to Production:**
   ```bash
   git commit -m "Update API key rotation date"
   git push origin main
   # Vercel will auto-deploy
   ```

5. **Revoke Old Key:**
   - Wait 24 hours to ensure no issues
   - Go back to Twenty CRM Settings
   - Delete old API key

6. **Document Rotation:**
   - Update LAST_ROTATION_DATE in this file
   - Add entry to rotation log below

### API Key Rotation Log

| Date | Rotated By | Reason | Notes |
|------|-----------|--------|-------|
| 2026-01-08 | Initial Setup | Initial deployment | First production key |

**LAST_ROTATION_DATE:** 2026-01-08
**NEXT_ROTATION_DUE:** 2026-04-08 (90 days)

---

## Environment Variables

### Required Variables

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dreeeams.com

# Twenty CRM Integration
TWENTY_API_KEY=<your-api-key>
TWENTY_API_URL=https://twenty-production-25cf.up.railway.app
```

### Optional Variables (Future)

```bash
# Email Notifications (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Monitoring (Optional)
SENTRY_DSN=<your-sentry-dsn>
```

---

## Security Best Practices

### 1. Never Commit Secrets
- ✅ `.env.local` is in `.gitignore`
- ✅ Use `.env.example` for templates
- ❌ Never commit actual API keys

### 2. Use Environment-Specific Keys
- Development: Different API key
- Production: Separate API key
- Never use production keys in development

### 3. Monitor API Usage
- Check Twenty CRM logs weekly
- Alert on unusual spikes
- Rate limiting: 3 requests/minute (current)

### 4. Incident Response

**If API Key is Compromised:**

1. **IMMEDIATE:** Revoke key in Twenty CRM (< 5 min)
2. Generate new key
3. Update Vercel environment variables
4. Redeploy application
5. Monitor logs for suspicious activity
6. Document incident in rotation log

---

## Security Headers

Already configured in `next.config.ts`:

- ✅ **HSTS:** Strict-Transport-Security
- ✅ **CSP:** Content-Security-Policy
- ✅ **X-Frame-Options:** SAMEORIGIN
- ✅ **X-Content-Type-Options:** nosniff
- ✅ **Referrer-Policy:** origin-when-cross-origin
- ✅ **Permissions-Policy:** Restrict camera/microphone

---

## Rate Limiting

Current implementation in `/app/api/contact/route.ts`:
- 3 requests per minute per IP
- In-memory store (resets on deploy)
- TODO: Consider Redis for persistent rate limiting

---

## Reporting Security Issues

**DO NOT** open public GitHub issues for security vulnerabilities.

Contact: info@dreeeams.com

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Response time: < 24 hours

# Image Optimization Guide

## 🎯 Current Issue
Your site has a **15MB GIF** (`public/images/hunt-tickets-app.gif`) that is causing:
- **PageSpeed Mobile Score: 55/100** ❌
- **PageSpeed Desktop Score: 31/100** ❌
- **Total Page Size: 38.28MB** (93% from images)

## ✅ Solution: Convert GIF to Optimized Video

The code is already prepared to use video files, but the video files are missing. You need to create them.

### Step 1: Install FFmpeg (if not already installed)

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### Step 2: Convert GIF to Optimized Video Formats

Run these commands in your project directory:

```bash
cd public/images

# Convert to WebM (best compression, ~90% smaller)
ffmpeg -i hunt-tickets-app.gif -c:v libvpx-vp9 -b:v 0 -crf 30 -an hunt-tickets-app.webm

# Convert to MP4 (better compatibility)
ffmpeg -i hunt-tickets-app.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -b:v 1M -an hunt-tickets-app.mp4

# Create poster image (first frame for loading)
ffmpeg -i hunt-tickets-app.gif -vframes 1 hunt-tickets-poster.jpg
```

### Step 3: Expected Results

**Before:**
- GIF: 15MB

**After:**
- WebM: ~500KB - 1MB (97% reduction!)
- MP4: ~800KB - 1.5MB (90% reduction!)
- Poster: ~50KB

**Total savings: ~14MB** 🎉

### Step 4: Verify Files Exist

After conversion, verify you have these files:
```bash
ls -lh public/images/hunt-tickets-app.*
```

You should see:
- ✅ hunt-tickets-app.webm
- ✅ hunt-tickets-app.mp4
- ✅ hunt-tickets-poster.jpg
- ⚠️ hunt-tickets-app.gif (keep as fallback for very old browsers)

### Step 5: Test

The video will now load instead of the GIF automatically. The code at `components/sections/portfolio-section.tsx:144-160` already handles this.

## 📊 Expected Performance Improvements

### PageSpeed Scores (Estimated)
- **Mobile**: 55 → 85+ 🚀
- **Desktop**: 31 → 90+ 🚀

### Load Times
- **Before**: 11.4s (Scripts Complete)
- **After**: ~3-4s expected

### Page Size
- **Before**: 38.28MB
- **After**: ~3-5MB

## 🔧 Additional Optimizations (Already Implemented)

### ✅ Next.js Image Optimization
- Configured in `next.config.ts`
- AVIF and WebP format support
- Responsive image sizes
- Lazy loading enabled

### ✅ SEO Improvements
- Added H1 tag to hero section (with sr-only class)
- Optimized Title tags (50-60 characters)
- Optimized Meta Descriptions (120-160 characters)
- Keywords now include "dream studio" for better consistency

### ✅ Security Headers
- Content Security Policy
- HSTS enabled
- X-Frame-Options
- X-Content-Type-Options

### ✅ Caching Strategy
- Static assets: 1 year cache
- Images: Immutable cache headers
- Next.js static files: Optimized caching

## 📝 Next Steps

1. **Convert the GIF** (run the FFmpeg commands above)
2. **Test locally** (`npm run dev`)
3. **Commit changes**
4. **Deploy to production**
5. **Re-test PageSpeed** (wait 24h for Google to re-crawl)

## 🎨 Alternative: Use Cloud Image CDN

For even better performance, consider using a cloud image CDN:
- **Cloudinary** (free tier available)
- **Imgix**
- **Vercel Image Optimization** (automatic with Vercel deployment)

These services automatically optimize and resize images on-the-fly.

## ⚠️ Important Notes

- Keep the GIF as fallback for browsers that don't support `<video>` tag
- The poster image prevents layout shift during video load
- WebM has better compression but MP4 has better compatibility
- Browser will automatically choose best format based on support

## 🔍 Testing Commands

```bash
# Check file sizes
du -sh public/images/*

# Test video playback locally
open public/images/hunt-tickets-app.webm  # macOS
xdg-open public/images/hunt-tickets-app.webm  # Linux

# Run PageSpeed test after deployment
# Mobile: https://pagespeed.web.dev/?url=https://dreeeams.com&form_factor=mobile
# Desktop: https://pagespeed.web.dev/?url=https://dreeeams.com&form_factor=desktop
```

## 📚 Resources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [WebP Image Format](https://developers.google.com/speed/webp)
- [Video Optimization Guide](https://web.dev/replace-gifs-with-videos/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

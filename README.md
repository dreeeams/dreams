# Tech Agency Pro

Modern, production-ready tech agency website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Framer Motion** for animations
- ✅ **next-themes** for robust dark/light mode (no hydration issues)
- ✅ **next-intl** for internationalization (English/Spanish)
- ✅ **Production-ready** configuration
- ✅ **No bugs** - proper hydration, no flashing, smooth theme transitions

## 🚀 Getting Started

### Install dependencies:

```bash
npm install
```

### Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for production:

```bash
npm run build
npm start
```

## 🌍 Internationalization

The app supports English and Spanish. URLs are automatically localized:

- English: `/` or `/en`
- Spanish: `/es`

### Adding translations:

Edit `messages/en.json` and `messages/es.json` files.

## 🎨 Theme Switching

Dark/light mode is handled by `next-themes` which:

- Prevents hydration mismatches
- Respects system preferences
- Persists user choice
- No flash of wrong theme

## 📁 Project Structure

```
tech-agency-pro/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── navigation.tsx     # Nav with theme/language toggles
│   ├── providers/
│   │   └── theme-provider.tsx
│   └── sections/
│       ├── hero-section.tsx
│       └── services-section.tsx
├── i18n/
│   ├── config.ts          # i18n configuration
│   └── request.ts         # Request configuration
├── messages/
│   ├── en.json            # English translations
│   └── es.json            # Spanish translations
├── public/
│   └── fonts/             # Custom fonts
└── middleware.ts          # i18n middleware
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Theme**: next-themes
- **i18n**: next-intl
- **Fonts**: Geist Sans, Geist Mono, Perfectly Nostalgic

## 🎯 Improvements over previous version

1. **Proper theme management** - Uses `next-themes` instead of custom buggy solution
2. **Internationalization** - Built-in Spanish/English support
3. **Better architecture** - Separated concerns, modular components
4. **Type safety** - Full TypeScript coverage
5. **Production optimizations** - Image optimization, font loading, compression
6. **No hydration issues** - Proper SSR/CSR handling
7. **Clean code** - Following Next.js best practices

## 📝 License

MIT

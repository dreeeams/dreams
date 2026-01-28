import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

function isLocalhost(request: NextRequest): boolean {
  const hostname = request.headers.get('host') || '';
  return hostname.startsWith('localhost') ||
         hostname.startsWith('127.0.0.1') ||
         hostname.startsWith('[::1]');
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes - localhost only
  if (pathname.startsWith('/admin')) {
    if (!isLocalhost(request)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect contact-form route - localhost only
  if (pathname.includes('/contact-form')) {
    if (!isLocalhost(request)) {
      const locale = pathname.split('/')[1];
      return NextResponse.redirect(new URL(`/${locale}/contact`, request.url));
    }
  }

  // HTTPS Enforcement in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Security headers are already set in next.config.ts
  // Continue with i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};

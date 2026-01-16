'use client';

// Apply console filters immediately, before component mount
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  const originalWarn = console.warn;

  // List of known warnings/errors to suppress
  const suppressPatterns = [
    /markdownToSafeHTML.*should not be imported on the client side/i,
    /DEPRECATED.*Use `createWithEqualityFn`/i,
    /react-i18next.*You will need to pass in an i18next instance/i,
    /iframe doesn't exist.*createIframe.*must be called before/i,
    /Cannot read properties of undefined.*reading 'style'/i,
    /POST.*vitals\.vercel-insights\.com.*400/i,
    /GET.*api\.pirsch\.io.*400/i,
  ];

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (!suppressPatterns.some(pattern => pattern.test(message))) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (!suppressPatterns.some(pattern => pattern.test(message))) {
      originalWarn.apply(console, args);
    }
  };
}

export default function ConsoleFilter() {
  return null;
}

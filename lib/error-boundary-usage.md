# Error Boundary Usage Guide

## Overview

Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application.

## Available Components

### 1. `ErrorBoundary` (Full Page)

Use for wrapping entire pages or critical top-level components.

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

export default function Page() {
  return (
    <ErrorBoundary section="Dashboard">
      <Dashboard />
    </ErrorBoundary>
  );
}
```

**Features:**
- Full-page error UI
- Detailed error logging
- Custom error handlers
- Development error details

### 2. `SectionErrorBoundary` (Section Level)

Use for wrapping individual sections within a page.

```tsx
import { SectionErrorBoundary } from '@/components/section-error-boundary';

export default function HomePage() {
  return (
    <div>
      <SectionErrorBoundary section="Hero">
        <HeroSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary section="Services">
        <ServicesSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary section="Contact Form">
        <ContactSection />
      </SectionErrorBoundary>
    </div>
  );
}
```

**Features:**
- Compact error UI
- Doesn't break the whole page
- Section-specific error context
- Automatic logging

## When to Use Error Boundaries

### Critical Sections (Recommended)

1. **Forms** - Contact forms, quote forms, any user input
2. **Dynamic Content** - API-driven components, real-time data
3. **Third-party Integrations** - Payment processors, analytics, chat widgets
4. **Complex UI** - Charts, graphs, interactive visualizations
5. **Admin Pages** - Dashboard, analytics, settings

### Example: Contact Form

```tsx
// components/sections/contact-section.tsx
import { SectionErrorBoundary } from '@/components/section-error-boundary';
import { ContactForm } from '@/components/contact-form';

export function ContactSection() {
  return (
    <section id="contact">
      <SectionErrorBoundary section="Contact Form">
        <ContactForm />
      </SectionErrorBoundary>
    </section>
  );
}
```

### Example: Admin Dashboard

```tsx
// app/admin/dashboard/page.tsx
import { ErrorBoundary } from '@/components/error-boundary';
import { Dashboard } from '@/components/admin/dashboard';

export default function DashboardPage() {
  return (
    <ErrorBoundary
      section="Admin Dashboard"
      onError={(error, errorInfo) => {
        // Send to error tracking service
        console.error('Dashboard error:', error);
      }}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}
```

## Custom Error Handlers

You can provide a custom error handler to perform additional actions when errors occur:

```tsx
<ErrorBoundary
  section="Payment"
  onError={(error, errorInfo) => {
    // Track error in analytics
    analytics.track('error', {
      section: 'Payment',
      error: error.message,
    });

    // Send to error tracking service
    // Sentry.captureException(error);
  }}
>
  <PaymentForm />
</ErrorBoundary>
```

## Custom Fallback UI

Provide a custom fallback UI for specific sections:

```tsx
const customFallback = (
  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
    <p>Unable to load payment form. Please contact support.</p>
  </div>
);

<ErrorBoundary fallback={customFallback}>
  <PaymentForm />
</ErrorBoundary>
```

## Error Logging

All errors are automatically logged using the `logger` utility:

- **Development**: Logged to console with full stack traces
- **Production**: Logged with sanitized information (ready for external services)

Logs include:
- Error message
- Stack trace
- Component stack
- Section context

## Best Practices

1. **Wrap at appropriate levels** - Don't wrap everything, just critical sections
2. **Provide context** - Always set the `section` prop for better logging
3. **Test error boundaries** - Throw errors in development to verify behavior
4. **Monitor in production** - Integrate with error tracking services (Sentry, etc.)
5. **User-friendly messages** - Keep fallback UI simple and actionable

## Testing Error Boundaries

### Test Component

```tsx
// components/test-error.tsx
'use client';

export function TestError() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Test error boundary!');
  }

  return (
    <button onClick={() => setShouldError(true)}>
      Trigger Error
    </button>
  );
}
```

### Usage

```tsx
<SectionErrorBoundary section="Test">
  <TestError />
</SectionErrorBoundary>
```

## Limitations

Error Boundaries **do not** catch errors in:

- Event handlers (use try-catch instead)
- Asynchronous code (setTimeout, promises)
- Server-side rendering
- Errors thrown in the error boundary itself

For these cases, use traditional error handling:

```tsx
// Event handler error
const handleClick = async () => {
  try {
    await submitForm();
  } catch (error) {
    logger.error('Form submission failed:', error);
    setError('Please try again');
  }
};
```

## Migration Guide

To add error boundaries to existing code:

1. Identify critical sections
2. Import appropriate boundary component
3. Wrap the section
4. Test in development
5. Monitor in production

```tsx
// Before
<ContactSection />

// After
<SectionErrorBoundary section="Contact Form">
  <ContactSection />
</SectionErrorBoundary>
```

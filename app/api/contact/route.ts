import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { validateCSRF } from '@/lib/csrf';
import { validateContactForm, ContactFormData } from '@/lib/validation';
import { sanitizeContactData, capitalizeText } from '@/lib/sanitizer';

// Map form codes to full text
function mapIndustry(industryCode: string): string {
  const industryMap: Record<string, string> = {
    tech: 'Technology / Software',
    ecommerce: 'E-commerce / Retail',
    finance: 'Finance / Fintech',
    health: 'Healthcare / Wellness',
    education: 'Education / E-learning',
    realEstate: 'Real Estate',
    food: 'Food & Beverage',
    entertainment: 'Entertainment / Media',
    services: 'Professional Services',
    other: 'Other',
  };
  return industryMap[industryCode] || capitalizeText(industryCode);
}

function mapHeardFrom(heardFromCode: string): string {
  const heardFromMap: Record<string, string> = {
    google: 'Google Search',
    social: 'Social Media',
    referral: 'Referral / Recommendation',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    event: 'Event / Conference',
    other: 'Other',
  };
  return heardFromMap[heardFromCode] || capitalizeText(heardFromCode);
}

function mapCompanySize(sizeCode: string): string {
  const sizeMap: Record<string, string> = {
    solo: 'Solo / Freelancer',
    small: '2-10 Employees',
    medium: '11-50 Employees',
    large: '51-200 Employees',
    enterprise: '201+ Employees',
  };
  return sizeMap[sizeCode] || capitalizeText(sizeCode);
}

export async function POST(request: NextRequest) {
  try {
    // 0. Localhost-only check - Reject requests from non-localhost in production
    const hostname = request.headers.get('host') || '';
    const isLocalhost = hostname.startsWith('localhost') ||
                        hostname.startsWith('127.0.0.1') ||
                        hostname.startsWith('[::1]');

    if (!isLocalhost) {
      logger.warn('Contact API accessed from non-localhost', { hostname });
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      );
    }

    // 1. CSRF Protection - Validate request origin
    const csrfValidation = validateCSRF(request.headers);
    if (!csrfValidation.valid) {
      logger.warn('CSRF validation failed', {
        error: csrfValidation.error,
        origin: request.headers.get('origin'),
      });
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // 2. Rate Limiting - Check if IP has exceeded limits
    const clientIP = getClientIP(request.headers);
    const rateLimitResult = await checkRateLimit(clientIP);

    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', { ip: clientIP });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parse and validate request body with Zod
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // 4. Validate with comprehensive schema
    let validatedData: ContactFormData;
    try {
      validatedData = validateContactForm(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error as z.ZodError<unknown>;
        logger.warn('Validation failed', { errors: zodError.issues, ip: clientIP });
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: zodError.issues.map((err: z.ZodIssue) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 5. Honeypot check - if filled, it's a bot
    if (validatedData.website) {
      logger.warn('Bot detected via honeypot', { ip: clientIP });
      // Return fake success to fool bots
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your message. We will get back to you soon!',
        },
        { status: 200 }
      );
    }

    // 6. Sanitize all inputs
    const sanitized = sanitizeContactData(validatedData as Record<string, unknown>);

    // 7. Prepare contact data
    const contactData = {
      fullName: sanitized.fullName as string,
      email: sanitized.email as string,
      whatsapp: (sanitized.whatsapp as string) || null,
      linkedin: (sanitized.linkedin as string) || null,
      role: (sanitized.role as string) || null,
      company: sanitized.company as string,
      websiteUrl: (sanitized.websiteUrl as string) || null,
      instagram: (sanitized.instagram as string) || null,
      companySize: sanitized.companySize ? mapCompanySize(String(sanitized.companySize)) : null,
      industry: sanitized.industry ? mapIndustry(String(sanitized.industry)) : null,
      need: Array.isArray(sanitized.need)
        ? (sanitized.need as string[]).map((n) => capitalizeText(n)).join(', ')
        : capitalizeText(String(sanitized.need)),
      summary: (sanitized.summary as string) || null,
      heardFrom: sanitized.heardFrom ? mapHeardFrom(String(sanitized.heardFrom)) : null,
      acceptTerms: Boolean(sanitized.acceptTerms),
      submittedAt: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent'),
    };

    // 8. Send emails using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@updates.dreeeams.com';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@dreeeams.com';

    if (resendApiKey) {
      try {
        logger.log('📧 Starting email sending process');

        const { Resend } = await import('resend');
        const { UserConfirmationEmail, AdminNotificationEmail } = await import(
          '@/lib/email-templates'
        );
        const { renderToStaticMarkup } = await import('react-dom/server');

        const resend = new Resend(resendApiKey);

        const emailFormData = {
          fullName: contactData.fullName,
          email: contactData.email,
          whatsapp: contactData.whatsapp || '',
          linkedin: contactData.linkedin || undefined,
          role: contactData.role || '',
          company: contactData.company,
          website: validatedData.websiteUrl ? 'yes' : 'no',
          websiteUrl: contactData.websiteUrl || undefined,
          instagram: contactData.instagram || undefined,
          companySize: validatedData.companySize || '',
          industry: validatedData.industry || '',
          need: validatedData.need,
          summary: contactData.summary || undefined,
          heardFrom: contactData.heardFrom || undefined,
        };

        // Send both emails in parallel
        const [userEmailResult, adminEmailResult] = await Promise.allSettled([
          resend.emails.send({
            from: `Dream Studio <${fromEmail}>`,
            to: contactData.email,
            replyTo: adminEmail,
            subject: '¡Gracias por contactarnos! - Dream Studio',
            html: renderToStaticMarkup(UserConfirmationEmail({ formData: emailFormData })),
          }),
          resend.emails.send({
            from: `Dream Studio Notifications <${fromEmail}>`,
            to: adminEmail,
            subject: `🎯 Nuevo Lead: ${contactData.company} - ${contactData.fullName}`,
            html: renderToStaticMarkup(AdminNotificationEmail({ formData: emailFormData })),
            replyTo: contactData.email,
          }),
        ]);

        if (userEmailResult.status === 'fulfilled') {
          logger.log('✅ User email sent');
        } else {
          logger.error('❌ User email failed:', userEmailResult.reason);
        }

        if (adminEmailResult.status === 'fulfilled') {
          logger.log('✅ Admin email sent');
        } else {
          logger.error('❌ Admin email failed:', adminEmailResult.reason);
        }
      } catch (error) {
        logger.error('❌ Failed to send emails:', error);
      }
    } else {
      logger.log('⚠️ Resend not configured');
    }

    // 10. Send to Zapier webhook
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (zapierWebhookUrl) {
      try {
        logger.log('🔗 Sending to Zapier webhook');

        const zapierData = {
          firstName: contactData.fullName.split(' ')[0] || contactData.fullName,
          lastName: contactData.fullName.split(' ').slice(1).join(' ') || '',
          fullName: contactData.fullName,
          email: contactData.email,
          phone: contactData.whatsapp || '',
          companyName: contactData.company,
          websiteUrl: contactData.websiteUrl || '',
          projectType: contactData.need,
          projectDetails: contactData.summary || '',
          howDidYouHear: contactData.heardFrom || '',
          submittedAt: contactData.submittedAt,
        };

        const zapierResponse = await fetch(zapierWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(zapierData),
        });

        if (zapierResponse.ok) {
          logger.log('✅ Zapier webhook called successfully');
        } else {
          logger.error('❌ Zapier webhook failed:', await zapierResponse.text());
        }
      } catch (error) {
        logger.error('❌ Failed to send to Zapier:', error);
      }
    } else {
      logger.log('⚠️ Zapier webhook not configured');
    }

    // 11. Log success
    logger.log('✅ Contact form submission successful:', {
      email: contactData.email,
      company: contactData.company,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  // Localhost-only check
  const hostname = request.headers.get('host') || '';
  const isLocalhost = hostname.startsWith('localhost') ||
                      hostname.startsWith('127.0.0.1') ||
                      hostname.startsWith('[::1]');

  if (!isLocalhost) {
    return NextResponse.json({}, { status: 404 });
  }

  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://dreeeams.com',
    'https://www.dreeeams.com',
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean);

  const responseHeaders: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (origin && allowedOrigins.includes(origin)) {
    responseHeaders['Access-Control-Allow-Origin'] = origin;
    responseHeaders['Vary'] = 'Origin';
  }

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: responseHeaders,
    }
  );
}

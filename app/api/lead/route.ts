import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { validateCSRF } from '@/lib/csrf';

const leadSchema = z.object({
  // Identity
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional().default(''),
  email: z.string().email().max(100),
  phone: z.string().max(30).optional().default(''),
  company: z.string().max(100).optional().default(''),

  // Qualification
  service: z.enum(['web', 'mobile', 'backend', 'ai', 'branding', 'unsure']),
  timeline: z.enum(['asap', 'soon', 'planned', 'flexible']),
  budget: z.enum(['low', 'mid', 'high', 'under']),
  qualified: z.boolean(),

  // Geo (server-side)
  country: z.string().max(10).optional().default(''),
  city: z.string().max(100).optional().default(''),

  // Client enrichment
  timezone: z.string().max(100).optional().default(''),
  language: z.string().max(20).optional().default(''),
  device: z.string().max(50).optional().default(''),
  browser: z.string().max(50).optional().default(''),

  // Domain intelligence
  company_domain: z.string().max(100).optional().default(''),

  // Attribution
  utm_source: z.string().max(100).optional().default(''),
  utm_medium: z.string().max(100).optional().default(''),
  utm_campaign: z.string().max(100).optional().default(''),
  referrer: z.string().max(500).optional().default(''),

  // Metadata
  created_at: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const csrfValidation = validateCSRF(request.headers);
    if (!csrfValidation.valid) {
      logger.warn('Lead CSRF failed', { error: csrfValidation.error });
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    const clientIP = getClientIP(request.headers);
    const rateLimitResult = await checkRateLimit(clientIP);
    if (!rateLimitResult.success) {
      logger.warn('Lead rate limit exceeded', { ip: clientIP });
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const result = leadSchema.safeParse(body);
    if (!result.success) {
      logger.warn('Lead validation failed', { errors: result.error.issues, ip: clientIP });
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.issues.map((err: z.ZodIssue) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    logger.info('Lead submission', {
      firstName: data.firstName,
      email: data.email,
      service: data.service,
      budget: data.budget,
      qualified: data.qualified,
      country: data.country,
      company_domain: data.company_domain,
      ip: clientIP,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error('Lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

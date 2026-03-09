import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { validateCSRF } from '@/lib/csrf';

const intakeSchema = z.object({
  service: z.enum(['web', 'mobile', 'backend', 'ai', 'branding', 'unsure']),
  timeline: z.enum(['asap', 'soon', 'planned', 'flexible']),
  budget: z.enum(['low', 'mid', 'high', 'under']),
  email: z.string().email().optional(),
  qualified: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    // CSRF
    const csrfValidation = validateCSRF(request.headers);
    if (!csrfValidation.valid) {
      logger.warn('Intake CSRF failed', { error: csrfValidation.error });
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    // Rate limit
    const clientIP = getClientIP(request.headers);
    const rateLimitResult = await checkRateLimit(clientIP);
    if (!rateLimitResult.success) {
      logger.warn('Intake rate limit exceeded', { ip: clientIP });
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

    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Validate
    const result = intakeSchema.safeParse(body);
    if (!result.success) {
      logger.warn('Intake validation failed', { errors: result.error.issues, ip: clientIP });
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

    logger.info('Intake submission', {
      service: data.service,
      timeline: data.timeline,
      budget: data.budget,
      qualified: data.qualified,
      hasEmail: !!data.email,
      ip: clientIP,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error('Intake error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

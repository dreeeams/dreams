import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { fullName, email, whatsapp, company, website, need, summary } = body;

    // Validate required fields
    if (!fullName || !email || !company || !need) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (fullName.length > 100 || email.length > 100 || company.length > 100) {
      return NextResponse.json(
        { error: 'Field length exceeded' },
        { status: 400 }
      );
    }

    if (summary && summary.length > 140) {
      return NextResponse.json(
        { error: 'Summary must be 140 characters or less' },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp?.trim() || null,
      company: company.trim(),
      website: website?.trim() || null,
      need,
      summary: summary?.trim() || null,
      submittedAt: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent'),
    };

    // Send to CRM if configured
    const crmApiUrl = process.env.CRM_API_URL;
    const crmApiKey = process.env.CRM_API_KEY;

    if (crmApiUrl && crmApiKey) {
      try {
        const crmResponse = await fetch(crmApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${crmApiKey}`,
          },
          body: JSON.stringify(contactData),
        });

        if (!crmResponse.ok) {
          console.error('CRM integration failed:', await crmResponse.text());
        }
      } catch (error) {
        console.error('Failed to send to CRM:', error);
      }
    }

    // Send email notification if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (smtpHost && smtpUser && smtpPassword) {
      try {
        // Use nodemailer or similar library here
        // For now, just logging
        console.log('Email would be sent with data:', contactData);
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    }

    // Log the submission (in production, send to logging service)
    console.log('Contact form submission:', contactData);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

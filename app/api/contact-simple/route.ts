import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the submission
    console.log('Contact form submission received:', {
      email: body.email,
      company: body.company,
      timestamp: new Date().toISOString()
    });

    // Send emails using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@updates.dreeeams.com';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@dreeeams.com';

    if (resendApiKey) {
      try {
        const { Resend } = await import('resend');
        const { UserConfirmationEmail, AdminNotificationEmail } = await import(
          '@/lib/email-templates'
        );
        const { renderToStaticMarkup } = await import('react-dom/server');

        const resend = new Resend(resendApiKey);

        // Prepare email data
        const emailFormData = {
          fullName: body.fullName,
          email: body.email,
          whatsapp: body.whatsapp || '',
          linkedin: undefined,
          role: '',
          company: body.company,
          website: body.websiteUrl ? 'yes' : 'no',
          websiteUrl: body.websiteUrl || undefined,
          instagram: undefined,
          companySize: '',
          industry: '',
          need: body.need || [],
          summary: body.summary || '',
          heardFrom: body.heardFrom || undefined,
        };

        // Get locale from request body, default to Spanish
        const locale = body.locale || 'es';

        // Determine email subject based on locale
        const userSubject = locale === 'en'
          ? 'Thank you for contacting us! - Dreeeams'
          : '¡Gracias por contactarnos! - Dreeeams';

        const adminSubject = locale === 'en'
          ? `🎯 New Lead: ${body.company} - ${body.fullName}`
          : `🎯 Nuevo Lead: ${body.company} - ${body.fullName}`;

        // Send both emails in parallel
        const [userEmailResult, adminEmailResult] = await Promise.allSettled([
          resend.emails.send({
            from: `Dreeeams <${fromEmail}>`,
            to: body.email,
            replyTo: adminEmail,
            subject: userSubject,
            html: renderToStaticMarkup(UserConfirmationEmail({ formData: emailFormData, locale })),
          }),
          resend.emails.send({
            from: `Dreeeams Notifications <${fromEmail}>`,
            to: adminEmail,
            subject: adminSubject,
            html: renderToStaticMarkup(AdminNotificationEmail({ formData: emailFormData, locale })),
            replyTo: body.email,
          }),
        ]);

        if (userEmailResult.status === 'fulfilled') {
          console.log('✅ User email sent');
        } else {
          console.error('❌ User email failed:', userEmailResult.reason);
        }

        if (adminEmailResult.status === 'fulfilled') {
          console.log('✅ Admin email sent');
        } else {
          console.error('❌ Admin email failed:', adminEmailResult.reason);
        }
      } catch (error) {
        console.error('❌ Failed to send emails:', error);
      }
    } else {
      console.log('⚠️ Resend not configured - emails not sent');
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      error: 'Failed to process request'
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    }
  });
}
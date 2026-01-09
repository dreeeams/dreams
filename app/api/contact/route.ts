import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (in-memory store with cleanup)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 300000);

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

// Input sanitization
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Capitalize first letter of each word
function capitalizeText(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Map industry codes to full text
function mapIndustry(industryCode: string): string {
  const industryMap: Record<string, string> = {
    'tech': 'Technology / Software',
    'ecommerce': 'E-commerce / Retail',
    'finance': 'Finance / Fintech',
    'health': 'Healthcare / Wellness',
    'education': 'Education / E-learning',
    'realEstate': 'Real Estate',
    'food': 'Food & Beverage',
    'entertainment': 'Entertainment / Media',
    'services': 'Professional Services',
    'other': 'Other'
  };
  return industryMap[industryCode] || capitalizeText(industryCode);
}

// Map heardFrom codes to full text
function mapHeardFrom(heardFromCode: string): string {
  const heardFromMap: Record<string, string> = {
    'google': 'Google Search',
    'social': 'Social Media',
    'referral': 'Referral / Recommendation',
    'linkedin': 'LinkedIn',
    'instagram': 'Instagram',
    'event': 'Event / Conference',
    'other': 'Other'
  };
  return heardFromMap[heardFromCode] || capitalizeText(heardFromCode);
}

// Map company size codes to full text
function mapCompanySize(sizeCode: string): string {
  const sizeMap: Record<string, string> = {
    'solo': 'Solo / Freelancer',
    'small': '2-10 Employees',
    'medium': '11-50 Employees',
    'large': '51-200 Employees',
    'enterprise': '201+ Employees'
  };
  return sizeMap[sizeCode] || capitalizeText(sizeCode);
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
    const { fullName, email, whatsapp, linkedin, role, company, website, websiteUrl, instagram, companySize, industry, need, summary, heardFrom, acceptTerms } = body;

    // Validate required fields
    if (!fullName || !email || !company || !need || (Array.isArray(need) && need.length === 0) || !acceptTerms) {
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

    if (summary && summary.length > 500) {
      return NextResponse.json(
        { error: 'Summary must be 500 characters or less' },
        { status: 400 }
      );
    }

    // Prepare contact data with sanitization and proper formatting
    const contactData = {
      fullName: capitalizeText(sanitizeInput(fullName)),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp ? sanitizeInput(whatsapp) : null,
      linkedin: linkedin ? sanitizeInput(linkedin) : null,
      role: role ? capitalizeText(sanitizeInput(role)) : null,
      company: capitalizeText(sanitizeInput(company)),
      websiteUrl: websiteUrl ? sanitizeInput(websiteUrl) : null,
      instagram: instagram ? sanitizeInput(instagram) : null,
      companySize: companySize ? mapCompanySize(companySize) : null,
      industry: industry ? mapIndustry(industry) : null,
      need: Array.isArray(need) ? need.map(n => capitalizeText(sanitizeInput(n))).join(', ') : capitalizeText(sanitizeInput(need)),
      summary: summary ? capitalizeText(sanitizeInput(summary)) : null,
      heardFrom: heardFrom ? mapHeardFrom(heardFrom) : null,
      acceptTerms: Boolean(acceptTerms),
      submittedAt: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent'),
    };

    // Send to Twenty CRM if configured
    const twentyApiKey = process.env.TWENTY_API_KEY;
    const twentyApiUrl = process.env.TWENTY_API_URL;

    if (twentyApiKey && twentyApiUrl) {
      try {
        let companyId = null;

        // Step 1: Create Company if provided
        if (contactData.company) {
          logger.log('🏢 Creating company in Twenty CRM:', {
            name: contactData.company,
            websiteUrl: contactData.websiteUrl,
            instagram: contactData.instagram,
            companySize: contactData.companySize
          });

          // Prepare company payload
          const companyPayload: any = {
            name: contactData.company,
          };

          // Add domain name: use website URL if available, otherwise Instagram
          if (contactData.websiteUrl) {
            companyPayload.domainName = {
              primaryLinkUrl: contactData.websiteUrl,
              primaryLinkLabel: contactData.websiteUrl,
              secondaryLinks: [],
            };
          } else if (contactData.instagram) {
            // If no website but has Instagram, use Instagram as the primary link
            const instagramUrl = contactData.instagram.startsWith('@')
              ? `https://instagram.com/${contactData.instagram.substring(1)}`
              : contactData.instagram.startsWith('http')
                ? contactData.instagram
                : `https://instagram.com/${contactData.instagram}`;

            companyPayload.domainName = {
              primaryLinkUrl: instagramUrl,
              primaryLinkLabel: contactData.instagram,
              secondaryLinks: [],
            };
          }

          // Add company size as text field (already mapped to full text)
          if (contactData.companySize) {
            companyPayload.companySize = contactData.companySize;
          }

          // Add industry if provided (already mapped to full text)
          if (contactData.industry) {
            companyPayload.industry = contactData.industry;
          }

          const companyResponse = await fetch(`${twentyApiUrl}/rest/companies`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${twentyApiKey}`,
            },
            body: JSON.stringify(companyPayload),
          });

          if (companyResponse.ok) {
            const companyData = await companyResponse.json();
            companyId = companyData.data?.createCompany?.id;
            logger.log('✅ Company created:', {
              id: companyId,
              name: companyData.data?.createCompany?.name,
              domainName: companyData.data?.createCompany?.domainName?.primaryLinkUrl
            });
          } else {
            const errorText = await companyResponse.text();
            logger.error('❌ Company creation failed:', errorText);
          }
        }

        // Step 2: Create Person
        const twentyPayload: any = {
          name: {
            firstName: contactData.fullName.split(' ')[0] || contactData.fullName,
            lastName: contactData.fullName.split(' ').slice(1).join(' ') || '',
          },
          emails: {
            primaryEmail: contactData.email,
            additionalEmails: [],
          },
        };

        // Add phone only if provided
        if (contactData.whatsapp) {
          // Format phone: ensure it starts with + for international format
          let formattedPhone = contactData.whatsapp.trim();
          if (!formattedPhone.startsWith('+')) {
            // If no country code, assume Colombia (+57)
            formattedPhone = `+57${formattedPhone}`;
          }

          // Extract country code and calling code
          // Format: +[calling code][number]
          // Example: +573001234567 -> calling code: +57, country code: CO
          const callingCodeMatch = formattedPhone.match(/^\+(\d{1,4})/);
          const callingCode = callingCodeMatch ? `+${callingCodeMatch[1]}` : '+57';

          // Map calling codes to country codes
          const countryCodeMap: Record<string, string> = {
            '+1': 'US',
            '+52': 'MX',
            '+57': 'CO',
            '+58': 'VE',
            '+54': 'AR',
            '+56': 'CL',
            '+51': 'PE',
            '+55': 'BR',
            '+34': 'ES',
            '+44': 'GB',
            '+33': 'FR',
            '+49': 'DE',
          };

          const countryCode = countryCodeMap[callingCode] || 'CO';

          twentyPayload.phones = {
            primaryPhoneNumber: formattedPhone,
            primaryPhoneCountryCode: countryCode,
            primaryPhoneCallingCode: callingCode,
            additionalPhones: [],
          };
        }

        // Add job title (role) if provided
        if (contactData.role) {
          twentyPayload.jobTitle = contactData.role;
        }

        // Add LinkedIn link if provided
        if (contactData.linkedin) {
          twentyPayload.linkedinLink = {
            primaryLinkUrl: contactData.linkedin,
            primaryLinkLabel: 'LinkedIn',
            secondaryLinks: [],
          };
        }

        // Add referral source if provided
        if (contactData.heardFrom) {
          twentyPayload.referall = contactData.heardFrom;
        }

        // Link person to company if created
        if (companyId) {
          twentyPayload.companyId = companyId;
        }

        logger.log('👤 Creating person in Twenty CRM:', {
          name: twentyPayload.name,
          email: twentyPayload.emails.primaryEmail,
          phone: twentyPayload.phones?.primaryPhoneNumber,
          companyId
        });

        const personResponse = await fetch(`${twentyApiUrl}/rest/people`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${twentyApiKey}`,
          },
          body: JSON.stringify(twentyPayload),
        });

        logger.log('📥 Person Response Status:', personResponse.status);

        if (!personResponse.ok) {
          const errorText = await personResponse.text();
          logger.error('❌ Person creation failed:', {
            status: personResponse.status,
            statusText: personResponse.statusText,
            error: errorText
          });
        } else {
          const personData = await personResponse.json();
          const personId = personData.data?.createPerson?.id;

          logger.log('✅ Contact successfully added to Twenty CRM:', {
            personId,
            email: personData.data?.createPerson?.emails?.primaryEmail,
            companyId: personData.data?.createPerson?.companyId
          });

          // Step 3: Create Opportunity
          const opportunityName = `${contactData.company || contactData.fullName} - ${contactData.need}`;

          logger.log('🎯 Creating opportunity in Twenty CRM:', {
            name: opportunityName,
            companyId,
            personId
          });

          const opportunityPayload: any = {
            name: opportunityName,
            stage: 'NEW_LEAD',
          };

          // Add services and summary to opportunity
          if (contactData.need) {
            opportunityPayload.services = contactData.need;
          }

          if (contactData.summary) {
            opportunityPayload.summary = contactData.summary;
          }

          // Link to company if exists
          if (companyId) {
            opportunityPayload.companyId = companyId;
          }

          // Link to person as point of contact if exists
          if (personId) {
            opportunityPayload.pointOfContactId = personId;
          }

          logger.log('📤 Opportunity payload:', JSON.stringify(opportunityPayload, null, 2));

          const opportunityResponse = await fetch(`${twentyApiUrl}/rest/opportunities`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${twentyApiKey}`,
            },
            body: JSON.stringify(opportunityPayload),
          });

          logger.log('📥 Opportunity Response Status:', opportunityResponse.status);

          if (opportunityResponse.ok) {
            const opportunityData = await opportunityResponse.json();
            logger.log('✅ Opportunity created:', {
              id: opportunityData.data?.createOpportunity?.id,
              name: opportunityData.data?.createOpportunity?.name,
              stage: opportunityData.data?.createOpportunity?.stage,
              companyId: opportunityData.data?.createOpportunity?.companyId,
              pointOfContactId: opportunityData.data?.createOpportunity?.pointOfContactId
            });
          } else {
            const errorText = await opportunityResponse.text();
            logger.error('❌ Opportunity creation failed:', {
              status: opportunityResponse.status,
              statusText: opportunityResponse.statusText,
              error: errorText,
              payload: opportunityPayload
            });
          }
        }
      } catch (error) {
        logger.error('❌ Failed to send to Twenty CRM:', error);
      }
    } else {
      logger.log('⚠️  Twenty CRM not configured (missing API key or URL)');
    }

    // Send emails using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@updates.dreeeams.com';
    const adminEmail = process.env.ADMIN_EMAIL || 'info@dreeeams.com';

    if (resendApiKey) {
      try {
        logger.log('📧 Starting email sending process...');
        logger.log('📧 From email:', fromEmail);
        logger.log('📧 Admin email:', adminEmail);
        logger.log('📧 User email:', contactData.email);

        const { Resend } = await import('resend');
        const { UserConfirmationEmail, AdminNotificationEmail } = await import('@/lib/email-templates');
        const { renderToStaticMarkup } = await import('react-dom/server');

        const resend = new Resend(resendApiKey);
        logger.log('📧 Resend client initialized');

        // Prepare form data for email templates
        const emailFormData = {
          fullName: contactData.fullName,
          email: contactData.email,
          whatsapp: contactData.whatsapp || '',
          linkedin: contactData.linkedin || undefined,
          role: contactData.role || '',
          company: contactData.company,
          website,
          websiteUrl: contactData.websiteUrl || undefined,
          instagram: contactData.instagram || undefined,
          companySize,
          industry,
          need,
          summary: contactData.summary || undefined,
          heardFrom: contactData.heardFrom || undefined,
        };

        // Send confirmation email to user
        logger.log('📧 Rendering user confirmation email...');
        const userEmailHtml = renderToStaticMarkup(
          UserConfirmationEmail({ formData: emailFormData })
        );
        logger.log('📧 User email HTML rendered, length:', userEmailHtml.length);

        logger.log('📧 Sending confirmation email to user...');
        const userEmailResult = await resend.emails.send({
          from: `Dream Studio <${fromEmail}>`,
          to: contactData.email,
          replyTo: adminEmail,
          subject: '¡Gracias por contactarnos! - Dream Studio',
          html: userEmailHtml,
        });

        logger.log('✅ Confirmation email sent to user:', contactData.email);
        logger.log('📧 User email result:', JSON.stringify(userEmailResult, null, 2));

        // Send notification email to admin
        logger.log('📧 Rendering admin notification email...');
        const adminEmailHtml = renderToStaticMarkup(
          AdminNotificationEmail({ formData: emailFormData })
        );
        logger.log('📧 Admin email HTML rendered, length:', adminEmailHtml.length);

        logger.log('📧 Sending notification email to admin...');
        const adminEmailResult = await resend.emails.send({
          from: `Dream Studio Notifications <${fromEmail}>`,
          to: adminEmail,
          subject: `🎯 Nuevo Lead: ${contactData.company} - ${contactData.fullName}`,
          html: adminEmailHtml,
          replyTo: contactData.email,
        });

        logger.log('✅ Notification email sent to admin:', adminEmail);
        logger.log('📧 Admin email result:', JSON.stringify(adminEmailResult, null, 2));
      } catch (error) {
        logger.error('❌ Failed to send emails via Resend:', error);
        logger.error('❌ Error details:', error instanceof Error ? error.message : String(error));
        logger.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        // Don't fail the entire request if email fails
      }
    } else {
      logger.log('⚠️  Resend not configured (missing API key)');
    }

    // Log the submission (in production, send to logging service)
    logger.log('Contact form submission:', contactData);

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

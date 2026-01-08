import { NextRequest, NextResponse } from 'next/server';

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

    // Prepare contact data with sanitization
    const contactData = {
      fullName: sanitizeInput(fullName),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp ? sanitizeInput(whatsapp) : null,
      linkedin: linkedin ? sanitizeInput(linkedin) : null,
      role: role ? sanitizeInput(role) : null,
      company: sanitizeInput(company),
      websiteUrl: websiteUrl ? sanitizeInput(websiteUrl) : null,
      instagram: instagram ? sanitizeInput(instagram) : null,
      companySize: companySize ? sanitizeInput(companySize) : null,
      industry: industry ? sanitizeInput(industry) : null,
      need: Array.isArray(need) ? need.map(n => sanitizeInput(n)).join(', ') : sanitizeInput(need),
      summary: summary ? sanitizeInput(summary) : null,
      heardFrom: heardFrom ? sanitizeInput(heardFrom) : null,
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
          console.log('🏢 Creating company in Twenty CRM:', {
            name: contactData.company,
            websiteUrl: contactData.websiteUrl,
            instagram: contactData.instagram
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
            console.log('✅ Company created:', {
              id: companyId,
              name: companyData.data?.createCompany?.name,
              domainName: companyData.data?.createCompany?.domainName?.primaryLinkUrl
            });
          } else {
            const errorText = await companyResponse.text();
            console.error('❌ Company creation failed:', errorText);
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

          twentyPayload.phones = {
            primaryPhoneNumber: formattedPhone,
            primaryPhoneCountryCode: '',
            primaryPhoneCallingCode: '',
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

        console.log('👤 Creating person in Twenty CRM:', {
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

        console.log('📥 Person Response Status:', personResponse.status);

        if (!personResponse.ok) {
          const errorText = await personResponse.text();
          console.error('❌ Person creation failed:', {
            status: personResponse.status,
            statusText: personResponse.statusText,
            error: errorText
          });
        } else {
          const personData = await personResponse.json();
          const personId = personData.data?.createPerson?.id;

          console.log('✅ Contact successfully added to Twenty CRM:', {
            personId,
            email: personData.data?.createPerson?.emails?.primaryEmail,
            companyId: personData.data?.createPerson?.companyId
          });

          // Step 3: Create Opportunity
          const opportunityName = `${contactData.company || contactData.fullName} - ${contactData.need}`;

          console.log('🎯 Creating opportunity in Twenty CRM:', {
            name: opportunityName,
            companyId,
            personId
          });

          const opportunityPayload: any = {
            name: opportunityName,
            stage: 'NEW',
          };

          // Link to company if exists
          if (companyId) {
            opportunityPayload.companyId = companyId;
          }

          // Link to person as point of contact if exists
          if (personId) {
            opportunityPayload.pointOfContactId = personId;
          }

          const opportunityResponse = await fetch(`${twentyApiUrl}/rest/opportunities`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${twentyApiKey}`,
            },
            body: JSON.stringify(opportunityPayload),
          });

          if (opportunityResponse.ok) {
            const opportunityData = await opportunityResponse.json();
            console.log('✅ Opportunity created:', {
              id: opportunityData.data?.createOpportunity?.id,
              name: opportunityData.data?.createOpportunity?.name,
              stage: opportunityData.data?.createOpportunity?.stage,
              companyId: opportunityData.data?.createOpportunity?.companyId,
              pointOfContactId: opportunityData.data?.createOpportunity?.pointOfContactId
            });
          } else {
            const errorText = await opportunityResponse.text();
            console.error('❌ Opportunity creation failed:', errorText);
          }

          // Step 4: Create Note with project requirements
          if (personId || companyId) {
            const noteTitle = `Project Requirements: ${contactData.need}`;

            // Build note body with additional information not in structured fields
            let noteBody = `## Project Details\n\n`;
            noteBody += `- **Services Needed:** ${contactData.need}\n`;
            if (contactData.summary) {
              noteBody += `\n**Project Summary:**\n${contactData.summary}\n`;
            }

            // Add company details not in structured fields
            if (contactData.companySize || contactData.industry) {
              noteBody += `\n## Additional Company Information\n\n`;
              if (contactData.companySize) noteBody += `- **Company Size:** ${contactData.companySize}\n`;
              if (contactData.industry) noteBody += `- **Industry:** ${contactData.industry}\n`;
            }

            noteBody += `\n---\n*Submitted: ${contactData.submittedAt}*`;

            console.log('📝 Creating note in Twenty CRM:', {
              title: noteTitle,
              personId,
              companyId
            });

            const noteResponse = await fetch(`${twentyApiUrl}/rest/notes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${twentyApiKey}`,
              },
              body: JSON.stringify({
                title: noteTitle,
                bodyV2: {
                  markdown: noteBody,
                  blocknote: null
                }
              }),
            });

            if (noteResponse.ok) {
              const noteData = await noteResponse.json();
              const noteId = noteData.data?.createNote?.id;

              console.log('✅ Note created:', {
                id: noteId,
                title: noteData.data?.createNote?.title
              });

              // Link note to person
              if (personId && noteId) {
                const personLinkResponse = await fetch(`${twentyApiUrl}/rest/noteTargets`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${twentyApiKey}`,
                  },
                  body: JSON.stringify({ noteId, personId }),
                });

                if (personLinkResponse.ok) {
                  console.log('✅ Note linked to person');
                } else {
                  const errorText = await personLinkResponse.text();
                  console.error('❌ Failed to link note to person:', errorText);
                }
              }

              // Link note to company
              if (companyId && noteId) {
                const companyLinkResponse = await fetch(`${twentyApiUrl}/rest/noteTargets`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${twentyApiKey}`,
                  },
                  body: JSON.stringify({ noteId, companyId }),
                });

                if (companyLinkResponse.ok) {
                  console.log('✅ Note linked to company');
                } else {
                  const errorText = await companyLinkResponse.text();
                  console.error('❌ Failed to link note to company:', errorText);
                }
              }
            } else {
              const errorText = await noteResponse.text();
              console.error('❌ Note creation failed:', errorText);
            }
          }
        }
      } catch (error) {
        console.error('❌ Failed to send to Twenty CRM:', error);
      }
    } else {
      console.log('⚠️  Twenty CRM not configured (missing API key or URL)');
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

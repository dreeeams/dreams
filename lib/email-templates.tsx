import * as React from 'react';

interface ContactFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  linkedin?: string;
  role: string;
  company: string;
  website: string;
  websiteUrl?: string;
  instagram?: string;
  companySize: string;
  industry: string;
  need: string[];
  summary?: string;
  heardFrom?: string;
}

// Brand colors from Dreeeams Brand Guidelines
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#5A5A5A',
  lightGray: '#DEE5ED',
  darkGray: '#1E1E1E',
  bgGray: '#F3F4F6',
};

// Bilingual translations
const i18n = {
  es: {
    // User email
    thankYou: (firstName: string) => `Gracias por contactarnos, ${firstName}`,
    weReceived: (company: string) => `Hemos recibido tu solicitud y revisaremos la información sobre ${company} en detalle.`,
    requestSummary: 'Resumen de tu solicitud',
    nextSteps: 'Próximos pasos',
    step1: 'Revisaremos tu solicitud en las próximas 24 horas',
    step2: 'Te contactaremos para agendar una llamada inicial',
    step3: 'Discutiremos tu proyecto y prepararemos una propuesta detallada',
    questions: 'Si tienes preguntas, puedes contactarnos:',
    tagline: 'Agencia Digital | Construcción de soluciones tecnológicas',
    privacyPolicy: 'Política de Privacidad',
    termsAndConditions: 'Términos y Condiciones',
    confidential: 'Este correo contiene información confidencial dirigida exclusivamente al destinatario indicado. Si has recibido este mensaje por error, por favor elimínalo y notifícanos.',
    allRightsReserved: 'Todos los derechos reservados.',

    // Admin email
    newLead: 'NUEVO LEAD',
    contactForm: 'Formulario de Contacto',
    respondIn24: 'Responder en 24 horas para maximizar conversión',
    contactInformation: 'Información de Contacto',
    name: 'Nombre:',
    email: 'Email:',
    position: 'Cargo:',
    companyInformation: 'Información de la Empresa',
    company: 'Empresa:',
    website: 'Sitio Web:',
    size: 'Tamaño:',
    industry: 'Industria:',
    servicesRequired: 'Servicios Requeridos',
    projectSummary: 'Resumen del Proyecto',
    replyEmail: 'Responder Email',
    notificationSystem: 'DREEEAMS - SISTEMA DE NOTIFICACIONES',
    automaticEmail: 'Este es un correo automático del sistema interno',

    // Field translations
    companySize: {
      '1-10': '1-10 empleados',
      '11-50': '11-50 empleados',
      '51-200': '51-200 empleados',
      '201-500': '201-500 empleados',
      '500+': '500+ empleados',
    },
    industryOptions: {
      tech: 'Tecnología',
      ecommerce: 'E-commerce',
      finance: 'Finanzas',
      health: 'Salud',
      education: 'Educación',
      'real-estate': 'Bienes Raíces',
      food: 'Alimentos',
      entertainment: 'Entretenimiento',
      services: 'Servicios',
      other: 'Otro',
    },
    needOptions: {
      landing: 'Landing Page',
      webapp: 'Aplicación Web',
      mobile: 'App Móvil',
      chatbot: 'Chatbot/IA',
      automation: 'Automatización',
      design: 'Diseño UI/UX',
      other: 'Otro',
    },
  },
  en: {
    // User email
    thankYou: (firstName: string) => `Thank you for contacting us, ${firstName}`,
    weReceived: (company: string) => `We have received your request and will review the information about ${company} in detail.`,
    requestSummary: 'Request Summary',
    nextSteps: 'Next Steps',
    step1: 'We will review your request within the next 24 hours',
    step2: 'We will contact you to schedule an initial call',
    step3: 'We will discuss your project and prepare a detailed proposal',
    questions: 'If you have questions, you can contact us:',
    tagline: 'Digital Agency | Building technological solutions',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms and Conditions',
    confidential: 'This email contains confidential information intended exclusively for the indicated recipient. If you received this message by error, please delete it and notify us.',
    allRightsReserved: 'All rights reserved.',

    // Admin email
    newLead: 'NEW LEAD',
    contactForm: 'Contact Form',
    respondIn24: 'Respond within 24 hours to maximize conversion',
    contactInformation: 'Contact Information',
    name: 'Name:',
    email: 'Email:',
    position: 'Position:',
    companyInformation: 'Company Information',
    company: 'Company:',
    website: 'Website:',
    size: 'Size:',
    industry: 'Industry:',
    servicesRequired: 'Required Services',
    projectSummary: 'Project Summary',
    replyEmail: 'Reply Email',
    notificationSystem: 'DREEEAMS - NOTIFICATION SYSTEM',
    automaticEmail: 'This is an automatic email from the internal system',

    // Field translations
    companySize: {
      '1-10': '1-10 employees',
      '11-50': '11-50 employees',
      '51-200': '51-200 employees',
      '201-500': '201-500 employees',
      '500+': '500+ employees',
    },
    industryOptions: {
      tech: 'Technology',
      ecommerce: 'E-commerce',
      finance: 'Finance',
      health: 'Health',
      education: 'Education',
      'real-estate': 'Real Estate',
      food: 'Food',
      entertainment: 'Entertainment',
      services: 'Services',
      other: 'Other',
    },
    needOptions: {
      landing: 'Landing Page',
      webapp: 'Web Application',
      mobile: 'Mobile App',
      chatbot: 'Chatbot/AI',
      automation: 'Automation',
      design: 'UI/UX Design',
      other: 'Other',
    },
  },
};

// Email de confirmación al usuario
export const UserConfirmationEmail = ({ formData, locale = 'es' }: { formData: ContactFormData; locale?: string }) => {
  const t = i18n[locale as keyof typeof i18n] || i18n.es;
  const firstName = formData.fullName.split(' ')[0];

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: COLORS.bgGray, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>

              {/* Main Container */}
              <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="600" style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>

                {/* Logo/Brand - Header fuera del card */}
                <tr>
                  <td style={{ padding: '0 0 30px 0', textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: COLORS.black, letterSpacing: '2px' }}>
                      DREEEAMS
                    </h1>
                  </td>
                </tr>

                {/* White Card Container */}
                <tr>
                  <td style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
                      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600', color: COLORS.black }}>
                        {t.thankYou(firstName)}
                      </h2>
                      <p style={{ margin: '0 0 30px 0', fontSize: '15px', lineHeight: '1.8', color: COLORS.gray, textAlign: 'justify' }}>
                        {t.weReceived(formData.company)}
                      </p>

                      {/* Info Box - Markdown Style */}
                      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}`, textAlign: 'left' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.requestSummary}
                        </p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '15px', color: COLORS.black, fontWeight: '500' }}>
                          {formData.company}
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                          {formData.need.map(n => t.needOptions[n as keyof typeof t.needOptions]).join(', ')}
                        </p>
                      </div>

                      {/* Next Steps - Markdown Style */}
                      <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                        <p style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.nextSteps}
                        </p>
                        <p style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.6', color: COLORS.gray, paddingLeft: '20px', borderLeft: `2px solid ${COLORS.lightGray}` }}>
                          {t.step1}
                        </p>
                        <p style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.6', color: COLORS.gray, paddingLeft: '20px', borderLeft: `2px solid ${COLORS.lightGray}` }}>
                          {t.step2}
                        </p>
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: COLORS.gray, paddingLeft: '20px', borderLeft: `2px solid ${COLORS.lightGray}` }}>
                          {t.step3}
                        </p>
                      </div>

                      {/* Contact Info */}
                      <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: `1px solid ${COLORS.lightGray}` }}>
                        <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: COLORS.gray }}>
                          {t.questions}
                        </p>
                        <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: COLORS.black }}>
                          <a href="mailto:info@dreeeams.com" style={{ color: COLORS.black, textDecoration: 'underline' }}>info@dreeeams.com</a>
                        </p>
                        <p style={{ margin: 0, fontSize: '14px', color: COLORS.black }}>
                          WhatsApp: {formData.whatsapp}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Footer - Fuera del card */}
                <tr>
                  <td style={{ padding: '30px 0 0 0', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '600', color: COLORS.black }}>
                      DREEEAMS
                    </p>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: COLORS.gray }}>
                      {t.tagline}
                    </p>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: COLORS.gray }}>
                      <a href="https://dreeeams.com/privacy" style={{ color: COLORS.gray, textDecoration: 'underline' }}>{t.privacyPolicy}</a>
                      {' | '}
                      <a href="https://dreeeams.com/terms" style={{ color: COLORS.gray, textDecoration: 'underline' }}>{t.termsAndConditions}</a>
                    </p>
                    <p style={{ margin: '0 0 10px 0', fontSize: '11px', lineHeight: '1.5', color: COLORS.gray }}>
                      {t.confidential}
                    </p>
                    <p style={{ margin: 0, fontSize: '11px', color: COLORS.gray }}>
                      © 2024 Dreeeams. {t.allRightsReserved}
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

// Email de notificación al admin
export const AdminNotificationEmail = ({ formData, locale = 'es' }: { formData: ContactFormData; locale?: string }) => {
  const t = i18n[locale as keyof typeof i18n] || i18n.es;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: COLORS.bgGray, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>

              {/* Main Container */}
              <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="600" style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>

                {/* Header - Fuera del card */}
                <tr>
                  <td style={{ padding: '0 0 20px 0', textAlign: 'center' }}>
                    <div style={{ backgroundColor: COLORS.black, padding: '20px', borderRadius: '8px' }}>
                      <h1 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 'bold', color: COLORS.white, letterSpacing: '1px' }}>
                        {t.newLead}
                      </h1>
                      <p style={{ margin: 0, fontSize: '13px', color: COLORS.lightGray }}>
                        {t.contactForm}
                      </p>
                    </div>
                  </td>
                </tr>

                {/* White Card Container */}
                <tr>
                  <td style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ maxWidth: '520px', margin: '0 auto' }}>

                      {/* Alert */}
                      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: COLORS.black }}>
                          {t.respondIn24}
                        </p>
                      </div>

                      {/* Contact Information - Markdown Style */}
                      <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.contactInformation}
                        </h2>
                        <div style={{ padding: '15px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                          <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: COLORS.black }}>
                            <strong>{formData.fullName}</strong>
                          </p>
                          <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: COLORS.gray }}>
                            <a href={`mailto:${formData.email}`} style={{ color: COLORS.black, textDecoration: 'underline' }}>{formData.email}</a>
                          </p>
                          <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: COLORS.gray }}>
                            <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} style={{ color: COLORS.black, textDecoration: 'underline' }}>WhatsApp: {formData.whatsapp}</a>
                          </p>
                          {formData.role && (
                            <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                              {formData.role}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Company Information - Markdown Style */}
                      <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.companyInformation}
                        </h2>
                        <div style={{ padding: '15px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                          <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: COLORS.black }}>
                            <strong>{formData.company}</strong>
                          </p>
                          {formData.websiteUrl && (
                            <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: COLORS.gray }}>
                              <a href={formData.websiteUrl} style={{ color: COLORS.black, textDecoration: 'underline' }}>{formData.websiteUrl}</a>
                            </p>
                          )}
                          {formData.companySize && (
                            <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: COLORS.gray }}>
                              {t.companySize[formData.companySize as keyof typeof t.companySize]}
                            </p>
                          )}
                          {formData.industry && (
                            <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                              {t.industryOptions[formData.industry as keyof typeof t.industryOptions]}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Services Required - Markdown Style */}
                      <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.servicesRequired}
                        </h2>
                        <div style={{ padding: '15px', backgroundColor: COLORS.black, borderRadius: '4px' }}>
                          {formData.need.map((need, index) => (
                            <p key={index} style={{ margin: index < formData.need.length - 1 ? '0 0 8px 0' : 0, fontSize: '14px', color: COLORS.white }}>
                              • {t.needOptions[need as keyof typeof t.needOptions]}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Summary if available - Markdown Style */}
                      {formData.summary && (
                        <div style={{ marginBottom: '30px' }}>
                          <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {t.projectSummary}
                          </h2>
                          <div style={{ padding: '20px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.8', color: COLORS.black, textAlign: 'justify', fontStyle: 'italic' }}>
                              {formData.summary}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${COLORS.lightGray}` }}>
                        <a href={`mailto:${formData.email}?subject=Re: ${locale === 'en' ? 'Your request at Dreeeams' : 'Tu solicitud en Dreeeams'}`} style={{ flex: 1, display: 'block', backgroundColor: COLORS.black, color: COLORS.white, textAlign: 'center', padding: '15px 10px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: '4px' }}>
                          {t.replyEmail}
                        </a>
                        <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} style={{ flex: 1, display: 'block', backgroundColor: COLORS.white, color: COLORS.black, textAlign: 'center', padding: '15px 10px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', border: `2px solid ${COLORS.black}`, borderRadius: '4px' }}>
                          WhatsApp
                        </a>
                      </div>

                    </div>
                  </td>
                </tr>

                {/* Footer - Fuera del card */}
                <tr>
                  <td style={{ padding: '30px 0 0 0', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '600', color: COLORS.black }}>
                      {t.notificationSystem}
                    </p>
                    <p style={{ margin: 0, fontSize: '11px', color: COLORS.gray }}>
                      {t.automaticEmail}
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

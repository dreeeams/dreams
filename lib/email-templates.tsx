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
};

// Traducción de valores para el email
const translations = {
  companySize: {
    '1-10': '1-10 empleados',
    '11-50': '11-50 empleados',
    '51-200': '51-200 empleados',
    '201-500': '201-500 empleados',
    '500+': '500+ empleados',
  },
  industry: {
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
  need: {
    landing: 'Landing Page',
    webapp: 'Aplicación Web',
    mobile: 'App Móvil',
    chatbot: 'Chatbot/IA',
    automation: 'Automatización',
    design: 'Diseño UI/UX',
    other: 'Otro',
  },
  heardFrom: {
    google: 'Google',
    social: 'Redes Sociales',
    referral: 'Referido',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    event: 'Evento',
    other: 'Otro',
  },
};

// Email de confirmación al usuario
export const UserConfirmationEmail = ({ formData }: { formData: ContactFormData }) => {
  const firstName = formData.fullName.split(' ')[0];

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: COLORS.white, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>

              {/* Main Container */}
              <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="600" style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>

                {/* Logo/Brand */}
                <tr>
                  <td style={{ padding: '0 0 40px 0', borderBottom: `1px solid ${COLORS.black}` }}>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: COLORS.black, letterSpacing: '2px' }}>
                      DREEEAMS
                    </h1>
                  </td>
                </tr>

                {/* Main Content */}
                <tr>
                  <td style={{ padding: '40px 0' }}>
                    <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: COLORS.black }}>
                      Gracias por contactarnos, {firstName}
                    </h2>
                    <p style={{ margin: '0 0 30px 0', fontSize: '15px', lineHeight: '1.6', color: COLORS.gray }}>
                      Hemos recibido tu solicitud y revisaremos la información sobre {formData.company} en detalle.
                    </p>

                    {/* Info Box */}
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', marginBottom: '30px' }}>
                      <tr>
                        <td style={{ padding: '20px', backgroundColor: COLORS.lightGray, border: `1px solid ${COLORS.black}` }}>
                          <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Resumen de tu solicitud
                          </p>
                          <p style={{ margin: '0 0 5px 0', fontSize: '15px', color: COLORS.black }}>
                            {formData.company}
                          </p>
                          <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                            {formData.need.map(n => translations.need[n as keyof typeof translations.need]).join(', ')}
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Next Steps */}
                    <p style={{ margin: '0 0 15px 0', fontSize: '13px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Próximos pasos
                    </p>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', marginBottom: '30px' }}>
                      <tr>
                        <td style={{ padding: '10px 0', borderLeft: `2px solid ${COLORS.black}`, paddingLeft: '15px' }}>
                          <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                            Revisaremos tu solicitud en las próximas 24 horas
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', borderLeft: `2px solid ${COLORS.black}`, paddingLeft: '15px' }}>
                          <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                            Te contactaremos para agendar una llamada inicial
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '10px 0', borderLeft: `2px solid ${COLORS.black}`, paddingLeft: '15px' }}>
                          <p style={{ margin: 0, fontSize: '14px', color: COLORS.gray }}>
                            Discutiremos tu proyecto y prepararemos una propuesta detallada
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Contact Info */}
                    <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: COLORS.gray }}>
                      Si tienes preguntas, puedes contactarnos:
                    </p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: COLORS.black }}>
                      Email: <a href="mailto:info@dreeeams.com" style={{ color: COLORS.black, textDecoration: 'underline' }}>info@dreeeams.com</a>
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: COLORS.black }}>
                      WhatsApp: {formData.whatsapp}
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '30px 0 0 0', borderTop: `1px solid ${COLORS.lightGray}` }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', fontWeight: '600', color: COLORS.black }}>
                      DREEEAMS
                    </p>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: COLORS.gray }}>
                      Agencia Digital | Construcción de soluciones tecnológicas
                    </p>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: COLORS.gray }}>
                      <a href="https://dreeeams.com/privacy" style={{ color: COLORS.gray, textDecoration: 'underline' }}>Política de Privacidad</a>
                      {' | '}
                      <a href="https://dreeeams.com/terms" style={{ color: COLORS.gray, textDecoration: 'underline' }}>Términos y Condiciones</a>
                    </p>
                    <p style={{ margin: '0 0 10px 0', fontSize: '11px', lineHeight: '1.5', color: COLORS.gray }}>
                      Este correo contiene información confidencial dirigida exclusivamente al destinatario indicado.
                      Si has recibido este mensaje por error, por favor elimínalo y notifícanos.
                    </p>
                    <p style={{ margin: 0, fontSize: '11px', color: COLORS.gray }}>
                      © 2024 Dreeeams. Todos los derechos reservados.
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
export const AdminNotificationEmail = ({ formData }: { formData: ContactFormData }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: COLORS.white, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>

              {/* Main Container */}
              <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="600" style={{ borderCollapse: 'collapse', maxWidth: '600px' }}>

                {/* Header */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', backgroundColor: COLORS.black, padding: '20px' }}>
                      <tr>
                        <td>
                          <h1 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 'bold', color: COLORS.white, letterSpacing: '1px' }}>
                            NUEVO LEAD
                          </h1>
                          <p style={{ margin: 0, fontSize: '13px', color: COLORS.lightGray }}>
                            Formulario de Contacto
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Alert */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', backgroundColor: COLORS.lightGray, border: `2px solid ${COLORS.black}` }}>
                      <tr>
                        <td style={{ padding: '15px' }}>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: COLORS.black }}>
                            Responder en 24 horas para maximizar conversión
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Contact Information */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Información de Contacto
                    </h2>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
                      <tr>
                        <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Nombre:</span>{' '}
                          <strong style={{ fontSize: '14px', color: COLORS.black }}>{formData.fullName}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Email:</span>{' '}
                          <a href={`mailto:${formData.email}`} style={{ fontSize: '14px', color: COLORS.black, textDecoration: 'underline' }}>{formData.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>WhatsApp:</span>{' '}
                          <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} style={{ fontSize: '14px', color: COLORS.black, textDecoration: 'underline' }}>{formData.whatsapp}</a>
                        </td>
                      </tr>
                      {formData.linkedin && (
                        <tr>
                          <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                            <span style={{ fontSize: '13px', color: COLORS.gray }}>LinkedIn:</span>{' '}
                            <a href={formData.linkedin} style={{ fontSize: '14px', color: COLORS.black, textDecoration: 'underline' }}>{formData.linkedin}</a>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ padding: '8px 0' }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Cargo:</span>{' '}
                          <strong style={{ fontSize: '14px', color: COLORS.black }}>{formData.role}</strong>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Company Information */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Información de la Empresa
                    </h2>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
                      <tr>
                        <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Empresa:</span>{' '}
                          <strong style={{ fontSize: '15px', color: COLORS.black }}>{formData.company}</strong>
                        </td>
                      </tr>
                      {formData.websiteUrl && (
                        <tr>
                          <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                            <span style={{ fontSize: '13px', color: COLORS.gray }}>Sitio Web:</span>{' '}
                            <a href={formData.websiteUrl} style={{ fontSize: '14px', color: COLORS.black, textDecoration: 'underline' }}>{formData.websiteUrl}</a>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ padding: '8px 0', borderBottom: `1px solid ${COLORS.lightGray}` }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Tamaño:</span>{' '}
                          <span style={{ fontSize: '14px', color: COLORS.black }}>{translations.companySize[formData.companySize as keyof typeof translations.companySize]}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px 0' }}>
                          <span style={{ fontSize: '13px', color: COLORS.gray }}>Industria:</span>{' '}
                          <span style={{ fontSize: '14px', color: COLORS.black }}>{translations.industry[formData.industry as keyof typeof translations.industry]}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Services Required */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Servicios Requeridos
                    </h2>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', backgroundColor: COLORS.black }}>
                      {formData.need.map((need, index) => (
                        <tr key={index}>
                          <td style={{ padding: '12px 20px', borderBottom: index < formData.need.length - 1 ? `1px solid ${COLORS.gray}` : 'none' }}>
                            <span style={{ fontSize: '14px', color: COLORS.white, fontWeight: '500' }}>
                              ■ {translations.need[need as keyof typeof translations.need]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </td>
                </tr>

                {/* Summary if available */}
                {formData.summary && (
                  <tr>
                    <td style={{ padding: '0 0 30px 0' }}>
                      <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Resumen del Proyecto
                      </h2>
                      <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse', backgroundColor: COLORS.lightGray, border: `1px solid ${COLORS.black}` }}>
                        <tr>
                          <td style={{ padding: '20px' }}>
                            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.7', color: COLORS.black, fontStyle: 'italic' }}>
                              {formData.summary}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                )}

                {/* Action Buttons */}
                <tr>
                  <td style={{ padding: '0 0 30px 0' }}>
                    <table role="presentation" cellPadding="0" cellSpacing="0" border={0} width="100%" style={{ borderCollapse: 'collapse' }}>
                      <tr>
                        <td style={{ padding: '0 5px 0 0' }} width="50%">
                          <a href={`mailto:${formData.email}?subject=Re: Tu solicitud en Dreeeams`} style={{ display: 'block', backgroundColor: COLORS.black, color: COLORS.white, textAlign: 'center', padding: '15px 10px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${COLORS.black}` }}>
                            Responder Email
                          </a>
                        </td>
                        <td style={{ padding: '0 0 0 5px' }} width="50%">
                          <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} style={{ display: 'block', backgroundColor: COLORS.white, color: COLORS.black, textAlign: 'center', padding: '15px 10px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${COLORS.black}` }}>
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ padding: '20px 0 0 0', borderTop: `1px solid ${COLORS.lightGray}`, textAlign: 'center' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '12px', fontWeight: '600', color: COLORS.black }}>
                      DREEEAMS - SISTEMA DE NOTIFICACIONES
                    </p>
                    <p style={{ margin: 0, fontSize: '11px', color: COLORS.gray }}>
                      Este es un correo automático del sistema interno
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

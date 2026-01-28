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

// Brand colors from Dreeeams
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#787878',
  lightGray: '#F5F5F5',
  darkGray: '#1E1E1E',
  border: '#000000',
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

// Logo SVG inline
const DreamStudioLogo = () => (
  <svg width="40" height="46" viewBox="0 0 97 114" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor"/>
  </svg>
);

// Email de confirmación al usuario
export const UserConfirmationEmail = ({ formData }: { formData: ContactFormData }) => {
  const firstName = formData.fullName.split(' ')[0];

  return (
    <html>
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: ${COLORS.darkGray};
            background-color: ${COLORS.lightGray};
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: ${COLORS.white};
            border: 4px solid ${COLORS.black};
          }
          .header {
            background-color: ${COLORS.black};
            padding: 40px 30px;
            border-bottom: 4px solid ${COLORS.black};
          }
          .logo-container {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
          }
          .logo {
            color: ${COLORS.white};
          }
          .brand-name {
            font-size: 24px;
            font-weight: bold;
            color: ${COLORS.white};
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .tagline {
            font-size: 12px;
            color: ${COLORS.gray};
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 24px;
            color: ${COLORS.black};
            line-height: 1.3;
          }
          .text {
            font-size: 16px;
            margin-bottom: 20px;
            color: ${COLORS.darkGray};
            line-height: 1.7;
          }
          .divider {
            width: 60px;
            height: 4px;
            background-color: ${COLORS.black};
            margin: 30px 0;
          }
          .info-box {
            background-color: ${COLORS.lightGray};
            border: 3px solid ${COLORS.black};
            padding: 24px;
            margin: 30px 0;
          }
          .info-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            color: ${COLORS.gray};
          }
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: ${COLORS.black};
            margin-bottom: 8px;
          }
          .timeline {
            margin: 30px 0;
          }
          .timeline-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: ${COLORS.black};
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .timeline-item {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
            padding-left: 24px;
            position: relative;
          }
          .timeline-item:before {
            content: '';
            position: absolute;
            left: 0;
            top: 8px;
            width: 12px;
            height: 12px;
            background-color: ${COLORS.black};
          }
          .timeline-text {
            font-size: 15px;
            color: ${COLORS.darkGray};
          }
          .contact-info {
            background-color: ${COLORS.black};
            color: ${COLORS.white};
            padding: 24px;
            margin: 30px 0;
          }
          .contact-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
          }
          .contact-item {
            font-size: 15px;
            margin-bottom: 8px;
          }
          .contact-link {
            color: ${COLORS.white};
            text-decoration: underline;
          }
          .footer {
            background-color: ${COLORS.lightGray};
            padding: 30px;
            border-top: 4px solid ${COLORS.black};
            text-align: center;
          }
          .footer-text {
            font-size: 12px;
            color: ${COLORS.gray};
            margin: 8px 0;
          }
          .footer-link {
            color: ${COLORS.gray};
            text-decoration: none;
            margin: 0 8px;
          }
          .footer-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="logo-container">
              <div className="logo">
                <DreamStudioLogo />
              </div>
              <div>
                <div className="brand-name">DREAM STUDIO</div>
                <div className="tagline">Building Digital Experiences</div>
              </div>
            </div>
          </div>

          <div className="content">
            <h1 className="title">Gracias por contactarnos, {firstName}</h1>

            <p className="text">
              Hemos recibido tu solicitud y estamos emocionados de conocer más sobre {formData.company}.
            </p>

            <div className="divider"></div>

            <div className="info-box">
              <div className="info-label">Resumen de tu solicitud</div>
              <div className="info-value">{formData.company}</div>
              <div className="info-value">{formData.need.map(n => translations.need[n as keyof typeof translations.need]).join(', ')}</div>
            </div>

            <div className="timeline">
              <div className="timeline-title">Próximos pasos</div>
              <div className="timeline-item">
                <div className="timeline-text">Revisaremos tu solicitud en las próximas 24 horas</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-text">Te contactaremos para agendar una llamada de descubrimiento</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-text">Discutiremos tu proyecto y crearemos una propuesta personalizada</div>
              </div>
            </div>

            <div className="divider"></div>

            <p className="text">
              Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos:
            </p>

            <div className="contact-info">
              <div className="contact-title">Contacto</div>
              <div className="contact-item">
                Email: <a href="mailto:info@dreeeams.com" className="contact-link">info@dreeeams.com</a>
              </div>
              <div className="contact-item">
                WhatsApp: {formData.whatsapp}
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="footer-text">DREAM STUDIO</div>
            <div className="footer-text">
              <a href="https://dreeeams.com/privacy" className="footer-link">Privacidad</a>
              <span>|</span>
              <a href="https://dreeeams.com/terms" className="footer-link">Términos</a>
            </div>
            <div className="footer-text" style={{ marginTop: 16 }}>
              2024 Dreeeams. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

// Email de notificación al admin
export const AdminNotificationEmail = ({ formData }: { formData: ContactFormData }) => {
  return (
    <html>
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: ${COLORS.darkGray};
            background-color: ${COLORS.lightGray};
            padding: 40px 20px;
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: ${COLORS.white};
            border: 4px solid ${COLORS.black};
          }
          .header {
            background-color: ${COLORS.black};
            padding: 30px;
            border-bottom: 4px solid ${COLORS.black};
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            color: ${COLORS.white};
          }
          .header-title {
            font-size: 32px;
            font-weight: bold;
            color: ${COLORS.white};
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .header-subtitle {
            font-size: 13px;
            color: ${COLORS.gray};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 8px;
          }
          .priority-badge {
            background-color: ${COLORS.white};
            color: ${COLORS.black};
            padding: 8px 16px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 3px solid ${COLORS.black};
          }
          .content {
            padding: 40px 30px;
          }
          .alert {
            background-color: ${COLORS.black};
            color: ${COLORS.white};
            padding: 20px;
            margin-bottom: 30px;
            border: 3px solid ${COLORS.black};
          }
          .alert-text {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .section {
            margin-bottom: 40px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 4px solid ${COLORS.black};
          }
          .data-grid {
            border: 3px solid ${COLORS.black};
          }
          .data-row {
            display: flex;
            border-bottom: 1px solid ${COLORS.lightGray};
          }
          .data-row:last-child {
            border-bottom: none;
          }
          .data-row:nth-child(even) {
            background-color: ${COLORS.lightGray};
          }
          .data-label {
            flex: 0 0 35%;
            padding: 16px 20px;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-right: 3px solid ${COLORS.black};
            background-color: ${COLORS.lightGray};
          }
          .data-value {
            flex: 1;
            padding: 16px 20px;
            font-size: 15px;
          }
          .data-link {
            color: ${COLORS.black};
            text-decoration: underline;
            font-weight: 600;
          }
          .services-list {
            background-color: ${COLORS.black};
            color: ${COLORS.white};
            padding: 24px 28px;
            border: 3px solid ${COLORS.black};
          }
          .services-item {
            padding: 12px 0;
            border-bottom: 1px solid ${COLORS.gray};
            font-size: 15px;
            font-weight: 500;
          }
          .services-item:last-child {
            border-bottom: none;
          }
          .services-item:before {
            content: '■';
            margin-right: 12px;
          }
          .summary-box {
            background-color: ${COLORS.lightGray};
            border: 3px solid ${COLORS.black};
            padding: 24px;
            font-size: 15px;
            line-height: 1.7;
            font-style: italic;
          }
          .actions {
            display: flex;
            gap: 16px;
            margin-top: 40px;
          }
          .action-button {
            flex: 1;
            background-color: ${COLORS.black};
            color: ${COLORS.white};
            padding: 16px 24px;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 3px solid ${COLORS.black};
            display: block;
          }
          .footer {
            background-color: ${COLORS.black};
            color: ${COLORS.white};
            padding: 24px;
            text-align: center;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="header-content">
              <div>
                <div className="header-title">NUEVO LEAD</div>
                <div className="header-subtitle">Formulario de Contacto</div>
              </div>
              <div className="priority-badge">URGENTE</div>
            </div>
          </div>

          <div className="content">
            <div className="alert">
              <div className="alert-text">Responder en 24 horas para maximizar conversión</div>
            </div>

            <div className="section">
              <h2 className="section-title">Información de Contacto</h2>
              <div className="data-grid">
                <div className="data-row">
                  <div className="data-label">Nombre</div>
                  <div className="data-value">{formData.fullName}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Email</div>
                  <div className="data-value">
                    <a href={`mailto:${formData.email}`} className="data-link">{formData.email}</a>
                  </div>
                </div>
                <div className="data-row">
                  <div className="data-label">WhatsApp</div>
                  <div className="data-value">
                    <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} className="data-link">
                      {formData.whatsapp}
                    </a>
                  </div>
                </div>
                {formData.linkedin && (
                  <div className="data-row">
                    <div className="data-label">LinkedIn</div>
                    <div className="data-value">
                      <a href={formData.linkedin} className="data-link">{formData.linkedin}</a>
                    </div>
                  </div>
                )}
                <div className="data-row">
                  <div className="data-label">Cargo</div>
                  <div className="data-value">{formData.role}</div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Información de la Empresa</h2>
              <div className="data-grid">
                <div className="data-row">
                  <div className="data-label">Empresa</div>
                  <div className="data-value"><strong>{formData.company}</strong></div>
                </div>
                {formData.websiteUrl && (
                  <div className="data-row">
                    <div className="data-label">Sitio Web</div>
                    <div className="data-value">
                      <a href={formData.websiteUrl} className="data-link">{formData.websiteUrl}</a>
                    </div>
                  </div>
                )}
                {formData.instagram && (
                  <div className="data-row">
                    <div className="data-label">Instagram</div>
                    <div className="data-value">{formData.instagram}</div>
                  </div>
                )}
                <div className="data-row">
                  <div className="data-label">Tamaño</div>
                  <div className="data-value">{translations.companySize[formData.companySize as keyof typeof translations.companySize]}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Industria</div>
                  <div className="data-value">{translations.industry[formData.industry as keyof typeof translations.industry]}</div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Servicios Requeridos</h2>
              <div className="services-list">
                {formData.need.map((need, index) => (
                  <div key={index} className="services-item">
                    {translations.need[need as keyof typeof translations.need]}
                  </div>
                ))}
              </div>
            </div>

            {formData.summary && (
              <div className="section">
                <h2 className="section-title">Descripción del Proyecto</h2>
                <div className="summary-box">
                  {formData.summary}
                </div>
              </div>
            )}

            <div className="section">
              <h2 className="section-title">Información Adicional</h2>
              <div className="data-grid">
                {formData.heardFrom && (
                  <div className="data-row">
                    <div className="data-label">Fuente</div>
                    <div className="data-value">{translations.heardFrom[formData.heardFrom as keyof typeof translations.heardFrom]}</div>
                  </div>
                )}
                <div className="data-row">
                  <div className="data-label">Fecha</div>
                  <div className="data-value">{new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</div>
                </div>
              </div>
            </div>

            <div className="actions">
              <a href={`mailto:${formData.email}?subject=Re: Tu solicitud en Dreeeams`} className="action-button">
                Responder Email
              </a>
              <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} className="action-button">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="footer">
            Dreeeams - Sistema de Notificaciones
          </div>
        </div>
      </body>
    </html>
  );
};

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
  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #000000;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background-color: #FF6B35;
            padding: 40px 20px;
            text-align: center;
            border: 4px solid #000000;
            border-bottom: none;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 2px;
          }
          .content {
            padding: 40px 30px;
            border: 4px solid #000000;
            border-top: none;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #000000;
          }
          .text {
            font-size: 16px;
            margin-bottom: 15px;
            color: #333333;
          }
          .box {
            background-color: #F5F5F5;
            border: 2px solid #000000;
            padding: 20px;
            margin: 25px 0;
          }
          .box-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .next-steps {
            background-color: #000000;
            color: #ffffff;
            padding: 20px;
            margin: 25px 0;
          }
          .next-steps h3 {
            margin-top: 0;
            font-size: 18px;
          }
          .step {
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
          }
          .step:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #FF6B35;
          }
          .footer {
            padding: 30px;
            text-align: center;
            border-top: 4px solid #000000;
            background-color: #F5F5F5;
          }
          .footer-text {
            font-size: 12px;
            color: #666666;
            margin: 5px 0;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #000000;
            text-decoration: none;
            font-size: 14px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="logo">DREAM STUDIO</div>
          </div>

          {/* Content */}
          <div className="content">
            <h1 className="title">¡Gracias por contactarnos, {formData.fullName.split(' ')[0]}! 🎉</h1>

            <p className="text">
              Hemos recibido tu solicitud y estamos emocionados de conocer más sobre tu proyecto.
            </p>

            <div className="box">
              <div className="box-title">📋 Resumen de tu solicitud</div>
              <p className="text">
                <strong>Empresa:</strong> {formData.company}<br/>
                <strong>Servicios de interés:</strong> {formData.need.map(n => translations.need[n as keyof typeof translations.need]).join(', ')}
              </p>
            </div>

            <div className="next-steps">
              <h3>🚀 Próximos pasos</h3>
              <div className="step">Revisaremos tu solicitud en las próximas 24 horas</div>
              <div className="step">Te contactaremos para agendar una llamada de descubrimiento</div>
              <div className="step">Discutiremos tu proyecto en detalle y crearemos una propuesta personalizada</div>
            </div>

            <p className="text">
              Mientras tanto, si tienes alguna pregunta urgente, no dudes en responder a este email o contactarnos directamente:
            </p>

            <div className="box">
              <p className="text" style={{ margin: 0 }}>
                📧 <strong>Email:</strong> info@dreeeams.com<br/>
                💬 <strong>WhatsApp:</strong> {formData.whatsapp}
              </p>
            </div>

            <p className="text" style={{ marginTop: 30, fontSize: 14, color: '#666666' }}>
              ¿Quieres conocer más sobre nuestro trabajo? Visita nuestro portfolio en <a href="https://dreeeams.com" style={{ color: '#FF6B35' }}>dreeeams.com</a>
            </p>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="social-links">
              <a href="https://linkedin.com/company/dreamstudio" className="social-link">LinkedIn</a>
              <a href="https://instagram.com/dreamstudio" className="social-link">Instagram</a>
              <a href="https://x.com/dreamstudio" className="social-link">Twitter</a>
            </div>
            <p className="footer-text">Dream Studio - Building Digital Experiences</p>
            <p className="footer-text">© 2024 Dream Studio. Todos los derechos reservados.</p>
            <p className="footer-text" style={{ marginTop: 15 }}>
              <a href="https://dreeeams.com/privacy" style={{ color: '#666666', textDecoration: 'underline' }}>Política de Privacidad</a> |
              <a href="https://dreeeams.com/terms" style={{ color: '#666666', textDecoration: 'underline', marginLeft: 5 }}>Términos de Servicio</a>
            </p>
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
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #000000;
            background-color: #F5F5F5;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
            padding: 30px;
            text-align: center;
            border: 4px solid #000000;
            border-bottom: none;
          }
          .header-title {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin: 0;
            letter-spacing: 1px;
          }
          .header-subtitle {
            font-size: 14px;
            color: #ffffff;
            margin-top: 5px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
            border: 4px solid #000000;
            border-top: none;
          }
          .alert {
            background-color: #FFF3CD;
            border: 2px solid #FFC107;
            padding: 15px;
            margin-bottom: 25px;
            border-radius: 4px;
          }
          .alert-text {
            margin: 0;
            font-size: 14px;
            color: #856404;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 3px solid #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .data-grid {
            display: table;
            width: 100%;
            border: 2px solid #000000;
          }
          .data-row {
            display: table-row;
          }
          .data-row:nth-child(even) {
            background-color: #F5F5F5;
          }
          .data-label {
            display: table-cell;
            padding: 12px 15px;
            font-weight: bold;
            width: 35%;
            border-right: 2px solid #000000;
            border-bottom: 1px solid #DDDDDD;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .data-value {
            display: table-cell;
            padding: 12px 15px;
            border-bottom: 1px solid #DDDDDD;
            font-size: 14px;
          }
          .needs-list {
            background-color: #000000;
            color: #ffffff;
            padding: 15px 20px;
            margin: 15px 0;
          }
          .needs-list-item {
            padding: 8px 0;
            border-bottom: 1px solid #333333;
          }
          .needs-list-item:last-child {
            border-bottom: none;
          }
          .summary-box {
            background-color: #F5F5F5;
            border: 2px solid #000000;
            padding: 20px;
            margin: 15px 0;
            font-style: italic;
          }
          .action-buttons {
            display: table;
            width: 100%;
            margin-top: 30px;
          }
          .action-button {
            display: table-cell;
            text-align: center;
            padding: 15px;
            background-color: #FF6B35;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border: 3px solid #000000;
            margin: 0 5px;
          }
          .footer {
            padding: 20px;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            font-size: 12px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1 className="header-title">🎯 NUEVO LEAD</h1>
            <p className="header-subtitle">Formulario de contacto - Dream Studio</p>
          </div>

          {/* Content */}
          <div className="content">
            <div className="alert">
              <p className="alert-text">
                <strong>⏰ Acción requerida:</strong> Responder en las próximas 24 horas para maximizar conversión
              </p>
            </div>

            {/* Información Personal */}
            <div className="section">
              <h2 className="section-title">👤 Información de Contacto</h2>
              <div className="data-grid">
                <div className="data-row">
                  <div className="data-label">Nombre Completo</div>
                  <div className="data-value">{formData.fullName}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Email</div>
                  <div className="data-value">
                    <a href={`mailto:${formData.email}`} style={{ color: '#FF6B35', textDecoration: 'none' }}>
                      {formData.email}
                    </a>
                  </div>
                </div>
                <div className="data-row">
                  <div className="data-label">WhatsApp</div>
                  <div className="data-value">
                    <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} style={{ color: '#FF6B35', textDecoration: 'none' }}>
                      {formData.whatsapp}
                    </a>
                  </div>
                </div>
                {formData.linkedin && (
                  <div className="data-row">
                    <div className="data-label">LinkedIn</div>
                    <div className="data-value">
                      <a href={formData.linkedin} style={{ color: '#FF6B35', textDecoration: 'none' }}>
                        {formData.linkedin}
                      </a>
                    </div>
                  </div>
                )}
                <div className="data-row">
                  <div className="data-label">Cargo</div>
                  <div className="data-value">{formData.role}</div>
                </div>
              </div>
            </div>

            {/* Información de la Empresa */}
            <div className="section">
              <h2 className="section-title">🏢 Información de la Empresa</h2>
              <div className="data-grid">
                <div className="data-row">
                  <div className="data-label">Empresa</div>
                  <div className="data-value"><strong>{formData.company}</strong></div>
                </div>
                {formData.websiteUrl && (
                  <div className="data-row">
                    <div className="data-label">Sitio Web</div>
                    <div className="data-value">
                      <a href={formData.websiteUrl} target="_blank" style={{ color: '#FF6B35', textDecoration: 'none' }}>
                        {formData.websiteUrl}
                      </a>
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

            {/* Necesidades del Proyecto */}
            <div className="section">
              <h2 className="section-title">🎯 Servicios Requeridos</h2>
              <div className="needs-list">
                {formData.need.map((need, index) => (
                  <div key={index} className="needs-list-item">
                    ✓ {translations.need[need as keyof typeof translations.need]}
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen del Proyecto */}
            {formData.summary && (
              <div className="section">
                <h2 className="section-title">📝 Descripción del Proyecto</h2>
                <div className="summary-box">
                  "{formData.summary}"
                </div>
              </div>
            )}

            {/* Información Adicional */}
            <div className="section">
              <h2 className="section-title">ℹ️ Información Adicional</h2>
              <div className="data-grid">
                {formData.heardFrom && (
                  <div className="data-row">
                    <div className="data-label">Cómo nos conoció</div>
                    <div className="data-value">{translations.heardFrom[formData.heardFrom as keyof typeof translations.heardFrom]}</div>
                  </div>
                )}
                <div className="data-row">
                  <div className="data-label">Fecha de solicitud</div>
                  <div className="data-value">{new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <a href={`mailto:${formData.email}?subject=Re: Tu solicitud en Dream Studio`} className="action-button">
                📧 Responder por Email
              </a>
              <a href={`https://wa.me/${formData.whatsapp.replace(/\D/g, '')}`} className="action-button">
                💬 Contactar por WhatsApp
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p style={{ margin: 0 }}>Dream Studio - Sistema de Notificaciones</p>
            <p style={{ margin: '5px 0 0 0', opacity: 0.7 }}>Este email fue generado automáticamente desde el formulario de contacto</p>
          </div>
        </div>
      </body>
    </html>
  );
};

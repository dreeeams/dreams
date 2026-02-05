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
  budget?: string;
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
    budget: 'Presupuesto',
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
      branding: 'Branding',
      webDesign: 'Diseño Web',
      websiteDevelopment: 'Desarrollo de Sitio Web',
      backend: 'Backend y APIs',
      aiDevelopment: 'Desarrollo con IA',
      ecommerce: 'E-commerce',
      integrations: 'Integraciones',
      consulting: 'Consultoría',
      workflowOptimization: 'Optimización de Flujos',
    },
    budgetOptions: {
      'less-2500': 'Menos de $2,500',
      '2500-5000': '$2,500 - $5,000',
      '5000-10000': '$5,000 - $10,000',
      '10000-15000': '$10,000 - $15,000',
      '15000-20000': '$15,000 - $20,000',
      '20000-30000': '$20,000 - $30,000',
      'more-30000': 'Más de $30,000',
      'dont-know': 'No lo sé',
    },
    referralLabel: 'Cómo nos conoció',
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
    budget: 'Budget',
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
      branding: 'Branding',
      webDesign: 'Web Design',
      websiteDevelopment: 'Website Development',
      backend: 'Backend & APIs',
      aiDevelopment: 'AI Development',
      ecommerce: 'E-commerce',
      integrations: 'Integrations',
      consulting: 'Consulting',
      workflowOptimization: 'Workflow Optimization',
    },
    budgetOptions: {
      'less-2500': 'Less than $2,500',
      '2500-5000': '$2,500 - $5,000',
      '5000-10000': '$5,000 - $10,000',
      '10000-15000': '$10,000 - $15,000',
      '15000-20000': '$15,000 - $20,000',
      '20000-30000': '$20,000 - $30,000',
      'more-30000': 'More than $30,000',
      'dont-know': "I don't know",
    },
    referralLabel: 'How did you hear about us',
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
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQyIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMzQyIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzQuMzk2MyA0LjI1MzYxSDQwLjM1ODdWMTEuOTgzNUgzNC4zOTYzVjQuMjUzNjFaTTM0LjM5NjMgMTcuMjgyOEg0MC4zNTg3Vjg1Ljc0NjVIMzQuMzk2M1YxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNNTQuOTgxNSAxNy4yODI4SDYxLjYyMDZMMzkuMTQxNiA4NS43NDY1SDMyLjY1NDVMNTQuOTgxNSAxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNNzYuODI5OCA0NS4yNDc2VjE3LjI4MjhIODEuNjUzNEw4Mi43MTk5IDIyLjcxMDRIODIuODcyNUM4NC44NTI1IDIwLjYxODcgODcuMTA2NSAxOC43NTMyIDg5LjYzNDIgMTcuMTEzOUM5Mi4yMDk1IDE1LjQ3NDYgOTQuOTgyNSAxNC42NTQ4IDk3Ljk1MzIgMTQuNjU0OEMxMDQuMzA2IDE0LjY1NDggMTA5LjM5NiAxNi42NDYgMTEzLjIyMiAyMC42Mjg0QzExNy4wOTUgMjQuNjExIDExOC45NTUgMzAuMzE0NSAxMTguODAyIDM3LjczODdWODUuNzQ2NUgxMTIuODQxVjQwLjMzNjJDMTEyLjg0MSAzNC44MTU3IDExMS42OTggMzAuNzM1NSAxMDkuNDExIDI4LjA5NTZDMTA3LjEyNSAyNS40NTU2IDEwMy43NzEgMjQuMTM1NyA5OS4zNTAyIDI0LjEzNTdDOTYuODIyNSAyNC4xMzU3IDk0LjM5ODcgMjQuNzI2OCA5Mi4wNzkzIDI1LjkwOUM4OS43NTk5IDI3LjA5MTIgODcuODUzMyAyOC41NjU3IDg2LjM1OTkgMzAuMzMzQzg0LjkxNCAzMi4wNDg4IDg0LjA1NTkgMzMuODY1NSA4My43ODU5IDM1Ljc4MzNDODMuNTE1OSAzNy43MDE0IDgzLjM4MSAzOS41NzY2IDgzLjM4MSA0MS40MDkyVjg1Ljc0NjVINzYuODI5OFY0NS4yNDc2WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMTMxLjc3MyAxNy4yODI4SDEzOC40MTJMMTE1LjkzMyA4NS43NDY1SDEwOS40NDZMMTMxLjc3MyAxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMTU3LjM1OSAzOS41OTI3QzE1Ny4zMTMgMzUuMTU5MiAxNTYuMjAzIDMxLjcwNzEgMTU0LjAzIDI5LjIzNjFDMTUxLjg1NSAyNi43NjUyIDE0OC43MjUgMjUuNTI5NyAxNDQuNjM5IDI1LjUyOTdDMTQxLjExMSAyNS41Mjk3IDEzOC4yNzggMjYuNDEgMTM2LjE0MiAyOC4xNzAyQzEzNC4wMDUgMjkuOTMwNCAxMzIuNDU5IDMyLjA1NTggMTMxLjUwMSAzNC41NDY1QzEzMC41NDQgMzcuMDM3MyAxMzAuMDY2IDM5LjU0MjEgMTMwLjA2NiA0Mi4wNjEzQzEzMC4wNjYgNDguMjg0OCAxMzAuNjExIDUzLjYyMyAxMzEuNzA0IDU4LjA3NTZDMTMyLjc5NiA2Mi41MjgyIDEzNC4zOTkgNjYuMjA5MSAxMzYuNTE1IDY5LjExODVDMTM4LjYzIDcyLjAyNzkgMTQxLjE2OCA3NC4yMDY5IDE0NC4xMjggNzUuNjU1QzE0Ny4wODggNzcuMTA1MyAxNTAuNDA3IDc3LjgyOTUgMTU0LjA4NiA3Ny44Mjk1QzE2MC42ODUgNzcuODI5NSAxNjUuNzczIDc1LjU2MDcgMTY5LjM1MSA3MS4wMjMxQzE3Mi45MjcgNjYuNDg1NSAxNzQuODIzIDYwLjMzODggMTc1LjAzNyA1Mi41ODIzSDEzOC41MThWNDYuNTE5M0gxODEuNzRWNTIuNDA5MkMxODEuNzg3IDU3Ljk2MiAxODAuNTE2IDYyLjk3NzggMTc3LjkyNyA2Ny40NTY4QzE3NS4zODcgNzEuODkwMiAxNzEuNjg0IDc1LjMzNDkgMTY2LjgyMSA3Ny43OTA2QzE2MS45NTggODAuMjAwOCAxNTYuMDIzIDgxLjQwNTkgMTQ5LjAxNyA4MS40MDU5QzE0My4xMTEgODEuNDA1OSAxMzcuODk0IDgwLjE5MzYgMTMzLjM2OCA3Ny43Njg5QzEyOC44NDMgNzUuMzQ0MiAxMjUuMTU4IDcyLjA5OTEgMTIyLjMxNSA2OC4wMzJDMTE5LjQ3MyA2My45NjUyIDExNy41MTcgNTkuMzM5IDExNi40NDkgNTQuMTU0QzExNS4zOCA0OC45Njg5IDExNC44NDYgNDMuNjE3NyAxMTQuODQ2IDM4LjEwMDFDMTE0Ljg0NiAzMy4wMDE2IDExNS40MTkgMjguMTQ3NCAxMTYuNTY1IDIzLjUzODFDMTE3LjcxMSAxOC44ODI0IDExOS41ODIgMTQuODg0MiAxMjIuMTc2IDExLjU0NTRDMTI0Ljc3MSA4LjIwNjU1IDEyOC4wODUgNS42MjQ5NiAxMzIuMTE4IDMuODAwMzlDMTM2LjE5OCAxLjkzMDc1IDE0MC45OTQgMC45OTU5NDcgMTQ2LjUwOCAwLjk5NTk0N0MxNTEuNTMxIDAuOTk1OTQ3IDE1Ni4wMzYgMS44NDk0OSAxNjAuMDI0IDMuNTU1NjRDMTY0LjAxMSA1LjI2MTc5IDE2Ny4zNTQgNy42MjQ3NyAxNzAuMDUxIDEwLjY0NDlDMTcyLjc0OCAxMy42NjUzIDE3NC43OTEgMTcuMTkxIDE3Ni4xODIgMjEuMjIxOUMxNzcuNjIxIDI1LjI1MjkgMTc4LjM4NyAyOS41OTY3IDE3OC40NzkgMzQuMjUyNkgxNTcuMzU5VjM5LjU5MjdaIiBmaWxsPSIjMUMxQzFDIi8+CjxwYXRoIGQ9Ik0yMDguNjc5IDg1Ljc0NjVIMTkyLjgxOVYyNS45MjE5SDE4NC4yNTZWMTcuMjgyOEgxOTIuODE5VjguNTYwNDJDMTkyLjgxOSA2LjM4Mzk0IDE5My4wNTggNC4wODYyOSAxOTMuNTM1IDEuNjY3NDJDMTk0LjAxMiAtMC43NTA5OTggMTk0Ljg4NCAtMy4xNTk0NiAxOTYuMTQ3IC01LjU1NjM2QzE5Ny40NjMgLTcuOTUzNzEgMTk5LjIwNiAtMTAuMTk1MyAyMDEuMzc3IC0xMi4yODE3QzIwMy41OTQgLTE0LjM2NzggMjA2LjMwNCAtMTYuMDY4OSAyMDkuNTA1IC0xNy4zODU2QzIxMi43MDYgLTE4LjcwMTkgMjE2LjQ4IC0xOS4zNjAzIDIyMC44MjYgLTE5LjM2MDNIMjMwLjMwM1YtMTEuODc3OEgyMjMuMTc1QzIyMC4yMTYgLTExLjg3NzggMjE3LjY3MyAtMTEuMjU4NSAyMTUuNTQ5IC0xMC4wMjAxQzIxMy40NzIgLTguNzgxODIgMjExLjg3NCAtNy4xNzkyOCAyMTAuNzU1IC01LjIxMDk2QzIwOS42MzYgLTMuMjQyNjQgMjA5LjAzMyAtMS4yNDc5NiAyMDguOTQzIDEuMzU0MDhWMTcuMjgyOEgyMjcuODY4VjI1LjkyMTlIMjA4LjY3OVY4NS43NDY1WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMjQwLjU0OSAxNy4yODI4SDIzMS4xMDVWOC40MDM3OUgyMzQuNDc4VjQuMjUzNjFIMjQwLjU0OVYxNy4yODI4Wk0yMzQuNjc3IDg1Ljc0NjVWMjUuOTIxOUgyNDAuNTQ5Vjg1Ljc0NjVIMjM0LjY3N1oiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTI4NC4wNjMgMTcuMjgyOFYyNS45MjE5SDI4MC4zMjNWMzcuOTIxQzI4MC4zMjMgNDIuODA0NiAyNzguOTQzIDQ2Ljk4ODcgMjc2LjE4MSA1MC40NzM2QzI3My40MTkgNTMuOTU4NCAyNjkuNzM3IDU2Ljc0NzcgMjY1LjEzNSA1OC44NDAxQzI2MC41MzMgNjAuOTMyNiAyNTUuMzI3IDYxLjk3ODggMjQ5LjUxOCA2MS45Nzg4QzI0Mi4xODcgNjEuOTc4OCAyMzUuOTY5IDYwLjM0MjEgMjMwLjg2NCA1Ny4wNjg3QzIyNS43NTkgNTMuNzk1MyAyMjEuOTI1IDQ5LjI3ODYgMjE5LjM2NCA0My41MTkyQzIxNi44MDIgMzcuNzYgMjE1LjU4NSAzMS4xMjI1IDIxNS43MTMgMjMuNzA3QzIxNS44NDEgMTYuNzA4NSAyMTcuMTA4IDEwLjQ2NzMgMjE5LjUxMyA1LjAwODFDMjIxLjkyMSAtMC40NTA2NCAyMjUuNDY0IC00Ljk5NjIxIDIzMC4xNDMgLTguNjI4QzIzNC44MjMgLTEyLjI1OTggMjQwLjYxMSAtMTQuNTQ5NCAyNDcuNTExIC0xNS40OTYyQzI1NC40NiAtMTYuNDQyOCAyNjIuNDk1IC0xNS43MDI0IDI3MS42MTcgLTEzLjI3NTRMMjY5Ljc1OCAtOC4yOTcwOUMyNjIuNTQzIC0xMC4yMTY4IDI1Ni4xMTUgLTEwLjcxMTUgMjUwLjQ3NSAtOS43Nzk5MkMyNDQuODM4IC04Ljg0ODUgMjQwLjA2NiAtNi45MTI0NyAyMzYuMTYgLTMuOTcyMjJDMjMyLjI1MyAtMS4wMzIzIDIyOS4yMjggMi42NjE1NCAyMjcuMDgzIDcuMTExMjhDMjI0Ljk4OCAxMS41NjE0IDIyMy45NjYgMTYuODE2NCAyMjMuOTY2IDIyLjg5MzZDMjIzLjkxOSAyOC42NTg4IDIyNC45NDIgMzMuNzY5MSAyMjYuOTg4IDM4LjE5NDZDMjI5LjAzNiA0Mi42MjA1IDIzMS45MzEgNDYuMjE5MiAyMzUuNjc0IDQ4Ljk5QzIzOS40MTkgNTEuNzY0IDI0My44MTQgNTMuMTUwOCAyNDguODU5IDUzLjE1MDhDMjU0LjYxNCA1My4xNTA4IDI1OS41MTYgNTIuMDA1MyAyNjMuNTY0IDQ5LjcxNDVDMjY3LjYxMSA0Ny40MjM3IDI3MC43MTkgNDQuMzQ1NiAyNzIuODg4IDQwLjQ3OTlDMjczLjA2MSAzOC4wOTQ0IDI3My4xNDcgMzUuNjUzNiAyNzMuMTQ3IDMzLjE1NzNWMTcuMjgyOEgyODQuMDYzWiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMzAzLjEzIDgxLjQwNTlDMjk3LjMyNyA4MS40MDU5IDI5Mi4yNjcgODAuMTAyNyAyODcuOTQ4IDc3LjQ5NjNDMjgzLjYzIDc0Ljg4OTggMjgwLjIyNSA3MS4zMTk1IDI3Ny43MzYgNjYuNzg2QzI3NS4yNDcgNjIuMjA3IDI3My44OTggNTYuOTU2OSAyNzMuNjkyIDUxLjAzNTNDMjczLjUzOSA0Ni4wOTcyIDI3My45MDUgNDEuNDA5MiAyNzQuNzkxIDM2Ljk3MUMyNzUuNjc2IDMyLjU4MzEgMjc3LjAzIDI4LjY0NDkgMjc4Ljg1MiAyNS4xNTU1QzI4MC42NzQgMjEuNjY1NyAyODIuOTI1IDE4LjY4NDggMjg1LjYwMyAxNi4yMTM4QzI4OC4yOCAxMy43NDI5IDI5MS4zMDcgMTEuODc2MiAyOTQuNjgzIDEwLjYxMzZDMjk4LjEwNyA5LjM1MDk3IDMwMS44MTUgOC42NzY3MSAzMDUuODEgOC41ODkxNEMzMDkuODAzIDguNTQ1NjEgMzEzLjYzMSA5LjE2MTg1IDMxNy4yOTUgMTAuNDM3MkMzMjEuMDA2IDExLjcxMzEgMzI0LjM1MSAxMy41NjYyIDMyNy4zMyAxNS45OThDMzMwLjMwOCAxOC40MjkzIDMzMi43NzQgMjEuMzczIDMzNC43MjYgMjQuODI5M0MzMzYuNzI5IDI4LjI4NSAzMzguMDcyIDMyLjIwMDcgMzM4Ljc1MyAzNi41NzQ4QzMzOS40NzggNDAuOTQ5NSAzMzkuNTk3IDQ1LjY4OCAzMzkuMTA5IDUwLjc5MTlWNjAuMTA2OEMyOTMuOTI5IDYwLjEwNjhIMjgyLjI4OFY1MC43OTE5SDMzMS42NzlDMzMyLjEyMSA0Ny4zMzY2IDMzMi4wNDUgNDMuODg3OCAzMzEuNDQ1IDQwLjQ0MzlDMzMwLjg0NiAzNy4wMDAyIDMyOS42NjcgMzQuMDA1NyAzMjcuOTA5IDMxLjQ2MjFDMzI2LjIgMjguOTE5IDMyMy45MTggMjYuOTY0NiAzMjEuMDU4IDI1LjU5OThDMzE4LjE5OCAyNC4yMzU2IDMxNC43MzUgMjMuNjM2NCAzMTAuNjY5IDIzLjgwMzdDMzA3LjExMSAyMy45NzEyIDMwMy44NzcgMjQuOTM2MiAzMDAuOTY3IDI2LjY5ODFDMjk4LjEwNiAyOC40NjA1IDI5NS43ODcgMzAuODM0IDI5NC4wMDkgMzMuODIwNkMyOTIuMjI5IDM2Ljg1MSAyOTEuMDUzIDQwLjQ0NCAyOTAuNDc5IDQ0LjU5OTRDMjg5Ljk1NCA0OC43NTQ4IDI5MC4wODUgNTIuODg2NiAyOTAuODc0IDU2Ljk5NDdDMjkxLjY2MSA2MS4wNTk1IDI5My4xMDMgNjQuNjA3MyAyOTUuMiA2Ny42MzkxQzI5Ny4yOTkgNzAuNjY5OSAyOTkuOTczIDczLjAzMzUgMzAzLjIyMSA3NC43MzAxQzMwNi41MTggNzYuMzgyOCAzMTAuMjYgNzcuMjA4NSAzMTQuNDQ5IDc3LjIwODVDMzE3LjQ4OSA3Ny4yMDg1IDMyMC4zNTIgNzYuODcxNiAzMjMuMDM5IDc2LjE5NzhDMzI1LjcyNCA3NS41MjQzIDMyOC4xMzkgNzQuNTc4MiAzMzAuMjgyIDczLjM1OTJDMzMyLjQyNSA3Mi4xODQxIDMzNC4yNDYgNzAuODM4OSAzMzUuNzQ2IDY5LjMyMzNDMzM3LjI0NiA2Ny44MDc4IDMzOC40MzMgNjYuMjQ0MiAzMzkuMzA4IDY0LjYzMTlDMzQwLjIyOCA2My4wMTkzIDM0MC44NTggNjEuNDYzIDM0MS4xOTggNTkuOTYyNUwzNDEuOTk5IDU1Ljk5MDdDMzQxLjcgNjIuMDExMyAzNDAuMjkgNjcuMzUwOCAzMzcuNjc4IDcxLjk5ODRDMzM1LjE1OCA3Ni42NDg1IDMzMS44NDIgODAuNTk1OCAzMjcuNzE2IDgzLjg0MzhDMzIzLjYzOCA4Ny4wNDg2IDMxOC44NzMgODkuNDczIDMxMy40MjUgOTEuMDkwOEMzMDcuOTc2IDkyLjcwNzkgMzAyLjA5MyA5My4xNTkxIDI5NS43NzUgOTIuNDQ0MUMyODkuNDU2IDkxLjY4NDggMjgzLjc5NSA4OS45NjQ4IDI3OC43OTMgODcuMjg0NkwyODMuMjY4IDgwLjEzODRDMjg3Ljc4IDgyLjU2NzEgMjkyLjg4IDgzLjk3MTkgMjk4LjU1NyA4NC4zNTNDMzAwLjk1IDg0LjYwMzQgMzAyLjkyIDg0LjYzNDQgMzA0LjQ2MyA4NC40NDYyQzMwNi4wNTQgODQuMjEzOCAzMDcuNTI5IDgzLjk4NTggMzA4Ljg5MSA4My43NjI1QzMwNy45NjEgODQuNTY0MiAzMDYuMzc5IDg1LjA5MjggMzA0LjE0NiA4NS4zNDY5QzMwMS45NTggODUuNjAwOCAzMDAuMTM5IDg1LjcyODEgMjk4LjY4OCA4NS43Mjg4QzI5Ny4yODYgODUuNzI4OCAyOTYuMjYgODUuNjQ1NyAyOTUuNjEgODUuNDgwMUwyOTMuNzkzIDg1LjMyMzlMMjkyLjk2MiA4MS40MDU5SDMwMy4xM1oiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTE5LjkzMTkgMTcuMjgyOEwwLjA2ODI3NSA4NS43NDY1SDQuMTAxNTJMMTkuNjQ0NSAzMC43ODE3TDE5LjkzMTkgMTcuMjgyOFoiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTEzLjkwNSA0LjI1MzYxSDI1Ljk2NDVWMTEuOTgzNUgxMy45MDVWMTcuMzUzOEw5LjE4NTkgMTcuMjgyOFY0LjI1MzYxSDEzLjkwNVoiIGZpbGw9IiMxQzFDMUMiLz4KPC9zdmc+Cg=="
                      alt="DREEEAMS"
                      width="171"
                      height="45"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </td>
                </tr>

                {/* White Card Container */}
                <tr>
                  <td style={{ backgroundColor: COLORS.white, padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQyIiBoZWlnaHQ9IjkwIiB2aWV3Qm94PSIwIDAgMzQyIDkwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMzQuMzk2MyA0LjI1MzYxSDQwLjM1ODdWMTEuOTgzNUgzNC4zOTYzVjQuMjUzNjFaTTM0LjM5NjMgMTcuMjgyOEg0MC4zNTg3Vjg1Ljc0NjVIMzQuMzk2M1YxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNNTQuOTgxNSAxNy4yODI4SDYxLjYyMDZMMzkuMTQxNiA4NS43NDY1SDMyLjY1NDVMNTQuOTgxNSAxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNNzYuODI5OCA0NS4yNDc2VjE3LjI4MjhIODEuNjUzNEw4Mi43MTk5IDIyLjcxMDRIODIuODcyNUM4NC44NTI1IDIwLjYxODcgODcuMTA2NSAxOC43NTMyIDg5LjYzNDIgMTcuMTEzOUM5Mi4yMDk1IDE1LjQ3NDYgOTQuOTgyNSAxNC42NTQ4IDk3Ljk1MzIgMTQuNjU0OEMxMDQuMzA2IDE0LjY1NDggMTA5LjM5NiAxNi42NDYgMTEzLjIyMiAyMC42Mjg0QzExNy4wOTUgMjQuNjExIDExOC45NTUgMzAuMzE0NSAxMTguODAyIDM3LjczODdWODUuNzQ2NUgxMTIuODQxVjQwLjMzNjJDMTEyLjg0MSAzNC44MTU3IDExMS42OTggMzAuNzM1NSAxMDkuNDExIDI4LjA5NTZDMTA3LjEyNSAyNS40NTU2IDEwMy43NzEgMjQuMTM1NyA5OS4zNTAyIDI0LjEzNTdDOTYuODIyNSAyNC4xMzU3IDk0LjM5ODcgMjQuNzI2OCA5Mi4wNzkzIDI1LjkwOUM4OS43NTk5IDI3LjA5MTIgODcuODUzMyAyOC41NjU3IDg2LjM1OTkgMzAuMzMzQzg0LjkxNCAzMi4wNDg4IDg0LjA1NTkgMzMuODY1NSA4My43ODU5IDM1Ljc4MzNDODMuNTE1OSAzNy43MDE0IDgzLjM4MSAzOS41NzY2IDgzLjM4MSA0MS40MDkyVjg1Ljc0NjVINzYuODI5OFY0NS4yNDc2WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMTMxLjc3MyAxNy4yODI4SDEzOC40MTJMMTE1LjkzMyA4NS43NDY1SDEwOS40NDZMMTMxLjc3MyAxNy4yODI4WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMTU3LjM1OSAzOS41OTI3QzE1Ny4zMTMgMzUuMTU5MiAxNTYuMjAzIDMxLjcwNzEgMTU0LjAzIDI5LjIzNjFDMTUxLjg1NSAyNi43NjUyIDE0OC43MjUgMjUuNTI5NyAxNDQuNjM5IDI1LjUyOTdDMTQxLjExMSAyNS41Mjk3IDEzOC4yNzggMjYuNDEgMTM2LjE0MiAyOC4xNzAyQzEzNC4wMDUgMjkuOTMwNCAxMzIuNDU5IDMyLjA1NTggMTMxLjUwMSAzNC41NDY1QzEzMC41NDQgMzcuMDM3MyAxMzAuMDY2IDM5LjU0MjEgMTMwLjA2NiA0Mi4wNjEzQzEzMC4wNjYgNDguMjg0OCAxMzAuNjExIDUzLjYyMyAxMzEuNzA0IDU4LjA3NTZDMTMyLjc5NiA2Mi41MjgyIDEzNC4zOTkgNjYuMjA5MSAxMzYuNTE1IDY5LjExODVDMTM4LjYzIDcyLjAyNzkgMTQxLjE2OCA3NC4yMDY5IDE0NC4xMjggNzUuNjU1QzE0Ny4wODggNzcuMTA1MyAxNTAuNDA3IDc3LjgyOTUgMTU0LjA4NiA3Ny44Mjk1QzE2MC42ODUgNzcuODI5NSAxNjUuNzczIDc1LjU2MDcgMTY5LjM1MSA3MS4wMjMxQzE3Mi45MjcgNjYuNDg1NSAxNzQuODIzIDYwLjMzODggMTc1LjAzNyA1Mi41ODIzSDEzOC41MThWNDYuNTE5M0gxODEuNzRWNTIuNDA5MkMxODEuNzg3IDU3Ljk2MiAxODAuNTE2IDYyLjk3NzggMTc3LjkyNyA2Ny40NTY4QzE3NS4zODcgNzEuODkwMiAxNzEuNjg0IDc1LjMzNDkgMTY2LjgyMSA3Ny43OTA2QzE2MS45NTggODAuMjAwOCAxNTYuMDIzIDgxLjQwNTkgMTQ5LjAxNyA4MS40MDU5QzE0My4xMTEgODEuNDA1OSAxMzcuODk0IDgwLjE5MzYgMTMzLjM2OCA3Ny43Njg5QzEyOC44NDMgNzUuMzQ0MiAxMjUuMTU4IDcyLjA5OTEgMTIyLjMxNSA2OC4wMzJDMTE5LjQ3MyA2My45NjUyIDExNy41MTcgNTkuMzM5IDExNi40NDkgNTQuMTU0QzExNS4zOCA0OC45Njg5IDExNC44NDYgNDMuNjE3NyAxMTQuODQ2IDM4LjEwMDFDMTE0Ljg0NiAzMy4wMDE2IDExNS40MTkgMjguMTQ3NCAxMTYuNTY1IDIzLjUzODFDMTE3LjcxMSAxOC44ODI0IDExOS41ODIgMTQuODg0MiAxMjIuMTc2IDExLjU0NTRDMTI0Ljc3MSA4LjIwNjU1IDEyOC4wODUgNS42MjQ5NiAxMzIuMTE4IDMuODAwMzlDMTM2LjE5OCAxLjkzMDc1IDE0MC45OTQgMC45OTU5NDcgMTQ2LjUwOCAwLjk5NTk0N0MxNTEuNTMxIDAuOTk1OTQ3IDE1Ni4wMzYgMS44NDk0OSAxNjAuMDI0IDMuNTU1NjRDMTY0LjAxMSA1LjI2MTc5IDE2Ny4zNTQgNy42MjQ3NyAxNzAuMDUxIDEwLjY0NDlDMTcyLjc0OCAxMy42NjUzIDE3NC43OTEgMTcuMTkxIDE3Ni4xODIgMjEuMjIxOUMxNzcuNjIxIDI1LjI1MjkgMTc4LjM4NyAyOS41OTY3IDE3OC40NzkgMzQuMjUyNkgxNTcuMzU5VjM5LjU5MjdaIiBmaWxsPSIjMUMxQzFDIi8+CjxwYXRoIGQ9Ik0yMDguNjc5IDg1Ljc0NjVIMTkyLjgxOVYyNS45MjE5SDE4NC4yNTZWMTcuMjgyOEgxOTIuODE5VjguNTYwNDJDMTkyLjgxOSA2LjM4Mzk0IDE5My4wNTggNC4wODYyOSAxOTMuNTM1IDEuNjY3NDJDMTk0LjAxMiAtMC43NTA5OTggMTk0Ljg4NCAtMy4xNTk0NiAxOTYuMTQ3IC01LjU1NjM2QzE5Ny40NjMgLTcuOTUzNzEgMTk5LjIwNiAtMTAuMTk1MyAyMDEuMzc3IC0xMi4yODE3QzIwMy41OTQgLTE0LjM2NzggMjA2LjMwNCAtMTYuMDY4OSAyMDkuNTA1IC0xNy4zODU2QzIxMi43MDYgLTE4LjcwMTkgMjE2LjQ4IC0xOS4zNjAzIDIyMC44MjYgLTE5LjM2MDNIMjMwLjMwM1YtMTEuODc3OEgyMjMuMTc1QzIyMC4yMTYgLTExLjg3NzggMjE3LjY3MyAtMTEuMjU4NSAyMTUuNTQ5IC0xMC4wMjAxQzIxMy40NzIgLTguNzgxODIgMjExLjg3NCAtNy4xNzkyOCAyMTAuNzU1IC01LjIxMDk2QzIwOS42MzYgLTMuMjQyNjQgMjA5LjAzMyAtMS4yNDc5NiAyMDguOTQzIDEuMzU0MDhWMTcuMjgyOEgyMjcuODY4VjI1LjkyMTlIMjA4LjY3OVY4NS43NDY1WiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMjQwLjU0OSAxNy4yODI4SDIzMS4xMDVWOC40MDM3OUgyMzQuNDc4VjQuMjUzNjFIMjQwLjU0OVYxNy4yODI4Wk0yMzQuNjc3IDg1Ljc0NjVWMjUuOTIxOUgyNDAuNTQ5Vjg1Ljc0NjVIMjM0LjY3N1oiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTI4NC4wNjMgMTcuMjgyOFYyNS45MjE5SDI4MC4zMjNWMzcuOTIxQzI4MC4zMjMgNDIuODA0NiAyNzguOTQzIDQ2Ljk4ODcgMjc2LjE4MSA1MC40NzM2QzI3My40MTkgNTMuOTU4NCAyNjkuNzM3IDU2Ljc0NzcgMjY1LjEzNSA1OC44NDAxQzI2MC41MzMgNjAuOTMyNiAyNTUuMzI3IDYxLjk3ODggMjQ5LjUxOCA2MS45Nzg4QzI0Mi4xODcgNjEuOTc4OCAyMzUuOTY5IDYwLjM0MjEgMjMwLjg2NCA1Ny4wNjg3QzIyNS43NTkgNTMuNzk1MyAyMjEuOTI1IDQ5LjI3ODYgMjE5LjM2NCA0My41MTkyQzIxNi44MDIgMzcuNzYgMjE1LjU4NSAzMS4xMjI1IDIxNS43MTMgMjMuNzA3QzIxNS44NDEgMTYuNzA4NSAyMTcuMTA4IDEwLjQ2NzMgMjE5LjUxMyA1LjAwODFDMjIxLjkyMSAtMC40NTA2NCAyMjUuNDY0IC00Ljk5NjIxIDIzMC4xNDMgLTguNjI4QzIzNC44MjMgLTEyLjI1OTggMjQwLjYxMSAtMTQuNTQ5NCAyNDcuNTExIC0xNS40OTYyQzI1NC40NiAtMTYuNDQyOCAyNjIuNDk1IC0xNS43MDI0IDI3MS42MTcgLTEzLjI3NTRMMjY5Ljc1OCAtOC4yOTcwOUMyNjIuNTQzIC0xMC4yMTY4IDI1Ni4xMTUgLTEwLjcxMTUgMjUwLjQ3NSAtOS43Nzk5MkMyNDQuODM4IC04Ljg0ODUgMjQwLjA2NiAtNi45MTI0NyAyMzYuMTYgLTMuOTcyMjJDMjMyLjI1MyAtMS4wMzIzIDIyOS4yMjggMi42NjE1NCAyMjcuMDgzIDcuMTExMjhDMjI0Ljk4OCAxMS41NjE0IDIyMy45NjYgMTYuODE2NCAyMjMuOTY2IDIyLjg5MzZDMjIzLjkxOSAyOC42NTg4IDIyNC45NDIgMzMuNzY5MSAyMjYuOTg4IDM4LjE5NDZDMjI5LjAzNiA0Mi42MjA1IDIzMS45MzEgNDYuMjE5MiAyMzUuNjc0IDQ4Ljk5QzIzOS40MTkgNTEuNzY0IDI0My44MTQgNTMuMTUwOCAyNDguODU5IDUzLjE1MDhDMjU0LjYxNCA1My4xNTA4IDI1OS41MTYgNTIuMDA1MyAyNjMuNTY0IDQ5LjcxNDVDMjY3LjYxMSA0Ny40MjM3IDI3MC43MTkgNDQuMzQ1NiAyNzIuODg4IDQwLjQ3OTlDMjczLjA2MSAzOC4wOTQ0IDI3My4xNDcgMzUuNjUzNiAyNzMuMTQ3IDMzLjE1NzNWMTcuMjgyOEgyODQuMDYzWiIgZmlsbD0iIzFDMUMxQyIvPgo8cGF0aCBkPSJNMzAzLjEzIDgxLjQwNTlDMjk3LjMyNyA4MS40MDU5IDI5Mi4yNjcgODAuMTAyNyAyODcuOTQ4IDc3LjQ5NjNDMjgzLjYzIDc0Ljg4OTggMjgwLjIyNSA3MS4zMTk1IDI3Ny43MzYgNjYuNzg2QzI3NS4yNDcgNjIuMjA3IDI3My44OTggNTYuOTU2OSAyNzMuNjkyIDUxLjAzNTNDMjczLjUzOSA0Ni4wOTcyIDI3My45MDUgNDEuNDA5MiAyNzQuNzkxIDM2Ljk3MUMyNzUuNjc2IDMyLjU4MzEgMjc3LjAzIDI4LjY0NDkgMjc4Ljg1MiAyNS4xNTU1QzI4MC42NzQgMjEuNjY1NyAyODIuOTI1IDE4LjY4NDggMjg1LjYwMyAxNi4yMTM4QzI4OC4yOCAxMy43NDI5IDI5MS4zMDcgMTEuODc2MiAyOTQuNjgzIDEwLjYxMzZDMjk4LjEwNyA5LjM1MDk3IDMwMS44MTUgOC42NzY3MSAzMDUuODEgOC41ODkxNEMzMDkuODAzIDguNTQ1NjEgMzEzLjYzMSA5LjE2MTg1IDMxNy4yOTUgMTAuNDM3MkMzMjEuMDA2IDExLjcxMzEgMzI0LjM1MSAxMy41NjYyIDMyNy4zMyAxNS45OThDMzMwLjMwOCAxOC40MjkzIDMzMi43NzQgMjEuMzczIDMzNC43MjYgMjQuODI5M0MzMzYuNzI5IDI4LjI4NSAzMzguMDcyIDMyLjIwMDcgMzM4Ljc1MyAzNi41NzQ4QzMzOS40NzggNDAuOTQ5NSAzMzkuNTk3IDQ1LjY4OCAzMzkuMTA5IDUwLjc5MTlWNjAuMTA2OEMyOTMuOTI5IDYwLjEwNjhIMjgyLjI4OFY1MC43OTE5SDMzMS42NzlDMzMyLjEyMSA0Ny4zMzY2IDMzMi4wNDUgNDMuODg3OCAzMzEuNDQ1IDQwLjQ0MzlDMzMwLjg0NiAzNy4wMDAyIDMyOS42NjcgMzQuMDA1NyAzMjcuOTA5IDMxLjQ2MjFDMzI2LjIgMjguOTE5IDMyMy45MTggMjYuOTY0NiAzMjEuMDU4IDI1LjU5OThDMzE4LjE5OCAyNC4yMzU2IDMxNC43MzUgMjMuNjM2NCAzMTAuNjY5IDIzLjgwMzdDMzA3LjExMSAyMy45NzEyIDMwMy44NzcgMjQuOTM2MiAzMDAuOTY3IDI2LjY5ODFDMjk4LjEwNiAyOC40NjA1IDI5NS43ODcgMzAuODM0IDI5NC4wMDkgMzMuODIwNkMyOTIuMjI5IDM2Ljg1MSAyOTEuMDUzIDQwLjQ0NCAyOTAuNDc5IDQ0LjU5OTRDMjg5Ljk1NCA0OC43NTQ4IDI5MC4wODUgNTIuODg2NiAyOTAuODc0IDU2Ljk5NDdDMjkxLjY2MSA2MS4wNTk1IDI5My4xMDMgNjQuNjA3MyAyOTUuMiA2Ny42MzkxQzI5Ny4yOTkgNzAuNjY5OSAyOTkuOTczIDczLjAzMzUgMzAzLjIyMSA3NC43MzAxQzMwNi41MTggNzYuMzgyOCAzMTAuMjYgNzcuMjA4NSAzMTQuNDQ5IDc3LjIwODVDMzE3LjQ4OSA3Ny4yMDg1IDMyMC4zNTIgNzYuODcxNiAzMjMuMDM5IDc2LjE5NzhDMzI1LjcyNCA3NS41MjQzIDMyOC4xMzkgNzQuNTc4MiAzMzAuMjgyIDczLjM1OTJDMzMyLjQyNSA3Mi4xODQxIDMzNC4yNDYgNzAuODM4OSAzMzUuNzQ2IDY5LjMyMzNDMzM3LjI0NiA2Ny44MDc4IDMzOC40MzMgNjYuMjQ0MiAzMzkuMzA4IDY0LjYzMTlDMzQwLjIyOCA2My4wMTkzIDM0MC44NTggNjEuNDYzIDM0MS4xOTggNTkuOTYyNUwzNDEuOTk5IDU1Ljk5MDdDMzQxLjcgNjIuMDExMyAzNDAuMjkgNjcuMzUwOCAzMzcuNjc4IDcxLjk5ODRDMzM1LjE1OCA3Ni42NDg1IDMzMS44NDIgODAuNTk1OCAzMjcuNzE2IDgzLjg0MzhDMzIzLjYzOCA4Ny4wNDg2IDMxOC44NzMgODkuNDczIDMxMy40MjUgOTEuMDkwOEMzMDcuOTc2IDkyLjcwNzkgMzAyLjA5MyA5My4xNTkxIDI5NS43NzUgOTIuNDQ0MUMyODkuNDU2IDkxLjY4NDggMjgzLjc5NSA4OS45NjQ4IDI3OC43OTMgODcuMjg0NkwyODMuMjY4IDgwLjEzODRDMjg3Ljc4IDgyLjU2NzEgMjkyLjg4IDgzLjk3MTkgMjk4LjU1NyA4NC4zNTNDMzAwLjk1IDg0LjYwMzQgMzAyLjkyIDg0LjYzNDQgMzA0LjQ2MyA4NC40NDYyQzMwNi4wNTQgODQuMjEzOCAzMDcuNTI5IDgzLjk4NTggMzA4Ljg5MSA4My43NjI1QzMwNy45NjEgODQuNTY0MiAzMDYuMzc5IDg1LjA5MjggMzA0LjE0NiA4NS4zNDY5QzMwMS45NTggODUuNjAwOCAzMDAuMTM5IDg1LjcyODEgMjk4LjY4OCA4NS43Mjg4QzI5Ny4yODYgODUuNzI4OCAyOTYuMjYgODUuNjQ1NyAyOTUuNjEgODUuNDgwMUwyOTMuNzkzIDg1LjMyMzlMMjkyLjk2MiA4MS40MDU5SDMwMy4xM1oiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTE5LjkzMTkgMTcuMjgyOEwwLjA2ODI3NSA4NS43NDY1SDQuMTAxNTJMMTkuNjQ0NSAzMC43ODE3TDE5LjkzMTkgMTcuMjgyOFoiIGZpbGw9IiMxQzFDMUMiLz4KPHBhdGggZD0iTTEzLjkwNSA0LjI1MzYxSDI1Ljk2NDVWMTEuOTgzNUgxMy45MDVWMTcuMzUzOEw5LjE4NTkgMTcuMjgyOFY0LjI1MzYxSDEzLjkwNVoiIGZpbGw9IiMxQzFDMUMiLz4KPC9zdmc+Cg=="
                      alt="DREEEAMS"
                      width="114"
                      height="30"
                      style={{ display: 'block', margin: '0 auto 15px auto' }}
                    />
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
                    <div style={{ backgroundColor: COLORS.black, padding: '20px' }}>
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
                  <td style={{ backgroundColor: COLORS.white, padding: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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

                      {/* Budget - Markdown Style */}
                      {formData.budget && (
                        <div style={{ marginBottom: '30px' }}>
                          <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {t.budget}
                          </h2>
                          <div style={{ padding: '15px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                            <p style={{ margin: 0, fontSize: '15px', color: COLORS.black, fontWeight: '500' }}>
                              {t.budgetOptions[formData.budget as keyof typeof t.budgetOptions] || formData.budget}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Referral Source - Markdown Style */}
                      {formData.heardFrom && (
                        <div style={{ marginBottom: '30px' }}>
                          <h2 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: '600', color: COLORS.black, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {t.referralLabel}
                          </h2>
                          <div style={{ padding: '15px', backgroundColor: COLORS.bgGray, borderLeft: `4px solid ${COLORS.black}` }}>
                            <p style={{ margin: 0, fontSize: '15px', color: COLORS.black }}>
                              {formData.heardFrom}
                            </p>
                          </div>
                        </div>
                      )}

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

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  const metadata = {
    en: {
      title: 'Legal | Dream Studio',
      description: 'Privacy Policy and Terms & Conditions for Dream Studio services.',
    },
    es: {
      title: 'Legal | Dream Studio',
      description: 'Política de Privacidad y Términos y Condiciones de los servicios de Dream Studio.',
    },
  };

  const meta = locale === 'es' ? metadata.es : metadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/legal`,
      languages: {
        en: `${baseUrl}/en/legal`,
        es: `${baseUrl}/es/legal`,
      },
    },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = {
    en: {
      title: 'LEGAL DOCUMENTS',
      lastUpdated: 'Last Updated: January 2026',
      downloadSection: {
        title: 'Download Documents',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
        english: 'English Version',
        spanish: 'Spanish Version',
      },
      privacyPolicy: {
        title: 'Privacy Policy',
        subtitle: 'About Our Privacy Policy',
        intro: 'At Dream Studio, we are committed to protecting your privacy and ensuring the security of your personal information. Our comprehensive Privacy Policy details how we collect, use, store, and protect your data in accordance with applicable laws and regulations.',
        paragraph1: 'We collect only the information necessary to provide our services and improve your experience. Your data is processed with the highest security standards and is never sold to third parties.',
        keyPoints: 'Key Points:',
        points: [
          "Data collection is limited to what's necessary for service delivery",
          'We use industry-standard security measures to protect your information',
          'You have the right to access, modify, or delete your personal data',
          'We comply with GDPR, CCPA, and Colombian data protection laws (Ley 1581 de 2012)',
        ],
        footer: 'For detailed information, please download our complete Privacy Policy document or contact us at',
      },
      termsConditions: {
        title: 'Terms & Conditions',
        subtitle: 'Terms of Service',
        intro: "These Terms & Conditions govern your use of Dream Studio's services, including our websites, applications, and any digital products we provide. By using our services, you agree to these terms.",
        serviceUsage: 'Service Usage:',
        points: [
          'You must be at least 18 years old to use our services',
          'You are responsible for maintaining the security of your account',
          'Misuse of our services may result in termination of access',
          'All content and intellectual property remain the property of Dream Studio',
        ],
        payment: 'Payment & Refunds:',
        paymentText: 'Payment terms, refund policies, and subscription details are outlined in our complete Terms & Conditions document.',
        footer: 'For complete terms, please download our Terms & Conditions document or contact us at',
      },
      questions: {
        title: 'Questions?',
        text: 'If you have any questions about our legal policies, please contact us:',
      },
      footer: {
        home: 'Home',
        legal: 'Legal',
      },
    },
    es: {
      title: 'DOCUMENTOS LEGALES',
      lastUpdated: 'Última Actualización: Enero 2026',
      downloadSection: {
        title: 'Descargar Documentos',
        privacyPolicy: 'Política de Privacidad',
        termsConditions: 'Términos y Condiciones',
        english: 'English Version',
        spanish: 'Versión en Español',
      },
      privacyPolicy: {
        title: 'Política de Privacidad',
        subtitle: 'Sobre Nuestra Política de Privacidad',
        intro: 'En Dream Studio, estamos comprometidos con la protección de tu privacidad y la seguridad de tu información personal. Nuestra Política de Privacidad detalla cómo recopilamos, usamos, almacenamos y protegemos tus datos de acuerdo con las leyes y regulaciones aplicables.',
        paragraph1: 'Recopilamos únicamente la información necesaria para proveer nuestros servicios y mejorar tu experiencia. Tus datos son procesados con los más altos estándares de seguridad y nunca se venden a terceros.',
        keyPoints: 'Puntos Clave:',
        points: [
          'La recopilación de datos se limita a lo necesario para la prestación del servicio',
          'Utilizamos medidas de seguridad estándar de la industria para proteger tu información',
          'Tienes derecho a acceder, modificar o eliminar tus datos personales',
          'Cumplimos con GDPR, CCPA y leyes colombianas de protección de datos (Ley 1581 de 2012)',
        ],
        footer: 'Para información detallada, por favor descarga nuestro documento completo de Política de Privacidad o contáctanos en',
      },
      termsConditions: {
        title: 'Términos y Condiciones',
        subtitle: 'Términos de Servicio',
        intro: 'Estos Términos y Condiciones rigen tu uso de los servicios de Dream Studio, incluyendo nuestros sitios web, aplicaciones y cualquier producto digital que proveemos. Al usar nuestros servicios, aceptas estos términos.',
        serviceUsage: 'Uso del Servicio:',
        points: [
          'Debes tener al menos 18 años para usar nuestros servicios',
          'Eres responsable de mantener la seguridad de tu cuenta',
          'El mal uso de nuestros servicios puede resultar en la terminación del acceso',
          'Todo el contenido y propiedad intelectual permanece como propiedad de Dream Studio',
        ],
        payment: 'Pagos y Reembolsos:',
        paymentText: 'Los términos de pago, políticas de reembolso y detalles de suscripción están detallados en nuestro documento completo de Términos y Condiciones.',
        footer: 'Para los términos completos, por favor descarga nuestro documento de Términos y Condiciones o contáctanos en',
      },
      questions: {
        title: '¿Preguntas?',
        text: 'Si tienes alguna pregunta sobre nuestras políticas legales, por favor contáctanos:',
      },
      footer: {
        home: 'Inicio',
        legal: 'Legal',
      },
    },
  };

  const t = content[locale as 'en' | 'es'] || content.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
          <Link href={`/${locale}`} className="inline-flex items-center mb-8 hover:opacity-80 transition-opacity">
            <Image
              src="/dreeeams-logo.png"
              alt="Dreeeams"
              width={200}
              height={52}
              className="h-auto w-auto max-w-[120px]"
              priority
            />
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
            {t.title}
          </h1>
          <p className="text-sm text-gray-500">{t.lastUpdated}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Download Section */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light mb-6 text-gray-900">{t.downloadSection.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Privacy Policy Downloads */}
            <div className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <h3 className="text-lg font-medium mb-4">{t.downloadSection.privacyPolicy}</h3>
              <div className="space-y-3">
                <a
                  href="/legal/privacy-policy-en.pdf"
                  download
                  className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.downloadSection.english}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">PDF</span>
                </a>
                <a
                  href="/legal/politica-privacidad-es.pdf"
                  download
                  className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.downloadSection.spanish}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">PDF</span>
                </a>
              </div>
            </div>

            {/* Terms & Conditions Downloads */}
            <div className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <h3 className="text-lg font-medium mb-4">{t.downloadSection.termsConditions}</h3>
              <div className="space-y-3">
                <a
                  href="/legal/terms-conditions-en.pdf"
                  download
                  className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.downloadSection.english}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">PDF</span>
                </a>
                <a
                  href="/legal/terminos-condiciones-es.pdf"
                  download
                  className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.downloadSection.spanish}
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8 pb-4 border-b border-gray-200">
            {t.privacyPolicy.title}
          </h2>

          <div className="prose prose-sm max-w-none text-gray-600">
            <h3 className="text-xl font-medium text-gray-900 mb-4">{t.privacyPolicy.subtitle}</h3>
            <p className="leading-relaxed mb-4">{t.privacyPolicy.intro}</p>
            <p className="leading-relaxed mb-4">{t.privacyPolicy.paragraph1}</p>
            <p className="leading-relaxed mb-4">
              <strong className="text-gray-900">{t.privacyPolicy.keyPoints}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              {t.privacyPolicy.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <p className="leading-relaxed">
              {t.privacyPolicy.footer}{' '}
              <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">
                info@dreeeams.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8 pb-4 border-b border-gray-200">
            {t.termsConditions.title}
          </h2>

          <div className="prose prose-sm max-w-none text-gray-600">
            <h3 className="text-xl font-medium text-gray-900 mb-4">{t.termsConditions.subtitle}</h3>
            <p className="leading-relaxed mb-4">{t.termsConditions.intro}</p>
            <p className="leading-relaxed mb-4">
              <strong className="text-gray-900">{t.termsConditions.serviceUsage}</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              {t.termsConditions.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <p className="leading-relaxed mb-4">
              <strong className="text-gray-900">{t.termsConditions.payment}</strong> {t.termsConditions.paymentText}
            </p>
            <p className="leading-relaxed">
              {t.termsConditions.footer}{' '}
              <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">
                info@dreeeams.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t.questions.title}</h3>
            <p className="text-gray-600 mb-4">{t.questions.text}</p>
            <a
              href="mailto:info@dreeeams.com"
              className="inline-flex items-center gap-2 text-brand hover:underline font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@dreeeams.com
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-12 border-t border-gray-200 mt-12">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-black transition-colors">
              {t.footer.home}
            </Link>
            <span className="text-gray-300">•</span>
            <Link href={`/${locale}/legal`} className="hover:text-black transition-colors">
              {t.footer.legal}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

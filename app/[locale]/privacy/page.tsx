import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  const metadata = {
    en: {
      title: 'Privacy Policy | Dream Studio',
      description: 'Learn how Dream Studio collects, uses, and protects your personal information.',
    },
    es: {
      title: 'Política de Privacidad | LF DREAMS S.A.S.',
      description: 'Conoce cómo LF DREAMS S.A.S. recopila, usa y protege tu información personal conforme a la Ley 1581 de 2012.',
    },
  };

  const meta = locale === 'es' ? metadata.es : metadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        en: `${baseUrl}/en/privacy`,
        es: `${baseUrl}/es/privacy`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/privacy`,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (locale === 'es') {
    return (
      <div className="min-h-screen bg-white">
        {/* Minimal Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <svg
                width="24"
                height="28"
                viewBox="0 0 97 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-auto"
                role="img"
                aria-labelledby="logo-title-privacy"
              >
                <title id="logo-title-privacy">Dream Studio Logo</title>
                <g filter="url(#filter0_d_privacy)">
                  <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor" className="text-black"/>
                </g>
                <defs>
                  <filter id="filter0_d_privacy" x="0" y="0" width="96.1645" height="113.29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_privacy"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_privacy" result="shape"/>
                  </filter>
                </defs>
              </svg>
              <span className="text-lg font-logo">DREEEAMS</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
              POLÍTICA DE PRIVACIDAD
            </h1>
            <p className="text-sm text-gray-500">Última Actualización: Enero 2026</p>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
            {/* Privacy Notice for Contact Form */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                Aviso de Privacidad - Formulario de Contacto
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  En cumplimiento a lo dispuesto en la Ley 1581 de 2012 y el Decreto 1074 de 2015,
                  <strong className="text-gray-900"> LF DREAMS S.A.S.</strong> identificada con NIT 902.022.315-1, en su calidad de Responsable del
                  Tratamiento de Datos Personales, informa:
                </p>
                <p>
                  <strong className="text-gray-900">Finalidad del Tratamiento:</strong> Los datos personales recopilados a través de este formulario
                  serán utilizados para: (i) gestionar su solicitud de contacto y proporcionar respuesta a sus inquietudes;
                  (ii) ofrecerle información sobre nuestros productos y servicios; (iii) mantener comunicación comercial y
                  de marketing (previo consentimiento); (iv) realizar análisis estadísticos y de mercado; (v) cumplir con
                  obligaciones legales y contractuales.
                </p>
                <p>
                  <strong className="text-gray-900">Derechos del Titular:</strong> Como titular de los datos personales, usted tiene derecho a:
                  (i) conocer, actualizar y rectificar sus datos; (ii) solicitar prueba de la autorización otorgada;
                  (iii) ser informado sobre el uso de sus datos; (iv) presentar quejas ante la Superintendencia de Industria
                  y Comercio (SIC); (v) revocar su autorización y solicitar la supresión de sus datos cuando sea procedente;
                  (vi) acceder de forma gratuita a sus datos.
                </p>
                <p>
                  <strong className="text-gray-900">Mecanismos de Consulta:</strong> Puede consultar sus datos personales o ejercer sus derechos
                  enviando un correo electrónico a <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a> o
                  mediante comunicación escrita dirigida a nuestra dirección registrada.
                </p>
                <p>
                  <strong className="text-gray-900">Autorización:</strong> Al suministrar sus datos personales a través de este formulario y hacer clic
                  en "Enviar", usted autoriza expresamente a LF DREAMS S.A.S. para recopilar, almacenar, usar, circular,
                  suprimir, procesar, compilar, intercambiar, actualizar y disponer de sus datos personales, conforme a
                  nuestra Política de Tratamiento de Datos Personales.
                </p>
                <p className="text-sm italic">
                  Para conocer nuestra Política completa de Tratamiento de Datos Personales, consulte la sección completa
                  a continuación.
                </p>
              </div>
            </section>

            {/* Complete Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES
              </h2>
              <p className="text-sm text-gray-600 mb-6">ENERO DE 2026</p>

              {/* Section 1 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">1. IDENTIFICACIÓN DEL RESPONSABLE</h3>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p><strong>Razón Social:</strong> LF DREAMS S.A.S.</p>
                  <p><strong>NIT:</strong> 902.022.315-1</p>
                  <p><strong>Domicilio:</strong> Bogotá D.C., Colombia</p>
                  <p><strong>Correo electrónico:</strong> <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a></p>
                  <p><strong>Sitio web:</strong> <a href="https://dreeeams.com" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a></p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">2. OBJETO Y ALCANCE</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  La presente Política de Tratamiento de Datos Personales tiene por objeto establecer los criterios y
                  procedimientos para la recolección, almacenamiento, uso, circulación, supresión y en general el tratamiento
                  de datos personales por parte de LF DREAMS S.A.S., en cumplimiento de la Ley 1581 de 2012, el Decreto 1074
                  de 2015 y demás normas concordantes.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Esta política aplica para toda la información personal registrada en las bases de datos de LF DREAMS S.A.S.,
                  incluyendo clientes, proveedores, empleados, candidatos a empleo, usuarios de nuestros servicios tecnológicos
                  y cualquier persona natural cuyos datos sean objeto de tratamiento.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">3. DEFINICIONES</h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-gray-900">Autorización:</strong> Consentimiento previo, expreso e informado del Titular para llevar a cabo
                    el Tratamiento de datos personales.
                  </p>
                  <p>
                    <strong className="text-gray-900">Base de Datos:</strong> Conjunto organizado de datos personales que sea objeto de Tratamiento.
                  </p>
                  <p>
                    <strong className="text-gray-900">Dato Personal:</strong> Cualquier información vinculada o que pueda asociarse a una o varias
                    personas naturales determinadas o determinables.
                  </p>
                  <p>
                    <strong className="text-gray-900">Dato Sensible:</strong> Aquellos que afectan la intimidad del Titular o cuyo uso indebido puede
                    generar discriminación, tales como origen racial o étnico, orientación política, convicciones religiosas
                    o filosóficas, pertenencia a sindicatos, datos relativos a la salud, a la vida sexual, y datos biométricos.
                  </p>
                  <p>
                    <strong className="text-gray-900">Encargado del Tratamiento:</strong> Persona natural o jurídica, pública o privada, que por sí
                    misma o en asocio con otros, realice el Tratamiento de datos personales por cuenta del Responsable.
                  </p>
                  <p>
                    <strong className="text-gray-900">Responsable del Tratamiento:</strong> Persona natural o jurídica, pública o privada, que por sí
                    misma o en asocio con otros, decida sobre la base de datos y/o el Tratamiento de los datos.
                  </p>
                  <p>
                    <strong className="text-gray-900">Titular:</strong> Persona natural cuyos datos personales sean objeto de Tratamiento.
                  </p>
                  <p>
                    <strong className="text-gray-900">Tratamiento:</strong> Cualquier operación o conjunto de operaciones sobre datos personales,
                    tales como la recolección, almacenamiento, uso, circulación o supresión.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">4. CATEGORÍAS DE DATOS TRATADOS Y FINALIDADES</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  LF DREAMS S.A.S. tratará las siguientes categorías de datos personales, con las finalidades específicas
                  que se indican para cada caso:
                </p>

                <div className="space-y-6">
                  {/* 4.1 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.1. Datos de Clientes (Personas Naturales)</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de identificación: Nombre completo, tipo y número de documento de identidad</li>
                      <li>Datos de contacto: Dirección, teléfono, correo electrónico</li>
                      <li>Datos financieros: Información de pago, historial de transacciones</li>
                      <li>Datos de uso: Registro de eventos adquiridos, preferencias de usuario</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Gestión comercial y contractual de la prestación de servicios</li>
                      <li>Emisión, venta y validación de boletas electrónicas para eventos</li>
                      <li>Envío de confirmaciones, notificaciones y actualizaciones sobre eventos</li>
                      <li>Gestión de servicio al cliente, PQRS y soporte técnico</li>
                      <li>Facturación electrónica y gestión de pagos</li>
                      <li>Prevención de fraude y seguridad de transacciones</li>
                      <li>Envío de comunicaciones comerciales y marketing (previo consentimiento)</li>
                      <li>Análisis estadísticos y estudios de mercado</li>
                      <li>Cumplimiento de obligaciones legales y contractuales</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Durante la vigencia de la
                    relación comercial y hasta 10 años después para efectos tributarios y de prescripción legal.</p>
                  </div>

                  {/* 4.2 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.2. Datos de Clientes Empresariales (B2B)</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de contacto de representantes legales y personas de contacto</li>
                      <li>Información corporativa: NIT, razón social, domicilio fiscal</li>
                      <li>Datos contractuales y financieros</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Gestión de relaciones comerciales B2B</li>
                      <li>Prestación de servicios tecnológicos de boletería</li>
                      <li>Facturación y gestión de pagos</li>
                      <li>Soporte técnico y actualizaciones de software</li>
                      <li>Cumplimiento de obligaciones contractuales</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Durante la vigencia del
                    contrato y hasta 10 años después conforme a la legislación tributaria colombiana.</p>
                  </div>

                  {/* 4.3 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.3. Datos de Empleados y Colaboradores</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de identificación y contacto</li>
                      <li>Datos laborales: Cargo, área, fecha de ingreso, salario</li>
                      <li>Datos académicos y de formación</li>
                      <li>Datos de seguridad social y afiliaciones</li>
                      <li>Información bancaria para pago de nómina</li>
                      <li>Datos biométricos para control de acceso (opcional)</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Gestión de relación laboral o contractual</li>
                      <li>Administración de nómina y prestaciones sociales</li>
                      <li>Control de acceso y seguridad de instalaciones</li>
                      <li>Capacitación y desarrollo profesional</li>
                      <li>Evaluación de desempeño</li>
                      <li>Cumplimiento de obligaciones laborales, tributarias y de seguridad social</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Durante la vigencia de la
                    relación laboral y hasta 20 años después conforme a la legislación laboral colombiana.</p>
                  </div>

                  {/* 4.4 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.4. Datos de Candidatos a Empleo</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de identificación y contacto</li>
                      <li>Hoja de vida, formación académica y experiencia laboral</li>
                      <li>Certificaciones y referencias laborales</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Procesos de selección y reclutamiento</li>
                      <li>Evaluación de perfiles y competencias</li>
                      <li>Contacto para futuras oportunidades laborales (previo consentimiento)</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Hasta 1 año después del
                    proceso de selección. Si el candidato autoriza, sus datos podrán conservarse en nuestra base de datos
                    de talento por un período mayor.</p>
                  </div>

                  {/* 4.5 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.5. Datos de Proveedores</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de identificación de personas de contacto</li>
                      <li>Información comercial y contractual</li>
                      <li>Datos financieros y bancarios para pagos</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Gestión de relación comercial con proveedores</li>
                      <li>Evaluación y selección de proveedores</li>
                      <li>Gestión de pagos y facturación</li>
                      <li>Cumplimiento de obligaciones contractuales</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Durante la vigencia de la
                    relación comercial y hasta 10 años después conforme a la legislación tributaria.</p>
                  </div>

                  {/* 4.6 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.6. Datos de Visitantes del Sitio Web</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Dirección IP</li>
                      <li>Datos de navegación (cookies, páginas visitadas, tiempo de sesión)</li>
                      <li>Información del dispositivo y navegador</li>
                      <li>Datos proporcionados voluntariamente en formularios de contacto</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Mejorar la experiencia de usuario en el sitio web</li>
                      <li>Análisis estadísticos y estudios de usabilidad</li>
                      <li>Personalización de contenidos</li>
                      <li>Seguridad informática y prevención de fraude</li>
                      <li>Respuesta a consultas enviadas a través de formularios</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> Las cookies se conservan
                    según lo establecido en nuestra Política de Cookies. Los datos de formularios se conservan durante
                    1 año o hasta que se solicite su eliminación.</p>
                  </div>

                  {/* 4.7 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.7. Datos de Asistentes a Eventos</h4>
                    <p className="text-gray-600 mb-2"><strong>Datos recopilados:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Datos de identificación (nombre, documento)</li>
                      <li>Información de la boleta electrónica</li>
                      <li>Registros de acceso al evento (escaneo de códigos QR)</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Control de acceso a eventos</li>
                      <li>Verificación de identidad y autenticidad de boletas</li>
                      <li>Seguridad y gestión de aforo</li>
                      <li>Generación de estadísticas de asistencia</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Tiempo de conservación:</strong> 1 año después de la
                    realización del evento.</p>
                  </div>

                  {/* 4.8 */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">4.8. Datos de Menores de Edad</h4>
                    <p className="text-gray-600 mb-3">
                      LF DREAMS S.A.S. <strong>NO recopila intencionalmente</strong> datos personales de menores de edad
                      de manera directa. Los datos de menores podrán tratarse únicamente en los siguientes casos excepcionales:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-3 space-y-1">
                      <li>Como beneficiarios en pólizas de salud o seguros de empleados (datos del grupo familiar)</li>
                      <li>En actividades promocionales o eventos familiares, siempre con autorización expresa del padre,
                      madre o representante legal</li>
                    </ul>
                    <p className="text-gray-600 mb-2"><strong>Finalidades limitadas:</strong></p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Cumplimiento de obligaciones de seguridad social (beneficiarios de empleados)</li>
                      <li>Actividades de entretenimiento familiar con autorización parental</li>
                    </ul>
                    <p className="text-gray-600 mt-2"><strong>Prohibiciones expresas:</strong> No se podrá utilizar
                    datos de menores para fines publicitarios, comerciales o de marketing directo.</p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">5. DERECHOS DE LOS TITULARES</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  De conformidad con el artículo 8 de la Ley 1581 de 2012, los titulares de datos personales tienen
                  los siguientes derechos:
                </p>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong className="text-gray-900">a) Conocer, actualizar y rectificar sus datos personales</strong> frente a LF DREAMS S.A.S.
                    como Responsable del Tratamiento. Este derecho se podrá ejercer, entre otros, frente a datos parciales,
                    inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente
                    prohibido o no haya sido autorizado.
                  </p>
                  <p>
                    <strong className="text-gray-900">b) Solicitar prueba de la autorización otorgada</strong> a LF DREAMS S.A.S., salvo cuando
                    expresamente se exceptúe como requisito para el Tratamiento.
                  </p>
                  <p>
                    <strong className="text-gray-900">c) Ser informado por LF DREAMS S.A.S.,</strong> previa solicitud, respecto del uso que le ha
                    dado a sus datos personales.
                  </p>
                  <p>
                    <strong className="text-gray-900">d) Presentar ante la Superintendencia de Industria y Comercio (SIC)</strong> quejas por
                    infracciones a lo dispuesto en la Ley 1581 de 2012 y las demás normas que la modifiquen, adicionen o
                    complementen, previo trámite de consulta o reclamo ante el Responsable.
                  </p>
                  <p>
                    <strong className="text-gray-900">e) Revocar la autorización y/o solicitar la supresión del dato</strong> cuando en el Tratamiento
                    no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o
                    supresión procederá cuando la Superintendencia de Industria y Comercio haya determinado que en el
                    Tratamiento el Responsable o Encargado han incurrido en conductas contrarias a la ley y a la Constitución.
                  </p>
                  <p>
                    <strong className="text-gray-900">f) Acceder en forma gratuita</strong> a sus datos personales que hayan sido objeto de Tratamiento.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">6. PROCEDIMIENTOS PARA EL EJERCICIO DE DERECHOS (PQRSD)</h3>

                <h4 className="font-bold text-lg mb-3">6.1. Consultas</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Los Titulares o sus causahabientes podrán consultar la información personal del Titular que repose en
                  cualquier base de datos. LF DREAMS S.A.S. suministrará toda la información contenida en el registro
                  individual o que esté vinculada con la identificación del Titular. La consulta se atenderá en un término
                  máximo de diez (10) días hábiles contados a partir de la fecha de recibo de la misma.
                </p>

                <h4 className="font-bold text-lg mb-3">6.2. Reclamos</h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  El Titular o sus causahabientes que consideren que la información contenida en una base de datos debe ser
                  objeto de corrección, actualización o supresión, o cuando adviertan el presunto incumplimiento de cualquiera
                  de los deberes contenidos en la Ley 1581 de 2012, podrán presentar un reclamo ante LF DREAMS S.A.S., el
                  cual será tramitado bajo las siguientes reglas:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>El reclamo deberá contener: (i) identificación del Titular con nombre, domicilio y datos de contacto;
                  (ii) descripción de los hechos que dan lugar al reclamo; (iii) documentos que se quieran hacer valer.</li>
                  <li>Si el reclamo resulta incompleto, se requerirá al interesado dentro de los cinco (5) días siguientes
                  a la recepción del reclamo para que subsane las fallas. Transcurridos dos (2) meses desde la fecha del
                  requerimiento sin que el solicitante presente la información requerida, se entenderá que ha desistido
                  del reclamo.</li>
                  <li>Una vez recibido el reclamo completo, se incluirá en la base de datos una leyenda que diga "reclamo en
                  trámite" y el motivo del mismo, en un término no mayor a dos (2) días hábiles.</li>
                  <li>El término máximo para atender el reclamo será de quince (15) días hábiles contados a partir del día
                  siguiente a la fecha de su recibo. Cuando no fuere posible atender el reclamo dentro de dicho término,
                  se informará al interesado los motivos de la demora y la fecha en que se atenderá su reclamo, la cual
                  en ningún caso podrá superar los ocho (8) días hábiles siguientes al vencimiento del primer término.</li>
                </ul>

                <h4 className="font-bold text-lg mb-3">6.3. Canal de Atención</h4>
                <p className="text-gray-600 leading-relaxed">
                  Las consultas y reclamos pueden presentarse a través de los siguientes medios:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                  <li><strong>Correo electrónico:</strong> <a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a></li>
                  <li><strong>Sitio web:</strong> <a href="https://dreeeams.com" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a> (formulario de contacto)</li>
                  <li><strong>Asunto:</strong> "Ejercicio de Derechos - Protección de Datos Personales"</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">7. SEGURIDAD DE LA INFORMACIÓN</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  LF DREAMS S.A.S. ha implementado medidas técnicas, humanas y administrativas necesarias para otorgar
                  seguridad a los datos personales y evitar su adulteración, pérdida, consulta, uso o acceso no autorizado
                  o fraudulento. Estas medidas incluyen, entre otras:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Cifrado de datos sensibles en tránsito y en reposo</li>
                  <li>Control de acceso basado en roles y privilegios mínimos</li>
                  <li>Autenticación de múltiples factores para acceso a sistemas críticos</li>
                  <li>Monitoreo y registro de accesos a bases de datos</li>
                  <li>Copias de seguridad (backups) periódicas</li>
                  <li>Firewalls, sistemas de detección de intrusos y protección contra malware</li>
                  <li>Políticas de seguridad de la información y capacitación del personal</li>
                  <li>Acuerdos de confidencialidad con empleados y terceros</li>
                  <li>Auditorías de seguridad periódicas</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">8. TRANSFERENCIA Y TRANSMISIÓN DE DATOS</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  LF DREAMS S.A.S. podrá transferir o transmitir datos personales a terceros cuando:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>El Titular haya otorgado su autorización previa, expresa e informada</li>
                  <li>Sea necesario para la ejecución de un contrato entre el Titular y LF DREAMS S.A.S.</li>
                  <li>Se trate de transferencias legalmente exigidas para la salvaguardia del interés público, o para
                  el reconocimiento, ejercicio o defensa de un derecho en un proceso judicial</li>
                  <li>Se realice en el marco de fusiones, adquisiciones, ventas de activos u otras operaciones corporativas,
                  previa notificación al Titular</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Los terceros receptores de los datos personales quedarán obligados a cumplir la presente política y la
                  normatividad aplicable en materia de protección de datos personales.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Encargados del Tratamiento:</strong> LF DREAMS S.A.S. podrá contratar proveedores de servicios
                  tecnológicos (hosting, servicios en la nube, procesadores de pago, servicios de email marketing) que
                  actuarán como Encargados del Tratamiento. En estos casos, se suscribirán contratos de transmisión de
                  datos que garanticen el cumplimiento de la legislación de protección de datos.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">9. COOKIES Y TECNOLOGÍAS DE RASTREO</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  LF DREAMS S.A.S. utiliza cookies, web beacons, píxeles de seguimiento y tecnologías similares en su
                  sitio web y aplicaciones móviles para:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Recordar preferencias del usuario</li>
                  <li>Analizar el tráfico y comportamiento de los usuarios</li>
                  <li>Personalizar contenido y publicidad</li>
                  <li>Mejorar la seguridad y detectar fraudes</li>
                  <li>Medir la efectividad de campañas de marketing</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Los usuarios pueden configurar su navegador para rechazar cookies o recibir notificaciones cuando se
                  instalen. Sin embargo, la desactivación de cookies puede afectar la funcionalidad de nuestro sitio web.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Para más información sobre nuestra política de cookies, consulte nuestro documento específico sobre
                  Política de Cookies disponible en nuestro sitio web.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">10. TRATAMIENTO DE DATOS SENSIBLES</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Para el tratamiento de datos sensibles (salud, biométricos, orientación sexual, etc.), LF DREAMS S.A.S.
                  solicitará autorización explícita y específica del Titular. El tratamiento de estos datos solo se
                  realizará cuando:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>El Titular haya dado su autorización explícita</li>
                  <li>Sea necesario para salvaguardar el interés vital del Titular y este se encuentre física o
                  jurídicamente incapacitado</li>
                  <li>Sea efectuado en el curso de las actividades legítimas y con las debidas garantías por parte de una
                  fundación, ONG, asociación o cualquier otro organismo sin ánimo de lucro</li>
                  <li>Se trate de datos que sean necesarios para el reconocimiento, ejercicio o defensa de un derecho en
                  un proceso judicial</li>
                  <li>Tenga una finalidad estadística o científica, con previa disociación de los datos</li>
                </ul>
              </div>

              {/* Section 11 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">11. VIGENCIA Y MODIFICACIONES</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  La presente Política de Tratamiento de Datos Personales rige a partir de Enero de 2026 y estará vigente
                  hasta que sea modificada.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  LF DREAMS S.A.S. se reserva el derecho de modificar esta política en cualquier momento. Cualquier
                  cambio será informado a través de nuestro sitio web <a href="https://dreeeams.com" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a> con
                  al menos diez (10) días calendario de anticipación a su entrada en vigencia.
                </p>
              </div>

              {/* Section 12 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">12. LEY APLICABLE Y JURISDICCIÓN</h3>
                <p className="text-gray-600 leading-relaxed">
                  Esta Política se rige por las leyes de la República de Colombia, especialmente por la Ley 1581 de 2012,
                  el Decreto 1074 de 2015 y las demás normas que las complementen o modifiquen. Cualquier controversia
                  derivada de la aplicación de esta política se someterá a la jurisdicción de los tribunales competentes
                  de Bogotá D.C., Colombia y a la autoridad de la Superintendencia de Industria y Comercio como autoridad
                  de control.
                </p>
              </div>

              {/* Contact Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">INFORMACIÓN DE CONTACTO</h3>
                <div className="text-gray-600 space-y-2">
                  <p><strong className="text-gray-900">Responsable del Tratamiento:</strong> LF DREAMS S.A.S.</p>
                  <p><strong className="text-gray-900">NIT:</strong> 902.022.315-1</p>
                  <p><strong className="text-gray-900">Domicilio:</strong> Bogotá D.C., Colombia</p>
                  <p><strong className="text-gray-900">Correo electrónico:</strong> <a href="mailto:info@dreeeams.com" className="text-gray-900 hover:text-brand transition-colors">info@dreeeams.com</a></p>
                  <p><strong className="text-gray-900">Sitio web:</strong> <a href="https://dreeeams.com" className="text-gray-900 hover:text-brand transition-colors" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a></p>
                  <p className="mt-4"><strong className="text-gray-900">Asunto para ejercicio de derechos:</strong> "Protección de Datos Personales - PQRSD"</p>
                </div>
              </div>
            </section>

          {/* Footer Links */}
          <div className="pt-12 border-t border-gray-200 mt-20">
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
              <Link href={`/${locale}/terms`} className="hover:text-black transition-colors">
                Términos y Condiciones
              </Link>
              <span className="text-gray-300">•</span>
              <Link href={`/${locale}/privacy`} className="hover:text-black transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // English version
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <svg
              width="24"
              height="28"
              viewBox="0 0 97 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-auto"
              role="img"
              aria-labelledby="logo-title-privacy-en"
            >
              <title id="logo-title-privacy-en">Dream Studio Logo</title>
              <g filter="url(#filter0_d_privacy_en)">
                <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="currentColor" className="text-black"/>
              </g>
              <defs>
                <filter id="filter0_d_privacy_en" x="0" y="0" width="96.1645" height="113.29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_privacy_en"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_privacy_en" result="shape"/>
                </filter>
              </defs>
            </svg>
            <span className="text-lg font-logo">DREEEAMS</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-3">
            PRIVACY POLICY
          </h1>
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <p className="text-gray-600 leading-relaxed mb-4">
          For detailed information about how we collect, use, and protect your personal information,
          please refer to our Spanish privacy policy or contact us at{' '}
          <a href="mailto:info@dreeeams.com" className="text-gray-900 hover:text-brand transition-colors">info@dreeeams.com</a>.
        </p>

        {/* Footer Links */}
        <div className="pt-12 border-t border-gray-200 mt-20">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
            <Link href={`/${locale}/terms`} className="hover:text-black transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-300">•</span>
            <Link href={`/${locale}/privacy`} className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

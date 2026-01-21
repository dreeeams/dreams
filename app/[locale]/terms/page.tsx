import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreeeams.com';

  const metadata = {
    en: {
      title: 'Terms of Service | Dream Studio',
      description: 'Read our terms of service and understand the agreement between Dream Studio and our clients.',
    },
    es: {
      title: 'Términos y Condiciones | LF DREAMS S.A.S.',
      description: 'Términos y condiciones de uso y prestación de servicios tecnológicos de LF DREAMS S.A.S.',
    },
  };

  const meta = locale === 'es' ? metadata.es : metadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: {
        en: `${baseUrl}/en/terms`,
        es: `${baseUrl}/es/terms`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${locale}/terms`,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (locale === 'es') {
    return (
      <div className="min-h-screen bg-white">
        {/* Minimal Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 w-full">
            <Link href="/" className="inline-flex items-center mb-8 hover:opacity-80 transition-opacity">
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
              TÉRMINOS Y CONDICIONES DE USO Y PRESTACIÓN DE SERVICIOS TECNOLÓGICOS
            </h1>
            <p className="text-sm text-gray-500">Última Actualización: Enero 2026</p>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
          {/* Company Info */}
          <section className="mb-12">
            <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">INFORMACIÓN DE LA COMPAÑÍA</h2>
            <div className="text-gray-600 space-y-2">
              <p><strong className="text-gray-900">Razón Social:</strong> LF DREAMS S.A.S.</p>
              <p><strong className="text-gray-900">NIT:</strong> 902.022.315-1</p>
              <p><strong className="text-gray-900">Domicilio:</strong> Bogotá D.C., Colombia</p>
              <p><strong className="text-gray-900">Correo electrónico:</strong> <a href="mailto:info@dreeeams.com" className="text-gray-900 hover:text-brand transition-colors">info@dreeeams.com</a></p>
              <p><strong className="text-gray-900">Sitio web:</strong> <a href="https://dreeeams.com" className="text-gray-900 hover:text-brand transition-colors" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a></p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
              1. OBJETO Y ALCANCE
            </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Los presentes Términos y Condiciones regulan la relación contractual entre <strong>LF DREAMS S.A.S.</strong> (en
                adelante, "LF DREAMS" o "el Prestador") y el Cliente (persona natural o jurídica) para la prestación de
                <strong> servicios tecnológicos de desarrollo de software de boletería electrónica</strong> para eventos.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Naturaleza de la Relación:</strong> La relación entre LF DREAMS y el Cliente es exclusivamente
                <strong> Business-to-Business (B2B)</strong>. LF DREAMS actúa como proveedor de tecnología y NO mantiene
                relación contractual directa con los usuarios finales (compradores de boletas). El Cliente (organizador del
                evento) es el único responsable frente a sus consumidores finales.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                2. SERVICIOS OFRECIDOS
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS proporciona una plataforma tecnológica SaaS (Software as a Service) para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li className="text-gray-600">Emisión y venta de boletas electrónicas para eventos</li>
                <li className="text-gray-600">Gestión de eventos y control de acceso mediante códigos QR</li>
                <li className="text-gray-600">Procesamiento de pagos electrónicos (a través de pasarelas de terceros)</li>
                <li className="text-gray-600">Dashboard administrativo para organizadores de eventos</li>
                <li className="text-gray-600">Reportes y análisis de ventas</li>
                <li className="text-gray-600">Integración con plataformas de pago (PSE, tarjetas de crédito/débito, Nequi, etc.)</li>
                <li className="text-gray-600">Soporte técnico durante eventos (opcional, según plan contratado)</li>
              </ul>
              <p className="text-gray-900 leading-relaxed font-medium">
                Importante: LF DREAMS NO organiza eventos, NO vende boletas a consumidores finales, y NO es responsable
                por la realización, cancelación o modificación de eventos. Estas responsabilidades son exclusivas del Cliente.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                3. PROCESO CONTRACTUAL Y ONBOARDING
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">3.1. Cotización y Propuesta Comercial</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todo proyecto inicia con una cotización detallada que incluye:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Alcance de servicios (funcionalidades incluidas)</li>
                <li className="text-gray-600">Costos de licencia o comisión por boleta</li>
                <li className="text-gray-600">Costos de procesamiento de pagos (si aplica)</li>
                <li className="text-gray-600">Tiempos de implementación</li>
                <li className="text-gray-600">Servicios adicionales (personalización, soporte 24/7, etc.)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">3.2. Aceptación y Firma del Contrato</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                El contrato se perfecciona mediante:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Firma de contrato físico o electrónico (DocuSign, Adobe Sign, o similar)</li>
                <li className="text-gray-600">Aceptación de estos Términos y Condiciones</li>
                <li className="text-gray-600">Pago del anticipo o primera cuota (según modalidad contratada)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">3.3. Onboarding y Configuración</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Una vez firmado el contrato, LF DREAMS procederá a:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-1">
                <li className="text-gray-600">Crear cuenta del Cliente en la plataforma</li>
                <li className="text-gray-600">Configurar perfil del evento (branding, información, precios)</li>
                <li className="text-gray-600">Integrar pasarelas de pago</li>
                <li className="text-gray-600">Realizar pruebas de funcionalidad</li>
                <li className="text-gray-600">Capacitar al equipo del Cliente en el uso de la plataforma</li>
              </ol>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                4. MODALIDADES DE PAGO Y FACTURACIÓN
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">4.1. Modalidades de Pago</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Opción A: Comisión por Boleta Vendida</h4>
                  <p className="text-gray-600 mb-2">LF DREAMS cobra un porcentaje o valor fijo por cada boleta vendida exitosamente.</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li className="text-gray-600">Rango típico: 3% - 7% del valor de la boleta + IVA</li>
                    <li className="text-gray-600">Cobro automático mediante retención en la liquidación</li>
                    <li className="text-gray-600">Pago al Cliente: transferencia cada 48-72 horas hábiles post-evento</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Opción B: Licencia Mensual/Anual Fija</h4>
                  <p className="text-gray-600 mb-2">El Cliente paga una tarifa fija mensual o anual sin comisiones por boleta.</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li className="text-gray-600">Incluye cantidad limitada o ilimitada de eventos/boletas</li>
                    <li className="text-gray-600">Facturación mensual anticipada</li>
                    <li className="text-gray-600">Ideal para organizadores con alto volumen de eventos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Opción C: Proyecto a Medida (Precio Fijo)</h4>
                  <p className="text-gray-600 mb-2">Para desarrollos personalizados con funcionalidades específicas.</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li className="text-gray-600">Esquema de hitos: 50% anticipo, 30% entrega beta, 20% entrega final</li>
                    <li className="text-gray-600">Requiere especificaciones técnicas detalladas</li>
                    <li className="text-gray-600">Tiempo de implementación: 4-12 semanas según complejidad</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">4.2. Facturación Electrónica</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Todas las facturas se emiten electrónicamente conforme a la normativa tributaria colombiana (Resolución DIAN 000042 de 2020).
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li className="text-gray-600">Envío automático al correo electrónico registrado</li>
                <li className="text-gray-600">Plazo de pago: 15 días calendario (salvo pacto contrario)</li>
                <li className="text-gray-600">Intereses de mora: 1.5% mensual sobre saldo vencido</li>
              </ul>
            </section>

            {/* Section 5 - IP */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                5. PROPIEDAD INTELECTUAL
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">5.1. Propiedad Intelectual de Fondo (Background IP)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>LF DREAMS retiene la propiedad exclusiva</strong> sobre:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Plataforma base, frameworks, bibliotecas de código, módulos reutilizables</li>
                <li className="text-gray-600">Algoritmos, arquitectura de software, bases de datos</li>
                <li className="text-gray-600">Marca LF DREAMS, logos, diseños corporativos</li>
                <li className="text-gray-600">Documentación técnica, manuales, metodologías</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Licencia otorgada:</strong> El Cliente recibe una licencia <strong>no exclusiva, intransferible,
                revocable</strong> para usar la plataforma únicamente para los fines contratados.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">5.2. Propiedad Intelectual de Forma (Foreground IP)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Para proyectos de desarrollo a medida:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li className="text-gray-600"><strong>Durante el desarrollo:</strong> LF DREAMS retiene todos los derechos sobre el código en desarrollo.</li>
                <li className="text-gray-600"><strong>Después del pago completo (100%):</strong> La propiedad intelectual del código personalizado
                (Foreground IP) se transfiere al Cliente mediante cesión de derechos patrimoniales.</li>
                <li className="text-gray-600"><strong>Si no se completa el pago:</strong> LF DREAMS mantiene la propiedad del código desarrollado y puede
                reutilizarlo en otros proyectos.</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">5.3. Uso de Marca del Cliente</h3>
              <p className="text-gray-600 leading-relaxed">
                El Cliente otorga a LF DREAMS licencia para usar su marca, logo y nombre comercial exclusivamente para:
                (i) prestar los servicios contratados; (ii) incluir el proyecto en portafolio comercial (con aprobación previa del Cliente).
              </p>
            </section>

            {/* Section 6 - Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                6. GARANTÍAS Y LIMITACIONES
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">6.1. Garantía del Software</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS garantiza que el software:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Funcionará conforme a las especificaciones técnicas documentadas</li>
                <li className="text-gray-600">Estará disponible el 99.5% del tiempo (uptime SLA)</li>
                <li className="text-gray-600">Será actualizado periódicamente con mejoras y parches de seguridad</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Período de garantía para proyectos a medida:</strong> 30 días después de la entrega final para
                corrección de bugs y errores funcionales.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">6.2. Exclusiones de Garantía</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS <strong>NO garantiza ni se responsabiliza</strong> por:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li className="text-gray-600"><strong>Fallas de terceros:</strong> Caídas de pasarelas de pago (PSE, Redeban, etc.), servidores de
                hosting, proveedores de internet, APIs externas (Facebook, Google, etc.)</li>
                <li className="text-gray-600"><strong>Cambios en plataformas externas:</strong> Actualizaciones de iOS/Android que afecten compatibilidad,
                cambios en políticas de App Store/Play Store, modificaciones en APIs de terceros</li>
                <li className="text-gray-600"><strong>Modificaciones no autorizadas:</strong> Cambios realizados por el Cliente o terceros en el código fuente</li>
                <li className="text-gray-600"><strong>Fuerza mayor:</strong> Terremotos, inundaciones, ciberataques masivos, cambios regulatorios drásticos</li>
                <li className="text-gray-600"><strong>Contenido del Cliente:</strong> Imágenes, textos, videos proporcionados por el Cliente (que violen
                derechos de autor, contengan malware, etc.)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">6.3. Responsabilidad por Eventos</h3>
              <div className="p-4 bg-gray-50 mb-4">
                <p className="font-medium text-gray-900 mb-2">CLÁUSULA CRÍTICA:</p>
                <p className="text-gray-600 mb-3">
                  <strong className="text-gray-900">El Cliente (organizador del evento) es el ÚNICO responsable</strong> frente a los consumidores finales
                  (compradores de boletas) por:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li className="text-gray-600">Cancelación, reprogramación o modificación del evento</li>
                  <li className="text-gray-600">Emisión de reembolsos o devoluciones</li>
                  <li className="text-gray-600">Atención de PQRS (Peticiones, Quejas, Reclamos y Solicitudes)</li>
                  <li className="text-gray-600">Cumplimiento de la Ley 1480 de 2011 (Estatuto del Consumidor)</li>
                  <li className="text-gray-600">Seguridad y logística del evento</li>
                  <li className="text-gray-600">Veracidad de la información del evento publicada</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                LF DREAMS actúa únicamente como proveedor tecnológico y NO asume responsabilidades derivadas de la relación
                consumidor-organizador.
              </p>
            </section>

            {/* Section 7 - Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                7. LIMITACIÓN DE RESPONSABILIDAD
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">7.1. Monto Máximo de Responsabilidad</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                La responsabilidad total de LF DREAMS bajo este contrato, por cualquier causa (contractual, extracontractual,
                negligencia), <strong>no excederá</strong> el monto total pagado por el Cliente a LF DREAMS en los 12 meses
                inmediatamente anteriores al evento que originó el reclamo.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">7.2. Exclusión de Daños Indirectos</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS <strong>NO será responsable</strong> por:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li className="text-gray-600">Lucro cesante, pérdida de beneficios o ingresos esperados</li>
                <li className="text-gray-600">Daño reputacional o pérdida de oportunidades comerciales</li>
                <li className="text-gray-600">Daños indirectos, consecuenciales o punitivos</li>
                <li className="text-gray-600">Pérdida de datos (salvo que exista respaldo y el Cliente haya pagado por este servicio)</li>
              </ul>
            </section>

            {/* Section 8 - Payment Processing */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                8. PROCESAMIENTO DE PAGOS Y LIQUIDACIÓN
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">8.1. Pasarelas de Pago</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS integra pasarelas de pago de terceros (ej: Wompi, PayU, Mercado Pago, Addi). El Cliente debe:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Crear su propia cuenta en la pasarela de pago</li>
                <li className="text-gray-600">Aceptar los términos y condiciones de la pasarela</li>
                <li className="text-gray-600">Completar el proceso de validación KYC (Know Your Customer)</li>
                <li className="text-gray-600">Configurar sus credenciales de API en la plataforma LF DREAMS</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Importante:</strong> Los fondos de las ventas se depositan directamente en la cuenta del Cliente
                (o en subcuenta gestionada por LF DREAMS según acuerdo). LF DREAMS <strong>NO retiene dineros del Cliente</strong>
                salvo su comisión pactada.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">8.2. Liquidación y Transferencia de Fondos</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cronograma típico de liquidación:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-4">
                <li className="text-gray-600"><strong>T+0 (día del evento):</strong> Cierre de ventas y conciliación de transacciones</li>
                <li className="text-gray-600"><strong>T+1:</strong> Generación de reporte de ventas y liquidación</li>
                <li className="text-gray-600"><strong>T+2 a T+3:</strong> Transferencia de fondos al Cliente (descontando comisión de LF DREAMS)</li>
              </ol>
              <p className="text-gray-600 leading-relaxed">
                <strong>Retenciones aplicables:</strong> Retención en la fuente (según legislación tributaria colombiana),
                comisión LF DREAMS, costo de pasarela de pago.
              </p>
            </section>

            {/* Section 9 - PQRS */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                9. PQRS Y ATENCIÓN AL CLIENTE
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">9.1. Responsabilidad del Cliente</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                El Cliente <strong>DEBE proporcionar</strong> a los consumidores finales:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Canales de atención directa (email, WhatsApp, teléfono)</li>
                <li className="text-gray-600">Política de reembolsos clara y accesible</li>
                <li className="text-gray-600">Procedimiento de PQRS conforme a la Ley 1480 de 2011</li>
                <li className="text-gray-600">Respuesta a reclamos en máximo 15 días hábiles</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">9.2. Soporte de LF DREAMS</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS proporciona soporte técnico al Cliente (NO al consumidor final) para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li className="text-gray-600">Problemas técnicos de la plataforma</li>
                <li className="text-gray-600">Dudas sobre configuración de eventos</li>
                <li className="text-gray-600">Reportes y análisis de datos</li>
                <li className="text-gray-600">Integración con herramientas externas</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                <strong>Canales de soporte:</strong> Email (<a href="mailto:info@dreeeams.com" className="text-brand hover:underline">info@dreeeams.com</a>),
                chat en plataforma (horario hábil), soporte telefónico (planes premium).
              </p>
            </section>

            {/* Section 10 - Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                10. DURACIÓN Y TERMINACIÓN
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">10.1. Duración del Contrato</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600"><strong>Contratos por evento:</strong> Desde la firma hasta 30 días después del evento</li>
                <li className="text-gray-600"><strong>Licencias mensuales:</strong> Renovación automática cada mes salvo notificación previa</li>
                <li className="text-gray-600"><strong>Licencias anuales:</strong> 12 meses desde la firma, renovación automática salvo aviso con 30 días de anticipación</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">10.2. Terminación Anticipada por el Cliente</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                El Cliente puede terminar el contrato con notificación de 30 días, sujeto a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Pago de todos los servicios prestados hasta la fecha de terminación</li>
                <li className="text-gray-600">Penalidad de terminación anticipada: 20% del valor restante del contrato (si aplica)</li>
                <li className="text-gray-600">Entrega formal de datos y cierre de cuentas</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">10.3. Terminación por Incumplimiento</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS puede terminar el contrato inmediatamente si el Cliente:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Incumple pagos por más de 15 días</li>
                <li className="text-gray-600">Utiliza la plataforma para actividades ilegales (fraude, lavado de activos, etc.)</li>
                <li className="text-gray-600">Viola derechos de propiedad intelectual</li>
                <li className="text-gray-600">Incumple obligaciones legales frente a consumidores generando daño reputacional a LF DREAMS</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">10.4. Efectos de la Terminación</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Al terminar el contrato:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li className="text-gray-600">Suspensión inmediata del acceso a la plataforma</li>
                <li className="text-gray-600">Entrega de datos del Cliente en formato estándar (CSV, JSON) dentro de 30 días</li>
                <li className="text-gray-600">Eliminación de datos personales conforme a política de privacidad (90 días post-terminación)</li>
                <li className="text-gray-600">El Cliente debe dejar de usar marcas y materiales de LF DREAMS</li>
              </ul>
            </section>

            {/* Section 11 - Modifications */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                11. MODIFICACIONES AL SERVICIO
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                LF DREAMS se reserva el derecho de:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li className="text-gray-600"><strong>Actualizar la plataforma:</strong> Nuevas funcionalidades, mejoras de seguridad, cambios de diseño
                (sin afectar funcionalidades core contratadas)</li>
                <li className="text-gray-600"><strong>Modificar precios:</strong> Con notificación de 60 días. El Cliente puede rechazar y terminar el
                contrato sin penalidad.</li>
                <li className="text-gray-600"><strong>Descontinuar funcionalidades:</strong> Si una funcionalidad se vuelve técnicamente inviable,
                LF DREAMS notificará con 90 días de anticipación y ofrecerá alternativas.</li>
              </ul>
            </section>

            {/* Section 12 - Legal */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">
                12. DISPOSICIONES LEGALES
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-3">12.1. Ley Aplicable</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Este contrato se rige por las leyes de la República de Colombia. Legislación aplicable:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li className="text-gray-600">Código de Comercio (Decreto 410 de 1971)</li>
                <li className="text-gray-600">Ley 1480 de 2011 (Estatuto del Consumidor) - aplicable a relación Cliente-Consumidor Final</li>
                <li className="text-gray-600">Ley 1581 de 2012 (Protección de Datos Personales)</li>
                <li className="text-gray-600">Ley 527 de 1999 (Comercio Electrónico y Firmas Digitales)</li>
                <li className="text-gray-600">Ley 23 de 1982 (Derechos de Autor)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">12.2. Jurisdicción y Resolución de Conflictos</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Las partes acuerdan:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-4">
                <li className="text-gray-600"><strong>Conciliación prejudicial:</strong> Ante Centro de Conciliación de la Cámara de Comercio de Bogotá
                (procedimiento de 30 días)</li>
                <li className="text-gray-600"><strong>Arbitraje:</strong> Si la conciliación falla, arbitraje institucional ante Centro de Arbitraje y
                Conciliación de la Cámara de Comercio de Bogotá, con 1 o 3 árbitros según cuantía</li>
                <li className="text-gray-600"><strong>Idioma:</strong> Español</li>
                <li className="text-gray-600"><strong>Sede:</strong> Bogotá D.C., Colombia</li>
              </ol>

              <h3 className="text-lg font-medium text-gray-900 mb-3">12.3. Divisibilidad</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Si alguna disposición de estos Términos se declara inválida, las demás cláusulas permanecerán en pleno vigor.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">12.4. Cesión</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                El Cliente NO puede ceder este contrato sin consentimiento previo y escrito de LF DREAMS. LF DREAMS puede ceder
                el contrato en caso de fusión, adquisición o reorganización corporativa.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">12.5. Notificaciones</h3>
              <p className="text-gray-600 leading-relaxed">
                Todas las notificaciones se enviarán a las direcciones de correo electrónico registradas o mediante la plataforma.
                Se consideran recibidas 24 horas después del envío.
              </p>
            </section>

            {/* Section 13 - Acceptance */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">13. ACEPTACIÓN DE TÉRMINOS</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Al firmar el contrato, utilizar la plataforma o realizar el pago, el Cliente declara:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li className="text-gray-600">Haber leído, entendido y aceptado estos Términos y Condiciones en su totalidad</li>
                <li className="text-gray-600">Tener capacidad legal y autorización para contratar en nombre de su empresa</li>
                <li className="text-gray-600">Comprender que LF DREAMS es proveedor tecnológico B2B y NO tiene relación con consumidores finales</li>
                <li className="text-gray-600">Asumir todas las responsabilidades legales frente a compradores de boletas</li>
                <li className="text-gray-600">Cumplir con la legislación colombiana aplicable (protección al consumidor, protección de datos, tributaria)</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-light mb-6 pb-3 border-b border-gray-200">CONTACTO</h2>
              <div className="text-gray-600 space-y-2">
                <p><strong className="text-gray-900">LF DREAMS S.A.S.</strong></p>
                <p><strong className="text-gray-900">NIT:</strong> 902.022.315-1</p>
                <p><strong className="text-gray-900">Domicilio:</strong> Bogotá D.C., Colombia</p>
                <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dreeeams.com" className="text-gray-900 hover:text-brand transition-colors">info@dreeeams.com</a></p>
                <p><strong className="text-gray-900">Web:</strong> <a href="https://dreeeams.com" className="text-gray-900 hover:text-brand transition-colors" target="_blank" rel="noopener noreferrer">https://dreeeams.com</a></p>
                <p className="mt-4 text-sm">
                  Para dudas sobre estos términos, consultas comerciales o soporte técnico, contáctanos a través de los
                  canales indicados.
                </p>
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
          <Link href="/" className="inline-flex items-center mb-8 hover:opacity-80 transition-opacity">
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
            TERMS OF SERVICE
          </h1>
          <p className="text-sm text-gray-500">Last Updated: January 2026</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        <p className="text-gray-600 leading-relaxed mb-4">
          For detailed terms and conditions information, please refer to our Spanish terms page
          or contact us at{' '}
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

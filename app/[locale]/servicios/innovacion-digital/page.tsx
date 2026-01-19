'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function InnovacionDigitalPage() {
  const t = useTranslations();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Transformación Digital 360',
      description: 'Modernizamos todos tus procesos, desde operaciones hasta atención al cliente, implementando tecnologías que reducen costos operativos en hasta 60% mientras mejoran la satisfacción del cliente.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Estrategia de Innovación',
      description: 'Identificamos oportunidades de innovación mediante análisis predictivo y benchmarking competitivo, diseñando roadmaps tecnológicos que te posicionan como líder del mercado.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Data Analytics Avanzado',
      description: 'Convertimos terabytes de datos en insights accionables con dashboards en tiempo real, machine learning y visualizaciones que permiten decisiones informadas y aumentan la rentabilidad.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Arquitectura Cloud Native',
      description: 'Diseñamos infraestructuras cloud escalables en AWS, Azure o GCP con Kubernetes, microservicios y serverless, reduciendo costos de infraestructura hasta 70% con auto-scaling inteligente.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Automatización Inteligente',
      description: 'Automatizamos procesos complejos con RPA e IA, liberando hasta 80% del tiempo de tu equipo en tareas repetitivas para enfocarse en actividades estratégicas de alto valor.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Gestión del Cambio',
      description: 'Acompañamos la transformación con capacitación personalizada, change management y soporte continuo, asegurando adopción exitosa con tasas de satisfacción superiores al 95%.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Optimización de Costos',
      description: 'Análisis exhaustivo de gastos tecnológicos identificando oportunidades de ahorro, renegociación de contratos y optimización de recursos con ROI medible desde el primer trimestre.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Compliance & Gobernanza',
      description: 'Implementamos frameworks de gobernanza digital, políticas de datos y compliance con regulaciones internacionales (GDPR, SOC 2) protegiendo tu inversión y reputación.',
    },
  ];

  const successCases = [
    {
      industry: 'E-commerce',
      challenge: 'Plataforma legacy obsoleta con tiempos de carga de 8+ segundos causando 65% de abandono de carrito',
      solution: 'Migración completa a arquitectura cloud serverless con CDN global, implementación de PWA y optimización de checkout',
      results: [
        { metric: '89%', label: 'Reducción en tiempo de carga' },
        { metric: '156%', label: 'Aumento en conversiones' },
        { metric: '3.2M USD', label: 'Revenue incremental anual' }
      ]
    },
    {
      industry: 'Fintech',
      challenge: 'Procesos manuales de onboarding que tomaban 5 días, limitando crecimiento y aumentando costos operativos',
      solution: 'Automatización end-to-end con OCR, validación biométrica, integraciones API bancarias y workflows inteligentes',
      results: [
        { metric: '92%', label: 'Reducción en tiempo de onboarding' },
        { metric: '74%', label: 'Disminución de costos operativos' },
        { metric: '4X', label: 'Aumento en nuevos clientes/mes' }
      ]
    },
    {
      industry: 'Manufactura',
      challenge: 'Falta de visibilidad en cadena de suministro causando sobrecostos de inventario y retrasos en producción',
      solution: 'Plataforma IoT con sensores en tiempo real, analytics predictivo y sistema de alertas automatizadas con IA',
      results: [
        { metric: '67%', label: 'Reducción de inventario muerto' },
        { metric: '43%', label: 'Mejora en tiempos de entrega' },
        { metric: '2.8M USD', label: 'Ahorro anual en inventario' }
      ]
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Diagnóstico Digital Profundo',
      description: 'Realizamos una auditoría 360 de tu madurez digital, analizando tecnología, procesos, personas y cultura organizacional.',
      tasks: [
        'Auditoría tecnológica completa de infraestructura actual',
        'Mapeo y análisis de procesos críticos del negocio',
        'Evaluación de capacidades digitales del equipo',
        'Benchmarking competitivo y análisis de mercado'
      ],
    },
    {
      number: '02',
      title: 'Diseño de Estrategia Digital',
      description: 'Co-creamos una hoja de ruta personalizada alineada con objetivos de negocio, priorizando iniciativas por impacto y viabilidad.',
      tasks: [
        'Definición de KPIs y métricas de éxito medibles',
        'Roadmap tecnológico priorizado por quick wins',
        'Plan de inversión detallado con ROI proyectado',
        'Estrategia de change management y comunicación'
      ],
    },
    {
      number: '03',
      title: 'Implementación Ágil',
      description: 'Ejecutamos en sprints de 2 semanas con entregas incrementales, validando hipótesis y ajustando basados en datos reales.',
      tasks: [
        'Desarrollo ágil con daily standups y demos semanales',
        'Integración continua de sistemas legacy y nuevos',
        'Migración segura de datos sin interrumpir operaciones',
        'Testing exhaustivo con usuarios reales en cada sprint'
      ],
    },
    {
      number: '04',
      title: 'Optimización Continua',
      description: 'Monitoreamos KPIs en tiempo real, identificamos oportunidades de mejora y escalamos soluciones exitosas a toda la organización.',
      tasks: [
        'Dashboard de KPIs con alertas automáticas 24/7',
        'Sprint de mejora continua cada 2 semanas',
        'Soporte técnico y evolutivo con SLA garantizado',
        'Actualizaciones y nuevas features basadas en feedback'
      ],
    },
  ];

  const technologies = [
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'Google Cloud', category: 'Cloud' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Terraform', category: 'DevOps' },
    { name: 'Power BI', category: 'Analytics' },
    { name: 'Tableau', category: 'Analytics' },
    { name: 'Apache Kafka', category: 'Data' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Python', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image Placeholder */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-bold mb-8 hover:text-blue-600 transition-colors">
            ← Volver al inicio
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-nostalgic mb-6 leading-tight">
                INNOVACIÓN & TRANSFORMACIÓN DIGITAL
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Aceleramos tu transformación digital con estrategias innovadoras respaldadas por datos,
                generando ROI medible desde el primer trimestre.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/#contact"
                  className="px-8 py-4 bg-black text-white font-bold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Solicitar Consultoría Gratuita
                </a>
                <a
                  href="#proceso"
                  className="px-8 py-4 border-2 border-black font-bold hover:bg-black hover:text-white transition-all"
                >
                  Ver Nuestro Proceso
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl border-4 border-black shadow-2xl flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }} />
                <div className="text-center z-10">
                  <svg className="w-32 h-32 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-white font-bold text-lg">
                    [IMAGEN: Dashboard de transformación digital mostrando métricas en tiempo real, gráficos de ROI y arquitectura cloud]
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '120+', label: 'Empresas Transformadas' },
              { number: '73%', label: 'Reducción Promedio de Costos' },
              { number: '4.2X', label: 'ROI Promedio en 12 Meses' },
              { number: '89+', label: 'Proyectos de Innovación' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">SERVICIOS INCLUIDOS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones integrales end-to-end para acelerar tu transformación digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border-2 border-black hover:bg-black hover:text-white hover:shadow-2xl hover:-translate-y-1 transition-all group"
              >
                <div className="mb-4 text-blue-600 group-hover:text-blue-400 transition-colors">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">CASOS DE ÉXITO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resultados reales y medibles en diferentes industrias
            </p>
          </motion.div>

          <div className="space-y-8">
            {successCases.map((case_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 md:p-10 border-2 border-black shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold text-sm mb-6">
                  {case_.industry}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Desafío</h4>
                    <p className="text-gray-700 leading-relaxed">{case_.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Solución</h4>
                    <p className="text-gray-700 leading-relaxed">{case_.solution}</p>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-4">Resultados</h4>
                  <div className="grid grid-cols-3 gap-6">
                    {case_.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{result.metric}</div>
                        <div className="text-sm text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">NUESTRO PROCESO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodología probada en 120+ transformaciones digitales exitosas
            </p>
          </motion.div>

          <div className="space-y-12">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-50 to-cyan-50' : 'from-cyan-50 to-blue-50'} p-8 md:p-12 border-l-8 border-blue-600 shadow-lg`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  <div className="md:w-1/3">
                    <div className="text-7xl font-mono font-bold text-blue-600 mb-4 opacity-50">{step.number}</div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">{taskIndex + 1}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700 leading-relaxed">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">TECNOLOGÍAS QUE DOMINAMOS</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stack tecnológico enterprise de última generación
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white bg-opacity-5 border border-blue-500 p-4 text-center hover:bg-blue-600 hover:border-blue-400 transition-all hover:scale-105 group"
              >
                <div className="text-sm font-bold text-blue-400 group-hover:text-white mb-1">{tech.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-blue-200">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-6">
              ¿LISTO PARA TRANSFORMAR TU NEGOCIO?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Agenda una consultoría estratégica gratuita de 60 minutos. Analizaremos tu situación
              actual y diseñaremos un roadmap personalizado con ROI proyectado.
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Agendar Consultoría Gratuita
            </a>
            <p className="text-sm text-blue-200 mt-4">Sin compromiso. Garantía de valor en la primera sesión.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

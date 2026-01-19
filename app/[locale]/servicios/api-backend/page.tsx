'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function APIBackendPage() {
  const t = useTranslations();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'APIs RESTful Enterprise',
      description: 'Diseñamos APIs REST escalables con documentación OpenAPI completa, versionado semántico, rate limiting inteligente y cacheo distribuido para manejar millones de requests diarios.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'GraphQL APIs',
      description: 'Implementamos APIs GraphQL con resolvers optimizados, DataLoader para n+1 queries, subscriptions en tiempo real y schema stitching para microservicios distribuidos.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'Arquitectura de Datos',
      description: 'Diseñamos bases de datos relacionales (PostgreSQL, MySQL) y NoSQL (MongoDB, Redis, Cassandra) con índices optimizados, sharding y replicación para alta disponibilidad.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Microservicios Cloud',
      description: 'Arquitecturas de microservicios con Docker, Kubernetes, service mesh (Istio), API Gateway, circuit breakers y distributed tracing para sistemas resilientes.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Seguridad Avanzada',
      description: 'Implementación de OAuth 2.0, JWT, API keys, CORS policies, rate limiting por usuario, encriptación end-to-end y auditoría completa de accesos con logging centralizado.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Testing & CI/CD',
      description: 'Suite completa de pruebas unitarias (90%+ coverage), integración, e2e y load testing con K6. Pipelines automatizados con GitHub Actions, Jenkins o GitLab CI.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Monitoreo & Observabilidad',
      description: 'Instrumentación completa con Prometheus, Grafana, ELK stack, distributed tracing con Jaeger, alertas inteligentes y dashboards en tiempo real con SLIs y SLOs.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Documentación Interactiva',
      description: 'Documentación auto-generada con Swagger/OpenAPI, Postman collections, ejemplos de código en múltiples lenguajes, SDKs client y guías de integración completas.',
    },
  ];

  const successCases = [
    {
      industry: 'SaaS B2B',
      challenge: 'API monolítica con tiempos de respuesta de 2+ segundos y caídas frecuentes durante picos de tráfico',
      solution: 'Migración a arquitectura de microservicios con Kubernetes, implementación de cache distribuido con Redis y CDN para assets estáticos',
      results: [
        { metric: '94%', label: 'Reducción en latencia (120ms promedio)' },
        { metric: '99.99%', label: 'Uptime garantizado con SLA' },
        { metric: '10X', label: 'Capacidad de requests/seg' }
      ]
    },
    {
      industry: 'Fintech',
      challenge: 'Necesidad de procesar 50K transacciones/minuto con cumplimiento PCI-DSS y zero downtime',
      solution: 'API event-driven con Kafka, PostgreSQL con sharding, circuit breakers, rate limiting avanzado y failover automático multi-región',
      results: [
        { metric: '100%', label: 'Compliance PCI-DSS nivel 1' },
        { metric: '0', label: 'Downtime en 18 meses' },
        { metric: '65ms', label: 'Latencia p99 end-to-end' }
      ]
    },
    {
      industry: 'E-commerce',
      challenge: 'Integración de 15+ proveedores externos con APIs inconsistentes causando fallos en checkout',
      solution: 'API Gateway centralizado con retry logic, circuit breakers, transformación de datos y monitoreo granular por proveedor',
      results: [
        { metric: '98%', label: 'Reducción en errores de integración' },
        { metric: '45%', label: 'Mejora en tasa de conversión' },
        { metric: '1.8M USD', label: 'Revenue recuperado anualmente' }
      ]
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Análisis & Diseño de API',
      description: 'Analizamos requisitos funcionales y no funcionales, diseñamos la arquitectura API y definimos contratos con OpenAPI.',
      tasks: [
        'Levantamiento de requisitos y casos de uso',
        'Diseño de arquitectura y selección de stack',
        'Modelado de datos y esquemas de base de datos',
        'Especificación OpenAPI 3.0 y contract-first approach'
      ],
    },
    {
      number: '02',
      title: 'Desarrollo TDD',
      description: 'Implementamos la API con desarrollo guiado por pruebas, código limpio y revisiones de código rigurosas.',
      tasks: [
        'Setup de proyecto con best practices y linters',
        'Desarrollo TDD con cobertura 90%+ de tests',
        'Implementación de endpoints con validación robusta',
        'Code reviews y pair programming en features críticas'
      ],
    },
    {
      number: '03',
      title: 'Seguridad & Performance',
      description: 'Implementamos capas de seguridad robustas y optimizamos cada endpoint para latencias sub-100ms.',
      tasks: [
        'Implementación de autenticación OAuth 2.0/JWT',
        'Rate limiting, throttling y DDoS protection',
        'Optimización de queries con índices y caching',
        'Load testing con K6 y optimización basada en métricas'
      ],
    },
    {
      number: '04',
      title: 'Deploy & Monitoreo',
      description: 'Desplegamos con zero-downtime, configuramos observabilidad completa y establecemos SLIs/SLOs.',
      tasks: [
        'Pipeline CI/CD con tests automatizados y gates',
        'Despliegue blue-green o canary en Kubernetes',
        'Configuración de logs, metrics y tracing distribuido',
        'Documentación técnica y guías de troubleshooting'
      ],
    },
  ];

  const technologies = [
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Express', category: 'Framework' },
    { name: 'NestJS', category: 'Framework' },
    { name: 'Python FastAPI', category: 'Framework' },
    { name: 'Go Gin', category: 'Framework' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'NoSQL' },
    { name: 'Redis', category: 'Cache' },
    { name: 'GraphQL', category: 'Query Language' },
    { name: 'Kafka', category: 'Messaging' },
    { name: 'Docker', category: 'Container' },
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Terraform', category: 'IaC' },
    { name: 'Prometheus', category: 'Monitoring' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image Placeholder */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-bold mb-8 hover:text-green-600 transition-colors">
            ← Volver al inicio
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-nostalgic mb-6 leading-tight">
                DESARROLLO DE API & BACKEND
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Construimos APIs robustas, escalables y seguras con 99.99% uptime que potencian
                tus aplicaciones y conectan tus sistemas de forma eficiente.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/#contact"
                  className="px-8 py-4 bg-black text-white font-bold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Solicitar Cotización
                </a>
                <a
                  href="#proceso"
                  className="px-8 py-4 border-2 border-black font-bold hover:bg-black hover:text-white transition-all"
                >
                  Ver Proceso
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl border-4 border-black shadow-2xl flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)' }} />
                <div className="text-center z-10">
                  <svg className="w-32 h-32 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-white font-bold text-lg">
                    [IMAGEN: Arquitectura de microservicios con APIs, databases, cache layers y monitoring dashboard]
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
              { number: '250+', label: 'APIs en Producción' },
              { number: '99.99%', label: 'Uptime Garantizado' },
              { number: '<45ms', label: 'Latencia Promedio p95' },
              { number: '5M+', label: 'Requests/día Procesados' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-green-400 mb-2">{stat.number}</div>
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
              Soluciones backend enterprise con arquitectura de nivel mundial
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
                <div className="mb-4 text-green-600 group-hover:text-green-400 transition-colors">{feature.icon}</div>
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
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">CASOS DE ÉXITO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              APIs de misión crítica que procesan millones de transacciones
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
                <div className="inline-block px-4 py-2 bg-green-600 text-white font-bold text-sm mb-6">
                  {case_.industry}
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">Desafío</h4>
                    <p className="text-gray-700 leading-relaxed">{case_.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">Solución</h4>
                    <p className="text-gray-700 leading-relaxed">{case_.solution}</p>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <h4 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-4">Resultados</h4>
                  <div className="grid grid-cols-3 gap-6">
                    {case_.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">{result.metric}</div>
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
              Metodología probada para APIs de nivel enterprise
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
                className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-green-50 to-emerald-50' : 'from-emerald-50 to-green-50'} p-8 md:p-12 border-l-8 border-green-600 shadow-lg`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  <div className="md:w-1/3">
                    <div className="text-7xl font-mono font-bold text-green-600 mb-4 opacity-50">{step.number}</div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">STACK TECNOLÓGICO</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Las mejores herramientas para APIs de alto rendimiento
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
                className="bg-white bg-opacity-5 border border-green-500 p-4 text-center hover:bg-green-600 hover:border-green-400 transition-all hover:scale-105 group"
              >
                <div className="text-sm font-bold text-green-400 group-hover:text-white mb-1">{tech.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-green-200">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-6">
              ¿NECESITAS UNA API ROBUSTA?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Agenda una sesión técnica gratuita. Analizaremos tu arquitectura actual y
              diseñaremos una API escalable con SLA del 99.99%.
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-white text-green-600 font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Agendar Sesión Técnica
            </a>
            <p className="text-sm text-green-200 mt-4">Incluye arquitectura propuesta y estimación de costos</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

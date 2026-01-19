'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SeguridadCiberseguridadPage() {
  const t = useTranslations();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Pentesting & Auditorías',
      description: 'Evaluaciones exhaustivas de seguridad, pruebas de penetración y auditorías de código para identificar vulnerabilidades.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Seguridad en la Nube',
      description: 'Protección de infraestructuras cloud (AWS, Azure, GCP) con mejores prácticas y compliance.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'SOC & Monitoreo 24/7',
      description: 'Centro de operaciones de seguridad con monitoreo continuo y respuesta rápida a incidentes.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Compliance & Certificaciones',
      description: 'Implementación de estándares ISO 27001, SOC 2, PCI-DSS, GDPR y más.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: 'Gestión de Identidades',
      description: 'IAM, MFA, SSO y políticas de acceso robustas para proteger recursos críticos.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: 'Respuesta a Incidentes',
      description: 'Protocolos de respuesta rápida, análisis forense y planes de recuperación ante desastres.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Evaluación de Riesgos',
      description: 'Identificamos amenazas, analizamos vulnerabilidades y evaluamos el impacto potencial.',
      tasks: ['Análisis de superficie de ataque', 'Threat modeling', 'Evaluación de vulnerabilidades', 'Assessment de riesgos'],
    },
    {
      number: '02',
      title: 'Diseño de Estrategia',
      description: 'Diseñamos una estrategia de seguridad integral alineada con tus objetivos de negocio.',
      tasks: ['Políticas de seguridad', 'Arquitectura segura', 'Plan de implementación', 'Framework de compliance'],
    },
    {
      number: '03',
      title: 'Implementación',
      description: 'Desplegamos controles de seguridad, configuramos herramientas y establecemos procesos.',
      tasks: ['Deploy de soluciones', 'Hardening de sistemas', 'Configuración de firewalls', 'Implementación de IDS/IPS'],
    },
    {
      number: '04',
      title: 'Monitoreo & Mejora',
      description: 'Monitoreamos continuamente, respondemos a incidentes y mejoramos la postura de seguridad.',
      tasks: ['SIEM 24/7', 'Gestión de incidentes', 'Updates de seguridad', 'Auditorías periódicas'],
    },
  ];

  const deliverables = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Informe de Pentesting',
      description: 'Reporte detallado de vulnerabilidades'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Políticas de Seguridad',
      description: 'Documentación de políticas'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Configuración',
      description: 'Scripts y automatización'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: 'Sistema de Alertas',
      description: 'Monitoreo y notificaciones'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Runbooks',
      description: 'Procedimientos de respuesta'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Capacitación',
      description: 'Training de concienciación'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-bold mb-8 hover:text-red-600 transition-colors">
              ← Volver al inicio
            </Link>

            <h1 className="text-5xl md:text-7xl font-nostalgic mb-6">
              SEGURIDAD & CIBERSEGURIDAD
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
              Protegemos tu infraestructura digital con las soluciones de ciberseguridad más
              avanzadas del mercado. Seguridad proactiva, no reactiva.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-black text-white font-bold hover:bg-red-600 transition-colors"
              >
                Solicitar Cotización
              </a>
              <a
                href="#proceso"
                className="px-8 py-4 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors"
              >
                Ver Proceso
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Protección Efectiva' },
              { number: '<5min', label: 'Tiempo de Respuesta' },
              { number: '150+', label: 'Empresas Protegidas' },
              { number: '0', label: 'Brechas en 2024' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
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
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">¿QUÉ INCLUYE?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Servicios completos de ciberseguridad empresarial
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
                className="p-8 border-2 border-black hover:bg-black hover:text-white transition-all group"
              >
                <div className="mb-4 text-black group-hover:text-white transition-colors">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">NUESTRO PROCESO</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodología probada de ciberseguridad empresarial
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
                className="bg-white p-8 md:p-12 border-l-8 border-red-600"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-6xl font-mono font-bold text-red-600 mb-4">{step.number}</div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                          <span className="text-sm font-medium">{task}</span>
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

      {/* Deliverables Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-4">ENTREGABLES</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protección completa desde el primer día
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200"
              >
                <div className="mb-3 text-red-600">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-nostalgic mb-6">
              ¿PREOCUPADO POR LA SEGURIDAD?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una auditoría de seguridad gratuita y descubre cómo proteger
              tu infraestructura digital
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors"
            >
              Agendar Auditoría Gratis
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

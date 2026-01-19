'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AIEmpresasPage() {
  const t = useTranslations();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Chatbots & Asistentes IA',
      description: 'Chatbots inteligentes con GPT-4, Claude o modelos custom que automatizan atención al cliente 24/7.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Machine Learning',
      description: 'Modelos de ML personalizados para predicción, clasificación y análisis de datos complejos.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: 'Procesamiento de Lenguaje Natural',
      description: 'NLP para análisis de sentimientos, extracción de información y generación de contenido.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: 'Computer Vision',
      description: 'Reconocimiento facial, detección de objetos y análisis visual automatizado.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Automatización con IA',
      description: 'RPA potenciado con IA para automatizar procesos complejos y repetitivos.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'IA Generativa',
      description: 'Generación de imágenes, texto, código y contenido creativo con modelos generativos.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Análisis de Caso de Uso',
      description: 'Identificamos oportunidades de IA que generen valor real para tu negocio.',
      tasks: ['Discovery workshop', 'Análisis de datos', 'Evaluación de viabilidad', 'Definición de ROI'],
    },
    {
      number: '02',
      title: 'Diseño de Solución',
      description: 'Seleccionamos la tecnología y arquitectura óptima para tu caso de uso.',
      tasks: ['Selección de modelos', 'Diseño de arquitectura', 'Pipeline de datos', 'Estrategia de training'],
    },
    {
      number: '03',
      title: 'Desarrollo & Training',
      description: 'Desarrollamos, entrenamos y optimizamos los modelos de IA.',
      tasks: ['Data preprocessing', 'Model training', 'Fine-tuning', 'Testing & validation'],
    },
    {
      number: '04',
      title: 'Deploy & Monitoreo',
      description: 'Desplegamos en producción y monitoreamos el rendimiento continuamente.',
      tasks: ['MLOps pipeline', 'Deployment', 'A/B testing', 'Performance monitoring'],
    },
  ];

  const deliverables = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Modelo IA',
      description: 'Modelo entrenado y optimizado'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'API de IA',
      description: 'Endpoints listos para integrar'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'Dataset',
      description: 'Datos procesados y preparados'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Documentación',
      description: 'Guías técnicas completas'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Dashboard',
      description: 'Panel de monitoreo y métricas'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Capacitación',
      description: 'Training del equipo en IA'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-bold mb-8 hover:text-indigo-600 transition-colors">
              ← Volver al inicio
            </Link>

            <h1 className="text-5xl md:text-7xl font-nostalgic mb-6">
              IMPLEMENTACIÓN DE IA PARA EMPRESAS
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
              Transformamos tu negocio con inteligencia artificial de vanguardia. Desde chatbots
              hasta machine learning custom, llevamos la IA a tu empresa.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-black text-white font-bold hover:bg-indigo-600 transition-colors"
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
              { number: '50+', label: 'Modelos IA Desplegados' },
              { number: '70%', label: 'Reducción de Costos' },
              { number: '95%', label: 'Precisión de Modelos' },
              { number: '5X', label: 'ROI Promedio' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.number}</div>
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
              Soluciones de IA empresarial de última generación
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
              Metodología probada de implementación de IA
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
                className="bg-white p-8 md:p-12 border-l-8 border-indigo-600"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-6xl font-mono font-bold text-indigo-600 mb-4">{step.number}</div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0" />
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
              Soluciones de IA listas para producción
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
                className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
              >
                <div className="mb-3 text-indigo-600">{item.icon}</div>
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
              ¿LISTO PARA LA REVOLUCIÓN DE LA IA?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo la inteligencia artificial
              puede transformar tu negocio
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Agendar Consultoría Gratis
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

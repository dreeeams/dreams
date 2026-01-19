'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function DesarrolloSoftwarePage() {
  const t = useTranslations();

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y multiplataforma (iOS/Android) con React Native, Flutter o desarrollo nativo.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Aplicaciones Web',
      description: 'Web apps modernas con React, Next.js, Vue o Angular. PWAs que funcionan como apps nativas.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Software Empresarial',
      description: 'ERPs, CRMs y sistemas a medida que optimizan procesos y aumentan productividad.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'E-commerce',
      description: 'Tiendas online completas con pasarelas de pago, gestión de inventario y analytics.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'SaaS',
      description: 'Plataformas SaaS escalables con arquitectura multi-tenant, suscripciones y facturación.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'MVP Development',
      description: 'Validamos tu idea rápidamente con un MVP funcional listo para lanzar al mercado.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'Entendemos tu visión, definimos requerimientos y planificamos la arquitectura del software.',
      tasks: ['Product discovery', 'User stories', 'Especificaciones técnicas', 'Wireframes & mockups'],
    },
    {
      number: '02',
      title: 'Diseño & Prototipado',
      description: 'Creamos diseños atractivos y prototipos interactivos antes de empezar el desarrollo.',
      tasks: ['UI/UX Design', 'Design system', 'Prototipos clickeables', 'User testing'],
    },
    {
      number: '03',
      title: 'Desarrollo Ágil',
      description: 'Desarrollamos en sprints con entregas continuas y feedback constante.',
      tasks: ['Sprints de 2 semanas', 'Daily standups', 'Code reviews', 'Testing automatizado'],
    },
    {
      number: '04',
      title: 'Launch & Soporte',
      description: 'Lanzamos tu producto y brindamos soporte continuo para asegurar su éxito.',
      tasks: ['Deployment', 'Monitoreo', 'Bug fixes', 'Nuevas features'],
    },
  ];

  const deliverables = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Aplicación Completa',
      description: 'App lista para producción'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Código Fuente',
      description: 'Repositorio Git completo'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Diseños',
      description: 'UI kit y design system'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Tests',
      description: 'Suite completa de pruebas'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Documentación',
      description: 'Técnica y de usuario'
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Deploy',
      description: 'Infraestructura y CI/CD'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-sm font-bold mb-8 hover:text-orange-600 transition-colors">
              ← Volver al inicio
            </Link>

            <h1 className="text-5xl md:text-7xl font-nostalgic mb-6">
              DESARROLLO DE SOFTWARE & APLICACIONES
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
              Convertimos tus ideas en software robusto y escalable. Desde MVPs hasta
              aplicaciones enterprise de alta complejidad.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="px-8 py-4 bg-black text-white font-bold hover:bg-orange-600 transition-colors"
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
              { number: '300+', label: 'Apps Desarrolladas' },
              { number: '95%', label: 'Satisfacción de Clientes' },
              { number: '5M+', label: 'Usuarios Activos' },
              { number: '4.8★', label: 'Rating Promedio Apps' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">{stat.number}</div>
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
              Desarrollo de software para cualquier plataforma y necesidad
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
              Metodología ágil para entregar valor continuamente
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
                className="bg-white p-8 md:p-12 border-l-8 border-orange-600"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-6xl font-mono font-bold text-orange-600 mb-4">{step.number}</div>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="md:w-2/3">
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0" />
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
              Todo lo que necesitas para lanzar tu producto
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
                className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200"
              >
                <div className="mb-3 text-orange-600">{item.icon}</div>
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
              ¿TIENES UNA IDEA? HAGÁMOSLA REALIDAD
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubre cómo podemos desarrollar
              tu próximo producto digital
            </p>
            <a
              href="/#contact"
              className="inline-block px-12 py-5 bg-orange-600 text-white font-bold text-lg hover:bg-orange-700 transition-colors"
            >
              Agendar Consultoría Gratis
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

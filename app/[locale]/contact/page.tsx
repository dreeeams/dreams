import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/sections/footer-section';
import CalendarEmbed from '@/components/contact/calendar-embed';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'es'
    ? 'Contacto - Dream Studio'
    : 'Contact - Dream Studio';

  const description = locale === 'es'
    ? 'Agenda una reunión con nosotros. Cuéntanos sobre tu proyecto.'
    : 'Schedule a meeting with us. Tell us about your project.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contact`,
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const subtitle = locale === 'es'
    ? 'Agenda una sesión estratégica de 15 minutos para discutir tus requerimientos, cronograma y cómo podemos entregar resultados excepcionales'
    : 'Book a 15-minute strategy session to discuss your requirements, timeline, and how we can deliver exceptional results';

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main id="main-content" className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-nostalgic text-white mb-6 text-center"
              style={{ letterSpacing: '-0.04em' }}
            >
              Tell us more
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              {subtitle}
            </p>

            {/* Cal.com Calendar Embed */}
            <CalendarEmbed />
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

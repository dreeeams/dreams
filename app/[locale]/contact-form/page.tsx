import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/contact-form';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/sections/footer-section';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'es'
    ? 'Formulario de Contacto - Dreeeams'
    : 'Contact Form - Dreeeams';

  const description = locale === 'es'
    ? 'Cuéntanos sobre tu proyecto. Completa el formulario y nos pondremos en contacto contigo pronto.'
    : 'Tell us about your project. Fill out the form and we\'ll get back to you as soon as possible.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contact-form`,
      type: 'website',
    },
  };
}

export default async function ContactFormPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main id="main-content" className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-nostalgic mb-4 text-white">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-300">
              {t('subtitle')}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {t('directContact')}
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

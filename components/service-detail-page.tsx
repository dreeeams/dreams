import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
};

type ServiceDetailPageProps = {
  serviceKey: 'webDev' | 'mobileDev' | 'uiux';
  features: Feature[];
};

export default function ServiceDetailPage({ serviceKey, features }: ServiceDetailPageProps) {
  const t = useTranslations(`services.${serviceKey}`);
  const tCommon = useTranslations('contact');

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-20 max-w-4xl mx-auto">
            <h2 className="heading-xl mb-6">
              {t('intro.heading')}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              {t('intro.paragraph1')}
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              {t('intro.paragraph2')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-white/10 p-8 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white/10 border border-white/20">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-lg mb-3">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="border border-white/10 p-8 md:p-12 bg-white/5 backdrop-blur-sm mb-20">
            <h2 className="heading-xl mb-8">
              {t('technologies.heading')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.raw('technologies.list').map((tech: string, index: number) => (
                <div key={index} className="text-center p-4 border border-white/10 bg-white/5">
                  <p className="font-medium">{tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center border border-white/10 p-12 bg-white/5 backdrop-blur-sm">
            <h2 className="heading-xl mb-6">
              {t('cta.heading')}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 font-medium"
            >
              {tCommon('scheduleCall')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

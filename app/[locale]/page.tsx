import dynamic from 'next/dynamic';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import FooterSection from '@/components/sections/footer-section';
import SkipToContent from '@/components/skip-to-content';
import { SkeletonProjectCard } from '@/components/skeleton';

// Lazy load below-the-fold sections for better initial load performance
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio-section'), {
  loading: () => (
    <div className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkeletonProjectCard />
        <SkeletonProjectCard />
        <SkeletonProjectCard />
        <SkeletonProjectCard />
      </div>
    </div>
  ),
});
const FAQSection = dynamic(() => import('@/components/sections/faq-section'), {
  loading: () => <div className="min-h-[50vh] bg-white" />,
});
const ContactSection = dynamic(() => import('@/components/sections/contact-section'), {
  loading: () => <div className="min-h-screen bg-background-light" />,
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light">
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="relative">
        {/* Hero as fixed background */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <HeroSection />
        </div>

        {/* Content that scrolls over hero */}
        <div className="relative z-10" style={{ marginTop: '100vh' }}>
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
          <FAQSection />
          <FooterSection />
        </div>
      </main>
    </div>
  );
}

import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero-section';
import MarqueeSection from '@/components/sections/marquee-section';
import ServicesSection from '@/components/sections/services-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import FAQSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />
      <main className="relative">
        {/* Hero as fixed background */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <HeroSection />
        </div>

        {/* Content that scrolls over hero */}
        <div className="relative z-10" style={{ marginTop: '100vh' }}>
          <ServicesSection />
          <MarqueeSection />
          <PortfolioSection />
          <FAQSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

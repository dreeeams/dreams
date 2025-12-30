import Navigation from '@/components/navigation';
import HeroSection from '@/components/sections/hero-section';
import MarqueeSection from '@/components/sections/marquee-section';
import ServicesSection from '@/components/sections/services-section';
import PortfolioSection from '@/components/sections/portfolio-section';
import TeamSection from '@/components/sections/team-section';
import FAQSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navigation />
      <main className="overflow-hidden">
        <HeroSection />
        <ServicesSection />
        <MarqueeSection />
        <PortfolioSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
}

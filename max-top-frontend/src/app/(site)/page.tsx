import HeroSlider from '@/components/home/HeroSlider';
import PaymentBanner from '@/components/home/PaymentBanner';
import ServicesOverview from '@/components/home/ServicesOverview';
import AboutSection from '@/components/home/AboutSection';
import OfferBanners from '@/components/home/OfferBanners';
import PackagesSection from '@/components/home/PackagesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FaqSection from '@/components/home/FaqSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import TechnologyPartners from '@/components/home/TechnologyPartners';
import PopupBanner from '@/components/home/PopupBanner';

export default function HomePage() {
  return (
    <>
      <PopupBanner />
      <HeroSlider />
      <PaymentBanner />
      <ServicesOverview />
      <AboutSection />
      <OfferBanners />
      <PackagesSection />
      <FeaturesSection />
      <FaqSection />
      <TestimonialSection />
      <TechnologyPartners />
    </>
  );
}

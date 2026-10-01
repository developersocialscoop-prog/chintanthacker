import Navbar from './components/layout/Navbar';
import AboutSection from './components/sections/AboutSection';
import HeroSection from './components/sections/HeroSection';
import TrustBarSection from './components/sections/TrustBarSection';
import ApproachSection from './components/sections/ApproachSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import TestimonialsSection from './components/sections/Testimonialssection';
import JourneySection from './components/sections/JourneySection';


function App() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <JourneySection />
      <AboutSection />
      <ApproachSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
    </div>
  );
}

export default App;
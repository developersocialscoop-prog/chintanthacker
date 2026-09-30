import Navbar from './components/layout/Navbar';
import AboutSection from './components/sections/AboutSection';
import HeroSection from './components/sections/HeroSection';
import ShiftSection from './components/sections/ShiftSection';
import TrustBarSection from './components/sections/TrustBarSection';
import ApproachSection from './components/sections/ApproachSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';

function App() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <ShiftSection />
      <AboutSection />
      <ApproachSection />
      <ServicesSection />
      <PortfolioSection />
    </div>
  );
}

export default App;
import LogoLoop from '../ui/LogoLoop';
import '../../styles/TrustBarSection.css';


const clientLogos = [
  { node: <span className="trustbar-logo-text">UCL</span>, href: '#' },
  { node: <span className="trustbar-logo-text">OXFORD</span>, href: '#' },
  { node: <span className="trustbar-logo-text">TEDx</span>, href: '#' },
  { node: <span className="trustbar-logo-text">Unilever</span>, href: '#' },
  { node: <span className="trustbar-logo-text">accenture</span>, href: '#' },
  { node: <span className="trustbar-logo-text">L&apos;OREAL</span>, href: '#' },
];

const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

export default function TrustBarSection() {
  return (
    <section className="trustbar-section">
      <div className="trustbar-inner">

        {/* LABEL */}
        <p className="trustbar-label">Trusted by 50+ Businesses</p>

        {/* SCROLLING LOGO LOOP */}
        <div className="trustbar-logoloop-wrap">
        
          <LogoLoop
            logos={clientLogos}
            speed={200}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={80}
            scaleOnHover
            ariaLabel="Technology partners"
          />
        </div>


      </div>
    </section>
  );
}
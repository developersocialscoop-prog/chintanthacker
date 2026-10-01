import { motion, useReducedMotion } from 'framer-motion';
import Lanyard from '../ui/Lanyard';
import CircularGallery from '../ui/CircularGallery';
import frontImg from '../../assets/front-image.png';
import backImg from '../../assets/back-image.png';
import '../../styles/AboutSection.css';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const galleryItems = [
    { image: `src/assets/gallary/img-1.png`, text: '' },
    { image: `src/assets/gallary/img-2.jpeg`, text: '' },
    { image: `src/assets/gallary/img-3.jpeg`, text: '' },
    { image: `src/assets/gallary/img-5.jpeg`, text: '' },
    { image: `src/assets/gallary/img-6.jpeg`, text: '' },
    { image: `src/assets/gallary/img-7.jpeg`, text: '' },
    { image: `src/assets/gallary/img-8.jpeg`, text: '' },
    { image: `src/assets/gallary/img-9.jpeg`, text: '' },
  ];

  return (
    <section id="about" className="about-section">

      {/* TOP: LANYARD + TEXT */}
      <div className="about-inner">

        {/* LEFT — LANYARD */}
        <div className="about-visual">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage={frontImg}
            backImage={backImg}
          />
        </div>

        {/* RIGHT — TEXT */}
        <motion.div
          className="about-content"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="about-label">About Chintan</span>

          <h2 className="about-heading">
            Growth isn't just about marketing.<br />
            It's about getting the <em>entire business</em> moving in the right direction.
          </h2>

          <div className="about-body">
            <p>
              I'm <strong>Dr. Chintan Thacker</strong> — a Business Growth Consultant,
              entrepreneur, and marketing strategist with <strong>15+ years of
              experience</strong> across brand building, marketing, digital growth,
              events, design, and business consulting.
            </p>

            <p>
              Over the years, I've worked with businesses at every stage — from
              emerging ventures looking for their first growth engine to established
              brands looking to strengthen their positioning, acquire customers,
              and scale.
            </p>
          </div>

          {/* APPROACH FLOW */}
          <div className="about-approach">
            <span className="about-approach-label">My Approach</span>

            <div className="about-approach-flow">
              <span className="about-approach-step">Understand</span>
              <span className="about-approach-arrow" aria-hidden="true">→</span>
              <span className="about-approach-step">Identify</span>
              <span className="about-approach-arrow" aria-hidden="true">→</span>
              <span className="about-approach-step">Build</span>
              <span className="about-approach-arrow" aria-hidden="true">→</span>
              <span className="about-approach-step">Execute</span>
              <span className="about-approach-arrow" aria-hidden="true">→</span>
              <span className="about-approach-step">Measure</span>
              <span className="about-approach-arrow" aria-hidden="true">→</span>
              <span className="about-approach-step">Optimise</span>
            </div>
          </div>

          {/* PHILOSOPHY */}
          <blockquote className="about-quote">
            I don't believe in marketing for the sake of marketing.
          </blockquote>

          <div className="about-body">
            <p>
              I believe every activity should have a purpose — whether that's
              building a stronger brand, generating demand, increasing conversions,
              entering a new market, or creating a scalable growth system.
            </p>
          </div>

          <a href="#contact" className="about-cta">
            Let's work together
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

      </div>

      {/* BOTTOM: FULL-WIDTH GALLERY */}
      <div className="about-gallery">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.03}
          font="bold 30px Figtree"
          scrollSpeed={1.1}
        />
      </div>

    </section>
  );
}
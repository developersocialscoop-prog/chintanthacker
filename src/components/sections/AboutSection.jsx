import { motion, useReducedMotion } from 'framer-motion';
import Lanyard from '../ui/Lanyard';
import CircularGallery from '../ui/CircularGallery';
import frontImg from '../../assets/front-image.png';
import backImg from '../../assets/back-image.png';
import '../../styles/AboutSection.css';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const galleryItems = [
    { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
    { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
    { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
    { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
    { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
    { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
    { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
    { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
    { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
    { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
    { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
    { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
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
          <span className="about-label">About Me</span>

          <h2 className="about-heading">
            I'm Chintan Thacker —<br />
            Digital Creator & Founder of SocialScoop
          </h2>

          <div className="about-body">
            <p>
              I started as a solo freelancer in 2014, writing code from a small
              room in Ahmedabad. Ten years later, I've built a multi-disciplinary
              practice — <strong>video, design, websites, and automation</strong> —
              serving 50+ businesses across India.
            </p>

            <p>
              My mission is simple: create digital experiences that actually work —
              on time, on budget, without the usual agency drama.
            </p>

            <p>
              When I'm not building, you'll find me sharing creator lessons on
              Instagram, mentoring young talent, or spending time with my family.
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
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FiCalendar, FiArrowDown } from 'react-icons/fi';
import heroImg from '../../assets/hero.png';
import Galaxy from '../ui/Galaxy';
import GradientText from '../ui/GradientText';
import '../../styles/HeroSection.css';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [showGalaxy, setShowGalaxy] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setShowGalaxy(!isMobile);
  }, []);

  return (
    <section id="hero" className="hero-section">

      {showGalaxy && (
        <div className="hero-galaxy">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={2}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
      )}

      <motion.div
        className="hero-inner"
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="show"
      >

        {/* HEADLINE with GradientText */}
        <motion.div variants={item} className="hero-heading-block">
          <GradientText
            colors={['#ffffff', '#C5A47E', '#ffffff', '#C5A47E']}
            animationSpeed={6}
            showBorder={false}
            direction="horizontal"
            yoyo={true}
          >
            <h1 className="hero-heading">Chintan Thacker</h1>
          </GradientText>
        </motion.div>

        {/* PORTRAIT */}
        <motion.div variants={item} className="hero-portrait-wrap">
          <img
            src={heroImg}
            alt="Chintan Thacker"
            className="hero-portrait"
          />
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div variants={item} className="hero-left">
          <span className="badge">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
            Open for freelance work
          </span>

          <p>
            Hey there! I&apos;m the CEO of{' '}
            <span className="font-semibold text-white">SocialScoop</span>. We
            build scalable software for modern businesses.
          </p>

          <a href="#contact" className="btn-primary">
            <FiCalendar size={16} className="mr-2" />
            Schedule Call
          </a>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div variants={item} className="hero-right">
          <ul className="hero-stats">
            <li>8 years experience</li>
            <li>50+ happy clients</li>
          </ul>

          <ScrollLink
            to="about"
            smooth
            duration={500}
            offset={-24}
            className="hero-showmore"
          >
            <span className="hero-showmore-label">show more</span>
            <motion.span
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-showmore-icon"
            >
              <FiArrowDown size={22} />
            </motion.span>
          </ScrollLink>
        </motion.div>

      </motion.div>
    </section>
  );
}
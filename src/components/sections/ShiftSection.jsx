import { motion, useReducedMotion } from 'framer-motion';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';
import BeforeAfterSlider from '../ui/BeforeAfterSlider';
import thenImg from '../../assets/then.png';
import nowImg from '../../assets/now.png';
import '../../styles/ShiftSection.css';


/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ============================================================
   CONTENT — Chintan Sir's Personal Journey
   Broadened to reflect: video, design, web, automation, digital media
   ============================================================ */
const beforePoints = [
  {
    label: 'One Skill Only',
    text: 'Knew only basic code. No video, no design, no strategy.',
  },
  {
    label: 'Random Gigs',
    text: 'Chasing freelance work with no direction or system.',
  },
  {
    label: 'No Brand',
    text: 'Just another face in a crowded market. Forgetful.',
  },
  {
    label: 'Price Wars',
    text: 'Competing on cost. Undervalued and overworked.',
  },
  {
    label: 'No Scale',
    text: 'Every month started from zero. No repeat clients.',
  },
];

const afterPoints = [
  {
    label: 'Full-Stack Creator',
    text: 'Video. Design. Websites. Automation. All under one roof.',
  },
  {
    label: 'Clear Systems',
    text: 'A proven process — from discovery to launch.',
  },
  {
    label: 'Recognized Brand',
    text: 'Founder of SocialScoop. Trusted by 50+ businesses.',
  },
  {
    label: 'Premium Value',
    text: 'Charging for impact, not for hours. Clients say yes faster.',
  },
  {
    label: 'Built to Last',
    text: 'Repeat clients, referrals, and a growing legacy.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export default function ShiftSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="journey" className="shift-section">
      <div className="shift-inner">

        {/* ============ HEADER ============ */}
        <motion.div
          className="shift-header"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="shift-label">
            My Journey
          </motion.span>

          <motion.h2 variants={fadeUp} className="shift-heading">
            From a Solo Freelancer to a Full-Service Digital Partner
          </motion.h2>

          <motion.p variants={fadeUp} className="shift-subheading">
            The shift that changed everything.
          </motion.p>
        </motion.div>

        {/* ============ GRID ============ */}
        <div className="shift-grid">

          {/* ---------- LEFT: BEFORE ---------- */}
          <motion.div
            className="shift-col shift-col-without"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="shift-col-title">Where I Started</h3>

            <ul className="shift-list">
              {beforePoints.map((point, i) => (
                <li key={i} className="shift-item">
                  <FiXCircle className="shift-item-icon shift-item-icon--bad" size={20} />
                  <div className="shift-item-content">
                    <span className="shift-item-label">{point.label}</span>
                    <p className="shift-item-text">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ---------- CENTER: SLIDER ---------- */}
          <motion.div
            className="shift-col shift-col-slider"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <BeforeAfterSlider
              beforeImage={{
                src: thenImg,
                alt: 'Chintan Sir in the early days',
              }}
              afterImage={{
                src: nowImg,
                alt: 'Chintan Sir today with the SocialScoop team',
              }}
              beforeLabel="Then"
              afterLabel="Now"
            />
          </motion.div>

          {/* ---------- RIGHT: AFTER ---------- */}
          <motion.div
            className="shift-col shift-col-with"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="shift-col-title">Where I Am Now</h3>

            <ul className="shift-list">
              {afterPoints.map((point, i) => (
                <li key={i} className="shift-item">
                  <FiCheckCircle className="shift-item-icon shift-item-icon--good" size={20} />
                  <div className="shift-item-content">
                    <span className="shift-item-label">{point.label}</span>
                    <p className="shift-item-text">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
import { motion, useReducedMotion } from 'framer-motion';
import { FiSearch, FiPenTool, FiCode, FiSend } from 'react-icons/fi';
import '../../styles/ApproachSection.css';
import ScanCarousel from '../ui/ScanCarousel';


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

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ============================================================
   CONTENT — Universal 4-Step Process
   Works for: video, design, web, automation, digital media
   ============================================================ */
const steps = [
  {
    number: '01',
    icon: FiSearch,
    title: 'Discover',
    line1: 'We learn your goals,',
    line2: 'audience, and vision.',
    detail: 'Kickoff call → research → scope document.',
  },
  {
    number: '02',
    icon: FiPenTool,
    title: 'Plan',
    line1: 'We map the strategy,',
    line2: 'story, and scope.',
    detail: 'Moodboard → storyboard → content plan.',
  },
  {
    number: '03',
    icon: FiCode,
    title: 'Create',
    line1: 'We design, film,',
    line2: 'edit, and build.',
    detail: 'Weekly reviews → revisions → final delivery.',
  },
  {
    number: '04',
    icon: FiSend,
    title: 'Launch',
    line1: 'We ship + stay',
    line2: 'for 30 days of support.',
    detail: 'Publish → monitor → iterate based on results.',
  },
];

const images = [
  { src: 'https://picsum.photos/seed/house-exterior/480/340', alt: 'House exterior' },
  { src: 'https://picsum.photos/seed/living-room/480/340', alt: 'Living room' },
  { src: 'https://picsum.photos/seed/modern-lounge/480/340', alt: 'Lounge' },
  { src: 'https://picsum.photos/seed/green-sofa/480/340', alt: 'Green sofa' },
  { src: 'https://picsum.photos/seed/bedroom-bed/480/340', alt: 'Bedroom' },
  { src: 'https://picsum.photos/seed/kitchen-island/480/340', alt: 'Kitchen' },
  { src: 'https://picsum.photos/seed/reading-nook/480/340', alt: 'Reading nook' },
  { src: 'https://picsum.photos/seed/balcony-view/480/340', alt: 'Balcony' },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export default function ApproachSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
     <section id="approach" className="approach-section">
      <div className="approach-inner">

        {/* ============ HEADER ============ */}
        <motion.div
          className="approach-header"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="approach-label">
            Our Approach
          </motion.span>

          <motion.h2 variants={fadeUp} className="approach-heading">
            How I bring your vision to life
          </motion.h2>

          <motion.p variants={fadeUp} className="approach-subheading">
            A proven 4-step process for every project — video, design, web, or automation.
          </motion.p>
        </motion.div>

        {/* ============ STEPS GRID ============ */}
        <motion.div
          className="approach-grid"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={cardVariant}
                className="approach-card"
              >
                <span className="approach-card-number">{step.number}</span>

                <div className="approach-card-icon">
                  <Icon size={24} />
                </div>

                <h3 className="approach-card-title">{step.title}</h3>

                <div className="approach-card-divider" />

                <p className="approach-card-text">
                  {step.line1}
                  <br />
                  {step.line2}
                </p>

                <p className="approach-card-detail">{step.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>

        

      </div>
    </section>

    {/* CAROUSEL — gold beam, navy bg */}
        <div className="approach-carousel">
          <ScanCarousel
            items={images}
            cardWidth={220}
            cardHeight={155}
            gap={22}
            speed={60}
            direction="right"
            curve={35}
            depth={160}
            perspective={1000}
            cell={3}
            levels={4}
            beamColor="#C5A47E"
            beamWidth={0}
            cardRadius={14}
            pauseOnHover={false}
            imageFit="cover"
          />
        </div>

    </>
   
    
  );
}
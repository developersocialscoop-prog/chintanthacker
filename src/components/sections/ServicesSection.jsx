import { motion, useReducedMotion } from 'framer-motion';
import {
  FiTrendingUp,
  FiSearch,
  FiTarget,
  FiUsers,
  FiDollarSign,
  FiCompass,
  FiSend,
  FiZap,
  FiAward,
} from 'react-icons/fi';
import '../../styles/ServicesSection.css';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ============================================================
   CONTENT — 9 Business Growth Services
   ============================================================ */
const services = [
  {
    id: 'growth-strategy',
    icon: FiTrendingUp,
    title: 'Business Growth Strategy',
    description: 'A clear roadmap for sustainable growth.',
  },
  {
    id: 'market-analysis',
    icon: FiSearch,
    title: 'Market & Opportunity Analysis',
    description: 'Find your best opportunities.',
  },
  {
    id: 'growth-planning',
    icon: FiTarget,
    title: 'Growth Planning',
    description: 'Turn goals into weekly actions.',
  },
  {
    id: 'customer-acquisition',
    icon: FiUsers,
    title: 'Customer Acquisition',
    description: 'Find and convert the right audience.',
  },
  {
    id: 'revenue-opportunities',
    icon: FiDollarSign,
    title: 'Revenue Opportunities',
    description: 'Unlock new income streams.',
  },
  {
    id: 'business-positioning',
    icon: FiCompass,
    title: 'Business Positioning',
    description: 'Stand out in a crowded market.',
  },
  {
    id: 'go-to-market',
    icon: FiSend,
    title: 'Go-to-Market Strategy',
    description: 'Launch with momentum.',
  },
  {
    id: 'growth-optimisation',
    icon: FiZap,
    title: 'Growth Optimisation',
    description: "Fix what's slowing you down.",
  },
  {
    id: 'brand-strategy',
    icon: FiAward,
    title: 'Brand Strategy & Positioning',
    description: 'Build a brand people trust.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="services-section">
      <div className="services-inner">

        {/* ============ HEADER ============ */}
        <motion.div
          className="services-header"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="services-header-left">
            <motion.span variants={fadeUp} className="services-label">
              Services
            </motion.span>

            <motion.h2 variants={fadeUp} className="services-heading">
              Everything I do to grow your business
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="services-subheading">
            Nine strategic services. One growth partner. Zero chaos.
          </motion.p>
        </motion.div>

        {/* ============ SERVICES GRID ============ */}
        <motion.div
          className="services-grid"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={cardVariant}
                className="service-card"
                tabIndex={0}
                aria-label={service.title}
              >
                <div className="service-card-icon">
                  <Icon size={18} />
                </div>

                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-text">{service.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiTrendingUp,
  FiInstagram,
  FiUsers,
  FiSearch,
  FiCamera,
  FiPenTool,
  FiTarget,
  FiCode,
  FiZap,
  FiLayers,
  FiHeart,
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
   CONTENT — 11 Services (compact)
   ============================================================ */
const services = [
  {
    id: 'performance',
    icon: FiTrendingUp,
    title: 'Performance Marketing',
    description: 'Paid ads that convert.',
  },
  {
    id: 'social',
    icon: FiInstagram,
    title: 'Social Media',
    description: 'Organic growth and engagement.',
  },
  {
    id: 'influencer',
    icon: FiUsers,
    title: 'Influencer Marketing',
    description: 'Creator partnerships that work.',
  },
  {
    id: 'seo',
    icon: FiSearch,
    title: 'SEO',
    description: 'Rank higher. Get found.',
  },
  {
    id: 'photography',
    icon: FiCamera,
    title: 'Photography & Video',
    description: 'Shoots, films, event coverage.',
  },
  {
    id: 'content',
    icon: FiPenTool,
    title: 'Content Creation',
    description: 'Reels, blogs, storytelling.',
  },
  {
    id: 'branding',
    icon: FiTarget,
    title: 'Branding & Strategy',
    description: 'Positioning and identity.',
  },
  {
    id: 'web',
    icon: FiCode,
    title: 'Web Development',
    description: 'Sites, e-commerce, apps.',
  },
  {
    id: 'ai-automation',
    icon: FiZap,
    title: 'AI & Automation',
    description: 'Workflows, bots, GPT tools.',
  },
  {
    id: 'ai-vr',
    icon: FiLayers,
    title: 'AI & VR Development',
    description: 'Next-gen experiences.',
  },
  {
    id: 'success',
    icon: FiHeart,
    title: 'Client Success',
    description: 'Support, retention, growth.',
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

        {/* ============ HEADER — Left + Right split ============ */}
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
              Everything I do to grow your brand
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="services-subheading">
            Eleven services. One partner. Zero chaos.
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
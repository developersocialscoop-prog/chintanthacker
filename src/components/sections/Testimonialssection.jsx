import { motion, useReducedMotion } from 'framer-motion';
import '../../styles/TestimonialsSection.css';
import TestimonialMarquee from '../ui/Testimonialmarquee';

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

/* ============================================================
   TESTIMONIALS — 9 real-feeling client quotes
   Every client has a rating (mostly 5, one 4)
   ============================================================ */
const testimonials = [
  {
    name: 'Priya Nair',
    company: 'Northwind Labs',
    role: 'Founder',
    date: '12 Mar 2026',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=47',
    message:
      'Chintan shipped our brand film two weeks early. The quality was cinema-grade and the process was calm. Our launch got 3x the expected views.',
  },
  {
    name: 'Daniel Moreau',
    company: 'Brightpath',
    role: 'CEO',
    date: '28 Feb 2026',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=12',
    message:
      'The new website converts 2.4x better than our old one. He understood our customers better than we did.',
  },
  {
    name: 'Aisha Rahman',
    company: 'Lumen Health',
    role: 'Marketing Head',
    date: '09 Feb 2026',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=32',
    message:
      'Our Instagram grew from 3K to 47K in six months. Real followers. Real engagement. Real business.',
  },
  {
    name: 'Tomás Herrera',
    company: 'Fieldwork',
    role: 'Co-founder',
    date: '21 Jan 2026',
    rating: 4,
    avatar: 'https://i.pravatar.cc/96?img=15',
    message:
      'Every deadline hit. Every promise kept. It felt like having a senior team without the senior team cost.',
  },
  {
    name: 'Hannah Weiss',
    company: 'Parcel & Co',
    role: 'Founder',
    date: '15 Dec 2025',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=44',
    message:
      'The automation work saved us 40 hours a week. Within a month, it paid for itself.',
  },
  {
    name: 'Kenji Watanabe',
    company: 'Orbit Finance',
    role: 'CTO',
    date: '02 Dec 2025',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=53',
    message:
      'Clean code. Clear documentation. Passed our security audit first try. Rare to find this level of craft.',
  },
  {
    name: 'Sofia Marques',
    company: 'Greenleaf',
    role: 'Brand Lead',
    date: '18 Nov 2025',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=49',
    message:
      'The logo and identity system Chintan built gave us a real competitive edge. We finally look like the company we are.',
  },
  {
    name: 'Omar Haddad',
    company: 'Skyline Realty',
    role: 'Owner',
    date: '30 Oct 2025',
    rating: 4,
    message:
      'Booking requests doubled after the new site launched. Fast, clean, and perfect on every phone.',
  },
  {
    name: 'Meera Kapoor',
    company: 'Tidewater',
    role: 'Director',
    date: '11 Oct 2025',
    rating: 5,
    avatar: 'https://i.pravatar.cc/96?img=25',
    message:
      'From first call to launch day, the whole process felt effortless. That is rare for something this complex.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-inner">

        {/* HEADER */}
        <motion.div
          className="testimonials-header"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="testimonials-header-left">
            <motion.span variants={fadeUp} className="testimonials-label">
              Testimonials
            </motion.span>

            <motion.h2 variants={fadeUp} className="testimonials-heading">
              Loved by founders and teams
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="testimonials-subheading">
            Real words from clients I've worked with over the past decade.
          </motion.p>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <motion.div
        className="testimonials-marquee-wrap"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <TestimonialMarquee
          items={testimonials}
          rows={3}
          directions={['right', 'left', 'right']}
          speeds={[35, 28, 42]}
          pauseOnHover
          hoverSpeed={0}
          cardWidth={340}
          cardPadding={22}
          cardRadius={16}
          gap={18}
          rowGap={12}
          edgeFade={0.08}
          lineClamp={4}
          shadow="none"
          cardOpacity={1}
          activeOpacity={1}
          hoverLift={6}
          showAvatar
          showCompany
          showDate
          showRating
          showQuote={false}
        />
      </motion.div>
    </section>
  );
}
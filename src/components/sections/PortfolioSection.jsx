import { useState, useMemo } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiFilter } from 'react-icons/fi';
import '../../styles/PortfolioSection.css';

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

/* ============================================================
   CATEGORY FILTERS
   ============================================================ */
const categories = [
  { id: 'all', label: 'All' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'content', label: 'Content' },
  { id: 'video', label: 'Video' },
  { id: 'design', label: 'Design' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'success', label: 'Success' },
];

/* ============================================================
   PROJECTS — 30 placeholders across all categories
   Replace image URLs and links with real data later
   ============================================================ */
const projects = [
  // -------- Video --------
  { id: 1, name: 'Brand Film', client: 'Nike India', category: 'video', categoryLabel: 'Video', year: '2024', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', link: '#' },
  { id: 9, name: 'Product Launch', client: 'TechWave', category: 'video', categoryLabel: 'Video', year: '2024', image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80', link: '#' },
  { id: 10, name: 'Founder Story', client: 'StartupX', category: 'video', categoryLabel: 'Video', year: '2023', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80', link: '#' },
  { id: 28, name: 'Event Recap', client: 'Festival Co.', category: 'video', categoryLabel: 'Video', year: '2024', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', link: '#' },

  // -------- Marketing --------
  { id: 2, name: 'Performance Ads', client: 'ShopEasy', category: 'marketing', categoryLabel: 'Marketing', year: '2024', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', link: '#' },
  { id: 3, name: 'Instagram Campaign', client: 'LocalBiz', category: 'marketing', categoryLabel: 'Marketing', year: '2023', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80', link: '#' },
  { id: 4, name: 'Influencer Collab', client: 'GlowCo', category: 'marketing', categoryLabel: 'Marketing', year: '2024', image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=800&q=80', link: '#' },
  { id: 5, name: 'SEO Revamp', client: 'FitLife', category: 'marketing', categoryLabel: 'Marketing', year: '2023', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80', link: '#' },
  { id: 23, name: 'Google Ads Revamp', client: 'EduPro', category: 'marketing', categoryLabel: 'Marketing', year: '2023', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', link: '#' },

  // -------- Content --------
  { id: 6, name: 'Content Engine', client: 'Creator Hub', category: 'content', categoryLabel: 'Content', year: '2024', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', link: '#' },
  { id: 7, name: 'Product Shoot', client: 'Ceramic Co.', category: 'content', categoryLabel: 'Content', year: '2024', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', link: '#' },
  { id: 8, name: 'Reels Series', client: 'Bake Studio', category: 'content', categoryLabel: 'Content', year: '2023', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80', link: '#' },
  { id: 24, name: 'Podcast Launch', client: 'Founder Talk', category: 'content', categoryLabel: 'Content', year: '2024', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80', link: '#' },

  // -------- Design --------
  { id: 11, name: 'Brand Identity', client: 'Café Mocha', category: 'design', categoryLabel: 'Design', year: '2023', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', link: '#' },
  { id: 12, name: 'Packaging Design', client: 'Pure Foods', category: 'design', categoryLabel: 'Design', year: '2024', image: 'https://images.unsplash.com/photo-1629196914193-8b7f9be46e59?w=800&q=80', link: '#' },
  { id: 13, name: 'Logo Suite', client: 'Zenith', category: 'design', categoryLabel: 'Design', year: '2023', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', link: '#' },
  { id: 14, name: 'Magazine Layout', client: 'The Edit', category: 'design', categoryLabel: 'Design', year: '2024', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80', link: '#' },
  { id: 25, name: 'Event Branding', client: 'Tech Summit', category: 'design', categoryLabel: 'Design', year: '2024', image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80', link: '#' },

  // -------- Web --------
  { id: 15, name: 'Product Website', client: 'StartupX', category: 'web', categoryLabel: 'Web', year: '2024', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', link: '#' },
  { id: 16, name: 'E-commerce Store', client: 'Urban Threads', category: 'web', categoryLabel: 'Web', year: '2023', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80', link: '#' },
  { id: 17, name: 'SaaS Dashboard', client: 'FlowApp', category: 'web', categoryLabel: 'Web', year: '2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', link: '#' },
  { id: 26, name: 'Portfolio Site', client: 'Photographer', category: 'web', categoryLabel: 'Web', year: '2023', image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&q=80', link: '#' },
  { id: 27, name: 'Landing Page', client: 'BookWorm', category: 'web', categoryLabel: 'Web', year: '2024', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', link: '#' },

  // -------- AI --------
  { id: 18, name: 'Chatbot Setup', client: 'ServicePro', category: 'ai', categoryLabel: 'AI', year: '2024', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80', link: '#' },
  { id: 19, name: 'Workflow Automation', client: 'SaaS Co.', category: 'ai', categoryLabel: 'AI', year: '2024', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', link: '#' },
  { id: 20, name: 'VR Experience', client: 'EduFuture', category: 'ai', categoryLabel: 'AI', year: '2023', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80', link: '#' },
  { id: 29, name: 'GPT Assistant', client: 'LegalAid', category: 'ai', categoryLabel: 'AI', year: '2024', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', link: '#' },

  // -------- Success --------
  { id: 21, name: 'Client Onboarding', client: 'MediCare', category: 'success', categoryLabel: 'Success', year: '2024', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', link: '#' },
  { id: 22, name: 'Retention Program', client: 'GymHub', category: 'success', categoryLabel: 'Success', year: '2023', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', link: '#' },
  { id: 30, name: 'Support System', client: 'CloudOps', category: 'success', categoryLabel: 'Success', year: '2023', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80', link: '#' },
];

const ITEMS_PER_LOAD = 8;

/* ============================================================
   COMPONENT
   ============================================================ */
export default function PortfolioSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Slice for load-more
  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const hasMore = visibleCount < filteredProjects.length;

  // Reset visible count when filter changes
  const handleFilterChange = (filterId) => {
    if (filterId === activeFilter) return;
    setActiveFilter(filterId);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-inner">

        {/* ============ HEADER ============ */}
        <motion.div
          className="portfolio-header"
          variants={shouldReduceMotion ? undefined : container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="portfolio-header-left">
            <motion.span variants={fadeUp} className="portfolio-label">
              Portfolio
            </motion.span>

            <motion.h2 variants={fadeUp} className="portfolio-heading">
              30+ projects across 10 disciplines
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="portfolio-subheading">
            A selection of work I'm proud of — from video and design to AI and automation.
          </motion.p>
        </motion.div>

        {/* ============ FILTER BAR ============ */}
        <motion.div
          className="portfolio-filters"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          <span className="portfolio-filter-icon" aria-hidden="true">
            <FiFilter size={14} />
          </span>

          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`portfolio-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(cat.id)}
              role="tab"
              aria-selected={activeFilter === cat.id}
              aria-controls="portfolio-grid"
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ============ PROJECTS GRID ============ */}
        <div className="portfolio-grid-wrap">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              id="portfolio-grid"
              key={activeFilter}
              className="portfolio-grid"
              variants={shouldReduceMotion ? undefined : container}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="show"
            >
              {visibleProjects.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={shouldReduceMotion ? undefined : cardVariant}
                  layout
                  className="portfolio-card"
                  aria-label={`View ${project.name} for ${project.client}`}
                >
                  <div className="portfolio-card-image">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      draggable={false}
                    />
                    <span className="portfolio-card-arrow" aria-hidden="true">
                      <FiArrowUpRight size={14} />
                    </span>
                  </div>

                  <div className="portfolio-card-body">
                    <span className="portfolio-card-client">{project.client}</span>
                    <h3 className="portfolio-card-name">{project.name}</h3>
                    <span className="portfolio-card-meta">
                      {project.categoryLabel} · {project.year}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============ LOAD MORE ============ */}
        {hasMore && (
          <motion.div
            className="portfolio-loadmore"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="portfolio-loadmore-btn" onClick={handleLoadMore}>
              Load More Projects
              <span className="portfolio-loadmore-count">
                {visibleCount} / {filteredProjects.length}
              </span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}


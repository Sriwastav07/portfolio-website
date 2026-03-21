import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import ScrollReveal from './ScrollReveal';

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3, ease: [0.22,1,0.36,1] } }}
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: hovered
          ? 'rgba(124,110,247,0.08)'
          : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: hovered
          ? '1px solid rgba(124,110,247,0.5)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? '0 0 40px rgba(124,110,247,0.2), 0 24px 60px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 4px 24px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'all 0.35s ease',
        padding: '1.5rem',
      }}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,110,247,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }}
          />
        )}
      </AnimatePresence>

      {/* Top: index + arrow */}
      <div className="flex items-center justify-between mb-4">
        <motion.span
          animate={{ color: hovered ? 'var(--color-accent)' : 'var(--color-muted)' }}
          className="font-mono text-xs"
        >
          {String(index + 1).padStart(2,'0')} /
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 6, y: -6 }}
          animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 6, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{ color: 'var(--color-accent)' }}
        >
          <ArrowUpRight size={16} />
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="display-heading text-xl font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--color-muted)' }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            animate={hovered
              ? { y: 0, opacity: 1, transition: { delay: i * 0.04 } }
              : { y: 2, opacity: 0.7 }
            }
            className="tag"
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <motion.a
          href={project.github} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }}
          className="btn-outline text-sm py-2 px-4"
          aria-label={`${project.title} on GitHub`}
        >
          <Github size={14} /> GitHub
        </motion.a>
        {project.live && (
          <motion.a
            href={project.live} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm py-2 px-4"
          >
            <ExternalLink size={14} /> Live Demo
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-container" ref={ref}>
        <ScrollReveal direction="up">
          <div className="mb-14">
            <span className="accent-line block" />
            <h2 className="display-heading text-4xl md:text-5xl font-bold">
              Selected{' '}
              <span className="italic" style={{ color: 'var(--color-muted)' }}>work.</span>
            </h2>
            <p className="text-sm mt-3" style={{ color: 'var(--color-muted)' }}>
              A handful of things I've built — hover to explore.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../data';
import ScrollReveal from './ScrollReveal';

// Icon map for category icons (emoji for zero-dependency solution)
const CATEGORY_ICONS = {
  'Frontend':   '🎨',
  'Backend':    '⚙️',
  'Database':   '🗄️',
  'AI & Data':  '🤖',
  'Tools':      '🛠️',
};

export default function Skills() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-container" ref={ref}>
        <ScrollReveal direction="up">
          <div className="mb-14">
            <span className="accent-line block" />
            <h2 className="display-heading text-4xl md:text-5xl font-bold">
              Skills &amp;{' '}
              <span className="italic" style={{ color: 'var(--color-muted)' }}>tools.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <ScrollReveal key={group.category} direction="up" delay={i * 0.07}>
              <motion.div
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(124,110,247,0.5)',
                  boxShadow: '0 0 32px rgba(124,110,247,0.18), 0 20px 48px -12px rgba(0,0,0,0.4)',
                }}
                transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
                className="card h-full"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-lg">{CATEGORY_ICONS[group.category] || '📌'}</span>
                  <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
                    {group.category}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, boxShadow: '0 0 12px rgba(86,207,225,0.3)' }}
                      className="tag cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

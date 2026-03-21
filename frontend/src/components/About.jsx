import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket } from 'lucide-react';
import { profile } from '../data';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: '3+', label: 'Projects', icon: <Rocket size={16}/> },
  { value: '2+', label: 'Years', icon: <Code2 size={16}/> },
  { value: '10+', label: 'Technologies', icon: <Brain size={16}/> },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-container" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <ScrollReveal direction="left" delay={0.05}>
            <span className="accent-line block" />
            <h2 className="display-heading text-4xl md:text-5xl font-bold mb-8">
              About<br />
              <span className="italic" style={{ color: 'var(--color-muted)' }}>me.</span>
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, boxShadow: '0 0 24px var(--glow-purple)' }}
                  transition={{ duration: 0.25 }}
                  className="card text-center py-5"
                >
                  <div className="flex justify-center mb-2" style={{ color: 'var(--color-accent2)' }}>
                    {s.icon}
                  </div>
                  <div
                    className="display-heading text-2xl font-bold mb-1"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              <p>
                I'm <strong style={{ color: 'var(--color-text)' }}>{profile.name}</strong>, a full-stack
                developer with a passion for building products that are both technically sound and
                genuinely delightful to use.
              </p>
              <p>
                My journey started with curiosity — dissecting how apps work, then learning to build
                them from scratch. Today I work across the entire stack, from crafting React interfaces
                to designing Express APIs and wiring up MongoDB.
              </p>
              <p>
                Outside web development, I dive into machine learning and data analysis, exploring how
                intelligent systems can augment user experiences. I believe great software lives at the
                crossroads of engineering rigour and human empathy.
              </p>
              <p>
                When I'm not coding I'm probably reading design essays, exploring open-source repos,
                or sketching side project ideas.
              </p>

              {/* Education badge */}
              <motion.div
                whileHover={{ borderColor: 'var(--color-border2)' }}
                className="card mt-6 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))' }}>
                  <span className="text-white text-sm">🎓</span>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                    B.Tech — Computer Science Engineering
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    Lovely Professional University
                  </p>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { certificates } from '../data';
import ScrollReveal from './ScrollReveal';

export default function Certificates() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certificates" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-container" ref={ref}>
        <ScrollReveal direction="up">
          <div className="mb-14">
            <span className="accent-line block" />
            <h2 className="display-heading text-4xl md:text-5xl font-bold">
              Certificates &amp;{' '}
              <span className="italic" style={{ color: 'var(--color-muted)' }}>learning.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <ScrollReveal key={cert.title} direction="up" delay={i * 0.09}>
              <motion.article
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(124,110,247,0.5)',
                  boxShadow: '0 0 32px rgba(124,110,247,0.15), 0 20px 48px -12px rgba(0,0,0,0.5)',
                }}
                transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
                className="card h-full"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,110,247,0.2), rgba(86,207,225,0.15))',
                    border: '1px solid rgba(124,110,247,0.3)',
                  }}
                >
                  <Award size={18} style={{ color: 'var(--color-accent)' }} />
                </div>

                {/* Meta */}
                <span
                  className="font-mono text-xs uppercase tracking-widest block mb-2"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {cert.issuer} · {cert.year}
                </span>

                <h3 className="display-heading text-lg font-semibold mb-2">{cert.title}</h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {cert.description}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

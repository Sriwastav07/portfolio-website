import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { profile } from '../data';
import { scrollToSection } from '../hooks/useTheme';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,11,20,0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <button onClick={() => scrollToSection('home')} className="display-heading text-xl font-bold">
            <span style={{
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>AK</span>
            <span style={{ color: 'var(--color-accent)' }}>.</span>
          </button>
          <p className="text-xs mt-1 flex items-center gap-1 justify-center md:justify-start" style={{ color: 'var(--color-muted)' }}>
            © {year} {profile.name} · Built with <Heart size={11} style={{ color: '#f87171' }} fill="#f87171" /> &amp; React
          </p>
        </div>

        {/* Social */}
        <div className="flex items-center gap-2">
          {[
            { href: profile.github,        label: 'GitHub',   icon: <Github size={15}/> },
            { href: profile.linkedin,      label: 'LinkedIn', icon: <Linkedin size={15}/> },
            { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={15}/> },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center profcard"
              style={{ color: 'var(--color-muted)' }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Back to top */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-outline text-xs py-2 px-4"
          style={{ color: 'var(--color-muted)' }}
        >
          ↑ Back to top
        </motion.button>
      </div>
    </footer>
  );
}

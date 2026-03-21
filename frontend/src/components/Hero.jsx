import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import HeroCanvas from './HeroCanvas';
import FloatingTechIcons from './FloatingTechIcons';
import { profile } from '../data';
import { scrollToSection } from '../hooks/useTheme';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22,1,0.36,1], duration: 0.65 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* 3D particle background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Floating tech icons */}
      <FloatingTechIcons />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,110,247,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(86,207,225,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      {/* Content */}
      <div className="section-container w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: text ──────────────────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Eyebrow badge */}
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase"
                style={{
                  background: 'rgba(124,110,247,0.15)',
                  border: '1px solid rgba(124,110,247,0.4)',
                  color: 'var(--color-accent)',
                }}
              >
                ✦ Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="display-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4"
            >
              Hi, I'm{' '}
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(124,110,247,0.5))',
                }}
              >
                Anisha
              </span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              variants={item}
              className="text-xl md:text-2xl font-display font-normal mb-6 h-9 flex items-center"
              style={{ color: 'var(--color-muted)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',  2400,
                  'AI Enthusiast',         2200,
                  'Data Science Learner',  2400,
                  'Open Source Builder',   2200,
                ]}
                wrapper="span"
                speed={55}
                deletingSpeed={75}
                repeat={Infinity}
                cursor
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--color-muted)' }}
            >
              {profile.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                View Projects
                <ArrowDown size={15} />
              </button>
              <a href={profile.cvFile} download className="btn-outline">
                <Download size={15} />
                Download CV
              </a>
              <button onClick={() => scrollToSection('contact')} className="btn-outline">
                Contact Me
              </button>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { href: profile.github, label: 'GitHub', icon: <Github size={17} /> },
                { href: profile.linkedin, label: 'LinkedIn', icon: <Linkedin size={17} /> },
                { href: `mailto:${profile.email}`, label: 'Email', icon: <Mail size={17} /> },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all glass"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: profile image ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.35 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(var(--color-accent), var(--color-accent2), var(--color-accent))', filter: 'blur(2px)' }}
              />
              <motion.div
                animate={{ scale: [1.08, 1.02, 1.08], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(var(--color-accent2), var(--color-accent), var(--color-accent2))', filter: 'blur(4px)' }}
              />

              {/* Gradient border */}
              <div
                className="p-[3px] rounded-full relative z-10"
                style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2), var(--color-accent))' }}
              >
                <div className="rounded-full p-1" style={{ background: 'var(--color-bg)' }}>
                  <img
                    src="/profile.jpg"
                    alt="Anisha Kumari"
                    className="w-60 h-60 md:w-72 md:h-72 rounded-full object-cover"
                    style={{ boxShadow: '0 0 40px rgba(124,110,247,0.4)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.insertAdjacentHTML('beforeend',
                        `<div class="w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center" style="background:rgba(124,110,247,0.15)">
                          <span style="font-family:'Playfair Display',serif;font-size:4rem;font-weight:700;background:linear-gradient(135deg,#7c6ef7,#56cfe1);-webkit-background-clip:text;-webkit-text-fill-color:transparent">AK</span>
                        </div>`
                      );
                    }}
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-2 px-3 py-1.5 rounded-xl text-xs font-mono shadow-lg z-20 glass"
                style={{ color: 'var(--color-accent)', border: '1px solid var(--color-border2)' }}
              >
                &lt;/ developer&gt;
              </motion.div>

              {/* Second badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -top-2 -left-4 px-3 py-1.5 rounded-xl text-xs font-mono shadow-lg z-20 glass"
                style={{ color: 'var(--color-accent2)', border: '1px solid rgba(86,207,225,0.3)' }}
              >
                AI ✦ ML
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={15} style={{ color: 'var(--color-accent)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

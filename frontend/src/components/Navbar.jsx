import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Github } from 'lucide-react';
import { scrollToSection } from '../hooks/useTheme';
import { profile } from '../data';

const navItems = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact',      id: 'contact' },
];

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observers = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);
  return active;
}

export default function Navbar({ dark, onToggle, scrollY }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const scrolled = scrollY > 40;

  const go = (id) => { scrollToSection(id); setOpen(false); };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(8,11,20,0.75)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => go('home')} className="display-heading text-xl font-bold tracking-tight">
          <span style={{
            background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>AK</span>
          <span style={{ color: 'var(--color-accent)' }}>.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                <button
                  onClick={() => go(id)}
                  className="nav-link"
                  style={isActive ? { color: 'var(--color-text)' } : {}}
                >
                  {label}
                </button>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* GitHub */}
          <motion.a
            href={profile.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center glass"
            style={{ color: 'var(--color-muted)' }}
            aria-label="GitHub"
          >
            <Github size={16} />
          </motion.a>

          {/* Dark toggle */}
          <motion.button
            onClick={onToggle} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center glass"
            style={{ color: 'var(--color-muted)' }}
            aria-label={dark ? 'Light mode' : 'Dark mode'}
          >
            <AnimatePresence mode="wait">
              {dark
                ? <motion.span key="sun"  initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><Sun size={15}/></motion.span>
                : <motion.span key="moon" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><Moon size={15}/></motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center glass"
            style={{ color: 'var(--color-muted)' }}
            aria-label="Menu" aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x"    initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}  transition={{duration:0.18}}><X    size={17}/></motion.span>
                : <motion.span key="menu" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.18}}><Menu size={17}/></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: 'rgba(8,11,20,0.9)',
              backdropFilter: 'blur(24px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navItems.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color: active === id ? 'var(--color-accent)' : 'var(--color-muted)',
                      background: active === id ? 'rgba(124,110,247,0.1)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

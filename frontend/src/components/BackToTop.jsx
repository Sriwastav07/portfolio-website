import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '../hooks/useTheme';

export default function BackToTop({ scrollY }) {
  const [progress, setProgress] = useState(0);
  const visible = scrollY > 400;

  useEffect(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(total > 0 ? Math.min(scrollY / total, 1) : 0);
  }, [scrollY]);

  const SIZE = 46, STROKE = 2.5;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = CIRC * (1 - progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
          /* Positioned to the left of the chatbot button */
          className="fixed z-50 flex items-center justify-center"
          style={{ bottom: '1.5rem', right: '4.5rem', width: SIZE, height: SIZE }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE} height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none"
              stroke="url(#ring-grad)" strokeWidth={STROKE} strokeLinecap="round"
              strokeDasharray={CIRC} strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.2s ease' }} />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c6ef7" />
                <stop offset="100%" stopColor="#56cfe1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Face */}
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: SIZE - 10, height: SIZE - 10,
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))',
              boxShadow: '0 0 16px var(--glow-purple)',
              color: '#fff',
            }}
          >
            <ArrowUp size={14} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

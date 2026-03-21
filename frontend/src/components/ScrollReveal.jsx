import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OFFSETS = {
  up:    { y: 36, x: 0 },
  down:  { y: -36, x: 0 },
  left:  { y: 0, x: 44 },
  right: { y: 0, x: -44 },
};

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.65, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  const { x, y } = OFFSETS[direction] ?? OFFSETS.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

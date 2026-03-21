import { motion } from 'framer-motion';

// ── SVG icon data ─────────────────────────────────────────────────────────────
const ICONS = [
  {
    id: 'react',
    label: 'React',
    color: '#61DAFB',
    // React atom SVG
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="3.5" fill="none" opacity="0.9"/>
        <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="3.5" fill="none" opacity="0.9" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#61DAFB" strokeWidth="3.5" fill="none" opacity="0.9" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="7" fill="#61DAFB"/>
      </svg>
    ),
    // Position: [top%, left%, floatDelay, floatDuration, rotateAmt]
    pos: { top: '14%', left: '7%' },
    delay: 0,
    duration: 5.2,
  },
  {
    id: 'node',
    label: 'Node.js',
    color: '#68A063',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon points="50,5 92,27.5 92,72.5 50,95 8,72.5 8,27.5" stroke="#68A063" strokeWidth="3" fill="rgba(104,160,99,0.1)"/>
        <text x="50" y="58" textAnchor="middle" fill="#68A063" fontSize="22" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
    pos: { top: '60%', left: '4%' },
    delay: 1.1,
    duration: 6.5,
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    color: '#47A248',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="10" width="60" height="80" rx="12" stroke="#47A248" strokeWidth="3" fill="rgba(71,162,72,0.1)"/>
        <circle cx="50" cy="38" r="12" fill="#47A248" opacity="0.8"/>
        <rect x="34" y="55" width="32" height="5" rx="2.5" fill="#47A248" opacity="0.6"/>
        <rect x="34" y="67" width="24" height="5" rx="2.5" fill="#47A248" opacity="0.4"/>
      </svg>
    ),
    pos: { top: '18%', right: '6%' },
    delay: 0.6,
    duration: 5.8,
  },
  {
    id: 'js',
    label: 'JavaScript',
    color: '#F7DF1E',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="8" width="84" height="84" rx="10" fill="rgba(247,223,30,0.1)" stroke="#F7DF1E" strokeWidth="3"/>
        <text x="50" y="65" textAnchor="middle" fill="#F7DF1E" fontSize="38" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    ),
    pos: { bottom: '20%', right: '5%' },
    delay: 1.8,
    duration: 7.1,
  },
  {
    id: 'python',
    label: 'Python',
    color: '#3776AB',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 10 C28 10 22 22 22 38 L22 48 L50 48 L50 52 L18 52 C14 52 8 56 8 66 C8 76 14 88 30 88 L50 88 L50 78 L38 78 C32 78 28 73 28 68 L28 66 L72 66 L72 68 C72 74 67 78 62 78 L50 78 L50 88 L70 88 C86 88 92 76 92 66 C92 56 86 52 82 52 L50 52 L50 48 L78 48 L78 38 C78 22 72 10 50 10Z" fill="rgba(55,118,171,0.2)" stroke="#3776AB" strokeWidth="2"/>
        <circle cx="38" cy="30" r="5" fill="#3776AB"/>
        <circle cx="62" cy="70" r="5" fill="#FFD43B"/>
      </svg>
    ),
    pos: { bottom: '18%', left: '6%' },
    delay: 2.3,
    duration: 6.0,
  },
];

// ── Single floating icon ──────────────────────────────────────────────────────
function TechIcon({ icon }) {
  return (
    <motion.div
      className="absolute z-10 pointer-events-auto"
      style={{ ...icon.pos, width: 52, height: 52 }}
      animate={{
        y: ['0%', '-22px', '0%'],
        rotate: [0, 6, -4, 0],
      }}
      transition={{
        duration: icon.duration,
        delay: icon.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.25, filter: `drop-shadow(0 0 14px ${icon.color})` }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-xl opacity-30 blur-md"
        style={{ background: icon.color }}
      />
      {/* Icon container */}
      <div
        className="relative w-full h-full rounded-xl flex items-center justify-center"
        style={{
          background: `rgba(255,255,255,0.06)`,
          border: `1px solid ${icon.color}33`,
          backdropFilter: 'blur(8px)',
        }}
        title={icon.label}
      >
        {icon.svg}
      </div>
    </motion.div>
  );
}

// ── Exported component ────────────────────────────────────────────────────────
export default function FloatingTechIcons() {
  return (
    <>
      {ICONS.map((icon) => (
        <TechIcon key={icon.id} icon={icon} />
      ))}
    </>
  );
}

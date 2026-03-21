import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef  = useRef(null);
  const glowRef2 = useRef(null);
  const target   = useRef({ x: -400, y: -400 });
  const current  = useRef({ x: -400, y: -400 });
  const raf      = useRef(null);

  useEffect(() => {
    const onMove = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      const { x, y } = current.current;
      if (glowRef.current)  glowRef.current.style.transform  = `translate(${x-200}px,${y-200}px)`;
      if (glowRef2.current) glowRef2.current.style.transform = `translate(${x-80}px,${y-80}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      {/* Large outer glow */}
      <div
        ref={glowRef}
        data-cursor-glow="true"
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 400, height: 400, borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9997,
          background: 'radial-gradient(circle, rgba(124,110,247,0.18) 0%, rgba(86,207,225,0.06) 50%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-600px, -600px)',
          willChange: 'transform',
        }}
      />
      {/* Small sharp inner glow */}
      <div
        ref={glowRef2}
        data-cursor-glow="true"
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 160, height: 160, borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9997,
          background: 'radial-gradient(circle, rgba(124,110,247,0.25) 0%, transparent 65%)',
          filter: 'blur(12px)',
          transform: 'translate(-600px, -600px)',
          willChange: 'transform',
        }}
      />
    </>
  );
}

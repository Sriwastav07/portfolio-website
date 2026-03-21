import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Particle field ─────────────────────────────────────────────────────────────
function Particles({ count = 140 }) {
  const mesh = useRef();
  const light1 = useRef();
  const light2 = useRef();

  // Generate random positions once
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const purple = new THREE.Color('#7c6ef7');
    const cyan   = new THREE.Color('#56cfe1');

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      // Mix between purple and cyan
      const c = Math.random() > 0.5 ? purple : cyan;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  // Animate: slow drift + light orbit
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.04;
      mesh.current.rotation.x = Math.sin(t * 0.025) * 0.12;
    }
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.4) * 8;
      light1.current.position.y = Math.cos(t * 0.3) * 5;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.35) * 7;
      light2.current.position.z = Math.sin(t * 0.25) * 4;
    }
  });

  return (
    <>
      {/* Orbiting colored point lights */}
      <pointLight ref={light1} color="#7c6ef7" intensity={2.5} distance={18} />
      <pointLight ref={light2} color="#56cfe1" intensity={2}   distance={15} />

      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

// ── Glowing ring ──────────────────────────────────────────────────────────────
function Ring() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.z = t * 0.08;
      mesh.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.12) * 0.15;
    }
  });
  return (
    <mesh ref={mesh} position={[3, 0, -4]}>
      <torusGeometry args={[3.5, 0.012, 16, 120]} />
      <meshBasicMaterial color="#7c6ef7" transparent opacity={0.22} />
    </mesh>
  );
}

function Ring2() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.z = -t * 0.06;
      mesh.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    }
  });
  return (
    <mesh ref={mesh} position={[-2, 1, -5]}>
      <torusGeometry args={[2.2, 0.01, 16, 100]} />
      <meshBasicMaterial color="#56cfe1" transparent opacity={0.18} />
    </mesh>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Particles count={160} />
          <Ring />
          <Ring2 />
          <ambientLight intensity={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';

// ─── 3D Scene Component ─────────────────────────────────────────────────────

interface SlideProps {
  active: boolean;
}

function DataFlowTube({
  start,
  end,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
}) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    mid.z += 0.5;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 20, 0.02, 8, false),
    [curve]
  );

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#1A56DB"
        emissive="#1A56DB"
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function SolutionScene({ active }: SlideProps) {
  const phoneRef = useRef<THREE.Group>(null!);
  const hasAnimated = useRef(false);

  const cornerPoints = useMemo(
    () => [
      new THREE.Vector3(-2, 1.5, -1),
      new THREE.Vector3(2, 1.5, -1),
      new THREE.Vector3(-2, -1.5, -1),
      new THREE.Vector3(2, -1.5, -1),
    ],
    []
  );

  const phoneCenter = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (phoneRef.current && hasAnimated.current) {
      // Oscillate rotation Y
      phoneRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
      // Float up/down
      phoneRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    }
  });

  useMemo(() => {
    if (active && !hasAnimated.current) {
      hasAnimated.current = true;

      // Small delay to ensure ref is ready
      setTimeout(() => {
        if (phoneRef.current) {
          phoneRef.current.position.y = -5;
          gsap.to(phoneRef.current.position, {
            y: 0,
            duration: 1.5,
            ease: 'bounce.out',
          });
        }
      }, 50);
    }
  }, [active]);

  return (
    <group>
      {/* Phone model */}
      <group ref={phoneRef} position={[0, -5, 0]}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[1.2, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Phone screen */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1, 1.9]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1A56DB"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Data flow tubes from phone to corners */}
      {cornerPoints.map((point, i) => (
        <DataFlowTube key={i} start={phoneCenter} end={point} />
      ))}

      {/* Blue point light near phone */}
      <pointLight
        color="#1A56DB"
        intensity={1.5}
        position={[0, 0, 2]}
        distance={8}
      />
    </group>
  );
}

// ─── HTML Content Overlay ────────────────────────────────────────────────────

const pills = [
  { label: 'ডিজিটাল সনদ \u{1F4C4}', top: '15%', left: '5%' },
  { label: 'অনলাইন পেমেন্ট \u{1F4B3}', top: '15%', right: '5%' },
  { label: 'অভিযোগ ট্র্যাকিং \u{1F4E2}', bottom: '20%', left: '5%' },
  { label: 'রিয়েল-টাইম রিপোর্ট \u{1F4CA}', bottom: '20%', right: '5%' },
];

export function SolutionContent({ active }: SlideProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center pointer-events-auto">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold text-gray-900 dark:text-white font-bangla"
        initial={{ opacity: 0, y: 30 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        আমাদের সমাধান
      </motion.h2>

      <motion.p
        className="text-gray-500 dark:text-gray-400 mt-1 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Our Solution
      </motion.p>

      {/* Floating pills around the content */}
      {pills.map((pill, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm px-4 py-2 text-sm font-bangla text-gray-700 dark:text-gray-300"
          style={{
            top: pill.top,
            left: pill.left,
            right: pill.right,
            bottom: pill.bottom,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            active
              ? {
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            opacity: { delay: 0.8 + i * 0.2, duration: 0.5 },
            scale: { delay: 0.8 + i * 0.2, duration: 0.5 },
            y: {
              repeat: Infinity,
              duration: 3,
              delay: i * 0.5,
              ease: 'easeInOut',
            },
          }}
        >
          {pill.label}
        </motion.div>
      ))}

      {/* Bottom tagline */}
      <motion.p
        className="mt-12 text-xl font-bold bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        One Platform. Every Pourashava. All Citizens.
      </motion.p>
    </div>
  );
}

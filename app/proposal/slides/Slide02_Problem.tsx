'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';
import { FileX, AlertTriangle, TrendingDown, MessageSquareX } from 'lucide-react';

// ─── 3D Scene Component ─────────────────────────────────────────────────────

interface SlideProps {
  active: boolean;
}

export function ProblemScene({ active }: SlideProps) {
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const edgesRef = useRef<THREE.LineSegments[]>([]);
  const hasAnimated = useRef(false);

  const cubePositions: [number, number, number][] = useMemo(
    () => [
      [-0.5, 0.5, 0],
      [0.5, 0.5, 0],
      [-0.5, -0.5, 0],
      [0.5, -0.5, 0],
    ],
    []
  );

  const driftTargets: [number, number, number][] = useMemo(
    () => [
      [-1.5, 1.5, -0.5],
      [1.5, 1.5, 0.5],
      [-1.5, -1.5, 0.5],
      [1.5, -1.5, -0.5],
    ],
    []
  );

  useMemo(() => {
    if (active && !hasAnimated.current) {
      hasAnimated.current = true;

      cubesRef.current.forEach((mesh, i) => {
        if (!mesh) return;

        // Shake: rotation oscillation
        gsap.to(mesh.rotation, {
          x: 0.1,
          y: 0.1,
          duration: 0.1,
          repeat: 10,
          yoyo: true,
          ease: 'none',
          onComplete: () => {
            // Reset rotation after shake
            gsap.to(mesh.rotation, { x: 0, y: 0, duration: 0.3 });

            // Drift apart
            gsap.to(mesh.position, {
              x: driftTargets[i][0],
              y: driftTargets[i][1],
              z: driftTargets[i][2],
              duration: 3,
              ease: 'power2.out',
            });
          },
        });
      });

      edgesRef.current.forEach((line, i) => {
        if (!line) return;

        gsap.to(line.rotation, {
          x: 0.1,
          y: 0.1,
          duration: 0.1,
          repeat: 10,
          yoyo: true,
          ease: 'none',
          onComplete: () => {
            gsap.to(line.rotation, { x: 0, y: 0, duration: 0.3 });
            gsap.to(line.position, {
              x: driftTargets[i][0],
              y: driftTargets[i][1],
              z: driftTargets[i][2],
              duration: 3,
              ease: 'power2.out',
            });
          },
        });
      });
    }
  }, [active, driftTargets]);

  const edgesGeometry = useMemo(() => {
    const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    return new THREE.EdgesGeometry(boxGeo);
  }, []);

  return (
    <group>
      {cubePositions.map((pos, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              if (el) cubesRef.current[i] = el;
            }}
            position={pos}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color="#DC2626"
              transparent
              opacity={0.3}
            />
          </mesh>
          <lineSegments
            ref={(el) => {
              if (el) edgesRef.current[i] = el;
            }}
            geometry={edgesGeometry}
            position={pos}
          >
            <lineBasicMaterial color="#DC2626" linewidth={2} />
          </lineSegments>
        </group>
      ))}
      <pointLight color="#DC2626" intensity={1} position={[0, 0, 1]} />
    </group>
  );
}

// ─── HTML Content Overlay ────────────────────────────────────────────────────

const problems = [
  {
    icon: FileX,
    bangla: 'দীর্ঘ অপেক্ষা',
    english: 'Long waiting queues for certificates',
  },
  {
    icon: AlertTriangle,
    bangla: 'কাগজের ঝামেলা',
    english: 'Paperwork & manual processes',
  },
  {
    icon: TrendingDown,
    bangla: 'রাজস্ব ক্ষতি',
    english: 'Revenue loss due to manual tax collection',
  },
  {
    icon: MessageSquareX,
    bangla: 'অভিযোগ অসমাধান',
    english: 'Complaints go unresolved for months',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function ProblemContent({ active }: SlideProps) {
  return (
    <div className="flex h-full w-full flex-col justify-center px-8 md:px-16 py-12 pointer-events-auto">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold text-gray-900 dark:text-white font-bangla"
        initial={{ opacity: 0, y: 30 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        সমস্যা কী?
      </motion.h2>

      <motion.p
        className="text-gray-500 dark:text-gray-400 mt-1 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        The Problem
      </motion.p>

      {/* Problem Cards */}
      <motion.div
        className="flex flex-col gap-3 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        {problems.map((problem, i) => {
          const Icon = problem.icon;
          return (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4"
              style={{ borderLeft: '4px solid #DC2626' }}
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white font-bangla">
                  {problem.bangla}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {problem.english}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom stat bar */}
      <motion.div
        className="mt-6 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-3 text-center text-sm text-gray-600 dark:text-gray-300 font-bangla max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        ৩৩০টি পৌরসভা | ৫ কোটি+ নাগরিক | এখনো ম্যানুয়াল পদ্ধতিতে
      </motion.div>
    </div>
  );
}

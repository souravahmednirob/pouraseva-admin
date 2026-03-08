'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Building2, Play, FileText, Phone } from 'lucide-react';
import Link from 'next/link';

const particleColors = ['#1A56DB', '#3B82F6', '#006A4E', '#10B981', '#FFFFFF'];

export function ClosingScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const animatedRef = useRef(false);

  const particles = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      position: new THREE.Vector3(0, 0, 0),
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      angle: Math.random() * Math.PI * 2,
      elevation: (Math.random() - 0.5) * Math.PI,
      speed: 2 + Math.random() * 3,
      index: i,
    }));
  }, []);

  useEffect(() => {
    if (active && !animatedRef.current && groupRef.current) {
      animatedRef.current = true;
      const meshes = groupRef.current.children as THREE.Mesh[];
      meshes.forEach((mesh, i) => {
        const p = particles[i];
        mesh.position.set(0, 0, 0);
        const targetX = Math.cos(p.angle) * Math.cos(p.elevation) * p.speed;
        const targetY = Math.sin(p.elevation) * p.speed;
        const targetZ = Math.sin(p.angle) * Math.cos(p.elevation) * p.speed;

        gsap.to(mesh.position, {
          x: targetX,
          y: targetY,
          z: targetZ,
          duration: 1.5,
          ease: 'power2.out',
        });

        gsap.to(mesh.position, {
          y: targetY - 4,
          duration: 2,
          delay: 2,
          ease: 'power2.in',
        });
      });
    }
    if (!active) {
      animatedRef.current = false;
      if (groupRef.current) {
        const meshes = groupRef.current.children as THREE.Mesh[];
        meshes.forEach((mesh) => {
          mesh.position.set(0, 0, 0);
        });
      }
    }
  }, [active, particles]);

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.2;
      torusRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Background torus */}
      <mesh ref={torusRef} position={[0, 0, -2]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#1A56DB" wireframe />
      </mesh>

      {/* Particles */}
      <group ref={groupRef}>
        {particles.map((p, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    </>
  );
}

const words = ['আসুন,', 'একসাথে', 'গড়ি'];

export function ClosingContent({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
      {/* Logo */}
      <motion.div
        initial={{ y: -60, scale: 0.5 }}
        animate={active ? { y: 0, scale: 1 } : { y: -60, scale: 0.5 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center shadow-lg">
          <Building2 className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Main heading - each word animated */}
      <h2 className="text-5xl font-bold text-gray-900 dark:text-white font-bangla flex gap-3 mb-4">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.3 + 0.5, duration: 0.6 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Bengali subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="text-gray-500 dark:text-gray-400 text-xl font-bangla mb-2"
      >
        ডিজিটাল বাংলাদেশের স্মার্ট পৌরসভা
      </motion.p>

      {/* English subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="text-gray-400 dark:text-gray-500 text-lg mb-8"
      >
        Let&apos;s Build Smart Digital Municipalities Together
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
        className="flex gap-4 pointer-events-auto mb-8"
      >
        <Link
          href="/mobile"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] text-white rounded-xl px-6 py-3 font-bangla font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          <Play className="w-5 h-5" />
          ডেমো দেখুন
        </Link>
        <Link
          href="#"
          className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl px-6 py-3 font-bangla font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <FileText className="w-5 h-5" />
          প্রস্তাবনা পড়ুন
        </Link>
        <Link
          href="#"
          className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl px-6 py-3 font-bangla font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Phone className="w-5 h-5" />
          যোগাযোগ করুন
        </Link>
      </motion.div>

      {/* Bangladesh flag stripe */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={active ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="flex items-center gap-0 mb-4"
      >
        <div className="bg-[#006A4E] w-16 h-1" />
        <div className="bg-[#F42A41] w-8 h-1" />
        <div className="bg-[#006A4E] w-16 h-1" />
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="text-gray-400 text-sm font-bangla"
      >
        PouraSeva &copy; 2025 | কালিয়াকৈর পাইলট প্রজেক্ট
      </motion.p>
    </div>
  );
}

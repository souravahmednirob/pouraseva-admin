'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { MapPin, Users, Landmark, Star, Calendar } from 'lucide-react';

export function PilotScene({ active }: { active: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null!);
  const pinRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const hasAnimated = useRef(false);
  const ringPhase = useRef(0);

  useEffect(() => {
    if (active && !hasAnimated.current && groupRef.current) {
      hasAnimated.current = true;
      groupRef.current.scale.set(1, 1, 1);
      gsap.to(groupRef.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 3,
        ease: 'power2.out',
      });
    }
    if (!active) {
      hasAnimated.current = false;
      if (groupRef.current) {
        groupRef.current.scale.set(1, 1, 1);
      }
    }
  }, [active]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }

    if (ringRef.current) {
      ringPhase.current += 0.03;
      const pulse = 0.5 + Math.sin(ringPhase.current) * 0.5;
      const scale = 0.5 + pulse * 1.0;
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as THREE.MeshStandardMaterial).opacity = 1 - pulse * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color="#4488ff" />

      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#1A56DB"
          wireframe
          opacity={0.15}
          transparent
        />
      </mesh>

      <mesh ref={pinRef} position={[0.5, 0.8, 1.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>

      <mesh ref={ringRef} position={[0.5, 0.8, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 16, 32]} />
        <meshStandardMaterial color="#DC2626" opacity={0.8} transparent />
      </mesh>
    </group>
  );
}

const infoCards = [
  { icon: MapPin, text: 'গাজীপুর জেলা, ঢাকা বিভাগ' },
  { icon: Users, text: '২,৪৯,১১১ জনসংখ্যা' },
  { icon: Landmark, text: '৯টি ওয়ার্ড | ২৮.০২ বর্গ কি.মি.' },
  { icon: Star, text: 'Class A পৌরসভা' },
  { icon: Calendar, text: 'প্রতিষ্ঠা: ২০০৩' },
];

const phases = [
  {
    period: 'মাস ১-২',
    title: 'সেটআপ ও প্রশিক্ষণ',
    desc: 'সিস্টেম ইনস্টলেশন, ডেটা মাইগ্রেশন, স্টাফ ট্রেনিং',
  },
  {
    period: 'মাস ৩-৪',
    title: 'পাইলট লঞ্চ',
    desc: 'নাগরিক অনবোর্ডিং, সেবা চালু, ফিডব্যাক সংগ্রহ',
  },
  {
    period: 'মাস ৫-৬',
    title: 'সম্পূর্ণ চালু',
    desc: 'সকল সেবা সম্পূর্ণভাবে চালু, অপ্টিমাইজেশন',
  },
];

export function PilotContent({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left side - Kaliakair info */}
      <div className="md:w-2/5 flex flex-col gap-3">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          কালিয়াকৈর পৌরসভা
          <span className="block text-sm font-normal text-gray-500 mt-1">Kaliakair Pourashava - Pilot</span>
        </motion.h2>

        {infoCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-center gap-3"
              initial={{ x: -60, opacity: 0 }}
              animate={active ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Icon className="w-5 h-5 text-[#1A56DB] flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">{card.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Right side - Timeline */}
      <div className="md:w-3/5 relative flex gap-4">
        {/* Vertical blue line */}
        <motion.div
          className="w-0.5 bg-[#1A56DB] self-stretch rounded-full"
          style={{ transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <div className="flex flex-col gap-4 flex-1">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-4"
              initial={{ x: 60, opacity: 0 }}
              animate={active ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }}
            >
              <div className="text-xs text-[#1A56DB] font-semibold mb-1">{phase.period}</div>
              <div className="font-bold text-gray-900 dark:text-white">{phase.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{phase.desc}</div>
            </motion.div>
          ))}

          <motion.div
            className="text-center mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="text-lg text-[#1A56DB] font-bold">৬ মাসে সম্পূর্ণ ডিজিটাল</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { Play, FileText, CreditCard, MessageSquareWarning, Bell, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const phonePositions: [number, number, number][] = [[-1.5, 0, 0], [0, 0, 0.5], [1.5, 0, 0]];
const phoneRotations = [-0.3, 0, 0.3];

function PhoneModel({ position, rotationY, index, active }: { position: [number, number, number]; rotationY: number; index: number; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const animatedRef = useRef(false);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    if (active && !animatedRef.current && groupRef.current) {
      animatedRef.current = true;
      groupRef.current.position.y = -3;
      gsap.to(groupRef.current.position, {
        y: position[1],
        duration: 1,
        delay: index * 0.2,
        ease: 'back.out(2)',
      });
    }
    if (!active) {
      animatedRef.current = false;
      if (groupRef.current) {
        groupRef.current.position.y = -3;
      }
    }
  }, [active, index, position]);

  useFrame((_, delta) => {
    if (active && groupRef.current) {
      timeRef.current += delta * (1 + index * 0.3);
      groupRef.current.position.y = position[1] + Math.sin(timeRef.current) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.8, 1.5, 0.06]} />
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[0.7, 1.35]} />
        <meshStandardMaterial
          color="#1A56DB"
          emissive="#1A56DB"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

export function DemoScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 2, 1]} color="#1A56DB" intensity={2} />
      {phonePositions.map((pos, i) => (
        <PhoneModel key={i} position={pos} rotationY={phoneRotations[i]} index={i} active={active} />
      ))}
    </>
  );
}

const miniScreens = [
  { label: 'Citizen Home', Icon: Play, color: '#1A56DB' },
  { label: 'Tax Payment', Icon: CreditCard, color: '#10B981' },
  { label: 'Complaint', Icon: MessageSquareWarning, color: '#F97316' },
  { label: 'Officer', Icon: BarChart3, color: '#8B5CF6' },
  { label: 'Mayor', Icon: FileText, color: '#1A56DB' },
  { label: 'Notices', Icon: Bell, color: '#3B82F6' },
];

export function DemoContent({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-bangla">লাইভ ডেমো</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">Live Demo Preview</p>
      </motion.div>

      {/* Mini phone screenshots grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {miniScreens.map((screen, i) => (
          <motion.div
            key={i}
            initial={{ y: -40, opacity: 0 }}
            animate={active ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
            transition={{ delay: i * 0.15 + 0.3, type: 'spring' }}
            className="w-[140px] h-[240px] rounded-[16px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E293B] overflow-hidden flex flex-col"
          >
            {/* Mini status bar */}
            <div className="h-4 bg-gray-100 dark:bg-gray-800 flex items-center px-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="w-6 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto" />
            </div>
            {/* Mini header */}
            <div className="h-6 flex items-center px-2" style={{ backgroundColor: screen.color + '20' }}>
              <div className="w-3 h-3 rounded" style={{ backgroundColor: screen.color }} />
              <span className="text-[6px] ml-1 text-gray-600 dark:text-gray-400 truncate">{screen.label}</span>
            </div>
            {/* Mini content */}
            <div className="flex-1 p-2 space-y-1.5">
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-700" />
              <div className="w-3/4 h-2 rounded-full bg-gray-100 dark:bg-gray-700" />
              <div className="w-full h-8 rounded-md mt-2" style={{ backgroundColor: screen.color + '15' }} />
              <div className="flex gap-1 mt-1">
                <div className="w-1/2 h-6 rounded" style={{ backgroundColor: screen.color + '20' }} />
                <div className="w-1/2 h-6 rounded bg-gray-100 dark:bg-gray-700" />
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-700 mt-1" />
              <div className="w-2/3 h-2 rounded-full bg-gray-100 dark:bg-gray-700" />
            </div>
            {/* Mini nav bar */}
            <div className="h-5 border-t border-gray-100 dark:border-gray-700 flex items-center justify-around px-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: screen.color }} />
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 1.5, type: 'spring' }}
        className="pointer-events-auto"
      >
        <Link
          href="/mobile"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] text-white rounded-xl px-6 py-3 font-bangla font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          <Play className="w-5 h-5" />
          সম্পূর্ণ ডেমো দেখুন
        </Link>
      </motion.div>
    </div>
  );
}

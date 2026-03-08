'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Settings, Database, Users } from 'lucide-react';

const tubeColors = ['#1A56DB', '#3B82F6', '#8B5CF6', '#10B981', '#1A56DB'];
const tubeYPositions = [1, 0.5, 0, -0.5, -1];

function Stream({ y, color, index, active }: { y: number; color: string; index: number; active: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const tRef = useRef(0);

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const x = -3 + (6 * i) / 20;
      const z = Math.sin((i / 20) * Math.PI * 2 + index) * 0.3;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [y, index]);

  const tubeGeom = useMemo(() => {
    return new THREE.TubeGeometry(curve, 50, 0.02, 8, false);
  }, [curve]);

  useFrame((_, delta) => {
    if (!active) {
      tRef.current = 0;
    } else {
      tRef.current += delta * 0.2;
      if (tRef.current > 1) tRef.current = 0;
    }
    if (sphereRef.current) {
      const point = curve.getPointAt(tRef.current);
      sphereRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeom}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export function TimelineScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {tubeYPositions.map((y, i) => (
        <Stream key={i} y={y} color={tubeColors[i]} index={i} active={active} />
      ))}
    </>
  );
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const ganttRows = [
  { label: 'সেটআপ ও ডেভেলপমেন্ট', start: 0, end: 3, color: '#1A56DB' },
  { label: 'পরীক্ষামূলক চালু', start: 2, end: 5, color: '#3B82F6' },
  { label: 'Staff প্রশিক্ষণ', start: 1, end: 4, color: '#8B5CF6' },
  { label: 'নাগরিক অনবোর্ডিং', start: 3, end: 6, color: '#10B981' },
  { label: 'সম্পূর্ণ চালু', start: 4, end: 6, color: '#1A56DB' },
];

const budgetCards = [
  { label: 'উন্নয়ন ব্যয়', Icon: Settings },
  { label: 'অবকাঠামো ব্যয়', Icon: Database },
  { label: 'প্রশিক্ষণ ব্যয়', Icon: Users },
];

export function TimelineContent({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-bangla">সময়সীমা ও বাজেট</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">Timeline &amp; Budget</p>
      </motion.div>

      {/* Gantt Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-[#1E293B] rounded-xl p-5 border border-gray-100 dark:border-gray-700 w-full max-w-3xl mb-6"
      >
        {/* Month headers */}
        <div className="flex mb-3">
          <div className="w-40 shrink-0" />
          <div className="flex-1 flex">
            {months.map((m) => (
              <div key={m} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {ganttRows.map((row, i) => (
          <div key={i} className="flex items-center mb-2">
            <div className="w-40 shrink-0 text-xs text-gray-700 dark:text-gray-300 font-bangla truncate pr-2">
              {row.label}
            </div>
            <div className="flex-1 relative h-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={active ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.6, ease: 'easeOut' }}
                style={{
                  transformOrigin: 'left',
                  left: `${(row.start / 6) * 100}%`,
                  width: `${((row.end - row.start) / 6) * 100}%`,
                  backgroundColor: row.color,
                }}
                className="absolute top-0 h-full rounded-md opacity-80"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Budget Cards */}
      <div className="flex gap-4 mb-4">
        {budgetCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: i * 0.2 + 1.5, type: 'spring' }}
            className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center"
          >
            <card.Icon className="w-6 h-6 mx-auto mb-2 text-[#1A56DB]" />
            <p className="text-sm text-gray-700 dark:text-gray-300 font-bangla">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={active ? { scale: [0, 1.2, 1] } : { scale: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-6 py-2 text-sm font-bangla font-medium"
      >
        ৫০ জন ডেভেলপার টিম
      </motion.div>
    </div>
  );
}

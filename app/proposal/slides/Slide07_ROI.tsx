'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Eye, Database, Home, Smartphone, CheckCircle, Shield, Landmark, Users } from 'lucide-react';

const barHeights = [2, 3, 4, 1.5];
const barPositions = [-1.2, -0.4, 0.4, 1.2];
const barColors = ['#1A56DB', '#10B981', '#F97316', '#8B5CF6'];

function Bar({ height, posX, color, index, active }: { height: number; posX: number; color: string; index: number; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const animatedRef = useRef(false);
  const timeRef = useRef(0);

  useEffect(() => {
    if (active && !animatedRef.current && meshRef.current) {
      animatedRef.current = true;
      meshRef.current.scale.y = 0;
      gsap.from(meshRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: index * 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
    if (!active) {
      animatedRef.current = false;
      if (meshRef.current) {
        meshRef.current.scale.y = 0;
      }
    }
  }, [active, index]);

  useFrame((_, delta) => {
    if (active && meshRef.current && animatedRef.current) {
      timeRef.current += delta;
      const settled = timeRef.current > 1.5 + index * 0.3 + 0.5;
      if (settled) {
        meshRef.current.scale.y = 1 + Math.sin(timeRef.current * 2 + index) * 0.02;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[posX, height / 2, 0]}>
      <boxGeometry args={[0.4, height, 0.4]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
  );
}

export function ROIScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group>
        {barHeights.map((h, i) => (
          <Bar key={i} height={h} posX={barPositions[i]} color={barColors[i]} index={i} active={active} />
        ))}
      </group>
    </>
  );
}

const govBenefits = [
  { Icon: TrendingUp, stat: '৪০%+', label: 'রাজস্ব বৃদ্ধি' },
  { Icon: Clock, stat: '৮০%', label: 'সময় সাশ্রয়' },
  { Icon: Eye, stat: '১০০%', label: 'স্বচ্ছতা' },
  { Icon: Database, stat: '০%', label: 'কাগজ ব্যবহার' },
];

const citizenBenefits = [
  { Icon: Home, stat: 'ঘরে বসে', label: 'সেবা গ্রহণ' },
  { Icon: Smartphone, stat: '২৪/৭', label: 'অ্যাক্সেস' },
  { Icon: CheckCircle, stat: 'রিয়েল-টাইম', label: 'ট্র্যাকিং' },
  { Icon: Shield, stat: 'নিরাপদ', label: 'ডিজিটাল সনদ' },
];

export function ROIContent({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-bangla">সুবিধা ও লাভ</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">ROI &amp; Benefits</p>
      </motion.div>

      <div className="flex gap-8 w-full max-w-5xl">
        {/* Government Benefits */}
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-bangla mb-4 flex items-center gap-2"
          >
            <Landmark className="w-5 h-5" /> সরকারের লাভ
          </motion.h3>
          <div className="space-y-3">
            {govBenefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ delay: i * 0.15 + 0.4, type: 'spring' }}
                className="bg-white dark:bg-[#1E293B] border-l-4 border-l-[#1A56DB] rounded-xl p-4 flex items-center gap-3"
              >
                <item.Icon className="w-5 h-5 text-[#1A56DB]" />
                <div>
                  <p className="text-[#1A56DB] text-xl font-bold">{item.stat}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bangla">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Citizen Benefits */}
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-bangla mb-4 flex items-center gap-2"
          >
            <Users className="w-5 h-5" /> নাগরিকের লাভ
          </motion.h3>
          <div className="space-y-3">
            {citizenBenefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ delay: i * 0.15 + 0.4, type: 'spring' }}
                className="bg-white dark:bg-[#1E293B] border-l-4 border-l-[#10B981] rounded-xl p-4 flex items-center gap-3"
              >
                <item.Icon className="w-5 h-5 text-[#10B981]" />
                <div>
                  <p className="text-[#10B981] text-xl font-bold">{item.stat}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bangla">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

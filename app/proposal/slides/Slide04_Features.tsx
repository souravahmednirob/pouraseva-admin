'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FileText, CreditCard, MessageSquare, Bell, Settings, BarChart3, Shield } from 'lucide-react';

const CARD_COLORS = ['#1A56DB', '#10B981', '#F59E0B', '#8B5CF6', '#F97316', '#06B6D4', '#1A56DB'];

export function FeaturesScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const cardsRef = useRef<THREE.Mesh[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (active && !hasAnimated.current && cardsRef.current.length === 7) {
      hasAnimated.current = true;
      cardsRef.current.forEach((mesh, i) => {
        mesh.scale.set(0, 0, 0);
        gsap.to(mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          delay: i * 0.15,
          duration: 0.8,
          ease: 'back.out(2)',
        });
      });
    }
    if (!active) {
      hasAnimated.current = false;
      cardsRef.current.forEach((mesh) => {
        if (mesh) mesh.scale.set(0, 0, 0);
      });
    }
  }, [active]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const radius = 3;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 0]} />
      {CARD_COLORS.map((color, i) => {
        const angle = (i / 7) * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            position={[x, 0, z]}
            scale={[0, 0, 0]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          >
            <planeGeometry args={[0.8, 1, 1]} />
            <meshStandardMaterial
              color={color}
              opacity={0.3}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

const features = [
  { icon: FileText, label: 'নাগরিক সেবা', en: 'Citizen Services', count: 19, color: '#1A56DB' },
  { icon: CreditCard, label: 'রাজস্ব ও পেমেন্ট', en: 'Revenue & Payment', count: 19, color: '#10B981' },
  { icon: MessageSquare, label: 'অভিযোগ ব্যবস্থাপনা', en: 'Complaints', count: 16, color: '#F59E0B' },
  { icon: Bell, label: 'তথ্য ও যোগাযোগ', en: 'Information', count: 19, color: '#8B5CF6' },
  { icon: Settings, label: 'Admin & Staff', en: 'Administration', count: 24, color: '#F97316' },
  { icon: BarChart3, label: 'Analytics', en: 'Reports & Analytics', count: 25, color: '#06B6D4' },
  { icon: Shield, label: 'Technical', en: 'Security & Infra', count: 36, color: '#1A56DB' },
];

export function FeaturesContent({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setCount(0);
      animatedRef.current = false;
      return;
    }

    if (animatedRef.current) return;
    animatedRef.current = true;

    const target = 158;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        ১৫৮টি ফিচার
        <span className="block text-lg font-normal text-gray-500 mt-1">158 Features</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm cursor-pointer"
              style={{ borderTop: `3px solid ${feature.color}` }}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={active ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 90 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            >
              <Icon className="w-6 h-6 mb-2" style={{ color: feature.color }} />
              <div className="font-semibold text-gray-900 dark:text-white">{feature.label}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{feature.en}</div>
              <div className="text-2xl font-bold mt-2" style={{ color: feature.color }}>
                {feature.count}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="text-lg text-gray-600 dark:text-gray-300">মোট </span>
        <span className="text-5xl text-[#1A56DB] font-bold">{count}</span>
        <span className="text-lg text-gray-600 dark:text-gray-300"> টি ফিচার</span>
      </motion.div>
    </div>
  );
}

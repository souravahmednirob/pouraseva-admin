'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Play, FileText, Phone, X, Mail, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════
   3D SCENE — Large ring around center
   ═══════════════════════════════════════════════════════════ */

export function ClosingScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (active && groupRef.current) {
      groupRef.current.scale.set(0.5, 0.5, 0.5);
      gsap.to(groupRef.current.scale, { x: 1, y: 1, z: 1, duration: 2, ease: 'power2.out' });
    }
    if (!active && groupRef.current) groupRef.current.scale.set(0.5, 0.5, 0.5);
  }, [active]);

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.15;
    }
  });

  if (!active) return null;
  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Large rotating ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3.2, 0.04, 16, 120]} />
        <meshBasicMaterial color="#1A56DB" transparent opacity={0.35} />
      </mesh>
      {/* Second subtle ring */}
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[3.4, 0.015, 16, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.12} />
      </mesh>
      {/* Third ring — dashed feel */}
      <mesh rotation={[0.1, 0.5, 0]}>
        <torusGeometry args={[3.0, 0.01, 16, 60]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANGLADESH FLAG — vertical strip wave (same as other slides)
   ═══════════════════════════════════════════════════════════ */

function BangladeshFlag({ side, active }: { side: 'left' | 'right'; active: boolean }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      className={`absolute top-0 bottom-0 ${isLeft ? 'left-3' : 'right-3'} z-20 flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-stretch`}
      initial={{ opacity: 0, y: -100 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
      transition={{ delay: 0.5, duration: 1.2, type: 'spring', bounce: 0.15 }}
    >
      <div className="w-3 h-full rounded-full relative"
        style={{ background: 'linear-gradient(to right, #8B6914, #DAA520, #B8860B, #8B6914)', boxShadow: '2px 0 10px rgba(0,0,0,0.2)' }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full shadow-lg" style={{ background: 'radial-gradient(circle at 35% 35%, #FFD700, #B8860B, #8B6914)' }} />
          <div className="w-1.5 h-2 rounded-b-full" style={{ background: '#B8860B' }} />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-4 rounded-b-lg" style={{ background: 'linear-gradient(to bottom, #6B4F10, #3d2c08)' }} />
      </div>
      {(() => {
        const STRIPS = 28, FW = 280, FH = 168, SW = FW / STRIPS, KF = 6;
        return (
          <div className={`mt-4 relative ${isLeft ? '-ml-0.5' : '-mr-0.5'}`}
            style={{ width: FW, height: FH, filter: 'drop-shadow(3px 4px 8px rgba(0,0,0,0.2))', perspective: '800px' }}
          >
            {Array.from({ length: STRIPS }).map((_, s) => {
              const p = isLeft ? s / (STRIPS - 1) : 1 - s / (STRIPS - 1);
              const yAmp = 1 + p * 10, rotAmp = p * 8, skewAmp = p * 2, phase = p * Math.PI * 2.5;
              const yF = Array.from({ length: KF }, (_, k) => Math.sin((k / (KF - 1)) * Math.PI * 2 + phase) * yAmp);
              const rF = Array.from({ length: KF }, (_, k) => Math.sin((k / (KF - 1)) * Math.PI * 2 + phase + 0.4) * rotAmp);
              const sF = Array.from({ length: KF }, (_, k) => Math.sin((k / (KF - 1)) * Math.PI * 2 + phase + 0.8) * skewAmp);
              return (
                <motion.div key={s}
                  style={{ position: 'absolute', left: s * SW, top: 0, width: SW + 2, height: FH, overflow: 'hidden', transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                  animate={active ? { y: yF, rotateY: rF, skewY: sF } : { y: 0, rotateY: 0, skewY: 0 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width={FW} height={FH} viewBox={`0 0 ${FW} ${FH}`} style={{ marginLeft: -(s * SW), display: 'block' }}>
                    <rect width={FW} height={FH} fill="#006a4e" />
                    <circle cx="120" cy="84" r="40" fill="#f42a41" />
                  </svg>
                </motion.div>
              );
            })}
          </div>
        );
      })()}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANGLADESH MAP SVG — from GeoJSON (same path as Slide05)
   ═══════════════════════════════════════════════════════════ */

const BD_PATH = 'M 286.6,281 L 285.4,324.3 L 264.9,315.1 L 268.7,363.7 L 251.9,332.2 L 248.5,301.5 L 237.3,272.5 L 212.8,237.3 L 158.6,234.9 L 163.9,259.8 L 145.5,293.4 L 120.4,281.1 L 111.9,292.1 L 95.2,285.5 L 72.5,280.1 L 63.3,230.5 L 42.9,185.1 L 52.9,148.8 L 16.7,132.6 L 29.8,110.6 L 66.6,88.1 L 24.1,56.2 L 44.9,15.3 L 91.5,41.4 L 119.6,44.3 L 124.7,86.3 L 180.7,94.5 L 235.3,93.6 L 269.2,103.9 L 242.1,155 L 215.7,158.5 L 197.6,192.8 L 229.8,224.1 L 239.4,185.5 L 255.6,185.3 L 286.6,281 Z';

/* ═══════════════════════════════════════════════════════════ */

const words = ['আসুন,', 'একসাথে', 'গড়ি'];

export function ClosingContent({ active }: { active: boolean }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContact(false)} />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', bounce: 0.25 }}
              className="relative bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-10"
            >
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="/Joy.png"
                  alt="Shariar Nazim Joy"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shariar Nazim Joy</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Head of Business Department</p>
                <p className="text-xs text-gray-400 mt-1">PouraSeva Digital Platform</p>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+8801749269002"
                  className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-4 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">কল করুন</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">+880 1749-269002</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/8801749269002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/30 rounded-2xl p-4 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">WhatsApp</p>
                    <p className="text-xs text-green-600 dark:text-green-400">মেসেজ পাঠান</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@pouraseva.com"
                  className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-4 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">ইমেইল</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">contact@pouraseva.com</p>
                  </div>
                </a>
              </div>

              <p className="text-center text-[10px] text-gray-400 mt-5">কালিয়াকৈর পৌরসভা পাইলট প্রজেক্ট</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BangladeshFlag side="left" active={active} />
      <BangladeshFlag side="right" active={active} />

      {/* Center: Bangladesh map with content inside */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.15 }}
      >
        {/* Large Bangladesh map as background */}
        <svg viewBox="-10 -5 320 390" className="w-[480px] h-[580px] absolute" style={{ filter: 'drop-shadow(0 8px 40px rgba(0,106,78,0.2))' }}>
          <defs>
            <linearGradient id="closing-bd-fill" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#008d5b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#005a3a" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="closing-bd-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#006A4E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1A56DB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d={BD_PATH} fill="url(#closing-bd-fill)" stroke="url(#closing-bd-stroke)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d={BD_PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 4" />
        </svg>

        {/* Content overlay on map */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ y: -60, scale: 0.5 }}
            animate={active ? { y: 0, scale: 1 } : { y: -60, scale: 0.5 }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center shadow-xl shadow-blue-500/25">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Main heading */}
          <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white font-bangla flex gap-4 mb-5">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.3 + 0.6, duration: 0.6 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Bengali subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-gray-500 dark:text-gray-400 text-2xl font-bangla mb-2"
          >
            ডিজিটাল বাংলাদেশের স্মার্ট পৌরসভা
          </motion.p>

          {/* English subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="text-gray-400 dark:text-gray-500 text-xl mb-8"
          >
            Let&apos;s Build Smart Digital Municipalities Together
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="flex gap-3 pointer-events-auto mb-5"
          >
            <Link
              href="/mobile"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] text-white rounded-xl px-6 py-3 font-bangla font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all"
            >
              <Play className="w-5 h-5" />
              ডেমো দেখুন
            </Link>
            <Link
              href="/proposal/features"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl px-6 py-3 font-bangla font-bold shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-105 transition-all"
            >
              <FileText className="w-5 h-5" />
              প্রস্তাবনা পড়ুন
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl px-6 py-3 font-bangla font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5" />
              যোগাযোগ করুন
            </button>
          </motion.div>

          {/* Bangladesh flag stripe */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={active ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="flex items-center gap-0 mb-5"
          >
            <div className="bg-[#006A4E] w-20 h-1.5 rounded-l-full" />
            <div className="bg-[#F42A41] w-10 h-1.5" />
            <div className="bg-[#006A4E] w-20 h-1.5 rounded-r-full" />
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
      </motion.div>
    </div>
  );
}

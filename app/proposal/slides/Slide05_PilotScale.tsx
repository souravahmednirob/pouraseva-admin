'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Landmark, Star, TrendingUp, Globe } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   3D SCENE — Subtle wireframe globe
   ═══════════════════════════════════════════════════════════ */

export function PilotScaleScene({ active }: { active: boolean }) {
  const globeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (active && groupRef.current) {
      groupRef.current.scale.set(0.8, 0.8, 0.8);
      gsap.to(groupRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out' });
    }
    if (!active && groupRef.current) groupRef.current.scale.set(0.8, 0.8, 0.8);
  }, [active]);

  useFrame(() => { if (globeRef.current) globeRef.current.rotation.y += 0.002; });

  if (!active) return null;
  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[4, 48, 48]} />
        <meshBasicMaterial color="#1A56DB" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[3.95, 48, 48]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANGLADESH FLAG — vertical strip wave
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
   REAL BANGLADESH MAP — from GeoJSON coordinates
   ═══════════════════════════════════════════════════════════ */

const BD_PATH = 'M 286.6,281 L 285.4,324.3 L 264.9,315.1 L 268.7,363.7 L 251.9,332.2 L 248.5,301.5 L 237.3,272.5 L 212.8,237.3 L 158.6,234.9 L 163.9,259.8 L 145.5,293.4 L 120.4,281.1 L 111.9,292.1 L 95.2,285.5 L 72.5,280.1 L 63.3,230.5 L 42.9,185.1 L 52.9,148.8 L 16.7,132.6 L 29.8,110.6 L 66.6,88.1 L 24.1,56.2 L 44.9,15.3 L 91.5,41.4 L 119.6,44.3 L 124.7,86.3 L 180.7,94.5 L 235.3,93.6 L 269.2,103.9 L 242.1,155 L 215.7,158.5 L 197.6,192.8 L 229.8,224.1 L 239.4,185.5 L 255.6,185.3 L 286.6,281 Z';

const cities = [
  { name: 'কালিয়াকৈর', en: 'Kaliakair',  x: 142.4, y: 158.6, pilot: true },
  { name: 'ঢাকা',       en: 'Dhaka',      x: 153.5, y: 174.3, pilot: false },
  { name: 'চট্টগ্রাম',   en: 'Chittagong', x: 237.1, y: 263,   pilot: false },
  { name: 'রাজশাহী',    en: 'Rajshahi',   x: 47.1,  y: 140.5, pilot: false },
  { name: 'খুলনা',      en: 'Khulna',     x: 103.5, y: 234,   pilot: false },
  { name: 'সিলেট',      en: 'Sylhet',     x: 239.4, y: 108.6, pilot: false },
  { name: 'রংপুর',      en: 'Rangpur',    x: 85.3,  y: 57.9,  pilot: false },
  { name: 'বরিশাল',     en: 'Barisal',    x: 151.2, y: 241.3, pilot: false },
  { name: 'ময়মনসিংহ',   en: 'Mymensingh', x: 152.9, y: 117.6, pilot: false },
  { name: 'কুমিল্লা',    en: 'Comilla',    x: 199.4, y: 195.4, pilot: false },
];

function BangladeshMap({ active }: { active: boolean }) {
  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.2 }}
    >
      <svg viewBox="-10 -5 320 390" className="w-full h-full" style={{ filter: 'drop-shadow(0 6px 25px rgba(0,106,78,0.25))' }}>
        <defs>
          <linearGradient id="bd-fill" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#008d5b" />
            <stop offset="100%" stopColor="#005a3a" />
          </linearGradient>
          <filter id="bd-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="pilot-pulse">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow shadow */}
        <path d={BD_PATH} fill="#1A56DB" opacity="0.06" transform="translate(3,3)" filter="url(#bd-glow)" />

        {/* Main Bangladesh shape */}
        <path d={BD_PATH} fill="url(#bd-fill)" stroke="#004d38" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Inner border highlight */}
        <path d={BD_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="6 4" />

        {/* Connection lines from Kaliakair */}
        {cities.filter(c => !c.pilot).map((c, i) => (
          <line key={`conn-${i}`} x1={142.4} y1={158.6} x2={c.x} y2={c.y}
            stroke="#f42a41" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-7" dur="2.5s" repeatCount="indefinite" />
          </line>
        ))}

        {/* City markers */}
        {cities.map((c, i) => (
          <g key={i}>
            {c.pilot ? (
              <>
                {/* Pulse rings */}
                <circle cx={c.x} cy={c.y} r="10" fill="url(#pilot-pulse)">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={c.x} cy={c.y} r="6" fill="#DC2626" stroke="white" strokeWidth="2" />
                {/* Label */}
                <rect x={c.x - 30} y={c.y - 22} width="60" height="14" rx="4" fill="#DC2626" opacity="0.95" />
                <text x={c.x} y={c.y - 12} textAnchor="middle" fill="white" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
                  PILOT
                </text>
              </>
            ) : (
              <>
                <circle cx={c.x} cy={c.y} r="3.5" fill="#1A56DB" stroke="white" strokeWidth="1" />
                <text x={c.x} y={c.y + 12} textAnchor="middle" fill="white" fontSize="6.5" fontWeight="600" opacity="0.85" fontFamily="sans-serif">
                  {c.en}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const pilotInfo = [
  { icon: MapPin,   label: 'গাজীপুর জেলা, ঢাকা বিভাগ',       en: 'Gazipur District, Dhaka Division' },
  { icon: Users,    label: '২,৪৯,১১১ জনসংখ্যা',              en: '249,111 Population' },
  { icon: Landmark, label: '৯টি ওয়ার্ড | ২৮.০২ বর্গ কি.মি.',   en: '9 Wards | 28.02 sq km' },
  { icon: Star,     label: 'Class A পৌরসভা',                  en: 'Class A Municipality' },
];

const scalePhases = [
  { label: '১টি পৌরসভা',        sub: 'কালিয়াকৈর (পাইলট)',  value: 1,   barPct: 8  },
  { label: '১০টি পৌরসভা',       sub: 'প্রথম সম্প্রসারণ',     value: 10,  barPct: 20 },
  { label: '৬৪ জেলার পৌরসভা',   sub: 'জেলা পর্যায়ে',        value: 64,  barPct: 55 },
  { label: '৩৩০টি সকল পৌরসভা',  sub: 'সারা বাংলাদেশ',       value: 330, barPct: 100 },
];

/* ── Animation variants ── */
const containerVar = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

/* ═══════════════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════════════ */

export function PilotScaleContent({ active }: { active: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<'left' | 'right' | null>(null);

  return (
    <div className="relative flex h-full w-full items-center justify-center pointer-events-auto px-4 md:px-6 lg:px-8 py-6">

      <BangladeshFlag side="left" active={active} />
      <BangladeshFlag side="right" active={active} />

      <motion.div
        className="w-full max-w-[1480px]"
        variants={containerVar}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        {/* Heading */}
        <motion.div variants={itemVar} className="text-center mb-3">
          <h2 className="text-[38px] md:text-[46px] font-extrabold text-gray-900 dark:text-white font-bangla leading-[1.1]">
            পাইলট থেকে{' '}
            <span className="bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] bg-clip-text text-transparent">
              সারা বাংলাদেশে
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base mt-1">
            From Pilot to Nationwide — Scaling PouraSeva
          </p>
        </motion.div>

        {/* Three-column: Left card | Center map | Right card */}
        <div className="grid grid-cols-[1fr_360px_1fr] gap-6 items-center">

          {/* ── LEFT: Pilot Info (expands on hover) ── */}
          <motion.div
            variants={itemVar}
            className="justify-self-end w-full max-w-[400px]"
            onMouseEnter={() => setHoveredCard('left')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              animate={{
                scale: hoveredCard === 'left' ? 1.08 : 1,
                zIndex: hoveredCard === 'left' ? 50 : 1,
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              className={`
                origin-right rounded-2xl p-6 cursor-pointer
                backdrop-blur-xl border flex flex-col
                ${hoveredCard === 'left'
                  ? 'bg-white dark:bg-[#1E293B] border-gray-300 dark:border-white/15 shadow-2xl shadow-black/15'
                  : 'bg-white/85 dark:bg-white/[0.06] border-gray-200/70 dark:border-white/[0.08] shadow-sm'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-bangla leading-tight">
                    কালিয়াকৈর পৌরসভা
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                    Pilot Pourashava
                  </p>
                </div>
              </div>

              {/* Info items */}
              <div className="space-y-2.5">
                {pilotInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-100/60 dark:border-white/[0.05]">
                      <Icon className="w-4 h-4 text-[#1A56DB] shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[15px] text-gray-800 dark:text-gray-200 font-bangla font-bold block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">{item.en}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Expanded detail on hover */}
              <AnimatePresence>
                {hoveredCard === 'left' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-white/[0.08]">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-bangla leading-relaxed">
                        <span className="text-[#1A56DB] font-extrabold">কেন কালিয়াকৈর?</span> — ঢাকার নিকটবর্তী,
                        Class A পৌরসভা, উচ্চ জনসংখ্যা ঘনত্ব, ডিজিটাল রূপান্তরের জন্য সবচেয়ে আদর্শ পৌরসভা।
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ── CENTER: Bangladesh Map ── */}
          <motion.div variants={itemVar} className="w-[360px] h-[440px]">
            <BangladeshMap active={active} />
          </motion.div>

          {/* ── RIGHT: Scaling Chart (expands on hover) ── */}
          <motion.div
            variants={itemVar}
            className="justify-self-start w-full max-w-[400px]"
            onMouseEnter={() => setHoveredCard('right')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              animate={{
                scale: hoveredCard === 'right' ? 1.08 : 1,
                zIndex: hoveredCard === 'right' ? 50 : 1,
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              className={`
                origin-left rounded-2xl p-6 cursor-pointer
                backdrop-blur-xl border flex flex-col
                ${hoveredCard === 'right'
                  ? 'bg-white dark:bg-[#1E293B] border-gray-300 dark:border-white/15 shadow-2xl shadow-black/15'
                  : 'bg-white/85 dark:bg-white/[0.06] border-gray-200/70 dark:border-white/[0.08] shadow-sm'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#1A56DB]" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-bangla leading-tight">
                    স্কেলিং রোডম্যাপ
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                    Growth Roadmap
                  </p>
                </div>
              </div>

              {/* Bar chart */}
              <div className="space-y-4">
                {scalePhases.map((phase, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[15px] font-extrabold text-gray-900 dark:text-white font-bangla">
                        {phase.label}
                      </span>
                      <span className="text-lg font-extrabold text-[#1A56DB] tabular-nums ml-2">{phase.value}</span>
                    </div>
                    <div className="h-3 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: i === scalePhases.length - 1
                            ? 'linear-gradient(90deg, #1A56DB, #10B981)'
                            : 'linear-gradient(90deg, #1A56DB, #3B82F6)',
                        }}
                        initial={{ width: '0%' }}
                        animate={active ? { width: `${phase.barPct}%` } : { width: '0%' }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla mt-0.5 block">
                      {phase.sub}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expanded detail on hover */}
              <AnimatePresence>
                {hoveredCard === 'right' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-white/[0.08]">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-bangla leading-relaxed">
                        <span className="text-[#1A56DB] font-extrabold">SaaS মডেল</span> — প্রতিটি পৌরসভার জন্য আলাদা টেনেন্ট,
                        এক ক্লিকে ডিপ্লয়, জিরো ইনফ্রাস্ট্রাকচার ম্যানেজমেন্ট।
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVar} className="flex items-center justify-center mt-4">
          <div className="inline-flex items-center gap-3 bg-[#1A56DB]/8 dark:bg-[#1A56DB]/15 rounded-2xl px-7 py-3">
            <Globe className="w-5 h-5 text-[#1A56DB]" />
            <span className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              ৩৩০ পৌরসভা = <span className="text-[#1A56DB]">৫ কোটি+</span> নাগরিক সেবাপ্রাপ্ত
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

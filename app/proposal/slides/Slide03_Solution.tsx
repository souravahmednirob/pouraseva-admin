'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, CreditCard, MessageSquare, Bell, Settings, BarChart3,
  Building2, Cpu,
} from 'lucide-react';

interface SlideProps { active: boolean; }

/* ═══════════════════════════════════════════════════════════
   3D SCENE
   ═══════════════════════════════════════════════════════════ */

export function SolutionScene({ active }: SlideProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (active && meshRef.current) {
      meshRef.current.scale.set(0, 0, 0);
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out' });
    }
    if (!active && meshRef.current) meshRef.current.scale.set(0, 0, 0);
  }, [active]);

  useFrame(({ clock }) => {
    if (!active || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.05;
    meshRef.current.rotation.x = t * 0.03;
  });

  if (!active) return null;
  return (
    <group position={[0, 0, -4]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial color="#1A56DB" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   BANGLADESH FLAG — full-height pole, large realistic waving flag
   Uses SVG feTurbulence + feDisplacementMap for real wind effect
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
      {/* Full-height pole — thick, realistic metallic */}
      <div className="w-3 h-full rounded-full relative"
        style={{
          background: 'linear-gradient(to right, #8B6914, #DAA520, #B8860B, #8B6914)',
          boxShadow: '2px 0 10px rgba(0,0,0,0.2), -1px 0 4px rgba(218,165,32,0.3)',
        }}
      >
        {/* Pole top ornament — crescent + star style finial */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full shadow-lg"
            style={{ background: 'radial-gradient(circle at 35% 35%, #FFD700, #B8860B, #8B6914)' }}
          />
          <div className="w-1.5 h-2 rounded-b-full"
            style={{ background: '#B8860B' }}
          />
        </div>
        {/* Pole base */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-4 rounded-b-lg"
          style={{ background: 'linear-gradient(to bottom, #6B4F10, #3d2c08)' }}
        />
      </div>

      {/* Flag — vertical strip wave for realistic ripple */}
      {(() => {
        const STRIPS = 28;
        const FW = 280, FH = 168;
        const SW = FW / STRIPS;
        const KF = 6; // keyframe count

        return (
          <div
            className={`mt-4 relative ${isLeft ? '-ml-0.5' : '-mr-0.5'}`}
            style={{
              width: FW,
              height: FH,
              filter: 'drop-shadow(3px 4px 8px rgba(0,0,0,0.2))',
              perspective: '800px',
            }}
          >
            {Array.from({ length: STRIPS }).map((_, s) => {
              // Progress: 0 at pole, 1 at free end
              const p = isLeft ? s / (STRIPS - 1) : 1 - s / (STRIPS - 1);
              // Strong wave — more strips = smoother with no gaps
              const yAmp = 1 + p * 10;
              const rotAmp = p * 8;
              const skewAmp = p * 2;
              const phase = p * Math.PI * 2.5;

              // Phase-offset sine keyframes — seamless loop
              const yF = Array.from({ length: KF }, (_, k) =>
                Math.sin((k / (KF - 1)) * Math.PI * 2 + phase) * yAmp
              );
              const rF = Array.from({ length: KF }, (_, k) =>
                Math.sin((k / (KF - 1)) * Math.PI * 2 + phase + 0.4) * rotAmp
              );
              const sF = Array.from({ length: KF }, (_, k) =>
                Math.sin((k / (KF - 1)) * Math.PI * 2 + phase + 0.8) * skewAmp
              );

              return (
                <motion.div
                  key={s}
                  style={{
                    position: 'absolute',
                    left: s * SW,
                    top: 0,
                    width: SW + 2, // overlap prevents gaps
                    height: FH,
                    overflow: 'hidden',
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={active ? { y: yF, rotateY: rF, skewY: sF } : { y: 0, rotateY: 0, skewY: 0 }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg
                    width={FW}
                    height={FH}
                    viewBox={`0 0 ${FW} ${FH}`}
                    style={{ marginLeft: -(s * SW), display: 'block' }}
                  >
                    <rect width={FW} height={FH} fill="#006a4e" />
                    <circle cx="120" cy="84" r="40" fill="#f42a41" />
                  </svg>
                </motion.div>
              );
            })}

            {/* Fabric light/shadow overlay — depth illusion */}
            <div
              className="absolute inset-0 pointer-events-none rounded-sm"
              style={{
                background: `linear-gradient(90deg,
                  rgba(0,0,0,0.1) 0%,
                  transparent 8%,
                  rgba(255,255,255,0.07) 25%,
                  transparent 40%,
                  rgba(0,0,0,0.03) 60%,
                  rgba(255,255,255,0.05) 75%,
                  rgba(0,0,0,0.06) 90%,
                  rgba(0,0,0,0.1) 100%
                )`,
              }}
            />
          </div>
        );
      })()}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MODULE DATA
   ═══════════════════════════════════════════════════════════ */

const modules = [
  {
    icon: FileText,
    label: 'নাগরিক সেবা',
    en: 'Citizen Services',
    color: '#1A56DB',
    count: 19,
    details: [
      'জন্ম নিবন্ধন ও সনদপত্র',
      'ট্রেড লাইসেন্স আবেদন',
      'ওয়ারিশ সনদ ও প্রত্যয়ন',
      'স্ট্যাটাস ট্র্যাকিং ও SMS',
    ],
  },
  {
    icon: CreditCard,
    label: 'রাজস্ব ও পেমেন্ট',
    en: 'Revenue & Payment',
    color: '#10B981',
    count: 19,
    details: [
      'হোল্ডিং ট্যাক্স কালেকশন',
      'পানি বিল ম্যানেজমেন্ট',
      'অনলাইন পেমেন্ট গেটওয়ে',
      'রিয়েল-টাইম রেভেনিউ ড্যাশবোর্ড',
    ],
  },
  {
    icon: MessageSquare,
    label: 'অভিযোগ ব্যবস্থাপনা',
    en: 'Complaint Management',
    color: '#F59E0B',
    count: 16,
    details: [
      'অনলাইন অভিযোগ দাখিল',
      'অটো-অ্যাসাইনমেন্ট সিস্টেম',
      'ফটো ও লোকেশন অ্যাটাচমেন্ট',
      'রিয়েল-টাইম স্ট্যাটাস ট্র্যাকিং',
    ],
  },
  {
    icon: Bell,
    label: 'তথ্য ও যোগাযোগ',
    en: 'Communication',
    color: '#8B5CF6',
    count: 19,
    details: [
      'নোটিশ ও বিজ্ঞপ্তি প্রকাশ',
      'SMS ও পুশ নোটিফিকেশন',
      'ওয়ার্ডভিত্তিক তথ্য বিতরণ',
      'ইমার্জেন্সি অ্যালার্ট সিস্টেম',
    ],
  },
  {
    icon: Settings,
    label: 'প্রশাসন ও কর্মী',
    en: 'Admin & Staff',
    color: '#F97316',
    count: 24,
    details: [
      'কর্মী উপস্থিতি ও টাস্ক',
      'রোল-বেসড এক্সেস কন্ট্রোল',
      'কর্মক্ষমতা মূল্যায়ন',
      'ডিজিটাল ফাইল ম্যানেজমেন্ট',
    ],
  },
  {
    icon: BarChart3,
    label: 'বিশ্লেষণ ও রিপোর্ট',
    en: 'Analytics & Reports',
    color: '#06B6D4',
    count: 25,
    details: [
      'রিয়েল-টাইম ড্যাশবোর্ড',
      'কাস্টম রিপোর্ট জেনারেটর',
      'ওয়ার্ডভিত্তিক পারফরম্যান্স',
      'মেয়র ডিসিশন সাপোর্ট',
    ],
  },
];

/* ── Animation variants ── */
const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const cardVar = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════════════ */

export function SolutionContent({ active }: SlideProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative flex h-full w-full items-center justify-center pointer-events-auto px-10 md:px-16 lg:px-24 py-8">

      {/* ── Bangladesh Flags — full height both sides ── */}
      <BangladeshFlag side="left" active={active} />
      <BangladeshFlag side="right" active={active} />

      <motion.div
        className="w-full max-w-[1100px]"
        variants={containerVar}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        {/* ══════════════ BENTO GRID ══════════════ */}
        <div className="grid grid-cols-4 gap-4" style={{ overflow: 'visible' }}>

          {/* ── HERO CARD — col-span-2, row-span-2 ── */}
          <motion.div
            variants={cardVar}
            className="
              col-span-2 row-span-2
              relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-[#1A56DB] via-[#1E3A8A] to-[#2563EB]
              p-8 md:p-9 flex flex-col justify-between
              shadow-2xl shadow-blue-600/25
            "
          >
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/[0.05]" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/[0.04]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/60 text-sm font-semibold tracking-[0.15em] uppercase">
                  আমাদের সমাধান
                </span>
              </div>

              <h2 className="text-[44px] md:text-[52px] font-extrabold text-white font-bangla leading-[1.08] mb-4">
                এক প্ল্যাটফর্মে
                <br />
                <span className="text-white/85">সব সেবা</span>
              </h2>

              <p className="text-white/45 text-base leading-relaxed max-w-[320px] font-bangla">
                পৌরসভার সব সেবা এক ছাদের নিচে — নাগরিক সেবা, রাজস্ব,
                অভিযোগ, এবং বিশ্লেষণ একটি প্ল্যাটফর্মে।
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-7 pt-5 mt-5 border-t border-white/10">
              {[
                { val: '158+', lab: 'ফিচার' },
                { val: '7',    lab: 'মডিউল' },
                { val: '4',    lab: 'ইউজার রোল' },
                { val: '36',   lab: 'টেকনিক্যাল' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-extrabold text-white leading-none">{s.val}</div>
                  <div className="text-xs text-white/35 font-bold tracking-wider mt-1 font-bangla">
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── MODULE CARDS — right 2×2 (expand in-place on hover) ── */}
          {modules.slice(0, 4).map((m, i) => {
            const Icon = m.icon;
            const isOpen = hovered === i;
            return (
              <motion.div
                key={i}
                variants={cardVar}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  scale: isOpen ? 1.35 : 1,
                  zIndex: isOpen ? 60 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className={`
                  origin-center rounded-2xl p-5
                  backdrop-blur-xl cursor-pointer
                  border flex flex-col
                  ${isOpen
                    ? 'bg-white dark:bg-[#1E293B] border-gray-300/80 dark:border-white/15 shadow-2xl shadow-black/15 dark:shadow-blue-900/30'
                    : 'bg-white/85 dark:bg-white/[0.07] border-gray-200/70 dark:border-white/[0.08] shadow-sm dark:shadow-none'
                  }
                `}
              >
                {/* Icon + title row */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.color + '15' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: m.color }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-gray-900 dark:text-white font-bangla text-lg leading-tight">
                      {m.label}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                      {m.en}
                    </p>
                  </div>
                </div>

                {/* Expanded detail features — slides open on hover */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t space-y-2"
                        style={{ borderColor: m.color + '25' }}
                      >
                        {m.details.map((d, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: m.color }}
                            />
                            <span className="text-[11px] text-gray-700 dark:text-gray-300 font-bangla font-medium leading-snug">
                              {d}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ color: m.color, backgroundColor: m.color + '12' }}
                  >
                    {m.count} features
                  </span>
                  {!isOpen && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">
                      hover →
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* ── BOTTOM ROW — 2 wide cards (also expand in-place) ── */}
          {modules.slice(4, 6).map((m, i) => {
            const Icon = m.icon;
            const idx = i + 4;
            const isOpen = hovered === idx;
            return (
              <motion.div
                key={idx}
                variants={cardVar}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  scale: isOpen ? 1.25 : 1,
                  zIndex: isOpen ? 60 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className={`
                  col-span-2 origin-center rounded-2xl px-6 py-5
                  backdrop-blur-xl cursor-pointer
                  border flex flex-col gap-3
                  ${isOpen
                    ? 'bg-white dark:bg-[#1E293B] border-gray-300/80 dark:border-white/15 shadow-2xl shadow-black/15 dark:shadow-blue-900/30'
                    : 'bg-white/85 dark:bg-white/[0.07] border-gray-200/70 dark:border-white/[0.08] shadow-sm dark:shadow-none'
                  }
                `}
              >
                {/* Top row */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: m.color + '15' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: m.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-gray-900 dark:text-white font-bangla text-lg leading-snug">
                      {m.label}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                      {m.en}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                    style={{ color: m.color, backgroundColor: m.color + '12' }}
                  >
                    {m.count} features
                  </span>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 border-t grid grid-cols-2 gap-x-4 gap-y-1.5"
                        style={{ borderColor: m.color + '25' }}
                      >
                        {m.details.map((d, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: m.color }}
                            />
                            <span className="text-[11px] text-gray-700 dark:text-gray-300 font-bangla font-medium leading-snug">
                              {d}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Tech footer ── */}
        <motion.div
          variants={cardVar}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <Cpu className="w-4 h-4 text-[#1A56DB]/60" />
          <span className="text-sm text-gray-500 dark:text-gray-400 tracking-wide font-medium">
            SaaS Architecture · Role-Based Access · Mobile Ready · REST API · Encryption
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

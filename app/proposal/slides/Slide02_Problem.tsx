'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  User,
  FileText,
  Banknote,
  AlertTriangle,
  Megaphone,
  Users,
  BarChart3,
  Wifi,
  WifiOff,
  X,
  Clock,
  Building2,
  Receipt,
  BookOpen,
  MessageSquareOff,
  ShieldX,
  Monitor,
  PieChart,
  TrendingDown,
  UserX,
  ClipboardX,
  ServerOff,
  Landmark,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   BANGLADESH FLAG — vertical strip wave
   ═══════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════
   3D SCENE — Ultra subtle
   ═══════════════════════════════════════════════════ */

interface SlideProps { active: boolean }

export function ProblemScene({ active }: SlideProps) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (!active || !ref.current) return;
    ref.current.rotation.z = s.clock.getElapsedTime() * 0.04;
  });
  if (!active) return null;
  return (
    <group position={[0, 0, -2]}>
      <mesh ref={ref}>
        <torusGeometry args={[3.2, 0.006, 16, 120]} />
        <meshBasicMaterial color="#DC2626" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   FLAT ILLUSTRATIONS — CSS-based, clean, scalable
   ═══════════════════════════════════════════════════ */

function IllustrationQueue() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Government building counter */}
      <div className="absolute right-3 top-3 bottom-3 w-[72px] rounded-xl bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border-2 border-red-200/60 dark:border-red-800/40 flex flex-col items-center justify-center gap-1">
        <Landmark className="w-7 h-7 text-red-300 dark:text-red-600" />
        <div className="w-10 h-[3px] bg-red-200 dark:bg-red-700 rounded" />
        <div className="w-7 h-[3px] bg-red-200 dark:bg-red-700 rounded" />
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Queue of waiting people */}
      <div className="flex items-end gap-[6px] mr-16">
        {[0, 1, 2, 3, 4].map((i) => {
          const size = 28 - i * 3;
          return (
            <div key={i} className="flex flex-col items-center" style={{ opacity: 1 - i * 0.12 }}>
              <div
                className="rounded-full bg-gradient-to-b from-red-300 to-red-400 dark:from-red-400 dark:to-red-500 shadow-sm"
                style={{ width: size * 0.7, height: size * 0.7 }}
              />
              <div
                className="rounded-lg bg-gradient-to-b from-red-200 to-red-300 dark:from-red-300/50 dark:to-red-400/50 mt-[2px] shadow-sm"
                style={{ width: size * 0.6, height: size * 0.85 }}
              />
            </div>
          );
        })}
      </div>

      {/* Waiting clock */}
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500/10 dark:bg-red-500/20 rounded-full px-2 py-1">
        <Clock className="w-4 h-4 text-red-400" />
        <span className="text-[9px] font-bold text-red-400">∞</span>
      </div>

      {/* Dotted queue line */}
      <div className="absolute bottom-4 left-4 right-20 border-b-2 border-dashed border-red-300/40 dark:border-red-500/30" />
    </div>
  );
}

function IllustrationMoney() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Big ledger book */}
      <div className="relative">
        <div className="w-[68px] h-[80px] rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 border-2 border-amber-300/60 dark:border-amber-700/40 shadow-md flex flex-col items-center justify-center p-2">
          <BookOpen className="w-8 h-8 text-amber-400 dark:text-amber-500 mb-1" />
          {/* Ledger lines */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-full flex gap-1 mb-[2px]">
              <div className="flex-1 h-[2px] bg-amber-300/50 dark:bg-amber-600/40 rounded" />
              <div className="w-4 h-[2px] bg-amber-300/50 dark:bg-amber-600/40 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Paper receipts scattered */}
      <div className="absolute top-2 right-3">
        <div className="w-10 h-12 bg-white dark:bg-gray-600 rounded shadow border border-gray-200 dark:border-gray-500 rotate-6 flex flex-col items-center justify-center p-1">
          <Receipt className="w-5 h-5 text-gray-300 dark:text-gray-500" />
          <div className="w-6 h-[2px] bg-gray-200 dark:bg-gray-500 rounded mt-1" />
        </div>
      </div>

      {/* Cash/Taka symbols */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1">
        <Banknote className="w-8 h-8 text-amber-400/60" />
        <div className="flex flex-col">
          {[0, 1].map((i) => (
            <span key={i} className="text-amber-500 font-bold text-sm leading-none" style={{ opacity: 0.5 - i * 0.15 }}>৳</span>
          ))}
        </div>
      </div>

      {/* Red warning: revenue loss */}
      <div className="absolute top-1 left-2 flex items-center gap-1 bg-red-500/10 dark:bg-red-500/20 rounded-full px-2 py-0.5">
        <TrendingDown className="w-3.5 h-3.5 text-red-400" />
        <span className="text-[8px] font-bold text-red-400">Loss</span>
      </div>
    </div>
  );
}

function IllustrationComplaint() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Frustrated citizen */}
      <div className="flex flex-col items-center mr-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-b from-red-200 to-red-300 dark:from-red-400/40 dark:to-red-500/40 flex items-center justify-center shadow-sm">
          <span className="text-lg">😤</span>
        </div>
        <div className="w-9 h-12 rounded-lg bg-gradient-to-b from-red-100 to-red-200 dark:from-red-300/30 dark:to-red-400/30 mt-[2px] shadow-sm" />
        {/* Speech bubble */}
        <div className="absolute top-1 left-[52px] bg-white dark:bg-gray-700 rounded-lg px-2 py-1 shadow border border-gray-200 dark:border-gray-600">
          <Megaphone className="w-4 h-4 text-red-400" />
          <div className="absolute -bottom-1 left-2 w-2 h-2 bg-white dark:bg-gray-700 border-b border-r border-gray-200 dark:border-gray-600 rotate-45" />
        </div>
      </div>

      {/* Broken pathway */}
      <div className="flex flex-col items-center mx-2 gap-1">
        <div className="w-12 border-t-[3px] border-dashed border-gray-300 dark:border-gray-600" />
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <ShieldX className="w-5 h-5 text-red-400" />
        </div>
        <div className="w-12 border-t-[3px] border-dashed border-gray-300 dark:border-gray-600" />
      </div>

      {/* Closed complaint box */}
      <div className="w-[60px] h-[70px] rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center shadow-inner">
        <MessageSquareOff className="w-7 h-7 text-gray-300 dark:text-gray-500" />
        <span className="text-[8px] text-gray-400 font-bold font-bangla mt-1">বন্ধ</span>
      </div>
    </div>
  );
}

function IllustrationInfo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Large notice board */}
      <div className="w-[120px] h-[86px] rounded-xl bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-2 border-blue-200/60 dark:border-blue-800/40 flex flex-col items-center relative shadow-inner">
        {/* Board header */}
        <div className="absolute -top-[10px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-md px-4 py-[3px] text-[8px] text-white font-bold font-bangla shadow">
          নোটিশ বোর্ড
        </div>

        {/* Empty pins on board */}
        <div className="flex justify-between w-full px-3 mt-5">
          <div className="w-3 h-3 rounded-full bg-red-300 dark:bg-red-500 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-500 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-300 dark:bg-green-500 shadow-sm" />
        </div>

        {/* Empty content lines */}
        <div className="flex flex-col gap-1.5 mt-3 w-full px-3">
          <div className="w-full h-[3px] bg-gray-200/60 dark:bg-gray-600/40 rounded" />
          <div className="w-3/4 h-[3px] bg-gray-200/60 dark:bg-gray-600/40 rounded" />
          <div className="w-1/2 h-[3px] bg-gray-200/60 dark:bg-gray-600/40 rounded" />
        </div>

        {/* "Empty" watermark */}
        <span className="absolute bottom-2 text-gray-300 dark:text-gray-600 text-[10px] font-bold font-bangla">খালি</span>
      </div>

      {/* Floating question marks */}
      <span className="absolute top-1 left-2 text-blue-400 opacity-50 text-xl font-extrabold">?</span>
      <span className="absolute bottom-2 right-2 text-blue-400 opacity-35 text-lg font-extrabold">?</span>
      <span className="absolute top-3 right-2 text-blue-400 opacity-25 text-base font-extrabold">?</span>
    </div>
  );
}

function IllustrationAdmin() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Office desk with monitor */}
      <div className="relative flex flex-col items-center">
        {/* Monitor */}
        <div className="w-[52px] h-[36px] rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-md border border-gray-600">
          <div className="w-[40px] h-[24px] rounded bg-gray-600 dark:bg-gray-700 flex items-center justify-center">
            <Monitor className="w-5 h-5 text-gray-500/50" />
          </div>
        </div>
        {/* Monitor stand */}
        <div className="w-3 h-2 bg-gray-400 dark:bg-gray-600" />
        <div className="w-8 h-[3px] bg-gray-400 dark:bg-gray-600 rounded" />
        {/* Desk surface */}
        <div className="w-[100px] h-[6px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-t mt-1 shadow" />
        {/* Desk legs */}
        <div className="flex justify-between w-[90px]">
          <div className="w-[3px] h-5 bg-gray-300 dark:bg-gray-600" />
          <div className="w-[3px] h-5 bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>

      {/* Ghost absent person (dashed outline) */}
      <div className="absolute top-2 left-3 flex flex-col items-center opacity-60">
        <div className="w-10 h-10 rounded-full border-[2.5px] border-dashed border-purple-300 dark:border-purple-500 flex items-center justify-center">
          <UserX className="w-5 h-5 text-purple-300 dark:text-purple-500" />
        </div>
        <div className="w-7 h-5 border-[2.5px] border-dashed border-purple-300 dark:border-purple-500 rounded-lg mx-auto mt-[2px]" />
      </div>

      {/* Zzz sleeping */}
      <div className="absolute top-1 right-3 flex flex-col items-start text-purple-400 font-extrabold">
        <span className="text-sm opacity-60">Z</span>
        <span className="text-xs -mt-0.5 ml-1.5 opacity-45">z</span>
        <span className="text-[10px] -mt-0.5 ml-3 opacity-30">z</span>
      </div>

      {/* Scattered papers */}
      <div className="absolute bottom-2 right-3">
        <ClipboardX className="w-5 h-5 text-purple-300/50 dark:text-purple-500/50 rotate-12" />
      </div>
    </div>
  );
}

function IllustrationAnalytics() {
  return (
    <div className="relative w-full h-full flex items-center justify-center gap-4 overflow-hidden">
      {/* Empty bar chart */}
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-[5px] h-[60px]">
          {[45, 60, 35, 55, 40].map((h, i) => (
            <div
              key={i}
              className="w-[10px] rounded-t-sm bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* X axis */}
        <div className="w-[70px] h-[2px] bg-gray-300 dark:bg-gray-600 rounded mt-[2px]" />
      </div>

      {/* Empty pie chart */}
      <div className="relative">
        <div className="w-[52px] h-[52px] rounded-full border-[4px] border-dashed border-gray-200 dark:border-gray-600 flex items-center justify-center">
          <PieChart className="w-6 h-6 text-gray-300 dark:text-gray-500" />
        </div>
        {/* Question overlay */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center">
          <span className="text-cyan-500 text-xs font-extrabold">?</span>
        </div>
      </div>

      {/* No data badge */}
      <div className="absolute bottom-2 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full px-3 py-0.5">
        <span className="text-[9px] font-bold text-cyan-500 font-bangla">ডেটা নেই</span>
      </div>

      {/* Flat line trending */}
      <div className="absolute top-3 right-3">
        <BarChart3 className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      </div>
    </div>
  );
}

function IllustrationPlatform() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Old CRT-style monitor */}
      <div className="relative flex flex-col items-center">
        <div className="w-[76px] h-[54px] rounded-xl bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 border-[3px] border-gray-300 dark:border-gray-500 flex items-center justify-center shadow-md">
          <div className="w-[56px] h-[36px] rounded-md bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
            {/* Error screen */}
            <div className="flex flex-col items-center">
              <ServerOff className="w-5 h-5 text-red-400/70" />
              <div className="w-8 h-[2px] bg-red-400/30 rounded mt-1" />
            </div>
          </div>
        </div>
        {/* Monitor stand */}
        <div className="w-5 h-[6px] bg-gray-300 dark:bg-gray-600" />
        <div className="w-14 h-[4px] bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      {/* Wifi off badge */}
      <div className="absolute top-2 right-3 flex items-center gap-1 bg-orange-500/10 dark:bg-orange-500/20 rounded-full px-2 py-0.5">
        <WifiOff className="w-4 h-4 text-orange-400" />
      </div>

      {/* Disconnected cable */}
      <div className="absolute bottom-3 left-3">
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
          <path d="M2 10 Q10 10 15 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-300 dark:text-gray-600" />
          <path d="M25 12 Q30 10 38 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-gray-300 dark:text-gray-600" />
          <circle cx="20" cy="10" r="3" className="fill-red-400/50" />
        </svg>
      </div>

      {/* Red X overlay */}
      <div className="absolute top-2 left-3">
        <X className="w-5 h-5 text-red-400 opacity-50" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROBLEM DATA
   ═══════════════════════════════════════════════════ */

const problems = [
  {
    bangla: 'নাগরিক সেবা ডিজিটাল নয়',
    english: 'Citizen Services',
    color: '#DC2626',
    illustration: <IllustrationQueue />,
  },
  {
    bangla: 'রাজস্ব ও পেমেন্ট ম্যানুয়াল',
    english: 'Revenue & Payment',
    color: '#F59E0B',
    illustration: <IllustrationMoney />,
  },
  {
    bangla: 'অভিযোগ ব্যবস্থাপনা নেই',
    english: 'Complaint Management',
    color: '#EF4444',
    illustration: <IllustrationComplaint />,
  },
  {
    bangla: 'তথ্য ও যোগাযোগে ঘাটতি',
    english: 'Information & Communication',
    color: '#3B82F6',
    illustration: <IllustrationInfo />,
  },
  {
    bangla: 'কর্মকর্তা ব্যবস্থাপনা নেই',
    english: 'Admin & Staff Management',
    color: '#8B5CF6',
    illustration: <IllustrationAdmin />,
  },
  {
    bangla: 'কোনো রিপোর্ট বা বিশ্লেষণ নেই',
    english: 'Analytics & Reporting',
    color: '#06B6D4',
    illustration: <IllustrationAnalytics />,
  },
  {
    bangla: 'কোনো ডিজিটাল প্ল্যাটফর্ম নেই',
    english: 'Digital Platform',
    color: '#F97316',
    illustration: <IllustrationPlatform />,
  },
];

/* ═══════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* ═══════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════ */

export function ProblemContent({ active }: SlideProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 md:px-10 pointer-events-auto">

      <BangladeshFlag side="left" active={active} />
      <BangladeshFlag side="right" active={active} />

      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="inline-flex items-center gap-2.5 bg-red-500/10 dark:bg-red-500/15 rounded-full px-5 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-600 dark:text-red-400 text-sm font-bold tracking-widest uppercase">
            সমস্যা চিহ্নিতকরণ
          </span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white font-bangla leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          পৌরসভায় এখন{' '}
          <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
            যা নেই
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-400 dark:text-gray-500 text-lg mt-2"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          What&apos;s Missing in the Current Pourashava System
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="w-full max-w-7xl"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        {/* Row 1 — 4 cards */}
        <div className="grid grid-cols-4 gap-5 mb-5">
          {problems.slice(0, 4).map((p, i) => (
            <ProblemCard key={i} problem={p} />
          ))}
        </div>
        {/* Row 2 — 3 cards centered */}
        <div className="flex justify-center gap-5">
          {problems.slice(4, 7).map((p, i) => (
            <div key={i + 4} className="w-[calc(25%-15px)]">
              <ProblemCard problem={p} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="mt-6 flex items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500/50" />
        <p className="text-base text-gray-500 dark:text-gray-400 font-bangla">
          মোট <span className="font-extrabold text-2xl text-red-500 mx-1">১৫৮টি</span> সমস্যার ডিজিটাল সমাধান আমরা প্রস্তাব করছি
        </p>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-500/50" />
      </motion.div>
    </div>
  );
}

/* ── Card — scales up on hover, slides back on leave ── */
function ProblemCard({ problem: p }: { problem: (typeof problems)[number] }) {
  return (
    <motion.div
      variants={cardAnim}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        scale: 1.35,
        y: -20,
        zIndex: 50,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
      }}
      className="
        relative cursor-pointer
        bg-white/90 dark:bg-[#1E293B]/80
        backdrop-blur-md
        border border-gray-200/60 dark:border-white/[0.06]
        rounded-2xl overflow-hidden
        shadow-sm
        hover:shadow-2xl hover:shadow-black/15 dark:hover:shadow-black/40
      "
    >
      {/* Top accent */}
      <div className="h-1" style={{ backgroundColor: p.color }} />

      {/* Illustration */}
      <div className="h-32 mx-3 mt-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/40 overflow-hidden">
        {p.illustration}
      </div>

      {/* Title */}
      <div className="px-5 pb-5 pt-3">
        <h3 className="font-extrabold text-gray-900 dark:text-white font-bangla text-base leading-snug mb-1.5">
          {p.bangla}
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold tracking-wider uppercase">
          {p.english}
        </p>
      </div>
    </motion.div>
  );
}

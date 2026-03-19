"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import Link from "next/link";

// Dynamic import Canvas (no SSR)
const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

// Dynamic import Three.js components
const ParticleField = dynamic(() => import("@/components/three/ParticleField"), { ssr: false });
const WaveBackground = dynamic(() => import("@/components/three/WaveBackground"), { ssr: false });

// Dynamic import slide scenes
const TitleScene = dynamic(() => import("./slides/Slide01_Title").then((m) => ({ default: m.TitleScene })), { ssr: false });
const ProblemScene = dynamic(() => import("./slides/Slide02_Problem").then((m) => ({ default: m.ProblemScene })), { ssr: false });
const SolutionScene = dynamic(() => import("./slides/Slide03_Solution").then((m) => ({ default: m.SolutionScene })), { ssr: false });
const PilotScaleScene = dynamic(() => import("./slides/Slide05_PilotScale").then((m) => ({ default: m.PilotScaleScene })), { ssr: false });
const ClosingScene = dynamic(() => import("./slides/Slide10_Closing").then((m) => ({ default: m.ClosingScene })), { ssr: false });

// Dynamic import slide content
const TitleContent = dynamic(() => import("./slides/Slide01_Title").then((m) => ({ default: m.TitleContent })), { ssr: false });
const ProblemContent = dynamic(() => import("./slides/Slide02_Problem").then((m) => ({ default: m.ProblemContent })), { ssr: false });
const SolutionContent = dynamic(() => import("./slides/Slide03_Solution").then((m) => ({ default: m.SolutionContent })), { ssr: false });
const PilotScaleContent = dynamic(() => import("./slides/Slide05_PilotScale").then((m) => ({ default: m.PilotScaleContent })), { ssr: false });
const ClosingContent = dynamic(() => import("./slides/Slide10_Closing").then((m) => ({ default: m.ClosingContent })), { ssr: false });

const TOTAL_SLIDES = 5;

// Slide transition variants
const slideVariants = {
  enter: { opacity: 0, scale: 1.05, filter: "blur(4px)" },
  center: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
};

// Loading screen
function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F0F7FF] dark:bg-[#0F172A]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A56DB] to-[#3B82F6] flex items-center justify-center animate-pulse">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18M9 8h1M14 8h1M9 12h1M14 12h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading PouraSeva...</p>
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#1A56DB] to-[#3B82F6] rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  const { theme, toggleTheme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [direction, setDirection] = useState(0);

  const isDark = theme === "dark";

  useEffect(() => {
    // Give Three.js time to initialize
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const goTo = useCallback(
    (n: number) => {
      if (n >= 0 && n < TOTAL_SLIDES && n !== current) {
        setDirection(n > current ? 1 : -1);
        setCurrent(n);
      }
    },
    [current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const goFullScreen = () => {
    document.documentElement.requestFullscreen?.();
  };

  // Scene components array (5 slides)
  const scenes = [
    TitleScene,
    ProblemScene,
    SolutionScene,
    PilotScaleScene,
    ClosingScene,
  ];

  // Content components array (5 slides)
  const contents = [
    TitleContent,
    ProblemContent,
    SolutionContent,
    PilotScaleContent,
    ClosingContent,
  ];

  const CurrentScene = scenes[current];
  const CurrentContent = contents[current];

  return (
    <div className={`relative w-screen h-screen overflow-hidden select-none ${isDark ? "bg-[#0F172A]" : "bg-[#F0F7FF]"}`}>
      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Three.js Background Canvas — always visible */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />

            {/* Global background effects */}
            <ParticleField />
            <WaveBackground />

            {/* Slide-specific 3D content */}
            <Suspense fallback={null}>
              {CurrentScene && <CurrentScene active={true} />}
            </Suspense>
          </Canvas>
        </Suspense>
      </div>

      {/* Progress Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 z-30 ${isDark ? "bg-white/5" : "bg-black/5"}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-[#1A56DB] to-[#3B82F6]"
          animate={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
        <Link
          href="/mobile"
          title="Home"
          className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/10 hover:bg-white/15 text-gray-400" : "bg-black/5 hover:bg-black/10 text-gray-500"}`}
        >
          <Home className="w-4 h-4" />
        </Link>
        <span className={`text-sm tabular-nums ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {current + 1} / {TOTAL_SLIDES}
        </span>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/10 hover:bg-white/15 text-yellow-400" : "bg-black/5 hover:bg-black/10 text-gray-600"}`}
          title={isDark ? "Light Mode" : "Dark Mode"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={goFullScreen}
          className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/10 hover:bg-white/15 text-gray-400" : "bg-black/5 hover:bg-black/10 text-gray-500"}`}
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* HTML Content Overlay — pointer-events-none so mouse reaches Canvas for orbit */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Suspense fallback={null}>
              {CurrentContent && <CurrentContent active={true} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {current > 0 && (
        <motion.button
          onClick={prev}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              : "bg-white/80 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}
      {current < TOTAL_SLIDES - 1 && (
        <motion.button
          onClick={next}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              : "bg-white/80 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      )}

      {/* Dot Indicators */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-[#1A56DB] shadow-lg shadow-blue-500/30"
                : `w-2.5 h-2.5 ${isDark ? "bg-white/20 hover:bg-white/40" : "bg-black/15 hover:bg-black/30"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import MobileFrame from "@/components/mobile-frame";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function SplashPage() {
  return (
    <MobileFrame>
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), 0 0 60px rgba(37, 99, 235, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(37, 99, 235, 0.5), 0 0 80px rgba(37, 99, 235, 0.2);
          }
        }
      `}</style>

      <div className="relative h-full flex flex-col items-center justify-center bg-[#F0F7FF] dark:bg-[#0F172A] overflow-hidden">
        {/* Floating Particles */}
        <div className="particle" style={{ position: "absolute", top: "10%", left: "15%", width: "4px", height: "4px" }} />
        <div className="particle" style={{ position: "absolute", top: "20%", right: "20%", width: "3px", height: "3px" }} />
        <div className="particle" style={{ position: "absolute", top: "40%", left: "10%", width: "5px", height: "5px" }} />
        <div className="particle" style={{ position: "absolute", top: "60%", right: "15%", width: "4px", height: "4px" }} />
        <div className="particle" style={{ position: "absolute", top: "75%", left: "25%", width: "3px", height: "3px" }} />
        <div className="particle" style={{ position: "absolute", top: "30%", right: "30%", width: "6px", height: "6px" }} />
        <div className="particle" style={{ position: "absolute", top: "85%", left: "60%", width: "4px", height: "4px" }} />
        <div className="particle" style={{ position: "absolute", top: "50%", right: "40%", width: "3px", height: "3px" }} />

        {/* Logo */}
        <div
          className="flex flex-col items-center gap-6"
          style={{
            animation: "fadeInScale 1.2s ease-out forwards",
          }}
        >
          <div
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center"
            style={{
              animation: "float 3s ease-in-out infinite, pulseGlow 2s ease-in-out infinite",
            }}
          >
            <Shield className="w-14 h-14 text-white" />
          </div>

          {/* App Name */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-electric-blue via-sky-blue to-light-blue bg-clip-text text-transparent">
            PouraSeva
          </h1>

          {/* Tagline */}
          <p className="text-gray-500 dark:text-gray-400 font-bangla text-base">
            আপনার পৌরসভা, আপনার হাতে
          </p>
        </div>

        {/* Start Button */}
        <div className="absolute bottom-12 left-0 right-0 px-8">
          <Link href="/mobile/citizen/onboarding">
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-lg transition-all hover:opacity-90 active:scale-95">
              শুরু করুন
            </button>
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}

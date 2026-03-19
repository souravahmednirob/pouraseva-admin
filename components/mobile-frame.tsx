"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A] flex items-center justify-center p-4 relative">
      {/* Theme toggle + Home button floating outside phone frame */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <Link
          href="/mobile"
          title="Home"
          className="w-9 h-9 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md"
        >
          <Home className="w-4 h-4" />
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative w-[430px] h-[932px] rounded-[48px] border-2 border-gray-200 dark:border-white/20 overflow-hidden shadow-2xl shadow-blue-500/20 bg-white dark:bg-[#0F172A]">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-9 pt-4 pb-1.5 bg-white dark:bg-[#0F172A] z-50 relative">
          <span className="text-sm text-gray-600 dark:text-white font-semibold">9:41</span>
          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-[34px] bg-black rounded-full" />
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-3.5 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-4 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-4.5 bg-gray-600 dark:bg-white rounded-full" />
            </div>
            <svg className="w-4.5 h-4.5 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <div className="w-7 h-3.5 border border-gray-600 dark:border-white rounded-sm relative">
              <div className="absolute inset-0.5 bg-success rounded-sm" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

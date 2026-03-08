"use client";

import { ReactNode } from "react";
import ThemeToggle from "./theme-toggle";

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A] flex items-center justify-center p-4 relative">
      {/* Theme toggle floating outside phone frame */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative w-[375px] h-[812px] rounded-[40px] border-2 border-gray-200 dark:border-white/20 overflow-hidden shadow-2xl shadow-blue-500/20 bg-white dark:bg-[#0F172A]">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-8 pt-3 pb-1 bg-white dark:bg-[#0F172A] z-50 relative">
          <span className="text-xs text-gray-600 dark:text-white font-medium">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div className="w-1 h-2.5 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-3 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-3.5 bg-gray-600 dark:bg-white rounded-full" />
              <div className="w-1 h-4 bg-gray-600 dark:bg-white rounded-full" />
            </div>
            <svg className="w-4 h-4 text-gray-600 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <div className="w-6 h-3 border border-gray-600 dark:border-white rounded-sm relative">
              <div className="absolute inset-0.5 bg-success rounded-sm" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-[calc(100%-28px)] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

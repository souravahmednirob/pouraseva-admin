"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { MapPin, LogOut, CheckCircle, XCircle } from "lucide-react";

const dayLabels = ["শনি", "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র"];

// Calendar heatmap mock: 0=absent(red), 1=present(green), 2=half(yellow), 3=holiday/future(gray)
const calendarData = [
  [3, 1, 1, 1, 1, 1, 3], // Week 1
  [3, 1, 1, 0, 1, 1, 3], // Week 2
  [3, 1, 1, 1, 2, 1, 3], // Week 3
  [3, 1, 0, 1, 1, 1, 3], // Week 4
  [3, 1, 1, 1, 3, 3, 3], // Week 5 (partial)
];

const cellColors: Record<number, string> = {
  0: "bg-bloody-red",
  1: "bg-success",
  2: "bg-warning",
  3: "bg-gray-200 dark:bg-gray-700/30",
};

const weekDays = [
  { day: "রবি", present: true },
  { day: "সোম", present: true },
  { day: "মঙ্গল", present: true },
  { day: "বুধ", present: false },
  { day: "বৃহ", present: true },
];

export default function StaffAttendancePage() {
  const [checkedIn, setCheckedIn] = useState(true);

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-5 font-bangla">
        <h1 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">হাজিরা</h1>

        {/* Today's Status */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-bangla">আজকের অবস্থা</span>
            {checkedIn ? (
              <span className="text-sm px-3 py-1 rounded-full bg-green-50 dark:bg-success/20 text-green-700 dark:text-success font-bangla">
                উপস্থিত
              </span>
            ) : (
              <span className="text-sm px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bangla">
                অনুপস্থিত
              </span>
            )}
          </div>
          {checkedIn && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-bangla">চেক-ইন:</span>
                <span className="text-gray-900 dark:text-white font-bangla">সকাল ৯:০০</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3" />
                <span className="font-bangla">পৌরসভা কার্যালয়, ওয়ার্ড ৫</span>
              </div>
              <button
                onClick={() => setCheckedIn(false)}
                className="w-full border border-bloody-red text-bloody-red py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bangla"
              >
                <LogOut className="w-4 h-4" />
                চেক-আউট
              </button>
            </>
          )}
        </div>

        {/* Monthly Calendar Heatmap */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-3">মার্চ ২০২৬</h2>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {dayLabels.map((d) => (
              <div key={d} className="text-center text-gray-500 dark:text-gray-400 text-[10px] font-bangla">{d}</div>
            ))}
          </div>
          {/* Calendar cells */}
          <div className="space-y-1.5">
            {calendarData.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1.5">
                {week.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`aspect-square rounded-md ${cellColors[cell]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-success" />
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla">উপস্থিত</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-bloody-red" />
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla">অনুপস্থিত</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-warning" />
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla">অর্ধদিন</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700/30" />
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla">ছুটি</span>
            </div>
          </div>
        </div>

        {/* This Week Summary */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-3">এই সপ্তাহ</h2>
          <div className="flex justify-between">
            {weekDays.map((wd) => (
              <div key={wd.day} className="flex flex-col items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla">{wd.day}</span>
                {wd.present ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <XCircle className="w-6 h-6 text-bloody-red" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Work Hours */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <p className="text-gray-900 dark:text-white text-sm font-bangla mb-2">এই সপ্তাহে ৩৮ ঘণ্টা কাজ করেছেন</p>
          <div className="w-full bg-gray-100 dark:bg-[#0F172A] rounded-full h-2.5">
            <div className="bg-electric-blue h-2.5 rounded-full" style={{ width: "95%" }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-electric-blue text-xs font-bold">৩৮ ঘণ্টা</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla">লক্ষ্য: ৪০ ঘণ্টা</span>
          </div>
        </div>
      </div>

      <BottomNav role="staff" />
    </MobileFrame>
  );
}

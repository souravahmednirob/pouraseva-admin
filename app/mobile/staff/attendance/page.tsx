"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import { MapPin, LogOut, CheckCircle2, XCircle, ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";

const dayLabels = ["শনি", "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র"];
const dayLabelsEn = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

// 0=absent, 1=present, 2=half-day, 3=holiday/future
const calendarData = [
  [3, 1, 1, 1, 1, 1, 3],
  [3, 1, 1, 0, 1, 1, 3],
  [3, 1, 1, 1, 2, 1, 3],
  [3, 1, 0, 1, 1, 1, 3],
  [3, 1, 1, 1, 3, 3, 3],
];

const cellColors: Record<number, string> = {
  0: "bg-red-400",
  1: "bg-emerald-400",
  2: "bg-amber-400",
  3: "bg-gray-200 dark:bg-gray-700/30",
};

const weekDays = [
  { day: "রবি", dayEn: "Sun", present: true },
  { day: "সোম", dayEn: "Mon", present: true },
  { day: "মঙ্গল", dayEn: "Tue", present: true },
  { day: "বুধ", dayEn: "Wed", present: false },
  { day: "বৃহ", dayEn: "Thu", present: true },
];

export default function StaffAttendancePage() {
  const { t } = useLang();

  const presentDays = calendarData.flat().filter(c => c === 1).length;
  const absentDays = calendarData.flat().filter(c => c === 0).length;
  const halfDays = calendarData.flat().filter(c => c === 2).length;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/mobile/staff/dashboard" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">{t("হাজিরা", "Attendance")}</h1>
                <p className="text-amber-100 text-xs font-bangla">{t("মার্চ ২০২৬", "March 2026")}</p>
              </div>
            </div>

            {/* Summary Pills */}
            <div className="flex gap-2">
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{presentDays}</p>
                <p className="text-amber-100 text-[9px] font-bangla">{t("উপস্থিত", "Present")}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{absentDays}</p>
                <p className="text-amber-100 text-[9px] font-bangla">{t("অনুপস্থিত", "Absent")}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{halfDays}</p>
                <p className="text-amber-100 text-[9px] font-bangla">{t("অর্ধদিন", "Half Day")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4">
          {/* Today's Status */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("আজকের অবস্থা", "Today's Status")}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bangla font-bold">
                {t("উপস্থিত", "Present")}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("চেক-ইন", "Check-in")}:</span>
                <span className="text-gray-900 dark:text-white font-bangla font-medium">{t("সকাল ৯:০০", "9:00 AM")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-bangla">{t("পৌরসভা কার্যালয়, ওয়ার্ড ৫", "Municipality Office, Ward 5")}</span>
              </div>
            </div>
          </div>

          {/* Monthly Calendar Heatmap */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" /> {t("মার্চ ২০২৬", "March 2026")}
            </h2>
            <div className="grid grid-cols-7 gap-1.5 mb-1.5">
              {dayLabels.map((d, i) => (
                <div key={d} className="text-center text-gray-400 text-[10px] font-bangla">{t(d, dayLabelsEn[i])}</div>
              ))}
            </div>
            <div className="space-y-1.5">
              {calendarData.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1.5">
                  {week.map((cell, ci) => (
                    <div key={ci} className={`aspect-square rounded-lg ${cellColors[cell]}`} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-400" /><span className="text-gray-400 text-[10px] font-bangla">{t("উপস্থিত", "Present")}</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-400" /><span className="text-gray-400 text-[10px] font-bangla">{t("অনুপস্থিত", "Absent")}</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-400" /><span className="text-gray-400 text-[10px] font-bangla">{t("অর্ধদিন", "Half")}</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700/30" /><span className="text-gray-400 text-[10px] font-bangla">{t("ছুটি", "Off")}</span></div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-3">{t("এই সপ্তাহ", "This Week")}</h2>
            <div className="flex justify-between">
              {weekDays.map((wd) => (
                <div key={wd.day} className="flex flex-col items-center gap-1.5">
                  <span className="text-gray-400 text-[10px] font-bangla">{t(wd.day, wd.dayEn)}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${wd.present ? "bg-emerald-50 dark:bg-emerald-900/15" : "bg-red-50 dark:bg-red-900/15"}`}>
                    {wd.present ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Hours */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("সাপ্তাহিক কর্মঘণ্টা", "Weekly Hours")}</h3>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 95%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: "95%" }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">{t("৩৮ ঘণ্টা", "38 hours")}</span>
              <span className="text-[10px] text-gray-400 font-bangla">{t("লক্ষ্য: ৪০ ঘণ্টা", "Target: 40 hours")}</span>
            </div>
          </div>
        </div>

        <BottomNav role="staff" />
      </div>
    </MobileFrame>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  MapPin,
  AlertTriangle,
  ClipboardCheck,
  LogIn,
  LogOut,
  ChevronRight,
  Bell,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Navigation,
} from "lucide-react";

type Task = {
  id: number;
  category: string;
  categoryEn: string;
  address: string;
  addressEn: string;
  priority: "high" | "medium" | "normal";
  type: "complaint" | "inspection";
  time: string;
  timeEn: string;
};

const tasks: Task[] = [
  { id: 1, type: "complaint", category: "অভিযোগ - রাস্তা", categoryEn: "Complaint - Road", address: "৫/এ, মহল্লা রোড", addressEn: "5/A, Mohalla Road", priority: "high", time: "সকাল ৯:৩০", timeEn: "9:30 AM" },
  { id: 2, type: "complaint", category: "অভিযোগ - পানি", categoryEn: "Complaint - Water", address: "১২, বাজার রোড", addressEn: "12, Bazar Road", priority: "high", time: "সকাল ১০:০০", timeEn: "10:00 AM" },
  { id: 3, type: "inspection", category: "পরিদর্শন - ড্রেনেজ", categoryEn: "Inspection - Drainage", address: "৮, স্কুল রোড", addressEn: "8, School Road", priority: "medium", time: "দুপুর ১২:০০", timeEn: "12:00 PM" },
];

const priorityConfig: Record<string, { label: string; labelEn: string; bg: string; color: string; dot: string; stripe: string }> = {
  high: { label: "জরুরি", labelEn: "Urgent", bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400", dot: "bg-red-400", stripe: "bg-red-400" },
  medium: { label: "মাঝারি", labelEn: "Medium", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400", stripe: "bg-amber-400" },
  normal: { label: "সাধারণ", labelEn: "Normal", bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-400", stripe: "bg-blue-400" },
};

export default function StaffDashboardPage() {
  const { t } = useLang();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  const handleCheckIn = () => {
    setCheckingIn(true);
    setTimeout(() => {
      setCheckedIn(true);
      setCheckingIn(false);
    }, 1500);
  };

  const handleCheckOut = () => {
    setCheckingIn(true);
    setTimeout(() => {
      setCheckedIn(false);
      setCheckingIn(false);
    }, 1000);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-2">
          {/* ─── Hero Header ─── */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative px-6 pt-5 pb-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">জআ</span>
                  </div>
                  <div>
                    <p className="text-amber-100 text-xs font-bangla mb-0.5">{t("শুভ সকাল", "Good Morning")}</p>
                    <h1 className="text-white font-bold text-xl font-bangla leading-tight">
                      {t("জাহাঙ্গীর আলম", "Jahangir Alam")}
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bangla border border-white/20">
                        {t("মাঠকর্মী", "Field Staff")}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bangla border flex items-center gap-1 ${checkedIn ? "bg-emerald-400/20 text-emerald-100 border-emerald-300/20" : "bg-red-400/20 text-red-100 border-red-300/20"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${checkedIn ? "bg-emerald-300" : "bg-red-300"}`} />
                        {checkedIn ? t("চেক-ইন", "Checked In") : t("চেক-আউট", "Checked Out")}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/mobile/shared/notifications?role=staff" className="relative p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
                  <Bell className="w-5 h-5 text-white" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-white/30 animate-pulse" />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2.5 mt-5">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2.5 py-2.5 border border-white/15 text-center">
                  <p className="text-xl font-bold text-white">3</p>
                  <p className="text-amber-100 text-[9px] font-bangla mt-0.5">{t("আজকের কাজ", "Today's Tasks")}</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2.5 py-2.5 border border-white/15 text-center">
                  <p className="text-xl font-bold text-white">0</p>
                  <p className="text-amber-100 text-[9px] font-bangla mt-0.5">{t("সম্পন্ন", "Completed")}</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2.5 py-2.5 border border-white/15 text-center">
                  <p className="text-xl font-bold text-white">2</p>
                  <p className="text-amber-100 text-[9px] font-bangla mt-0.5">{t("জরুরি", "Urgent")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Check-in/out Card ─── */}
          <div className="px-5 -mt-3 mb-4">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-4">
              {!checkedIn ? (
                <button
                  onClick={handleCheckIn}
                  disabled={checkingIn}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bangla font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-70"
                >
                  {checkingIn ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("লোকেশন নিচ্ছে...", "Getting location...")}</>
                  ) : (
                    <><MapPin className="w-5 h-5" /> {t("কাজ শুরু করুন (চেক-ইন)", "Start Work (Check-in)")}</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bangla font-medium">{t("চেক-ইন", "Check-in")}: {t("সকাল ৯:০০", "9:00 AM")}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bangla flex items-center gap-1"><Clock className="w-3 h-3" /> {t("৩ ঘণ্টা আগে", "3 hrs ago")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-bangla">{t("পৌরসভা কার্যালয়, ওয়ার্ড ৫", "Municipality Office, Ward 5")}</span>
                  </div>
                  <button
                    onClick={handleCheckOut}
                    disabled={checkingIn}
                    className="w-full py-2.5 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-500 text-sm font-bangla font-bold flex items-center justify-center gap-2 bg-white dark:bg-[#1E293B] disabled:opacity-70"
                  >
                    {checkingIn ? (
                      <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                    ) : (
                      <><LogOut className="w-4 h-4" /> {t("চেক-আউট", "Check-out")}</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ─── Today's Tasks ─── */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">{t("আজকের কাজ", "Today's Tasks")}</h2>
              <Link href="/mobile/staff/task" className="text-xs text-orange-600 dark:text-orange-400 font-bangla flex items-center gap-0.5 font-bold">
                {t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => {
                const pc = priorityConfig[task.priority];
                return (
                  <Link
                    key={task.id}
                    href={`/mobile/staff/task?id=${task.id}`}
                    className="block bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div className="flex">
                      <div className={`w-1.5 ${pc.stripe} shrink-0`} />
                      <div className="flex-1 p-4">
                        <div className="flex items-start gap-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${task.type === "complaint" ? "bg-red-50 dark:bg-red-900/15" : "bg-blue-50 dark:bg-blue-900/15"}`}>
                            {task.type === "complaint" ? (
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                            ) : (
                              <ClipboardCheck className="w-5 h-5 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t(task.category, task.categoryEn)}</p>
                              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bangla font-bold shrink-0 ${pc.bg} ${pc.color}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                                {t(pc.label, pc.labelEn)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                              <MapPin className="w-3 h-3" />
                              <span className="font-bangla">{t(task.address, task.addressEn)}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1"><Clock className="w-3 h-3" /> {t(task.time, task.timeEn)}</span>
                              <span className="text-[11px] text-orange-600 dark:text-orange-400 font-bangla font-bold">{t("শুরু করুন", "Start")} →</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Progress Card ─── */}
          <div className="px-5 mt-5 pb-4">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("আজকের অগ্রগতি", "Today's Progress")}</h3>
                <span className="text-xs text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 0%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: "0%" }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-400 font-bangla">{t("০টি সম্পন্ন", "0 completed")}</span>
                <span className="text-[10px] text-gray-400 font-bangla">{t("৩টি মোট", "3 total")}</span>
              </div>
            </div>
          </div>
        </div>

        <BottomNav role="staff" />
      </div>
    </MobileFrame>
  );
}

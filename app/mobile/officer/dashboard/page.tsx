"use client";

import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ClipboardList,
  AlertOctagon,
  ChevronRight,
  Bell,
  TrendingUp,
  Calendar,
} from "lucide-react";

const pendingTasks = [
  { id: 1, appId: "APP-2026-001", type: "application" as const, applicant: "আব্দুল করিম", applicantEn: "Abdul Karim", service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration", time: "১০ মিনিট আগে", timeEn: "10 min ago", priority: "High" as const },
  { id: 2, appId: "APP-2026-002", type: "complaint" as const, applicant: "ফাতেমা বেগম", applicantEn: "Fatema Begum", service: "রাস্তা মেরামত অভিযোগ", serviceEn: "Road Repair Complaint", time: "৩০ মিনিট আগে", timeEn: "30 min ago", priority: "High" as const },
];

const completedTasks = [
  { id: 10, appId: "APP-2026-004", applicant: "সাইফুল ইসলাম", applicantEn: "Saiful Islam", service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration", time: "গতকাল", timeEn: "Yesterday", action: "অনুমোদিত", actionEn: "Approved" },
  { id: 11, appId: "APP-2026-005", applicant: "নাজমুল হক", applicantEn: "Nazmul Haq", service: "ট্রেড লাইসেন্স", serviceEn: "Trade License", time: "গতকাল", timeEn: "Yesterday", action: "অনুমোদিত", actionEn: "Approved" },
  { id: 12, appId: "APP-2026-006", applicant: "শামীমা আক্তার", applicantEn: "Shamima Akter", service: "নাগরিকত্ব সনদ", serviceEn: "Citizen Cert", time: "২ দিন আগে", timeEn: "2 days ago", action: "বাতিল", actionEn: "Rejected" },
];

const priorityConfig: Record<string, { label: string; labelEn: string; bg: string; color: string; dot: string }> = {
  High: { label: "জরুরি", labelEn: "Urgent", bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400", dot: "bg-red-400" },
  Medium: { label: "মাঝারি", labelEn: "Medium", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400" },
  Normal: { label: "সাধারণ", labelEn: "Normal", bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-400" },
};

export default function OfficerDashboardPage() {
  const { t } = useLang();

  const stats = [
    { label: t("অপেক্ষমাণ", "Pending"), value: "১২", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/15", borderColor: "border-amber-200 dark:border-amber-800/30" },
    { label: t("আজ সম্পন্ন", "Done Today"), value: "৮", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/15", borderColor: "border-emerald-200 dark:border-emerald-800/30" },
    { label: t("অভিযোগ", "Complaints"), value: "৫", icon: ClipboardList, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/15", borderColor: "border-blue-200 dark:border-blue-800/30" },
    { label: t("বিলম্বিত", "Overdue"), value: "৩", icon: AlertOctagon, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/15", borderColor: "border-red-200 dark:border-red-800/30" },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-2">
          {/* ─── Hero Header ─── */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative px-6 pt-5 pb-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">রই</span>
                  </div>
                  <div>
                    <p className="text-green-100 text-xs font-bangla mb-0.5">{t("শুভ সকাল", "Good Morning")}</p>
                    <h1 className="text-white font-bold text-xl font-bangla leading-tight">
                      {t("রফিকুল ইসলাম", "Rafiqul Islam")}
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bangla border border-white/20">
                        {t("সচিব", "Secretary")}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[11px] font-bangla border border-emerald-300/20 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {t("অনলাইন", "Online")}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/mobile/shared/notifications?role=officer" className="relative p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
                  <Bell className="w-5 h-5 text-white" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-white/30 animate-pulse" />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-2.5 mt-5">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-2.5 py-2.5 border border-white/15 text-center">
                      <Icon className="w-4 h-4 text-white/80 mx-auto mb-1" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-green-100 text-[9px] font-bangla mt-0.5">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Performance Card ─── */}
          <div className="px-5 -mt-3 mb-4">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("আজকের অগ্রগতি", "Today's Progress")}</h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 67%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all" style={{ width: "67%" }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-400 font-bangla">{t("৮টি সম্পন্ন", "8 completed")}</span>
                <span className="text-[10px] text-gray-400 font-bangla">{t("১২টি মোট", "12 total")}</span>
              </div>
            </div>
          </div>

          {/* ─── Today's Tasks ─── */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">
                {t("আজকের কাজ", "Today's Tasks")}
              </h2>
              <Link href="/mobile/officer/applications" className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla flex items-center gap-0.5 font-bold">
                {t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {pendingTasks.map((task) => {
                const pc = priorityConfig[task.priority];
                return (
                  <Link
                    key={task.id}
                    href={`/mobile/officer/applications?id=${task.appId}`}
                    className="block bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${task.type === "application" ? "bg-blue-50 dark:bg-blue-900/15" : "bg-amber-50 dark:bg-amber-900/15"}`}>
                        {task.type === "application" ? (
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">
                            {t(task.applicant, task.applicantEn)}
                          </p>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bangla font-bold shrink-0 ${pc.bg} ${pc.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                            {t(pc.label, pc.labelEn)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{t(task.service, task.serviceEn)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {t(task.time, task.timeEn)}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bangla font-bold">
                            {task.type === "application" ? t("পর্যালোচনা করুন", "Review") : t("সমাধান করুন", "Resolve")} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Recently Completed ─── */}
          <div className="px-5 mt-5 pb-4">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">
                {t("সাম্প্রতিক সম্পন্ন", "Recently Completed")}
              </h2>
              <Link href="/mobile/officer/applications?tab=completed" className="text-xs text-emerald-600 dark:text-emerald-400 font-bangla flex items-center gap-0.5 font-bold">
                {t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {completedTasks.map((task) => {
                const isApproved = task.action === "অনুমোদিত";
                return (
                  <Link
                    key={task.id}
                    href={`/mobile/officer/applications?id=${task.appId}&tab=completed`}
                    className="block bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-3.5 flex items-center gap-3.5 hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isApproved ? "bg-emerald-50 dark:bg-emerald-900/15" : "bg-red-50 dark:bg-red-900/15"}`}>
                      {isApproved ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" /> : <AlertOctagon className="w-4.5 h-4.5 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla truncate">{t(task.applicant, task.applicantEn)}</p>
                      <p className="text-[11px] text-gray-400 font-bangla">{t(task.service, task.serviceEn)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bangla font-bold ${isApproved ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                        {t(task.action, task.actionEn)}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5">{t(task.time, task.timeEn)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

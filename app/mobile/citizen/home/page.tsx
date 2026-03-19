"use client";

import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import Link from "next/link";
import {
  FileText,
  FileX2,
  CreditCard,
  Droplets,
  Store,
  MessageSquareWarning,
  Bell,
  Grid3X3,
  ChevronRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const services = [
  { icon: FileText, bn: "জন্ম সনদ", en: "Birth Cert", href: "/mobile/citizen/birth-certificate", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { icon: FileX2, bn: "মৃত্যু সনদ", en: "Death Cert", href: "/mobile/citizen/death-certificate", gradient: "from-slate-500 to-slate-600", bg: "bg-slate-50 dark:bg-slate-950/40" },
  { icon: CreditCard, bn: "ট্যাক্স", en: "Tax", href: "/mobile/citizen/tax-payment", gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  { icon: Droplets, bn: "পানির বিল", en: "Water Bill", href: "/mobile/citizen/water-bill", gradient: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-950/40" },
  { icon: Store, bn: "ট্রেড লাইসেন্স", en: "Trade License", href: "/mobile/citizen/trade-license", gradient: "from-violet-500 to-violet-600", bg: "bg-violet-50 dark:bg-violet-950/40" },
  { icon: MessageSquareWarning, bn: "অভিযোগ", en: "Complaint", href: "/mobile/citizen/complaint", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { icon: Bell, bn: "নোটিশ", en: "Notices", href: "/mobile/citizen/notices", gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
  { icon: Grid3X3, bn: "সব সেবা", en: "All Services", href: "/mobile/citizen/services", gradient: "from-electric-blue to-sky-blue", bg: "bg-blue-50 dark:bg-blue-950/40" },
];

const applications = [
  {
    service: "জন্ম সনদ", serviceEn: "Birth Certificate",
    trackingId: "BC-2026-00142",
    status: "প্রক্রিয়াধীন", statusEn: "Processing",
    statusIcon: Clock,
    statusColor: "text-amber-600 dark:text-amber-400",
    statusBg: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-l-amber-400",
    progress: 60,
  },
  {
    service: "ট্রেড লাইসেন্স", serviceEn: "Trade License",
    trackingId: "TL-2026-00089",
    status: "অনুমোদিত", statusEn: "Approved",
    statusIcon: CheckCircle2,
    statusColor: "text-emerald-600 dark:text-emerald-400",
    statusBg: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-l-emerald-400",
    progress: 100,
  },
  {
    service: "পানির বিল", serviceEn: "Water Bill",
    trackingId: "WB-2026-00231",
    status: "পেমেন্ট বাকি", statusEn: "Payment Due",
    statusIcon: AlertCircle,
    statusColor: "text-red-600 dark:text-red-400",
    statusBg: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-l-red-400",
    progress: 30,
  },
];

export default function HomePage() {
  const { t } = useLang();
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-2">
          {/* ─── Hero Header with Gradient ─── */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-white/5" />

            <div className="relative px-6 pt-5 pb-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white font-bangla">রউ</span>
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs font-bangla mb-0.5">{t("আসসালামু আলাইকুম", "Welcome back")}</p>
                    <h1 className="text-white font-bold text-xl font-bangla leading-tight">
                      {t("রহিম উদ্দিন", "Rahim Uddin")}
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bangla border border-white/20">
                        {t("ওয়ার্ড ৩", "Ward 3")}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[11px] font-bangla border border-emerald-300/20">
                        {t("সক্রিয়", "Active")}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Notification Bell */}
                <Link href="/mobile/citizen/notices" className="relative p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
                  <Bell className="w-5.5 h-5.5 text-white" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-white/30 animate-pulse" />
                </Link>
              </div>

              {/* Quick Stats Row */}
              <div className="flex gap-3 mt-5">
                <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15">
                  <p className="text-blue-100 text-[10px] font-bangla mb-1">{t("মোট আবেদন", "Applications")}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">১২</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                </div>
                <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15">
                  <p className="text-blue-100 text-[10px] font-bangla mb-1">{t("বকেয়া", "Dues")}</p>
                  <span className="text-2xl font-bold text-white">৳৫,৫০০</span>
                </div>
                <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15">
                  <p className="text-blue-100 text-[10px] font-bangla mb-1">{t("সনদ প্রস্তুত", "Ready")}</p>
                  <span className="text-2xl font-bold text-white">৩</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Services Grid ─── */}
          <div className="px-5 -mt-1">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 dark:text-white font-bold text-base font-bangla">
                  {t("আমার সেবাসমূহ", "My Services")}
                </h2>
                <Link href="/mobile/citizen/services" className="text-electric-blue text-xs font-bangla flex items-center gap-0.5">
                  {t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {services.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <Link
                      key={svc.bn}
                      href={svc.href}
                      className="flex flex-col items-center gap-2.5 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${svc.bg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 text-[11px] font-bangla text-center leading-tight font-medium">
                        {t(svc.bn, svc.en)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Active Applications ─── */}
          <div className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-gray-900 dark:text-white font-bold text-base font-bangla">
                {t("আমার আবেদনসমূহ", "My Applications")}
              </h2>
              <Link
                href="/mobile/citizen/applications"
                className="flex items-center gap-1 text-electric-blue text-xs font-bangla"
              >
                {t("সব দেখুন", "See all")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {applications.map((app) => {
                const StatusIcon = app.statusIcon;
                return (
                  <Link
                    key={app.trackingId}
                    href="/mobile/citizen/applications"
                    className={`bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 border-l-4 ${app.borderColor} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-2.5">
                      <div>
                        <p className="text-gray-900 dark:text-white text-[15px] font-bangla font-bold">
                          {t(app.service, (app as any).serviceEn)}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 font-mono">
                          {app.trackingId}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bangla font-medium ${app.statusBg} ${app.statusColor}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {t(app.status, (app as any).statusEn)}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          app.progress === 100
                            ? "bg-emerald-400"
                            : app.progress >= 50
                            ? "bg-amber-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Latest Notice ─── */}
          <div className="px-5 mt-6 mb-4">
            <h2 className="text-gray-900 dark:text-white font-bold text-base font-bangla mb-3.5">
              {t("সর্বশেষ নোটিশ", "Latest Notice")}
            </h2>
            <Link
              href="/mobile/citizen/notices"
              className="block bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200/60 dark:border-amber-700/30 rounded-2xl p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-5.5 h-5.5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-700/30 text-amber-700 dark:text-amber-400 text-[10px] font-bangla font-bold">
                      {t("গুরুত্বপূর্ণ", "Important")}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-[10px]">০৫ মার্চ ২০২৬</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-100 text-sm font-bangla font-bold leading-snug">
                    {t("পৌর কর জমাদানের সময়সীমা বৃদ্ধি", "Municipal Tax Deadline Extended")}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla mt-1 line-clamp-1">
                    {t("চলতি অর্থবছরের হোল্ডিং ট্যাক্স জমা দেওয়ার শেষ তারিখ ৩১ মার্চ...", "Holding tax deadline for current fiscal year extended to March 31...")}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 shrink-0 mt-3" />
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

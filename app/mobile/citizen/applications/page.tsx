"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import Link from "next/link";
import { useLang } from "@/components/language-context";
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  Home,
  Briefcase,
  CreditCard,
  Users,
  Download,
  Share2,
  FileIcon,
  CheckCircle2,
  Clock,
  XCircle,
  Circle,
  ArrowLeft,
  Search,
  Filter,
  Droplets,
  AlertCircle,
  ArrowDownToLine,
  RotateCcw,
} from "lucide-react";

const tabs = [
  { label: "সব", count: 5 },
  { label: "চলমান", count: 2 },
  { label: "অনুমোদিত", count: 2 },
  { label: "বাতিল", count: 1 },
];

type Application = {
  id: number;
  trackingId: string;
  serviceName: string;
  serviceIcon: React.ElementType;
  submittedDate: string;
  status: string;
  progress: number;
  iconGradient: string;
  iconBg: string;
  data: { label: string; value: string }[];
  documents: { name: string; size: string }[];
  timeline: { step: string; time: string; done: boolean }[];
};

const applications: Application[] = [
  {
    id: 1,
    trackingId: "APP-2026-00451",
    serviceName: "জন্ম নিবন্ধন সনদ",
    serviceIcon: FileText,
    submittedDate: "২০২৬-০২-২৮",
    status: "অনুমোদিত",
    progress: 100,
    iconGradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    data: [
      { label: "নাম", value: "রাহাত হোসেন" },
      { label: "জন্ম তারিখ", value: "২০২৫-১১-১৫" },
      { label: "পিতার নাম", value: "রহিম উদ্দিন" },
      { label: "মাতার নাম", value: "ফাতেমা বেগম" },
    ],
    documents: [{ name: "জন্ম প্রমাণপত্র.pdf", size: "245 KB" }, { name: "পিতার NID.pdf", size: "1.2 MB" }],
    timeline: [
      { step: "আবেদন জমা", time: "২৮ ফেব্রু, সকাল ১০:৩০", done: true },
      { step: "যাচাই সম্পন্ন", time: "০১ মার্চ, দুপুর ২:১৫", done: true },
      { step: "অনুমোদিত", time: "০৩ মার্চ, সকাল ১১:০০", done: true },
      { step: "সনদ প্রস্তুত", time: "০৩ মার্চ, বিকাল ৪:০০", done: true },
    ],
  },
  {
    id: 2,
    trackingId: "APP-2026-00467",
    serviceName: "ট্রেড লাইসেন্স নবায়ন",
    serviceIcon: Briefcase,
    submittedDate: "২০২৬-০৩-০১",
    status: "চলমান",
    progress: 65,
    iconGradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-50 dark:bg-blue-950/30",
    data: [
      { label: "ব্যবসার নাম", value: "রহিম স্টোর" },
      { label: "লাইসেন্স নং", value: "TL-2024-1234" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [{ name: "আগের লাইসেন্স.pdf", size: "890 KB" }, { name: "ট্যাক্স রসিদ.pdf", size: "340 KB" }],
    timeline: [
      { step: "আবেদন জমা", time: "০১ মার্চ, সকাল ৯:৪৫", done: true },
      { step: "পর্যালোচনা চলছে", time: "০২ মার্চ, সকাল ১০:০০", done: true },
      { step: "অনুমোদন বাকি", time: "", done: false },
    ],
  },
  {
    id: 3,
    trackingId: "APP-2026-00412",
    serviceName: "ওয়ারিশ সনদ",
    serviceIcon: Users,
    submittedDate: "২০২৬-০২-২০",
    status: "বাতিল",
    progress: 0,
    iconGradient: "from-red-500 to-red-600",
    iconBg: "bg-red-50 dark:bg-red-950/30",
    data: [
      { label: "মৃত ব্যক্তির নাম", value: "আব্দুল করিম" },
      { label: "সম্পর্ক", value: "পিতা" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [{ name: "মৃত্যু সনদ.pdf", size: "560 KB" }],
    timeline: [
      { step: "আবেদন জমা", time: "২০ ফেব্রু, সকাল ১১:০০", done: true },
      { step: "তথ্য অসম্পূর্ণ", time: "২২ ফেব্রু, দুপুর ১:৩০", done: true },
      { step: "বাতিল করা হয়েছে", time: "২৫ ফেব্রু, সকাল ১০:০০", done: true },
    ],
  },
  {
    id: 4,
    trackingId: "APP-2026-00489",
    serviceName: "হোল্ডিং ট্যাক্স পরিশোধ",
    serviceIcon: Home,
    submittedDate: "২০২৬-০৩-০৩",
    status: "চলমান",
    progress: 35,
    iconGradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/30",
    data: [
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "পরিমাণ", value: "৳৫,৫০০" },
      { label: "অর্থবছর", value: "২০২৫-২৬" },
    ],
    documents: [{ name: "ট্যাক্স বিল.pdf", size: "180 KB" }],
    timeline: [
      { step: "আবেদন জমা", time: "০৩ মার্চ, সকাল ১০:০০", done: true },
      { step: "পেমেন্ট যাচাই", time: "", done: false },
      { step: "রসিদ প্রস্তুত", time: "", done: false },
    ],
  },
  {
    id: 5,
    trackingId: "APP-2026-00501",
    serviceName: "পানির সংযোগ আবেদন",
    serviceIcon: Droplets,
    submittedDate: "২০২৬-০৩-০৫",
    status: "অনুমোদিত",
    progress: 100,
    iconGradient: "from-cyan-500 to-cyan-600",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
    data: [
      { label: "সংযোগ ধরন", value: "আবাসিক" },
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [
      { name: "জমির দলিল.pdf", size: "2.1 MB" },
      { name: "NID কপি.pdf", size: "1.4 MB" },
    ],
    timeline: [
      { step: "আবেদন জমা", time: "০৫ মার্চ, সকাল ৮:৩০", done: true },
      { step: "পরিদর্শন সম্পন্ন", time: "০৫ মার্চ, দুপুর ২:০০", done: true },
      { step: "অনুমোদিত", time: "০৬ মার্চ, সকাল ৯:০০", done: true },
    ],
  },
];

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType; borderColor: string; progressColor: string }> = {
  চলমান: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: Clock,
    borderColor: "border-l-blue-400",
    progressColor: "bg-blue-400",
  },
  অনুমোদিত: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: CheckCircle2,
    borderColor: "border-l-emerald-400",
    progressColor: "bg-emerald-400",
  },
  বাতিল: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    icon: XCircle,
    borderColor: "border-l-red-400",
    progressColor: "bg-red-400",
  },
};

export default function ApplicationsPage() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("সব");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filtered = applications.filter((a) => {
    if (activeTab === "সব") return true;
    return a.status === activeTab;
  });

  // ─── Detail View ───
  if (selectedApp) {
    const cfg = statusConfig[selectedApp.status];
    const StatusIcon = cfg.icon;
    const Icon = selectedApp.serviceIcon;
    const completedSteps = selectedApp.timeline.filter((item) => item.done).length;

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          {/* Detail Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />

            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-base font-bold text-white font-bangla flex-1">
                  {t("আবেদনের বিবরণ", "Application Details")}
                </h2>
              </div>

              {/* Service Card */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <div className="flex items-center gap-3.5">
                  <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${selectedApp.iconGradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[15px] font-bangla">{selectedApp.serviceName}</h3>
                    <p className="text-blue-100 text-xs font-mono mt-0.5">{selectedApp.trackingId}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bangla font-bold bg-white/20 text-white border border-white/20`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {selectedApp.status === "চলমান" ? t("চলমান", "Active") : selectedApp.status === "অনুমোদিত" ? t("অনুমোদিত", "Approved") : t("বাতিল", "Cancelled")}
                  </span>
                </div>
                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-blue-100 text-[10px] font-bangla">{t("অগ্রগতি", "Progress")}</span>
                    <span className="text-white text-xs font-bold">{completedSteps}/{selectedApp.timeline.length} {t("ধাপ", "steps")}</span>
                  </div>
                  <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-white transition-all" style={{ width: `${selectedApp.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-1 space-y-4">
            {/* Info Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">
                {t("আবেদনের তথ্য", "Application Info")}
              </h3>
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-bangla">{t("জমার তারিখ", "Submitted Date")}</span>
                  <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{selectedApp.submittedDate}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                {selectedApp.data.map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-bangla">{d.label}</span>
                      <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{d.value}</span>
                    </div>
                    {i < selectedApp.data.length - 1 && <div className="h-px bg-gray-100 dark:bg-gray-700/50 mt-3.5" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">
                {t("আবেদনের অগ্রগতি", "Application Progress")}
              </h3>
              <div className="space-y-0">
                {selectedApp.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {item.done ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <Circle className="w-4 h-4 text-gray-300 dark:text-gray-500" />
                        </div>
                      )}
                      {i < selectedApp.timeline.length - 1 && (
                        <div className={`w-0.5 h-10 ${item.done ? "bg-emerald-200 dark:bg-emerald-800" : "bg-gray-200 dark:bg-gray-700"}`} />
                      )}
                    </div>
                    <div className="pb-5 pt-1">
                      <p className={`text-sm font-bangla font-medium ${item.done ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                        {item.step}
                      </p>
                      {item.time && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">
                {t("সংযুক্ত দলিল", "Attached Documents")}
              </h3>
              <div className="space-y-2.5">
                {selectedApp.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 bg-gray-50 dark:bg-[#0F172A] rounded-xl p-3.5 border border-gray-100 dark:border-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-gray-900 dark:text-white font-bangla block truncate">{doc.name}</span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">{doc.size}</span>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-electric-blue/10 dark:bg-electric-blue/20 flex items-center justify-center">
                      <Download className="w-4 h-4 text-electric-blue" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedApp.status === "অনুমোদিত" && (
              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-electric-blue to-sky-blue text-white text-sm font-bold font-bangla shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                  <ArrowDownToLine className="w-4.5 h-4.5" />
                  {t("সনদ ডাউনলোড", "Download Certificate")}
                </button>
                <button className="w-14 h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-[#1E293B]">
                  <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            )}
            {selectedApp.status === "চলমান" && (
              <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5.5 h-5.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 font-bangla">{t("প্রক্রিয়াধীন", "Processing")}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400/70 font-bangla mt-0.5">{t("আনুমানিক ২-৩ কার্যদিবসে সম্পন্ন হবে", "Expected to complete in 2-3 business days")}</p>
                </div>
              </div>
            )}
            {selectedApp.status === "বাতিল" && (
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-700/30 rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-800/30 flex items-center justify-center shrink-0">
                    <XCircle className="w-5.5 h-5.5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-red-700 dark:text-red-300 font-bangla">{t("আবেদনটি বাতিল হয়েছে", "Application Cancelled")}</p>
                    <p className="text-xs text-red-500 dark:text-red-400/70 font-bangla mt-0.5">{t("কারণ: তথ্য অসম্পূর্ণ", "Reason: Incomplete information")}</p>
                  </div>
                </div>
                <button className="w-full py-3.5 rounded-2xl border-2 border-electric-blue text-electric-blue text-sm font-bold font-bangla flex items-center justify-center gap-2 bg-white dark:bg-[#1E293B]">
                  <RotateCcw className="w-4 h-4" />
                  {t("পুনরায় আবেদন করুন", "Apply Again")}
                </button>
              </div>
            )}
          </div>

          <BottomNav role="citizen" />
        </div>
      </MobileFrame>
    );
  }

  // ─── List View ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <Link href="/mobile/citizen/home" className="w-9 h-9 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 flex items-center justify-center shadow-sm">
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white font-bangla">
                {t("আমার আবেদনসমূহ", "My Applications")}
              </h1>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex gap-2.5 mt-4 mb-4">
            <div className="flex-1 bg-blue-50 dark:bg-blue-900/15 rounded-xl px-3 py-2.5 text-center border border-blue-100 dark:border-blue-800/30">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">৫</p>
              <p className="text-[10px] text-blue-500 dark:text-blue-400/70 font-bangla font-medium">{t("মোট", "Total")}</p>
            </div>
            <div className="flex-1 bg-amber-50 dark:bg-amber-900/15 rounded-xl px-3 py-2.5 text-center border border-amber-100 dark:border-amber-800/30">
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">২</p>
              <p className="text-[10px] text-amber-500 dark:text-amber-400/70 font-bangla font-medium">{t("চলমান", "Active")}</p>
            </div>
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl px-3 py-2.5 text-center border border-emerald-100 dark:border-emerald-800/30">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">২</p>
              <p className="text-[10px] text-emerald-500 dark:text-emerald-400/70 font-bangla font-medium">{t("সম্পন্ন", "Done")}</p>
            </div>
            <div className="flex-1 bg-red-50 dark:bg-red-900/15 rounded-xl px-3 py-2.5 text-center border border-red-100 dark:border-red-800/30">
              <p className="text-xl font-bold text-red-600 dark:text-red-400">১</p>
              <p className="text-[10px] text-red-500 dark:text-red-400/70 font-bangla font-medium">{t("বাতিল", "Cancelled")}</p>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex gap-1.5 bg-gray-100 dark:bg-[#1E293B] rounded-2xl p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bangla font-medium transition-all ${
                  activeTab === tab.label
                    ? "bg-white dark:bg-[#0F172A] text-electric-blue shadow-sm font-bold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab.label === "সব" ? t("সব", "All") : tab.label === "চলমান" ? t("চলমান", "Active") : tab.label === "অনুমোদিত" ? t("অনুমোদিত", "Approved") : t("বাতিল", "Cancelled")}
              </button>
            ))}
          </div>
        </div>

        {/* Application List */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-bangla text-sm">{t("কোনো আবেদন পাওয়া যায়নি", "No applications found")}</p>
            </div>
          )}
          {filtered.map((app) => {
            const cfg = statusConfig[app.status];
            const StatusIcon = cfg.icon;
            const AppIcon = app.serviceIcon;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl overflow-hidden border-l-4 ${cfg.borderColor} transition-all hover:shadow-md active:scale-[0.98]`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3.5">
                    {/* Service Icon */}
                    <div className={`w-12 h-12 rounded-xl ${app.iconBg} flex items-center justify-center shrink-0`}>
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${app.iconGradient} flex items-center justify-center`}>
                        <AppIcon className="w-4.5 h-4.5 text-white" />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla leading-snug">
                          {app.serviceName}
                        </h3>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bangla font-bold shrink-0 ${cfg.bg} ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {app.status === "চলমান" ? t("চলমান", "Active") : app.status === "অনুমোদিত" ? t("অনুমোদিত", "Approved") : t("বাতিল", "Cancelled")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1">
                        {app.trackingId}
                      </p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla">
                          {app.submittedDate}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400 dark:text-gray-500">{app.progress}%</span>
                          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                        </div>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-full rounded-full transition-all ${cfg.progressColor}`}
                          style={{ width: `${app.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

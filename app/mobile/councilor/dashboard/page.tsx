"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  Users,
  FileText,
  AlertTriangle,
  FolderKanban,
  MapPin,
  Bell,
  ChevronRight,
  ThumbsUp,
  Clock,
  Calendar,
  CheckCircle2,
  Eye,
  ArrowLeft,
  User,
  File,
  Download,
  XCircle,
} from "lucide-react";

type AppDetail = {
  id: number;
  name: string;
  nameEn: string;
  service: string;
  serviceEn: string;
  time: string;
  timeEn: string;
  status: "pending" | "recommended" | "rejected";
  phone: string;
  nid: string;
  address: string;
  addressEn: string;
  fatherName: string;
  fatherNameEn: string;
  date: string;
  documents: { name: string; type: string }[];
  timeline: { action: string; actionEn: string; time: string; by: string; byEn: string }[];
};

const initialApps: AppDetail[] = [
  {
    id: 1, name: "রহিমা বেগম", nameEn: "Rahima Begum", service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration",
    time: "৩০ মিনিট আগে", timeEn: "30 min ago", status: "pending",
    phone: "০১৭১১-XXXXXX", nid: "199X-XXXX-XX34", address: "৫/এ, মহল্লা রোড", addressEn: "5/A, Mohalla Road",
    fatherName: "আব্দুর রহমান", fatherNameEn: "Abdur Rahman", date: "২০২৬-০৩-১৭",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "ছবি.jpg", type: "image" }],
    timeline: [
      { action: "আবেদন জমা", actionEn: "Submitted", time: "১৭ মার্চ, ১০:৩০", by: "আবেদনকারী", byEn: "Applicant" },
      { action: "ফি পরিশোধ", actionEn: "Fee Paid", time: "১৭ মার্চ, ১০:৩৫", by: "সিস্টেম", byEn: "System" },
      { action: "কাউন্সিলর সুপারিশের জন্য অপেক্ষমাণ", actionEn: "Awaiting Councilor Recommendation", time: "১৭ মার্চ, ১১:০০", by: "সিস্টেম", byEn: "System" },
    ],
  },
  {
    id: 2, name: "করিম মিয়া", nameEn: "Karim Mia", service: "ট্রেড লাইসেন্স", serviceEn: "Trade License",
    time: "২ ঘন্টা আগে", timeEn: "2 hours ago", status: "pending",
    phone: "০১৮১২-XXXXXX", nid: "198X-XXXX-XX56", address: "১২, বাজার রোড", addressEn: "12, Bazar Road",
    fatherName: "আলী হোসেন", fatherNameEn: "Ali Hossain", date: "২০২৬-০৩-১৭",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "দোকান ছবি.jpg", type: "image" }, { name: "ট্রেড ডকুমেন্ট.pdf", type: "pdf" }],
    timeline: [
      { action: "আবেদন জমা", actionEn: "Submitted", time: "১৭ মার্চ, ০৮:০০", by: "আবেদনকারী", byEn: "Applicant" },
      { action: "ফি পরিশোধ", actionEn: "Fee Paid", time: "১৭ মার্চ, ০৮:০৫", by: "সিস্টেম", byEn: "System" },
    ],
  },
];

const recentComplaints = [
  { id: 1, category: "রাস্তা", categoryEn: "Road", description: "মহল্লা রোডে বড় গর্ত", descEn: "Big pothole on Mohalla Road", status: "জরুরি" as const, statusEn: "Urgent" as const, time: "২ ঘণ্টা আগে", timeEn: "2 hours ago" },
  { id: 2, category: "পানি", categoryEn: "Water", description: "তিন দিন ধরে পানি বন্ধ", descEn: "No water for 3 days", status: "অপেক্ষমাণ" as const, statusEn: "Pending" as const, time: "৫ ঘণ্টা আগে", timeEn: "5 hours ago" },
];

const complaintStatusConfig: Record<string, { bg: string; color: string }> = {
  "জরুরি": { bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400" },
  "অপেক্ষমাণ": { bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400" },
};

const projects = [
  { id: 1, name: "রাস্তা মেরামত - সেক্টর ৩", nameEn: "Road Repair - Sector 3", progress: 75, budget: "৫ লক্ষ", budgetEn: "5 Lakh" },
  { id: 2, name: "ড্রেনেজ নির্মাণ", nameEn: "Drainage Construction", progress: 40, budget: "৮ লক্ষ", budgetEn: "8 Lakh" },
  { id: 3, name: "স্ট্রিটলাইট স্থাপন", nameEn: "Streetlight Installation", progress: 90, budget: "২ লক্ষ", budgetEn: "2 Lakh" },
];

export default function CouncilorDashboardPage() {
  const { t } = useLang();
  const [apps, setApps] = useState(initialApps);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null);
  const [actionDone, setActionDone] = useState<"recommended" | "rejected" | null>(null);

  const handleRecommend = (id: number) => {
    setProcessingId(id);
    setTimeout(() => {
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: "recommended" as const } : a));
      setProcessingId(null);
      if (selectedApp?.id === id) setActionDone("recommended");
    }, 800);
  };

  const handleReject = (id: number) => {
    setProcessingId(id);
    setTimeout(() => {
      setApps(prev => prev.map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
      setProcessingId(null);
      if (selectedApp?.id === id) setActionDone("rejected");
    }, 800);
  };

  const stats = [
    { label: t("নাগরিক", "Citizens"), value: "2,450", icon: Users, href: "/mobile/councilor/citizens" },
    { label: t("আবেদন", "Apps"), value: "8", icon: FileText, href: "/mobile/councilor/citizens" },
    { label: t("অভিযোগ", "Complaints"), value: "12", icon: AlertTriangle, href: "/mobile/councilor/complaints" },
    { label: t("প্রকল্প", "Projects"), value: "3", icon: FolderKanban, href: "" },
  ];

  const pendingApps = apps.filter(a => a.status === "pending");
  const doneApps = apps.filter(a => a.status !== "pending");

  // ─── Application Detail View ───
  if (selectedApp) {
    if (actionDone) {
      const isRec = actionDone === "recommended";
      return (
        <MobileFrame>
          <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
            <div className="relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${isRec ? "from-emerald-500 via-green-500 to-teal-500" : "from-red-500 via-red-600 to-rose-500"}`} />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="relative flex flex-col items-center pt-16 pb-10">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                  {isRec ? <ThumbsUp className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">
                  {isRec ? t("সুপারিশ সম্পন্ন!", "Recommended!") : t("আবেদন প্রত্যাখ্যাত!", "Rejected!")}
                </h2>
                <p className="text-white/80 text-sm font-bangla">{t(selectedApp.service, selectedApp.serviceEn)} — {t(selectedApp.name, selectedApp.nameEn)}</p>
              </div>
            </div>
            <div className="flex-1 px-6 -mt-3">
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5 space-y-3 mb-4">
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("আবেদনকারী", "Applicant")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedApp.name, selectedApp.nameEn)}</span></div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("সেবা", "Service")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedApp.service, selectedApp.serviceEn)}</span></div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("অবস্থা", "Status")}</span><span className={`font-bangla font-bold ${isRec ? "text-emerald-600" : "text-red-500"}`}>{isRec ? t("সুপারিশকৃত ✓", "Recommended ✓") : t("প্রত্যাখ্যাত", "Rejected")}</span></div>
              </div>
              {isRec && (
                <div className="bg-indigo-50 dark:bg-indigo-900/15 border border-indigo-200 dark:border-indigo-700/30 rounded-2xl p-4 flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 font-bangla">{t("সচিবের অনুমোদনের জন্য প্রেরিত", "Sent to Secretary for approval")}</p>
                </div>
              )}
              <button onClick={() => { setSelectedApp(null); setActionDone(null); }} className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold text-base bg-white dark:bg-[#1E293B]">
                {t("ড্যাশবোর্ডে ফিরুন", "Back to Dashboard")}
              </button>
            </div>
            <BottomNav role="councilor" />
          </div>
        </MobileFrame>
      );
    }

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setSelectedApp(null)} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white font-bangla">{t("আবেদনের বিবরণ", "Application Details")}</h2>
                  <p className="text-blue-100 text-xs font-bangla">{t(selectedApp.service, selectedApp.serviceEn)} · {selectedApp.date}</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0"><User className="w-6 h-6 text-white" /></div>
                <div className="flex-1">
                  <p className="text-white font-bold text-[15px] font-bangla">{t(selectedApp.name, selectedApp.nameEn)}</p>
                  <p className="text-blue-100 text-xs font-mono mt-0.5">{selectedApp.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-2 -mt-1 space-y-3">
            {/* Applicant Info */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs text-gray-400 font-bangla font-bold uppercase tracking-wider mb-1">{t("আবেদনকারীর তথ্য", "Applicant Info")}</h4>
              {[[t("নাম","Name"), t(selectedApp.name, selectedApp.nameEn)], [t("ফোন","Phone"), selectedApp.phone], ["NID", selectedApp.nid], [t("পিতা","Father"), t(selectedApp.fatherName, selectedApp.fatherNameEn)], [t("ঠিকানা","Address"), t(selectedApp.address, selectedApp.addressEn)]].map(([l,v]) => (
                <div key={l} className="flex justify-between items-center"><span className="text-sm text-gray-400 font-bangla">{l}</span><span className="text-sm text-gray-900 dark:text-white font-bangla font-medium text-right max-w-[55%]">{v}</span></div>
              ))}
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla font-bold uppercase tracking-wider mb-3">{t("কাগজপত্র", "Documents")} ({selectedApp.documents.length})</h4>
              <div className="space-y-2">
                {selectedApp.documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700/50">
                    <File className={`w-5 h-5 ${doc.type === "pdf" ? "text-red-500" : "text-blue-500"} shrink-0`} />
                    <span className="text-sm text-gray-900 dark:text-white font-bangla flex-1 truncate">{doc.name}</span>
                    <Download className="w-4 h-4 text-indigo-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla font-bold uppercase tracking-wider mb-3">{t("ইতিহাস", "Timeline")}</h4>
              {selectedApp.timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /></div>
                    {i < selectedApp.timeline.length - 1 && <div className="w-0.5 h-8 bg-indigo-200 dark:bg-indigo-800" />}
                  </div>
                  <div className="pb-4"><p className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{t(item.action, item.actionEn)}</p><p className="text-xs text-gray-400 mt-0.5">{item.time} — {t(item.by, item.byEn)}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="sticky bottom-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-700/50 p-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleReject(selectedApp.id)}
                disabled={processingId === selectedApp.id}
                className="flex-1 py-3 rounded-xl border-2 border-red-200 dark:border-red-800 text-red-500 text-sm font-bangla font-bold flex items-center justify-center gap-1.5 bg-white dark:bg-[#1E293B] disabled:opacity-60"
              >
                {processingId === selectedApp.id ? <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" /> : <><XCircle className="w-4 h-4" /> {t("প্রত্যাখ্যান", "Reject")}</>}
              </button>
              <button
                onClick={() => handleRecommend(selectedApp.id)}
                disabled={processingId === selectedApp.id}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20 disabled:opacity-60"
              >
                {processingId === selectedApp.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ThumbsUp className="w-4 h-4" /> {t("সুপারিশ করুন", "Recommend")}</>}
              </button>
            </div>
          </div>

          <BottomNav role="councilor" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Dashboard ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-2">
          {/* ─── Hero Header ─── */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="relative px-6 pt-5 pb-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">আক</span>
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs font-bangla mb-0.5">{t("শুভ সকাল", "Good Morning")}</p>
                    <h1 className="text-white font-bold text-xl font-bangla leading-tight">{t("আবদুল করিম", "Abdul Karim")}</h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bangla border border-white/20">{t("ওয়ার্ড ৫ কাউন্সিলর", "Ward 5 Councilor")}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-100 text-[11px] font-bangla border border-blue-300/20 flex items-center gap-1"><Calendar className="w-3 h-3" />{t("অনলাইন", "Online")}</span>
                    </div>
                  </div>
                </div>
                <Link href="/mobile/shared/notifications?role=councilor" className="relative p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
                  <Bell className="w-5 h-5 text-white" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-white/30 animate-pulse" />
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-2.5 mt-5">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  const Wrapper = stat.href ? Link : "div";
                  const wrapperProps = stat.href ? { href: stat.href } : {};
                  return (
                    <Wrapper key={stat.label} {...wrapperProps as any} className="bg-white/15 backdrop-blur-sm rounded-xl px-2.5 py-2.5 border border-white/15 text-center active:scale-95 transition-transform">
                      <Icon className="w-4 h-4 text-white/80 mx-auto mb-1" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-blue-100 text-[9px] font-bangla mt-0.5">{stat.label}</p>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Ward Complaint Map ─── */}
          <div className="px-5 -mt-3 mb-4">
            <Link href="/mobile/councilor/complaints" className="block bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 overflow-hidden active:scale-[0.98] transition-transform">
              <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("ওয়ার্ড অভিযোগ ম্যাপ", "Ward Complaint Map")}</h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bangla font-bold">{t("বিস্তারিত", "Details")} →</span>
              </div>
              <div className="relative bg-gray-50 dark:bg-[#0F172A] h-28 mx-4 mb-4 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center"><MapPin className="w-8 h-8 text-gray-200 dark:text-gray-700" /></div>
                <div className="absolute top-5 left-10 w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                <div className="absolute top-12 right-14 w-3 h-3 rounded-full bg-amber-400" />
                <div className="absolute bottom-8 left-20 w-3 h-3 rounded-full bg-blue-400" />
                <div className="absolute bottom-5 right-8 w-3 h-3 rounded-full bg-emerald-400" />
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-red-400" /><span className="text-[8px] text-gray-500">{t("জরুরি", "Urgent")}</span>
                  <div className="w-2 h-2 rounded-full bg-amber-400 ml-1" /><span className="text-[8px] text-gray-500">{t("অপেক্ষমাণ", "Pending")}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 ml-1" /><span className="text-[8px] text-gray-500">{t("সমাধান", "Done")}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* ─── Pending Applications ─── */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">{t("সুপারিশের জন্য আবেদন", "Applications to Recommend")}</h2>
              <Link href="/mobile/councilor/citizens" className="text-xs text-indigo-600 dark:text-indigo-400 font-bangla flex items-center gap-0.5 font-bold">{t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="space-y-3">
              {pendingApps.length === 0 && (
                <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 font-bangla font-bold">{t("সব আবেদন সুপারিশ করা হয়েছে!", "All applications recommended!")}</p>
                </div>
              )}
              {pendingApps.map((app) => (
                <div key={app.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/15 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{t(app.name, app.nameEn)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{t(app.service, app.serviceEn)}</p>
                      <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {t(app.time, app.timeEn)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedApp(app)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-bangla font-bold flex items-center justify-center gap-1.5 bg-white dark:bg-[#0F172A]">
                      <Eye className="w-3.5 h-3.5" /> {t("বিস্তারিত", "View")}
                    </button>
                    <button
                      onClick={() => handleRecommend(app.id)}
                      disabled={processingId === app.id}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-bangla font-bold flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-70"
                    >
                      {processingId === app.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ThumbsUp className="w-3.5 h-3.5" /> {t("সুপারিশ করুন", "Recommend")}</>}
                    </button>
                  </div>
                </div>
              ))}
              {doneApps.map((app) => (
                <div key={app.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-3.5 flex items-center gap-3.5 opacity-70">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${app.status === "recommended" ? "bg-emerald-50 dark:bg-emerald-900/15" : "bg-red-50 dark:bg-red-900/15"}`}>
                    {app.status === "recommended" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-bangla truncate">{t(app.name, app.nameEn)}</p>
                    <p className="text-[11px] text-gray-400 font-bangla">{t(app.service, app.serviceEn)}</p>
                  </div>
                  <span className={`text-[10px] font-bangla font-bold px-2 py-0.5 rounded-full ${app.status === "recommended" ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" : "text-red-500 bg-red-50 dark:bg-red-900/20"}`}>
                    {app.status === "recommended" ? t("সুপারিশকৃত ✓", "Recommended ✓") : t("প্রত্যাখ্যাত", "Rejected")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Recent Complaints ─── */}
          <div className="px-5 mt-5">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">{t("সাম্প্রতিক অভিযোগ", "Recent Complaints")}</h2>
              <Link href="/mobile/councilor/complaints" className="text-xs text-indigo-600 dark:text-indigo-400 font-bangla flex items-center gap-0.5 font-bold">{t("সব দেখুন", "See all")} <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="space-y-2.5">
              {recentComplaints.map((c) => {
                const sc = complaintStatusConfig[c.status];
                return (
                  <Link key={c.id} href="/mobile/councilor/complaints" className="block bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-3.5 hover:shadow-md transition-all active:scale-[0.98]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/15 flex items-center justify-center shrink-0"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla truncate">{t(c.description, c.descEn)}</p>
                        <p className="text-[11px] text-gray-400 font-bangla">{t(c.category, c.categoryEn)} · {t(c.time, c.timeEn)}</p>
                      </div>
                      <span className={`text-[10px] font-bangla font-bold px-2 py-0.5 rounded-full shrink-0 ${sc.bg} ${sc.color}`}>{t(c.status, c.statusEn)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ─── Ongoing Projects ─── */}
          <div className="px-5 mt-5 pb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla mb-3.5">{t("চলমান প্রকল্প", "Ongoing Projects")}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 min-w-[200px] flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2.5">{t(project.name, project.nameEn)}</p>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">{project.progress}%</span>
                    <span className="text-gray-400 text-xs font-bangla">{t("বাজেট", "Budget")}: {t(project.budget, project.budgetEn)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav role="councilor" />
      </div>
    </MobileFrame>
  );
}

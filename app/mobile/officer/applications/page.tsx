"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  ArrowLeft,
  FileText,
  Clock,
  User,
  File,
  CheckCircle2,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Circle,
  Download,
  Award,
  Send,
  AlertTriangle,
} from "lucide-react";

type Application = {
  id: string;
  applicant: string;
  applicantEn: string;
  service: string;
  serviceEn: string;
  date: string;
  waitDays: number;
  priority: "High" | "Medium" | "Normal";
  status: "pending" | "processing" | "completed";
  phone: string;
  nid: string;
  address: string;
  fatherName: string;
  motherName: string;
  documents: { name: string; type: string }[];
  timeline: { action: string; time: string; by: string }[];
};

const allApplications: Application[] = [
  {
    id: "APP-2026-001", applicant: "আব্দুল করিম", applicantEn: "Abdul Karim", service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration",
    date: "২০২৬-০৩-১৫", waitDays: 3, priority: "High", status: "pending",
    phone: "০১৭১১২২৩৩৪৪", nid: "১২৩৪৫৬৭৮৯০", address: "১২/৩, ওয়ার্ড-০৫, কালিয়াকৈর", fatherName: "মোহাম্মদ আলী", motherName: "রাবেয়া বেগম",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "ছবি.jpg", type: "image" }, { name: "জন্ম সনদ.pdf", type: "pdf" }],
    timeline: [{ action: "আবেদন জমা", time: "১৫ মার্চ, সকাল ১০:৩০", by: "আবেদনকারী" }, { action: "ফি পরিশোধ", time: "১৫ মার্চ, ১০:৩৫", by: "সিস্টেম" }, { action: "পর্যালোচনার জন্য নির্ধারিত", time: "১৫ মার্চ, ১২:০০", by: "সিস্টেম" }],
  },
  {
    id: "APP-2026-002", applicant: "ফাতেমা বেগম", applicantEn: "Fatema Begum", service: "ওয়ারিশ সনদ", serviceEn: "Inheritance Cert",
    date: "২০২৬-০৩-১৪", waitDays: 4, priority: "High", status: "pending",
    phone: "০১৮১২৩৪৫৬৭৮", nid: "৯৮৭৬৫৪৩২১০", address: "৪৫, স্টেশন রোড, কালিয়াকৈর", fatherName: "আব্দুর রহমান", motherName: "হালিমা খাতুন",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "মৃত্যু সনদ.pdf", type: "pdf" }],
    timeline: [{ action: "আবেদন জমা", time: "১৪ মার্চ, বিকাল ৩:০০", by: "আবেদনকারী" }, { action: "ফি পরিশোধ", time: "১৪ মার্চ, ৩:০৫", by: "সিস্টেম" }],
  },
  {
    id: "APP-2026-003", applicant: "মোহাম্মদ হাসান", applicantEn: "Mohammad Hasan", service: "ট্রেড লাইসেন্স", serviceEn: "Trade License",
    date: "২০২৬-০৩-১৬", waitDays: 1, priority: "Medium", status: "processing",
    phone: "০১৯১১৫৫৬৬৭৭", nid: "৫৫৫৬৬৬৭৭৭৮", address: "বাজার রোড, কালিয়াকৈর", fatherName: "করিম উদ্দিন", motherName: "আমেনা বেগম",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "দোকান ছবি.jpg", type: "image" }],
    timeline: [{ action: "আবেদন জমা", time: "১৬ মার্চ, সকাল ৯:০০", by: "আবেদনকারী" }, { action: "প্রক্রিয়াধীন", time: "১৭ মার্চ, সকাল ১১:০০", by: "রফিকুল ইসলাম" }],
  },
  {
    id: "APP-2026-004", applicant: "সাইফুল ইসলাম", applicantEn: "Saiful Islam", service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration",
    date: "২০২৬-০৩-১০", waitDays: 0, priority: "Normal", status: "completed",
    phone: "০১৫১১৭৭৮৮৯৯", nid: "১১১২২২৩৩৩৪", address: "দক্ষিণপাড়া, কালিয়াকৈর", fatherName: "জামাল উদ্দিন", motherName: "সাহেরা বেগম",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "ছবি.jpg", type: "image" }],
    timeline: [{ action: "আবেদন জমা", time: "১০ মার্চ, সকাল ১০:০০", by: "আবেদনকারী" }, { action: "অনুমোদিত", time: "১২ মার্চ, দুপুর ১:০০", by: "রফিকুল ইসলাম" }, { action: "সনদ প্রস্তুত ও প্রেরণ", time: "১২ মার্চ, বিকাল ৪:০০", by: "সিস্টেম" }],
  },
  {
    id: "APP-2026-005", applicant: "নাজমুল হক", applicantEn: "Nazmul Haq", service: "ট্রেড লাইসেন্স", serviceEn: "Trade License",
    date: "২০২৬-০৩-১১", waitDays: 0, priority: "Normal", status: "completed",
    phone: "০১৬১১৮৮৯৯০০", nid: "২২২৩৩৩৪৪৪৫", address: "বাজার রোড, ওয়ার্ড-০৩, কালিয়াকৈর", fatherName: "নূরুল হক", motherName: "জোহরা বেগম",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "ট্রেড ডকুমেন্ট.pdf", type: "pdf" }, { name: "দোকান ছবি.jpg", type: "image" }],
    timeline: [{ action: "আবেদন জমা", time: "১১ মার্চ, সকাল ১১:০০", by: "আবেদনকারী" }, { action: "ফি পরিশোধ", time: "১১ মার্চ, ১১:০৫", by: "সিস্টেম" }, { action: "অনুমোদিত", time: "১৩ মার্চ, সকাল ১০:০০", by: "রফিকুল ইসলাম" }, { action: "সনদ প্রস্তুত ও প্রেরণ", time: "১৩ মার্চ, দুপুর ২:০০", by: "সিস্টেম" }],
  },
  {
    id: "APP-2026-006", applicant: "শামীমা আক্তার", applicantEn: "Shamima Akter", service: "নাগরিকত্ব সনদ", serviceEn: "Citizen Certificate",
    date: "২০২৬-০৩-০৯", waitDays: 0, priority: "Normal", status: "completed",
    phone: "০১৯১১২২৩৩৪৪", nid: "৩৩৩৪৪৪৫৫৫৬", address: "উত্তরপাড়া, ওয়ার্ড-০৭, কালিয়াকৈর", fatherName: "আবুল কালাম", motherName: "ফিরোজা বেগম",
    documents: [{ name: "NID.pdf", type: "pdf" }, { name: "ছবি.jpg", type: "image" }],
    timeline: [{ action: "আবেদন জমা", time: "০৯ মার্চ, বিকাল ৪:০০", by: "আবেদনকারী" }, { action: "ফি পরিশোধ", time: "০৯ মার্চ, ৪:০৫", by: "সিস্টেম" }, { action: "বাতিল", time: "১১ মার্চ, সকাল ৯:৩০", by: "রফিকুল ইসলাম" }],
  },
];

const statusConfig: Record<string, { label: string; labelEn: string; bg: string; color: string; dot: string }> = {
  pending: { label: "অপেক্ষমাণ", labelEn: "Pending", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400" },
  processing: { label: "প্রক্রিয়াধীন", labelEn: "Processing", bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-400" },
  completed: { label: "সম্পন্ন", labelEn: "Completed", bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400" },
};

const priorityConfig: Record<string, { label: string; labelEn: string; bg: string; color: string }> = {
  High: { label: "জরুরি", labelEn: "Urgent", bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400" },
  Medium: { label: "মাঝারি", labelEn: "Medium", bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400" },
  Normal: { label: "সাধারণ", labelEn: "Normal", bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400" },
};

type Tab = "pending" | "processing" | "completed";

export default function OfficerApplicationsPage() {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) || "pending";
  const initialId = searchParams.get("id");
  const initialApp = initialId ? allApplications.find(a => a.id === initialId) || null : null;
  const [activeTab, setActiveTab] = useState<Tab>(initialApp ? initialApp.status as Tab : initialTab);
  const [selectedApp, setSelectedApp] = useState<Application | null>(initialApp);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ citizen: true, documents: false, timeline: false });
  const [notes, setNotes] = useState("");
  const [showSignature, setShowSignature] = useState(false);
  const [actionState, setActionState] = useState<"idle" | "approving" | "rejecting" | "approved" | "rejected" | "needinfo">("idle");
  const [showNeedInfo, setShowNeedInfo] = useState(false);
  const [infoRequest, setInfoRequest] = useState("");

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "pending", label: t("অপেক্ষমাণ", "Pending"), count: allApplications.filter(a => a.status === "pending").length },
    { key: "processing", label: t("প্রক্রিয়াধীন", "Processing"), count: allApplications.filter(a => a.status === "processing").length },
    { key: "completed", label: t("সম্পন্ন", "Done"), count: allApplications.filter(a => a.status === "completed").length },
  ];

  const filtered = allApplications.filter((a) => a.status === activeTab);
  const sorted = [...filtered].sort((a, b) => b.waitDays - a.waitDays);
  const toggleSection = (s: string) => setExpandedSections((p) => ({ ...p, [s]: !p[s] }));

  const handleApprove = () => {
    setShowSignature(false);
    setActionState("approving");
    setTimeout(() => setActionState("approved"), 1500);
  };

  const handleReject = () => {
    setActionState("rejecting");
    setTimeout(() => setActionState("rejected"), 1500);
  };

  // ─── Approved/Rejected/NeedInfo Success State ───
  if (selectedApp && (actionState === "approved" || actionState === "rejected" || actionState === "needinfo")) {
    const isApproved = actionState === "approved";
    const isNeedInfo = actionState === "needinfo";
    const headerGradient = isApproved ? "from-emerald-500 via-green-500 to-teal-500" : isNeedInfo ? "from-blue-500 via-sky-500 to-blue-400" : "from-red-500 via-red-600 to-rose-500";
    const SuccessIcon = isApproved ? CheckCircle2 : isNeedInfo ? Info : XCircle;
    const title = isApproved ? t("অনুমোদন সম্পন্ন!", "Approved!") : isNeedInfo ? t("তথ্য চাওয়া হয়েছে!", "Info Requested!") : t("আবেদন বাতিল!", "Rejected!");

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${headerGradient}`} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="relative flex flex-col items-center pt-16 pb-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                <SuccessIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">{title}</h2>
              <p className="text-white/80 text-sm font-bangla">
                {selectedApp.id} — {t(selectedApp.service, selectedApp.serviceEn)}
              </p>
            </div>
          </div>

          <div className="flex-1 px-6 -mt-3 space-y-4">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bangla">{t("আবেদনকারী", "Applicant")}</span>
                  <span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedApp.applicant, selectedApp.applicantEn)}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bangla">{t("সেবা", "Service")}</span>
                  <span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedApp.service, selectedApp.serviceEn)}</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bangla">{t("অবস্থা", "Status")}</span>
                  <span className={`font-bangla font-bold ${isApproved ? "text-emerald-600" : isNeedInfo ? "text-blue-600" : "text-red-500"}`}>
                    {isApproved ? t("অনুমোদিত ✓ সিল সহ", "Approved ✓ with Seal") : isNeedInfo ? t("আরও তথ্য চাওয়া হয়েছে", "More info requested") : t("বাতিল", "Rejected")}
                  </span>
                </div>
                {(notes || infoRequest) && (
                  <>
                    <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 font-bangla">{isNeedInfo ? t("চাহিত তথ্য", "Requested Info") : t("নোট", "Note")}</span>
                      <span className="text-gray-900 dark:text-white font-bangla text-right max-w-[60%]">{isNeedInfo ? infoRequest : notes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {isApproved && (
              <button
                onClick={() => router.push("/mobile/officer/certificate")}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bangla font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Award className="w-5 h-5" />
                {t("সনদ তৈরি ও প্রেরণ করুন", "Create & Send Certificate")}
              </button>
            )}

            {isNeedInfo && (
              <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-4 flex items-center gap-3">
                <Send className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300 font-bangla">{t("নাগরিককে নোটিফিকেশন পাঠানো হয়েছে", "Notification sent to citizen")}</p>
              </div>
            )}

            <button
              onClick={() => { setSelectedApp(null); setActionState("idle"); setNotes(""); setInfoRequest(""); setShowNeedInfo(false); }}
              className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold text-base bg-white dark:bg-[#1E293B]"
            >
              {t("আবেদন তালিকায় ফিরে যান", "Back to Applications")}
            </button>
          </div>

          <BottomNav role="officer" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Detail View ───
  if (selectedApp) {
    const sc = statusConfig[selectedApp.status];
    const pc = priorityConfig[selectedApp.priority];

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => { setSelectedApp(null); setActionState("idle"); setNotes(""); }} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white font-bangla">{selectedApp.id}</h2>
                  <p className="text-green-100 text-xs font-bangla">{t(selectedApp.service, selectedApp.serviceEn)}</p>
                </div>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bangla font-bold bg-white/20 text-white border border-white/20`}>
                  {t(sc.label, sc.labelEn)}
                </span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0"><User className="w-6 h-6 text-white" /></div>
                <div className="flex-1">
                  <p className="text-white font-bold text-[15px] font-bangla">{t(selectedApp.applicant, selectedApp.applicantEn)}</p>
                  <p className="text-green-100 text-xs font-mono mt-0.5">{selectedApp.phone}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pc.bg} ${pc.color}`}>{t(pc.label, pc.labelEn)}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-2 -mt-1 space-y-3">
            {/* Citizen Info */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl overflow-hidden">
              <button onClick={() => toggleSection("citizen")} className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-2"><User className="w-4.5 h-4.5 text-emerald-500" /><span className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("নাগরিকের তথ্য", "Citizen Info")}</span></div>
                {expandedSections.citizen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.citizen && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-700/50 pt-3">
                  {[[t("নাম","Name"), t(selectedApp.applicant, selectedApp.applicantEn)], [t("ফোন","Phone"), selectedApp.phone], ["NID", selectedApp.nid], [t("পিতা","Father"), selectedApp.fatherName], [t("মাতা","Mother"), selectedApp.motherName], [t("ঠিকানা","Address"), selectedApp.address]].map(([l,v]) => (
                    <div key={l} className="flex justify-between items-center"><span className="text-sm text-gray-400 font-bangla">{l}</span><span className="text-sm text-gray-900 dark:text-white font-bangla font-medium text-right max-w-[55%]">{v}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl overflow-hidden">
              <button onClick={() => toggleSection("documents")} className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-2"><File className="w-4.5 h-4.5 text-emerald-500" /><span className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("কাগজপত্র","Documents")} ({selectedApp.documents.length})</span></div>
                {expandedSections.documents ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.documents && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700/50 pt-3 space-y-2">
                  {selectedApp.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700/50">
                      <FileText className={`w-5 h-5 ${doc.type === "pdf" ? "text-red-500" : "text-blue-500"} shrink-0`} />
                      <span className="text-sm text-gray-900 dark:text-white font-bangla flex-1 truncate">{doc.name}</span>
                      <Download className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl overflow-hidden">
              <button onClick={() => toggleSection("timeline")} className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-2"><Clock className="w-4.5 h-4.5 text-emerald-500" /><span className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("ইতিহাস","History")}</span></div>
                {expandedSections.timeline ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.timeline && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700/50 pt-3">
                  {selectedApp.timeline.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></div>
                        {i < selectedApp.timeline.length - 1 && <div className="w-0.5 h-8 bg-emerald-200 dark:bg-emerald-800" />}
                      </div>
                      <div className="pb-4"><p className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{item.action}</p><p className="text-xs text-gray-400 mt-0.5">{item.time} — {item.by}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Signature + Seal Pad */}
            {showSignature && (
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white font-bangla text-center">{t("স্বাক্ষর ও সিল প্রয়োগ", "Signature & Seal")}</h4>
                {/* Signature Area */}
                <div>
                  <p className="text-xs text-gray-400 font-bangla mb-1.5">{t("স্বাক্ষর", "Signature")}</p>
                  <div className="w-full h-[120px] bg-gray-50 dark:bg-[#0F172A] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-bangla">{t("এখানে স্বাক্ষর করুন", "Sign here")}</span>
                  </div>
                </div>
                {/* Seal Toggle */}
                <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-xl p-3.5">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-white dark:bg-[#1E293B] shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-bangla">{t("সরকারি সিল", "Official Seal")}</p>
                    <p className="text-[11px] text-emerald-500 font-bangla">{t("স্বয়ংক্রিয়ভাবে প্রয়োগ হবে", "Will be applied automatically")}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowSignature(false)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 text-sm font-bangla font-bold">{t("বাতিল", "Cancel")}</button>
                  <button onClick={handleApprove} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />{t("অনুমোদন ও সিল", "Approve & Seal")}
                  </button>
                </div>
              </div>
            )}

            {/* Need Info Form */}
            {showNeedInfo && (
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white font-bangla text-center">{t("কী তথ্য প্রয়োজন?", "What info is needed?")}</h4>
                <div className="space-y-2">
                  {[
                    t("জাতীয় পরিচয়পত্রের স্পষ্ট কপি", "Clear NID copy"),
                    t("সঠিক ঠিকানার প্রমাণ", "Address proof"),
                    t("অতিরিক্ত ছবি প্রয়োজন", "Additional photo needed"),
                    t("জন্ম সনদের মূল কপি", "Original birth certificate"),
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setInfoRequest(item)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bangla transition-all ${
                        infoRequest === item
                          ? "bg-blue-50 dark:bg-blue-900/15 border-2 border-blue-400 text-blue-700 dark:text-blue-300 font-bold"
                          : "bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <textarea
                  value={infoRequest}
                  onChange={(e) => setInfoRequest(e.target.value)}
                  placeholder={t("অথবা নিজে লিখুন...", "Or write your own...")}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 resize-none font-bangla"
                />
                <div className="flex gap-3">
                  <button onClick={() => { setShowNeedInfo(false); setInfoRequest(""); }} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 text-sm font-bangla font-bold">{t("বাতিল", "Cancel")}</button>
                  <button
                    onClick={() => { setShowNeedInfo(false); setActionState("approving"); setTimeout(() => setActionState("needinfo"), 1200); }}
                    disabled={!infoRequest}
                    className="flex-1 py-3 rounded-xl bg-electric-blue text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />{t("পাঠান", "Send")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Bar — only for pending/processing, hide when forms are open */}
          {(selectedApp.status === "pending" || selectedApp.status === "processing") && !showSignature && !showNeedInfo && (
            <div className="sticky bottom-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-700/50 p-4 space-y-3">
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("নোট লিখুন...", "Add notes...")} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 resize-none font-bangla" />
              <div className="flex gap-2">
                <button onClick={() => setShowSignature(true)} disabled={actionState === "approving"} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 disabled:opacity-60">
                  {actionState === "approving" ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><CheckCircle2 className="w-4 h-4" />{t("অনুমোদন", "Approve")}</>}
                </button>
                <button onClick={() => setShowNeedInfo(true)} className="flex-1 py-3 rounded-xl bg-electric-blue text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5">
                  <Info className="w-4 h-4" />{t("তথ্য চাই", "Need Info")}
                </button>
                <button onClick={handleReject} disabled={actionState === "rejecting"} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 disabled:opacity-60">
                  {actionState === "rejecting" ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><XCircle className="w-4 h-4" />{t("বাতিল", "Reject")}</>}
                </button>
              </div>
            </div>
          )}

          {/* Completed — show certificate was sent */}
          {selectedApp.status === "completed" && (
            <div className="px-5 pb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-800/30 flex items-center justify-center shrink-0"><Send className="w-5 h-5 text-emerald-600" /></div>
                <div><p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-bangla">{t("সনদ প্রেরিত", "Certificate Sent")}</p><p className="text-xs text-emerald-500 font-bangla mt-0.5">{t("নাগরিকের অ্যাপে পাঠানো হয়েছে", "Sent to citizen's app")}</p></div>
              </div>
            </div>
          )}

          <BottomNav role="officer" />
        </div>
      </MobileFrame>
    );
  }

  // ─── List View ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => window.history.back()} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-white" /></button>
              <h1 className="text-lg font-bold text-white font-bangla flex-1">{t("আবেদন প্রক্রিয়াকরণ", "Process Applications")}</h1>
            </div>
            <div className="flex gap-1.5 bg-white/10 rounded-xl p-1">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-2.5 rounded-lg text-[11px] font-bangla font-medium transition-all ${activeTab === tab.key ? "bg-white text-emerald-600 shadow-sm font-bold" : "text-white/70"}`}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-3">
          {sorted.map((app) => {
            const sc = statusConfig[app.status];
            const pc = priorityConfig[app.priority];
            return (
              <button key={app.id} onClick={() => setSelectedApp(app)} className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 flex items-center justify-center shrink-0"><User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{t(app.applicant, app.applicantEn)}</p>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${pc.bg} ${pc.color}`}>{t(pc.label, pc.labelEn)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{t(app.service, app.serviceEn)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-400 font-bangla">{app.date}</span>
                      <span className={`text-[11px] font-bangla flex items-center gap-1 ${app.waitDays > 2 ? "text-red-500 font-bold" : "text-gray-400"}`}>
                        <Clock className="w-3 h-3" />
                        {app.waitDays > 0 ? `${app.waitDays} ${t("দিন", "days")}` : t("সম্পন্ন", "Done")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          {sorted.length === 0 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4"><FileText className="w-7 h-7 text-gray-400" /></div>
              <p className="text-gray-400 font-bangla text-sm">{t("কোনো আবেদন নেই", "No applications")}</p>
            </div>
          )}
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

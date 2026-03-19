"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  ArrowLeft,
  Route,
  Droplets,
  Zap,
  Trash2,
  Phone,
  Star,
  Clock,
  CheckCircle2,
  Circle,
  MapPin,
  ChevronRight,
  MessageSquare,
  User,
  AlertTriangle,
  Send,
} from "lucide-react";

type Complaint = {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  categoryGradient: string;
  categoryBg: string;
  description: string;
  location: string;
  ward: string;
  date: string;
  status: "প্রক্রিয়াধীন" | "সমাধান হয়েছে" | "দায়িত্ব প্রদান";
  progress: number;
  isEmergency: boolean;
  assignedTo: { name: string; role: string; phone: string };
  estimatedTime: string;
  timeline: { step: string; time: string; status: "completed" | "current" | "future" }[];
};

const complaints: Complaint[] = [
  {
    id: "CMP-2026-00892",
    category: "রাস্তা",
    categoryIcon: Route,
    categoryGradient: "from-orange-500 to-amber-500",
    categoryBg: "bg-orange-50 dark:bg-orange-950/30",
    description: "বাজার রোডে বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে। বিশেষ করে রাতের বেলা দুর্ঘটনার ঝুঁকি আছে।",
    location: "বাজার রোড",
    ward: "ওয়ার্ড ৩",
    date: "১৮ মার্চ ২০২৬",
    status: "প্রক্রিয়াধীন",
    progress: 60,
    isEmergency: false,
    assignedTo: { name: "জাহাঙ্গীর আলম", role: "মাঠকর্মী", phone: "০১৭১২৩৪৫৬৭৮" },
    estimatedTime: "২-৩ কার্যদিবস",
    timeline: [
      { step: "অভিযোগ গৃহীত", time: "১৮ মার্চ, সকাল ১০:৩০", status: "completed" },
      { step: "দায়িত্ব প্রদান", time: "১৮ মার্চ, দুপুর ২:১৫", status: "completed" },
      { step: "কাজ চলছে", time: "১৯ মার্চ, সকাল ৯:০০", status: "current" },
      { step: "সমাধান সম্পন্ন", time: "", status: "future" },
    ],
  },
  {
    id: "CMP-2026-00878",
    category: "পানি",
    categoryIcon: Droplets,
    categoryGradient: "from-cyan-500 to-blue-500",
    categoryBg: "bg-cyan-50 dark:bg-cyan-950/30",
    description: "গত ২ দিন ধরে পানি সরবরাহ বন্ধ আছে। পরিবারে ছোট বাচ্চা আছে, পানি খুব জরুরি।",
    location: "স্টেশন রোড",
    ward: "ওয়ার্ড ৩",
    date: "১৫ মার্চ ২০২৬",
    status: "সমাধান হয়েছে",
    progress: 100,
    isEmergency: true,
    assignedTo: { name: "কামরুল হাসান", role: "পানি বিভাগ", phone: "০১৮১২৩৪৫৬৭৮" },
    estimatedTime: "সমাধান হয়েছে",
    timeline: [
      { step: "অভিযোগ গৃহীত", time: "১৫ মার্চ, সকাল ৮:০০", status: "completed" },
      { step: "জরুরি দায়িত্ব প্রদান", time: "১৫ মার্চ, সকাল ৮:৩০", status: "completed" },
      { step: "মেরামত সম্পন্ন", time: "১৫ মার্চ, দুপুর ১:০০", status: "completed" },
      { step: "সমাধান নিশ্চিত", time: "১৫ মার্চ, বিকাল ৩:০০", status: "completed" },
    ],
  },
  {
    id: "CMP-2026-00865",
    category: "বিদ্যুৎ",
    categoryIcon: Zap,
    categoryGradient: "from-yellow-500 to-amber-500",
    categoryBg: "bg-yellow-50 dark:bg-yellow-950/30",
    description: "রাস্তার ল্যাম্পপোস্ট ভাঙা, রাতে অন্ধকার থাকে।",
    location: "কলেজ রোড",
    ward: "ওয়ার্ড ৫",
    date: "১০ মার্চ ২০২৬",
    status: "দায়িত্ব প্রদান",
    progress: 35,
    isEmergency: false,
    assignedTo: { name: "রফিকুল ইসলাম", role: "বিদ্যুৎ বিভাগ", phone: "০১৯১২৩৪৫৬৭৮" },
    estimatedTime: "৫-৭ কার্যদিবস",
    timeline: [
      { step: "অভিযোগ গৃহীত", time: "১০ মার্চ, বিকাল ৪:৩০", status: "completed" },
      { step: "দায়িত্ব প্রদান", time: "১১ মার্চ, সকাল ১০:০০", status: "current" },
      { step: "কাজ শুরু", time: "", status: "future" },
      { step: "সমাধান সম্পন্ন", time: "", status: "future" },
    ],
  },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  "প্রক্রিয়াধীন": { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", dot: "bg-blue-400" },
  "সমাধান হয়েছে": { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", dot: "bg-emerald-400" },
  "দায়িত্ব প্রদান": { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", dot: "bg-amber-400" },
};

export default function ComplaintTrackingPage() {
  const { t } = useLang();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showResolved, setShowResolved] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ─── Detail View ───
  if (selectedComplaint) {
    const cfg = statusConfig[selectedComplaint.status];
    const CatIcon = selectedComplaint.categoryIcon;
    const completedSteps = selectedComplaint.timeline.filter((t) => t.status === "completed").length;

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />

            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-base font-bold text-white font-bangla flex-1">{t("অভিযোগের বিবরণ", "Complaint Details")}</h2>
                {selectedComplaint.isEmergency && (
                  <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-100 text-[10px] font-bangla font-bold border border-red-400/30">
                    {t("জরুরি", "Emergency")}
                  </span>
                )}
              </div>

              {/* Complaint Summary Card */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedComplaint.categoryGradient} flex items-center justify-center shadow-lg`}>
                    <CatIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[15px] font-bangla">{selectedComplaint.category}</h3>
                    <p className="text-blue-100 text-xs font-mono mt-0.5">{selectedComplaint.id}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bangla font-bold bg-white/20 text-white border border-white/20`}>
                    {selectedComplaint.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-blue-100 text-[10px] font-bangla">{t("অগ্রগতি", "Progress")}</span>
                  <span className="text-white text-xs font-bold">{completedSteps}/{selectedComplaint.timeline.length} {t("ধাপ", "steps")}</span>
                </div>
                <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-white transition-all" style={{ width: `${selectedComplaint.progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-1 space-y-4">
            {/* Complaint Details */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-3 uppercase tracking-wider">{t("বিবরণ", "Description")}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-bangla leading-relaxed mb-4">{selectedComplaint.description}</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-bangla">{t("অবস্থান", "Location")}</span>
                  <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-electric-blue" />
                    {selectedComplaint.location}, {selectedComplaint.ward}
                  </span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-bangla">{t("দাখিলের তারিখ", "Filed Date")}</span>
                  <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{selectedComplaint.date}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">অভিযোগের অগ্রগতি</h3>
              <div className="space-y-0">
                {selectedComplaint.timeline.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {step.status === "completed" ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                      ) : step.status === "current" ? (
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 ring-2 ring-blue-300 dark:ring-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-[#1E293B]">
                          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <Circle className="w-4 h-4 text-gray-300 dark:text-gray-500" />
                        </div>
                      )}
                      {i < selectedComplaint.timeline.length - 1 && (
                        <div className={`w-0.5 h-10 ${step.status === "completed" ? "bg-emerald-200 dark:bg-emerald-800" : "bg-gray-200 dark:bg-gray-700"}`} />
                      )}
                    </div>
                    <div className="pb-5 pt-1">
                      <p className={`text-sm font-bangla font-medium ${
                        step.status === "future" ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"
                      }`}>{step.step}</p>
                      {step.time && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{step.time}</p>}
                      {step.status === "current" && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bangla font-bold">
                          বর্তমান ধাপ
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Staff */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">দায়িত্বপ্রাপ্ত কর্মকর্তা</h3>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white font-bangla font-bold">{selectedComplaint.assignedTo.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-bangla">{selectedComplaint.assignedTo.role}</p>
                </div>
                <a
                  href={`tel:${selectedComplaint.assignedTo.phone}`}
                  className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Estimated Time or Resolution */}
            {selectedComplaint.status !== "সমাধান হয়েছে" ? (
              <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 font-bangla">আনুমানিক সমাধান</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400/70 font-bangla mt-0.5">{selectedComplaint.estimatedTime}</p>
                </div>
              </div>
            ) : (
              /* Rating Section for resolved */
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-1 text-center">সমাধান কেমন হয়েছে?</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-bangla mb-4 text-center">আপনার মতামত আমাদের সেবা উন্নত করতে সাহায্য করবে</p>
                <div className="flex items-center gap-3 justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-9 h-9 ${
                          star <= rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm font-bangla font-bold mb-4 text-amber-500">
                    {rating <= 2 ? "আরো ভালো করার চেষ্টা করব" : rating <= 4 ? "ধন্যবাদ!" : "চমৎকার! আপনাকে ধন্যবাদ"}
                  </p>
                )}
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all resize-none"
                  placeholder="আপনার মতামত লিখুন (ঐচ্ছিক)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button className="w-full mt-3 py-3.5 rounded-2xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                  <Send className="w-4 h-4" />
                  মতামত জমা দিন
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
  const activeCount = complaints.filter((c) => c.status !== "সমাধান হয়েছে").length;
  const resolvedCount = complaints.filter((c) => c.status === "সমাধান হয়েছে").length;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/mobile/citizen/complaint" className="w-9 h-9 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 flex items-center justify-center shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-bangla">
              আমার অভিযোগসমূহ
            </h1>
          </div>

          {/* Summary */}
          <div className="flex gap-3 mb-1">
            <div className="flex-1 bg-blue-50 dark:bg-blue-900/15 rounded-xl px-4 py-3 border border-blue-100 dark:border-blue-800/30">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeCount}</p>
              <p className="text-[11px] text-blue-500 dark:text-blue-400/70 font-bangla font-medium">চলমান</p>
            </div>
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl px-4 py-3 border border-emerald-100 dark:border-emerald-800/30">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{resolvedCount}</p>
              <p className="text-[11px] text-emerald-500 dark:text-emerald-400/70 font-bangla font-medium">সমাধান হয়েছে</p>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700/50">
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{complaints.length}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bangla font-medium">মোট</p>
            </div>
          </div>
        </div>

        {/* Complaint List */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
          {complaints.map((complaint) => {
            const cfg = statusConfig[complaint.status];
            const CatIcon = complaint.categoryIcon;
            return (
              <button
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl overflow-hidden transition-all hover:shadow-md active:scale-[0.98]"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3.5">
                    {/* Category Icon */}
                    <div className={`w-12 h-12 rounded-xl ${complaint.categoryBg} flex items-center justify-center shrink-0`}>
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${complaint.categoryGradient} flex items-center justify-center`}>
                        <CatIcon className="w-4.5 h-4.5 text-white" />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla">
                            {complaint.category}
                          </h3>
                          {complaint.isEmergency && (
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                          )}
                        </div>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bangla font-bold shrink-0 ${cfg.bg} ${cfg.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla line-clamp-1 mb-2">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{complaint.location}
                          </span>
                          <span className="text-[11px] text-gray-400 dark:text-gray-500">{complaint.date}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2.5">
                        <div
                          className={`h-full rounded-full transition-all ${
                            complaint.progress === 100 ? "bg-emerald-400" : complaint.progress >= 50 ? "bg-blue-400" : "bg-amber-400"
                          }`}
                          style={{ width: `${complaint.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* New Complaint Button */}
          <Link
            href="/mobile/citizen/complaint"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-electric-blue/30 dark:border-electric-blue/20 text-electric-blue font-bangla font-bold text-sm hover:bg-electric-blue/5 transition-colors"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            নতুন অভিযোগ দাখিল করুন
          </Link>
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

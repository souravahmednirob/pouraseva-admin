"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  Megaphone,
  Pin,
  X,
  Share2,
  ChevronLeft,
  AlertTriangle,
  Info,
  Bell,
} from "lucide-react";

const filters = ["সব", "গুরুত্বপূর্ণ", "জরুরি", "ওয়ার্ড-নির্দিষ্ট"];

type Notice = {
  id: number;
  title: string;
  date: string;
  preview: string;
  fullText: string;
  type: "emergency" | "important" | "normal";
  ward?: string;
  pinned: boolean;
  publishedBy: string;
};

const notices: Notice[] = [
  {
    id: 1,
    title: "জরুরি: বন্যা সতর্কতা জারি",
    date: "২০২৬-০৩-০৫",
    preview:
      "আগামী ২৪ ঘণ্টায় ভারী বর্ষণের পূর্বাভাস। নিচু এলাকার বাসিন্দাদের সতর্ক থাকার...",
    fullText:
      "আগামী ২৪ ঘণ্টায় ভারী বর্ষণের পূর্বাভাস দেওয়া হয়েছে। নিচু এলাকার বাসিন্দাদের সতর্ক থাকার জন্য অনুরোধ করা হচ্ছে। প্রয়োজনে জরুরি হেল্পলাইনে যোগাযোগ করুন: ০১৭XX-XXXXXX। আশ্রয়কেন্দ্র প্রস্তুত রাখা হয়েছে।",
    type: "emergency",
    pinned: true,
    publishedBy: "পৌরসভা দুর্যোগ ব্যবস্থাপনা সেল",
  },
  {
    id: 2,
    title: "জরুরি: পানি সরবরাহ বন্ধ থাকবে",
    date: "২০২৬-০৩-০৪",
    preview:
      "আগামীকাল সকাল ৮টা থেকে বিকাল ৪টা পর্যন্ত মেরামত কাজের জন্য পানি সরবরাহ...",
    fullText:
      "আগামীকাল সকাল ৮টা থেকে বিকাল ৪টা পর্যন্ত মেরামত কাজের জন্য পানি সরবরাহ বন্ধ থাকবে। দয়া করে আগে থেকেই পানি সংরক্ষণ করে রাখুন। অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।",
    type: "emergency",
    pinned: true,
    publishedBy: "পৌরসভা পানি বিভাগ",
  },
  {
    id: 3,
    title: "গুরুত্বপূর্ণ: হোল্ডিং ট্যাক্স জমার শেষ তারিখ",
    date: "২০২৬-০৩-০৩",
    preview:
      "চলতি অর্থবছরের হোল্ডিং ট্যাক্স জমা দেওয়ার শেষ তারিখ ৩১ মার্চ...",
    fullText:
      "চলতি অর্থবছরের হোল্ডিং ট্যাক্স জমা দেওয়ার শেষ তারিখ ৩১ মার্চ ২০২৬। নির্ধারিত সময়ের মধ্যে ট্যাক্স জমা না দিলে বিলম্ব ফি যুক্ত হবে। অনলাইনে অথবা পৌরসভা কার্যালয়ে সরাসরি জমা দেওয়া যাবে।",
    type: "important",
    pinned: false,
    publishedBy: "পৌরসভা রাজস্ব বিভাগ",
  },
  {
    id: 4,
    title: "ওয়ার্ড ৩: রাস্তা মেরামত কাজ শুরু",
    date: "২০২৬-০৩-০১",
    preview:
      "ওয়ার্ড ৩ এর প্রধান সড়কে মেরামত কাজ শুরু হয়েছে। বিকল্প রাস্তা ব্যবহার...",
    fullText:
      "ওয়ার্ড ৩ এর প্রধান সড়কে মেরামত কাজ শুরু হয়েছে। কাজ সম্পন্ন হতে আনুমানিক ১৫ দিন সময় লাগবে। এই সময়ে দয়া করে বিকল্প রাস্তা ব্যবহার করুন। কাজ সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত চলবে।",
    type: "normal",
    ward: "ওয়ার্ড ৩",
    pinned: false,
    publishedBy: "পৌরসভা প্রকৌশল বিভাগ",
  },
  {
    id: 5,
    title: "গুরুত্বপূর্ণ: টিকাদান কর্মসূচি",
    date: "২০২৬-০২-২৮",
    preview:
      "আগামী সপ্তাহে সকল ওয়ার্ডে শিশু টিকাদান কর্মসূচি পরিচালিত হবে...",
    fullText:
      "আগামী সপ্তাহে সকল ওয়ার্ডে শিশু টিকাদান কর্মসূচি পরিচালিত হবে। ০-৫ বছর বয়সী সকল শিশুকে নিকটতম স্বাস্থ্যকেন্দ্রে নিয়ে আসার জন্য অভিভাবকদের অনুরোধ করা হচ্ছে। টিকাদান বিনামূল্যে প্রদান করা হবে।",
    type: "important",
    ward: "সকল ওয়ার্ড",
    pinned: false,
    publishedBy: "পৌরসভা স্বাস্থ্য বিভাগ",
  },
];

export default function NoticesPage() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("সব");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter((n) => {
    if (activeFilter === "সব") return true;
    if (activeFilter === "জরুরি") return n.type === "emergency";
    if (activeFilter === "গুরুত্বপূর্ণ") return n.type === "important";
    if (activeFilter === "ওয়ার্ড-নির্দিষ্ট") return !!n.ward;
    return true;
  });

  const sorted = [...filteredNotices].sort((a, b) =>
    a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1
  );

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-electric-blue" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              {t("নোটিশ বোর্ড", "Notice Board")}
            </h1>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bangla whitespace-nowrap transition-colors ${
                  activeFilter === f
                    ? "bg-electric-blue text-white"
                    : "bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {f === "সব" ? t("সব", "All") : f === "গুরুত্বপূর্ণ" ? t("গুরুত্বপূর্ণ", "Important") : f === "জরুরি" ? t("জরুরি", "Emergency") : t("ওয়ার্ড-নির্দিষ্ট", "Ward Specific")}
              </button>
            ))}
          </div>
        </div>

        {/* Notice List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {sorted.map((notice) => (
            <button
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none p-3 rounded-xl border-l-4 ${
                notice.type === "emergency"
                  ? "border-l-bloody-red"
                  : notice.type === "important"
                  ? "border-l-electric-blue"
                  : "border-l-gray-300 dark:border-l-gray-600"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla leading-snug flex-1">
                  {notice.pinned && (
                    <Pin className="w-3 h-3 text-bloody-red inline mr-1" />
                  )}
                  {notice.title}
                </h3>
                {notice.type === "emergency" && (
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-[10px] rounded-full font-bangla whitespace-nowrap">
                    {t("জরুরি", "Emergency")}
                  </span>
                )}
                {notice.type === "important" && (
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] rounded-full font-bangla whitespace-nowrap">
                    {t("গুরুত্বপূর্ণ", "Important")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{notice.date}</span>
                {notice.ward && (
                  <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-electric-blue/10 text-blue-600 dark:text-electric-blue text-[10px] rounded-full font-bangla">
                    {notice.ward}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-bangla leading-relaxed line-clamp-2">
                {notice.preview}
              </p>
              <span className="text-[10px] text-electric-blue font-bangla mt-1.5 inline-block">
                {t("বিস্তারিত পড়ুন", "Read More")}
              </span>
            </button>
          ))}
        </div>

        {/* Detail Overlay */}
        {selectedNotice && (
          <div className="absolute inset-0 bg-[#F0F7FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-md z-40 flex flex-col">
            <div className="px-4 pt-4 pb-3 flex items-center gap-3">
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla flex-1">
                {t("নোটিশ বিস্তারিত", "Notice Details")}
              </h2>
              <button className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-electric-blue" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="flex items-center gap-2 mb-3">
                {selectedNotice.type === "emergency" && (
                  <AlertTriangle className="w-5 h-5 text-bloody-red" />
                )}
                {selectedNotice.type === "important" && (
                  <Info className="w-5 h-5 text-electric-blue" />
                )}
                {selectedNotice.type === "normal" && (
                  <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
                {selectedNotice.type === "emergency" && (
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs rounded-full font-bangla">
                    {t("জরুরি", "Emergency")}
                  </span>
                )}
                {selectedNotice.type === "important" && (
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-bangla">
                    {t("গুরুত্বপূর্ণ", "Important")}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla mb-2 leading-snug">
                {selectedNotice.title}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedNotice.date}
                </span>
                {selectedNotice.ward && (
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-electric-blue/10 text-blue-600 dark:text-electric-blue text-xs rounded-full font-bangla">
                    {selectedNotice.ward}
                  </span>
                )}
              </div>
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 font-bangla leading-relaxed">
                  {selectedNotice.fullText}
                </p>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 font-bangla">
                <span className="text-gray-300 dark:text-gray-600">{t("প্রকাশক", "Published By")}:</span>{" "}
                {selectedNotice.publishedBy}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 font-bangla mt-1">
                <span className="text-gray-300 dark:text-gray-600">{t("প্রকাশের তারিখ", "Published Date")}:</span>{" "}
                {selectedNotice.date}
              </div>
            </div>
          </div>
        )}

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

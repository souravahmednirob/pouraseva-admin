"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  Folder,
  FileText,
  Briefcase,
  Receipt,
  Download,
  Share2,
  QrCode,
  X,
} from "lucide-react";

const categoryTabs = [
  "সব",
  "জন্ম/মৃত্যু সনদ",
  "ট্রেড লাইসেন্স",
  "পেমেন্ট রসিদ",
];

type Document = {
  id: number;
  name: string;
  category: string;
  issueDate: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
};

const documents: Document[] = [
  {
    id: 1,
    name: "জন্ম নিবন্ধন সনদ",
    category: "জন্ম/মৃত্যু সনদ",
    issueDate: "২০২৬-০৩-০৩",
    icon: FileText,
    iconColor: "text-success",
  },
  {
    id: 2,
    name: "মৃত্যু সনদ - আব্দুল করিম",
    category: "জন্ম/মৃত্যু সনদ",
    issueDate: "২০২৫-০৮-১৫",
    icon: FileText,
    iconColor: "text-gray-500 dark:text-gray-400",
  },
  {
    id: 3,
    name: "ট্রেড লাইসেন্স - রহিম স্টোর",
    category: "ট্রেড লাইসেন্স",
    issueDate: "২০২৬-০১-১০",
    icon: Briefcase,
    iconColor: "text-electric-blue",
  },
  {
    id: 4,
    name: "ট্রেড লাইসেন্স নবায়ন",
    category: "ট্রেড লাইসেন্স",
    issueDate: "২০২৬-০৩-০১",
    icon: Briefcase,
    iconColor: "text-sky-blue",
  },
  {
    id: 5,
    name: "হোল্ডিং ট্যাক্স রসিদ",
    category: "পেমেন্ট রসিদ",
    issueDate: "২০২৬-০২-১৫",
    icon: Receipt,
    iconColor: "text-warning",
  },
  {
    id: 6,
    name: "পানির বিল রসিদ - ফেব্রুয়ারি",
    category: "পেমেন্ট রসিদ",
    issueDate: "২০২৬-০২-২৮",
    icon: Receipt,
    iconColor: "text-success",
  },
];

export default function DocumentsPage() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("সব");
  const [showQR, setShowQR] = useState<Document | null>(null);

  const filtered = documents.filter((d) => {
    if (activeCategory === "সব") return true;
    return d.category === activeCategory;
  });

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-5 h-5 text-electric-blue" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              {t("আমার দলিলপত্র", "My Documents")}
            </h1>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-bangla whitespace-nowrap transition-colors ${
                  activeCategory === tab
                    ? "bg-electric-blue text-white"
                    : "bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {tab === "সব" ? t("সব", "All") : tab === "জন্ম/মৃত্যু সনদ" ? t("জন্ম/মৃত্যু সনদ", "Birth/Death Cert") : tab === "ট্রেড লাইসেন্স" ? t("ট্রেড লাইসেন্স", "Trade License") : t("পেমেন্ট রসিদ", "Payment Receipts")}
              </button>
            ))}
          </div>
        </div>

        {/* Document Grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 dark:bg-[#0F172A] mb-2 mx-auto">
{(() => { const Icon = (doc as any).icon; return <Icon className={`w-5 h-5 ${doc.iconColor}`} />; })()}
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white font-bangla text-center leading-snug mb-1 line-clamp-2">
                  {doc.name}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mb-3">
                  {doc.issueDate}
                </p>
                <div className="flex items-center justify-center gap-2 border-t border-gray-100 dark:border-gray-700 pt-2">
                  <button className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-[#0F172A] flex items-center justify-center">
                    <Download className="w-3.5 h-3.5 text-electric-blue" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-[#0F172A] flex items-center justify-center">
                    <Share2 className="w-3.5 h-3.5 text-sky-blue" />
                  </button>
                  <button
                    onClick={() => setShowQR(doc)}
                    className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-[#0F172A] flex items-center justify-center"
                  >
                    <QrCode className="w-3.5 h-3.5 text-success" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl p-6 w-full max-w-[280px] relative">
              <button
                onClick={() => setShowQR(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#0F172A] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex flex-col items-center">
                {/* QR Code Placeholder */}
                <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center mb-4">
                  <div className="w-32 h-32 bg-white rounded-lg border-2 border-gray-200 grid grid-cols-5 grid-rows-5 gap-0.5 p-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          [0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 20, 22, 23, 24].includes(i)
                            ? "bg-gray-900"
                            : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla text-center mb-1">
                  {showQR.name}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla text-center">
                  {t("স্ক্যান করে যাচাই করুন", "Scan to Verify")}
                </p>
              </div>
            </div>
          </div>
        )}

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

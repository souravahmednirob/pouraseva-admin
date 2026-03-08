"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowLeft,
  Search,
  CreditCard,
  Smartphone,
  Download,
  Share2,
  X,
  AlertTriangle,
} from "lucide-react";

const taxYears = [
  { year: "2021", amount: 12000, lateFee: true },
  { year: "2022", amount: 11000, lateFee: true },
  { year: "2023", amount: 12000, lateFee: true },
  { year: "2024", amount: 10000, lateFee: false },
];

const paymentMethods = [
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "rocket", label: "Rocket" },
  { id: "card", label: "Card" },
];

export default function TaxPaymentPage() {
  const [holdingNo, setHoldingNo] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const toggleAll = () => {
    if (selectedYears.length === taxYears.length) {
      setSelectedYears([]);
    } else {
      setSelectedYears(taxYears.map((t) => t.year));
    }
  };

  const totalSelected = taxYears
    .filter((t) => selectedYears.includes(t.year))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <MobileFrame>
      <div className="flex flex-col h-full pb-0 relative">
        {/* Receipt Overlay */}
        {showReceipt && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-sm flex flex-col items-center justify-center px-6">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-2xl p-6 w-full space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-lg">
                  পেমেন্ট রসিদ
                </h3>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">
                    Transaction ID
                  </span>
                  <span className="text-gray-900 dark:text-white font-mono">TXN-20240115-7842</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">পরিমাণ</span>
                  <span className="text-electric-blue font-bold">
                    ৳{totalSelected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">তারিখ</span>
                  <span className="text-gray-900 dark:text-white">২০২৪-০১-১৫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">হোল্ডিং নম্বর</span>
                  <span className="text-gray-900 dark:text-white">KL-2024-0123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">মালিক</span>
                  <span className="text-gray-900 dark:text-white font-bangla">
                    মোহাম্মদ রহিম উদ্দিন
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> রসিদ ডাউনলোড
                </button>
                <button className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> শেয়ার
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="px-4 pt-2 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/mobile/citizen/services" className="text-gray-500 dark:text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              হোল্ডিং ট্যাক্স পরিশোধ
            </h1>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:border-electric-blue"
              placeholder="হোল্ডিং নম্বর লিখুন"
              value={holdingNo}
              onChange={(e) => setHoldingNo(e.target.value)}
            />
            <button
              onClick={() => setShowResult(true)}
              className="bg-electric-blue text-white px-4 rounded-lg flex items-center gap-1 font-bangla text-sm"
            >
              <Search className="w-4 h-4" /> তথ্য দেখুন
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {showResult && (
            <div className="space-y-4">
              {/* Property Card */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">হোল্ডিং</span>
                  <span className="text-gray-900 dark:text-white font-mono">KL-2024-0123</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">মালিক</span>
                  <span className="text-gray-900 dark:text-white font-bangla">
                    মোহাম্মদ রহিম উদ্দিন
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">ঠিকানা</span>
                  <span className="text-gray-900 dark:text-white font-bangla">
                    বাজার রোড, ওয়ার্ড ৩
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla text-sm">
                    মোট বকেয়া
                  </span>
                  <span className="text-2xl font-bold text-bloody-red">
                    ৳45,000
                  </span>
                </div>
              </div>

              {/* Select All */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-bangla">
                  বছর অনুযায়ী ট্যাক্স
                </span>
                <button
                  onClick={toggleAll}
                  className="text-electric-blue text-xs font-bangla"
                >
                  {selectedYears.length === taxYears.length
                    ? "সব বাদ দিন"
                    : "সব নির্বাচন করুন"}
                </button>
              </div>

              {/* Tax Years */}
              <div className="space-y-2">
                {taxYears.map((t) => (
                  <button
                    key={t.year}
                    onClick={() => toggleYear(t.year)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedYears.includes(t.year)
                        ? "border-electric-blue bg-blue-50 dark:bg-electric-blue/10"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedYears.includes(t.year)
                          ? "border-electric-blue bg-electric-blue"
                          : "border-gray-400 dark:border-gray-500"
                      }`}
                    >
                      {selectedYears.includes(t.year) && (
                        <span className="text-white text-xs">&#10003;</span>
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">{t.year}</span>
                    <div className="flex-1" />
                    {t.lateFee && (
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                    )}
                    <span className="text-gray-900 dark:text-white font-semibold">
                      ৳{t.amount.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Total */}
              {selectedYears.length > 0 && (
                <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">
                    মোট নির্বাচিত
                  </span>
                  <span className="text-2xl font-bold text-electric-blue">
                    ৳{totalSelected.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2">
                  পেমেন্ট পদ্ধতি
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setSelectedPayment(pm.id)}
                      className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                        selectedPayment === pm.id
                          ? "border-electric-blue bg-blue-50 dark:bg-electric-blue/10 text-electric-blue"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {pm.id === "card" ? (
                        <CreditCard className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={() => setShowReceipt(true)}
                disabled={selectedYears.length === 0}
                className="w-full bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold py-3 rounded-xl disabled:opacity-40"
              >
                পেমেন্ট করুন ৳{totalSelected.toLocaleString()}
              </button>
            </div>
          )}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

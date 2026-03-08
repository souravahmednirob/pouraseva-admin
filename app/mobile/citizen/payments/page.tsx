"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  CreditCard,
  Landmark,
  Droplets,
  FileText,
  AlertTriangle,
  X,
  Download,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const typeFilters = ["সব", "ট্যাক্স", "পানি", "ফি", "জরিমানা"];

type Payment = {
  id: number;
  serviceName: string;
  transactionId: string;
  date: string;
  time: string;
  amount: string;
  type: "ট্যাক্স" | "পানি" | "ফি" | "জরিমানা";
  status: "সফল" | "ব্যর্থ";
  method: string;
  details: { label: string; value: string }[];
};

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  ট্যাক্স: { icon: Landmark, color: "text-success", bgColor: "bg-green-50 dark:bg-green-900/20" },
  পানি: { icon: Droplets, color: "text-electric-blue", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  ফি: { icon: FileText, color: "text-warning", bgColor: "bg-yellow-50 dark:bg-yellow-900/20" },
  জরিমানা: { icon: AlertTriangle, color: "text-bloody-red", bgColor: "bg-red-50 dark:bg-red-900/20" },
};

const payments: Payment[] = [
  {
    id: 1,
    serviceName: "হোল্ডিং ট্যাক্স",
    transactionId: "TXN-20260305-001",
    date: "২০২৬-০৩-০৫",
    time: "সকাল ১০:৩০",
    amount: "৳৫,৫০০",
    type: "ট্যাক্স",
    status: "সফল",
    method: "বিকাশ",
    details: [
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "অর্থবছর", value: "২০২৫-২৬" },
    ],
  },
  {
    id: 2,
    serviceName: "পানির বিল - মার্চ",
    transactionId: "TXN-20260304-012",
    date: "২০২৬-০৩-০৪",
    time: "দুপুর ২:১৫",
    amount: "৳৮৫০",
    type: "পানি",
    status: "সফল",
    method: "নগদ",
    details: [
      { label: "মিটার নং", value: "WM-1234" },
      { label: "ইউনিট", value: "১৫ ঘনমিটার" },
    ],
  },
  {
    id: 3,
    serviceName: "ট্রেড লাইসেন্স ফি",
    transactionId: "TXN-20260303-005",
    date: "২০২৬-০৩-০৩",
    time: "সকাল ১১:০০",
    amount: "৳৩,০০০",
    type: "ফি",
    status: "সফল",
    method: "বিকাশ",
    details: [
      { label: "লাইসেন্স নং", value: "TL-2024-1234" },
      { label: "ধরন", value: "নবায়ন" },
    ],
  },
  {
    id: 4,
    serviceName: "বিলম্ব জরিমানা",
    transactionId: "TXN-20260302-008",
    date: "২০২৬-০৩-০২",
    time: "বিকাল ৪:৪৫",
    amount: "৳১,২০০",
    type: "জরিমানা",
    status: "ব্যর্থ",
    method: "রকেট",
    details: [
      { label: "কারণ", value: "হোল্ডিং ট্যাক্স বিলম্ব" },
      { label: "মেয়াদ", value: "৩ মাস" },
    ],
  },
  {
    id: 5,
    serviceName: "পানির বিল - ফেব্রুয়ারি",
    transactionId: "TXN-20260228-003",
    date: "২০২৬-০২-২৮",
    time: "সকাল ৯:০০",
    amount: "৳৭৫০",
    type: "পানি",
    status: "সফল",
    method: "নগদ",
    details: [
      { label: "মিটার নং", value: "WM-1234" },
      { label: "ইউনিট", value: "১২ ঘনমিটার" },
    ],
  },
  {
    id: 6,
    serviceName: "জন্ম নিবন্ধন ফি",
    transactionId: "TXN-20260225-007",
    date: "২০২৬-০২-২৫",
    time: "দুপুর ১:৩০",
    amount: "৳৫০",
    type: "ফি",
    status: "সফল",
    method: "বিকাশ",
    details: [
      { label: "সেবা", value: "জন্ম নিবন্ধন সনদ" },
      { label: "আবেদন নং", value: "APP-2026-00451" },
    ],
  },
  {
    id: 7,
    serviceName: "হোল্ডিং ট্যাক্স (আংশিক)",
    transactionId: "TXN-20260220-002",
    date: "২০২৬-০২-২০",
    time: "সকাল ১১:৩০",
    amount: "৳৫,০০০",
    type: "ট্যাক্স",
    status: "সফল",
    method: "ব্যাংক ট্রান্সফার",
    details: [
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "কিস্তি", value: "১ম কিস্তি" },
    ],
  },
  {
    id: 8,
    serviceName: "পরিচ্ছন্নতা ফি",
    transactionId: "TXN-20260215-009",
    date: "২০২৬-০২-১৫",
    time: "বিকাল ৩:০০",
    amount: "৳৭,১৫০",
    type: "ফি",
    status: "সফল",
    method: "নগদ",
    details: [
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
      { label: "মেয়াদ", value: "জানু-মার্চ ২০২৬" },
    ],
  },
];

export default function PaymentsPage() {
  const [activeType, setActiveType] = useState("সব");
  const [selectedMonth, setSelectedMonth] = useState("২০২৬-০৩");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filtered = payments.filter((p) => {
    if (activeType !== "সব" && p.type !== activeType) return false;
    return true;
  });

  const totalAmount = "২৩,৫০০";
  const totalCount = "৫";

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-electric-blue" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              পেমেন্ট ইতিহাস
            </h1>
          </div>

          {/* Month Selector */}
          <div className="mb-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white text-xs font-bangla rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-electric-blue"
            >
              <option value="২০২৬-০৩">মার্চ ২০২৬</option>
              <option value="২০২৬-০২">ফেব্রুয়ারি ২০২৬</option>
              <option value="২০২৬-০১">জানুয়ারি ২০২৬</option>
            </select>
          </div>

          {/* Type Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveType(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bangla whitespace-nowrap transition-colors ${
                  activeType === f
                    ? "bg-electric-blue text-white"
                    : "bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-4 mb-3">
          <div className="flex gap-3">
            <div className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla mb-1">
                এই মাসে মোট
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">৳{totalAmount}</p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla mb-1">
                লেনদেন
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{totalCount} টি</p>
            </div>
          </div>
        </div>

        {/* Payment List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {filtered.map((payment) => {
            const config = (typeConfig as any)[payment.type];
            const Icon = config.icon;
            return (
              <button
                key={payment.id}
                onClick={() => setSelectedPayment(payment)}
                className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla truncate">
                    {payment.serviceName}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                    {payment.transactionId}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla">
                    {payment.date} | {payment.time}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-bold ${
                      payment.status === "সফল"
                        ? "text-success"
                        : "text-bloody-red"
                    }`}
                  >
                    {payment.amount}
                  </p>
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] rounded-full font-bangla ${
                      payment.status === "সফল"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Receipt Overlay */}
        {selectedPayment && (
          <div className="absolute inset-x-0 bottom-0 top-1/4 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-700 rounded-t-3xl z-40 shadow-2xl dark:shadow-none flex flex-col animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">
                লেনদেনের বিবরণ
              </h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-7 h-7 rounded-full bg-gray-100 dark:bg-[#0F172A] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Status Icon */}
              <div className="flex flex-col items-center mb-2">
                {selectedPayment.status === "সফল" ? (
                  <CheckCircle2 className="w-12 h-12 text-success mb-2" />
                ) : (
                  <XCircle className="w-12 h-12 text-bloody-red mb-2" />
                )}
                <p
                  className={`text-2xl font-bold ${
                    selectedPayment.status === "সফল"
                      ? "text-success"
                      : "text-bloody-red"
                  }`}
                >
                  {selectedPayment.amount}
                </p>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-bangla mt-1 ${
                    selectedPayment.status === "সফল"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                  }`}
                >
                  {selectedPayment.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2.5 bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700 rounded-xl p-3">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">সেবা</span>
                  <span className="text-xs text-gray-900 dark:text-white font-bangla">
                    {selectedPayment.serviceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                    ট্রানজেকশন আইডি
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white font-mono">
                    {selectedPayment.transactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                    তারিখ ও সময়
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white font-bangla">
                    {selectedPayment.date}, {selectedPayment.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                    পেমেন্ট মাধ্যম
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white font-bangla">
                    {selectedPayment.method}
                  </span>
                </div>
                {selectedPayment.details.map((d, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                      {d.label}
                    </span>
                    <span className="text-xs text-gray-900 dark:text-white font-bangla">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white text-sm font-bold font-bangla blue-glow flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                রসিদ ডাউনলোড
              </button>
            </div>
          </div>
        )}

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

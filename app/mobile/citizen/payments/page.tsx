"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Droplets,
  FileText,
  AlertTriangle,
  X,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  ArrowDownToLine,
  ChevronDown,
  Wallet,
} from "lucide-react";

const typeFilters = [
  { label: "সব", count: 8 },
  { label: "ট্যাক্স", count: 2 },
  { label: "পানি", count: 2 },
  { label: "ফি", count: 3 },
  { label: "জরিমানা", count: 1 },
];

type Payment = {
  id: number;
  serviceName: string;
  transactionId: string;
  date: string;
  time: string;
  amount: string;
  amountNum: number;
  type: "ট্যাক্স" | "পানি" | "ফি" | "জরিমানা";
  status: "সফল" | "ব্যর্থ";
  method: string;
  methodIcon: string;
  details: { label: string; value: string }[];
};

const typeConfig: Record<string, { icon: React.ElementType; gradient: string; bg: string; color: string }> = {
  ট্যাক্স: { icon: Landmark, gradient: "from-emerald-500 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", color: "text-emerald-600 dark:text-emerald-400" },
  পানি: { icon: Droplets, gradient: "from-cyan-500 to-blue-500", bg: "bg-cyan-50 dark:bg-cyan-950/30", color: "text-cyan-600 dark:text-cyan-400" },
  ফি: { icon: FileText, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/30", color: "text-amber-600 dark:text-amber-400" },
  জরিমানা: { icon: AlertTriangle, gradient: "from-red-500 to-rose-500", bg: "bg-red-50 dark:bg-red-950/30", color: "text-red-600 dark:text-red-400" },
};

const payments: Payment[] = [
  {
    id: 1, serviceName: "হোল্ডিং ট্যাক্স", transactionId: "TXN-20260305-001",
    date: "২০২৬-০৩-০৫", time: "সকাল ১০:৩০", amount: "৳৫,৫০০", amountNum: 5500,
    type: "ট্যাক্স", status: "সফল", method: "বিকাশ", methodIcon: "bK",
    details: [{ label: "হোল্ডিং নং", value: "H-0345" }, { label: "অর্থবছর", value: "২০২৫-২৬" }],
  },
  {
    id: 2, serviceName: "পানির বিল - মার্চ", transactionId: "TXN-20260304-012",
    date: "২০২৬-০৩-০৪", time: "দুপুর ২:১৫", amount: "৳৮৫০", amountNum: 850,
    type: "পানি", status: "সফল", method: "নগদ", methodIcon: "Ng",
    details: [{ label: "মিটার নং", value: "WM-1234" }, { label: "ইউনিট", value: "১৫ ঘনমিটার" }],
  },
  {
    id: 3, serviceName: "ট্রেড লাইসেন্স ফি", transactionId: "TXN-20260303-005",
    date: "২০২৬-০৩-০৩", time: "সকাল ১১:০০", amount: "৳৩,০০০", amountNum: 3000,
    type: "ফি", status: "সফল", method: "বিকাশ", methodIcon: "bK",
    details: [{ label: "লাইসেন্স নং", value: "TL-2024-1234" }, { label: "ধরন", value: "নবায়ন" }],
  },
  {
    id: 4, serviceName: "বিলম্ব জরিমানা", transactionId: "TXN-20260302-008",
    date: "২০২৬-০৩-০২", time: "বিকাল ৪:৪৫", amount: "৳১,২০০", amountNum: 1200,
    type: "জরিমানা", status: "ব্যর্থ", method: "রকেট", methodIcon: "Rk",
    details: [{ label: "কারণ", value: "হোল্ডিং ট্যাক্স বিলম্ব" }, { label: "মেয়াদ", value: "৩ মাস" }],
  },
  {
    id: 5, serviceName: "পানির বিল - ফেব্রুয়ারি", transactionId: "TXN-20260228-003",
    date: "২০২৬-০২-২৮", time: "সকাল ৯:০০", amount: "৳৭৫০", amountNum: 750,
    type: "পানি", status: "সফল", method: "নগদ", methodIcon: "Ng",
    details: [{ label: "মিটার নং", value: "WM-1234" }, { label: "ইউনিট", value: "১২ ঘনমিটার" }],
  },
  {
    id: 6, serviceName: "জন্ম নিবন্ধন ফি", transactionId: "TXN-20260225-007",
    date: "২০২৬-০২-২৫", time: "দুপুর ১:৩০", amount: "৳৫০", amountNum: 50,
    type: "ফি", status: "সফল", method: "বিকাশ", methodIcon: "bK",
    details: [{ label: "সেবা", value: "জন্ম নিবন্ধন সনদ" }, { label: "আবেদন নং", value: "APP-2026-00451" }],
  },
  {
    id: 7, serviceName: "হোল্ডিং ট্যাক্স (আংশিক)", transactionId: "TXN-20260220-002",
    date: "২০২৬-০২-২০", time: "সকাল ১১:৩০", amount: "৳৫,০০০", amountNum: 5000,
    type: "ট্যাক্স", status: "সফল", method: "ব্যাংক", methodIcon: "Bk",
    details: [{ label: "হোল্ডিং নং", value: "H-0345" }, { label: "কিস্তি", value: "১ম কিস্তি" }],
  },
  {
    id: 8, serviceName: "পরিচ্ছন্নতা ফি", transactionId: "TXN-20260215-009",
    date: "২০২৬-০২-১৫", time: "বিকাল ৩:০০", amount: "৳৭,১৫০", amountNum: 7150,
    type: "ফি", status: "সফল", method: "নগদ", methodIcon: "Ng",
    details: [{ label: "ওয়ার্ড", value: "ওয়ার্ড ৩" }, { label: "মেয়াদ", value: "জানু-মার্চ ২০২৬" }],
  },
];

export default function PaymentsPage() {
  const { t } = useLang();
  const [activeType, setActiveType] = useState("সব");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filtered = payments.filter((p) => {
    if (activeType !== "সব" && p.type !== activeType) return false;
    return true;
  });

  const successTotal = payments.filter((p) => p.status === "সফল").reduce((s, p) => s + p.amountNum, 0);
  const failedTotal = payments.filter((p) => p.status === "ব্যর্থ").reduce((s, p) => s + p.amountNum, 0);
  const successCount = payments.filter((p) => p.status === "সফল").length;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* ─── Hero Header ─── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative px-5 pt-4 pb-6">
            <div className="flex items-center gap-3 mb-5">
              <Link href="/mobile/citizen/home" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <h1 className="text-lg font-bold text-white font-bangla flex-1">{t("পেমেন্ট ইতিহাস", "Payment History")}</h1>
              <Wallet className="w-5 h-5 text-white/60" />
            </div>

            {/* Summary Stats */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3.5 border border-white/15">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <p className="text-blue-100 text-[10px] font-bangla">{t("মোট পরিশোধ", "Total Paid")}</p>
                </div>
                <span className="text-2xl font-bold text-white">৳{successTotal.toLocaleString()}</span>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3.5 border border-white/15">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <p className="text-blue-100 text-[10px] font-bangla">{t("সফল", "Successful")}</p>
                </div>
                <span className="text-2xl font-bold text-white">{successCount} টি</span>
              </div>
              {failedTotal > 0 && (
                <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3.5 border border-red-400/20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingDown className="w-3.5 h-3.5 text-red-300" />
                    <p className="text-blue-100 text-[10px] font-bangla">{t("ব্যর্থ", "Failed")}</p>
                  </div>
                  <span className="text-2xl font-bold text-red-200">৳{failedTotal.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Filters ─── */}
        <div className="px-5 -mt-1 mb-3">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-3">
            <div className="flex gap-1.5">
              {typeFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setActiveType(f.label)}
                  className={`flex-1 py-2 rounded-xl text-[11px] font-bangla font-medium transition-all ${
                    activeType === f.label
                      ? "bg-electric-blue text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  {f.label === "সব" ? t("সব", "All") : f.label === "ট্যাক্স" ? t("ট্যাক্স", "Tax") : f.label === "পানি" ? t("পানি", "Water") : f.label === "ফি" ? t("ফি", "Fees") : t("জরিমানা", "Fines")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Payment List ─── */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5">
          {filtered.map((payment) => {
            const config = typeConfig[payment.type];
            const Icon = config.icon;
            return (
              <button
                key={payment.id}
                onClick={() => setSelectedPayment(payment)}
                className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:shadow-md active:scale-[0.98]"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[14px] font-bold text-gray-900 dark:text-white font-bangla truncate">
                      {payment.serviceName}
                    </h3>
                    <p className={`text-[15px] font-bold shrink-0 ${payment.status === "সফল" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                      {payment.amount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-2">
                      {/* Method badge */}
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        {payment.methodIcon}
                      </span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">{payment.date}</span>
                    </div>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bangla font-bold ${
                      payment.status === "সফল"
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${payment.status === "সফল" ? "bg-emerald-400" : "bg-red-400"}`} />
                      {payment.status === "সফল" ? t("সফল", "Successful") : t("ব্যর্থ", "Failed")}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── Receipt Bottom Sheet ─── */}
        {selectedPayment && (
          <div className="absolute inset-0 z-40 flex flex-col">
            {/* Backdrop */}
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPayment(null)} />
            {/* Sheet */}
            <div className="bg-white dark:bg-[#1E293B] rounded-t-3xl border-t border-gray-200 dark:border-gray-700 shadow-2xl">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              </div>

              <div className="px-5 pb-8 space-y-5">
                {/* Status Header */}
                <div className="flex flex-col items-center pt-2">
                  {selectedPayment.status === "সফল" ? (
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
                      <XCircle className="w-9 h-9 text-red-500" />
                    </div>
                  )}
                  <p className={`text-3xl font-bold ${selectedPayment.status === "সফল" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                    {selectedPayment.amount}
                  </p>
                  <span className={`mt-1.5 px-3 py-1 rounded-full text-xs font-bangla font-bold ${
                    selectedPayment.status === "সফল"
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                  }`}>
                    {selectedPayment.status === "সফল" ? t("পেমেন্ট সফল হয়েছে", "Payment Successful") : t("পেমেন্ট ব্যর্থ হয়েছে", "Payment Failed")}
                  </span>
                </div>

                {/* Details Card */}
                <div className="bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 font-bangla">{t("সেবা", "Service")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{selectedPayment.serviceName}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 font-bangla">{t("ট্রানজেকশন আইডি", "Transaction ID")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-mono">{selectedPayment.transactionId}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 font-bangla">{t("তারিখ ও সময়", "Date & Time")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-bangla">{selectedPayment.date}, {selectedPayment.time}</span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 font-bangla">{t("পেমেন্ট মাধ্যম", "Payment Method")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{selectedPayment.method}</span>
                  </div>
                  {selectedPayment.details.map((d, i) => (
                    <div key={i}>
                      <div className="h-px bg-gray-200 dark:bg-gray-700/50" />
                      <div className="flex justify-between items-center pt-3">
                        <span className="text-sm text-gray-400 font-bangla">{d.label}</span>
                        <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{d.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-electric-blue to-sky-blue text-white text-sm font-bold font-bangla shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                    <ArrowDownToLine className="w-4.5 h-4.5" />
                    {t("রসিদ ডাউনলোড", "Download Receipt")}
                  </button>
                  <button className="w-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-[#1E293B]">
                    <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

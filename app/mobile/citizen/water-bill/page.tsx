"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  ArrowLeft,
  Search,
  CreditCard,
  Smartphone,
  Download,
  Share2,
  X,
  Droplets,
} from "lucide-react";

type Bill = {
  month: string;
  amount: number;
  dueDate: string;
  status: "overdue" | "due-soon" | "paid";
  meterReading: string;
};

const mockBills: Bill[] = [
  { month: "জানুয়ারি ২০২৪", amount: 850, dueDate: "৩১ জানুয়ারি", status: "overdue", meterReading: "4521-4598" },
  { month: "ফেব্রুয়ারি ২০২৪", amount: 920, dueDate: "২৮ ফেব্রুয়ারি", status: "overdue", meterReading: "4598-4670" },
  { month: "মার্চ ২০২৪", amount: 780, dueDate: "৩১ মার্চ", status: "overdue", meterReading: "4670-4730" },
  { month: "এপ্রিল ২০২৪", amount: 900, dueDate: "৩০ এপ্রিল", status: "due-soon", meterReading: "4730-4810" },
  { month: "মে ২০২৪", amount: 860, dueDate: "৩১ মে", status: "paid", meterReading: "4810-4880" },
  { month: "জুন ২০২৪", amount: 950, dueDate: "৩০ জুন", status: "paid", meterReading: "4880-4965" },
];

const statusLabel: Record<string, string> = {
  overdue: "বকেয়া",
  "due-soon": "শীঘ্রই দেয়",
  paid: "পরিশোধিত",
};

const statusColor: Record<string, string> = {
  overdue: "text-bloody-red",
  "due-soon": "text-warning",
  paid: "text-success",
};

const paymentMethods = [
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "rocket", label: "Rocket" },
  { id: "card", label: "Card" },
];

export default function WaterBillPage() {
  const { t } = useLang();
  const [meterNo, setMeterNo] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const unpaidBills = mockBills.filter((b) => b.status !== "paid");

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const toggleAll = () => {
    if (selectedMonths.length === unpaidBills.length) {
      setSelectedMonths([]);
    } else {
      setSelectedMonths(unpaidBills.map((b) => b.month));
    }
  };

  const totalSelected = mockBills
    .filter((b) => selectedMonths.includes(b.month))
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <MobileFrame>
      <div className="flex flex-col h-full pb-0 relative">
        {/* Receipt Overlay */}
        {showReceipt && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-sm flex flex-col items-center justify-center px-6">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-2xl p-6 w-full space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-lg">
                  {t("পেমেন্ট রসিদ", "Payment Receipt")}
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
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">Transaction ID</span>
                  <span className="text-gray-900 dark:text-white font-mono">TXN-20240120-3291</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("পরিমাণ", "Amount")}</span>
                  <span className="text-electric-blue font-bold">
                    ৳{totalSelected.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("তারিখ", "Date")}</span>
                  <span className="text-gray-900 dark:text-white">২০২৪-০১-২০</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("মিটার নম্বর", "Meter No")}</span>
                  <span className="text-gray-900 dark:text-white font-mono">WM-2024-5678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">গ্রাহক</span>
                  <span className="text-gray-900 dark:text-white font-bangla">
                    আবদুল করিম
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">মিটার রিডিং</span>
                  <span className="text-gray-900 dark:text-white font-mono">4521-4810</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> {t("রসিদ ডাউনলোড", "Download Receipt")}
                </button>
                <button className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> {t("শেয়ার", "Share")}
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
              {t("পানির বিল পরিশোধ", "Water Bill Payment")}
            </h1>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:border-electric-blue"
              placeholder={t("মিটার নম্বর লিখুন", "Enter meter number")}
              value={meterNo}
              onChange={(e) => setMeterNo(e.target.value)}
            />
            <button
              onClick={() => setShowResult(true)}
              className="bg-electric-blue text-white px-4 rounded-lg flex items-center gap-1 font-bangla text-sm"
            >
              <Search className="w-4 h-4" /> {t("খুঁজুন", "Search")}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {showResult && (
            <div className="space-y-4">
              {/* Consumer Info */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-sky-blue" />
                  <h3 className="text-gray-900 dark:text-white font-bangla font-semibold">
                    {t("গ্রাহকের তথ্য", "Consumer Info")}
                  </h3>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("নাম", "Name")}</span>
                  <span className="text-gray-900 dark:text-white font-bangla">আবদুল করিম</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("মিটার নম্বর", "Meter No")}</span>
                  <span className="text-gray-900 dark:text-white font-mono">WM-2024-5678</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">{t("ঠিকানা", "Address")}</span>
                  <span className="text-gray-900 dark:text-white font-bangla">
                    স্টেশন রোড, ওয়ার্ড ৫
                  </span>
                </div>
              </div>

              {/* Select All */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-bangla">
                  {t("মাসিক বিলের তালিকা", "Monthly Bills")}
                </span>
                <button
                  onClick={toggleAll}
                  className="text-electric-blue text-xs font-bangla"
                >
                  {selectedMonths.length === unpaidBills.length
                    ? t("সব বাদ দিন", "Deselect All")
                    : t("সব নির্বাচন করুন", "Select All")}
                </button>
              </div>

              {/* Bills List */}
              <div className="space-y-2">
                {mockBills.map((bill) => (
                  <button
                    key={bill.month}
                    onClick={() =>
                      bill.status !== "paid" && toggleMonth(bill.month)
                    }
                    disabled={bill.status === "paid"}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      selectedMonths.includes(bill.month)
                        ? "border-electric-blue bg-blue-50 dark:bg-electric-blue/10"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B]"
                    } ${bill.status === "paid" ? "opacity-50" : ""}`}
                  >
                    {bill.status !== "paid" && (
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedMonths.includes(bill.month)
                            ? "border-electric-blue bg-electric-blue"
                            : "border-gray-400 dark:border-gray-500"
                        }`}
                      >
                        {selectedMonths.includes(bill.month) && (
                          <span className="text-white text-xs">&#10003;</span>
                        )}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 dark:text-white text-sm font-bangla">
                        {bill.month}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">
                        {t("শেষ তারিখ", "Due Date")}: {bill.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 dark:text-white font-semibold text-sm">
                        ৳{bill.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-bangla ${statusColor[bill.status]}`}
                      >
                        {bill.status === "overdue" ? t("বকেয়া", "Overdue") : bill.status === "due-soon" ? t("শীঘ্রই দেয়", "Due Soon") : t("পরিশোধিত", "Paid")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Total */}
              {selectedMonths.length > 0 && (
                <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 font-bangla">
                    {t("মোট নির্বাচিত", "Total Selected")}
                  </span>
                  <span className="text-2xl font-bold text-electric-blue">
                    ৳{totalSelected.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2">
                  {t("পেমেন্ট পদ্ধতি", "Payment Method")}
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
                disabled={selectedMonths.length === 0}
                className="w-full bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold py-3 rounded-xl disabled:opacity-40"
              >
                {t("পেমেন্ট করুন", "Pay Now")} ৳{totalSelected.toLocaleString()}
              </button>
            </div>
          )}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

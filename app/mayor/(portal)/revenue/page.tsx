"use client";

import { useState } from "react";
import {
  Download,
  FileText,
  TrendingUp,
  Droplets,
  Home,
  DollarSign,
  Send,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const wardRevenueData = [
  { ward: "ওয়ার্ড ১", holdingTax: 520000, waterBill: 180000, others: 95000 },
  { ward: "ওয়ার্ড ২", holdingTax: 480000, waterBill: 160000, others: 78000 },
  { ward: "ওয়ার্ড ৩", holdingTax: 610000, waterBill: 210000, others: 120000 },
  { ward: "ওয়ার্ড ৪", holdingTax: 390000, waterBill: 140000, others: 65000 },
  { ward: "ওয়ার্ড ৫", holdingTax: 550000, waterBill: 195000, others: 88000 },
  { ward: "ওয়ার্ড ৬", holdingTax: 470000, waterBill: 170000, others: 72000 },
  { ward: "ওয়ার্ড ৭", holdingTax: 430000, waterBill: 155000, others: 69000 },
  { ward: "ওয়ার্ড ৮", holdingTax: 510000, waterBill: 185000, others: 91000 },
  { ward: "ওয়ার্ড ৯", holdingTax: 460000, waterBill: 165000, others: 76000 },
];

const paymentMethodData = [
  { name: "বিকাশ", value: 35, color: "#E2136E" },
  { name: "নগদ", value: 25, color: "#F59E0B" },
  { name: "ব্যাংক", value: 20, color: "#2563EB" },
  { name: "রকেট", value: 12, color: "#8B5CF6" },
  { name: "কাউন্টার", value: 8, color: "#10B981" },
];

interface OutstandingDue {
  holdingNo: string;
  ownerName: string;
  ward: number;
  amount: number;
  yearsDue: number;
}

const outstandingDues: OutstandingDue[] = [
  { holdingNo: "HLD-001-045", ownerName: "আফজাল হোসেন", ward: 1, amount: 85000, yearsDue: 4 },
  { holdingNo: "HLD-003-112", ownerName: "শামীমা আক্তার", ward: 3, amount: 42000, yearsDue: 2 },
  { holdingNo: "HLD-005-078", ownerName: "মোস্তফা করিম", ward: 5, amount: 120000, yearsDue: 5 },
  { holdingNo: "HLD-002-033", ownerName: "রাবেয়া খাতুন", ward: 2, amount: 28000, yearsDue: 1 },
  { holdingNo: "HLD-007-091", ownerName: "সেলিম রেজা", ward: 7, amount: 67000, yearsDue: 3 },
  { holdingNo: "HLD-004-056", ownerName: "নাজমুল হক", ward: 4, amount: 95000, yearsDue: 4 },
  { holdingNo: "HLD-009-021", ownerName: "ফিরোজা বেগম", ward: 9, amount: 15000, yearsDue: 1 },
];

const statCards = [
  { title: "মোট রাজস্ব", amount: "৳ ৮৫,৪২,০০০", change: "+১২.৫%", icon: DollarSign, color: "text-success" },
  { title: "হোল্ডিং ট্যাক্স", amount: "৳ ৪৪,২০,০০০", change: "+৮.৩%", icon: Home, color: "text-blue-600 dark:text-blue-400" },
  { title: "পানির বিল", amount: "৳ ১৫,৬০,০০০", change: "+৫.১%", icon: Droplets, color: "text-sky-blue" },
  { title: "অন্যান্য ফি", amount: "৳ ৭,৫৪,০০০", change: "+১৫.২%", icon: FileText, color: "text-warning" },
];

export default function RevenuePage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-03");

  return (
    <div className="space-y-6 font-bangla">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
          />
          <button className="bg-electric-blue hover:bg-electric-blue/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            রিপোর্ট তৈরি করুন
          </button>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors">
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{card.amount}</p>
            <p className="text-success text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {card.change} গত মাসের তুলনায়
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacked Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-5">
          <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">ওয়ার্ড ভিত্তিক রাজস্ব</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={wardRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-[#1E3A5F]" />
              <XAxis dataKey="ward" tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-tooltip-bg, #fff)",
                  border: "1px solid var(--color-tooltip-border, #E2E8F0)",
                  borderRadius: "8px",
                  color: "var(--color-tooltip-text, #1E293B)",
                }}
              />
              <Legend wrapperStyle={{ color: "#94A3B8" }} />
              <Bar dataKey="holdingTax" name="হোল্ডিং ট্যাক্স" stackId="a" fill="#2563EB" radius={[0, 0, 0, 0]} />
              <Bar dataKey="waterBill" name="পানির বিল" stackId="a" fill="#3B82F6" />
              <Bar dataKey="others" name="অন্যান্য" stackId="a" fill="#60A5FA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-5">
          <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4">পেমেন্ট মাধ্যম</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                stroke="none"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-tooltip-bg, #fff)",
                  border: "1px solid var(--color-tooltip-border, #E2E8F0)",
                  borderRadius: "8px",
                  color: "var(--color-tooltip-text, #1E293B)",
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`${value}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {paymentMethodData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outstanding Dues Table */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-gray-900 dark:text-gray-100 font-semibold">বকেয়া তালিকা</h3>
          <span className="text-gray-500 dark:text-gray-400 text-sm">{outstandingDues.length} টি বকেয়া</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="p-4 text-left">হোল্ডিং নম্বর</th>
                <th className="p-4 text-left">মালিকের নাম</th>
                <th className="p-4 text-left">ওয়ার্ড</th>
                <th className="p-4 text-left">বকেয়া পরিমাণ</th>
                <th className="p-4 text-left">বছর</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {outstandingDues.map((due) => (
                <tr
                  key={due.holdingNo}
                  className={`border-b border-gray-100 dark:border-gray-700/50 transition-colors ${
                    due.yearsDue > 2 ? "bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20" : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <td className="p-4 text-blue-600 dark:text-blue-400 font-mono">{due.holdingNo}</td>
                  <td className="p-4 text-gray-900 dark:text-gray-100">{due.ownerName}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">ওয়ার্ড {due.ward}</td>
                  <td className={`p-4 font-medium ${due.yearsDue > 2 ? "text-red-600 dark:text-red-400" : "text-yellow-700 dark:text-yellow-300"}`}>
                    ৳ {due.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        due.yearsDue > 2
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                      }`}
                    >
                      {due.yearsDue} বছর
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 text-sm">
                      <Send className="w-3 h-3" />
                      রিমাইন্ডার
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

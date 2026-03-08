"use client";

import {
  FileText,
  DollarSign,
  MessageSquareWarning,
  ShieldAlert,
  MapPin,
  Clock,
  CheckCircle,
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
  Cell,
} from "recharts";

// --- Mock Data ---

const revenueData = [
  { week: "Week 1", thisMonth: 185000, lastMonth: 142000 },
  { week: "Week 2", thisMonth: 215000, lastMonth: 178000 },
  { week: "Week 3", thisMonth: 198000, lastMonth: 165000 },
  { week: "Week 4", thisMonth: 240000, lastMonth: 195000 },
];

const wardComplaints = [
  { ward: "Ward 1", complaints: 12 },
  { ward: "Ward 2", complaints: 8 },
  { ward: "Ward 3", complaints: 18 },
  { ward: "Ward 4", complaints: 5 },
  { ward: "Ward 5", complaints: 15 },
  { ward: "Ward 6", complaints: 9 },
  { ward: "Ward 7", complaints: 22 },
  { ward: "Ward 8", complaints: 11 },
  { ward: "Ward 9", complaints: 7 },
];

const pendingApprovals = [
  { id: "APP-2024-0891", type: "Trade License Renewal", applicant: "Md. Karim Uddin", date: "05 Mar 2026" },
  { id: "APP-2024-0892", type: "Building Plan Approval", applicant: "Fatema Begum", date: "04 Mar 2026" },
  { id: "APP-2024-0893", type: "Water Connection", applicant: "Abdul Hossain", date: "04 Mar 2026" },
  { id: "APP-2024-0894", type: "Birth Certificate", applicant: "Nasima Akter", date: "03 Mar 2026" },
  { id: "APP-2024-0895", type: "Road Repair Budget", applicant: "Ward 5 Councillor", date: "03 Mar 2026" },
];

const emergencyComplaints = [
  {
    id: "CMP-0451",
    title: "Main road waterlogging - severe",
    location: "Ward 3, Bazar Road",
    time: "35 minutes ago",
  },
  {
    id: "CMP-0449",
    title: "Broken water pipeline flooding",
    location: "Ward 7, School Para",
    time: "2 hours ago",
  },
  {
    id: "CMP-0447",
    title: "Drainage collapse near hospital",
    location: "Ward 1, Hospital Road",
    time: "4 hours ago",
  },
];

const WARD_COLORS = [
  "#2563EB", "#3B82F6", "#10B981", "#F59E0B", "#DC143C",
  "#8B5CF6", "#06B6D4", "#EC4899", "#F97316",
];

// --- Helper ---

function getBengaliDate(): string {
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
  ];
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const today = new Date();
  const day = String(today.getDate())
    .split("")
    .map((d) => digits[Number(d)])
    .join("");
  const year = String(today.getFullYear())
    .split("")
    .map((d) => digits[Number(d)])
    .join("");
  return `${day} ${months[today.getMonth()]} ${year}`;
}

// --- Component ---

export default function MayorDashboard() {
  const stats = [
    {
      label: "আজকের আবেদন",
      value: "২৭",
      icon: FileText,
      color: "text-sky-blue",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "আজকের পেমেন্ট",
      value: "৳ ১,৮৫,০০০",
      icon: DollarSign,
      color: "text-success",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "অমীমাংসিত অভিযোগ",
      value: "৪৩",
      icon: MessageSquareWarning,
      color: "text-warning",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      label: "Mayor Approval Pending",
      value: "5",
      icon: ShieldAlert,
      color: "text-bloody-red",
      bg: "bg-red-100 dark:bg-red-900/30",
      pulse: true,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-bangla">
          স্বাগতম, মাননীয় মেয়র
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-bangla">{getBengaliDate()}</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.pulse ? "animate-pulse" : ""}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100 font-bangla">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Comparison */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue Comparison</h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">This Month vs Last Month (Weekly)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-[#1E3A5F]" />
              <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-tooltip-bg, #fff)",
                  border: "1px solid var(--color-tooltip-border, #E2E8F0)",
                  borderRadius: "8px",
                  color: "var(--color-tooltip-text, #1E293B)",
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`৳ ${Number(value).toLocaleString()}`]}
              />
              <Legend />
              <Bar dataKey="thisMonth" name="This Month" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lastMonth" name="Last Month" fill="#93C5FD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ward-wise Complaints */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Ward-wise Complaints</h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Active complaints by ward</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wardComplaints} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-[#1E3A5F]" />
              <XAxis type="number" stroke="#94A3B8" fontSize={12} />
              <YAxis dataKey="ward" type="category" stroke="#94A3B8" fontSize={12} width={60} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-tooltip-bg, #fff)",
                  border: "1px solid var(--color-tooltip-border, #E2E8F0)",
                  borderRadius: "8px",
                  color: "var(--color-tooltip-text, #1E293B)",
                }}
              />
              <Bar dataKey="complaints" name="Complaints" radius={[0, 4, 4, 0]}>
                {wardComplaints.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={WARD_COLORS[index % WARD_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Mayor Approvals */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Pending Mayor Approvals</h2>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-electric-blue font-mono">{item.id}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-gray-100 font-medium truncate">{item.type}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.applicant}</p>
                </div>
                <button className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Complaints */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Emergency Complaints</h2>
          <div className="space-y-3">
            {emergencyComplaints.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-bloody-red/40"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-bloody-red" />
                  <span className="text-xs font-mono text-bloody-red">{item.id}</span>
                </div>
                <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">{item.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

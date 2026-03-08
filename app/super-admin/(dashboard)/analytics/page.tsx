"use client";

import { useState } from "react";
import {
  DollarSign,
  Receipt,
  CreditCard,
  Landmark,
  FileDown,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data
const revenueByPourashava = [
  { name: "Kaliakair", revenue: 2450000 },
  { name: "Savar", revenue: 1980000 },
  { name: "Tongi", revenue: 1750000 },
  { name: "Gazipur", revenue: 1620000 },
  { name: "Narsingdi", revenue: 1340000 },
  { name: "Manikganj", revenue: 1120000 },
];

const paymentMethodData = [
  { name: "bKash", value: 42, color: "#E2136E" },
  { name: "Nagad", value: 28, color: "#F6921E" },
  { name: "Card", value: 18, color: "#2563EB" },
  { name: "Rocket", value: 12, color: "#8B5CF6" },
];

const dailyApplications = [
  { day: "Mon", applications: 124 },
  { day: "Tue", applications: 158 },
  { day: "Wed", applications: 142 },
  { day: "Thu", applications: 189 },
  { day: "Fri", applications: 167 },
  { day: "Sat", applications: 98 },
  { day: "Sun", applications: 72 },
];

const topServices = [
  { service: "Birth Certificate", count: 3240 },
  { service: "Trade License", count: 2180 },
  { service: "Holding Tax", count: 1950 },
  { service: "Water Bill", count: 1720 },
  { service: "Death Certificate", count: 890 },
  { service: "Building Permit", count: 640 },
];

const complaintsOverTime = [
  { month: "Aug", total: 120, resolved: 98 },
  { month: "Sep", total: 145, resolved: 118 },
  { month: "Oct", total: 132, resolved: 125 },
  { month: "Nov", total: 168, resolved: 140 },
  { month: "Dec", total: 155, resolved: 148 },
  { month: "Jan", total: 178, resolved: 160 },
];

const revenueStats = [
  { label: "Total Revenue", value: "৳1,02,60,000", icon: DollarSign, change: "+14%" },
  { label: "Tax Collected", value: "৳58,40,000", icon: Landmark, change: "+9%" },
  { label: "Bills Paid", value: "৳32,80,000", icon: Receipt, change: "+18%" },
  { label: "Other Fees", value: "৳11,40,000", icon: CreditCard, change: "+6%" },
];

const complaintStats = [
  { label: "Total Complaints", value: "898", icon: MessageSquare, color: "text-blue-500 dark:text-blue-400" },
  { label: "Resolved", value: "789", icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
  { label: "Pending", value: "109", icon: AlertTriangle, color: "text-yellow-600 dark:text-yellow-400" },
  { label: "Avg Resolution", value: "2.4 days", icon: Clock, color: "text-blue-600 dark:text-blue-400" },
];

const chartTooltipStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "8px",
  color: "var(--text-primary)",
};

export default function GlobalAnalyticsPage() {
  const [dateFrom, setDateFrom] = useState("2025-07-01");
  const [dateTo, setDateTo] = useState("2026-01-31");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Global Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Platform-wide performance metrics and insights
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-gray-500 dark:text-gray-400 text-sm">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-electric-blue transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-500 dark:text-gray-400 text-sm">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-electric-blue transition-colors"
            />
          </div>
          <button className="bg-gradient-to-r from-electric-blue to-sky-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Apply
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <FileDown className="w-4 h-4" />
            PDF
          </button>
          <button className="flex items-center gap-2 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Section 1: Revenue Analytics */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-5 text-blue-600 dark:text-blue-400">Revenue Analytics</h2>

        {/* Revenue Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {revenueStats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 group hover:blue-glow transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center blue-glow">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart - Revenue by Pourashava */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue by Top Pourashavas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByPourashava} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(v) => `৳${(v / 100000).toFixed(0)}L`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={12}
                  width={90}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value: any) => [`৳${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#2563EB" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart - Payment Methods */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue by Payment Method</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value: any) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Service Analytics */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-5 text-blue-600 dark:text-blue-400">Service Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Daily Applications */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Daily Applications (This Week)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyApplications}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value: any) => [value, "Applications"]}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", r: 5 }}
                  activeDot={{ r: 7, fill: "#2563EB" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Horizontal Bar Chart - Top Services */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Services by Applications</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="service"
                  stroke="#94A3B8"
                  fontSize={11}
                  width={110}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value: any) => [value.toLocaleString(), "Applications"]}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 3: Complaint Analytics */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-5 text-blue-600 dark:text-blue-400">Complaint Analytics</h2>

        {/* Complaint Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {complaintStats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 group hover:blue-glow transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Area Chart - Complaints Over Time */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Complaints Over Time</h3>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={complaintsOverTime}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC143C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#DC143C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend
                wrapperStyle={{ color: "#94A3B8", fontSize: "12px" }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#DC143C"
                strokeWidth={2}
                fill="url(#totalGradient)"
                name="Total Complaints"
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#resolvedGradient)"
                name="Resolved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

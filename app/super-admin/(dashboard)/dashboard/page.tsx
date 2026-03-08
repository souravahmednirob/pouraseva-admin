"use client";

import {
  Building2,
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Bell,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Total Pourashavas",
    value: "1",
    change: "+0%",
    trend: "up",
    icon: Building2,
    note: "Pilot: Kaliakair",
  },
  {
    label: "Registered Citizens",
    value: "12,450",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Monthly Revenue",
    value: "24,50,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    prefix: "৳",
  },
  {
    label: "Pending Applications",
    value: "145",
    change: "-5%",
    trend: "down",
    icon: FileText,
  },
];

const revenueData = [
  { month: "Aug", amount: 1800000 },
  { month: "Sep", amount: 2100000 },
  { month: "Oct", amount: 1950000 },
  { month: "Nov", amount: 2300000 },
  { month: "Dec", amount: 2150000 },
  { month: "Jan", amount: 2450000 },
];

const recentActivity = [
  { user: "Rahim Uddin", action: "Birth certificate approved", time: "2 min ago", initials: "RU" },
  { user: "Fatema Begum", action: "Tax payment received - ৳12,500", time: "15 min ago", initials: "FB" },
  { user: "Kamal Hossain", action: "Complaint submitted - Road damage", time: "32 min ago", initials: "KH" },
  { user: "Nasrin Akter", action: "Trade license application", time: "1 hr ago", initials: "NA" },
  { user: "Jamal Mia", action: "Water bill payment - ৳2,300", time: "2 hr ago", initials: "JM" },
];

const topPourashavas = [
  { name: "Kaliakair", citizens: "12,450", revenue: "৳24,50,000", resolved: "89%", score: 92 },
];

export default function SuperAdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Good Morning, Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Here&apos;s what&apos;s happening across your platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center text-sm font-bold text-white">
            SA
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 group hover:blue-glow transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center blue-glow">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {stat.prefix}
                {stat.value}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
              {stat.note && (
                <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">{stat.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h2>
            <select className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:hidden" />
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" className="hidden dark:block" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis
                stroke="#94A3B8"
                fontSize={12}
                tickFormatter={(v) => `৳${(v / 100000).toFixed(1)}L`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                }}
                formatter={(value: any) => [`৳${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: "#2563EB", r: 5 }}
                activeDot={{ r: 7, fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">
                  {activity.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{activity.user}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pourashavas Table */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Performing Pourashavas</h2>
          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Name</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Citizens</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Revenue</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Complaints Resolved</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {topPourashavas.map((p, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-gray-500 dark:text-gray-400">{p.citizens}</td>
                  <td className="py-4 pr-4 text-gray-500 dark:text-gray-400">{p.revenue}</td>
                  <td className="py-4 pr-4">
                    <span className="text-green-700 dark:text-green-300">{p.resolved}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 dark:bg-[#0F172A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-electric-blue to-sky-blue rounded-full"
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.score}</span>
                    </div>
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

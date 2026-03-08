"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  X,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type AppStatus = "Pending" | "Approved" | "Rejected" | "Processing" | "Needs Mayor Approval";

interface Application {
  id: string;
  citizenName: string;
  service: string;
  ward: number;
  submittedDate: string;
  assignedTo: string;
  status: AppStatus;
  phone: string;
  nid: string;
  address: string;
  description: string;
}

const mockApplications: Application[] = [
  { id: "APP-2026-001", citizenName: "রহিম উদ্দিন", service: "জন্ম নিবন্ধন", ward: 1, submittedDate: "2026-03-01", assignedTo: "কামাল হোসেন", status: "Pending", phone: "01711-000001", nid: "1990123456001", address: "১নং ওয়ার্ড, মেইন রোড", description: "জন্ম নিবন্ধন সনদ প্রয়োজন।" },
  { id: "APP-2026-002", citizenName: "ফাতেমা বেগম", service: "হোল্ডিং ট্যাক্স", ward: 3, submittedDate: "2026-03-02", assignedTo: "সাইফুল ইসলাম", status: "Approved", phone: "01711-000002", nid: "1985123456002", address: "৩নং ওয়ার্ড, কলেজ রোড", description: "হোল্ডিং ট্যাক্স পরিশোধের রশিদ প্রয়োজন।" },
  { id: "APP-2026-003", citizenName: "আব্দুল করিম", service: "ট্রেড লাইসেন্স", ward: 5, submittedDate: "2026-03-02", assignedTo: "নাসরিন আক্তার", status: "Needs Mayor Approval", phone: "01711-000003", nid: "1988123456003", address: "৫নং ওয়ার্ড, বাজার এলাকা", description: "নতুন ট্রেড লাইসেন্সের জন্য আবেদন।" },
  { id: "APP-2026-004", citizenName: "মোহাম্মদ আলী", service: "পানির সংযোগ", ward: 2, submittedDate: "2026-03-03", assignedTo: "কামাল হোসেন", status: "Processing", phone: "01711-000004", nid: "1992123456004", address: "২নং ওয়ার্ড, পূর্ব পাড়া", description: "নতুন পানির সংযোগ চাই।" },
  { id: "APP-2026-005", citizenName: "সুমাইয়া আক্তার", service: "মৃত্যু সনদ", ward: 7, submittedDate: "2026-03-03", assignedTo: "সাইফুল ইসলাম", status: "Rejected", phone: "01711-000005", nid: "1995123456005", address: "৭নং ওয়ার্ড, দক্ষিণ পাড়া", description: "মৃত্যু সনদ প্রয়োজন।" },
  { id: "APP-2026-006", citizenName: "জামাল উদ্দিন", service: "ওয়ারিশ সনদ", ward: 4, submittedDate: "2026-03-04", assignedTo: "নাসরিন আক্তার", status: "Pending", phone: "01711-000006", nid: "1980123456006", address: "৪নং ওয়ার্ড, উত্তর পাড়া", description: "ওয়ারিশ সনদের আবেদন।" },
  { id: "APP-2026-007", citizenName: "নূরজাহান খাতুন", service: "ট্রেড লাইসেন্স", ward: 6, submittedDate: "2026-03-04", assignedTo: "কামাল হোসেন", status: "Needs Mayor Approval", phone: "01711-000007", nid: "1987123456007", address: "৬নং ওয়ার্ড, স্টেশন রোড", description: "ট্রেড লাইসেন্স নবায়ন।" },
  { id: "APP-2026-008", citizenName: "হাসান মাহমুদ", service: "জন্ম নিবন্ধন", ward: 9, submittedDate: "2026-03-05", assignedTo: "সাইফুল ইসলাম", status: "Approved", phone: "01711-000008", nid: "1993123456008", address: "৯নং ওয়ার্ড, পশ্চিম পাড়া", description: "সন্তানের জন্ম নিবন্ধন।" },
  { id: "APP-2026-009", citizenName: "রুবিনা ইয়াসমিন", service: "পানির সংযোগ", ward: 8, submittedDate: "2026-03-05", assignedTo: "নাসরিন আক্তার", status: "Pending", phone: "01711-000009", nid: "1991123456009", address: "৮নং ওয়ার্ড, মসজিদ রোড", description: "পানির সংযোগ মেরামত।" },
  { id: "APP-2026-010", citizenName: "কবির আহমেদ", service: "হোল্ডিং ট্যাক্স", ward: 1, submittedDate: "2026-03-06", assignedTo: "কামাল হোসেন", status: "Processing", phone: "01711-000010", nid: "1986123456010", address: "১নং ওয়ার্ড, বড় মসজিদ এলাকা", description: "হোল্ডিং ট্যাক্স সমন্বয়ের আবেদন।" },
];

const tabs = ["All", "Pending", "Approved", "Rejected", "Needs Mayor Approval"] as const;

const statusColor: Record<AppStatus, string> = {
  Pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  Approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Rejected: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  Processing: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Needs Mayor Approval": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
};

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailApp, setDetailApp] = useState<Application | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingCount = mockApplications.filter((a) => a.status === "Pending").length;
  const mayorCount = mockApplications.filter((a) => a.status === "Needs Mayor Approval").length;

  const filtered = mockApplications.filter((app) => {
    if (activeTab !== "All" && app.status !== activeTab) return false;
    if (serviceFilter && app.service !== serviceFilter) return false;
    if (wardFilter && app.ward !== Number(wardFilter)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        app.id.toLowerCase().includes(q) ||
        app.citizenName.toLowerCase().includes(q) ||
        app.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((a) => a.id));
    }
  };

  const openDetail = (app: Application) => {
    setDetailApp(app);
    setDrawerOpen(true);
  };

  const services = [...new Set(mockApplications.map((a) => a.service))];

  return (
    <div className="space-y-6 font-bangla">
      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab
                ? "bg-electric-blue text-white"
                : "bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab === "All" ? "All" : tab === "Pending" ? "Pending" : tab === "Approved" ? "Approved" : tab === "Rejected" ? "Rejected" : "Needs Mayor Approval"}
            {tab === "Pending" && (
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
            {tab === "Needs Mayor Approval" && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                {mayorCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 flex flex-wrap gap-3 items-center">
        <input
          type="date"
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        />
        <span className="text-gray-500 dark:text-gray-400">—</span>
        <input
          type="date"
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        />
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        >
          <option value="">সকল সেবা</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={wardFilter}
          onChange={(e) => setWardFilter(e.target.value)}
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        >
          <option value="">সকল ওয়ার্ড</option>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={i + 1}>ওয়ার্ড {i + 1}</option>
          ))}
        </select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="আবেদন খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
          />
        </div>
        <button className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 text-sm transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-200 dark:border-gray-700"
                  />
                </th>
                <th className="p-4 text-left">Application ID</th>
                <th className="p-4 text-left">নাগরিকের নাম</th>
                <th className="p-4 text-left">সেবা</th>
                <th className="p-4 text-left">ওয়ার্ড</th>
                <th className="p-4 text-left">তারিখ</th>
                <th className="p-4 text-left">দায়িত্বপ্রাপ্ত</th>
                <th className="p-4 text-left">স্ট্যাটাস</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(app.id)}
                      onChange={() => toggleSelect(app.id)}
                      className="rounded border-gray-200 dark:border-gray-700"
                    />
                  </td>
                  <td className="p-4 text-blue-600 dark:text-blue-400 font-medium">{app.id}</td>
                  <td className="p-4 text-gray-900 dark:text-gray-100">{app.citizenName}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{app.service}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{app.ward}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{app.submittedDate}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{app.assignedTo}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openDetail(app)}
                      className="text-blue-600 dark:text-blue-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">কোনো আবেদন পাওয়া যায়নি।</div>
        )}
      </div>

      {/* Detail Drawer */}
      {drawerOpen && detailApp && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-[#1E293B] border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto animate-slide-in-right">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">আবেদনের বিস্তারিত</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Application Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-lg">{detailApp.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[detailApp.status]}`}>
                    {detailApp.status}
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">নাগরিকের নাম</p>
                      <p className="text-gray-900 dark:text-gray-100 font-medium">{detailApp.citizenName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">ফোন</p>
                      <p className="text-gray-900 dark:text-gray-100">{detailApp.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">NID</p>
                      <p className="text-gray-900 dark:text-gray-100">{detailApp.nid}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">ওয়ার্ড</p>
                      <p className="text-gray-900 dark:text-gray-100">ওয়ার্ড {detailApp.ward}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 dark:text-gray-400 text-xs">ঠিকানা</p>
                      <p className="text-gray-900 dark:text-gray-100">{detailApp.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 space-y-3">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">সেবার ধরন</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{detailApp.service}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">আবেদনের তারিখ</p>
                    <p className="text-gray-900 dark:text-gray-100">{detailApp.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">দায়িত্বপ্রাপ্ত</p>
                    <p className="text-gray-900 dark:text-gray-100">{detailApp.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">বিবরণ</p>
                    <p className="text-gray-900 dark:text-gray-100">{detailApp.description}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 bg-success hover:bg-success/80 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                  অনুমোদন
                </button>
                <button className="flex-1 bg-bloody-red hover:bg-bloody-red/80 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <XCircle className="w-5 h-5" />
                  প্রত্যাখ্যান
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

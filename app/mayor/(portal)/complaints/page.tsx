"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  X,
  List,
  Map,
  MapPin,
  Clock,
  User,
  Send,
} from "lucide-react";

type ComplaintStatus = "Emergency" | "Pending" | "Processing" | "Resolved";
type ComplaintCategory = "সড়ক" | "পানি" | "বর্জ্য" | "বিদ্যুৎ" | "ড্রেনেজ" | "অন্যান্য";

interface Complaint {
  id: string;
  citizen: string;
  phone: string;
  category: ComplaintCategory;
  ward: number;
  submittedTime: string;
  status: ComplaintStatus;
  assignedTo: string;
  description: string;
  location: string;
}

const mockComplaints: Complaint[] = [
  { id: "CMP-2026-001", citizen: "আলমগীর হোসেন", phone: "01711-200001", category: "সড়ক", ward: 3, submittedTime: "2026-03-06 08:30", status: "Emergency", assignedTo: "অনির্ধারিত", description: "প্রধান সড়কে বড় গর্ত, দুর্ঘটনার ঝুঁকি।", location: "কলেজ রোড, ৩নং ওয়ার্ড" },
  { id: "CMP-2026-002", citizen: "মনিরা বেগম", phone: "01711-200002", category: "পানি", ward: 1, submittedTime: "2026-03-06 09:15", status: "Emergency", assignedTo: "অনির্ধারিত", description: "পানির পাইপ ফেটে গেছে, রাস্তায় পানি জমছে।", location: "মেইন রোড, ১নং ওয়ার্ড" },
  { id: "CMP-2026-003", citizen: "রফিকুল ইসলাম", phone: "01711-200003", category: "বর্জ্য", ward: 5, submittedTime: "2026-03-05 14:20", status: "Pending", assignedTo: "কামাল হোসেন", description: "বর্জ্য সংগ্রহ ৩ দিন ধরে হয়নি।", location: "বাজার এলাকা, ৫নং ওয়ার্ড" },
  { id: "CMP-2026-004", citizen: "শাহানা পারভীন", phone: "01711-200004", category: "ড্রেনেজ", ward: 2, submittedTime: "2026-03-05 16:45", status: "Processing", assignedTo: "নাসরিন আক্তার", description: "ড্রেন বন্ধ হয়ে পানি জমে আছে।", location: "পূর্ব পাড়া, ২নং ওয়ার্ড" },
  { id: "CMP-2026-005", citizen: "তারেক রহমান", phone: "01711-200005", category: "বিদ্যুৎ", ward: 7, submittedTime: "2026-03-04 10:00", status: "Resolved", assignedTo: "সাইফুল ইসলাম", description: "রাস্তার বাতি নষ্ট।", location: "দক্ষিণ পাড়া, ৭নং ওয়ার্ড" },
  { id: "CMP-2026-006", citizen: "আনোয়ারা খাতুন", phone: "01711-200006", category: "পানি", ward: 4, submittedTime: "2026-03-04 11:30", status: "Pending", assignedTo: "অনির্ধারিত", description: "পানির চাপ কম পাচ্ছি।", location: "উত্তর পাড়া, ৪নং ওয়ার্ড" },
  { id: "CMP-2026-007", citizen: "বেলাল আহমেদ", phone: "01711-200007", category: "সড়ক", ward: 9, submittedTime: "2026-03-03 15:00", status: "Processing", assignedTo: "মাসুদ রানা", description: "রাস্তার ম্যানহোলের ঢাকনা নেই।", location: "পশ্চিম পাড়া, ৯নং ওয়ার্ড" },
  { id: "CMP-2026-008", citizen: "সালমা আক্তার", phone: "01711-200008", category: "অন্যান্য", ward: 6, submittedTime: "2026-03-03 17:20", status: "Resolved", assignedTo: "রেহানা পারভীন", description: "পার্কে বেঞ্চ ভাঙা।", location: "স্টেশন রোড, ৬নং ওয়ার্ড" },
];

const statusColor: Record<ComplaintStatus, string> = {
  Emergency: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  Pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  Processing: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  Resolved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
};

const categories: ComplaintCategory[] = ["সড়ক", "পানি", "বর্জ্য", "বিদ্যুৎ", "ড্রেনেজ", "অন্যান্য"];
const staffList = ["কামাল হোসেন", "নাসরিন আক্তার", "সাইফুল ইসলাম", "মাসুদ রানা", "রেহানা পারভীন"];

export default function ComplaintsPage() {
  const [search, setSearch] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [assignModal, setAssignModal] = useState<Complaint | null>(null);
  const [assignData, setAssignData] = useState({ staff: "", priority: "Normal", note: "" });

  const emergencyCount = mockComplaints.filter((c) => c.status === "Emergency").length;

  const filtered = mockComplaints.filter((c) => {
    if (wardFilter && c.ward !== Number(wardFilter)) return false;
    if (categoryFilter && c.category !== categoryFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.citizen.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-bangla">
      {/* Emergency Alert Banner */}
      {emergencyCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/40 rounded-xl p-4 flex items-center gap-3">
          <div className="relative">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full animate-pulse" />
          </div>
          <p className="text-red-700 dark:text-red-300 font-semibold">
            {emergencyCount} টি জরুরি অভিযোগের তাৎক্ষণিক মনোযোগ প্রয়োজন
          </p>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 flex flex-wrap gap-3 items-center">
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        >
          <option value="">সকল ক্যাটাগরি</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        >
          <option value="">সকল স্ট্যাটাস</option>
          <option value="Emergency">Emergency</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Resolved">Resolved</option>
        </select>
        <input
          type="date"
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        />
        <span className="text-gray-500 dark:text-gray-400">—</span>
        <input
          type="date"
          className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
        />
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="অভিযোগ খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
          />
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            viewMode === "list" ? "bg-electric-blue text-white" : "bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <List className="w-4 h-4" />
          List View
        </button>
        <button
          onClick={() => setViewMode("map")}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            viewMode === "map" ? "bg-electric-blue text-white" : "bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Map className="w-4 h-4" />
          Map View
        </button>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="p-4 text-left">Tracking ID</th>
                  <th className="p-4 text-left">নাগরিক</th>
                  <th className="p-4 text-left">ক্যাটাগরি</th>
                  <th className="p-4 text-left">ওয়ার্ড</th>
                  <th className="p-4 text-left">সময়</th>
                  <th className="p-4 text-left">স্ট্যাটাস</th>
                  <th className="p-4 text-left">দায়িত্বপ্রাপ্ত</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className={`border-b border-gray-100 dark:border-gray-700/50 transition-colors ${
                      complaint.status === "Emergency" ? "bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20" : "hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-mono">{complaint.id}</td>
                    <td className="p-4 text-gray-900 dark:text-gray-100">{complaint.citizen}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{complaint.category}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{complaint.ward}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">{complaint.submittedTime}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[complaint.status]}`}>
                        {complaint.status === "Emergency" && (
                          <span className="inline-block w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mr-1 animate-pulse" />
                        )}
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{complaint.assignedTo}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setAssignModal(complaint);
                          setAssignData({ staff: "", priority: "Normal", note: "" });
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 text-sm"
                      >
                        <Send className="w-3 h-3" />
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">কোনো অভিযোগ পাওয়া যায়নি।</div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-12 flex flex-col items-center justify-center text-center space-y-3">
          <Map className="w-16 h-16 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Map View</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">ম্যাপ ভিউ শীঘ্রই আসছে। অভিযোগের অবস্থান ম্যাপে দেখা যাবে।</p>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setAssignModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-md p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">দায়িত্ব প্রদান</h2>
                <button onClick={() => setAssignModal(null)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-3">
                <p className="text-blue-600 dark:text-blue-400 font-mono text-sm">{assignModal.id}</p>
                <p className="text-gray-900 dark:text-gray-100 text-sm mt-1">{assignModal.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">স্টাফ নির্বাচন</label>
                  <select
                    value={assignData.staff}
                    onChange={(e) => setAssignData({ ...assignData, staff: e.target.value })}
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
                  >
                    <option value="">নির্বাচন করুন</option>
                    {staffList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">অগ্রাধিকার স্তর</label>
                  <div className="flex gap-2">
                    {["Low", "Normal", "High", "Emergency"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setAssignData({ ...assignData, priority: level })}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          assignData.priority === level
                            ? level === "Emergency"
                              ? "border-red-400 dark:border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                              : level === "High"
                              ? "border-yellow-400 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                              : "border-blue-400 dark:border-electric-blue bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "border-gray-200 dark:border-gray-700 bg-[#F0F7FF] dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">নোট</label>
                  <textarea
                    value={assignData.note}
                    onChange={(e) => setAssignData({ ...assignData, note: e.target.value })}
                    placeholder="অতিরিক্ত নির্দেশনা..."
                    rows={3}
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setAssignModal(null)}
                  className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  বাতিল
                </button>
                <button className="flex-1 bg-electric-blue hover:bg-electric-blue/80 text-white py-2.5 rounded-lg font-medium transition-colors">
                  দায়িত্ব দিন
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

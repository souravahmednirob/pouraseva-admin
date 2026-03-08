"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  CheckCircle,
  XCircle,
} from "lucide-react";

type StaffRole = "Tax Collector" | "Engineer" | "Health Inspector" | "Clerk" | "Supervisor" | "Accountant";
type AttendanceStatus = "Present" | "Absent";

interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  ward: number;
  phone: string;
  email: string;
  nid: string;
  todayStatus: AttendanceStatus;
  tasksCompleted: number;
  tasksPending: number;
}

const roleBadgeColor: Record<StaffRole, string> = {
  "Tax Collector": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  Engineer: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  "Health Inspector": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  Clerk: "bg-blue-100 dark:bg-blue-900/30 text-sky-blue",
  Supervisor: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  Accountant: "bg-purple-100 dark:bg-[#8B5CF6]/20 text-[#8B5CF6]",
};

const mockStaff: StaffMember[] = [
  { id: "STF-001", name: "কামাল হোসেন", role: "Tax Collector", ward: 1, phone: "01711-100001", email: "kamal@pouraseva.gov.bd", nid: "1985100001", todayStatus: "Present", tasksCompleted: 12, tasksPending: 3 },
  { id: "STF-002", name: "নাসরিন আক্তার", role: "Engineer", ward: 3, phone: "01711-100002", email: "nasrin@pouraseva.gov.bd", nid: "1990100002", todayStatus: "Present", tasksCompleted: 8, tasksPending: 5 },
  { id: "STF-003", name: "সাইফুল ইসলাম", role: "Health Inspector", ward: 5, phone: "01711-100003", email: "saiful@pouraseva.gov.bd", nid: "1988100003", todayStatus: "Absent", tasksCompleted: 15, tasksPending: 2 },
  { id: "STF-004", name: "রেহানা পারভীন", role: "Clerk", ward: 2, phone: "01711-100004", email: "rehana@pouraseva.gov.bd", nid: "1992100004", todayStatus: "Present", tasksCompleted: 20, tasksPending: 1 },
  { id: "STF-005", name: "মাসুদ রানা", role: "Supervisor", ward: 7, phone: "01711-100005", email: "masud@pouraseva.gov.bd", nid: "1983100005", todayStatus: "Present", tasksCompleted: 10, tasksPending: 4 },
  { id: "STF-006", name: "শিরিন সুলতানা", role: "Accountant", ward: 4, phone: "01711-100006", email: "shirin@pouraseva.gov.bd", nid: "1991100006", todayStatus: "Absent", tasksCompleted: 18, tasksPending: 2 },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nid: "",
    role: "",
    ward: "",
    phone: "",
    email: "",
  });

  const filtered = mockStaff.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  };

  return (
    <div className="space-y-6 font-bangla">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-electric-blue hover:bg-electric-blue/80 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors blue-glow"
        >
          <Plus className="w-5 h-5" />
          স্টাফ যোগ করুন
        </button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="স্টাফ খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((staff) => (
          <div key={staff.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-5 space-y-4 hover:border-blue-200 dark:hover:border-electric-blue/30 transition-colors">
            {/* Top Section */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-electric-blue/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg shrink-0">
                {getInitials(staff.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 dark:text-gray-100 font-semibold truncate">{staff.name}</h3>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${roleBadgeColor[staff.role]}`}>
                  {staff.role}
                </span>
                <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin className="w-3 h-3" />
                  ওয়ার্ড {staff.ward}
                </div>
              </div>
            </div>

            {/* Status & Tasks */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {staff.todayStatus === "Present" ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-bloody-red" />
                )}
                <span className={`text-sm font-medium ${staff.todayStatus === "Present" ? "text-success" : "text-bloody-red"}`}>
                  {staff.todayStatus === "Present" ? "উপস্থিত" : "অনুপস্থিত"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <ClipboardList className="w-4 h-4" />
                <span className="text-success">{staff.tasksCompleted}</span>
                <span>/</span>
                <span className="text-warning">{staff.tasksPending} pending</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
              <button className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-electric-blue/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 rounded-lg text-sm font-medium transition-colors">
                View Profile
              </button>
              <button className="flex-1 bg-blue-50 dark:bg-electric-blue/10 border border-blue-200 dark:border-electric-blue/30 hover:bg-blue-100 dark:hover:bg-electric-blue/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors">
                Assign Task
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-8 text-center text-gray-500 dark:text-gray-400">কোনো স্টাফ পাওয়া যায়নি।</div>
      )}

      {/* Add Staff Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-lg p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">নতুন স্টাফ যোগ করুন</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">নাম</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="পুরো নাম লিখুন"
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">NID নম্বর</label>
                  <input
                    type="text"
                    value={formData.nid}
                    onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                    placeholder="NID নম্বর লিখুন"
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">পদবি</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="Tax Collector">Tax Collector</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Health Inspector">Health Inspector</option>
                      <option value="Clerk">Clerk</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Accountant">Accountant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">ওয়ার্ড</label>
                    <select
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {Array.from({ length: 9 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>ওয়ার্ড {i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">ফোন নম্বর</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01XXX-XXXXXX"
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">ইমেইল</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  বাতিল
                </button>
                <button className="flex-1 bg-electric-blue hover:bg-electric-blue/80 text-white py-2.5 rounded-lg font-medium transition-colors">
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

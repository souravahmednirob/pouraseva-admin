"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowUpDown,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  User,
  MapPin,
  Phone,
  File,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

type Application = {
  id: string;
  applicant: string;
  service: string;
  date: string;
  waitDays: number;
  priority: "High" | "Medium" | "Normal";
  status: "pending" | "processing" | "completed";
  phone: string;
  nid: string;
  address: string;
  fatherName: string;
  motherName: string;
  documents: { name: string; type: string }[];
  timeline: { action: string; time: string; by: string }[];
};

const allApplications: Application[] = [
  {
    id: "APP-2024-001",
    applicant: "আব্দুল করিম",
    service: "জন্ম নিবন্ধন",
    date: "২০২৪-০১-১৫",
    waitDays: 3,
    priority: "High",
    status: "pending",
    phone: "০১৭১১২২৩৩৪৪",
    nid: "১২৩৪৫৬৭৮৯০",
    address: "১২/৩, কালিয়াকৈর পৌরসভা, ওয়ার্ড-০৫",
    fatherName: "মোহাম্মদ আলী",
    motherName: "রাবেয়া বেগম",
    documents: [
      { name: "জাতীয় পরিচয়পত্র.pdf", type: "pdf" },
      { name: "ছবি.jpg", type: "image" },
      { name: "জন্ম সনদ (পুরাতন).pdf", type: "pdf" },
    ],
    timeline: [
      { action: "আবেদন জমা দেওয়া হয়েছে", time: "১৫ জানু, সকাল ১০:৩০", by: "আবেদনকারী" },
      { action: "ফি পরিশোধ সম্পন্ন", time: "১৫ জানু, সকাল ১০:৩৫", by: "সিস্টেম" },
      { action: "পর্যালোচনার জন্য নির্ধারিত", time: "১৫ জানু, দুপুর ১২:০০", by: "সিস্টেম" },
    ],
  },
  {
    id: "APP-2024-002",
    applicant: "ফাতেমা বেগম",
    service: "ওয়ারিশ সনদ",
    date: "২০২৪-০১-১৪",
    waitDays: 4,
    priority: "High",
    status: "pending",
    phone: "০১৮১২৩৪৫৬৭৮",
    nid: "৯৮৭৬৫৪৩২১০",
    address: "৪৫, স্টেশন রোড, কালিয়াকৈর",
    fatherName: "আব্দুর রহমান",
    motherName: "হালিমা খাতুন",
    documents: [
      { name: "জাতীয় পরিচয়পত্র.pdf", type: "pdf" },
      { name: "মৃত্যু সনদ.pdf", type: "pdf" },
    ],
    timeline: [
      { action: "আবেদন জমা দেওয়া হয়েছে", time: "১৪ জানু, বিকাল ৩:০০", by: "আবেদনকারী" },
      { action: "ফি পরিশোধ সম্পন্ন", time: "১৪ জানু, বিকাল ৩:০৫", by: "সিস্টেম" },
    ],
  },
  {
    id: "APP-2024-003",
    applicant: "মোহাম্মদ হাসান",
    service: "ট্রেড লাইসেন্স",
    date: "২০২৪-০১-১৬",
    waitDays: 1,
    priority: "Medium",
    status: "pending",
    phone: "০১৯১১৫৫৬৬৭৭",
    nid: "৫৫৫৬৬৬৭৭৭৮",
    address: "বাজার রোড, কালিয়াকৈর",
    fatherName: "করিম উদ্দিন",
    motherName: "আমেনা বেগম",
    documents: [
      { name: "জাতীয় পরিচয়পত্র.pdf", type: "pdf" },
      { name: "দোকান ছবি.jpg", type: "image" },
      { name: "চুক্তিপত্র.pdf", type: "pdf" },
    ],
    timeline: [
      { action: "আবেদন জমা দেওয়া হয়েছে", time: "১৬ জানু, সকাল ৯:০০", by: "আবেদনকারী" },
    ],
  },
  {
    id: "APP-2024-004",
    applicant: "রহিমা খাতুন",
    service: "নাগরিকত্ব সনদ",
    date: "২০২৪-০১-১৩",
    waitDays: 5,
    priority: "Normal",
    status: "processing",
    phone: "০১৬১২৮৮৯৯০০",
    nid: "৩৩৩৪৪৪৫৫৫৬",
    address: "পূর্বপাড়া, কালিয়াকৈর",
    fatherName: "আফসার আলী",
    motherName: "জরিনা বেগম",
    documents: [{ name: "জাতীয় পরিচয়পত্র.pdf", type: "pdf" }],
    timeline: [
      { action: "আবেদন জমা দেওয়া হয়েছে", time: "১৩ জানু, দুপুর ২:০০", by: "আবেদনকারী" },
      { action: "প্রক্রিয়াধীন", time: "১৪ জানু, সকাল ১১:০০", by: "রফিকুল ইসলাম" },
    ],
  },
  {
    id: "APP-2024-005",
    applicant: "সাইফুল ইসলাম",
    service: "জন্ম নিবন্ধন",
    date: "২০২৪-০১-১০",
    waitDays: 0,
    priority: "Normal",
    status: "completed",
    phone: "০১৫১১৭৭৮৮৯৯",
    nid: "১১১২২২৩৩৩৪",
    address: "দক্ষিণপাড়া, কালিয়াকৈর",
    fatherName: "জামাল উদ্দিন",
    motherName: "সাহেরা বেগম",
    documents: [
      { name: "জাতীয় পরিচয়পত্র.pdf", type: "pdf" },
      { name: "ছবি.jpg", type: "image" },
    ],
    timeline: [
      { action: "আবেদন জমা দেওয়া হয়েছে", time: "১০ জানু, সকাল ১০:০০", by: "আবেদনকারী" },
      { action: "অনুমোদিত", time: "১২ জানু, দুপুর ১:০০", by: "রফিকুল ইসলাম" },
      { action: "সনদ প্রস্তুত", time: "১২ জানু, বিকাল ৪:০০", by: "সিস্টেম" },
    ],
  },
];

const priorityStyles: Record<string, string> = {
  High: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  Medium: "bg-amber-50 dark:bg-warning/20 text-amber-700 dark:text-warning",
  Normal: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
};

const priorityLabels: Record<string, string> = {
  High: "জরুরি",
  Medium: "মাঝারি",
  Normal: "সাধারণ",
};

const statusLabels: Record<string, string> = {
  pending: "অপেক্ষমাণ",
  processing: "প্রক্রিয়াধীন",
  completed: "সম্পন্ন",
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 dark:bg-warning/20 text-amber-700 dark:text-warning",
  processing: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  completed: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
};

type Tab = "pending" | "processing" | "completed";

export default function OfficerApplicationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    citizen: false,
    documents: false,
    timeline: false,
  });
  const [notes, setNotes] = useState("");
  const [showSignature, setShowSignature] = useState(false);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "pending", label: "অপেক্ষমাণ", count: 12 },
    { key: "processing", label: "প্রক্রিয়াধীন", count: 3 },
    { key: "completed", label: "সম্পন্ন", count: 45 },
  ];

  const filtered = allApplications.filter((a) => a.status === activeTab);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "priority") {
      const order = { High: 0, Medium: 1, Normal: 2 };
      return order[a.priority] - order[b.priority];
    }
    return b.waitDays - a.waitDays;
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Detail view
  if (selectedApp) {
    return (
      <MobileFrame>
        <div className="flex flex-col min-h-full">
          <div className="flex-1 px-4 pt-3 pb-4 space-y-4 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setShowSignature(false);
                  setNotes("");
                }}
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla">
                  {selectedApp.id}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                  {selectedApp.service}
                </p>
              </div>
              <span
                className={`text-[10px] font-bangla px-2 py-0.5 rounded-full ${
                  statusStyles[selectedApp.status]
                }`}
              >
                {statusLabels[selectedApp.status]}
              </span>
            </div>

            {/* Citizen Info Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              <button
                onClick={() => toggleSection("citizen")}
                className="w-full flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-electric-blue" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-bangla">
                    নাগরিকের তথ্য
                  </span>
                </div>
                {expandedSections.citizen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.citizen && (
                <div className="px-3 pb-3 space-y-2 border-t border-gray-100 dark:border-gray-700/50 pt-2">
                  {[
                    { label: "নাম", value: selectedApp.applicant },
                    { label: "ফোন", value: selectedApp.phone },
                    { label: "জাতীয় পরিচয়পত্র", value: selectedApp.nid },
                    { label: "পিতার নাম", value: selectedApp.fatherName },
                    { label: "মাতার নাম", value: selectedApp.motherName },
                    { label: "ঠিকানা", value: selectedApp.address },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                        {row.label}
                      </span>
                      <span className="text-xs text-gray-900 dark:text-white font-bangla text-right max-w-[60%]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              <button
                onClick={() => toggleSection("documents")}
                className="w-full flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-electric-blue" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-bangla">
                    আপলোড করা কাগজপত্র
                  </span>
                </div>
                {expandedSections.documents ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.documents && (
                <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700/50 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {selectedApp.documents.map((doc, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-50 dark:bg-[#0F172A]/50"
                      >
                        <div className="w-10 h-12 rounded bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                          <FileText
                            className={`w-5 h-5 ${
                              doc.type === "pdf"
                                ? "text-bloody-red"
                                : "text-electric-blue"
                            }`}
                          />
                        </div>
                        <span className="text-[9px] text-gray-500 dark:text-gray-400 font-bangla text-center leading-tight truncate w-full">
                          {doc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              <button
                onClick={() => toggleSection("timeline")}
                className="w-full flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-electric-blue" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-bangla">
                    আবেদনের ইতিহাস
                  </span>
                </div>
                {expandedSections.timeline ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {expandedSections.timeline && (
                <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700/50 pt-2">
                  <div className="space-y-3">
                    {selectedApp.timeline.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-electric-blue mt-1.5" />
                          {i < selectedApp.timeline.length - 1 && (
                            <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="text-xs text-gray-900 dark:text-white font-bangla">
                            {item.action}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla">
                            {item.time} - {item.by}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Signature Pad */}
            {showSignature && (
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white font-bangla text-center">
                  স্বাক্ষর করুন
                </h4>
                <div className="w-full h-[200px] bg-white rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-sm font-bangla">
                    এখানে স্বাক্ষর করুন
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSignature(false)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bangla hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    মুছুন
                  </button>
                  <button
                    onClick={() => setShowSignature(false)}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-electric-blue to-sky-blue text-white text-sm font-bangla"
                  >
                    নিশ্চিত করুন
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Action Section */}
          <div className="sticky bottom-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-700 p-3 space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="প্রক্রিয়া নোট লিখুন"
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-electric-blue focus:outline-none resize-none font-bangla"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSignature(true)}
                className="flex-1 py-2.5 rounded-lg bg-success text-white text-xs font-bangla font-semibold flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                অনুমোদন দিন
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-electric-blue text-white text-xs font-bangla font-semibold flex items-center justify-center gap-1">
                <Info className="w-3.5 h-3.5" />
                আরও তথ্য চাই
              </button>
              <button className="flex-1 py-2.5 rounded-lg bg-bloody-red text-white text-xs font-bangla font-semibold flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      </MobileFrame>
    );
  }

  // List view
  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-4 pt-3 pb-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 dark:bg-[#1E293B] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-bangla font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-50 dark:bg-electric-blue/20 text-electric-blue"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex justify-end relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-bangla px-3 py-1.5 rounded-lg bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortBy === "date" ? "তারিখ অনুসারে" : "অগ্রাধিকার অনুসারে"}
            </button>
            {showSort && (
              <div className="absolute top-9 right-0 z-20 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-none overflow-hidden">
                <button
                  onClick={() => {
                    setSortBy("date");
                    setShowSort(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs font-bangla transition-colors ${
                    sortBy === "date"
                      ? "text-electric-blue bg-blue-50 dark:bg-electric-blue/10"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0F172A]/50"
                  }`}
                >
                  তারিখ অনুসারে
                </button>
                <button
                  onClick={() => {
                    setSortBy("priority");
                    setShowSort(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs font-bangla transition-colors ${
                    sortBy === "priority"
                      ? "text-electric-blue bg-blue-50 dark:bg-electric-blue/10"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0F172A]/50"
                  }`}
                >
                  অগ্রাধিকার অনুসারে
                </button>
              </div>
            )}
          </div>

          {/* Application List */}
          <div className="space-y-3">
            {sorted.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="w-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 space-y-2 text-left hover:border-electric-blue/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white font-bangla">
                      {app.applicant}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                      {app.service}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bangla px-2 py-0.5 rounded-full ${
                      priorityStyles[app.priority]
                    }`}
                  >
                    {priorityLabels[app.priority]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bangla">
                    {app.date}
                  </span>
                  <span
                    className={`text-[11px] font-bangla flex items-center gap-1 ${
                      app.waitDays > 2 ? "text-bloody-red" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {app.waitDays > 0
                      ? `${app.waitDays} দিন অপেক্ষমাণ`
                      : "সম্পন্ন"}
                  </span>
                </div>
              </button>
            ))}

            {sorted.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bangla">
                  কোনো আবেদন নেই
                </p>
              </div>
            )}
          </div>
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

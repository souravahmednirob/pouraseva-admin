"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  Home,
  Briefcase,
  CreditCard,
  Users,
  Download,
  FileIcon,
  CheckCircle2,
  Clock,
  XCircle,
  Circle,
} from "lucide-react";

const tabs = ["সব", "চলমান", "অনুমোদিত", "বাতিল"];

type Application = {
  id: number;
  trackingId: string;
  serviceName: string;
  serviceIcon: React.ElementType;
  submittedDate: string;
  status: string;
  data: { label: string; value: string }[];
  documents: { name: string }[];
  timeline: { step: string; time: string; done: boolean }[];
};

const applications: Application[] = [
  {
    id: 1,
    trackingId: "APP-2026-00451",
    serviceName: "জন্ম নিবন্ধন সনদ",
    serviceIcon: FileText,
    submittedDate: "২০২৬-০২-২৮",
    status: "অনুমোদিত",
    data: [
      { label: "নাম", value: "রাহাত হোসেন" },
      { label: "জন্ম তারিখ", value: "২০২৫-১১-১৫" },
      { label: "পিতার নাম", value: "রহিম উদ্দিন" },
      { label: "মাতার নাম", value: "ফাতেমা বেগম" },
    ],
    documents: [{ name: "জন্ম প্রমাণপত্র.pdf" }, { name: "পিতার NID.pdf" }],
    timeline: [
      { step: "আবেদন জমা", time: "২৮ ফেব্রু, সকাল ১০:৩০", done: true },
      { step: "যাচাই সম্পন্ন", time: "০১ মার্চ, দুপুর ২:১৫", done: true },
      { step: "অনুমোদিত", time: "০৩ মার্চ, সকাল ১১:০০", done: true },
      { step: "সনদ প্রস্তুত", time: "০৩ মার্চ, বিকাল ৪:০০", done: true },
    ],
  },
  {
    id: 2,
    trackingId: "APP-2026-00467",
    serviceName: "ট্রেড লাইসেন্স নবায়ন",
    serviceIcon: Briefcase,
    submittedDate: "২০২৬-০৩-০১",
    status: "চলমান",
    data: [
      { label: "ব্যবসার নাম", value: "রহিম স্টোর" },
      { label: "লাইসেন্স নং", value: "TL-2024-1234" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [{ name: "আগের লাইসেন্স.pdf" }, { name: "ট্যাক্স রসিদ.pdf" }],
    timeline: [
      { step: "আবেদন জমা", time: "০১ মার্চ, সকাল ৯:৪৫", done: true },
      { step: "পর্যালোচনা চলছে", time: "০২ মার্চ, সকাল ১০:০০", done: true },
      { step: "অনুমোদন বাকি", time: "", done: false },
    ],
  },
  {
    id: 3,
    trackingId: "APP-2026-00412",
    serviceName: "ওয়ারিশ সনদ",
    serviceIcon: Users,
    submittedDate: "২০২৬-০২-২০",
    status: "বাতিল",
    data: [
      { label: "মৃত ব্যক্তির নাম", value: "আব্দুল করিম" },
      { label: "সম্পর্ক", value: "পিতা" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [{ name: "মৃত্যু সনদ.pdf" }],
    timeline: [
      { step: "আবেদন জমা", time: "২০ ফেব্রু, সকাল ১১:০০", done: true },
      { step: "তথ্য অসম্পূর্ণ", time: "২২ ফেব্রু, দুপুর ১:৩০", done: true },
      { step: "বাতিল করা হয়েছে", time: "২৫ ফেব্রু, সকাল ১০:০০", done: true },
    ],
  },
  {
    id: 4,
    trackingId: "APP-2026-00489",
    serviceName: "হোল্ডিং ট্যাক্স পরিশোধ",
    serviceIcon: Home,
    submittedDate: "২০২৬-০৩-০৩",
    status: "চলমান",
    data: [
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "পরিমাণ", value: "৳৫,৫০০" },
      { label: "অর্থবছর", value: "২০২৫-২৬" },
    ],
    documents: [{ name: "ট্যাক্স বিল.pdf" }],
    timeline: [
      { step: "আবেদন জমা", time: "০৩ মার্চ, সকাল ১০:০০", done: true },
      { step: "পেমেন্ট যাচাই", time: "", done: false },
      { step: "রসিদ প্রস্তুত", time: "", done: false },
    ],
  },
  {
    id: 5,
    trackingId: "APP-2026-00501",
    serviceName: "পানির সংযোগ আবেদন",
    serviceIcon: CreditCard,
    submittedDate: "২০২৬-০৩-০৫",
    status: "অনুমোদিত",
    data: [
      { label: "সংযোগ ধরন", value: "আবাসিক" },
      { label: "হোল্ডিং নং", value: "H-0345" },
      { label: "ওয়ার্ড", value: "ওয়ার্ড ৩" },
    ],
    documents: [
      { name: "জমির দলিল.pdf" },
      { name: "NID কপি.pdf" },
    ],
    timeline: [
      { step: "আবেদন জমা", time: "০৫ মার্চ, সকাল ৮:৩০", done: true },
      { step: "পরিদর্শন সম্পন্ন", time: "০৫ মার্চ, দুপুর ২:০০", done: true },
      { step: "অনুমোদিত", time: "০৬ মার্চ, সকাল ৯:০০", done: true },
    ],
  },
];

const statusColor: Record<string, string> = {
  চলমান: "bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue",
  অনুমোদিত: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  বাতিল: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
};

const stripeColor: Record<string, string> = {
  চলমান: "bg-electric-blue",
  অনুমোদিত: "bg-success",
  বাতিল: "bg-bloody-red",
};

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("সব");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filtered = applications.filter((a): a is Application => {
    if (activeTab === "সব") return true;
    return a.status === activeTab;
  });

  if (selectedApp) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          {/* Detail Header */}
          <div className="px-4 pt-4 pb-3 flex items-center gap-3">
            <button
              onClick={() => setSelectedApp(null)}
              className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">
                {selectedApp.serviceName}
              </h2>
            </div>
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-bangla ${
                statusColor[selectedApp.status]
              }`}
            >
              {selectedApp.status}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
            {/* Info Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-3 uppercase tracking-wider">
                আবেদনের তথ্য
              </h3>
              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                    ট্র্যাকিং আইডি
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white font-mono">
                    {selectedApp.trackingId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                    জমার তারিখ
                  </span>
                  <span className="text-xs text-gray-900 dark:text-white font-bangla">
                    {selectedApp.submittedDate}
                  </span>
                </div>
                {selectedApp.data.map((d, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                      {d.label}
                    </span>
                    <span className="text-xs text-gray-900 dark:text-white font-bangla">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-3 uppercase tracking-wider">
                সংযুক্ত দলিল
              </h3>
              <div className="space-y-2">
                {selectedApp.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-[#0F172A] rounded-lg p-2.5"
                  >
                    <FileIcon className="w-8 h-8 text-electric-blue" />
                    <span className="text-xs text-gray-900 dark:text-white font-bangla flex-1">
                      {doc.name}
                    </span>
                    <Download className="w-4 h-4 text-sky-blue" />
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-3 uppercase tracking-wider">
                আবেদনের অগ্রগতি
              </h3>
              <div className="space-y-0">
                {selectedApp.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {t.done ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                      )}
                      {i < selectedApp.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            t.done ? "bg-success/40" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p
                        className={`text-xs font-bangla ${
                          t.done ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {t.step}
                      </p>
                      {t.time && (
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{t.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            {selectedApp.status === "অনুমোদিত" && (
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white text-sm font-bold font-bangla blue-glow">
                সনদ ডাউনলোড
              </button>
            )}
            {selectedApp.status === "চলমান" && (
              <div className="text-center py-3">
                <Clock className="w-5 h-5 text-electric-blue mx-auto mb-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                  আবেদন প্রক্রিয়াধীন আছে
                </p>
              </div>
            )}
            {selectedApp.status === "বাতিল" && (
              <div className="text-center py-3">
                <XCircle className="w-5 h-5 text-bloody-red mx-auto mb-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                  আবেদনটি বাতিল করা হয়েছে
                </p>
              </div>
            )}
          </div>

          <BottomNav role="citizen" />
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-electric-blue" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              আমার আবেদনসমূহ
            </h1>
          </div>

          {/* Tab Bar */}
          <div className="flex gap-1 bg-gray-100 dark:bg-[#1E293B] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-xs font-bangla transition-colors ${
                  activeTab === tab
                    ? "bg-electric-blue text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Application List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {filtered.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl overflow-hidden flex"
            >
              <div className={`w-1 shrink-0 ${stripeColor[app.status]}`} />
              <div className="flex items-center gap-3 p-3 flex-1">
                <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-[#0F172A] flex items-center justify-center shrink-0">
{(() => { const Icon = (app as any).serviceIcon; return <Icon className="w-5 h-5 text-electric-blue" />; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla truncate">
                    {app.serviceName}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                    {app.trackingId}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla">
                    {app.submittedDate}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full font-bangla ${
                      statusColor[app.status]
                    }`}
                  >
                    {app.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

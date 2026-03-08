"use client";

import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle,
  ClipboardList,
  AlertOctagon,
  ChevronRight,
} from "lucide-react";

const stats = [
  { label: "অপেক্ষমাণ আবেদন", value: 12, color: "text-warning", icon: Clock },
  { label: "আজ সম্পন্ন", value: 8, color: "text-success", icon: CheckCircle },
  { label: "নির্ধারিত অভিযোগ", value: 5, color: "text-electric-blue", icon: ClipboardList },
  { label: "বিলম্বিত", value: 3, color: "text-bloody-red", icon: AlertOctagon, pulse: true },
];

const tasks = [
  {
    id: 1,
    type: "application" as const,
    applicant: "আব্দুল করিম",
    service: "জন্ম নিবন্ধন",
    time: "১০ মিনিট আগে",
    priority: "High" as const,
  },
  {
    id: 2,
    type: "complaint" as const,
    applicant: "ফাতেমা বেগম",
    service: "রাস্তা মেরামত অভিযোগ",
    time: "৩০ মিনিট আগে",
    priority: "High" as const,
  },
  {
    id: 3,
    type: "application" as const,
    applicant: "মোহাম্মদ হাসান",
    service: "ট্রেড লাইসেন্স",
    time: "১ ঘন্টা আগে",
    priority: "Medium" as const,
  },
  {
    id: 4,
    type: "complaint" as const,
    applicant: "রহিমা খাতুন",
    service: "পানি সরবরাহ সমস্যা",
    time: "২ ঘন্টা আগে",
    priority: "Medium" as const,
  },
  {
    id: 5,
    type: "application" as const,
    applicant: "সাইফুল ইসলাম",
    service: "নাগরিকত্ব সনদ",
    time: "৩ ঘন্টা আগে",
    priority: "Normal" as const,
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

export default function OfficerDashboardPage() {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-4 pt-4 pb-4 space-y-5">
          {/* Header */}
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              স্বাগতম, রফিকুল ইসলাম
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bangla px-2 py-0.5 rounded-full bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue">
                সচিব
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{today}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla leading-tight">
                    {stat.label}
                  </span>
                </div>
                <span
                  className={`text-2xl font-bold ${stat.color} ${
                    stat.pulse ? "animate-pulse" : ""
                  }`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Today's Tasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white font-bangla">
                আজকের কাজ
              </h2>
              <Link
                href="/mobile/officer/applications"
                className="text-xs text-electric-blue font-bangla flex items-center gap-1"
              >
                সব দেখুন
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {task.type === "application" ? (
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-electric-blue/15 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-electric-blue" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-warning/15 flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white font-bangla">
                          {task.applicant}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">
                          {task.service}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bangla px-2 py-0.5 rounded-full ${
                        priorityStyles[task.priority]
                      }`}
                    >
                      {priorityLabels[task.priority]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bangla flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </span>
                    <Link
                      href="/mobile/officer/applications"
                      className="text-[11px] font-bangla px-3 py-1 rounded-lg bg-blue-50 dark:bg-electric-blue/15 text-electric-blue hover:bg-blue-100 dark:hover:bg-electric-blue/25 transition-colors"
                    >
                      প্রক্রিয়া শুরু করুন
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

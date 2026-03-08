"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { Users, FileText, AlertTriangle, FolderKanban, MapPin, CheckCircle } from "lucide-react";

export default function CouncilorDashboardPage() {
  const [showFullMap, setShowFullMap] = useState(false);

  const stats = [
    { label: "মোট নাগরিক", value: "2,450", icon: Users, color: "text-electric-blue" },
    { label: "আজকের আবেদন", value: "8", icon: FileText, color: "text-sky-blue" },
    { label: "অমীমাংসিত অভিযোগ", value: "12", icon: AlertTriangle, color: "text-warning" },
    { label: "চলমান প্রকল্প", value: "3", icon: FolderKanban, color: "text-success" },
  ];

  const pendingApplications = [
    { id: 1, name: "রহিমা বেগম", service: "জন্ম নিবন্ধন" },
    { id: 2, name: "করিম মিয়া", service: "ট্রেড লাইসেন্স" },
    { id: 3, name: "সালমা আক্তার", service: "ওয়ারিশ সনদ" },
  ];

  const projects = [
    { id: 1, name: "রাস্তা মেরামত - সেক্টর ৩", progress: 75, budget: "৫ লক্ষ" },
    { id: 2, name: "ড্রেনেজ নির্মাণ", progress: 40, budget: "৮ লক্ষ" },
    { id: 3, name: "স্ট্রিটলাইট স্থাপন", progress: 90, budget: "২ লক্ষ" },
  ];

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-5 font-bangla">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-electric-blue/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-electric-blue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue px-2 py-0.5 rounded-full font-bangla">
                ওয়ার্ড ৫ কাউন্সিলর
              </span>
            </div>
            <h1 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">আবদুল করিম</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
              <p className="text-gray-900 dark:text-white text-xl font-bold">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Ward Complaint Map */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2">আমার ওয়ার্ডের অভিযোগ</h2>
          <div className="relative bg-gray-100 dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl h-40 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-300 dark:text-gray-600" />
            </div>
            {/* Colored dots */}
            <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-bloody-red animate-pulse" />
            <div className="absolute top-16 right-16 w-3 h-3 rounded-full bg-warning" />
            <div className="absolute bottom-12 left-24 w-3 h-3 rounded-full bg-electric-blue" />
            <div className="absolute bottom-8 right-10 w-3 h-3 rounded-full bg-success" />
            <button
              onClick={() => setShowFullMap(!showFullMap)}
              className="absolute bottom-2 right-2 text-xs bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue px-3 py-1 rounded-lg font-bangla"
            >
              পূর্ণ ম্যাপ দেখুন
            </button>
          </div>
        </div>

        {/* Pending Applications */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2">অপেক্ষমাণ আবেদন</h2>
          <div className="space-y-2">
            {pendingApplications.map((app) => (
              <div key={app.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-white text-sm font-bangla">{app.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">{app.service}</p>
                </div>
                <button className="bg-green-50 dark:bg-success/20 text-green-700 dark:text-success text-xs px-3 py-1 rounded-lg flex items-center gap-1 font-bangla">
                  <CheckCircle className="w-3 h-3" />
                  অনুমোদন
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2">চলমান প্রকল্প</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 min-w-[200px] flex-shrink-0">
                <p className="text-gray-900 dark:text-white text-sm font-bangla mb-2">{project.name}</p>
                <div className="w-full bg-gray-100 dark:bg-[#0F172A] rounded-full h-2 mb-1">
                  <div
                    className="bg-electric-blue h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-electric-blue text-xs font-bold">{project.progress}%</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla">বাজেট: {project.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav role="councilor" />
    </MobileFrame>
  );
}

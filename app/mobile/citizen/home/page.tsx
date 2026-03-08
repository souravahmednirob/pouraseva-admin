"use client";

import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import Link from "next/link";
import {
  FileText,
  FileX2,
  CreditCard,
  Droplets,
  Store,
  MessageSquareWarning,
  Bell,
  Grid3X3,
  ChevronRight,
} from "lucide-react";

const services = [
  { icon: FileText, label: "জন্ম সনদ", href: "/mobile/citizen/birth-certificate", color: "from-electric-blue to-sky-blue" },
  { icon: FileX2, label: "মৃত্যু সনদ", href: "/mobile/citizen/services", color: "from-sky-blue to-light-blue" },
  { icon: CreditCard, label: "ট্যাক্স", href: "/mobile/citizen/tax-payment", color: "from-electric-blue to-sky-blue" },
  { icon: Droplets, label: "পানির বিল", href: "/mobile/citizen/water-bill", color: "from-sky-blue to-light-blue" },
  { icon: Store, label: "ট্রেড লাইসেন্স", href: "/mobile/citizen/services", color: "from-electric-blue to-sky-blue" },
  { icon: MessageSquareWarning, label: "অভিযোগ", href: "/mobile/citizen/complaint", color: "from-warning to-yellow-500" },
  { icon: Bell, label: "নোটিশ", href: "/mobile/citizen/notices", color: "from-sky-blue to-light-blue" },
  { icon: Grid3X3, label: "সব সেবা", href: "/mobile/citizen/services", color: "from-electric-blue to-sky-blue" },
];

const applications = [
  { service: "জন্ম সনদ", trackingId: "BC-2026-00142", status: "প্রক্রিয়াধীন", statusColor: "text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" },
  { service: "ট্রেড লাইসেন্স", trackingId: "TL-2026-00089", status: "অনুমোদিত", statusColor: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20" },
  { service: "পানির বিল", trackingId: "WB-2026-00231", status: "পেমেন্ট বাকি", statusColor: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20" },
];

export default function HomePage() {
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <div>
              <h1 className="text-gray-900 dark:text-white font-bold text-lg font-bangla">
                স্বাগতম, রহিম উদ্দিন
              </h1>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-electric-blue/15 text-blue-600 dark:text-sky-blue text-xs font-bangla">
                ওয়ার্ড ৩
              </span>
            </div>
            <Link href="/mobile/citizen/notices" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bloody-red" />
            </Link>
          </div>

          {/* Services Grid */}
          <div className="px-5 mt-3">
            <h2 className="text-gray-900 dark:text-white font-semibold text-sm font-bangla mb-3">
              আমার সেবাসমূহ
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.label}
                    href={svc.href}
                    className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none flex flex-col items-center gap-2 py-3 px-1 rounded-xl hover:border-electric-blue/30 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${svc.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bangla text-center leading-tight">
                      {svc.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Applications */}
          <div className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-900 dark:text-white font-semibold text-sm font-bangla">
                আমার আবেদনসমূহ
              </h2>
              <Link
                href="/mobile/citizen/services"
                className="text-sky-blue text-xs font-bangla"
              >
                সব দেখুন
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
              {applications.map((app) => (
                <div
                  key={app.trackingId}
                  className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none min-w-[200px] rounded-xl p-3.5 flex-shrink-0"
                >
                  <p className="text-gray-900 dark:text-white text-sm font-bangla font-semibold">
                    {app.service}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-mono">
                    {app.trackingId}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bangla ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Notice */}
          <div className="px-5 mt-6">
            <h2 className="text-gray-900 dark:text-white font-semibold text-sm font-bangla mb-3">
              সর্বশেষ নোটিশ
            </h2>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white text-sm font-bangla font-semibold">
                    পৌর কর জমাদানের সময়সীমা বৃদ্ধি
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-bangla">
                    ০৫ মার্চ ২০২৬
                  </p>
                </div>
                <Link
                  href="/mobile/citizen/notices"
                  className="flex items-center gap-1 text-sky-blue text-xs font-bangla shrink-0 ml-3"
                >
                  পড়ুন
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

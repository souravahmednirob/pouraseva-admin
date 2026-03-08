"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { MapPin, AlertTriangle, ClipboardCheck, LogIn, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

const tasks = [
  { id: 1, icon: AlertTriangle, category: "অভিযোগ - রাস্তা", address: "৫/এ, মহল্লা রোড", priority: "red" },
  { id: 2, icon: AlertTriangle, category: "অভিযোগ - পানি", address: "১২, বাজার রোড", priority: "red" },
  { id: 3, icon: ClipboardCheck, category: "পরিদর্শন - ড্রেনেজ", address: "৮, স্কুল রোড", priority: "yellow" },
  { id: 4, icon: ClipboardCheck, category: "পরিদর্শন - আলো", address: "২০, কলেজ রোড", priority: "blue" },
];

const priorityColors: Record<string, string> = {
  red: "bg-bloody-red",
  yellow: "bg-warning",
  blue: "bg-electric-blue",
};

export default function StaffDashboardPage() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-5 font-bangla">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-electric-blue/20 flex items-center justify-center text-electric-blue font-bold text-lg">
            জআ
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">জাহাঙ্গীর আলম</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue px-2 py-0.5 rounded-full font-bangla">
                মাঠকর্মী
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">৬ মার্চ ২০২৬</span>
            </div>
          </div>
        </div>

        {/* Check-in Section */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          {!checkedIn ? (
            <button
              onClick={() => setCheckedIn(true)}
              className="w-full bg-gradient-to-r from-electric-blue to-sky-blue text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold font-bangla blue-glow"
            >
              <MapPin className="w-5 h-5" />
              কাজ শুরু করুন (চেক-ইন)
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4 text-success" />
                <span className="text-success text-sm font-bangla">চেক-ইন সময়: সকাল ৯:০০</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla">পৌরসভা কার্যালয়, ওয়ার্ড ৫</span>
              </div>
              <button
                onClick={() => setCheckedIn(false)}
                className="w-full border border-bloody-red text-bloody-red py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bangla"
              >
                <LogOut className="w-4 h-4" />
                চেক-আউট
              </button>
            </div>
          )}
        </div>

        {/* Today's Tasks */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-3">আজকের কাজ</h2>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div key={task.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden flex">
                {/* Priority stripe */}
                <div className={`w-1.5 ${priorityColors[task.priority]} flex-shrink-0`} />
                <div className="flex-1 p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#0F172A] flex items-center justify-center text-electric-blue font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <task.icon className="w-4 h-4 text-warning flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white text-sm font-bangla">{task.category}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">{task.address}</p>
                  </div>
                  <Link
                    href="/mobile/staff/task"
                    className="bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-bangla flex-shrink-0"
                  >
                    শুরু করুন
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-900 dark:text-white text-sm font-bangla">আজকের সম্পন্ন</span>
            <span className="text-electric-blue text-sm font-bold">৩/৫</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-[#0F172A] rounded-full h-2.5">
            <div className="bg-electric-blue h-2.5 rounded-full" style={{ width: "60%" }} />
          </div>
        </div>
      </div>

      <BottomNav role="staff" />
    </MobileFrame>
  );
}

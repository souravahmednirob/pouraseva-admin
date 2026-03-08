"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  User,
  MapPin,
  Users,
  Globe,
  Bell,
  ScanLine,
  HelpCircle,
  Phone,
  Info,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  extra?: string;
  danger?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "আমার তথ্য",
    items: [
      { label: "ব্যক্তিগত তথ্য", icon: User },
      { label: "ঠিকানা", icon: MapPin },
      { label: "পরিবারের সদস্য", icon: Users },
    ],
  },
  {
    title: "সেটিংস",
    items: [
      { label: "ভাষা নির্বাচন", icon: Globe, extra: "বাংলা" },
      { label: "নোটিফিকেশন", icon: Bell },
      { label: "বায়োমেট্রিক লগইন", icon: ScanLine },
    ],
  },
  {
    title: "সহায়তা",
    items: [
      { label: "FAQ", icon: HelpCircle },
      { label: "যোগাযোগ করুন", icon: Phone },
      { label: "অ্যাপ সম্পর্কে", icon: Info },
    ],
  },
];

export default function ProfilePage() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Profile Top Section */}
          <div className="px-4 pt-6 pb-5 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-white font-bangla">
                রউ
              </span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla mb-1">
              রহিম উদ্দিন
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">NID: 19XX XXXX XX23</p>
            <span className="px-3 py-1 bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue text-xs rounded-full font-bangla mb-4">
              ওয়ার্ড ৩
            </span>
            <button className="px-5 py-2 rounded-xl border border-electric-blue text-electric-blue text-xs font-bangla hover:bg-electric-blue/10 transition-colors">
              প্রোফাইল সম্পাদনা
            </button>
          </div>

          {/* Stats Row */}
          <div className="px-4 mb-5">
            <div className="flex gap-3">
              <div className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla mb-1">
                  মোট আবেদন
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">১২</p>
              </div>
              <div className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bangla mb-1">
                  মোট পেমেন্ট
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">৳৪৫,২০০</p>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="px-4 space-y-5">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-2 uppercase tracking-wider px-1">
                  {section.title}
                </h3>
                <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl overflow-hidden">
                  {section.items.map((item, i) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-3 px-4 py-3 ${
                        i < section.items.length - 1
                          ? "border-b border-gray-100 dark:border-gray-700"
                          : ""
                      }`}
                    >
{(() => { const I = (item as any).icon; return <I className="w-5 h-5 text-electric-blue shrink-0" />; })()}
                      <span className="text-sm text-gray-900 dark:text-white font-bangla flex-1 text-left">
                        {item.label}
                      </span>
                      {item.extra && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mr-1">
                          {item.extra}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Logout */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl overflow-hidden">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 px-4 py-3"
              >
                <LogOut className="w-5 h-5 text-bloody-red shrink-0" />
                <span className="text-sm text-bloody-red font-bangla flex-1 text-left">
                  লগআউট
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
              </button>
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* Logout Confirm Dialog */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl p-5 w-full max-w-[280px] relative">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#0F172A] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
                  <LogOut className="w-6 h-6 text-bloody-red" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-1">
                  লগআউট করবেন?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla text-center mb-4">
                  আপনি কি নিশ্চিতভাবে লগআউট করতে চান?
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-[#0F172A] text-gray-500 dark:text-gray-400 text-xs font-bangla"
                  >
                    বাতিল
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-bloody-red text-white text-xs font-bangla">
                    লগআউট
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

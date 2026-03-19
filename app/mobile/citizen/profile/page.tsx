"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
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
  Shield,
  FileText,
  CreditCard,
  MessageSquareWarning,
  Edit3,
  CheckCircle,
} from "lucide-react";

export default function ProfilePage() {
  const { lang, toggleLang, t } = useLang();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const stats = [
    { label: t("মোট আবেদন", "Applications"), value: "১২", icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/15" },
    { label: t("পেমেন্ট", "Payments"), value: "৳৪৫,২০০", icon: CreditCard, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/15" },
    { label: t("অভিযোগ", "Complaints"), value: "৩", icon: MessageSquareWarning, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/15" },
  ];

  const menuSections = [
    {
      title: t("আমার তথ্য", "My Information"),
      items: [
        { label: t("ব্যক্তিগত তথ্য", "Personal Info"), icon: User },
        { label: t("ঠিকানা", "Address"), icon: MapPin },
        { label: t("পরিবারের সদস্য", "Family Members"), icon: Users },
      ],
    },
    {
      title: t("সেটিংস", "Settings"),
      items: [
        { label: t("ভাষা", "Language"), icon: Globe, extra: lang === "bn" ? "বাংলা" : "English", action: "lang" },
        { label: t("নোটিফিকেশন", "Notifications"), icon: Bell, href: "/mobile/shared/notifications" },
        { label: t("বায়োমেট্রিক লগইন", "Biometric Login"), icon: ScanLine },
      ],
    },
    {
      title: t("সহায়তা", "Support"),
      items: [
        { label: "FAQ", icon: HelpCircle },
        { label: t("যোগাযোগ করুন", "Contact Us"), icon: Phone },
        { label: t("অ্যাপ সম্পর্কে", "About App"), icon: Info },
      ],
    },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto">
          {/* ─── Profile Header ─── */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

            <div className="relative px-5 pt-5 pb-8 flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-22 h-22 rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white font-bangla">রউ</span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <Edit3 className="w-4 h-4 text-electric-blue" />
                </button>
              </div>

              <h1 className="text-xl font-bold text-white font-bangla mb-1">
                {t("রহিম উদ্দিন", "Rahim Uddin")}
              </h1>
              <p className="text-blue-100 text-sm mb-2">NID: 19XX XXXX XX23</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bangla border border-white/20">
                  {t("ওয়ার্ড ৩", "Ward 3")}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100 text-xs font-bangla border border-emerald-300/20 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {t("যাচাইকৃত", "Verified")}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Stats Row ─── */}
          <div className="px-5 -mt-5 mb-5">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-4">
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex flex-col items-center gap-1.5">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Menu Sections ─── */}
          <div className="px-5 space-y-5 pb-5">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-2.5 uppercase tracking-wider px-1">
                  {section.title}
                </h3>
                <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl overflow-hidden">
                  {section.items.map((item, i) => {
                    const Icon = item.icon;
                    const isLang = (item as any).action === "lang";
                    const href = (item as any).href;

                    const content = (
                      <div className={`w-full flex items-center gap-3.5 px-4 py-3.5 ${i < section.items.length - 1 ? "border-b border-gray-100 dark:border-gray-700/50" : ""}`}>
                        <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/15 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-electric-blue" />
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white font-bangla flex-1 text-left font-medium">
                          {item.label}
                        </span>
                        {isLang && (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleLang(); }}
                            className="px-3 py-1 rounded-full bg-electric-blue/10 dark:bg-electric-blue/20 text-electric-blue text-xs font-bold"
                          >
                            {item.extra}
                          </button>
                        )}
                        {!isLang && item.extra && (
                          <span className="text-xs text-gray-400 font-bangla">{item.extra}</span>
                        )}
                        <ChevronRight className="w-4.5 h-4.5 text-gray-300 dark:text-gray-600 shrink-0" />
                      </div>
                    );

                    if (href) {
                      return <Link key={item.label} href={href}>{content}</Link>;
                    }
                    if (isLang) {
                      return <button key={item.label} onClick={toggleLang} className="w-full">{content}</button>;
                    }
                    return <button key={item.label} className="w-full">{content}</button>;
                  })}
                </div>
              </div>
            ))}

            {/* Logout */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl overflow-hidden">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3.5 px-4 py-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/15 flex items-center justify-center shrink-0">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm text-red-500 font-bangla flex-1 text-left font-medium">
                  {t("লগআউট", "Logout")}
                </span>
                <ChevronRight className="w-4.5 h-4.5 text-gray-300 dark:text-gray-600 shrink-0" />
              </button>
            </div>

            {/* App Version */}
            <p className="text-center text-gray-400/40 dark:text-gray-500/30 text-[10px] font-mono">
              PouraSeva v1.0.0 | Kaliakair Pilot
            </p>
          </div>
        </div>

        {/* Logout Confirm */}
        {showLogoutConfirm && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 w-full max-w-[300px] shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                  <LogOut className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white font-bangla mb-1">
                  {t("লগআউট করবেন?", "Logout?")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bangla text-center mb-5">
                  {t("আপনি কি নিশ্চিতভাবে লগআউট করতে চান?", "Are you sure you want to logout?")}
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 text-sm font-bangla font-bold"
                  >
                    {t("বাতিল", "Cancel")}
                  </button>
                  <button className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bangla font-bold">
                    {t("লগআউট", "Logout")}
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

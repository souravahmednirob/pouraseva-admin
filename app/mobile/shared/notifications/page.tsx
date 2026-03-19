"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";

function useRole(): "citizen" | "officer" | "councilor" | "staff" {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  if (roleParam === "officer" || roleParam === "councilor" || roleParam === "staff") return roleParam;
  if (typeof window === "undefined") return "citizen";
  const ref = document.referrer || "";
  if (ref.includes("/officer/")) return "officer";
  if (ref.includes("/councilor/")) return "councilor";
  if (ref.includes("/staff/")) return "staff";
  return "citizen";
}
import {
  ArrowLeft,
  FileText,
  CreditCard,
  AlertTriangle,
  Bell,
  Settings,
  CheckCheck,
  Trash2,
  CheckCircle2,
  Clock,
  Megaphone,
  Wrench,
} from "lucide-react";

type Notification = {
  id: number;
  type: "application" | "payment" | "complaint" | "notice" | "system";
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  timeBn: string;
  timeEn: string;
  group: "today" | "week" | "older";
  read: boolean;
};

const typeConfig: Record<string, { icon: React.ElementType; gradient: string; bg: string; color: string }> = {
  application: { icon: FileText, gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-900/15", color: "text-blue-600 dark:text-blue-400" },
  payment: { icon: CreditCard, gradient: "from-emerald-500 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-900/15", color: "text-emerald-600 dark:text-emerald-400" },
  complaint: { icon: AlertTriangle, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-900/15", color: "text-amber-600 dark:text-amber-400" },
  notice: { icon: Megaphone, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-900/15", color: "text-violet-600 dark:text-violet-400" },
  system: { icon: Wrench, gradient: "from-slate-500 to-gray-500", bg: "bg-slate-50 dark:bg-slate-900/15", color: "text-slate-600 dark:text-slate-400" },
};

const initialNotifications: Notification[] = [
  { id: 1, type: "application", titleBn: "আবেদন অনুমোদিত", titleEn: "Application Approved", descBn: "আপনার জন্ম নিবন্ধন আবেদন অনুমোদিত হয়েছে। সনদ ডাউনলোড করুন।", descEn: "Your birth registration application has been approved. Download certificate.", timeBn: "১০ মিনিট আগে", timeEn: "10 min ago", group: "today", read: false },
  { id: 2, type: "payment", titleBn: "পেমেন্ট সফল", titleEn: "Payment Successful", descBn: "হোল্ডিং ট্যাক্স ৳৫,০০০ সফলভাবে পরিশোধিত হয়েছে।", descEn: "Holding tax ৳5,000 paid successfully.", timeBn: "২ ঘণ্টা আগে", timeEn: "2 hours ago", group: "today", read: false },
  { id: 3, type: "complaint", titleBn: "অভিযোগ আপডেট", titleEn: "Complaint Update", descBn: "আপনার রাস্তা সংক্রান্ত অভিযোগ প্রক্রিয়াধীন আছে।", descEn: "Your road complaint is being processed.", timeBn: "৫ ঘণ্টা আগে", timeEn: "5 hours ago", group: "today", read: true },
  { id: 4, type: "notice", titleBn: "নতুন নোটিশ", titleEn: "New Notice", descBn: "পৌরসভার বার্ষিক সভা ১৫ মার্চ অনুষ্ঠিত হবে।", descEn: "Annual municipal meeting on March 15.", timeBn: "১ দিন আগে", timeEn: "1 day ago", group: "week", read: false },
  { id: 5, type: "application", titleBn: "আবেদন জমা হয়েছে", titleEn: "Application Submitted", descBn: "ট্রেড লাইসেন্স আবেদন সফলভাবে জমা হয়েছে।", descEn: "Trade license application submitted.", timeBn: "২ দিন আগে", timeEn: "2 days ago", group: "week", read: true },
  { id: 6, type: "system", titleBn: "সিস্টেম রক্ষণাবেক্ষণ", titleEn: "System Maintenance", descBn: "আগামী শনিবার রাত ১২টায় সিস্টেম রক্ষণাবেক্ষণ হবে।", descEn: "System maintenance scheduled for Saturday midnight.", timeBn: "৩ দিন আগে", timeEn: "3 days ago", group: "week", read: true },
  { id: 7, type: "payment", titleBn: "পেমেন্ট অনুস্মারক", titleEn: "Payment Reminder", descBn: "পানি বিল পরিশোধের সময়সীমা ৫ দিন বাকি।", descEn: "Water bill due in 5 days.", timeBn: "৫ দিন আগে", timeEn: "5 days ago", group: "older", read: true },
  { id: 8, type: "complaint", titleBn: "অভিযোগ সমাধান", titleEn: "Complaint Resolved", descBn: "ড্রেনেজ সমস্যা সমাধান হয়েছে। আপনার মতামত দিন।", descEn: "Drainage issue resolved. Share your feedback.", timeBn: "১ সপ্তাহ আগে", timeEn: "1 week ago", group: "older", read: true },
];

const groups = [
  { key: "today" as const, bn: "আজকে", en: "Today" },
  { key: "week" as const, bn: "এই সপ্তাহ", en: "This Week" },
  { key: "older" as const, bn: "আগে", en: "Earlier" },
];

export default function NotificationsPage() {
  const { t } = useLang();
  const role = useRole();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const filters = [
    { key: "all", label: t("সব", "All"), count: notifications.length },
    { key: "unread", label: t("অপঠিত", "Unread"), count: unreadCount },
    { key: "application", label: t("আবেদন", "Apps"), count: notifications.filter((n) => n.type === "application").length },
    { key: "payment", label: t("পেমেন্ট", "Pay"), count: notifications.filter((n) => n.type === "payment").length },
  ];

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* ─── Header ─── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />

          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => window.history.back()} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">{t("নোটিফিকেশন", "Notifications")}</h1>
                {unreadCount > 0 && (
                  <p className="text-blue-100 text-xs font-bangla">{unreadCount}{t("টি অপঠিত", " unread")}</p>
                )}
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bangla flex items-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5" />
                  {t("সব পড়া", "Read all")}
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 bg-white/10 rounded-xl p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bangla font-medium transition-all ${
                    activeFilter === f.key
                      ? "bg-white text-electric-blue shadow-sm"
                      : "text-white/70"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Notification List ─── */}
        <div className="flex-1 overflow-y-auto pt-3 px-5 pb-4">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-400 font-bangla text-sm">{t("কোনো নোটিফিকেশন নেই", "No notifications")}</p>
            </div>
          )}

          {groups.map((group) => {
            const items = filtered.filter((n) => n.group === group.key);
            if (items.length === 0) return null;
            return (
              <div key={group.key} className="mb-5">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-2.5 uppercase tracking-wider">
                  {t(group.bn, group.en)}
                </p>
                <div className="space-y-2.5">
                  {items.map((notif) => {
                    const config = typeConfig[notif.type];
                    const Icon = config.icon;
                    return (
                      <button
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={`w-full text-left cursor-pointer bg-white dark:bg-[#1E293B] border shadow-sm dark:shadow-none rounded-2xl p-4 flex items-start gap-3.5 transition-all active:scale-[0.98] hover:shadow-md ${
                          !notif.read
                            ? "border-blue-200 dark:border-blue-700/30 bg-blue-50/30 dark:bg-blue-950/10"
                            : "border-gray-100 dark:border-gray-700/50"
                        }`}
                      >
                        <div className={`w-11 h-11 rounded-xl ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <p className={`text-sm font-bangla leading-snug ${!notif.read ? "text-gray-900 dark:text-white font-bold" : "text-gray-600 dark:text-gray-300 font-medium"}`}>
                              {t(notif.titleBn, notif.titleEn)}
                            </p>
                            {!notif.read && (
                              <div className="w-2.5 h-2.5 rounded-full bg-electric-blue shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla line-clamp-2 leading-relaxed">
                            {t(notif.descBn, notif.descEn)}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">
                              {t(notif.timeBn, notif.timeEn)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <BottomNav role={role} />
      </div>
    </MobileFrame>
  );
}

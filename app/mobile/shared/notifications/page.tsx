"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { FileText, CreditCard, AlertTriangle, Bell, Settings } from "lucide-react";

type Notification = {
  id: number;
  type: "application" | "payment" | "complaint" | "notice" | "system";
  title: string;
  description: string;
  time: string;
  group: "আজকে" | "এই সপ্তাহ" | "আগে";
  read: boolean;
};

const typeConfig = {
  application: { icon: FileText, color: "bg-electric-blue" },
  payment: { icon: CreditCard, color: "bg-success" },
  complaint: { icon: AlertTriangle, color: "bg-bloody-red" },
  notice: { icon: Bell, color: "bg-warning" },
  system: { icon: Settings, color: "bg-silver" },
};

const initialNotifications: Notification[] = [
  { id: 1, type: "application", title: "আবেদন অনুমোদিত", description: "আপনার জন্ম নিবন্ধন আবেদন অনুমোদিত হয়েছে", time: "১০ মিনিট আগে", group: "আজকে", read: false },
  { id: 2, type: "payment", title: "পেমেন্ট সফল", description: "হোল্ডিং ট্যাক্স ৫,০০০৳ সফলভাবে পরিশোধিত", time: "২ ঘণ্টা আগে", group: "আজকে", read: false },
  { id: 3, type: "complaint", title: "অভিযোগ আপডেট", description: "আপনার রাস্তা সংক্রান্ত অভিযোগ প্রক্রিয়াধীন", time: "৫ ঘণ্টা আগে", group: "আজকে", read: true },
  { id: 4, type: "notice", title: "নতুন নোটিশ", description: "পৌরসভার বার্ষিক সভা ১৫ মার্চ অনুষ্ঠিত হবে", time: "১ দিন আগে", group: "এই সপ্তাহ", read: false },
  { id: 5, type: "application", title: "আবেদন জমা হয়েছে", description: "ট্রেড লাইসেন্স আবেদন সফলভাবে জমা হয়েছে", time: "২ দিন আগে", group: "এই সপ্তাহ", read: true },
  { id: 6, type: "system", title: "সিস্টেম রক্ষণাবেক্ষণ", description: "আগামী শনিবার রাত ১২টায় সিস্টেম রক্ষণাবেক্ষণ হবে", time: "৩ দিন আগে", group: "এই সপ্তাহ", read: true },
  { id: 7, type: "payment", title: "পেমেন্ট অনুস্মারক", description: "পানি বিল পরিশোধের সময়সীমা ৫ দিন বাকি", time: "৫ দিন আগে", group: "আগে", read: true },
  { id: 8, type: "complaint", title: "অভিযোগ সমাধান", description: "ড্রেনেজ সমস্যা সমাধান হয়েছে বলে নিশ্চিত করা হয়েছে", time: "১ সপ্তাহ আগে", group: "আগে", read: true },
];

const groups: Array<"আজকে" | "এই সপ্তাহ" | "আগে"> = ["আজকে", "এই সপ্তাহ", "আগে"];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-4 font-bangla">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">নোটিফিকেশন</h1>
          <button onClick={markAllRead} className="text-electric-blue text-xs font-bangla">
            সব পড়া হয়েছে
          </button>
        </div>

        {/* Grouped List */}
        {groups.map((group) => {
          const items = notifications.filter((n) => n.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-2 uppercase">{group}</p>
              <div className="space-y-2">
                {items.map((notif) => {
                  const config = typeConfig[notif.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={notif.id}
                      className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex items-start gap-3"
                    >
                      <div className={`w-9 h-9 rounded-full ${config.color === "bg-electric-blue" ? "bg-blue-50 dark:bg-electric-blue/20" : config.color === "bg-success" ? "bg-green-50 dark:bg-success/20" : config.color === "bg-bloody-red" ? "bg-red-50 dark:bg-bloody-red/20" : config.color === "bg-warning" ? "bg-amber-50 dark:bg-warning/20" : "bg-gray-100 dark:bg-gray-700/20"} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${config.color === "bg-electric-blue" ? "text-electric-blue" : config.color === "bg-success" ? "text-success" : config.color === "bg-bloody-red" ? "text-bloody-red" : config.color === "bg-warning" ? "text-warning" : "text-gray-500 dark:text-gray-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bangla ${!notif.read ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                          {notif.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla line-clamp-1">{notif.description}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-electric-blue flex-shrink-0 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Swipe hint */}
        <p className="text-center text-gray-400/40 dark:text-gray-500/40 text-[10px] font-bangla">সোয়াইপ করে মুছুন</p>
      </div>

      <BottomNav role="citizen" />
    </MobileFrame>
  );
}

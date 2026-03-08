"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  Globe,
  Moon,
  Type,
  ScanLine,
  Lock,
  Timer,
  BellRing,
  MessageSquare,
  FileText,
  CreditCard,
  AlertTriangle,
  Bell,
  Info,
  ScrollText,
  Shield,
  Phone,
  ChevronRight,
} from "lucide-react";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
        on ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
          on ? "translate-x-5.5 left-[1px]" : "left-[2px]"
        }`}
        style={{ transform: on ? "translateX(22px)" : "translateX(0)" }}
      />
    </button>
  );
}

type SettingItem = {
  icon: React.ElementType;
  label: string;
  type: "toggle" | "value" | "link";
  stateKey?: string;
  value?: string;
};

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    darkMode: true,
    biometric: false,
    pushNotifications: true,
    smsAlerts: false,
    appNotif: true,
    paymentNotif: true,
    complaintNotif: true,
    noticeNotif: true,
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: "পছন্দ",
      items: [
        { icon: Globe, label: "ভাষা", type: "value", value: "বাংলা" },
        { icon: Moon, label: "ডার্ক মোড", type: "toggle", stateKey: "darkMode" },
        { icon: Type, label: "ফন্ট সাইজ", type: "value", value: "মাঝারি" },
      ],
    },
    {
      title: "নিরাপত্তা",
      items: [
        { icon: ScanLine, label: "বায়োমেট্রিক লগইন", type: "toggle", stateKey: "biometric" },
        { icon: Lock, label: "PIN পরিবর্তন", type: "link" },
        { icon: Timer, label: "Session timeout", type: "value", value: "৩০ মিনিট" },
      ],
    },
    {
      title: "নোটিফিকেশন",
      items: [
        { icon: BellRing, label: "Push Notifications", type: "toggle", stateKey: "pushNotifications" },
        { icon: MessageSquare, label: "SMS Alerts", type: "toggle", stateKey: "smsAlerts" },
        { icon: FileText, label: "আবেদন", type: "toggle", stateKey: "appNotif" },
        { icon: CreditCard, label: "পেমেন্ট", type: "toggle", stateKey: "paymentNotif" },
        { icon: AlertTriangle, label: "অভিযোগ", type: "toggle", stateKey: "complaintNotif" },
        { icon: Bell, label: "নোটিশ", type: "toggle", stateKey: "noticeNotif" },
      ],
    },
    {
      title: "সম্পর্কে",
      items: [
        { icon: Info, label: "অ্যাপ সংস্করণ", type: "value", value: "v1.0.0" },
        { icon: ScrollText, label: "শর্তাবলী", type: "link" },
        { icon: Shield, label: "গোপনীয়তা নীতি", type: "link" },
        { icon: Phone, label: "যোগাযোগ করুন", type: "link" },
      ],
    },
  ];

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-6 font-bangla">
        <h1 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">সেটিংস</h1>

        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bangla mb-2 tracking-wider">
              {section.title}
            </p>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              {section.items.map((item, index) => {
                const Icon = (item as any).icon;
                const isLast = index === section.items.length - 1;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-4 py-4 ${
                      !isLast ? "border-b border-gray-100 dark:border-gray-700/50" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 text-electric-blue flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white text-sm font-bangla flex-1">{item.label}</span>
                    {item.type === "toggle" && item.stateKey && (
                      <Toggle on={toggles[item.stateKey]} onToggle={() => handleToggle(item.stateKey!)} />
                    )}
                    {item.type === "value" && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{item.value}</span>
                    )}
                    {item.type === "link" && (
                      <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <BottomNav role="citizen" />
    </MobileFrame>
  );
}

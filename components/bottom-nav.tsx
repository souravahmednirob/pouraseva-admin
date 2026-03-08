"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, CreditCard, MessageSquareWarning, User, Briefcase, ClipboardList, Bell, Settings, MapPin, CheckSquare, Clock } from "lucide-react";

type NavItem = { label: string; icon: React.ElementType; href: string };

const citizenNav: NavItem[] = [
  { label: "হোম", icon: Home, href: "/mobile/citizen/home" },
  { label: "সেবা", icon: Grid3X3, href: "/mobile/citizen/services" },
  { label: "পেমেন্ট", icon: CreditCard, href: "/mobile/citizen/payments" },
  { label: "অভিযোগ", icon: MessageSquareWarning, href: "/mobile/citizen/complaint" },
  { label: "প্রোফাইল", icon: User, href: "/mobile/citizen/profile" },
];

const officerNav: NavItem[] = [
  { label: "ড্যাশবোর্ড", icon: Home, href: "/mobile/officer/dashboard" },
  { label: "আবেদন", icon: ClipboardList, href: "/mobile/officer/applications" },
  { label: "সনদ", icon: Briefcase, href: "/mobile/officer/certificate" },
  { label: "নোটিশ", icon: Bell, href: "/mobile/shared/notifications" },
  { label: "প্রোফাইল", icon: User, href: "/mobile/shared/settings" },
];

const councilorNav: NavItem[] = [
  { label: "ড্যাশবোর্ড", icon: Home, href: "/mobile/councilor/dashboard" },
  { label: "নাগরিক", icon: User, href: "/mobile/councilor/citizens" },
  { label: "অভিযোগ", icon: MessageSquareWarning, href: "/mobile/councilor/complaints" },
  { label: "নোটিশ", icon: Bell, href: "/mobile/shared/notifications" },
  { label: "সেটিংস", icon: Settings, href: "/mobile/shared/settings" },
];

const staffNav: NavItem[] = [
  { label: "ড্যাশবোর্ড", icon: Home, href: "/mobile/staff/dashboard" },
  { label: "কাজ", icon: CheckSquare, href: "/mobile/staff/task" },
  { label: "হাজিরা", icon: Clock, href: "/mobile/staff/attendance" },
  { label: "নোটিশ", icon: Bell, href: "/mobile/shared/notifications" },
  { label: "সেটিংস", icon: Settings, href: "/mobile/shared/settings" },
];

const navMap: Record<string, NavItem[]> = {
  citizen: citizenNav,
  officer: officerNav,
  councilor: councilorNav,
  staff: staffNav,
};

export default function BottomNav({ role }: { role: "citizen" | "officer" | "councilor" | "staff" }) {
  const pathname = usePathname();
  const items = navMap[role];

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 px-2 pb-5 pt-2 z-50">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {(() => { const I = (item as any).icon; return <I className="w-5 h-5" />; })()}
              <span className="text-[10px] font-bangla">{item.label}</span>
              {isActive && <div className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

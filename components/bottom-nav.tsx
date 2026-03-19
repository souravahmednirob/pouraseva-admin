"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/language-context";
import { Home, Grid3X3, CreditCard, MessageSquareWarning, User, Briefcase, ClipboardList, Bell, Settings, MapPin, CheckSquare, Clock } from "lucide-react";

type NavItem = { bn: string; en: string; icon: React.ElementType; href: string };

const citizenNav: NavItem[] = [
  { bn: "হোম", en: "Home", icon: Home, href: "/mobile/citizen/home" },
  { bn: "সেবা", en: "Services", icon: Grid3X3, href: "/mobile/citizen/services" },
  { bn: "পেমেন্ট", en: "Payments", icon: CreditCard, href: "/mobile/citizen/payments" },
  { bn: "অভিযোগ", en: "Complaint", icon: MessageSquareWarning, href: "/mobile/citizen/complaint" },
  { bn: "প্রোফাইল", en: "Profile", icon: User, href: "/mobile/citizen/profile" },
];

const officerNav: NavItem[] = [
  { bn: "ড্যাশবোর্ড", en: "Dashboard", icon: Home, href: "/mobile/officer/dashboard" },
  { bn: "আবেদন", en: "Apps", icon: ClipboardList, href: "/mobile/officer/applications" },
  { bn: "সনদ", en: "Certs", icon: Briefcase, href: "/mobile/officer/certificate" },
  { bn: "নোটিশ", en: "Notices", icon: Bell, href: "/mobile/shared/notifications" },
  { bn: "প্রোফাইল", en: "Profile", icon: User, href: "/mobile/shared/settings" },
];

const councilorNav: NavItem[] = [
  { bn: "ড্যাশবোর্ড", en: "Dashboard", icon: Home, href: "/mobile/councilor/dashboard" },
  { bn: "নাগরিক", en: "Citizens", icon: User, href: "/mobile/councilor/citizens" },
  { bn: "অভিযোগ", en: "Complaints", icon: MessageSquareWarning, href: "/mobile/councilor/complaints" },
  { bn: "নোটিশ", en: "Notices", icon: Bell, href: "/mobile/shared/notifications" },
  { bn: "সেটিংস", en: "Settings", icon: Settings, href: "/mobile/shared/settings" },
];

const staffNav: NavItem[] = [
  { bn: "ড্যাশবোর্ড", en: "Dashboard", icon: Home, href: "/mobile/staff/dashboard" },
  { bn: "কাজ", en: "Tasks", icon: CheckSquare, href: "/mobile/staff/task" },
  { bn: "হাজিরা", en: "Attend", icon: Clock, href: "/mobile/staff/attendance" },
  { bn: "নোটিশ", en: "Notices", icon: Bell, href: "/mobile/shared/notifications" },
  { bn: "সেটিংস", en: "Settings", icon: Settings, href: "/mobile/shared/settings" },
];

const navMap: Record<string, NavItem[]> = {
  citizen: citizenNav,
  officer: officerNav,
  councilor: councilorNav,
  staff: staffNav,
};

export default function BottomNav({ role }: { role: "citizen" | "officer" | "councilor" | "staff" }) {
  const pathname = usePathname();
  const { t } = useLang();
  const items = navMap[role];

  const getHref = (href: string) => {
    if (href.startsWith("/mobile/shared/")) {
      return `${href}?role=${role}`;
    }
    return href;
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-3 pb-6 pt-2.5 z-50">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={getHref(item.href)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? "text-electric-blue dark:text-sky-blue" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {(() => { const I = (item as any).icon; return <I className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />; })()}
              <span className={`text-[11px] font-bangla ${isActive ? "font-bold" : ""}`}>{t(item.bn, item.en)}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-electric-blue dark:bg-sky-blue" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

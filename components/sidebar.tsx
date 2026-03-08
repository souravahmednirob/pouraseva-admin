"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";
import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  MessageSquareWarning,
  Bell,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/super-admin/dashboard" },
  { label: "Pourashavas", icon: Building2, href: "/super-admin/pourashavas" },
  { label: "Citizens", icon: Users, href: "/super-admin/citizens" },
  { label: "Revenue", icon: DollarSign, href: "/super-admin/revenue" },
  { label: "Complaints", icon: MessageSquareWarning, href: "/super-admin/complaints" },
  { label: "Notices", icon: Bell, href: "/super-admin/notices" },
  { label: "Settings", icon: Settings, href: "/super-admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-white dark:bg-[#1E293B] border-r border-gray-100 dark:border-gray-700 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <Link href="/super-admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center blue-glow">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Poura<span className="text-electric-blue">Seva</span>
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Super Admin</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 mx-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-3 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle + Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
        <ThemeToggle className="w-full justify-center" />
        <Link
          href="/super-admin/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}

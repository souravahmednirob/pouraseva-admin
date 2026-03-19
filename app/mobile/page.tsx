"use client";

import Link from "next/link";
import { Shield, Users, UserCheck, MapPin, Wrench, Monitor, Crown, Presentation } from "lucide-react";

const mobileRoles = [
  {
    title: "নাগরিক",
    subtitle: "Citizen",
    description: "সেবা গ্রহণ, পেমেন্ট, অভিযোগ",
    icon: Users,
    href: "/mobile/citizen/splash",
    color: "from-blue-500 to-sky-500",
    iconBg: "bg-blue-50 dark:bg-blue-900/15",
  },
  {
    title: "কর্মকর্তা",
    subtitle: "Officer / Secretary",
    description: "আবেদন প্রক্রিয়াকরণ, সনদ প্রদান",
    icon: UserCheck,
    href: "/mobile/officer/login",
    color: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/15",
  },
  {
    title: "ওয়ার্ড কাউন্সিলর",
    subtitle: "Ward Councilor",
    description: "ওয়ার্ড ব্যবস্থাপনা, নাগরিক সেবা",
    icon: MapPin,
    href: "/mobile/councilor/dashboard",
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-50 dark:bg-indigo-900/15",
  },
  {
    title: "মাঠকর্মী",
    subtitle: "Field Staff",
    description: "কাজ সম্পাদন, হাজিরা, অভিযোগ সমাধান",
    icon: Wrench,
    href: "/mobile/staff/dashboard",
    color: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-50 dark:bg-orange-900/15",
  },
];

const adminRoles = [
  {
    title: "মেয়র প্যানেল",
    subtitle: "Mayor Portal",
    description: "ড্যাশবোর্ড, রাজস্ব, কর্মচারী",
    icon: Crown,
    href: "/mayor/login",
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50 dark:bg-violet-900/15",
  },
  {
    title: "সুপার অ্যাডমিন",
    subtitle: "Super Admin",
    description: "পৌরসভা ব্যবস্থাপনা, অ্যানালিটিক্স",
    icon: Monitor,
    href: "/super-admin/login",
    color: "from-slate-600 to-gray-500",
    iconBg: "bg-slate-50 dark:bg-slate-900/15",
  },
  {
    title: "প্রস্তাবনা",
    subtitle: "Proposal Deck",
    description: "প্রকল্পের প্রেজেন্টেশন স্লাইড",
    icon: Presentation,
    href: "/proposal",
    color: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-50 dark:bg-rose-900/15",
  },
];

export default function MobileIndex() {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A] flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Poura<span className="text-blue-600 dark:text-sky-400">Seva</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-bangla">ডিজিটাল পৌরসভা প্ল্যাটফর্ম — ভূমিকা নির্বাচন করুন</p>
        </div>

        {/* ─── Mobile App Roles ─── */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-bangla font-bold uppercase tracking-wider px-1 mb-3">মোবাইল অ্যাপ · Mobile App</p>
          <div className="grid grid-cols-2 gap-3">
            {mobileRoles.map((role) => (
              <Link
                key={role.href}
                href={role.href}
                className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-sm dark:shadow-none p-5 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <role.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-base font-bold font-bangla text-gray-900 dark:text-gray-100">{role.title}</h2>
                <p className="text-[11px] text-blue-600 dark:text-sky-400 font-medium mb-1">{role.subtitle}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla leading-relaxed">{role.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Admin & Proposal ─── */}
        <div className="mt-6">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-bangla font-bold uppercase tracking-wider px-1 mb-3">অ্যাডমিন ও প্রস্তাবনা · Admin & Proposal</p>
          <div className="space-y-2.5">
            {adminRoles.map((role) => (
              <Link
                key={role.href}
                href={role.href}
                className="flex items-center gap-4 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-sm dark:shadow-none p-4 hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <role.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold font-bangla text-gray-900 dark:text-gray-100">{role.title}</h2>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla">{role.description}</p>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium shrink-0">{role.subtitle} →</span>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-300 dark:text-gray-600 text-[10px] mt-8 font-mono">
          PouraSeva Platform v1.0
        </p>
      </div>
    </div>
  );
}

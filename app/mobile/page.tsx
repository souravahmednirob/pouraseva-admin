"use client";

import Link from "next/link";
import { Shield, Users, UserCheck, MapPin, Wrench } from "lucide-react";

const roles = [
  {
    title: "নাগরিক",
    subtitle: "Citizen",
    description: "সেবা গ্রহণ, পেমেন্ট, অভিযোগ",
    icon: Users,
    href: "/mobile/citizen/splash",
    color: "from-electric-blue to-sky-blue",
  },
  {
    title: "কর্মকর্তা",
    subtitle: "Officer / Secretary",
    description: "আবেদন প্রক্রিয়াকরণ, সনদ প্রদান",
    icon: UserCheck,
    href: "/mobile/officer/login",
    color: "from-success to-emerald-400",
  },
  {
    title: "ওয়ার্ড কাউন্সিলর",
    subtitle: "Ward Councilor",
    description: "ওয়ার্ড ব্যবস্থাপনা, নাগরিক সেবা",
    icon: MapPin,
    href: "/mobile/councilor/dashboard",
    color: "from-warning to-amber-400",
  },
  {
    title: "মাঠকর্মী",
    subtitle: "Field Staff",
    description: "কাজ সম্পাদন, হাজিরা, অভিযোগ সমাধান",
    icon: Wrench,
    href: "/mobile/staff/dashboard",
    color: "from-bloody-red to-crimson-glow",
  },
];

export default function MobileIndex() {
  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center mx-auto mb-4 blue-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Poura<span className="text-electric-blue">Seva</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-bangla">মোবাইল অ্যাপ ডেমো — ভূমিকা নির্বাচন করুন</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 group hover:blue-glow transition-all hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-3`}>
                <role.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold font-bangla text-gray-900 dark:text-gray-100">{role.title}</h2>
              <p className="text-xs text-electric-blue mb-1">{role.subtitle}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{role.description}</p>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-400/40 dark:text-gray-500/40 text-xs mt-8">
          PouraSeva Platform v1.0 | Mobile Prototype
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  FileText,
  FileX2,
  CreditCard,
  Droplets,
  Store,
  MessageSquareWarning,
  Users,
  Landmark,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const categories = ["সব", "সনদ", "পেমেন্ট", "লাইসেন্স", "অন্যান্য"];

const allServices = [
  { icon: FileText, name: "জন্ম সনদ", description: "জন্ম নিবন্ধন সনদ আবেদন", time: "৩-৫ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate" },
  { icon: FileX2, name: "মৃত্যু সনদ", description: "মৃত্যু নিবন্ধন সনদ আবেদন", time: "৩-৫ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate" },
  { icon: Users, name: "নাগরিক সনদ", description: "নাগরিকত্ব সনদ আবেদন", time: "৫-৭ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate" },
  { icon: ShieldCheck, name: "চারিত্রিক সনদ", description: "চারিত্রিক সনদ আবেদন", time: "৫-৭ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate" },
  { icon: CreditCard, name: "পৌর কর পরিশোধ", description: "হোল্ডিং ট্যাক্স অনলাইনে পরিশোধ", time: "তাৎক্ষণিক", category: "পেমেন্ট", href: "/mobile/citizen/tax-payment" },
  { icon: Droplets, name: "পানির বিল", description: "পানি সরবরাহ বিল পরিশোধ", time: "তাৎক্ষণিক", category: "পেমেন্ট", href: "/mobile/citizen/water-bill" },
  { icon: Store, name: "ট্রেড লাইসেন্স", description: "ব্যবসা পরিচালনার লাইসেন্স আবেদন", time: "৭-১০ দিন", category: "লাইসেন্স", href: "/mobile/citizen/birth-certificate" },
  { icon: Landmark, name: "ভবন নির্মাণ অনুমতি", description: "ভবন নির্মাণের অনুমোদন আবেদন", time: "১৫-৩০ দিন", category: "লাইসেন্স", href: "/mobile/citizen/birth-certificate" },
  { icon: MessageSquareWarning, name: "অভিযোগ দাখিল", description: "পৌরসভা সংক্রান্ত অভিযোগ জানান", time: "২৪ ঘণ্টা", category: "অন্যান্য", href: "/mobile/citizen/complaint" },
  { icon: ScrollText, name: "ওয়ারিশ সনদ", description: "উত্তরাধিকার সনদ আবেদন", time: "৭-১০ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate" },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");

  const filteredServices = allServices.filter((svc) => {
    const matchCategory =
      activeCategory === "সব" || svc.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      svc.name.includes(searchQuery) ||
      svc.description.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="px-5 pt-4 pb-2">
            <h1 className="text-gray-900 dark:text-white font-bold text-lg font-bangla">
              সেবাসমূহ
            </h1>
          </div>

          {/* Search Bar */}
          <div className="px-5 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সেবা খুঁজুন"
                className="w-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:border-electric-blue focus:outline-none transition-colors font-bangla"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bangla font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-electric-blue text-white"
                    : "bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service List */}
          <div className="px-5 flex flex-col gap-3 pb-4">
            {filteredServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.name}
                  href={svc.href}
                  className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-3.5 flex items-center gap-3 hover:border-electric-blue/30 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white text-sm font-bangla font-bold truncate">
                      {svc.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bangla mt-0.5 truncate">
                      {svc.description}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-electric-blue/10 text-blue-600 dark:text-sky-blue text-[10px] font-bangla">
                      {svc.time}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-4 h-4 text-sky-blue shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

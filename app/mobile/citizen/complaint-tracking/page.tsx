"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowLeft,
  Search,
  Route,
  Phone,
  Star,
  Clock,
} from "lucide-react";

const timelineSteps = [
  {
    label: "অভিযোগ গৃহীত",
    timestamp: "১৫ জানুয়ারি, সকাল ১০:৩০",
    status: "completed" as const,
  },
  {
    label: "দায়িত্ব প্রদান",
    timestamp: "১৫ জানুয়ারি, দুপুর ২:১৫",
    status: "completed" as const,
  },
  {
    label: "প্রক্রিয়াধীন",
    timestamp: "১৬ জানুয়ারি, সকাল ৯:০০",
    status: "current" as const,
  },
  {
    label: "সমাধান হয়েছে",
    timestamp: "",
    status: "future" as const,
  },
];

export default function ComplaintTrackingPage() {
  const [trackingNo, setTrackingNo] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <MobileFrame>
      <div className="flex flex-col h-full pb-0">
        {/* Header */}
        <div className="px-4 pt-2 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/mobile/citizen/complaint" className="text-gray-500 dark:text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              অভিযোগ ট্র্যাকিং
            </h1>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:border-electric-blue"
              placeholder="ট্র্যাকিং নম্বর লিখুন"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
            />
            <button
              onClick={() => setShowResult(true)}
              className="bg-electric-blue text-white px-4 rounded-lg flex items-center gap-1 font-bangla text-sm"
            >
              <Search className="w-4 h-4" /> ট্র্যাক করুন
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {showResult && (
            <div className="space-y-4">
              {/* Complaint Info */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-electric-blue/20 flex items-center justify-center">
                    <Route className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-bangla font-semibold">
                      রাস্তা
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">
                      সড়ক সমস্যা
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">ট্র্যাকিং ID</span>
                    <span className="text-electric-blue font-mono font-semibold">
                      CMP-2024-00892
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">দাখিলের তারিখ</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      ১৫ জানুয়ারি ২০২৪
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">ওয়ার্ড</span>
                    <span className="text-gray-900 dark:text-white font-bangla">ওয়ার্ড ৩</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-4">
                  অভিযোগের অবস্থা
                </h3>
                <div className="space-y-0">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Circle + Line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex-shrink-0 ${
                            step.status === "completed"
                              ? "w-4 h-4 rounded-full bg-electric-blue"
                              : step.status === "current"
                              ? "w-4 h-4 rounded-full border-2 border-electric-blue animate-pulse"
                              : "w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                        {i < timelineSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-12 ${
                              step.status === "completed"
                                ? "bg-electric-blue"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6">
                        <p
                          className={`text-sm font-bangla font-semibold ${
                            step.status === "future"
                              ? "text-gray-400 dark:text-gray-500"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.timestamp && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla mt-0.5">
                            {step.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Staff */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4">
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-3 text-sm">
                  দায়িত্বপ্রাপ্ত কর্মকর্তা
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white font-bangla font-semibold">
                      জাহাঙ্গীর আলম
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">মাঠকর্মী</p>
                  </div>
                  <a
                    href="tel:01712345678"
                    className="flex items-center gap-1.5 bg-blue-50 dark:bg-electric-blue/20 text-electric-blue px-3 py-2 rounded-lg text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-mono text-xs">০১৭১২৩৪৫৬৭৮</span>
                  </a>
                </div>
              </div>

              {/* Estimated Resolution */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-electric-blue/30 rounded-xl p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-electric-blue" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">
                    আনুমানিক সমাধানের সময়
                  </p>
                  <p className="text-blue-600 dark:text-electric-blue font-bangla font-semibold">
                    ২-৩ কার্যদিবসের মধ্যে
                  </p>
                </div>
              </div>

              {/* Resolved Toggle (for demo) */}
              <div className="flex items-center justify-between bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                <span className="text-gray-500 dark:text-gray-400 font-bangla text-sm">
                  সমাধান হয়েছে? (ডেমো টগল)
                </span>
                <button
                  onClick={() => setShowResolved(!showResolved)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    showResolved ? "bg-success" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                      showResolved ? "left-6" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Rating Section */}
              {showResolved && (
                <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 space-y-3">
                  <h3 className="text-gray-900 dark:text-white font-bangla font-semibold">
                    সমাধান কেমন হয়েছে?
                  </h3>
                  <div className="flex items-center gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors resize-none"
                    placeholder="আপনার মতামত লিখুন"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className="w-full bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl">
                    মতামত দিন
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

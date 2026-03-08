"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowLeft,
  Route,
  Droplets,
  Zap,
  Trash2,
  HardHat,
  TreeDeciduous,
  Ellipsis,
  Plus,
  MapPin,
  Copy,
  CheckCircle,
} from "lucide-react";

const categories = [
  { id: "road", label: "রাস্তা", icon: Route },
  { id: "water", label: "পানি", icon: Droplets },
  { id: "electricity", label: "বিদ্যুৎ", icon: Zap },
  { id: "clean", label: "পরিচ্ছন্নতা", icon: Trash2 },
  { id: "drain", label: "নর্দমা", icon: HardHat },
  { id: "tree", label: "গাছপালা", icon: TreeDeciduous },
  { id: "other", label: "অন্যান্য", icon: Ellipsis },
];

export default function ComplaintPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [locationType, setLocationType] = useState<"gps" | "map">("gps");
  const [isEmergency, setIsEmergency] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("CMP-2024-00892");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full pb-0 relative">
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-sm flex flex-col items-center justify-center px-6">
            <div className="animate-bounce mb-6">
              <CheckCircle className="w-20 h-20 text-success" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-bangla mb-2">
              অভিযোগ সফলভাবে দাখিল হয়েছে!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bangla mb-4">
              আপনার ট্র্যাকিং নম্বর
            </p>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 mb-6 flex items-center gap-3">
              <p className="text-2xl font-mono text-electric-blue font-bold">
                CMP-2024-00892
              </p>
              <button onClick={handleCopy} className="text-gray-500 dark:text-gray-400">
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <Link
              href="/mobile/citizen/complaint-tracking"
              className="w-full bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl text-center block"
            >
              অভিযোগ ট্র্যাক করুন
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="px-4 pt-2 pb-3">
          <div className="flex items-center gap-3">
            <Link href="/mobile/citizen/home" className="text-gray-500 dark:text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              অভিযোগ দাখিল করুন
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div
            className={`space-y-5 ${
              isEmergency ? "border border-bloody-red rounded-2xl p-3" : ""
            }`}
          >
            {/* Category Chips */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2 text-sm">
                বিভাগ নির্বাচন করুন
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap text-sm font-bangla transition-all ${
                      selectedCategory === cat.id
                        ? "bg-electric-blue text-white"
                        : "bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2 text-sm">
                বিবরণ
              </h3>
              <textarea
                rows={5}
                className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors resize-none"
                placeholder="সমস্যার বিবরণ লিখুন"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2 text-sm">
                ছবি যোগ করুন
              </h3>
              <div className="flex gap-2">
                <div className="w-20 h-20 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:border-electric-blue transition-colors">
                  <Plus className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700"
                  />
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2 text-sm">
                সমস্যার স্থান
              </h3>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setLocationType("gps")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bangla flex items-center justify-center gap-1.5 transition-all ${
                    locationType === "gps"
                      ? "bg-electric-blue text-white"
                      : "bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  GPS দিয়ে স্বয়ংক্রিয়
                </button>
                <button
                  onClick={() => setLocationType("map")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bangla flex items-center justify-center gap-1.5 transition-all ${
                    locationType === "map"
                      ? "bg-electric-blue text-white"
                      : "bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  ম্যাপে চিহ্নিত করুন
                </button>
              </div>
              {locationType === "gps" && (
                <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-electric-blue" />
                  <span className="text-gray-900 dark:text-white text-sm font-bangla">
                    বাজার রোড, ওয়ার্ড ৩, খুলনা পৌরসভা
                  </span>
                </div>
              )}
            </div>

            {/* Emergency Toggle */}
            <div className="flex items-center justify-between bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
              <span className="text-gray-900 dark:text-white font-bangla text-sm font-semibold">
                জরুরি অভিযোগ
              </span>
              <button
                onClick={() => setIsEmergency(!isEmergency)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  isEmergency ? "bg-bloody-red" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                    isEmergency ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSuccess(true)}
              className={`w-full font-bangla font-semibold py-3 rounded-xl text-white transition-all ${
                isEmergency
                  ? "bg-gradient-to-r from-bloody-red to-crimson-glow"
                  : "bg-gradient-to-r from-electric-blue to-sky-blue"
              }`}
            >
              অভিযোগ জমা দিন
            </button>
          </div>
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

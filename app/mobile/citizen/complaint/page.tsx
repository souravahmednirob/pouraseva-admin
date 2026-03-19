"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import {
  ArrowLeft,
  Route,
  Droplets,
  Zap,
  Trash2,
  HardHat,
  TreeDeciduous,
  Ellipsis,
  Camera,
  ImagePlus,
  MapPin,
  Navigation,
  Map,
  Copy,
  CheckCircle,
  AlertTriangle,
  Send,
  Siren,
  X,
  Shield,
  Search,
  ChevronRight,
  MessageSquareWarning,
} from "lucide-react";

const categories = [
  { id: "road", label: "রাস্তা", sublabel: "গর্ত, ভাঙা সড়ক", icon: Route, gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { id: "water", label: "পানি", sublabel: "সরবরাহ, দূষণ", icon: Droplets, gradient: "from-cyan-500 to-blue-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
  { id: "electricity", label: "বিদ্যুৎ", sublabel: "লোডশেডিং, তার", icon: Zap, gradient: "from-yellow-500 to-amber-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  { id: "clean", label: "পরিচ্ছন্নতা", sublabel: "বর্জ্য, ময়লা", icon: Trash2, gradient: "from-emerald-500 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { id: "drain", label: "নর্দমা", sublabel: "ব্লক, উপচানো", icon: HardHat, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { id: "tree", label: "গাছপালা", sublabel: "কাটা, ঝুঁকিপূর্ণ", icon: TreeDeciduous, gradient: "from-lime-500 to-green-500", bg: "bg-lime-50 dark:bg-lime-950/30" },
  { id: "other", label: "অন্যান্য", sublabel: "অন্য সমস্যা", icon: Ellipsis, gradient: "from-slate-500 to-gray-500", bg: "bg-slate-50 dark:bg-slate-950/30" },
];

export default function ComplaintPage() {
  const { t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [locationType, setLocationType] = useState<"gps" | "manual">("gps");
  const [isEmergency, setIsEmergency] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<number[]>([]);
  const [manualAddress, setManualAddress] = useState("");
  const [manualWard, setManualWard] = useState("");
  const [manualLandmark, setManualLandmark] = useState("");

  const handleCopy = () => {
    navigator.clipboard?.writeText("CMP-2026-00892");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhotoAdd = () => {
    if (uploadedPhotos.length < 4) {
      setUploadedPhotos((prev) => [...prev, prev.length + 1]);
    }
  };

  const handlePhotoRemove = (id: number) => {
    setUploadedPhotos((prev) => prev.filter((p) => p !== id));
  };

  const maxChars = 500;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full relative">
        {/* ─── Success Overlay ─── */}
        {showSuccess && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF] dark:bg-[#0F172A] flex flex-col">
            {/* Green gradient top */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/5" />

              <div className="relative flex flex-col items-center pt-16 pb-10">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">
                  {t("সফলভাবে দাখিল হয়েছে!", "Submitted Successfully!")}
                </h2>
                <p className="text-green-100 text-sm font-bangla">
                  {t("আপনার অভিযোগ গ্রহণ করা হয়েছে", "Your complaint has been received")}
                </p>
              </div>
            </div>

            <div className="flex-1 px-6 -mt-3">
              {/* Tracking Card */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5 mb-5">
                <p className="text-gray-400 dark:text-gray-500 text-xs font-bangla mb-2 text-center">{t("ট্র্যাকিং নম্বর", "Tracking Number")}</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <p className="text-3xl font-mono text-electric-blue font-bold tracking-wider">
                    CMP-2026-00892
                  </p>
                  <button onClick={handleCopy} className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-electric-blue" />
                    )}
                  </button>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-700 mb-4" />
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-bangla">{t("বিভাগ", "Category")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-bangla font-medium">
                      {categories.find((c) => c.id === selectedCategory)?.label || "রাস্তা"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-bangla">{t("আনুমানিক সময়", "Estimated Time")}</span>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bangla font-bold">২৪-৪৮ ঘণ্টা</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400 dark:text-gray-500 font-bangla">{t("অবস্থান", "Location")}</span>
                    <span className="text-sm text-gray-900 dark:text-white font-bangla">{t("ওয়ার্ড ৩", "Ward 3")}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <Link
                href="/mobile/citizen/complaint-tracking"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-bold text-base text-center block shadow-lg shadow-blue-500/20 mb-3"
              >
                {t("অভিযোগ ট্র্যাক করুন", "Track Complaint")}
              </Link>
              <Link
                href="/mobile/citizen/home"
                className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold text-base text-center block bg-white dark:bg-[#1E293B]"
              >
                {t("হোমে ফিরে যান", "Go to Home")}
              </Link>
            </div>
          </div>
        )}

        {/* ─── Header ─── */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 ${isEmergency ? "bg-gradient-to-br from-red-600 via-red-500 to-orange-500" : "bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900"} transition-colors duration-500`} />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />

          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/mobile/citizen/home" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">
                  {isEmergency ? t("জরুরি অভিযোগ", "Emergency Complaint") : t("অভিযোগ দাখিল", "File Complaint")}
                </h1>
                <p className="text-white/70 text-xs font-bangla">{t("আপনার সমস্যা জানান, আমরা সমাধান দেব", "Report your problem, we'll solve it")}</p>
              </div>
              {isEmergency && (
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
                  <Siren className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="flex-1 overflow-y-auto bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="px-5 pb-5 space-y-5 -mt-1">

            {/* ── My Complaints Quick Link ── */}
            <Link
              href="/mobile/citizen/complaint-tracking"
              className="flex items-center gap-3.5 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquareWarning className="w-5.5 h-5.5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla">{t("আমার অভিযোগসমূহ", "My Complaints")}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla mt-0.5">{t("পূর্বের অভিযোগের অবস্থা দেখুন", "View previous complaint status")}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">৩</span>
                <ChevronRight className="w-4.5 h-4.5 text-gray-300 dark:text-gray-600" />
              </div>
            </Link>

            {/* ── Step 1: Category Selection ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-electric-blue text-white flex items-center justify-center text-xs font-bold">১</div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-[15px]">
                  {t("সমস্যার ধরন নির্বাচন করুন", "Select problem type")}
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center gap-2 py-3 px-1 rounded-xl transition-all ${
                        isSelected
                          ? "bg-electric-blue/5 dark:bg-electric-blue/10 ring-2 ring-electric-blue scale-[1.02]"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl ${isSelected ? `bg-gradient-to-br ${cat.gradient}` : cat.bg} flex items-center justify-center transition-all`}>
                        <CatIcon className={`w-5 h-5 ${isSelected ? "text-white" : "text-gray-500 dark:text-gray-400"}`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-[11px] font-bangla font-bold leading-tight ${isSelected ? "text-electric-blue" : "text-gray-700 dark:text-gray-300"}`}>
                          {cat.id === "road" ? t("রাস্তা", "Road") : cat.id === "water" ? t("পানি", "Water") : cat.id === "electricity" ? t("বিদ্যুৎ", "Electric") : cat.id === "clean" ? t("পরিচ্ছন্নতা", "Cleanliness") : cat.id === "drain" ? t("নর্দমা", "Drainage") : cat.id === "tree" ? t("গাছপালা", "Trees") : t("অন্যান্য", "Others")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Step 2: Description ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-electric-blue text-white flex items-center justify-center text-xs font-bold">২</div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-[15px]">
                  {t("সমস্যার বিবরণ লিখুন", "Describe the problem")}
                </h3>
              </div>
              <div className="relative">
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-gray-100 text-sm font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all resize-none"
                  placeholder="সমস্যার বিস্তারিত বর্ণনা দিন... যেমন: আমাদের রাস্তায় বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে।"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
                />
                <div className="flex items-center justify-between mt-2 px-1">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla">{t("বিস্তারিত লিখলে দ্রুত সমাধান সম্ভব", "Detailed description helps resolve faster")}</p>
                  <span className={`text-[11px] font-mono ${description.length > maxChars * 0.9 ? "text-red-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {description.length}/{maxChars}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Step 3: Photo Upload ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-electric-blue text-white flex items-center justify-center text-xs font-bold">৩</div>
                  <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-[15px]">
                    {t("ছবি যোগ করুন", "Add Photos")}
                  </h3>
                </div>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla">{t("সর্বোচ্চ ৪টি", "Max 4")}</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {/* Upload Button */}
                {uploadedPhotos.length < 4 && (
                  <button
                    onClick={handlePhotoAdd}
                    className="aspect-square rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border-2 border-dashed border-blue-300 dark:border-blue-700 flex flex-col items-center justify-center gap-1.5 hover:border-electric-blue transition-colors"
                  >
                    <Camera className="w-6 h-6 text-electric-blue" />
                    <span className="text-[9px] text-electric-blue font-bangla font-bold">{t("ছবি তুলুন", "Take Photo")}</span>
                  </button>
                )}
                {/* Uploaded Photos Mock */}
                {uploadedPhotos.map((id) => (
                  <div key={id} className="aspect-square rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 relative overflow-hidden">
                    {/* Mock photo pattern */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImagePlus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <button
                      onClick={() => handlePhotoRemove(id)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-1.5 py-0.5">
                      <p className="text-[8px] text-white font-mono">IMG_{id}.jpg</p>
                    </div>
                  </div>
                ))}
                {/* Remaining empty slots */}
                {Array.from({ length: Math.max(0, 3 - uploadedPhotos.length) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/30" />
                ))}
              </div>
            </div>

            {/* ── Step 4: Location ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-electric-blue text-white flex items-center justify-center text-xs font-bold">৪</div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-bold text-[15px]">
                  {t("সমস্যার স্থান", "Problem Location")}
                </h3>
              </div>
              {/* Location Type Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setLocationType("gps")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bangla flex items-center justify-center gap-2 transition-all font-medium ${
                    locationType === "gps"
                      ? "bg-electric-blue text-white shadow-sm"
                      : "bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  {t("GPS লোকেশন", "GPS Location")}
                </button>
                <button
                  onClick={() => setLocationType("manual")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bangla flex items-center justify-center gap-2 transition-all font-medium ${
                    locationType === "manual"
                      ? "bg-electric-blue text-white shadow-sm"
                      : "bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Map className="w-4 h-4" />
                  {t("ম্যানুয়াল", "Manual")}
                </button>
              </div>

              {locationType === "gps" ? (
                <>
                  {/* Mock Map */}
                  <div className="relative h-32 rounded-xl bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 dark:from-blue-950/20 dark:via-emerald-950/10 dark:to-blue-950/20 border border-gray-200 dark:border-gray-700 overflow-hidden mb-3">
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <div key={`h-${i}`} className="absolute left-0 right-0 border-b border-gray-400" style={{ top: `${(i + 1) * 12.5}%` }} />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <div key={`v-${i}`} className="absolute top-0 bottom-0 border-r border-gray-400" style={{ left: `${(i + 1) * 16.66}%` }} />
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-300/40 dark:bg-gray-600/40" />
                    <div className="absolute left-1/3 top-0 bottom-0 w-1.5 bg-gray-300/40 dark:bg-gray-600/40" />
                    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-electric-blue shadow-lg flex items-center justify-center animate-bounce">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-electric-blue/30 mt-0.5" />
                    </div>
                    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-electric-blue/20 bg-electric-blue/5" />
                  </div>
                  {/* GPS Location info */}
                  <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl px-4 py-3 border border-emerald-200 dark:border-emerald-700/30">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-800/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-bangla font-medium truncate">
                        বাজার রোড, ওয়ার্ড ৩
                      </p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bangla">কালিয়াকৈর পৌরসভা</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  </div>
                </>
              ) : (
                <>
                  {/* Manual Address Form */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("ঠিকানা / রাস্তার নাম", "Address / Street Name")}</label>
                      <input
                        type="text"
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        placeholder="যেমন: স্টেশন রোড, বাজার এলাকা"
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("ওয়ার্ড নম্বর", "Ward Number")}</label>
                      <select
                        value={manualWard}
                        onChange={(e) => setManualWard(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-bangla focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all"
                      >
                        <option value="">{t("ওয়ার্ড নির্বাচন করুন", "Select Ward")}</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <option key={n} value={String(n)}>{t("ওয়ার্ড", "Ward")} {n}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("নিকটবর্তী ল্যান্ডমার্ক (ঐচ্ছিক)", "Nearby Landmark (Optional)")}</label>
                      <input
                        type="text"
                        value={manualLandmark}
                        onChange={(e) => setManualLandmark(e.target.value)}
                        placeholder="যেমন: জামে মসজিদের পাশে, স্কুলের সামনে"
                        className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Emergency Toggle ── */}
            <div className={`rounded-2xl p-4 transition-all duration-300 ${
              isEmergency
                ? "bg-red-50 dark:bg-red-900/15 border-2 border-red-300 dark:border-red-700/50"
                : "bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none"
            }`}>
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isEmergency
                    ? "bg-red-100 dark:bg-red-800/30"
                    : "bg-gray-50 dark:bg-gray-700/30"
                }`}>
                  {isEmergency ? (
                    <Siren className="w-6 h-6 text-red-500 animate-pulse" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bangla font-bold ${isEmergency ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-white"}`}>
                    {t("জরুরি অভিযোগ", "Emergency")}
                  </p>
                  <p className={`text-[11px] font-bangla mt-0.5 ${isEmergency ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {isEmergency ? t("অগ্রাধিকার ভিত্তিতে সমাধান করা হবে", "Will be resolved on priority basis") : t("জরুরি হলে এটি চালু করুন", "Turn on if urgent")}
                  </p>
                </div>
                <button
                  onClick={() => setIsEmergency(!isEmergency)}
                  className={`w-14 h-7 rounded-full transition-all relative ${
                    isEmergency ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${
                      isEmergency ? "left-7" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ── Submit Button ── */}
            <button
              onClick={() => {
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  setShowSuccess(true);
                }, 1800);
              }}
              disabled={isSubmitting}
              className={`w-full font-bangla font-bold py-4 rounded-2xl text-white text-base transition-all flex items-center justify-center gap-2.5 shadow-lg disabled:opacity-80 ${
                isEmergency
                  ? "bg-gradient-to-r from-red-600 to-orange-500 shadow-red-500/20"
                  : "bg-gradient-to-r from-electric-blue to-sky-blue shadow-blue-500/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("জমা হচ্ছে...", "Submitting...")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {isEmergency ? t("জরুরি অভিযোগ জমা দিন", "Submit Emergency Complaint") : t("অভিযোগ জমা দিন", "Submit Complaint")}
                </>
              )}
            </button>

            <div className="h-1" />
          </div>
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

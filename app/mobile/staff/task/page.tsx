"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { Navigation, MapPin, Camera, Plus, Image, CheckCircle, Bug } from "lucide-react";

export default function StaffTaskPage() {
  const [canComplete, setCanComplete] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");

  if (completed) {
    return (
      <MobileFrame>
        <div className="flex items-center justify-center h-full pb-20">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <p className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">কাজ সফলভাবে সম্পন্ন হয়েছে</p>
          </div>
        </div>
        <BottomNav role="staff" />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-4 font-bangla">
        {/* Task Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue px-2 py-0.5 rounded-full font-bangla">
            অভিযোগ
          </span>
          <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">
            High
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs ml-auto">সকাল ৯:৩০</span>
        </div>

        {/* Complaint Details */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white text-sm font-semibold font-bangla">বিভাগ:</span>
            <span className="text-electric-blue text-sm font-bangla">রাস্তা</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bangla leading-relaxed">
            মহল্লা রোডে বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে। গত এক সপ্তাহ ধরে এই সমস্যা চলছে। স্থানীয় বাসিন্দারা অনেক অসুবিধায় পড়ছেন।
          </p>
          <div className="flex gap-2">
            <div className="w-20 h-16 bg-gray-50 dark:bg-[#0F172A] rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-300 dark:text-gray-600" />
            </div>
            <div className="w-20 h-16 bg-gray-50 dark:bg-[#0F172A] rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-300 dark:text-gray-600" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-electric-blue" />
            <span className="text-gray-900 dark:text-white text-sm font-bangla">৫/এ, মহল্লা রোড, ওয়ার্ড ৫</span>
          </div>
          <button className="w-full bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bangla">
            <Navigation className="w-4 h-4" />
            নেভিগেট করুন
          </button>
        </div>

        {/* GPS Indicator */}
        <div className="flex items-center gap-2 px-1">
          <MapPin className="w-4 h-4 text-warning" />
          <span className="text-warning text-sm font-bangla">আপনি ১৫০ মিটার দূরে</span>
        </div>

        {/* Photo Evidence */}
        <div className="space-y-3">
          <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla">ফটো প্রমাণ</h3>

          {/* Before */}
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-2">কাজের আগে</p>
            <div className="flex gap-2">
              <div className="w-20 h-16 bg-gray-50 dark:bg-[#0F172A] rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </div>
              <div className="w-20 h-16 bg-gray-50 dark:bg-[#0F172A] rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-300 dark:text-gray-600" />
              </div>
            </div>
          </div>

          {/* After */}
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-2">
              কাজের পরে <span className="text-bloody-red">*</span>
            </p>
            <div className="flex gap-2">
              <div className="w-20 h-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-5 h-5 text-gray-400 dark:text-gray-500 mx-auto" />
                  <Plus className="w-3 h-3 text-gray-400 dark:text-gray-500 mx-auto -mt-1" />
                </div>
              </div>
              <div className="w-20 h-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-5 h-5 text-gray-400 dark:text-gray-500 mx-auto" />
                  <Plus className="w-3 h-3 text-gray-400 dark:text-gray-500 mx-auto -mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Note */}
        <div>
          <p className="text-gray-900 dark:text-white text-sm font-bangla mb-2">
            সমাধানের বিবরণ <span className="text-bloody-red">*</span>
          </p>
          <textarea
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            placeholder="সমাধানের বিবরণ লিখুন"
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 text-sm font-bangla resize-none h-24 focus:outline-none focus:border-electric-blue"
          />
        </div>

        {/* Complete Button */}
        <button
          onClick={() => canComplete && setCompleted(true)}
          disabled={!canComplete}
          className={`w-full py-4 rounded-xl text-white text-sm font-semibold font-bangla flex items-center justify-center gap-2 transition-opacity ${
            canComplete
              ? "bg-gradient-to-r from-success to-emerald-500"
              : "bg-gradient-to-r from-success to-emerald-500 opacity-50"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          কাজ সম্পন্ন হয়েছে
        </button>

        {/* Debug Toggle */}
        <button
          onClick={() => setCanComplete(!canComplete)}
          className="w-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs py-2 rounded-lg flex items-center justify-center gap-1 font-bangla"
        >
          <Bug className="w-3 h-3" />
          Toggle complete ({canComplete ? "enabled" : "disabled"})
        </button>
      </div>

      <BottomNav role="staff" />
    </MobileFrame>
  );
}

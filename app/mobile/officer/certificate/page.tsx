"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { QrCode, Stamp, Send, Download, CheckCircle } from "lucide-react";

const templates = [
  { id: 1, name: "জন্ম নিবন্ধন", color: "from-blue-500/20 to-blue-700/20" },
  { id: 2, name: "নাগরিকত্ব সনদ", color: "from-green-500/20 to-green-700/20" },
  { id: 3, name: "ওয়ারিশ সনদ", color: "from-purple-500/20 to-purple-700/20" },
];

export default function OfficerCertificatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [sealApplied, setSealApplied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-4 pt-4 pb-4 space-y-5">
          {/* Title */}
          <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
            সনদ তৈরি করুন
          </h1>

          {/* Certificate Preview */}
          <div className="bg-white rounded-xl p-5 shadow-lg relative">
            {/* Certificate Header */}
            <div className="text-center border-b-2 border-gray-300 pb-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-300 mx-auto mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-[10px] font-bangla">
                  লোগো
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 font-bangla">
                কালিয়াকৈর পৌরসভা
              </h2>
              <p className="text-[10px] text-gray-500 font-bangla">
                গাজীপুর জেলা, ঢাকা বিভাগ
              </p>
            </div>

            {/* Certificate Type */}
            <h3 className="text-center text-sm font-bold text-gray-800 font-bangla mb-4 underline underline-offset-4 decoration-gray-400">
              জন্ম নিবন্ধন সনদ
            </h3>

            {/* Citizen Details */}
            <div className="space-y-2 text-[11px] mb-4">
              {[
                { label: "নাম", value: "আব্দুল করিম" },
                { label: "জন্ম তারিখ", value: "০১ জানুয়ারি, ১৯৯০" },
                { label: "পিতার নাম", value: "মোহাম্মদ আলী" },
                { label: "মাতার নাম", value: "রাবেয়া বেগম" },
                { label: "ঠিকানা", value: "১২/৩, ওয়ার্ড-০৫, কালিয়াকৈর" },
              ].map((row) => (
                <div key={row.label} className="flex">
                  <span className="text-gray-500 font-bangla w-24 shrink-0">
                    {row.label}:
                  </span>
                  <span className="text-gray-900 font-bangla font-medium">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Issue Info */}
            <div className="flex justify-between items-end border-t border-gray-200 pt-3 mt-3">
              <div className="space-y-1 text-[10px]">
                <p className="text-gray-500 font-bangla">
                  প্রদানের তারিখ:{" "}
                  <span className="text-gray-800">১৭ জানুয়ারি, ২০২৪</span>
                </p>
                <p className="text-gray-500 font-bangla">
                  সনদ নম্বর:{" "}
                  <span className="text-gray-800">CERT-2024-00156</span>
                </p>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-14 h-14 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Signature Line */}
            <div className="mt-4 pt-3 border-t border-gray-200 text-center">
              <div className="w-32 mx-auto border-b border-gray-400 mb-1 h-6" />
              <p className="text-[10px] text-gray-500 font-bangla">
                কর্মকর্তার স্বাক্ষর
              </p>
            </div>

            {/* Seal Badge */}
            {sealApplied && (
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-green-500 flex items-center justify-center rotate-[-15deg] opacity-80">
                <span className="text-[8px] text-green-600 font-bold font-bangla text-center leading-tight">
                  সিল{"\n"}প্রয়োগ
                </span>
              </div>
            )}
          </div>

          {/* Template Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-bangla mb-2">
              টেমপ্লেট নির্বাচন
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`shrink-0 w-24 h-16 rounded-lg bg-gradient-to-br ${
                    tpl.color
                  } border-2 flex items-center justify-center transition-colors ${
                    selectedTemplate === tpl.id
                      ? "border-electric-blue"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <span className="text-[10px] text-gray-900 dark:text-white font-bangla text-center px-1">
                    {tpl.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {/* Seal Button */}
            <button
              onClick={() => setSealApplied(!sealApplied)}
              className={`w-full py-3 rounded-xl border font-bangla font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                sealApplied
                  ? "border-success bg-green-50 dark:bg-success/10 text-green-700 dark:text-success"
                  : "border-electric-blue text-electric-blue hover:bg-blue-50 dark:hover:bg-electric-blue/10"
              }`}
            >
              {sealApplied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  সিল প্রয়োগ হয়েছে
                </>
              ) : (
                <>
                  <Stamp className="w-5 h-5" />
                  সিল প্রয়োগ করুন
                </>
              )}
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity relative"
            >
              <Send className="w-5 h-5" />
              নাগরিককে পাঠান
              {sent && (
                <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] font-bangla px-2 py-0.5 rounded-full animate-bounce">
                  পাঠানো হয়েছে!
                </span>
              )}
            </button>

            {/* Download Button */}
            <button className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold text-sm flex items-center justify-center gap-2 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <Download className="w-5 h-5" />
              PDF ডাউনলোড
            </button>
          </div>
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

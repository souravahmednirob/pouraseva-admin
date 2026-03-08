"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Upload,
  CheckCircle,
  CreditCard,
  Smartphone,
} from "lucide-react";

const steps = ["শিশুর তথ্য", "ঠিকানা", "কাগজপত্র আপলোড", "আবেদন পর্যালোচনা"];

const paymentMethods = [
  { id: "bkash", label: "bKash" },
  { id: "nagad", label: "Nagad" },
  { id: "rocket", label: "Rocket" },
  { id: "card", label: "Card" },
];

export default function BirthCertificatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    childNameBn: "",
    childNameEn: "",
    birthDate: "",
    birthPlace: "",
    fatherNid: "",
    fatherName: "",
    motherNid: "",
    motherName: "",
    presentAddress: "",
    permanentAddress: "",
    wardNo: "",
    paymentMethod: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass =
    "w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors";

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
              আবেদন সফল হয়েছে!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bangla mb-6">
              আপনার ট্র্যাকিং নম্বর
            </p>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 mb-8">
              <p className="text-2xl font-mono text-electric-blue font-bold">
                BC-2024-00451
              </p>
            </div>
            <Link
              href="/mobile/citizen/home"
              className="w-full bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl text-center block"
            >
              হোমে যান
            </Link>
          </div>
        )}

        {/* Header */}
        <div className="px-4 pt-2 pb-3">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/mobile/citizen/services" className="text-gray-500 dark:text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">
              জন্ম নিবন্ধন আবেদন
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between px-2">
            {steps.map((label, i) => {
              const stepNum = i + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;
              return (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? "bg-electric-blue text-white"
                          : isCurrent
                          ? "border-2 border-electric-blue text-electric-blue animate-pulse"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span className="text-[9px] text-gray-500 dark:text-gray-400 font-bangla mt-1 text-center w-14 leading-tight">
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 mb-4 ${
                        stepNum < currentStep
                          ? "bg-electric-blue"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  শিশুর নাম (বাংলা)
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.childNameBn}
                  onChange={(e) => updateField("childNameBn", e.target.value)}
                  placeholder="বাংলায় নাম লিখুন"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  শিশুর নাম (English)
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.childNameEn}
                  onChange={(e) => updateField("childNameEn", e.target.value)}
                  placeholder="Enter name in English"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  জন্ম তারিখ
                </span>
                <input
                  type="date"
                  className={inputClass}
                  value={formData.birthDate}
                  onChange={(e) => updateField("birthDate", e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  জন্মস্থান
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.birthPlace}
                  onChange={(e) => updateField("birthPlace", e.target.value)}
                  placeholder="হাসপাতাল / বাড়ি"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  পিতার NID
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.fatherNid}
                  onChange={(e) => updateField("fatherNid", e.target.value)}
                  placeholder="জাতীয় পরিচয়পত্র নম্বর"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  পিতার নাম
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.fatherName}
                  onChange={(e) => updateField("fatherName", e.target.value)}
                  placeholder="পিতার পূর্ণ নাম"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  মাতার NID
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.motherNid}
                  onChange={(e) => updateField("motherNid", e.target.value)}
                  placeholder="জাতীয় পরিচয়পত্র নম্বর"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  মাতার নাম
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.motherName}
                  onChange={(e) => updateField("motherName", e.target.value)}
                  placeholder="মাতার পূর্ণ নাম"
                />
              </label>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
              >
                পরবর্তী <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  বর্তমান ঠিকানা
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.presentAddress}
                  onChange={(e) =>
                    updateField("presentAddress", e.target.value)
                  }
                  placeholder="বর্তমান ঠিকানা লিখুন"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  স্থায়ী ঠিকানা
                </span>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.permanentAddress}
                  onChange={(e) =>
                    updateField("permanentAddress", e.target.value)
                  }
                  placeholder="স্থায়ী ঠিকানা লিখুন"
                />
              </label>
              <label className="block">
                <span className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1 block">
                  ওয়ার্ড নম্বর
                </span>
                <select
                  className={inputClass}
                  value={formData.wardNo}
                  onChange={(e) => updateField("wardNo", e.target.value)}
                >
                  <option value="">ওয়ার্ড নির্বাচন করুন</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <option key={n} value={n}>
                      ওয়ার্ড {n}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> পূর্ববর্তী
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  পরবর্তী <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-3">
              {[
                "শিশুর ছবি",
                "পিতার NID",
                "মাতার NID",
                "হাসপাতাল সার্টিফিকেট",
              ].map((label) => (
                <div
                  key={label}
                  className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-electric-blue/50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <Camera className="w-6 h-6" />
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-bangla">{label}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-bangla">
                    আপলোড করুন
                  </p>
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> পূর্ববর্তী
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 bg-electric-blue text-white font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  পরবর্তী <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {/* Summary Card */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 space-y-2">
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2">
                  আবেদনের সারসংক্ষেপ
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">শিশুর নাম</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      {formData.childNameBn || "মোঃ আরিফ হোসেন"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">জন্ম তারিখ</span>
                    <span className="text-gray-900 dark:text-white">
                      {formData.birthDate || "2024-01-15"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">জন্মস্থান</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      {formData.birthPlace || "জেনারেল হাসপাতাল"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">পিতার নাম</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      {formData.fatherName || "মোঃ করিম উদ্দিন"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">মাতার নাম</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      {formData.motherName || "ফাতেমা বেগম"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-bangla">ওয়ার্ড</span>
                    <span className="text-gray-900 dark:text-white font-bangla">
                      ওয়ার্ড {formData.wardNo || "৩"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fee */}
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none rounded-xl p-4 flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 font-bangla">ফি</span>
                <span className="text-xl font-bold text-electric-blue">
                  ৳100
                </span>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-bangla font-semibold mb-2">
                  পেমেন্ট পদ্ধতি
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => updateField("paymentMethod", pm.id)}
                      className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                        formData.paymentMethod === pm.id
                          ? "border-electric-blue bg-blue-50 dark:bg-electric-blue/10 text-electric-blue"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {pm.id === "card" ? (
                        <CreditCard className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                      <span className="text-sm font-semibold">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> পূর্ববর্তী
                </button>
                <button
                  onClick={() => setShowSuccess(true)}
                  className="flex-1 bg-gradient-to-r from-bloody-red to-crimson-glow text-white font-bangla font-semibold py-3 rounded-xl"
                >
                  আবেদন জমা দিন
                </button>
              </div>
            </div>
          )}
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

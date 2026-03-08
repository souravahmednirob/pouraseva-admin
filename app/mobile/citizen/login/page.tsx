"use client";

import { useState, useRef } from "react";
import MobileFrame from "@/components/mobile-frame";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Register state
  const [nid, setNid] = useState("");
  const [dob, setDob] = useState("");
  const [nidVerified, setNidVerified] = useState(false);
  const [regPhone, setRegPhone] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmPinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handlePinChange = (
    index: number,
    value: string,
    type: "pin" | "confirm"
  ) => {
    if (value.length > 1) return;
    if (type === "pin") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      if (value && index < 3) pinRefs.current[index + 1]?.focus();
    } else {
      const newPin = [...confirmPin];
      newPin[index] = value;
      setConfirmPin(newPin);
      if (value && index < 3) confirmPinRefs.current[index + 1]?.focus();
    }
  };

  return (
    <MobileFrame>
      <div className="h-full flex flex-col bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="flex flex-col items-center pt-6 pb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue to-sky-blue flex items-center justify-center mb-3">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">PouraSeva</h1>
        </div>

        {/* Tab Bar */}
        <div className="flex mx-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 text-center font-bangla font-semibold text-sm transition-colors relative ${
              activeTab === "login" ? "text-electric-blue" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            লগইন
            {activeTab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-3 text-center font-bangla font-semibold text-sm transition-colors relative ${
              activeTab === "register" ? "text-electric-blue" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            নিবন্ধন
            {activeTab === "register" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === "login" ? (
            <div className="flex flex-col gap-5">
              {/* Phone Input */}
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                  মোবাইল নম্বর
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm">
                    +880
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="1XXXXXXXXX"
                    className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:border-electric-blue focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Send OTP Button */}
              <button
                onClick={() => setOtpSent(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              >
                OTP পাঠান
              </button>

              {/* OTP Input */}
              {otpSent && (
                <div className="flex flex-col gap-4">
                  <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla">
                    OTP কোড লিখুন
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-11 h-12 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-900 dark:text-white text-lg font-bold focus:border-electric-blue focus:outline-none transition-colors"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => { window.location.href = "/mobile/citizen/home"; }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                  >
                    যাচাই করুন
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* NID Input */}
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                  NID নম্বর
                </label>
                <input
                  type="text"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  placeholder="জাতীয় পরিচয়পত্র নম্বর"
                  className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:border-electric-blue focus:outline-none transition-colors font-bangla"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                  জন্ম তারিখ
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:border-electric-blue focus:outline-none transition-colors"
                />
              </div>

              {/* Verify NID Button */}
              <button
                onClick={() => setNidVerified(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              >
                NID যাচাই করুন
              </button>

              {/* Mock Verified Card */}
              {nidVerified && (
                <>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
                    <p className="text-green-700 dark:text-green-400 text-xs font-bangla mb-1">
                      NID যাচাই সফল
                    </p>
                    <p className="text-gray-900 dark:text-white font-bangla font-semibold text-sm">
                      নাম: মোহাম্মদ রহিম উদ্দিন
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                      মোবাইল নম্বর
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-500 dark:text-gray-400 text-sm">
                        +880
                      </div>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="1XXXXXXXXX"
                        className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:border-electric-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* PIN */}
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                      ৪-ডিজিট পিন
                    </label>
                    <div className="flex items-center justify-center gap-3">
                      {pin.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { pinRefs.current[i] = el; }}
                          type="password"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handlePinChange(i, e.target.value, "pin")
                          }
                          className="w-12 h-14 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-900 dark:text-white text-xl font-bold focus:border-electric-blue focus:outline-none transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Confirm PIN */}
                  <div>
                    <label className="text-gray-500 dark:text-gray-400 text-xs font-bangla mb-1.5 block">
                      পিন নিশ্চিত করুন
                    </label>
                    <div className="flex items-center justify-center gap-3">
                      {confirmPin.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { confirmPinRefs.current[i] = el; }}
                          type="password"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handlePinChange(i, e.target.value, "confirm")
                          }
                          className="w-12 h-14 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-900 dark:text-white text-xl font-bold focus:border-electric-blue focus:outline-none transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={() => { window.location.href = "/mobile/citizen/home"; }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                  >
                    নিবন্ধন সম্পন্ন করুন
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}

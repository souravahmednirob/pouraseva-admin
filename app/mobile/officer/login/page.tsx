"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/mobile-frame";
import { Shield, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function OfficerLoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtp(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push("/mobile/officer/dashboard");
  };

  return (
    <MobileFrame>
      <div className="relative flex flex-col items-center justify-center min-h-full px-6 py-10">
        {/* Particle animation background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="particle absolute w-1 h-1 bg-electric-blue/30 rounded-full top-[10%] left-[20%] animate-pulse" />
          <div className="particle absolute w-1.5 h-1.5 bg-sky-blue/20 rounded-full top-[25%] right-[15%] animate-ping" />
          <div className="particle absolute w-1 h-1 bg-electric-blue/25 rounded-full top-[40%] left-[10%] animate-pulse" />
          <div className="particle absolute w-2 h-2 bg-sky-blue/15 rounded-full top-[60%] right-[25%] animate-ping" />
          <div className="particle absolute w-1 h-1 bg-electric-blue/20 rounded-full top-[75%] left-[30%] animate-pulse" />
          <div className="particle absolute w-1.5 h-1.5 bg-sky-blue/25 rounded-full top-[85%] right-[10%] animate-ping" />
          <div className="particle absolute w-1 h-1 bg-electric-blue/30 rounded-full top-[50%] left-[50%] animate-pulse" />
          <div className="particle absolute w-1.5 h-1.5 bg-sky-blue/20 rounded-full top-[15%] left-[70%] animate-ping" />
        </div>

        {/* Logo */}
        <div className="relative mb-6">
          <div className="blue-glow w-20 h-20 rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <Shield className="w-10 h-10 text-electric-blue" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-bangla text-center mb-1">
          পৌরসেবা
        </h1>
        <h2 className="text-lg text-gray-500 dark:text-gray-400 font-bangla text-center mb-8">
          কর্মকর্তা লগইন
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 font-bangla mb-1.5">
              কর্মচারী আইডি
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="EMP-XXXX"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-electric-blue focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 font-bangla mb-1.5">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-electric-blue focus:outline-none transition-colors text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-6"
          >
            লগইন করুন
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* OTP Overlay */}
        {showOtp && (
          <div className="absolute inset-0 bg-[#F0F7FF]/95 dark:bg-[#0F172A]/95 backdrop-blur-sm flex flex-col items-center justify-center px-6 z-50">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-electric-blue" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-bangla mb-2">
              OTP যাচাইকরণ
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bangla text-center mb-6">
              আপনার মোবাইলে পাঠানো ৬ সংখ্যার কোডটি প্রদান করুন
            </p>

            <div className="flex gap-2 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-11 h-13 rounded-lg bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center text-xl font-bold focus:border-electric-blue focus:outline-none transition-colors"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-base hover:opacity-90 transition-opacity"
            >
              যাচাই করুন
            </button>

            <button
              onClick={() => setShowOtp(false)}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-bangla hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              পুনরায় কোড পাঠান
            </button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}

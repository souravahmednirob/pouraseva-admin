"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MobileFrame from "@/components/mobile-frame";
import { useLang } from "@/components/language-context";
import { Shield, Eye, EyeOff, ArrowRight, UserCheck, Lock } from "lucide-react";

export default function OfficerLoginPage() {
  const router = useRouter();
  const { t } = useLang();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setShowOtp(true); }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/mobile/officer/dashboard"), 1000);
  };

  return (
    <MobileFrame>
      <div className="relative flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute top-12 right-16 w-16 h-16 rounded-full bg-white/5" />

          <div className="relative flex flex-col items-center pt-14 pb-12">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-lg mb-5">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white font-bangla mb-1">PouraSeva</h1>
            <p className="text-green-100 text-sm font-bangla">{t("কর্মকর্তা প্যানেল", "Officer Panel")}</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="flex-1 px-5 -mt-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">
                  {t("কর্মচারী আইডি", "Employee ID")}
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="EMP-XXXX"
                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">
                  {t("পাসওয়ার্ড", "Password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-12 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bangla font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-80 transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>{t("লগইন করুন", "Login")} <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-400/40 text-[10px] font-mono mt-6">PouraSeva Officer v1.0</p>
        </div>

        {/* OTP Overlay */}
        {showOtp && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF] dark:bg-[#0F172A] flex flex-col">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative flex flex-col items-center pt-16 pb-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-5">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-bangla mb-1">{t("OTP যাচাইকরণ", "OTP Verification")}</h3>
                <p className="text-green-100 text-sm font-bangla text-center px-8">{t("আপনার মোবাইলে পাঠানো ৬ সংখ্যার কোডটি প্রদান করুন", "Enter the 6-digit code sent to your mobile")}</p>
              </div>
            </div>

            <div className="flex-1 px-6 -mt-4">
              <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6">
                <div className="flex gap-2.5 mb-6 justify-center">
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
                      className="w-12 h-14 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center text-xl font-bold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bangla font-bold text-base shadow-lg shadow-emerald-500/20 disabled:opacity-80 mb-3"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : t("যাচাই করুন", "Verify")}
                </button>

                <button onClick={() => setShowOtp(false)} className="w-full text-center text-sm text-emerald-600 dark:text-emerald-400 font-bangla font-medium">
                  {t("পুনরায় কোড পাঠান", "Resend Code")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { ArrowLeft, ArrowRight, CheckCircle, CreditCard, Smartphone } from "lucide-react";
import { useLang } from "@/components/language-context";
const paymentMethods = [{ id: "bkash", label: "bKash" }, { id: "nagad", label: "Nagad" }, { id: "rocket", label: "Rocket" }, { id: "card", label: "Card" }];

export default function DeathCertificatePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", nameEn: "", deathDate: "", deathPlace: "", cause: "", nid: "", appName: "", relation: "", mobile: "", ward: "", paymentMethod: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLang();
  const steps = [t("মৃত ব্যক্তির তথ্য", "Deceased Info"), t("আবেদনকারীর তথ্য", "Applicant Info"), t("পর্যালোচনা ও পেমেন্ট", "Review & Payment")];
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const ic = "w-full bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-bangla placeholder:text-gray-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 transition-all";

  return (
    <MobileFrame>
      <div className="flex flex-col h-full relative">
        {showSuccess && (
          <div className="absolute inset-0 z-50 bg-[#F0F7FF] dark:bg-[#0F172A] flex flex-col">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="relative flex flex-col items-center pt-16 pb-10">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">{t("আবেদন সফল!", "Application Submitted!")}</h2>
                <p className="text-green-100 text-sm font-bangla">{t("মৃত্যু সনদের আবেদন গ্রহণ করা হয়েছে", "Death certificate application has been received")}</p>
              </div>
            </div>
            <div className="flex-1 px-6 -mt-3">
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5 mb-5">
                <p className="text-gray-400 text-xs font-bangla mb-2 text-center">{t("ট্র্যাকিং নম্বর", "Tracking Number")}</p>
                <p className="text-3xl font-mono text-electric-blue font-bold text-center tracking-wider mb-3">DC-2026-00312</p>
                <div className="h-px bg-gray-100 dark:bg-gray-700 mb-3" />
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("আনুমানিক সময়", "Estimated Time")}</span><span className="text-emerald-600 font-bangla font-bold">{t("৩-৫ কার্যদিবস", "3-5 Working Days")}</span></div>
              </div>
              <Link href="/mobile/citizen/applications" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-bold text-base text-center block shadow-lg shadow-blue-500/20 mb-3">{t("আবেদন দেখুন", "View Applications")}</Link>
              <Link href="/mobile/citizen/home" className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold text-base text-center block bg-white dark:bg-[#1E293B]">{t("হোমে ফিরে যান", "Go Home")}</Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-gray-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/mobile/citizen/services" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-white" /></Link>
              <div><h1 className="text-lg font-bold text-white font-bangla">{t("মৃত্যু সনদ আবেদন", "Death Certificate Application")}</h1><p className="text-white/70 text-xs font-bangla">{t("ফি: ৳১০০", "Fee: ৳100")}</p></div>
            </div>
            {/* Steps */}
            <div className="flex items-center gap-1 mt-2">
              {steps.map((s, i) => (<div key={i} className="flex items-center flex-1 last:flex-none"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${i + 1 < step ? "bg-white text-slate-600" : i + 1 === step ? "border-2 border-white text-white" : "bg-white/20 text-white/50"}`}>{i + 1 < step ? <CheckCircle className="w-4 h-4" /> : i + 1}</div>{i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i + 1 < step ? "bg-white" : "bg-white/20"}`} />}</div>))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {step === 1 && (
            <div className="space-y-3.5">
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত ব্যক্তির নাম (বাংলা)", "Deceased Name (Bangla)")}</span><input type="text" className={ic} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="পূর্ণ নাম বাংলায়" /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("নাম (English)", "Name (English)")}</span><input type="text" className={ic} value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} placeholder="Full name in English" /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত্যুর তারিখ", "Date of Death")}</span><input type="date" className={ic} value={form.deathDate} onChange={(e) => set("deathDate", e.target.value)} /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত্যুর স্থান", "Place of Death")}</span><input type="text" className={ic} value={form.deathPlace} onChange={(e) => set("deathPlace", e.target.value)} placeholder="হাসপাতাল / বাড়ি" /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত্যুর কারণ", "Cause of Death")}</span><select className={ic} value={form.cause} onChange={(e) => set("cause", e.target.value)}><option value="">{t("নির্বাচন করুন", "Select")}</option><option>{t("স্বাভাবিক", "Natural")}</option><option>{t("অসুস্থতা", "Illness")}</option><option>{t("দুর্ঘটনা", "Accident")}</option><option>{t("অন্যান্য", "Other")}</option></select></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত ব্যক্তির NID নম্বর", "Deceased's NID Number")}</span><input type="text" className={ic} value={form.nid} onChange={(e) => set("nid", e.target.value)} placeholder="জাতীয় পরিচয়পত্র নম্বর" /></label>
              <button onClick={() => setStep(2)} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-500 text-white font-bangla font-bold flex items-center justify-center gap-2 shadow-lg mt-2">{t("পরবর্তী", "Next")} <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3.5">
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("আবেদনকারীর নাম", "Applicant Name")}</span><input type="text" className={ic} value={form.appName} onChange={(e) => set("appName", e.target.value)} placeholder="আপনার পূর্ণ নাম" /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মৃত ব্যক্তির সাথে সম্পর্ক", "Relationship")}</span><select className={ic} value={form.relation} onChange={(e) => set("relation", e.target.value)}><option value="">{t("নির্বাচন করুন", "Select")}</option><option>{t("স্বামী", "Husband")}</option><option>{t("স্ত্রী", "Wife")}</option><option>{t("পুত্র", "Son")}</option><option>{t("কন্যা", "Daughter")}</option><option>{t("পিতা", "Father")}</option><option>{t("মাতা", "Mother")}</option><option>{t("অন্যান্য", "Other")}</option></select></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("মোবাইল নম্বর", "Mobile Number")}</span><input type="tel" className={ic} value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="০১XXXXXXXXX" /></label>
              <label className="block"><span className="text-xs text-gray-500 dark:text-gray-400 font-bangla mb-1.5 block font-medium">{t("ওয়ার্ড নম্বর", "Ward No")}</span><select className={ic} value={form.ward} onChange={(e) => set("ward", e.target.value)}><option value="">{t("ওয়ার্ড নির্বাচন করুন", "Select Ward")}</option>{[1,2,3,4,5,6,7,8,9].map(n=><option key={n} value={String(n)}>ওয়ার্ড {n}</option>)}</select></label>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4" />{t("পূর্ববর্তী", "Previous")}</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-500 text-white font-bangla font-bold flex items-center justify-center gap-2">{t("পরবর্তী", "Next")} <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2">{t("আবেদনের সারসংক্ষেপ", "Application Summary")}</h3>
                {[[t("মৃত ব্যক্তির নাম", "Deceased Name"), form.name || "আব্দুল করিম"], [t("মৃত্যুর তারিখ", "Date of Death"), form.deathDate || "২০২৬-০৩-১০"], [t("মৃত্যুর কারণ", "Cause of Death"), form.cause || t("স্বাভাবিক", "Natural")], [t("আবেদনকারী", "Applicant"), form.appName || "রহিম উদ্দিন"], [t("সম্পর্ক", "Relationship"), form.relation || t("পুত্র", "Son")]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{l}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{v}</span></div>
                ))}
              </div>
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-gray-500 font-bangla">{t("ফি", "Fee")}</span><span className="text-2xl font-bold text-electric-blue">৳১০০</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2">{t("পেমেন্ট পদ্ধতি", "Payment Method")}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((pm) => (<button key={pm.id} onClick={() => set("paymentMethod", pm.id)} className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${form.paymentMethod === pm.id ? "border-electric-blue bg-blue-50 dark:bg-electric-blue/10 text-electric-blue" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E293B] text-gray-500"}`}>{pm.id === "card" ? <CreditCard className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}<span className="text-sm font-semibold">{pm.label}</span></button>))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4" />{t("পূর্ববর্তী", "Previous")}</button>
                <button onClick={() => { setIsSubmitting(true); setTimeout(() => { setIsSubmitting(false); setShowSuccess(true); }, 1500); }} disabled={isSubmitting} className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bangla font-bold shadow-lg disabled:opacity-80">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : t("আবেদন জমা দিন", "Submit Application")}
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

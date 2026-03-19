"use client";

import { useState } from "react";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import { QrCode, Stamp, Send, Download, CheckCircle, ArrowLeft, FileText, Shield, User, Clock, Award } from "lucide-react";

type CertApp = {
  id: string;
  applicant: string;
  applicantEn: string;
  service: string;
  serviceEn: string;
  approvedDate: string;
  details: { label: string; value: string }[];
};

const pendingCerts: CertApp[] = [
  {
    id: "APP-2026-001", applicant: "আব্দুল করিম", applicantEn: "Abdul Karim",
    service: "জন্ম নিবন্ধন", serviceEn: "Birth Registration", approvedDate: "১৮ মার্চ ২০২৬",
    details: [{ label: "নাম", value: "আব্দুল করিম" }, { label: "জন্ম তারিখ", value: "০১ জানুয়ারি, ১৯৯০" }, { label: "পিতার নাম", value: "মোহাম্মদ আলী" }, { label: "মাতার নাম", value: "রাবেয়া বেগম" }, { label: "ঠিকানা", value: "১২/৩, ওয়ার্ড-০৫, কালিয়াকৈর" }],
  },
  {
    id: "APP-2026-005", applicant: "রহিমা খাতুন", applicantEn: "Rahima Khatun",
    service: "নাগরিকত্ব সনদ", serviceEn: "Citizen Certificate", approvedDate: "১৭ মার্চ ২০২৬",
    details: [{ label: "নাম", value: "রহিমা খাতুন" }, { label: "পিতার নাম", value: "আফসার আলী" }, { label: "ঠিকানা", value: "পূর্বপাড়া, কালিয়াকৈর" }, { label: "বসবাস", value: "জন্ম থেকে" }],
  },
];

export default function OfficerCertificatePage() {
  const { t } = useLang();
  const [selectedCert, setSelectedCert] = useState<CertApp | null>(null);
  const [sealApplied, setSealApplied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => { setIsSending(false); setSent(true); }, 1500);
  };

  // ─── Certificate Preview + Seal + Send ───
  if (selectedCert) {
    if (sent) {
      return (
        <MobileFrame>
          <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="relative flex flex-col items-center pt-16 pb-10">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">{t("সনদ প্রেরিত!", "Certificate Sent!")}</h2>
                <p className="text-green-100 text-sm font-bangla">{t("নাগরিকের অ্যাপে পাঠানো হয়েছে", "Sent to citizen's app")}</p>
              </div>
            </div>
            <div className="flex-1 px-6 -mt-3 space-y-4">
              <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("সনদ নম্বর", "Cert No")}</span><span className="text-emerald-600 font-mono font-bold">CERT-2026-00156</span></div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("প্রাপক", "Recipient")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedCert.applicant, selectedCert.applicantEn)}</span></div>
                <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
                <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("সেবা", "Service")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedCert.service, selectedCert.serviceEn)}</span></div>
              </div>
              <button onClick={() => { setSelectedCert(null); setSent(false); setSealApplied(false); }} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bangla font-bold text-base shadow-lg shadow-emerald-500/20">
                {t("আরও সনদ তৈরি করুন", "Issue More Certificates")}
              </button>
              <Link href="/mobile/officer/dashboard" className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bangla font-bold text-base text-center block bg-white dark:bg-[#1E293B]">
                {t("ড্যাশবোর্ডে ফিরুন", "Back to Dashboard")}
              </Link>
            </div>
            <BottomNav role="officer" />
          </div>
        </MobileFrame>
      );
    }

    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-5">
              <div className="flex items-center gap-3">
                <button onClick={() => { setSelectedCert(null); setSealApplied(false); }} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-white" /></button>
                <div>
                  <h1 className="text-lg font-bold text-white font-bangla">{t("সনদ প্রস্তুত", "Prepare Certificate")}</h1>
                  <p className="text-green-100 text-xs font-bangla">{selectedCert.id} — {t(selectedCert.service, selectedCert.serviceEn)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4">
            {/* Certificate Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 relative">
              <div className="text-center border-b-2 border-gray-300 pb-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mx-auto mb-2 flex items-center justify-center shadow-sm"><Shield className="w-7 h-7 text-white" /></div>
                <h2 className="text-base font-bold text-gray-900 font-bangla">{t("কালিয়াকৈর পৌরসভা", "Kaliakair Municipality")}</h2>
                <p className="text-[10px] text-gray-500 font-bangla">{t("গাজীপুর জেলা, ঢাকা বিভাগ", "Gazipur District, Dhaka Division")}</p>
              </div>
              <h3 className="text-center text-sm font-bold text-gray-800 font-bangla mb-4 underline underline-offset-4 decoration-gray-400">{t(selectedCert.service, selectedCert.serviceEn)}</h3>
              <div className="space-y-2 text-[11px] mb-4">
                {selectedCert.details.map((d) => (
                  <div key={d.label} className="flex"><span className="text-gray-500 font-bangla w-24 shrink-0">{d.label}:</span><span className="text-gray-900 font-bangla font-medium">{d.value}</span></div>
                ))}
              </div>
              <div className="flex justify-between items-end border-t border-gray-200 pt-3 mt-3">
                <div className="space-y-1 text-[10px]">
                  <p className="text-gray-500 font-bangla">{t("প্রদানের তারিখ", "Issue Date")}: <span className="text-gray-800">১৮ মার্চ, ২০২৬</span></p>
                  <p className="text-gray-500 font-bangla">{t("সনদ নম্বর", "Cert No")}: <span className="text-gray-800 font-mono">CERT-2026-00156</span></p>
                </div>
                <div className="w-14 h-14 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center"><QrCode className="w-8 h-8 text-gray-400" /></div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                <div className="w-32 mx-auto border-b border-gray-400 mb-1 h-6" />
                <p className="text-[10px] text-gray-500 font-bangla">{t("কর্মকর্তার স্বাক্ষর", "Officer's Signature")}</p>
              </div>
              {sealApplied && (
                <div className="absolute top-5 right-5 w-14 h-14 rounded-full border-3 border-emerald-500 flex items-center justify-center rotate-[-15deg] bg-emerald-50"><CheckCircle className="w-6 h-6 text-emerald-500" /></div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button onClick={() => setSealApplied(!sealApplied)} className={`w-full py-3.5 rounded-2xl border-2 font-bangla font-bold text-sm flex items-center justify-center gap-2 transition-all ${sealApplied ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/15 text-emerald-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1E293B]"}`}>
                {sealApplied ? <><CheckCircle className="w-5 h-5" />{t("সিল প্রয়োগ হয়েছে", "Seal Applied")}</> : <><Stamp className="w-5 h-5" />{t("সিল প্রয়োগ করুন", "Apply Seal")}</>}
              </button>
              <button onClick={handleSend} disabled={isSending || !sealApplied} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bangla font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50">
                {isSending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-5 h-5" />{t("নাগরিককে পাঠান", "Send to Citizen")}</>}
              </button>
              {!sealApplied && (
                <p className="text-center text-xs text-amber-500 font-bangla">{t("প্রথমে সিল প্রয়োগ করুন", "Apply seal first to send")}</p>
              )}
              <button className="w-full py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bangla font-bold text-sm flex items-center justify-center gap-2 bg-white dark:bg-[#1E293B]">
                <Download className="w-5 h-5" />{t("PDF ডাউনলোড", "Download PDF")}
              </button>
            </div>
          </div>
          <BottomNav role="officer" />
        </div>
      </MobileFrame>
    );
  }

  // ─── List of Approved Apps Awaiting Certificate ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-3">
              <Link href="/mobile/officer/dashboard" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-white" /></Link>
              <div>
                <h1 className="text-lg font-bold text-white font-bangla">{t("সনদ প্রদান", "Issue Certificates")}</h1>
                <p className="text-green-100 text-xs font-bangla">{pendingCerts.length}{t("টি অনুমোদিত আবেদন সনদ প্রদানের অপেক্ষায়", " approved applications awaiting certificate")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-3">
          {/* Summary */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg shadow-black/5 dark:shadow-none border border-gray-100 dark:border-gray-700/50 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/15 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{pendingCerts.length}{t("টি সনদ প্রস্তুতের অপেক্ষায়", " certificates to prepare")}</p>
              <p className="text-xs text-gray-400 font-bangla mt-0.5">{t("অনুমোদিত আবেদন থেকে সনদ তৈরি করুন", "Create certificates from approved apps")}</p>
            </div>
          </div>

          {/* Approved App List */}
          {pendingCerts.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/15 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{t(cert.applicant, cert.applicantEn)}</p>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3 h-3" />{t("অনুমোদিত", "Approved")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{t(cert.service, cert.serviceEn)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1"><Clock className="w-3 h-3" />{cert.approvedDate}</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bangla font-bold">{t("সনদ তৈরি করুন", "Create Cert")} →</span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {pendingCerts.length === 0 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4"><Award className="w-7 h-7 text-gray-400" /></div>
              <p className="text-gray-400 font-bangla text-sm">{t("কোনো সনদ প্রস্তুতের অপেক্ষায় নেই", "No certificates pending")}</p>
            </div>
          )}
        </div>

        <BottomNav role="officer" />
      </div>
    </MobileFrame>
  );
}

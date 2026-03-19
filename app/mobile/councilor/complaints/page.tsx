"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import { List, Map, AlertTriangle, Droplets, Lightbulb, Trash2, HardHat, MapPin, Clock, X, Image, ArrowLeft, CheckCircle2, UserCheck, MessageSquare, Send, Phone, ChevronRight } from "lucide-react";

type Complaint = {
  id: number;
  category: string;
  categoryEn: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  descriptionEn: string;
  reporter: string;
  reporterEn: string;
  phone: string;
  address: string;
  addressEn: string;
  time: string;
  timeEn: string;
  status: string;
  hasPhoto: boolean;
};

const statusColors: Record<string, { bg: string; color: string; dot: string; labelEn: string }> = {
  জরুরি: { bg: "bg-red-50 dark:bg-red-900/20", color: "text-red-600 dark:text-red-400", dot: "bg-red-400", labelEn: "Urgent" },
  অপেক্ষমাণ: { bg: "bg-amber-50 dark:bg-amber-900/20", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-400", labelEn: "Pending" },
  নিযুক্ত: { bg: "bg-blue-50 dark:bg-blue-900/20", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-400", labelEn: "Assigned" },
  সমাধান: { bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400", labelEn: "Resolved" },
};

const statusOptions = [
  { bn: "জরুরি", en: "Urgent" },
  { bn: "অপেক্ষমাণ", en: "Pending" },
  { bn: "নিযুক্ত", en: "Assigned" },
  { bn: "সমাধান", en: "Resolved" },
];

const complaints: Complaint[] = [
  { id: 1, category: "রাস্তা", categoryEn: "Road", icon: HardHat, description: "মহল্লা রোডে বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে", descriptionEn: "Big pothole on Mohalla Road causing traffic issues", reporter: "রহিমা বেগম", reporterEn: "Rahima Begum", phone: "০১৭১১-XXXXXX", address: "৫/এ, মহল্লা রোড", addressEn: "5/A, Mohalla Road", time: "২ ঘণ্টা আগে", timeEn: "2 hours ago", status: "জরুরি", hasPhoto: true },
  { id: 2, category: "পানি", categoryEn: "Water", icon: Droplets, description: "তিন দিন ধরে পানি সরবরাহ বন্ধ", descriptionEn: "No water supply for 3 days", reporter: "করিম মিয়া", reporterEn: "Karim Mia", phone: "০১৮১২-XXXXXX", address: "১২, বাজার রোড", addressEn: "12, Bazar Road", time: "৫ ঘণ্টা আগে", timeEn: "5 hours ago", status: "অপেক্ষমাণ", hasPhoto: false },
  { id: 3, category: "আলো", categoryEn: "Light", icon: Lightbulb, description: "স্ট্রিটলাইট নষ্ট হয়ে গেছে, রাতে চলাচল বিপজ্জনক", descriptionEn: "Streetlight broken, dangerous at night", reporter: "সালমা আক্তার", reporterEn: "Salma Akter", phone: "০১৯১৩-XXXXXX", address: "৮, স্কুল রোড", addressEn: "8, School Road", time: "১ দিন আগে", timeEn: "1 day ago", status: "নিযুক্ত", hasPhoto: true },
  { id: 4, category: "বর্জ্য", categoryEn: "Waste", icon: Trash2, description: "ময়লা সংগ্রহ করা হচ্ছে না, দুর্গন্ধ ছড়াচ্ছে", descriptionEn: "Garbage not collected, stench spreading", reporter: "জামাল উদ্দিন", reporterEn: "Jamal Uddin", phone: "০১৬১৪-XXXXXX", address: "১৫, মসজিদ রোড", addressEn: "15, Masjid Road", time: "২ দিন আগে", timeEn: "2 days ago", status: "অপেক্ষমাণ", hasPhoto: true },
  { id: 5, category: "ড্রেনেজ", categoryEn: "Drainage", icon: Droplets, description: "ড্রেন উপচে পানি রাস্তায় উঠেছে", descriptionEn: "Drain overflow flooding the road", reporter: "নাসরিন জাহান", reporterEn: "Nasrin Jahan", phone: "০১৫১৫-XXXXXX", address: "২০, কলেজ রোড", addressEn: "20, College Road", time: "৩ দিন আগে", timeEn: "3 days ago", status: "সমাধান", hasPhoto: false },
];

const staffMembers = [
  { id: 1, name: "জাহাঙ্গীর আলম", nameEn: "Jahangir Alam" },
  { id: 2, name: "মোস্তাফিজুর রহমান", nameEn: "Mostafizur Rahman" },
  { id: 3, name: "কামরুল হাসান", nameEn: "Kamrul Hasan" },
];

export default function CouncilorComplaintsPage() {
  const { t } = useLang();
  const [view, setView] = useState<"list" | "map">("list");
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [assignModal, setAssignModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(complaints.map((c) => [c.id, c.status]))
  );
  const [assigned, setAssigned] = useState<Record<number, { name: string; id: number }>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [assignInstruction, setAssignInstruction] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);

  const handleAssign = () => {
    if (!selected || selectedStaff === null) return;
    setAssigning(true);
    setTimeout(() => {
      const staff = staffMembers.find(s => s.id === selectedStaff);
      if (staff) {
        setAssigned(prev => ({ ...prev, [selected.id]: { name: t(staff.name, staff.nameEn), id: staff.id } }));
        setStatuses(prev => ({ ...prev, [selected.id]: "নিযুক্ত" }));
        if (assignInstruction.trim()) {
          setNotes(prev => ({ ...prev, [selected.id]: assignInstruction }));
        }
      }
      setAssigning(false);
      setAssignSuccess(true);
      setTimeout(() => {
        setAssignSuccess(false);
        setAssignModal(false);
        setSelectedStaff(null);
        setAssignInstruction("");
      }, 1200);
    }, 1000);
  };

  const handleSaveNote = () => {
    if (!selected || !noteText.trim()) return;
    setNotes(prev => ({ ...prev, [selected.id]: noteText }));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 1500);
  };

  const urgentCount = Object.values(statuses).filter(s => s === "জরুরি").length;
  const pendingCount = Object.values(statuses).filter(s => s === "অপেক্ষমাণ").length;
  const resolvedCount = Object.values(statuses).filter(s => s === "সমাধান").length;

  const filteredComplaints = activeFilter === "all"
    ? complaints
    : complaints.filter(c => statuses[c.id] === activeFilter);

  // ─── Detail View ───
  if (selected) {
    const sc = statusColors[statuses[selected.id]];
    const Icon = selected.icon;
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => { setSelected(null); setNoteText(""); }} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white font-bangla">{t(selected.category, selected.categoryEn)} {t("অভিযোগ", "Complaint")}</h2>
                  <p className="text-blue-100 text-xs font-bangla">#{selected.id} · {t(selected.time, selected.timeEn)}</p>
                </div>
                <span className={`text-[10px] font-bangla font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/20`}>
                  {t(statuses[selected.id], sc.labelEn)}
                </span>
              </div>
              {/* Reporter Card */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-[15px] font-bangla">{t(selected.reporter, selected.reporterEn)}</p>
                  <p className="text-blue-100 text-xs font-mono mt-0.5">{selected.phone}</p>
                </div>
                <a href={`tel:${selected.phone}`} className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-2 -mt-1 space-y-3">
            {/* Description */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-2 font-bold uppercase tracking-wider">{t("বিবরণ", "Description")}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-bangla leading-relaxed">{t(selected.description, selected.descriptionEn)}</p>

              {selected.hasPhoto && (
                <div className="mt-3 w-full h-32 bg-gray-50 dark:bg-[#0F172A] rounded-xl border border-gray-100 dark:border-gray-700/50 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                </div>
              )}

              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-bangla">{t(selected.address, selected.addressEn)}</span>
              </div>
            </div>

            {/* Assigned Staff */}
            {assigned[selected.id] && (
              <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/30 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300 font-bangla">{assigned[selected.id].name}</p>
                    <p className="text-[11px] text-blue-500 font-bangla">{t("নিযুক্ত স্টাফ", "Assigned Staff")}</p>
                  </div>
                  <button
                    onClick={() => { setAssignModal(true); setSelectedStaff(assigned[selected.id].id); }}
                    className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 text-[11px] font-bangla font-bold"
                  >
                    {t("পরিবর্তন", "Change")}
                  </button>
                </div>
                {notes[selected.id] && (
                  <div className="bg-white/60 dark:bg-[#0F172A]/40 rounded-lg px-3 py-2 mt-1">
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bangla flex items-start gap-1.5">
                      <MessageSquare className="w-3 h-3 shrink-0 mt-0.5" />
                      {notes[selected.id]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Status Change — Tap Buttons */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-3 font-bold uppercase tracking-wider">{t("অবস্থা পরিবর্তন", "Change Status")}</h4>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((opt) => {
                  const isActive = statuses[selected.id] === opt.bn;
                  const oc = statusColors[opt.bn];
                  return (
                    <button
                      key={opt.bn}
                      onClick={() => setStatuses(prev => ({ ...prev, [selected.id]: opt.bn }))}
                      className={`py-2.5 rounded-xl text-xs font-bangla font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isActive
                          ? `${oc.bg} ${oc.color} border-2 border-current`
                          : "bg-gray-50 dark:bg-[#0F172A] text-gray-400 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isActive ? oc.dot : "bg-gray-300 dark:bg-gray-600"}`} />
                      {t(opt.bn, opt.en)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-2 font-bold uppercase tracking-wider">{t("কাউন্সিলর নোট", "Councilor Note")}</h4>
              {notes[selected.id] && (
                <div className="bg-indigo-50 dark:bg-indigo-900/15 border border-indigo-200 dark:border-indigo-700/30 rounded-xl p-3 mb-2">
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-bangla flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {notes[selected.id]}
                  </p>
                </div>
              )}
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t("নোট লিখুন...", "Write a note...")}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 resize-none font-bangla"
              />
              <button
                onClick={handleSaveNote}
                disabled={!noteText.trim()}
                className="mt-2 w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/15 text-indigo-600 dark:text-indigo-400 text-xs font-bangla font-bold disabled:opacity-40"
              >
                {noteSaved ? t("✓ সংরক্ষিত!", "✓ Saved!") : t("নোট সংরক্ষণ", "Save Note")}
              </button>
            </div>
          </div>

          {/* Action Bar */}
          {statuses[selected.id] !== "সমাধান" && (
            <div className="sticky bottom-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-700/50 p-4">
              {!assigned[selected.id] ? (
                <button
                  onClick={() => { setAssignModal(true); setSelectedStaff(null); setAssignInstruction(""); }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20"
                >
                  <UserCheck className="w-4 h-4" /> {t("ফিল্ড স্টাফ নিযুক্ত করুন", "Assign Field Staff")}
                </button>
              ) : (
                <button
                  onClick={() => setStatuses(prev => ({ ...prev, [selected.id]: "সমাধান" }))}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 text-white text-sm font-bangla font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" /> {t("সমাধান হিসেবে চিহ্নিত করুন", "Mark as Resolved")}
                </button>
              )}
            </div>
          )}
          {statuses[selected.id] === "সমাধান" && (
            <div className="px-5 pb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-bangla">{t("এই অভিযোগ সমাধান হয়েছে", "This complaint has been resolved")}</p>
              </div>
            </div>
          )}

          {/* Assign Modal */}
          {assignModal && (
            <div className="absolute inset-0 bg-black/60 z-[60] flex items-end justify-center">
              <div className="bg-white dark:bg-[#1E293B] rounded-t-3xl w-full p-6 pb-10 space-y-4">
                {assignSuccess ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/15 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white font-bangla mb-1">{t("স্টাফ নিযুক্ত হয়েছে!", "Staff Assigned!")}</h3>
                    <p className="text-sm text-gray-500 font-bangla text-center">
                      {staffMembers.find(s => s.id === selectedStaff) && t(
                        staffMembers.find(s => s.id === selectedStaff)!.name,
                        staffMembers.find(s => s.id === selectedStaff)!.nameEn
                      )} {t("কে নিযুক্ত করা হয়েছে", "has been assigned")}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white font-bangla">{t("স্টাফ নিযুক্ত করুন", "Assign Staff")}</h3>
                        <p className="text-xs text-gray-400 font-bangla mt-0.5">{t(selected?.category || "", selected?.categoryEn || "")} — #{selected?.id}</p>
                      </div>
                      <button onClick={() => { setAssignModal(false); setAssignInstruction(""); }} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Step 1: Select Staff */}
                    <div>
                      <p className="text-xs text-gray-500 font-bangla mb-2 font-bold">{t("১. স্টাফ নির্বাচন করুন", "1. Select Staff")}</p>
                      <div className="space-y-2">
                        {staffMembers.map((staff) => (
                          <button
                            key={staff.id}
                            onClick={() => setSelectedStaff(staff.id)}
                            className={`w-full p-3.5 rounded-xl text-left text-sm font-bangla transition-all flex items-center gap-3 ${
                              selectedStaff === staff.id
                                ? "bg-indigo-50 dark:bg-indigo-900/15 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-400 font-bold"
                                : "bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selectedStaff === staff.id ? "bg-indigo-100 dark:bg-indigo-800/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                              <UserCheck className={`w-4 h-4 ${selectedStaff === staff.id ? "text-indigo-600" : "text-gray-400"}`} />
                            </div>
                            {t(staff.name, staff.nameEn)}
                            {selectedStaff === staff.id && <CheckCircle2 className="w-5 h-5 text-indigo-500 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Instruction (optional) */}
                    {selectedStaff !== null && (
                      <div>
                        <p className="text-xs text-gray-500 font-bangla mb-2 font-bold">{t("২. নির্দেশনা দিন (ঐচ্ছিক)", "2. Add Instruction (optional)")}</p>
                        <textarea
                          value={assignInstruction}
                          onChange={(e) => setAssignInstruction(e.target.value)}
                          placeholder={t("যেমন: আগামীকাল সকালে সরেজমিনে যাচাই করুন...", "e.g., Verify on-site tomorrow morning...")}
                          rows={2}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 resize-none font-bangla"
                        />
                      </div>
                    )}

                    {/* Confirm */}
                    <button
                      onClick={handleAssign}
                      disabled={selectedStaff === null || assigning}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-bangla font-bold disabled:opacity-50 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                      {assigning ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("নিযুক্ত হচ্ছে...", "Assigning...")}</>
                      ) : (
                        <><Send className="w-4 h-4" /> {t("নিযুক্ত করুন ও নোটিফাই করুন", "Assign & Notify")}</>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          <BottomNav role="councilor" />
        </div>
      </MobileFrame>
    );
  }

  // ─── List View ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => window.history.back()} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">{t("অভিযোগ ব্যবস্থাপনা", "Complaint Management")}</h1>
                <p className="text-blue-100 text-xs font-bangla">{t("ওয়ার্ড ৫", "Ward 5")} · {complaints.length} {t("টি অভিযোগ", " complaints")}</p>
              </div>
            </div>

            {/* Summary Pills */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{urgentCount}</p>
                <p className="text-blue-100 text-[9px] font-bangla">{t("জরুরি", "Urgent")}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{pendingCount}</p>
                <p className="text-blue-100 text-[9px] font-bangla">{t("অপেক্ষমাণ", "Pending")}</p>
              </div>
              <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/15 text-center">
                <p className="text-lg font-bold text-white">{resolvedCount}</p>
                <p className="text-blue-100 text-[9px] font-bangla">{t("সমাধান", "Resolved")}</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 bg-white/10 rounded-xl p-1">
              {[
                { key: "all", label: t("সব", "All") },
                { key: "জরুরি", label: t("জরুরি", "Urgent") },
                { key: "অপেক্ষমাণ", label: t("অপেক্ষমাণ", "Pending") },
                { key: "সমাধান", label: t("সমাধান", "Done") },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`flex-1 py-2.5 rounded-lg text-[11px] font-bangla font-medium transition-all ${
                    activeFilter === f.key ? "bg-white text-indigo-600 shadow-sm font-bold" : "text-white/70"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-3">
          {filteredComplaints.map((complaint) => {
            const sc = statusColors[statuses[complaint.id]];
            const Icon = complaint.icon;
            return (
              <button
                key={complaint.id}
                onClick={() => setSelected(complaint)}
                className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{t(complaint.category, complaint.categoryEn)}</p>
                      <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bangla font-bold shrink-0 ${sc.bg} ${sc.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {t(statuses[complaint.id], sc.labelEn)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla truncate">{t(complaint.description, complaint.descriptionEn)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t(complaint.address, complaint.addressEn)}
                      </span>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t(complaint.time, complaint.timeEn)}
                      </span>
                    </div>
                    {assigned[complaint.id] && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <UserCheck className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bangla font-medium">{assigned[complaint.id].name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
          {filteredComplaints.length === 0 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-400 font-bangla text-sm">{t("কোনো অভিযোগ নেই", "No complaints")}</p>
            </div>
          )}
        </div>

        <BottomNav role="councilor" />
      </div>
    </MobileFrame>
  );
}

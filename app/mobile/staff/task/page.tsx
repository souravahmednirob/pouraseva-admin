"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import { Navigation, MapPin, Camera, Plus, Image, CheckCircle2, ArrowLeft, AlertTriangle, ClipboardCheck, Clock, Phone } from "lucide-react";

type TaskDetail = {
  id: number;
  type: "complaint" | "inspection";
  category: string;
  categoryEn: string;
  priority: string;
  priorityEn: string;
  time: string;
  timeEn: string;
  description: string;
  descriptionEn: string;
  address: string;
  addressEn: string;
  reporter: string;
  reporterEn: string;
  phone: string;
  distance: string;
  distanceEn: string;
  assignedBy: string;
  assignedByEn: string;
  instruction: string;
  instructionEn: string;
};

const allTasks: TaskDetail[] = [
  {
    id: 1, type: "complaint", category: "রাস্তা", categoryEn: "Road", priority: "জরুরি", priorityEn: "Urgent",
    time: "সকাল ৯:৩০", timeEn: "9:30 AM",
    description: "মহল্লা রোডে বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে। গত এক সপ্তাহ ধরে এই সমস্যা চলছে।",
    descriptionEn: "Big pothole on Mohalla Road causing traffic issues. This problem has been ongoing for a week.",
    address: "৫/এ, মহল্লা রোড, ওয়ার্ড ৫", addressEn: "5/A, Mohalla Road, Ward 5",
    reporter: "রহিমা বেগম", reporterEn: "Rahima Begum", phone: "০১৭১১-XXXXXX",
    distance: "১৫০ মিটার দূরে", distanceEn: "150m away",
    assignedBy: "কাউন্সিলর আবদুল করিম", assignedByEn: "Councilor Abdul Karim",
    instruction: "আগামীকাল সকালে সরেজমিনে যাচাই করুন", instructionEn: "Verify on-site tomorrow morning",
  },
  {
    id: 2, type: "complaint", category: "পানি", categoryEn: "Water", priority: "জরুরি", priorityEn: "Urgent",
    time: "সকাল ১০:০০", timeEn: "10:00 AM",
    description: "তিন দিন ধরে পানি সরবরাহ বন্ধ। স্থানীয়রা খুবই কষ্টে আছেন।",
    descriptionEn: "No water supply for 3 days. Locals are suffering badly.",
    address: "১২, বাজার রোড, ওয়ার্ড ৫", addressEn: "12, Bazar Road, Ward 5",
    reporter: "করিম মিয়া", reporterEn: "Karim Mia", phone: "০১৮১২-XXXXXX",
    distance: "৫০০ মিটার দূরে", distanceEn: "500m away",
    assignedBy: "কাউন্সিলর আবদুল করিম", assignedByEn: "Councilor Abdul Karim",
    instruction: "", instructionEn: "",
  },
  {
    id: 3, type: "inspection", category: "ড্রেনেজ", categoryEn: "Drainage", priority: "মাঝারি", priorityEn: "Medium",
    time: "দুপুর ১২:০০", timeEn: "12:00 PM",
    description: "ড্রেনেজ সিস্টেম পরিদর্শন করতে হবে। গত মাসে মেরামত করা হয়েছিল।",
    descriptionEn: "Drainage system needs inspection. Was repaired last month.",
    address: "৮, স্কুল রোড, ওয়ার্ড ৫", addressEn: "8, School Road, Ward 5",
    reporter: "সালমা আক্তার", reporterEn: "Salma Akter", phone: "০১৯১৩-XXXXXX",
    distance: "১.২ কি.মি. দূরে", distanceEn: "1.2km away",
    assignedBy: "সচিব রফিকুল ইসলাম", assignedByEn: "Secretary Rafiqul Islam",
    instruction: "ছবি তুলে রিপোর্ট দিন", instructionEn: "Take photos and submit report",
  },
];

export default function StaffTaskPage() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const initialTask = taskId ? allTasks.find(tk => tk.id === Number(taskId)) || allTasks[0] : null;

  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(initialTask);
  const [resolutionNote, setResolutionNote] = useState("");
  const [photosTaken, setPhotosTaken] = useState(0);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const canComplete = resolutionNote.trim().length > 0;

  const handleComplete = () => {
    if (!canComplete) return;
    setCompleting(true);
    setTimeout(() => {
      setCompleting(false);
      setCompleted(true);
    }, 1500);
  };

  // ─── Task Completed ───
  if (selectedTask && completed) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="relative flex flex-col items-center pt-16 pb-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white font-bangla mb-1.5">{t("কাজ সম্পন্ন!", "Task Completed!")}</h2>
              <p className="text-green-100 text-sm font-bangla">{t(selectedTask.category, selectedTask.categoryEn)} — {t(selectedTask.address, selectedTask.addressEn)}</p>
            </div>
          </div>
          <div className="flex-1 px-6 -mt-3 space-y-4">
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-lg rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("বিভাগ", "Category")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium">{t(selectedTask.category, selectedTask.categoryEn)}</span></div>
              <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
              <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("ঠিকানা", "Address")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium text-right max-w-[55%]">{t(selectedTask.address, selectedTask.addressEn)}</span></div>
              <div className="h-px bg-gray-100 dark:bg-gray-700/50" />
              <div className="flex justify-between text-sm"><span className="text-gray-400 font-bangla">{t("বিবরণ", "Note")}</span><span className="text-gray-900 dark:text-white font-bangla font-medium text-right max-w-[55%]">{resolutionNote}</span></div>
            </div>
            <Link href="/mobile/staff/dashboard" className="block w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bangla font-bold text-base text-center shadow-lg shadow-orange-500/20">
              {t("ড্যাশবোর্ডে ফিরুন", "Back to Dashboard")}
            </Link>
          </div>
          <BottomNav role="staff" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Task Detail ───
  if (selectedTask) {
    const isUrgent = selectedTask.priority === "জরুরি";
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setSelectedTask(null)} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white font-bangla">{t(selectedTask.category, selectedTask.categoryEn)} {selectedTask.type === "complaint" ? t("অভিযোগ", "Complaint") : t("পরিদর্শন", "Inspection")}</h2>
                  <p className="text-amber-100 text-xs font-bangla">{t(selectedTask.time, selectedTask.timeEn)}</p>
                </div>
                <span className={`text-[10px] font-bangla font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/20`}>
                  {t(selectedTask.priority, selectedTask.priorityEn)}
                </span>
              </div>
              {/* Reporter */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/15 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  {selectedTask.type === "complaint" ? <AlertTriangle className="w-5 h-5 text-white" /> : <ClipboardCheck className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm font-bangla">{t(selectedTask.reporter, selectedTask.reporterEn)}</p>
                  <p className="text-amber-100 text-xs font-mono">{selectedTask.phone}</p>
                </div>
                <a href={`tel:${selectedTask.phone}`} className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2 space-y-3">
            {/* Description */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-2 font-bold uppercase tracking-wider">{t("বিবরণ", "Description")}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-bangla leading-relaxed">{t(selectedTask.description, selectedTask.descriptionEn)}</p>
              <div className="flex gap-2 mt-3">
                <div className="w-20 h-14 bg-gray-50 dark:bg-[#0F172A] rounded-lg border border-gray-100 dark:border-gray-700/50 flex items-center justify-center"><Image className="w-5 h-5 text-gray-300 dark:text-gray-600" /></div>
                <div className="w-20 h-14 bg-gray-50 dark:bg-[#0F172A] rounded-lg border border-gray-100 dark:border-gray-700/50 flex items-center justify-center"><Image className="w-5 h-5 text-gray-300 dark:text-gray-600" /></div>
              </div>
            </div>

            {/* Instruction from councilor */}
            {selectedTask.instruction && (
              <div className="bg-indigo-50 dark:bg-indigo-900/15 border border-indigo-200 dark:border-indigo-700/30 rounded-2xl p-4">
                <p className="text-[11px] text-indigo-500 font-bangla mb-1 font-bold">{t("কাউন্সিলরের নির্দেশনা", "Councilor's Instruction")}</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 font-bangla">{t(selectedTask.instruction, selectedTask.instructionEn)}</p>
                <p className="text-[10px] text-indigo-400 font-bangla mt-1.5">— {t(selectedTask.assignedBy, selectedTask.assignedByEn)}</p>
              </div>
            )}

            {/* Location + Navigate */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-900 dark:text-white font-bangla">{t(selectedTask.address, selectedTask.addressEn)}</span>
              </div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bangla">{t(selectedTask.distance, selectedTask.distanceEn)}</span>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-orange-50 dark:bg-orange-900/15 text-orange-600 dark:text-orange-400 text-sm font-bangla font-bold flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" /> {t("নেভিগেট করুন", "Navigate")}
              </button>
            </div>

            {/* Photo Evidence */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-3 font-bold uppercase tracking-wider">{t("ফটো প্রমাণ", "Photo Evidence")} <span className="text-red-400">*</span></h4>
              <div className="flex gap-2">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    onClick={() => setPhotosTaken(prev => Math.min(prev + 1, 2))}
                    className={`w-20 h-16 rounded-xl flex items-center justify-center ${
                      i < photosTaken
                        ? "bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/30"
                        : "border-2 border-dashed border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {i < photosTaken ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-5 h-5 text-gray-400 mx-auto" />
                        <Plus className="w-3 h-3 text-gray-400 mx-auto -mt-1" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Note */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4">
              <h4 className="text-xs text-gray-400 font-bangla mb-2 font-bold uppercase tracking-wider">{t("সমাধানের বিবরণ", "Resolution Note")} <span className="text-red-400">*</span></h4>
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder={t("কী কাজ করা হয়েছে তার বিবরণ লিখুন...", "Describe what work was done...")}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 resize-none font-bangla"
              />
            </div>
          </div>

          {/* Complete Button */}
          <div className="sticky bottom-0 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-700/50 p-4">
            <button
              onClick={handleComplete}
              disabled={!canComplete || completing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bangla font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {completing ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("জমা হচ্ছে...", "Submitting...")}</>
              ) : (
                <><CheckCircle2 className="w-5 h-5" /> {t("কাজ সম্পন্ন করুন", "Complete Task")}</>
              )}
            </button>
            {!canComplete && (
              <p className="text-center text-xs text-amber-500 font-bangla mt-2">{t("সমাধানের বিবরণ লিখুন", "Please write resolution note")}</p>
            )}
          </div>

          <BottomNav role="staff" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Task List ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3">
              <Link href="/mobile/staff/dashboard" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-white font-bangla">{t("আমার কাজসমূহ", "My Tasks")}</h1>
                <p className="text-amber-100 text-xs font-bangla">{allTasks.length} {t("টি কাজ আজকের জন্য", " tasks for today")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-3">
          {allTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${task.type === "complaint" ? "bg-red-50 dark:bg-red-900/15" : "bg-blue-50 dark:bg-blue-900/15"}`}>
                  {task.type === "complaint" ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ClipboardCheck className="w-5 h-5 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t(task.category, task.categoryEn)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla truncate">{t(task.description, task.descriptionEn)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1"><MapPin className="w-3 h-3" /> {t(task.address, task.addressEn)}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <BottomNav role="staff" />
      </div>
    </MobileFrame>
  );
}

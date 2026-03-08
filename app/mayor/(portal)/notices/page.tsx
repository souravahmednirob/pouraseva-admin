"use client";

import { useState } from "react";
import {
  Plus,
  Eye,
  Bell,
  Calendar,
  MapPin,
  FileText,
  Send,
  Save,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

type NoticeStatus = "Published" | "Draft" | "Scheduled";
type NoticePriority = "Normal" | "Important" | "Emergency";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  wards: number[];
  status: NoticeStatus;
  priority: NoticePriority;
  scheduledDate?: string;
  pushNotification: boolean;
  viewCount?: number;
  wardReach?: number;
  notificationSent?: number;
}

const mockNotices: Notice[] = [
  {
    id: "NTC-001",
    title: "পানি সরবরাহ সাময়িক বন্ধ থাকবে",
    content: "আগামী ১০ মার্চ রবিবার সকাল ৮টা থেকে বিকাল ৫টা পর্যন্ত ৩নং ও ৫নং ওয়ার্ডে পানি সরবরাহ সাময়িক বন্ধ থাকবে। পাইপলাইন মেরামতের কাজ চলবে। অনুগ্রহ করে পানি সংরক্ষণ করুন।",
    date: "2026-03-06",
    wards: [3, 5],
    status: "Published",
    priority: "Important",
    pushNotification: true,
    viewCount: 1245,
    wardReach: 2,
    notificationSent: 3420,
  },
  {
    id: "NTC-002",
    title: "হোল্ডিং ট্যাক্স পরিশোধের শেষ তারিখ",
    content: "২০২৫-২৬ অর্থবছরের হোল্ডিং ট্যাক্স পরিশোধের শেষ তারিখ ৩১ মার্চ ২০২৬। সময়মত পরিশোধ করুন এবং জরিমানা এড়িয়ে চলুন।",
    date: "2026-03-05",
    wards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    status: "Published",
    priority: "Normal",
    pushNotification: true,
    viewCount: 2890,
    wardReach: 9,
    notificationSent: 15200,
  },
  {
    id: "NTC-003",
    title: "মশক নিধন অভিযান",
    content: "আগামী সপ্তাহে সকল ওয়ার্ডে মশক নিধন অভিযান পরিচালিত হবে। নাগরিকদের সহযোগিতা কামনা করা হচ্ছে।",
    date: "2026-03-08",
    wards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    status: "Scheduled",
    priority: "Normal",
    scheduledDate: "2026-03-08T09:00",
    pushNotification: true,
  },
  {
    id: "NTC-004",
    title: "জরুরি: ঝড়ের সতর্কতা",
    content: "আবহাওয়া অধিদপ্তরের পূর্বাভাস অনুযায়ী আজ রাতে ঝড়ের সম্ভাবনা রয়েছে। সকলকে সতর্ক থাকার অনুরোধ করা হচ্ছে।",
    date: "2026-03-04",
    wards: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    status: "Published",
    priority: "Emergency",
    pushNotification: true,
    viewCount: 4500,
    wardReach: 9,
    notificationSent: 15200,
  },
  {
    id: "NTC-005",
    title: "নতুন খেলার মাঠ উদ্বোধন",
    content: "৬নং ওয়ার্ডে নতুন খেলার মাঠ উদ্বোধন করা হবে। সকলকে আমন্ত্রণ জানানো হচ্ছে।",
    date: "2026-03-03",
    wards: [6],
    status: "Draft",
    priority: "Normal",
    pushNotification: false,
  },
];

const statusBadge: Record<NoticeStatus, string> = {
  Published: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Draft: "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400",
  Scheduled: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
};

const priorityIcon: Record<NoticePriority, typeof Info> = {
  Normal: Info,
  Important: AlertTriangle,
  Emergency: AlertTriangle,
};

export default function NoticesPage() {
  const [selectedId, setSelectedId] = useState<string>(mockNotices[0].id);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formWards, setFormWards] = useState<number[]>([]);
  const [formAllWards, setFormAllWards] = useState(false);
  const [formPriority, setFormPriority] = useState<NoticePriority>("Normal");
  const [formScheduleEnabled, setFormScheduleEnabled] = useState(false);
  const [formScheduleDate, setFormScheduleDate] = useState("");
  const [formPushNotification, setFormPushNotification] = useState(true);

  const selectedNotice = mockNotices.find((n) => n.id === selectedId);

  const handleSelectNotice = (notice: Notice) => {
    setSelectedId(notice.id);
    setIsCreating(false);
    setFormTitle(notice.title);
    setFormContent(notice.content);
    setFormWards(notice.wards);
    setFormAllWards(notice.wards.length === 9);
    setFormPriority(notice.priority);
    setFormScheduleEnabled(!!notice.scheduledDate);
    setFormScheduleDate(notice.scheduledDate || "");
    setFormPushNotification(notice.pushNotification);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedId("");
    setFormTitle("");
    setFormContent("");
    setFormWards([]);
    setFormAllWards(false);
    setFormPriority("Normal");
    setFormScheduleEnabled(false);
    setFormScheduleDate("");
    setFormPushNotification(true);
  };

  const toggleWard = (ward: number) => {
    setFormWards((prev) =>
      prev.includes(ward) ? prev.filter((w) => w !== ward) : [...prev, ward]
    );
  };

  const handleAllWards = () => {
    if (formAllWards) {
      setFormWards([]);
      setFormAllWards(false);
    } else {
      setFormWards([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      setFormAllWards(true);
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-180px)] font-bangla">
      {/* Left Panel - Notice List */}
      <div className="w-[30%] min-w-[280px] flex flex-col bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCreate}
            className="w-full bg-electric-blue hover:bg-electric-blue/80 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            নতুন নোটিশ
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockNotices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => handleSelectNotice(notice)}
              className={`w-full p-4 text-left border-b border-gray-100 dark:border-gray-700/50 transition-colors ${
                selectedId === notice.id && !isCreating
                  ? "bg-blue-50 dark:bg-electric-blue/10 border-l-2 border-l-electric-blue"
                  : "hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-gray-900 dark:text-gray-100 text-sm font-medium line-clamp-1 flex-1">{notice.title}</h4>
                {notice.priority === "Emergency" && (
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-500 dark:text-gray-400 text-xs">{notice.date}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge[notice.status]}`}>
                  {notice.status}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-xs">
                <MapPin className="w-3 h-3" />
                {notice.wards.length === 9 ? "সকল ওয়ার্ড" : `ওয়ার্ড ${notice.wards.join(", ")}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Editor/Detail */}
      <div className="flex-1 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">শিরোনাম</label>
            <input
              type="text"
              value={isCreating ? formTitle : selectedNotice?.title || ""}
              onChange={(e) => setFormTitle(e.target.value)}
              readOnly={!isCreating && selectedNotice?.status === "Published"}
              placeholder="নোটিশের শিরোনাম লিখুন..."
              className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-lg font-medium focus:outline-none focus:border-electric-blue"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm mb-1">বিস্তারিত</label>
            <textarea
              value={isCreating ? formContent : selectedNotice?.content || ""}
              onChange={(e) => setFormContent(e.target.value)}
              readOnly={!isCreating && selectedNotice?.status === "Published"}
              placeholder="নোটিশের বিস্তারিত লিখুন..."
              rows={8}
              className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue resize-none"
            />
          </div>

          {/* Ward Targeting */}
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">ওয়ার্ড নির্বাচন</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAllWards}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  formAllWards
                    ? "border-blue-400 dark:border-electric-blue bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "border-gray-200 dark:border-gray-700 bg-[#F0F7FF] dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                সকল ওয়ার্ড
              </button>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((ward) => (
                <button
                  key={ward}
                  onClick={() => toggleWard(ward)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    formWards.includes(ward)
                      ? "border-blue-400 dark:border-electric-blue bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 bg-[#F0F7FF] dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {ward}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2">অগ্রাধিকার</label>
            <div className="flex gap-3">
              {(["Normal", "Important", "Emergency"] as NoticePriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setFormPriority(p)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-2 ${
                    formPriority === p
                      ? p === "Emergency"
                        ? "border-red-400 dark:border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        : p === "Important"
                        ? "border-yellow-400 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "border-blue-400 dark:border-electric-blue bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-700 bg-[#F0F7FF] dark:bg-[#0F172A] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {p === "Normal" ? "সাধারণ" : p === "Important" ? "গুরুত্বপূর্ণ" : "জরুরি"}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#F0F7FF] dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">সময়সূচী নির্ধারণ</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">নির্দিষ্ট সময়ে স্বয়ংক্রিয়ভাবে প্রকাশ</p>
              </div>
            </div>
            <button
              onClick={() => setFormScheduleEnabled(!formScheduleEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                formScheduleEnabled ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  formScheduleEnabled ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
          {formScheduleEnabled && (
            <input
              type="datetime-local"
              value={formScheduleDate}
              onChange={(e) => setFormScheduleDate(e.target.value)}
              className="w-full bg-[#F0F7FF] dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue"
            />
          )}

          {/* Push Notification Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#F0F7FF] dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">পুশ নোটিফিকেশন</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">নাগরিকদের মোবাইলে নোটিফিকেশন পাঠান</p>
              </div>
            </div>
            <button
              onClick={() => setFormPushNotification(!formPushNotification)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                formPushNotification ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  formPushNotification ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Published Notice Stats */}
          {!isCreating && selectedNotice?.status === "Published" && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#F0F7FF] dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Eye className="w-3 h-3" />
                  ভিউ সংখ্যা
                </div>
                <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">{selectedNotice.viewCount?.toLocaleString()}</p>
              </div>
              <div className="text-center border-x border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <MapPin className="w-3 h-3" />
                  ওয়ার্ড রিচ
                </div>
                <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">{selectedNotice.wardReach}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Bell className="w-3 h-3" />
                  নোটিফিকেশন
                </div>
                <p className="text-gray-900 dark:text-gray-100 text-lg font-bold">{selectedNotice.notificationSent?.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <Save className="w-4 h-4" />
              ড্রাফট সংরক্ষণ
            </button>
            <button className="flex-1 bg-electric-blue hover:bg-electric-blue/80 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors blue-glow">
              <Send className="w-4 h-4" />
              প্রকাশ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

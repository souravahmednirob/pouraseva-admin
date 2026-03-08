"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { List, Map, AlertTriangle, Droplets, Lightbulb, Trash2, HardHat, MapPin, Clock, X, Image } from "lucide-react";

type Complaint = {
  id: number;
  category: string;
  icon: React.ElementType;
  description: string;
  address: string;
  time: string;
  status: "জরুরি" | "অপেক্ষমাণ" | "নিযুক্ত" | "সমাধান";
  hasPhoto: boolean;
};

const statusColors: Record<string, string> = {
  জরুরি: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  অপেক্ষমাণ: "bg-amber-50 dark:bg-warning/20 text-amber-700 dark:text-warning",
  নিযুক্ত: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  সমাধান: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
};

const statusOptions = ["জরুরি", "অপেক্ষমাণ", "নিযুক্ত", "সমাধান"];

const complaints: Complaint[] = [
  { id: 1, category: "রাস্তা", icon: HardHat, description: "মহল্লা রোডে বড় গর্ত হয়েছে, যানবাহন চলাচলে সমস্যা হচ্ছে", address: "৫/এ, মহল্লা রোড", time: "২ ঘণ্টা আগে", status: "জরুরি", hasPhoto: true },
  { id: 2, category: "পানি", icon: Droplets, description: "তিন দিন ধরে পানি সরবরাহ বন্ধ", address: "১২, বাজার রোড", time: "৫ ঘণ্টা আগে", status: "অপেক্ষমাণ", hasPhoto: false },
  { id: 3, category: "আলো", icon: Lightbulb, description: "স্ট্রিটলাইট নষ্ট হয়ে গেছে, রাতে চলাচল বিপজ্জনক", address: "৮, স্কুল রোড", time: "১ দিন আগে", status: "নিযুক্ত", hasPhoto: true },
  { id: 4, category: "বর্জ্য", icon: Trash2, description: "ময়লা সংগ্রহ করা হচ্ছে না, দুর্গন্ধ ছড়াচ্ছে", address: "১৫, মসজিদ রোড", time: "২ দিন আগে", status: "অপেক্ষমাণ", hasPhoto: true },
  { id: 5, category: "ড্রেনেজ", icon: Droplets, description: "ড্রেন উপচে পানি রাস্তায় উঠেছে", address: "২০, কলেজ রোড", time: "৩ দিন আগে", status: "সমাধান", hasPhoto: false },
];

const staffMembers = [
  { id: 1, name: "জাহাঙ্গীর আলম" },
  { id: 2, name: "মোস্তাফিজুর রহমান" },
  { id: 3, name: "কামরুল হাসান" },
];

export default function CouncilorComplaintsPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [assignModal, setAssignModal] = useState<number | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(complaints.map((c) => [c.id, c.status]))
  );

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-4 font-bangla">
        {/* Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bangla transition-colors ${
              view === "list" ? "bg-electric-blue text-white" : "bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
            }`}
          >
            <List className="w-4 h-4" />
            তালিকা
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bangla transition-colors ${
              view === "map" ? "bg-electric-blue text-white" : "bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
            }`}
          >
            <Map className="w-4 h-4" />
            ম্যাপ
          </button>
        </div>

        {view === "map" ? (
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-xl h-80 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bangla">ম্যাপ ভিউ শীঘ্রই আসছে</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
{(() => { const I = (complaint as any).icon; return <I className="w-5 h-5 text-electric-blue" />; })()}
                    <span className="text-gray-900 dark:text-white text-sm font-semibold font-bangla">{complaint.category}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[statuses[complaint.id]]}`}>
                    {statuses[complaint.id]}
                  </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-1 font-bangla">{complaint.description}</p>

                {complaint.hasPhoto && (
                  <div className="w-16 h-12 bg-gray-50 dark:bg-[#0F172A] rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                  </div>
                )}

                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{complaint.address}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{complaint.time}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => { setAssignModal(complaint.id); setSelectedStaff(null); }}
                    className="flex-1 bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue text-xs py-2 rounded-lg font-bangla"
                  >
                    ফিল্ড স্টাফকে দিন
                  </button>
                  <select
                    value={statuses[complaint.id]}
                    onChange={(e) => setStatuses({ ...statuses, [complaint.id]: e.target.value })}
                    className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-xs py-2 px-2 rounded-lg font-bangla appearance-none focus:outline-none"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {assignModal !== null && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white dark:bg-[#1E293B] rounded-t-2xl w-full max-w-[375px] p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla">ফিল্ড স্টাফ নির্বাচন করুন</h3>
              <button onClick={() => setAssignModal(null)}>
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-2">
              {staffMembers.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.id)}
                  className={`w-full p-3 rounded-xl text-left text-sm font-bangla transition-colors ${
                    selectedStaff === staff.id
                      ? "bg-blue-50 dark:bg-electric-blue/20 text-electric-blue border border-electric-blue"
                      : "bg-gray-50 dark:bg-[#0F172A] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700"
                  }`}
                >
                  {staff.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAssignModal(null)}
              disabled={!selectedStaff}
              className="w-full bg-electric-blue text-white py-3 rounded-xl text-sm font-bangla disabled:opacity-50"
            >
              নিশ্চিত করুন
            </button>
          </div>
        </div>
      )}

      <BottomNav role="councilor" />
    </MobileFrame>
  );
}

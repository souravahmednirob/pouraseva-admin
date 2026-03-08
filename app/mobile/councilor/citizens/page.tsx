"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { Search, ArrowLeft, Send, FileText, CreditCard, AlertTriangle } from "lucide-react";

type Citizen = {
  id: number;
  initials: string;
  name: string;
  nid: string;
  holdings: number;
  taxStatus: "পরিশোধিত" | "বকেয়া" | "আংশিক";
  phone: string;
  address: string;
  ward: string;
  applications: { title: string; date: string; status: string }[];
  payments: { title: string; amount: string; date: string }[];
  complaints: { title: string; date: string; status: string }[];
};

const taxColors: Record<string, string> = {
  পরিশোধিত: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
  বকেয়া: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
  আংশিক: "bg-amber-50 dark:bg-warning/20 text-amber-700 dark:text-warning",
};

const citizens: Citizen[] = [
  { id: 1, initials: "রব", name: "রহিমা বেগম", nid: "199X-XXXX-XX34", holdings: 2, taxStatus: "পরিশোধিত", phone: "০১৭১১-XXXXXX", address: "৫/এ, মহল্লা রোড", ward: "ওয়ার্ড ৫", applications: [{ title: "জন্ম নিবন্ধন", date: "২০২৬-০২-১৫", status: "অনুমোদিত" }, { title: "ওয়ারিশ সনদ", date: "২০২৬-০১-১০", status: "প্রক্রিয়াধীন" }], payments: [{ title: "হোল্ডিং ট্যাক্স", amount: "৫,০০০৳", date: "২০২৬-০১-০৫" }, { title: "পানি বিল", amount: "৫০০৳", date: "২০২৬-০২-০১" }], complaints: [{ title: "রাস্তা ভাঙা", date: "২০২৬-০২-২০", status: "সমাধান হয়েছে" }] },
  { id: 2, initials: "কম", name: "করিম মিয়া", nid: "198X-XXXX-XX56", holdings: 1, taxStatus: "বকেয়া", phone: "০১৮১২-XXXXXX", address: "১২, বাজার রোড", ward: "ওয়ার্ড ৫", applications: [{ title: "ট্রেড লাইসেন্স", date: "২০২৬-০২-১০", status: "প্রক্রিয়াধীন" }], payments: [{ title: "হোল্ডিং ট্যাক্স", amount: "৩,০০০৳", date: "২০২৫-১২-১০" }], complaints: [{ title: "ড্রেনেজ সমস্যা", date: "২০২৬-০১-১৫", status: "অপেক্ষমাণ" }, { title: "আলো নেই", date: "২০২৫-১১-২০", status: "সমাধান হয়েছে" }] },
  { id: 3, initials: "সআ", name: "সালমা আক্তার", nid: "200X-XXXX-XX78", holdings: 3, taxStatus: "পরিশোধিত", phone: "০১৯১৩-XXXXXX", address: "৮, স্কুল রোড", ward: "ওয়ার্ড ৫", applications: [{ title: "নাগরিকত্ব সনদ", date: "২০২৬-০৩-০১", status: "অনুমোদিত" }, { title: "জন্ম নিবন্ধন", date: "২০২৫-০৯-১৫", status: "অনুমোদিত" }, { title: "চারিত্রিক সনদ", date: "২০২৫-০৬-২০", status: "অনুমোদিত" }], payments: [{ title: "হোল্ডিং ট্যাক্স", amount: "৮,০০০৳", date: "২০২৬-০১-২০" }, { title: "পরিচ্ছন্নতা ফি", amount: "৩০০৳", date: "২০২৬-০২-১৫" }, { title: "পানি বিল", amount: "৬০০৳", date: "২০২৬-০২-০১" }], complaints: [] },
  { id: 4, initials: "জই", name: "জামাল উদ্দিন", nid: "197X-XXXX-XX90", holdings: 1, taxStatus: "আংশিক", phone: "০১৬১৪-XXXXXX", address: "১৫, মসজিদ রোড", ward: "ওয়ার্ড ৫", applications: [{ title: "ট্রেড লাইসেন্স", date: "২০২৬-০১-২৫", status: "প্রক্রিয়াধীন" }], payments: [{ title: "হোল্ডিং ট্যাক্স (আংশিক)", amount: "২,০০০৳", date: "২০২৬-০১-১৫" }], complaints: [{ title: "ময়লা সমস্যা", date: "২০২৬-০২-২৮", status: "অপেক্ষমাণ" }] },
  { id: 5, initials: "নজ", name: "নাসরিন জাহান", nid: "199X-XXXX-XX12", holdings: 2, taxStatus: "পরিশোধিত", phone: "০১৫১৫-XXXXXX", address: "২০, কলেজ রোড", ward: "ওয়ার্ড ৫", applications: [{ title: "উত্তরাধিকার সনদ", date: "২০২৬-০২-০৫", status: "অনুমোদিত" }], payments: [{ title: "হোল্ডিং ট্যাক্স", amount: "৬,০০০৳", date: "২০২৬-০১-১০" }, { title: "পানি বিল", amount: "৪৫০৳", date: "২০২৬-০২-১০" }], complaints: [] },
  { id: 6, initials: "আহ", name: "আব্দুল হক", nid: "198X-XXXX-XX45", holdings: 4, taxStatus: "বকেয়া", phone: "০১৩১৬-XXXXXX", address: "৩, পুকুর পাড়", ward: "ওয়ার্ড ৫", applications: [{ title: "জমির নকশা", date: "২০২৫-১২-২০", status: "অনুমোদিত" }, { title: "ট্রেড লাইসেন্স নবায়ন", date: "২০২৬-০২-২৮", status: "প্রক্রিয়াধীন" }], payments: [], complaints: [{ title: "পানি সরবরাহ বন্ধ", date: "২০২৬-০৩-০১", status: "অপেক্ষমাণ" }] },
];

export default function CouncilorCitizensPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [note, setNote] = useState("");

  const filtered = citizens.filter(
    (c) => c.name.includes(searchText) || c.nid.includes(searchText)
  );

  if (selectedCitizen) {
    return (
      <MobileFrame>
        <div className="px-4 pt-4 pb-28 space-y-4 font-bangla">
          {/* Back */}
          <button
            onClick={() => setSelectedCitizen(null)}
            className="flex items-center gap-2 text-electric-blue text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bangla">ফিরে যান</span>
          </button>

          {/* Profile */}
          <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-4 space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-electric-blue/20 flex items-center justify-center text-electric-blue font-bold text-lg">
                {selectedCitizen.initials}
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold font-bangla">{selectedCitizen.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${taxColors[selectedCitizen.taxStatus]}`}>
                  {selectedCitizen.taxStatus}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-500 dark:text-gray-400 font-bangla">NID: <span className="text-gray-900 dark:text-white">{selectedCitizen.nid}</span></p>
              <p className="text-gray-500 dark:text-gray-400 font-bangla">ফোন: <span className="text-gray-900 dark:text-white">{selectedCitizen.phone}</span></p>
              <p className="text-gray-500 dark:text-gray-400 font-bangla">ঠিকানা: <span className="text-gray-900 dark:text-white">{selectedCitizen.address}</span></p>
              <p className="text-gray-500 dark:text-gray-400 font-bangla">ওয়ার্ড: <span className="text-gray-900 dark:text-white">{selectedCitizen.ward}</span></p>
            </div>
          </div>

          {/* Applications History */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-electric-blue" /> আবেদনের ইতিহাস
            </h3>
            <div className="space-y-2">
              {selectedCitizen.applications.map((a, i) => (
                <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-bangla">{a.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{a.date}</p>
                  </div>
                  <span className="text-xs text-sky-blue font-bangla">{a.status}</span>
                </div>
              ))}
              {selectedCitizen.applications.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">কোনো আবেদন নেই</p>
              )}
            </div>
          </div>

          {/* Payments */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-success" /> পেমেন্ট
            </h3>
            <div className="space-y-2">
              {selectedCitizen.payments.map((p, i) => (
                <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-bangla">{p.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{p.date}</p>
                  </div>
                  <span className="text-success text-sm font-bold">{p.amount}</span>
                </div>
              ))}
              {selectedCitizen.payments.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">কোনো পেমেন্ট নেই</p>
              )}
            </div>
          </div>

          {/* Complaints */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" /> অভিযোগের ইতিহাস
            </h3>
            <div className="space-y-2">
              {selectedCitizen.complaints.map((c, i) => (
                <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-bangla">{c.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{c.date}</p>
                  </div>
                  <span className="text-xs text-warning font-bangla">{c.status}</span>
                </div>
              ))}
              {selectedCitizen.complaints.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">কোনো অভিযোগ নেই</p>
              )}
            </div>
          </div>

          {/* Add Note */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold font-bangla mb-2">নোট যোগ করুন</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 text-sm font-bangla resize-none h-20 focus:outline-none focus:border-electric-blue"
              placeholder="এখানে নোট লিখুন..."
            />
            <button className="mt-2 bg-electric-blue text-white text-sm px-4 py-2 rounded-lg font-bangla w-full">
              সংরক্ষণ করুন
            </button>
          </div>

          {/* Tax Reminder */}
          <button className="w-full bg-amber-50 dark:bg-warning/20 text-amber-700 dark:text-warning text-sm py-3 rounded-xl flex items-center justify-center gap-2 font-bangla">
            <Send className="w-4 h-4" />
            ট্যাক্স অনুস্মারক পাঠান
          </button>
        </div>

        <BottomNav role="councilor" />
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="px-4 pt-4 pb-28 space-y-4 font-bangla">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="নাগরিক খুঁজুন (নাম বা NID)"
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-gray-100 text-sm font-bangla focus:outline-none focus:border-electric-blue"
          />
        </div>

        {/* Count Badge */}
        <div className="flex justify-end">
          <span className="text-xs bg-blue-50 dark:bg-electric-blue/20 text-blue-600 dark:text-electric-blue px-3 py-1 rounded-full font-bangla">
            মোট: ২,৪৫০
          </span>
        </div>

        {/* Citizen List */}
        <div className="space-y-2">
          {filtered.map((citizen) => (
            <button
              key={citizen.id}
              onClick={() => setSelectedCitizen(citizen)}
              className="w-full bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-3 flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-electric-blue/20 flex items-center justify-center text-electric-blue font-bold text-sm flex-shrink-0">
                {citizen.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white text-sm font-bangla">{citizen.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{citizen.nid}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bangla">হোল্ডিং: {citizen.holdings}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${taxColors[citizen.taxStatus]}`}>
                {citizen.taxStatus}
              </span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav role="councilor" />
    </MobileFrame>
  );
}

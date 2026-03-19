"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import { Search, ArrowLeft, Send, FileText, CreditCard, AlertTriangle, User, Clock } from "lucide-react";

type Citizen = {
  id: number;
  initials: string;
  name: string;
  nameEn: string;
  nid: string;
  holdings: number;
  taxStatus: "পরিশোধিত" | "বকেয়া" | "আংশিক";
  taxStatusEn: "Paid" | "Due" | "Partial";
  phone: string;
  address: string;
  addressEn: string;
  applications: { title: string; titleEn: string; date: string; status: string; statusEn: string }[];
  payments: { title: string; titleEn: string; amount: string; date: string }[];
  complaints: { title: string; titleEn: string; date: string; status: string; statusEn: string }[];
};

const taxColors: Record<string, string> = {
  পরিশোধিত: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  বকেয়া: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  আংশিক: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
};

const citizens: Citizen[] = [
  { id: 1, initials: "রব", name: "রহিমা বেগম", nameEn: "Rahima Begum", nid: "199X-XXXX-XX34", holdings: 2, taxStatus: "পরিশোধিত", taxStatusEn: "Paid", phone: "০১৭১১-XXXXXX", address: "৫/এ, মহল্লা রোড", addressEn: "5/A, Mohalla Road", applications: [{ title: "জন্ম নিবন্ধন", titleEn: "Birth Registration", date: "২০২৬-০২-১৫", status: "অনুমোদিত", statusEn: "Approved" }, { title: "ওয়ারিশ সনদ", titleEn: "Inheritance Cert", date: "২০২৬-০১-১০", status: "প্রক্রিয়াধীন", statusEn: "Processing" }], payments: [{ title: "হোল্ডিং ট্যাক্স", titleEn: "Holding Tax", amount: "৫,০০০৳", date: "২০২৬-০১-০৫" }, { title: "পানি বিল", titleEn: "Water Bill", amount: "৫০০৳", date: "২০২৬-০২-০১" }], complaints: [{ title: "রাস্তা ভাঙা", titleEn: "Broken Road", date: "২০২৬-০২-২০", status: "সমাধান হয়েছে", statusEn: "Resolved" }] },
  { id: 2, initials: "কম", name: "করিম মিয়া", nameEn: "Karim Mia", nid: "198X-XXXX-XX56", holdings: 1, taxStatus: "বকেয়া", taxStatusEn: "Due", phone: "০১৮১২-XXXXXX", address: "১২, বাজার রোড", addressEn: "12, Bazar Road", applications: [{ title: "ট্রেড লাইসেন্স", titleEn: "Trade License", date: "২০২৬-০২-১০", status: "প্রক্রিয়াধীন", statusEn: "Processing" }], payments: [{ title: "হোল্ডিং ট্যাক্স", titleEn: "Holding Tax", amount: "৩,০০০৳", date: "২০২৫-১২-১০" }], complaints: [{ title: "ড্রেনেজ সমস্যা", titleEn: "Drainage Issue", date: "২০২৬-০১-১৫", status: "অপেক্ষমাণ", statusEn: "Pending" }, { title: "আলো নেই", titleEn: "No Light", date: "২০২৫-১১-২০", status: "সমাধান হয়েছে", statusEn: "Resolved" }] },
  { id: 3, initials: "সআ", name: "সালমা আক্তার", nameEn: "Salma Akter", nid: "200X-XXXX-XX78", holdings: 3, taxStatus: "পরিশোধিত", taxStatusEn: "Paid", phone: "০১৯১৩-XXXXXX", address: "৮, স্কুল রোড", addressEn: "8, School Road", applications: [{ title: "নাগরিকত্ব সনদ", titleEn: "Citizen Cert", date: "২০২৬-০৩-০১", status: "অনুমোদিত", statusEn: "Approved" }, { title: "জন্ম নিবন্ধন", titleEn: "Birth Reg", date: "২০২৫-০৯-১৫", status: "অনুমোদিত", statusEn: "Approved" }], payments: [{ title: "হোল্ডিং ট্যাক্স", titleEn: "Holding Tax", amount: "৮,০০০৳", date: "২০২৬-০১-২০" }, { title: "পানি বিল", titleEn: "Water Bill", amount: "৬০০৳", date: "২০২৬-০২-০১" }], complaints: [] },
  { id: 4, initials: "জই", name: "জামাল উদ্দিন", nameEn: "Jamal Uddin", nid: "197X-XXXX-XX90", holdings: 1, taxStatus: "আংশিক", taxStatusEn: "Partial", phone: "০১৬১৪-XXXXXX", address: "১৫, মসজিদ রোড", addressEn: "15, Masjid Road", applications: [{ title: "ট্রেড লাইসেন্স", titleEn: "Trade License", date: "২০২৬-০১-২৫", status: "প্রক্রিয়াধীন", statusEn: "Processing" }], payments: [{ title: "হোল্ডিং ট্যাক্স (আংশিক)", titleEn: "Holding Tax (Partial)", amount: "২,০০০৳", date: "২০২৬-০১-১৫" }], complaints: [{ title: "ময়লা সমস্যা", titleEn: "Garbage Issue", date: "২০২৬-০২-২৮", status: "অপেক্ষমাণ", statusEn: "Pending" }] },
  { id: 5, initials: "নজ", name: "নাসরিন জাহান", nameEn: "Nasrin Jahan", nid: "199X-XXXX-XX12", holdings: 2, taxStatus: "পরিশোধিত", taxStatusEn: "Paid", phone: "০১৫১৫-XXXXXX", address: "২০, কলেজ রোড", addressEn: "20, College Road", applications: [{ title: "উত্তরাধিকার সনদ", titleEn: "Inheritance Cert", date: "২০২৬-০২-০৫", status: "অনুমোদিত", statusEn: "Approved" }], payments: [{ title: "হোল্ডিং ট্যাক্স", titleEn: "Holding Tax", amount: "৬,০০০৳", date: "২০২৬-০১-১০" }, { title: "পানি বিল", titleEn: "Water Bill", amount: "৪৫০৳", date: "২০২৬-০২-১০" }], complaints: [] },
  { id: 6, initials: "আহ", name: "আব্দুল হক", nameEn: "Abdul Haq", nid: "198X-XXXX-XX45", holdings: 4, taxStatus: "বকেয়া", taxStatusEn: "Due", phone: "০১৩১৬-XXXXXX", address: "৩, পুকুর পাড়", addressEn: "3, Pukur Par", applications: [{ title: "ট্রেড লাইসেন্স নবায়ন", titleEn: "Trade License Renewal", date: "২০২৬-০২-২৮", status: "প্রক্রিয়াধীন", statusEn: "Processing" }], payments: [], complaints: [{ title: "পানি সরবরাহ বন্ধ", titleEn: "No Water Supply", date: "২০২৬-০৩-০১", status: "অপেক্ষমাণ", statusEn: "Pending" }] },
];

export default function CouncilorCitizensPage() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");
  const initialCitizen = initialId ? citizens.find(c => c.id === Number(initialId)) || null : null;
  const [searchText, setSearchText] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(initialCitizen);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  const filtered = citizens.filter(
    (c) => c.name.includes(searchText) || c.nameEn.toLowerCase().includes(searchText.toLowerCase()) || c.nid.includes(searchText)
  );

  const handleSaveNote = () => {
    if (!note.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 2000);
  };

  // ─── Detail View ───
  if (selectedCitizen) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => { setSelectedCitizen(null); setNote(""); }} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-white font-bangla">{t(selectedCitizen.name, selectedCitizen.nameEn)}</h2>
                  <p className="text-blue-100 text-xs font-bangla">{t("নাগরিক প্রোফাইল", "Citizen Profile")}</p>
                </div>
                <span className={`text-[10px] font-bangla font-bold px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/20`}>
                  {t(selectedCitizen.taxStatus, selectedCitizen.taxStatusEn)}
                </span>
              </div>
              {/* Profile Card */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-sm space-y-0.5">
                    <p className="text-white/80 text-xs font-bangla">NID: <span className="text-white font-medium">{selectedCitizen.nid}</span></p>
                    <p className="text-white/80 text-xs font-bangla">{t("ফোন", "Phone")}: <span className="text-white font-medium">{selectedCitizen.phone}</span></p>
                    <p className="text-white/80 text-xs font-bangla">{t("ঠিকানা", "Address")}: <span className="text-white font-medium">{t(selectedCitizen.address, selectedCitizen.addressEn)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-2 pt-4 space-y-4">
            {/* Applications */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" /> {t("আবেদনের ইতিহাস", "Application History")}
              </h3>
              <div className="space-y-2">
                {selectedCitizen.applications.map((a, i) => (
                  <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-3.5 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{t(a.title, a.titleEn)}</p>
                      <p className="text-[11px] text-gray-400">{a.date}</p>
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bangla font-bold">{t(a.status, a.statusEn)}</span>
                  </div>
                ))}
                {selectedCitizen.applications.length === 0 && (
                  <p className="text-gray-400 text-xs font-bangla py-3 text-center">{t("কোনো আবেদন নেই", "No applications")}</p>
                )}
              </div>
            </div>

            {/* Payments */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2.5 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" /> {t("পেমেন্ট", "Payments")}
              </h3>
              <div className="space-y-2">
                {selectedCitizen.payments.map((p, i) => (
                  <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-3.5 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{t(p.title, p.titleEn)}</p>
                      <p className="text-[11px] text-gray-400">{p.date}</p>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">{p.amount}</span>
                  </div>
                ))}
                {selectedCitizen.payments.length === 0 && (
                  <p className="text-gray-400 text-xs font-bangla py-3 text-center">{t("কোনো পেমেন্ট নেই", "No payments")}</p>
                )}
              </div>
            </div>

            {/* Complaints */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2.5 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> {t("অভিযোগ", "Complaints")}
              </h3>
              <div className="space-y-2">
                {selectedCitizen.complaints.map((c, i) => (
                  <div key={i} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-3.5 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-bangla font-medium">{t(c.title, c.titleEn)}</p>
                      <p className="text-[11px] text-gray-400">{c.date}</p>
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-bangla font-bold">{t(c.status, c.statusEn)}</span>
                  </div>
                ))}
                {selectedCitizen.complaints.length === 0 && (
                  <p className="text-gray-400 text-xs font-bangla py-3 text-center">{t("কোনো অভিযোগ নেই", "No complaints")}</p>
                )}
              </div>
            </div>

            {/* Add Note */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-bangla mb-2">{t("নোট যোগ করুন", "Add Note")}</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 text-sm font-bangla resize-none h-20 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                placeholder={t("এখানে নোট লিখুন...", "Write a note here...")}
              />
              <button
                onClick={handleSaveNote}
                className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm font-bangla font-bold shadow-lg shadow-indigo-500/20"
              >
                {noteSaved ? t("✓ সংরক্ষিত!", "✓ Saved!") : t("সংরক্ষণ করুন", "Save Note")}
              </button>
            </div>

            {/* Tax Reminder */}
            {(selectedCitizen.taxStatus === "বকেয়া" || selectedCitizen.taxStatus === "আংশিক") && (
              <button
                onClick={handleSendReminder}
                className="w-full py-3.5 rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-400 text-sm font-bangla font-bold flex items-center justify-center gap-2 mb-4"
              >
                <Send className="w-4 h-4" />
                {reminderSent ? t("✓ অনুস্মারক পাঠানো হয়েছে!", "✓ Reminder Sent!") : t("ট্যাক্স অনুস্মারক পাঠান", "Send Tax Reminder")}
              </button>
            )}
          </div>

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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-500" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => window.history.back()} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">{t("নাগরিক তালিকা", "Citizen Directory")}</h1>
                <p className="text-blue-100 text-xs font-bangla">{t("ওয়ার্ড ৫", "Ward 5")} · {citizens.length} {t("জন", "citizens")}</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t("নাম বা NID দিয়ে খুঁজুন", "Search by name or NID")}
                className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm font-bangla placeholder:text-white/40 focus:outline-none focus:bg-white/20"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-2.5">
          {filtered.map((citizen) => (
            <button
              key={citizen.id}
              onClick={() => setSelectedCitizen(citizen)}
              className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-4 flex items-center gap-3.5 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-900/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0">
                {citizen.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{t(citizen.name, citizen.nameEn)}</p>
                <p className="text-[11px] text-gray-400 font-mono">{citizen.nid}</p>
                <p className="text-[11px] text-gray-400 font-bangla">{t("হোল্ডিং", "Holdings")}: {citizen.holdings}</p>
              </div>
              <span className={`text-[10px] font-bangla font-bold px-2 py-0.5 rounded-full shrink-0 ${taxColors[citizen.taxStatus]}`}>
                {t(citizen.taxStatus, citizen.taxStatusEn)}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4"><User className="w-7 h-7 text-gray-400" /></div>
              <p className="text-gray-400 font-bangla text-sm">{t("কোনো নাগরিক পাওয়া যায়নি", "No citizens found")}</p>
            </div>
          )}
        </div>

        <BottomNav role="councilor" />
      </div>
    </MobileFrame>
  );
}

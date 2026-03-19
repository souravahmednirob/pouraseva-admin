"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import BottomNav from "@/components/bottom-nav";
import { useLang } from "@/components/language-context";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  FileText,
  FileX2,
  CreditCard,
  Droplets,
  Store,
  MessageSquareWarning,
  Users,
  Landmark,
  ScrollText,
  ShieldCheck,
  ArrowLeft,
  Clock,
  Phone,
  Flame,
  Heart,
  Siren,
  Hospital,
  Stethoscope,
  Ambulance,
  MapPin,
  X,
  Star,
  UserRound,
  Activity,
  Baby,
  Bone,
  Eye,
} from "lucide-react";

/* ─── Emergency Numbers ─── */
const emergencyNumbers = [
  { label: "জাতীয় জরুরি সেবা", number: "৯৯৯", href: "tel:999", icon: Siren, gradient: "from-red-600 to-red-500", description: "পুলিশ, ফায়ার সার্ভিস, অ্যাম্বুলেন্স" },
  { label: "ফায়ার সার্ভিস", number: "১৬১৬৩", href: "tel:16163", icon: Flame, gradient: "from-orange-500 to-amber-500", description: "অগ্নিকাণ্ড ও উদ্ধার তৎপরতা" },
  { label: "জাতীয় তথ্য সেবা", number: "৩৩৩", href: "tel:333", icon: Phone, gradient: "from-blue-500 to-sky-500", description: "সরকারি তথ্য ও সেবা" },
  { label: "নারী ও শিশু নির্যাতন", number: "১০৯", href: "tel:109", icon: Heart, gradient: "from-pink-500 to-rose-500", description: "নারী ও শিশু সহায়তা" },
  { label: "দুর্নীতি দমন কমিশন", number: "১০৬", href: "tel:106", icon: ShieldCheck, gradient: "from-indigo-500 to-blue-500", description: "দুর্নীতি সংক্রান্ত অভিযোগ" },
  { label: "স্বাস্থ্য বাতায়ন", number: "১৬২৬৩", href: "tel:16263", icon: Stethoscope, gradient: "from-emerald-500 to-green-500", description: "স্বাস্থ্য পরামর্শ ও তথ্য" },
];

/* ─── Hospitals ─── */
type Doctor = {
  name: string;
  specialty: string;
  available: string;
  icon: React.ComponentType<{ className?: string }>;
};

type HospitalType = {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  ambulance: string;
  gradient: string;
  services: string[];
  doctors: Doctor[];
};

const hospitals: HospitalType[] = [
  {
    id: 1,
    name: "কালিয়াকৈর উপজেলা স্বাস্থ্য কমপ্লেক্স",
    type: "সরকারি",
    address: "কালিয়াকৈর, গাজীপুর",
    phone: "০২-৯২৯১২৩৪",
    ambulance: "০১৭১১-০০০০০১",
    gradient: "from-emerald-500 to-green-500",
    services: ["জরুরি বিভাগ", "সাধারণ ওয়ার্ড", "অপারেশন থিয়েটার", "ল্যাব ও পরীক্ষা", "ইপিআই টিকাদান", "ডায়াগনস্টিক সেন্টার"],
    doctors: [
      { name: "ডা. ফারুক আহমেদ", specialty: "মেডিসিন বিশেষজ্ঞ", available: "সকাল ৯-দুপুর ২", icon: Stethoscope },
      { name: "ডা. নাসরিন আক্তার", specialty: "গাইনি ও প্রসূতি", available: "সকাল ১০-বিকাল ৩", icon: Baby },
      { name: "ডা. মাহবুব হোসেন", specialty: "শিশু বিশেষজ্ঞ", available: "দুপুর ২-সন্ধ্যা ৬", icon: Baby },
      { name: "ডা. রশিদ উদ্দিন", specialty: "সার্জারি", available: "সকাল ৯-দুপুর ১", icon: Activity },
    ],
  },
  {
    id: 2,
    name: "আল-মদিনা হাসপাতাল",
    type: "বেসরকারি",
    address: "স্টেশন রোড, কালিয়াকৈর",
    phone: "০২-৯২৯১৫৬৭",
    ambulance: "০১৮১১-০০০০০২",
    gradient: "from-blue-500 to-indigo-500",
    services: ["২৪ ঘণ্টা জরুরি", "আইসিইউ", "অপারেশন থিয়েটার", "ডায়াগনস্টিক", "ফার্মেসি", "ক্যাবিন সুবিধা"],
    doctors: [
      { name: "ডা. আব্দুল করিম", specialty: "হৃদরোগ বিশেষজ্ঞ", available: "বিকাল ৪-রাত ৯", icon: Heart },
      { name: "ডা. সেলিনা বেগম", specialty: "চক্ষু বিশেষজ্ঞ", available: "সকাল ১০-দুপুর ২", icon: Eye },
      { name: "ডা. জাকির হোসেন", specialty: "অর্থোপেডিক", available: "সকাল ৯-দুপুর ১", icon: Bone },
    ],
  },
  {
    id: 3,
    name: "পৌরসভা স্বাস্থ্যকেন্দ্র",
    type: "পৌরসভা",
    address: "পৌরসভা কার্যালয় চত্বর",
    phone: "০২-৯২৯১৮৯০",
    ambulance: "০১৯১১-০০০০০৩",
    gradient: "from-teal-500 to-cyan-500",
    services: ["প্রাথমিক চিকিৎসা", "টিকাদান", "মাতৃ স্বাস্থ্য", "পরিবার পরিকল্পনা", "পুষ্টি পরামর্শ"],
    doctors: [
      { name: "ডা. শাহিদা ইসলাম", specialty: "সাধারণ চিকিৎসক", available: "সকাল ৯-বিকাল ৪", icon: Stethoscope },
      { name: "ডা. আমিনুল হক", specialty: "সাধারণ চিকিৎসক", available: "সকাল ৮-দুপুর ২", icon: Stethoscope },
    ],
  },
];

/* ─── Regular Services ─── */
type Service = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  time: string;
  category: string;
  href: string;
  gradient: string;
  bg: string;
  fee?: string;
};

const categories = ["সব", "সনদ", "পেমেন্ট", "লাইসেন্স", "অন্যান্য"];

const allServices: Service[] = [
  { icon: FileText, name: "জন্ম সনদ", time: "৩-৫ দিন", category: "সনদ", href: "/mobile/citizen/birth-certificate", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", fee: "৳১০০" },
  { icon: FileX2, name: "মৃত্যু সনদ", time: "৩-৫ দিন", category: "সনদ", href: "/mobile/citizen/death-certificate", gradient: "from-slate-500 to-slate-600", bg: "bg-slate-50 dark:bg-slate-950/30", fee: "৳১০০" },
  { icon: Users, name: "নাগরিক সনদ", time: "৫-৭ দিন", category: "সনদ", href: "/mobile/citizen/citizen-certificate", gradient: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/30", fee: "৳৫০" },
  { icon: ShieldCheck, name: "চারিত্রিক সনদ", time: "৫-৭ দিন", category: "সনদ", href: "/mobile/citizen/character-certificate", gradient: "from-teal-500 to-teal-600", bg: "bg-teal-50 dark:bg-teal-950/30", fee: "৳৫০" },
  { icon: ScrollText, name: "ওয়ারিশ সনদ", time: "৭-১০ দিন", category: "সনদ", href: "/mobile/citizen/warish-certificate", gradient: "from-purple-500 to-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", fee: "৳২০০" },
  { icon: CreditCard, name: "পৌর কর", time: "তাৎক্ষণিক", category: "পেমেন্ট", href: "/mobile/citizen/tax-payment", gradient: "from-emerald-500 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: Droplets, name: "পানির বিল", time: "তাৎক্ষণিক", category: "পেমেন্ট", href: "/mobile/citizen/water-bill", gradient: "from-cyan-500 to-blue-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
  { icon: Store, name: "ট্রেড লাইসেন্স", time: "৭-১০ দিন", category: "লাইসেন্স", href: "/mobile/citizen/trade-license", gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-950/30", fee: "৳৩,০০০" },
  { icon: Landmark, name: "ভবন অনুমতি", time: "১৫-৩০ দিন", category: "লাইসেন্স", href: "/mobile/citizen/services", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/30", fee: "৳৫,০০০" },
  { icon: MessageSquareWarning, name: "অভিযোগ", time: "২৪ ঘণ্টা", category: "অন্যান্য", href: "/mobile/citizen/complaint", gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
];

export default function ServicesPage() {
  const { t } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");
  const [selectedHospital, setSelectedHospital] = useState<HospitalType | null>(null);
  const [showEmergencyNumbers, setShowEmergencyNumbers] = useState(false);
  const [showHospitalList, setShowHospitalList] = useState(false);

  const filteredServices = allServices.filter((svc) => {
    const matchCategory = activeCategory === "সব" || svc.category === activeCategory;
    const matchSearch = !searchQuery || svc.name.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  // ─── Emergency Numbers View ───
  if (showEmergencyNumbers) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setShowEmergencyNumbers(false)} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h1 className="text-lg font-bold text-white font-bangla">{t("জরুরি নম্বরসমূহ", "Emergency Numbers")}</h1>
                  <p className="text-red-100 text-xs font-bangla">{t("যেকোনো জরুরি প্রয়োজনে কল করুন", "Call for any emergency")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-1 space-y-3">
            {emergencyNumbers.map((em) => {
              const EmIcon = em.icon;
              return (
                <a
                  key={em.number}
                  href={em.href}
                  className="flex items-center gap-4 bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 active:scale-[0.97] transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${em.gradient} flex items-center justify-center shadow-sm shrink-0`}>
                    <EmIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla">{em.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla mt-0.5">{em.description}</p>
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <p className="text-xl font-bold text-red-600 dark:text-red-400 font-mono">{em.number}</p>
                    <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                      <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bangla font-bold">{t("কল", "Call")}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <BottomNav role="citizen" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Hospital List View ───
  if (showHospitalList && !selectedHospital) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setShowHospitalList(false)} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                  <h1 className="text-lg font-bold text-white font-bangla">{t("নিকটস্থ হাসপাতাল", "Nearby Hospitals")}</h1>
                  <p className="text-green-100 text-xs font-bangla">{hospitals.length}{t("টি হাসপাতাল", " hospitals")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-1 space-y-3">
            {hospitals.map((hospital) => (
              <button
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital)}
                className="w-full text-left bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hospital.gradient} flex items-center justify-center shadow-sm shrink-0`}>
                    <Hospital className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-gray-900 dark:text-white font-bangla truncate">{hospital.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-bangla">{hospital.type}</span>
                      <span className="text-[11px] text-gray-400 font-bangla flex items-center gap-1"><MapPin className="w-3 h-3" />{hospital.address}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                </div>
                <div className="flex items-center gap-3 mt-2 ml-[60px]">
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" />{hospital.doctors.length} {t("জন ডাক্তার", "doctors")}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla flex items-center gap-1">
                    <Activity className="w-3 h-3" />{hospital.services.length}{t("টি সেবা", " services")}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <BottomNav role="citizen" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Hospital Detail View ───
  if (selectedHospital) {
    return (
      <MobileFrame>
        <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedHospital.gradient}`} />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />

            <div className="relative px-5 pt-4 pb-6">
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => { setSelectedHospital(null); setShowHospitalList(true); }} className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-base font-bold text-white font-bangla flex-1">{t("হাসপাতালের তথ্য", "Hospital Details")}</h2>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[15px] font-bangla leading-snug">{selectedHospital.name}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bangla font-bold">{selectedHospital.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bangla">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedHospital.address}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-1 space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${selectedHospital.phone.replace(/-/g, "")}`} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-bold text-gray-900 dark:text-white font-bangla">{t("কল করুন", "Call")}</p>
                <p className="text-[11px] text-gray-400 font-mono">{selectedHospital.phone}</p>
              </a>
              <a href={`tel:${selectedHospital.ambulance.replace(/-/g, "")}`} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-2 active:scale-95 transition-all">
                <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <Ambulance className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-xs font-bold text-gray-900 dark:text-white font-bangla">{t("অ্যাম্বুলেন্স", "Ambulance")}</p>
                <p className="text-[11px] text-gray-400 font-mono">{selectedHospital.ambulance}</p>
              </a>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-3 uppercase tracking-wider">{t("সেবাসমূহ", "Services")}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedHospital.services.map((svc) => (
                  <span key={svc} className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/15 text-blue-600 dark:text-blue-400 text-xs font-bangla font-medium border border-blue-100 dark:border-blue-800/30">
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Doctors */}
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 font-bangla mb-4 uppercase tracking-wider">{t("ডাক্তারগণ", "Doctors")}</h3>
              <div className="space-y-3">
                {selectedHospital.doctors.map((doc, i) => {
                  const DocIcon = doc.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3.5 p-3 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700/50 ${i < selectedHospital.doctors.length - 1 ? "" : ""}`}>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
                        <DocIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white font-bangla truncate">{doc.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bangla">{doc.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bangla">{doc.available}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <BottomNav role="citizen" />
        </div>
      </MobileFrame>
    );
  }

  // ─── Main Services View ───
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* ─── Header ─── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-sky-blue to-blue-400 dark:from-electric-blue dark:via-blue-800 dark:to-indigo-900" />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />

          <div className="relative px-5 pt-4 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/mobile/citizen/home" className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white font-bangla">{t("সেবাসমূহ", "Services")}</h1>
                <p className="text-white/70 text-xs font-bangla">{allServices.length}{t("টি সেবা উপলব্ধ", " services available")}</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("সেবা খুঁজুন...", "Search services...")}
                className="w-full bg-white dark:bg-[#1E293B] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-bangla shadow-lg shadow-blue-900/10"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-3">
          {/* ─── Emergency Section (2 cards) ─── */}
          {!searchQuery && activeCategory === "সব" && (
            <div className="px-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">{t("জরুরি সেবা", "Emergency")}</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Emergency Numbers Card */}
                <button
                  onClick={() => setShowEmergencyNumbers(true)}
                  className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-md transition-all active:scale-[0.96]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-sm">
                      <Siren className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-900 dark:text-white font-bangla">{t("জরুরি নম্বরসমূহ", "Emergency Numbers")}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla mt-0.5">৯৯৯, ১০৯, ৩৩৩</p>
                  </div>
                </button>

                {/* Hospitals Card */}
                <button
                  onClick={() => setShowHospitalList(true)}
                  className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-md transition-all active:scale-[0.96]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-sm">
                      <Hospital className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-900 dark:text-white font-bangla">{t("হাসপাতাল", "Hospitals")}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bangla mt-0.5">{hospitals.length}{t("টি নিকটস্থ", " Nearby")}</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ─── Category Tabs ─── */}
          <div className="px-5 mb-4">
            <div className="flex gap-1.5 bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-bangla font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-electric-blue text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {cat === "সব" ? t("সব", "All") : cat === "সনদ" ? t("সনদ", "Certificates") : cat === "পেমেন্ট" ? t("পেমেন্ট", "Payments") : cat === "লাইসেন্স" ? t("লাইসেন্স", "Licenses") : t("অন্যান্য", "Others")}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Services Grid ─── */}
          <div className="px-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white font-bangla">
                {activeCategory === "সব" ? t("সকল সেবা", "All Services") : activeCategory === "সনদ" ? t("সনদ", "Certificates") : activeCategory === "পেমেন্ট" ? t("পেমেন্ট", "Payments") : activeCategory === "লাইসেন্স" ? t("লাইসেন্স", "Licenses") : t("অন্যান্য", "Others")}
              </h2>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 font-bangla">{filteredServices.length}{t("টি", " items")}</span>
            </div>

            {filteredServices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-400 font-bangla text-sm">{t("কোনো সেবা পাওয়া যায়নি", "No services found")}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {filteredServices.map((svc) => {
                const Icon = svc.icon;
                return (
                  <Link
                    key={svc.name}
                    href={svc.href}
                    className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 shadow-sm dark:shadow-none rounded-2xl p-3.5 flex flex-col items-center gap-2.5 hover:shadow-md transition-all active:scale-[0.96]"
                  >
                    <div className={`w-13 h-13 rounded-xl ${svc.bg} flex items-center justify-center`}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-gray-900 dark:text-white font-bangla leading-tight">{svc.name === "জন্ম সনদ" ? t("জন্ম সনদ", "Birth Certificate") : svc.name === "মৃত্যু সনদ" ? t("মৃত্যু সনদ", "Death Certificate") : svc.name === "নাগরিক সনদ" ? t("নাগরিক সনদ", "Citizen Certificate") : svc.name === "চারিত্রিক সনদ" ? t("চারিত্রিক সনদ", "Character Certificate") : svc.name === "ওয়ারিশ সনদ" ? t("ওয়ারিশ সনদ", "Inheritance Certificate") : svc.name === "পৌর কর" ? t("পৌর কর", "Municipal Tax") : svc.name === "পানির বিল" ? t("পানির বিল", "Water Bill") : svc.name === "ট্রেড লাইসেন্স" ? t("ট্রেড লাইসেন্স", "Trade License") : svc.name === "ভবন অনুমতি" ? t("ভবন অনুমতি", "Building Permit") : svc.name === "অভিযোগ" ? t("অভিযোগ", "Complaint") : svc.name}</p>
                      <div className="flex items-center gap-1 justify-center mt-1.5">
                        <Clock className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bangla">{svc.time}</span>
                      </div>
                      {svc.fee && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold font-bangla">{svc.fee}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav role="citizen" />
      </div>
    </MobileFrame>
  );
}

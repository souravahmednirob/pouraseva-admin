"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "@/components/home-button";
import {
  ArrowLeft,
  Users,
  CreditCard,
  AlertTriangle,
  Megaphone,
  ShieldCheck,
  BarChart3,
  Server,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileText,
  Droplets,
  Receipt,
  Phone,
  Bell,
  Globe,
  Smartphone,
  Lock,
  Database,
  Layers,
  Zap,
} from "lucide-react";

type Feature = { id: string; title: string; titleEn: string };

type Category = {
  id: string;
  title: string;
  titleEn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  count: number;
  description: string;
  descriptionEn: string;
  features: Feature[];
};

const categories: Category[] = [
  {
    id: "citizen",
    title: "নাগরিক সেবা",
    titleEn: "Citizen Services",
    icon: Users,
    color: "text-blue-600",
    gradient: "from-blue-500 to-sky-500",
    count: 19,
    description: "জন্ম-মৃত্যু নিবন্ধন, ট্রেড লাইসেন্স, সনদ, নাগরিক রেজিস্ট্রেশন",
    descriptionEn: "Birth/death registration, trade license, certificates, citizen registration",
    features: [
      { id: "F01", title: "জন্ম সনদের জন্য অনলাইন আবেদন", titleEn: "Online birth certificate application" },
      { id: "F02", title: "মৃত্যু সনদের জন্য অনলাইন আবেদন", titleEn: "Online death certificate application" },
      { id: "F03", title: "সনদ সংশোধন আবেদন", titleEn: "Certificate correction application" },
      { id: "F04", title: "সনদ ডাউনলোড (PDF)", titleEn: "Certificate download (PDF)" },
      { id: "F05", title: "QR Code দিয়ে সনদ যাচাই", titleEn: "Certificate verification via QR Code" },
      { id: "F06", title: "আবেদনের status real-time tracking", titleEn: "Real-time application status tracking" },
      { id: "F07", title: "নতুন ট্রেড লাইসেন্স আবেদন", titleEn: "New trade license application" },
      { id: "F08", title: "ট্রেড লাইসেন্স নবায়ন", titleEn: "Trade license renewal" },
      { id: "F09", title: "লাইসেন্স ডাউনলোড (PDF)", titleEn: "License download (PDF)" },
      { id: "F10", title: "লাইসেন্স বাতিল আবেদন", titleEn: "License cancellation application" },
      { id: "F11", title: "ওয়ারিশ সনদ আবেদন", titleEn: "Inheritance certificate application" },
      { id: "F12", title: "ওয়ারিশ সনদ ডাউনলোড", titleEn: "Inheritance certificate download" },
      { id: "F13", title: "নাগরিকত্ব সনদ আবেদন", titleEn: "Citizenship certificate application" },
      { id: "F14", title: "চারিত্রিক সনদ আবেদন", titleEn: "Character certificate application" },
      { id: "F15", title: "বিবাহ নিবন্ধন সহায়তা", titleEn: "Marriage registration support" },
      { id: "F16", title: "NID দিয়ে নাগরিক registration", titleEn: "Citizen registration via NID" },
      { id: "F17", title: "নাগরিকের personal dashboard", titleEn: "Citizen personal dashboard" },
      { id: "F18", title: "সকল আবেদনের history এক জায়গায়", titleEn: "All application history in one place" },
      { id: "F19", title: "Document vault (সব সনদ সংরক্ষণ)", titleEn: "Document vault (store all certificates)" },
    ],
  },
  {
    id: "revenue",
    title: "রাজস্ব ও পেমেন্ট",
    titleEn: "Revenue & Payment",
    icon: CreditCard,
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-green-500",
    count: 19,
    description: "হোল্ডিং ট্যাক্স, পানি বিল, পেমেন্ট গেটওয়ে, ফি ও জরিমানা",
    descriptionEn: "Holding tax, water bill, payment gateway, fees & penalties",
    features: [
      { id: "F20", title: "হোল্ডিং নম্বর দিয়ে ট্যাক্স দেখা", titleEn: "View tax by holding number" },
      { id: "F21", title: "বকেয়া ট্যাক্স হিসাব (বছরওয়ারি)", titleEn: "Outstanding tax calculation (yearly)" },
      { id: "F22", title: "অনলাইনে ট্যাক্স পেমেন্ট", titleEn: "Online tax payment" },
      { id: "F23", title: "ট্যাক্স পেমেন্ট রসিদ ডাউনলোড", titleEn: "Tax payment receipt download" },
      { id: "F24", title: "ট্যাক্স মওকুফ আবেদন", titleEn: "Tax waiver application" },
      { id: "F25", title: "পানির মিটার নম্বর দিয়ে বিল দেখা", titleEn: "View water bill by meter number" },
      { id: "F26", title: "মাসিক বিল পেমেন্ট", titleEn: "Monthly bill payment" },
      { id: "F27", title: "বকেয়া বিল পেমেন্ট", titleEn: "Outstanding bill payment" },
      { id: "F28", title: "পানির বিল রসিদ ডাউনলোড", titleEn: "Water bill receipt download" },
      { id: "F29", title: "নতুন পানি সংযোগ আবেদন", titleEn: "New water connection application" },
      { id: "F30", title: "পানি সংযোগ বিচ্ছিন্ন/পুনঃসংযোগ", titleEn: "Water disconnect/reconnect" },
      { id: "F31", title: "bKash পেমেন্ট", titleEn: "bKash payment" },
      { id: "F32", title: "Nagad পেমেন্ট", titleEn: "Nagad payment" },
      { id: "F33", title: "Rocket পেমেন্ট", titleEn: "Rocket payment" },
      { id: "F34", title: "Credit/Debit Card পেমেন্ট", titleEn: "Credit/Debit Card payment" },
      { id: "F35", title: "পেমেন্ট history ও statement", titleEn: "Payment history & statement" },
      { id: "F36", title: "সেবার আবেদন ফি অনলাইন পেমেন্ট", titleEn: "Service fee online payment" },
      { id: "F37", title: "জরিমানা পেমেন্ট", titleEn: "Penalty payment" },
      { id: "F38", title: "পৌরসভার সম্পত্তি ভাড়া পেমেন্ট", titleEn: "Municipal property rent payment" },
    ],
  },
  {
    id: "complaint",
    title: "অভিযোগ ব্যবস্থাপনা",
    titleEn: "Complaint Management",
    icon: AlertTriangle,
    color: "text-amber-600",
    gradient: "from-amber-500 to-orange-500",
    count: 16,
    description: "অভিযোগ দাখিল, ট্র্যাকিং, ফিডব্যাক, জরুরি অভিযোগ",
    descriptionEn: "Complaint filing, tracking, feedback, emergency complaints",
    features: [
      { id: "F39", title: "অনলাইনে অভিযোগ submit", titleEn: "Online complaint submission" },
      { id: "F40", title: "অভিযোগের category নির্বাচন", titleEn: "Complaint category selection" },
      { id: "F41", title: "ছবি/ভিডিও আপলোড", titleEn: "Photo/video upload" },
      { id: "F42", title: "Location/GPS দিয়ে স্থান চিহ্নিত", titleEn: "Location marking via GPS" },
      { id: "F43", title: "Anonymous অভিযোগ দাখিল", titleEn: "Anonymous complaint filing" },
      { id: "F44", title: "Tracking number দিয়ে ট্র্যাক", titleEn: "Track by tracking number" },
      { id: "F45", title: "Real-time status update", titleEn: "Real-time status update" },
      { id: "F46", title: "SMS/Push notification প্রতিটি status-এ", titleEn: "SMS/Push notification on status change" },
      { id: "F47", title: "সমাধানের আনুমানিক সময়", titleEn: "Estimated resolution time" },
      { id: "F48", title: "সমাধানের পর rating দেওয়া", titleEn: "Rating after resolution" },
      { id: "F50", title: "সমাধানে মন্তব্য/feedback", titleEn: "Resolution comment/feedback" },
      { id: "F51", title: "Emergency fast-track অভিযোগ", titleEn: "Emergency fast-track complaint" },
      { id: "F52", title: "Emergency hotline call", titleEn: "Emergency hotline call" },
      { id: "F53", title: "Emergency alert তাৎক্ষণিক notification", titleEn: "Emergency alert instant notification" },
      { id: "F54", title: "সব অভিযোগের history", titleEn: "All complaint history" },
      { id: "F55", title: "Ward-wise অভিযোগের পরিসংখ্যান", titleEn: "Ward-wise complaint statistics" },
    ],
  },
  {
    id: "info",
    title: "তথ্য ও যোগাযোগ",
    titleEn: "Information & Communication",
    icon: Megaphone,
    color: "text-violet-600",
    gradient: "from-violet-500 to-purple-500",
    count: 19,
    description: "নোটিশ, প্রকল্প, পৌরসভা তথ্য, ইভেন্ট, যোগাযোগ",
    descriptionEn: "Notices, projects, municipal info, events, communication",
    features: [
      { id: "F56", title: "Official নোটিশ প্রকাশ", titleEn: "Official notice publication" },
      { id: "F57", title: "জরুরি ঘোষণা (Emergency Broadcast)", titleEn: "Emergency broadcast" },
      { id: "F58", title: "Ward-wise targeted নোটিশ", titleEn: "Ward-wise targeted notices" },
      { id: "F59", title: "SMS/Push notification-এ নোটিশ", titleEn: "Notices via SMS/Push notification" },
      { id: "F60", title: "নোটিশ আর্কাইভ", titleEn: "Notice archive" },
      { id: "F61", title: "চলমান উন্নয়ন প্রকল্পের তালিকা", titleEn: "Ongoing development project list" },
      { id: "F62", title: "প্রকল্পের অগ্রগতি ও বাজেট তথ্য", titleEn: "Project progress & budget info" },
      { id: "F63", title: "সম্পন্ন প্রকল্পের তালিকা", titleEn: "Completed project list" },
      { id: "F64", title: "প্রকল্পের ছবি/ভিডিও আপলোড", titleEn: "Project photo/video upload" },
      { id: "F65", title: "অর্গানোগ্রাম ও কর্মকর্তাদের তালিকা", titleEn: "Organogram & officer list" },
      { id: "F66", title: "অফিসের সময়সূচি ও যোগাযোগ", titleEn: "Office schedule & contact info" },
      { id: "F67", title: "Ward map ও councilor তথ্য", titleEn: "Ward map & councilor info" },
      { id: "F68", title: "বার্ষিক বাজেট প্রকাশ", titleEn: "Annual budget publication" },
      { id: "F69", title: "সেবার তালিকা ও প্রয়োজনীয় কাগজপত্র", titleEn: "Service list & required documents" },
      { id: "F70", title: "আসন্ন ইভেন্ট/মিটিং", titleEn: "Upcoming events/meetings" },
      { id: "F71", title: "জাতীয় দিবস ও স্থানীয় অনুষ্ঠান", titleEn: "National days & local events" },
      { id: "F72", title: "Live chat support", titleEn: "Live chat support" },
      { id: "F73", title: "Feedback/পরামর্শ দেওয়া", titleEn: "Feedback/suggestions" },
      { id: "F74", title: "FAQ সেকশন", titleEn: "FAQ section" },
    ],
  },
  {
    id: "admin",
    title: "Admin ও Staff Management",
    titleEn: "Admin & Staff Management",
    icon: ShieldCheck,
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-blue-600",
    count: 24,
    description: "ড্যাশবোর্ড, স্টাফ পরিচালনা, আবেদন প্রক্রিয়া, নিরাপত্তা",
    descriptionEn: "Dashboard, staff management, application processing, security",
    features: [
      { id: "F75", title: "Super Admin panel", titleEn: "Super Admin panel" },
      { id: "F76", title: "পৌরসভা-wise Admin panel", titleEn: "Municipality-wise Admin panel" },
      { id: "F77", title: "Ward-wise Admin panel", titleEn: "Ward-wise Admin panel" },
      { id: "F78", title: "Real-time dashboard", titleEn: "Real-time dashboard" },
      { id: "F79", title: "Daily/Weekly/Monthly summary", titleEn: "Daily/Weekly/Monthly summary" },
      { id: "F80", title: "Staff account তৈরি ও পরিচালনা", titleEn: "Staff account creation & management" },
      { id: "F81", title: "Role-based access control", titleEn: "Role-based access control" },
      { id: "F82", title: "Staff attendance ট্র্যাকিং", titleEn: "Staff attendance tracking" },
      { id: "F83", title: "Staff performance মনিটর", titleEn: "Staff performance monitoring" },
      { id: "F84", title: "Task Assignment", titleEn: "Task assignment" },
      { id: "F85", title: "সব আবেদন এক জায়গায় দেখা", titleEn: "View all applications in one place" },
      { id: "F86", title: "আবেদন approve/reject/pending", titleEn: "Application approve/reject/pending" },
      { id: "F87", title: "Digital signature দিয়ে approve", titleEn: "Approve via digital signature" },
      { id: "F88", title: "Bulk approval সুবিধা", titleEn: "Bulk approval facility" },
      { id: "F89", title: "আবেদন staff-এ assign", titleEn: "Assign applications to staff" },
      { id: "F90", title: "Digital certificate template", titleEn: "Digital certificate template" },
      { id: "F91", title: "Official document store", titleEn: "Official document store" },
      { id: "F92", title: "Document version control", titleEn: "Document version control" },
      { id: "F93", title: "Secure document sharing", titleEn: "Secure document sharing" },
      { id: "F94", title: "Two-factor authentication (2FA)", titleEn: "Two-factor authentication (2FA)" },
      { id: "F95", title: "Role-based login", titleEn: "Role-based login" },
      { id: "F96", title: "Session management ও auto logout", titleEn: "Session management & auto logout" },
      { id: "F97", title: "Audit log", titleEn: "Audit log" },
      { id: "F98", title: "Data backup ও recovery", titleEn: "Data backup & recovery" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics ও Reporting",
    titleEn: "Analytics & Reporting",
    icon: BarChart3,
    color: "text-rose-600",
    gradient: "from-rose-500 to-pink-500",
    count: 25,
    description: "রাজস্ব, সেবা, অভিযোগ, নাগরিক বিশ্লেষণ, রিপোর্ট",
    descriptionEn: "Revenue, service, complaint, citizen analytics, reports",
    features: [
      { id: "F99", title: "মোট রাজস্ব আয়ের dashboard", titleEn: "Total revenue dashboard" },
      { id: "F100", title: "Tax collection report", titleEn: "Tax collection report" },
      { id: "F101", title: "বকেয়া ট্যাক্সের তালিকা", titleEn: "Outstanding tax list" },
      { id: "F102", title: "Payment gateway-wise breakdown", titleEn: "Payment gateway-wise breakdown" },
      { id: "F103", title: "Revenue trend ও forecast", titleEn: "Revenue trend & forecast" },
      { id: "F104", title: "আবেদন সংখ্যা ও approval rate", titleEn: "Application count & approval rate" },
      { id: "F105", title: "গড় সেবা প্রদানের সময়", titleEn: "Average service delivery time" },
      { id: "F106", title: "সবচেয়ে বেশি চাওয়া সেবা", titleEn: "Most requested services" },
      { id: "F107", title: "Pending আবেদনের aging report", titleEn: "Pending application aging report" },
      { id: "F108", title: "মোট অভিযোগ ও সমাধানের হার", titleEn: "Total complaints & resolution rate" },
      { id: "F109", title: "Category-wise অভিযোগ breakdown", titleEn: "Category-wise complaint breakdown" },
      { id: "F110", title: "Ward-wise অভিযোগ heat map", titleEn: "Ward-wise complaint heat map" },
      { id: "F111", title: "গড় সমাধানের সময়", titleEn: "Average resolution time" },
      { id: "F112", title: "নাগরিকের satisfaction score", titleEn: "Citizen satisfaction score" },
      { id: "F113", title: "মোট registered নাগরিক", titleEn: "Total registered citizens" },
      { id: "F114", title: "Ward-wise জনসংখ্যা পরিসংখ্যান", titleEn: "Ward-wise population stats" },
      { id: "F115", title: "App usage statistics", titleEn: "App usage statistics" },
      { id: "F116", title: "Active vs Inactive নাগরিক", titleEn: "Active vs Inactive citizens" },
      { id: "F117", title: "PDF/Excel export", titleEn: "PDF/Excel export" },
      { id: "F118", title: "Scheduled auto report", titleEn: "Scheduled auto report" },
      { id: "F119", title: "Custom date range report", titleEn: "Custom date range report" },
      { id: "F120", title: "Government submission format", titleEn: "Government submission format" },
      { id: "F121", title: "Public statistics dashboard", titleEn: "Public statistics dashboard" },
      { id: "F122", title: "Performance scorecard (public)", titleEn: "Performance scorecard (public)" },
      { id: "F123", title: "বাজেট ব্যয়ের public breakdown", titleEn: "Budget expenditure public breakdown" },
    ],
  },
  {
    id: "technical",
    title: "Technical ও System",
    titleEn: "Technical & System",
    icon: Server,
    color: "text-slate-600",
    gradient: "from-slate-500 to-gray-600",
    count: 36,
    description: "Multi-tenancy, নোটিফিকেশন, ভাষা, মোবাইল, ইন্টিগ্রেশন, নিরাপত্তা",
    descriptionEn: "Multi-tenancy, notifications, language, mobile, integration, security",
    features: [
      { id: "F124", title: "পৌরসভা-wise আলাদা subdomain", titleEn: "Municipality-wise separate subdomain" },
      { id: "F125", title: "আলাদা branding (logo/color)", titleEn: "Separate branding (logo/color)" },
      { id: "F126", title: "Shared infrastructure, আলাদা data", titleEn: "Shared infrastructure, separate data" },
      { id: "F127", title: "নতুন পৌরসভা onboarding", titleEn: "New municipality onboarding" },
      { id: "F128", title: "Subscription/license management", titleEn: "Subscription/license management" },
      { id: "F129", title: "Push notification (Mobile)", titleEn: "Push notification (Mobile)" },
      { id: "F130", title: "SMS notification", titleEn: "SMS notification" },
      { id: "F131", title: "Email notification", titleEn: "Email notification" },
      { id: "F132", title: "In-app notification center", titleEn: "In-app notification center" },
      { id: "F133", title: "Notification preference settings", titleEn: "Notification preference settings" },
      { id: "F134", title: "সম্পূর্ণ বাংলা ভাষা support", titleEn: "Full Bangla language support" },
      { id: "F135", title: "English language option", titleEn: "English language option" },
      { id: "F136", title: "Screen reader support", titleEn: "Screen reader support" },
      { id: "F137", title: "Font size adjust", titleEn: "Font size adjustment" },
      { id: "F138", title: "Low bandwidth mode", titleEn: "Low bandwidth mode" },
      { id: "F139", title: "Android ও iOS support", titleEn: "Android & iOS support" },
      { id: "F140", title: "Offline mode", titleEn: "Offline mode" },
      { id: "F141", title: "Biometric login", titleEn: "Biometric login" },
      { id: "F142", title: "QR code scanner", titleEn: "QR code scanner" },
      { id: "F143", title: "Dark mode support", titleEn: "Dark mode support" },
      { id: "F144", title: "NID verification API", titleEn: "NID verification API" },
      { id: "F145", title: "Bangladesh Post Office integration", titleEn: "Bangladesh Post Office integration" },
      { id: "F146", title: "Google Maps integration", titleEn: "Google Maps integration" },
      { id: "F147", title: "bKash/Nagad/Rocket API", titleEn: "bKash/Nagad/Rocket API" },
      { id: "F148", title: "Government BDRIS integration", titleEn: "Government BDRIS integration" },
      { id: "F149", title: "End-to-end encryption", titleEn: "End-to-end encryption" },
      { id: "F150", title: "DDOS protection", titleEn: "DDOS protection" },
      { id: "F151", title: "Auto scaling", titleEn: "Auto scaling" },
      { id: "F152", title: "99.9% uptime guarantee", titleEn: "99.9% uptime guarantee" },
      { id: "F153", title: "Regular automated backup", titleEn: "Regular automated backup" },
      { id: "F154", title: "Data protection আইন compliance", titleEn: "Data protection law compliance" },
      { id: "F155", title: "সব পৌরসভার central management", titleEn: "Central management of all municipalities" },
      { id: "F156", title: "Platform-wide analytics", titleEn: "Platform-wide analytics" },
      { id: "F157", title: "Billing ও subscription management", titleEn: "Billing & subscription management" },
      { id: "F158", title: "System health monitoring", titleEn: "System health monitoring" },
      { id: "F159", title: "Feature toggle (পৌরসভা-wise)", titleEn: "Feature toggle (municipality-wise)" },
    ],
  },
];

const totalFeatures = categories.reduce((sum, c) => sum + c.count, 0);

export default function FeaturesPage() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F0F7FF] dark:bg-[#0F172A] relative">
      <HomeButton />
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="relative max-w-3xl mx-auto px-6 pt-8 pb-12">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-white/70 text-sm mb-6 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> প্রেজেন্টেশনে ফিরুন
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-bangla mb-3">সম্পূর্ণ Feature তালিকা</h1>
          <p className="text-blue-100 text-lg font-bangla mb-6">PouraSeva ডিজিটাল পৌরসভা প্ল্যাটফর্ম — কালিয়াকৈর পাইলট থেকে সারা বাংলাদেশ</p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
              <p className="text-3xl font-bold text-white">{totalFeatures}</p>
              <p className="text-blue-100 text-xs font-bangla">মোট Features</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
              <p className="text-3xl font-bold text-white">{categories.length}</p>
              <p className="text-blue-100 text-xs font-bangla">ক্যাটাগরি</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
              <p className="text-3xl font-bold text-white">৩৩০+</p>
              <p className="text-blue-100 text-xs font-bangla">পৌরসভা (লক্ষ্য)</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Category Cards ─── */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {categories.map((cat) => {
          const isOpen = expanded === cat.id;
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : cat.id)}
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#1a2536] transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white font-bangla">{cat.title}</h2>
                    <span className="text-xs text-gray-400 font-medium">{cat.titleEn}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bangla">{cat.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-sm font-bold ${cat.color} bg-gray-50 dark:bg-[#0F172A] px-3 py-1 rounded-full`}>{cat.count}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700/50 pt-4">
                      <div className="grid grid-cols-1 gap-2">
                        {cat.features.map((f) => (
                          <div key={f.id} className="flex items-start gap-3 py-2 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0F172A] transition-colors">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${cat.color}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{f.id}</span>
                                <p className="text-sm text-gray-900 dark:text-white font-bangla">{f.title}</p>
                              </div>
                              <p className="text-[11px] text-gray-400 mt-0.5">{f.titleEn}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* ─── Pilot Plan ─── */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mt-8">
          <h2 className="text-xl font-bold font-bangla mb-4">পাইলট পরিকল্পনা</h2>
          <div className="space-y-3">
            {[
              { phase: "Phase 1", title: "কালিয়াকৈর পৌরসভা পাইলট", titleEn: "Kaliakair Municipality Pilot", time: "৬ মাস" },
              { phase: "Phase 2", title: "গাজীপুর জেলার সব পৌরসভা", titleEn: "All Gazipur District Municipalities", time: "৬ মাস" },
              { phase: "Phase 3", title: "সারা বাংলাদেশের ৩৩০+ পৌরসভা", titleEn: "330+ Municipalities Nationwide", time: "১-২ বছর" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0 text-sm font-bold">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-white font-bold font-bangla text-sm">{p.title}</p>
                  <p className="text-blue-200 text-xs">{p.titleEn}</p>
                </div>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bangla">{p.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bangla font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> প্রেজেন্টেশনে ফিরুন
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Users,
  DollarSign,
  AlertTriangle,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
  Upload,
  CreditCard,
  CheckCircle,
  Shield,
  FileText,
  Settings,
  BarChart3,
  Building2,
} from "lucide-react";
import Link from "next/link";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const pourashaваData = {
  name: "Kaliakair Pourashava",
  division: "Dhaka",
  category: "A",
  status: "Active",
  address: "Kaliakair, Gazipur, Dhaka Division",
  phone: "+880-2-9876543",
  email: "info@kaliakair.pourashava.gov.bd",
  mayor: "Md. Abul Hossain",
  established: 1972,
  subdomain: "kaliakair",
};

const statsData = [
  { label: "Citizens", value: "12,450", icon: Users, change: "+12%" },
  { label: "Revenue (Monthly)", value: "৳24,50,000", icon: DollarSign, change: "+8%" },
  { label: "Complaints", value: "145", icon: AlertTriangle, change: "-5%" },
  { label: "Staff Count", value: "68", icon: UserCheck, change: "+3%" },
];

const staffData = [
  { name: "Md. Karim Uddin", role: "Secretary", ward: "All", status: "Active" },
  { name: "Fatema Begum", role: "Tax Officer", ward: "Ward 1-3", status: "Active" },
  { name: "Rafiqul Islam", role: "Engineer", ward: "Ward 4-6", status: "Active" },
  { name: "Nasreen Akter", role: "Health Inspector", ward: "Ward 7-9", status: "On Leave" },
  { name: "Jamal Hossain", role: "Revenue Collector", ward: "Ward 1-5", status: "Active" },
  { name: "Salma Khatun", role: "Clerk", ward: "Ward 6-9", status: "Inactive" },
];

const featureCategories = [
  {
    category: "Citizen Services",
    features: [
      { code: "F01", name: "Birth Certificate", enabled: true },
      { code: "F02", name: "Death Certificate", enabled: true },
      { code: "F03", name: "Trade License", enabled: false },
      { code: "F04", name: "Building Permit", enabled: false },
    ],
  },
  {
    category: "Revenue Management",
    features: [
      { code: "F05", name: "Holding Tax Collection", enabled: true },
      { code: "F06", name: "Water Bill", enabled: true },
      { code: "F07", name: "Online Payment Gateway", enabled: false },
    ],
  },
  {
    category: "Complaint Management",
    features: [
      { code: "F08", name: "Public Complaint Portal", enabled: true },
      { code: "F09", name: "Automated Assignment", enabled: false },
      { code: "F10", name: "SMS Notifications", enabled: true },
    ],
  },
  {
    category: "Reporting & Analytics",
    features: [
      { code: "F11", name: "Revenue Dashboard", enabled: true },
      { code: "F12", name: "Citizen Demographics", enabled: false },
      { code: "F13", name: "Performance Scorecard", enabled: true },
    ],
  },
];

const billingData = {
  plan: "Professional",
  amount: "৳50,000",
  cycle: "Monthly",
  renewalDate: "April 1, 2026",
  paymentHistory: [
    { id: "INV-2026-003", date: "Mar 1, 2026", amount: "৳50,000", status: "Paid" },
    { id: "INV-2026-002", date: "Feb 1, 2026", amount: "৳50,000", status: "Paid" },
    { id: "INV-2026-001", date: "Jan 1, 2026", amount: "৳50,000", status: "Paid" },
    { id: "INV-2025-012", date: "Dec 1, 2025", amount: "৳45,000", status: "Paid" },
    { id: "INV-2025-011", date: "Nov 1, 2025", amount: "৳45,000", status: "Overdue" },
  ],
};

// ── Tab definitions ────────────────────────────────────────────────────────────

const tabs = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "staff", label: "Staff", icon: Users },
  { key: "features", label: "Features", icon: Shield },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type TabKey = (typeof tabs)[number]["key"];

// ── Component ──────────────────────────────────────────────────────────────────

export default function PourashaваDetailPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [featureToggles, setFeatureToggles] = useState(() => {
    const initial: Record<string, boolean> = {};
    featureCategories.forEach((cat) =>
      cat.features.forEach((f) => {
        initial[f.code] = f.enabled;
      })
    );
    return initial;
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    featureCategories.forEach((cat) => {
      initial[cat.category] = true;
    });
    return initial;
  });

  const toggleFeature = (code: string) => {
    setFeatureToggles((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/super-admin/pourashavas"
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pourashavas
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center blue-glow">
              <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pourashaваData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  Category {pourashaваData.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold">
                  {pourashaваData.status}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{pourashaваData.division} Division</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "staff" && <StaffTab />}
      {activeTab === "features" && (
        <FeaturesTab
          featureToggles={featureToggles}
          toggleFeature={toggleFeature}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
        />
      )}
      {activeTab === "billing" && <BillingTab />}
      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
}

// ── Overview Tab ───────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {statsData.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 hover:blue-glow transition-shadow">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-green-700 dark:text-green-300">{stat.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Info Card */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">Pourashava Information</h3>
        <div className="space-y-4">
          <InfoRow icon={MapPin} label="Address" value={pourashaваData.address} />
          <InfoRow icon={Phone} label="Phone" value={pourashaваData.phone} />
          <InfoRow icon={Mail} label="Email" value={pourashaваData.email} />
          <InfoRow icon={User} label="Mayor" value={pourashaваData.mayor} />
          <InfoRow icon={Calendar} label="Established" value={String(pourashaваData.established)} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
}

// ── Staff Tab ──────────────────────────────────────────────────────────────────

function StaffTab() {
  return (
    <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Staff Members</h3>
        <span className="text-gray-500 dark:text-gray-400 text-sm">{staffData.length} members</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Name</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Role</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Ward</th>
              <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((member, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{member.name}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-sm text-gray-500 dark:text-gray-400">{member.role}</td>
                <td className="py-4 pr-4 text-sm text-gray-500 dark:text-gray-400">{member.ward}</td>
                <td className="py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === "Active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : member.status === "On Leave"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Features Tab ───────────────────────────────────────────────────────────────

function FeaturesTab({
  featureToggles,
  toggleFeature,
  expandedCategories,
  toggleCategory,
}: {
  featureToggles: Record<string, boolean>;
  toggleFeature: (code: string) => void;
  expandedCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
}) {
  return (
    <div className="space-y-4">
      {featureCategories.map((cat) => {
        const isExpanded = expandedCategories[cat.category];
        return (
          <div key={cat.category} className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none overflow-hidden">
            {/* Accordion Header */}
            <button
              onClick={() => toggleCategory(cat.category)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">{cat.category}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {cat.features.filter((f) => featureToggles[f.code]).length}/{cat.features.length} enabled
                </span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {/* Accordion Body */}
            {isExpanded && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                {cat.features.map((feature) => {
                  const isOn = featureToggles[feature.code];
                  return (
                    <div
                      key={feature.code}
                      className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#0F172A] px-1.5 py-0.5 rounded">
                          {feature.code}
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">{feature.name}</span>
                      </div>
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleFeature(feature.code)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          isOn ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                            isOn ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Billing Tab ────────────────────────────────────────────────────────────────

function BillingTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="bg-white dark:bg-[#1E293B] border border-blue-200 dark:border-blue-800/40 rounded-2xl shadow-sm dark:shadow-none p-6 blue-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Plan</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{billingData.plan}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{billingData.amount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Billing Cycle</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{billingData.cycle}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Next Renewal</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{billingData.renewalDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Invoice</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Date</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Amount</th>
                <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingData.paymentHistory.map((payment, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{payment.id}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-sm text-gray-500 dark:text-gray-400">{payment.date}</td>
                  <td className="py-4 pr-4 text-sm font-medium text-gray-900 dark:text-gray-100">{payment.amount}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        payment.status === "Paid"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {payment.status === "Paid" && <CheckCircle className="w-3 h-3" />}
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Settings Tab ───────────────────────────────────────────────────────────────

function SettingsTab() {
  const [formData, setFormData] = useState({
    name: pourashaваData.name,
    subdomain: pourashaваData.subdomain,
    phone: pourashaваData.phone,
    email: pourashaваData.email,
    address: pourashaваData.address,
    mayor: pourashaваData.mayor,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">General Settings</h3>
        <div className="space-y-5">
          <FormField
            label="Pourashava Name"
            value={formData.name}
            onChange={(v) => handleChange("name", v)}
          />
          <FormField
            label="Subdomain"
            value={formData.subdomain}
            onChange={(v) => handleChange("subdomain", v)}
            suffix=".pouraseva.gov.bd"
          />
          <FormField
            label="Phone"
            value={formData.phone}
            onChange={(v) => handleChange("phone", v)}
          />
          <FormField
            label="Email"
            value={formData.email}
            onChange={(v) => handleChange("email", v)}
          />
          <FormField
            label="Address"
            value={formData.address}
            onChange={(v) => handleChange("address", v)}
          />
          <FormField
            label="Mayor Name"
            value={formData.mayor}
            onChange={(v) => handleChange("mayor", v)}
          />
        </div>
      </div>

      {/* Branding / Logo Upload */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Branding</h3>
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 dark:hover:border-blue-500/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Upload Logo</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or SVG. Max 2MB.</p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 rounded-lg bg-electric-blue hover:bg-electric-blue/90 text-white font-medium text-sm transition-colors blue-glow">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-electric-blue transition-colors"
        />
        {suffix && (
          <span className="inline-flex items-center px-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#0F172A] border border-l-0 border-gray-200 dark:border-gray-700 rounded-r-lg -ml-px">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

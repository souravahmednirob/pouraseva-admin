"use client";

import { useState } from "react";
import {
  Settings,
  Plug,
  Bell,
  Shield,
  Database,
  ScrollText,
  Upload,
  Search,
  CheckCircle,
  XCircle,
  Smartphone,
  Mail,
  CreditCard,
  Wallet,
} from "lucide-react";

const navItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "backup", label: "Backup", icon: Database },
  { id: "audit-logs", label: "Audit Logs", icon: ScrollText },
];

const integrations = [
  { name: "NID API", description: "National ID verification service", icon: Shield, connected: true },
  { name: "bKash", description: "bKash payment gateway", icon: Wallet, connected: true },
  { name: "Nagad", description: "Nagad payment gateway", icon: Wallet, connected: true },
  { name: "Rocket", description: "Rocket payment gateway", icon: CreditCard, connected: false },
  { name: "SMS Gateway", description: "Bulk SMS service provider", icon: Smartphone, connected: true },
  { name: "Email Service", description: "Transactional email provider", icon: Mail, connected: false },
];

const auditLogs = [
  { user: "Admin (SA)", action: "Updated platform settings", ip: "103.45.67.89", time: "2026-03-06 09:15:22" },
  { user: "Admin (SA)", action: "Enabled 2FA for all users", ip: "103.45.67.89", time: "2026-03-05 16:42:10" },
  { user: "Mod - Rahim", action: "Approved trade license #4521", ip: "103.45.68.12", time: "2026-03-05 14:30:05" },
  { user: "Admin (SA)", action: "Connected bKash API", ip: "103.45.67.89", time: "2026-03-04 11:20:33" },
  { user: "Mod - Fatema", action: "Rejected building permit #782", ip: "103.45.68.45", time: "2026-03-04 09:55:18" },
  { user: "Admin (SA)", action: "Created database backup", ip: "103.45.67.89", time: "2026-03-03 22:00:01" },
  { user: "Mod - Kamal", action: "Updated citizen record #11234", ip: "103.45.68.22", time: "2026-03-03 15:12:44" },
  { user: "Admin (SA)", action: "Disconnected Rocket API", ip: "103.45.67.89", time: "2026-03-02 10:08:55" },
];

export default function SystemSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [platformName, setPlatformName] = useState("PouraSeva");
  const [contactEmail, setContactEmail] = useState("admin@pouraseva.gov.bd");
  const [supportPhone, setSupportPhone] = useState("+880-2-1234567");
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordPolicy, setPasswordPolicy] = useState("strong");
  const [auditSearch, setAuditSearch] = useState("");

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.ip.includes(auditSearch)
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Configure platform settings, integrations, and security policies
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sub-Navigation */}
        <div className="lg:w-60 shrink-0">
          <nav className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          {/* General Settings */}
          {activeSection === "general" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">General Settings</h2>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Platform Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                      SVG, PNG or JPG (max 2MB)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Support Phone
                  </label>
                  <input
                    type="tel"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                  />
                </div>

                <button className="bg-gradient-to-r from-electric-blue to-sky-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === "integrations" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex items-start justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <integration.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{integration.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {integration.description}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium mt-2 ${
                            integration.connected ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                          }`}
                        >
                          {integration.connected ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {integration.connected ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30 rounded-lg px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors shrink-0">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Settings</h2>
              <div className="space-y-5 max-w-2xl">
                {[
                  { label: "Email Notifications", desc: "Receive system alerts via email", default: true },
                  { label: "SMS Notifications", desc: "Receive critical alerts via SMS", default: false },
                  { label: "Push Notifications", desc: "Browser push notifications for real-time updates", default: true },
                  { label: "Weekly Reports", desc: "Automated weekly performance reports", default: true },
                  { label: "Complaint Alerts", desc: "Immediate alerts for new citizen complaints", default: true },
                ].map((item) => {
                  const [enabled, setEnabled] = useState(item.default);
                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setEnabled(!enabled)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          enabled ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
                <button className="bg-gradient-to-r from-electric-blue to-sky-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Security Settings</h2>
              <div className="space-y-6 max-w-2xl">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Require 2FA for all admin and moderator accounts
                    </p>
                  </div>
                  <button
                    onClick={() => setTwoFA(!twoFA)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      twoFA ? "bg-electric-blue" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        twoFA ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Session Timeout */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                {/* Password Policy */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Password Policy
                  </label>
                  <select
                    value={passwordPolicy}
                    onChange={(e) => setPasswordPolicy(e.target.value)}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                  >
                    <option value="basic">Basic - Minimum 6 characters</option>
                    <option value="moderate">Moderate - 8+ chars, 1 number, 1 special</option>
                    <option value="strong">Strong - 12+ chars, uppercase, number, special</option>
                  </select>
                </div>

                <button className="bg-gradient-to-r from-electric-blue to-sky-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Save Security Settings
                </button>
              </div>
            </div>
          )}

          {/* Backup */}
          {activeSection === "backup" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Backup & Recovery</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Last Backup</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">2026-03-05 at 22:00 UTC</p>
                    </div>
                    <span className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 rounded-full font-medium">
                      Successful
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-electric-blue to-sky-blue h-2 rounded-full w-3/4" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Storage: 7.2 GB / 10 GB used</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Auto-Backup Schedule
                  </label>
                  <select className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-electric-blue transition-colors">
                    <option>Daily at 10:00 PM</option>
                    <option>Every 12 hours</option>
                    <option>Weekly on Sunday</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button className="bg-gradient-to-r from-electric-blue to-sky-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Create Backup Now
                  </button>
                  <button className="border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    Restore from Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs */}
          {activeSection === "audit-logs" && (
            <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Audit Logs</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-electric-blue transition-colors w-64"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">User</th>
                      <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">Action</th>
                      <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3 pr-4">IP Address</th>
                      <th className="text-left text-sm text-gray-500 dark:text-gray-400 font-medium pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                      >
                        <td className="py-3.5 pr-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.user}</span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">{log.action}</span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{log.ip}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="text-sm text-gray-400 dark:text-gray-500">{log.time}</span>
                        </td>
                      </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                          No logs found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Plus,
  Filter,
  Calendar,
  MapPin,
  Camera,
  Settings,
  ChevronDown,
} from "lucide-react";

type ProjectStatus = "Planning" | "Active" | "Completed";

interface Project {
  id: string;
  name: string;
  ward: number;
  budget: number;
  spent: number;
  progress: number;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  photoCount: number;
  description: string;
}

const statusBadge: Record<ProjectStatus, string> = {
  Planning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  Active: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  Completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
};

const mockProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "৩নং ওয়ার্ড সড়ক উন্নয়ন",
    ward: 3,
    budget: 4500000,
    spent: 2800000,
    progress: 62,
    status: "Active",
    startDate: "2026-01-15",
    endDate: "2026-06-30",
    photoCount: 24,
    description: "৩নং ওয়ার্ডের প্রধান সড়ক পিচঢালা ও সংস্কার।",
  },
  {
    id: "PRJ-002",
    name: "কেন্দ্রীয় পানি শোধনাগার",
    ward: 5,
    budget: 12000000,
    spent: 1500000,
    progress: 15,
    status: "Planning",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    photoCount: 5,
    description: "নতুন পানি শোধনাগার স্থাপন।",
  },
  {
    id: "PRJ-003",
    name: "১নং ওয়ার্ড ড্রেনেজ ব্যবস্থা",
    ward: 1,
    budget: 3200000,
    spent: 3200000,
    progress: 100,
    status: "Completed",
    startDate: "2025-07-01",
    endDate: "2025-12-31",
    photoCount: 45,
    description: "পাকা ড্রেন নির্মাণ ও জলাবদ্ধতা নিরসন।",
  },
  {
    id: "PRJ-004",
    name: "৭নং ওয়ার্ড কমিউনিটি সেন্টার",
    ward: 7,
    budget: 8000000,
    spent: 5200000,
    progress: 45,
    status: "Active",
    startDate: "2025-10-01",
    endDate: "2026-09-30",
    photoCount: 18,
    description: "বহুতল কমিউনিটি সেন্টার নির্মাণ।",
  },
];

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const filtered = mockProjects.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (wardFilter && p.ward !== Number(wardFilter)) return false;
    if (yearFilter && !p.startDate.startsWith(yearFilter)) return false;
    return true;
  });

  const formatBudget = (amount: number) => {
    if (amount >= 1000000) {
      return `৳ ${(amount / 1000000).toFixed(1)} লক্ষ`;
    }
    return `৳ ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 font-bangla">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button className="bg-electric-blue hover:bg-electric-blue/80 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors blue-glow">
          <Plus className="w-5 h-5" />
          প্রকল্প যোগ করুন
        </button>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
          >
            <option value="">সকল স্ট্যাটাস</option>
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={wardFilter}
            onChange={(e) => setWardFilter(e.target.value)}
            className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
          >
            <option value="">সকল ওয়ার্ড</option>
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i + 1} value={i + 1}>ওয়ার্ড {i + 1}</option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 text-sm focus:outline-none focus:border-electric-blue"
          >
            <option value="">সকল বছর</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-5 space-y-4 hover:border-blue-200 dark:hover:border-electric-blue/30 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg">{project.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{project.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${statusBadge[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Ward & Budget */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">ওয়ার্ড {project.ward}</span>
              </div>
              <div className="text-right">
                <p className="text-gray-900 dark:text-gray-100 font-bold text-lg">{formatBudget(project.budget)}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">ব্যয়: {formatBudget(project.spent)}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-500 dark:text-gray-400 text-sm">অগ্রগতি</span>
                <span className={`text-sm font-medium ${project.progress === 100 ? "text-success" : "text-blue-600 dark:text-blue-400"}`}>
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    project.progress === 100 ? "bg-success" : "bg-electric-blue"
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.startDate} — {project.endDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{project.photoCount}</span>
                </div>
              </div>
              <button className="bg-blue-50 dark:bg-electric-blue/10 border border-blue-200 dark:border-electric-blue/30 hover:bg-blue-100 dark:hover:bg-electric-blue/20 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors">
                <Settings className="w-3.5 h-3.5" />
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-8 text-center text-gray-500 dark:text-gray-400">কোনো প্রকল্প পাওয়া যায়নি।</div>
      )}
    </div>
  );
}

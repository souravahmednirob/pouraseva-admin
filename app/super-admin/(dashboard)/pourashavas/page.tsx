"use client";

import { useState } from "react";
import {
  Search,
  Building2,
  Users,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface Pourashava {
  id: number;
  name: string;
  division: string;
  category: "A" | "B" | "C";
  citizens: number;
  wards: number;
  status: "Active" | "Inactive" | "Pending";
}

const mockPourashavas: Pourashava[] = [
  {
    id: 1,
    name: "Kaliakair",
    division: "Dhaka",
    category: "A",
    citizens: 12450,
    wards: 9,
    status: "Active",
  },
  {
    id: 2,
    name: "Savar",
    division: "Dhaka",
    category: "A",
    citizens: 18320,
    wards: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Sitakunda",
    division: "Chittagong",
    category: "B",
    citizens: 8750,
    wards: 7,
    status: "Active",
  },
  {
    id: 4,
    name: "Natore",
    division: "Rajshahi",
    category: "B",
    citizens: 6200,
    wards: 6,
    status: "Pending",
  },
  {
    id: 5,
    name: "Jhenaidah",
    division: "Khulna",
    category: "C",
    citizens: 4100,
    wards: 5,
    status: "Inactive",
  },
  {
    id: 6,
    name: "Moulvibazar",
    division: "Sylhet",
    category: "C",
    citizens: 5300,
    wards: 6,
    status: "Active",
  },
];

const divisions = ["All Divisions", "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];
const categories = ["All Categories", "A", "B", "C"];
const statuses = ["All Status", "Active", "Inactive", "Pending"];

const ITEMS_PER_PAGE = 6;

const categoryColors: Record<string, string> = {
  A: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  B: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  C: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
};

const statusColors: Record<string, string> = {
  Active: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Inactive: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  Pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
};

export default function PourashavasPage() {
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("All Divisions");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockPourashavas.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesDivision =
      divisionFilter === "All Divisions" || p.division === divisionFilter;
    const matchesCategory =
      categoryFilter === "All Categories" || p.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All Status" || p.status === statusFilter;
    return matchesSearch && matchesDivision && matchesCategory && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pourashavas Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage and monitor all registered pourashavas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Total: <span className="text-gray-900 dark:text-white font-semibold">{filtered.length}</span> Pourashavas
          </span>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-electric-blue to-sky-blue rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add New Pourashava
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search pourashavas..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-electric-blue transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters:</span>
            </div>

            <select
              value={divisionFilter}
              onChange={(e) => handleFilterChange(setDivisionFilter, e.target.value)}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors"
            >
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => handleFilterChange(setCategoryFilter, e.target.value)}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All Categories" ? c : `Category ${c}`}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
              className="bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 focus:outline-none focus:border-electric-blue transition-colors"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pourashava Cards Grid */}
      {paginated.length === 0 ? (
        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 text-center py-16">
          <Building2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">No pourashavas found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginated.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none p-6 group hover:blue-glow transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center blue-glow">
                    <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-bold text-base">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-500 dark:text-gray-400 text-xs">{p.division}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}
                >
                  {p.status}
                </span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {p.division}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[p.category]}`}
                >
                  Category {p.category}
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mb-5 py-3 border-t border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold">
                      {p.citizens.toLocaleString()}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Citizens</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-gray-900 dark:text-white text-sm font-semibold">{p.wards}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Wards</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-electric-blue to-sky-blue rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity">
                  Manage
                </button>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-electric-blue text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

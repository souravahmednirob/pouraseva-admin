"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function HomeButton() {
  return (
    <Link
      href="/mobile"
      title="Home"
      className="fixed top-4 right-4 z-[99] w-9 h-9 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md"
    >
      <Home className="w-4 h-4" />
    </Link>
  );
}
